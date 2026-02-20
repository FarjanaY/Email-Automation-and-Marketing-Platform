// src/components/SmtpSettings.jsx
import { useState, useEffect } from "react";
import axios from "axios";

export default function SmtpSettings() {
  const [smtpHost, setSmtpHost] = useState("");
  const [smtpPort, setSmtpPort] = useState(465);
  const [smtpUser, setSmtpUser] = useState("");
  const [smtpPass, setSmtpPass] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Optionally fetch current settings from backend
    axios
      .get("/api/admin/smtp-settings")
      .then((res) => {
        const data = res.data.smtp || {};
        setSmtpHost(data.smtpHost || "");
        setSmtpPort(data.smtpPort || 465);
        setSmtpUser(data.smtpUser || "");
        setSmtpPass(data.smtpPass || "");
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/admin/update-smtp", {
        smtpHost,
        smtpPort,
        smtpUser,
        smtpPass,
      });
      if (res.data.success) setMessage("SMTP updated successfully!");
    } catch (err) {
      setMessage("Failed to update SMTP credentials.");
    }
  };

  return (
    <div>
      <h2>Update SMTP Settings</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>SMTP Host</label>
          <input
            type="text"
            value={smtpHost}
            onChange={(e) => setSmtpHost(e.target.value)}
            required
          />
        </div>
        <div>
          <label>SMTP Port</label>
          <input
            type="number"
            value={smtpPort}
            onChange={(e) => setSmtpPort(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Email (Username)</label>
          <input
            type="email"
            value={smtpUser}
            onChange={(e) => setSmtpUser(e.target.value)}
            required
          />
        </div>
        <div>
          <label>App Password</label>
          <input
            type="password"
            value={smtpPass}
            onChange={(e) => setSmtpPass(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update SMTP</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
