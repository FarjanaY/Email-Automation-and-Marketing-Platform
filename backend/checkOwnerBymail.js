// BACKEND PART
// =======================
// ✅ Route – Check Permission
router.post("/api/users/check-owner", verifyToken, checkOwnerByEmail);

// ✅ Controller – checkOwnerByEmail
const createError = require("http-errors");
const User = require("../../models/userSchema");

const checkOwnerByEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const tokenEmail = req.user.email;

    if (!email) {
      return next(createError(400, "Email is required"));
    }

    // ✅ check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(404, "User not found"));
    }

    // ✅ check owner
    if (email !== tokenEmail) {
      return next(createError(403, "This is not your account"));
    }

    res.status(200).json({
      success: true,
      message: "Permission granted",
      payload: {
        id: user._id,
        email: user.email,
        name: user.name,
        username: user.username,
        mobile: user.mobile,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = checkOwnerByEmail;

// ✅ Route – Update
router.put(
  "/api/users/me",
  verifyToken,
  upload.single("avatar"),
  updateMyAccount,
);

// ✅ Controller – updateMyAccount
const bcrypt = require("bcryptjs");

const updateMyAccount = async (req, res, next) => {
  try {
    const tokenEmail = req.user.email;

    const user = await User.findOne({ email: tokenEmail });
    if (!user) return next(createError(404, "User not found"));

    const updates = {};
    const allowed = ["name", "username", "mobile", "password"];

    allowed.forEach((key) => {
      if (req.body[key]) updates[key] = req.body[key];
    });

    if (req.body.password) {
      updates.password = await bcrypt.hash(req.body.password, 10);
    }

    updates.avatar = user.avatar;
    if (req.file?.filename) updates.avatar = req.file.filename;

    const updated = await User.findOneAndUpdate(
      { email: tokenEmail },
      updates,
      { new: true, runValidators: true },
    );

    res.json({ success: true, payload: updated });
  } catch (err) {
    next(err);
  }
};

// ✅ Route – Delete
router.delete("/api/users/me", verifyToken, deleteMyAccount);

// ✅ Controller – deleteMyAccount
const deleteMyAccount = async (req, res, next) => {
  try {
    const tokenEmail = req.user.email;

    await User.findOneAndDelete({ email: tokenEmail });

    res.json({ success: true, message: "Account deleted" });
  } catch (err) {
    next(err);
  }
};

// =======================
// ✅ FRONTEND PART (React)
// =======================
// ✅ Email Check Page
// import { useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";

// const CheckEmail = () => {
//   const [email, setEmail] = useState("");
//   const [allowed, setAllowed] = useState(false);
//   const [user, setUser] = useState(null);

//   const token = Cookies.get("token");

//   const checkEmail = async () => {
//     try {
//       const res = await axios.post(
//         "/api/users/check-owner",
//         { email },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setAllowed(true);
//       setUser(res.data.payload);
//       alert("Access granted");
//     } catch (err) {
//       alert(err.response?.data?.message || "Access denied");
//     }
//   };

//   return (
//     <div>
//       <h3>Verify Email</h3>

//       <input
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Enter your email"
//       />

//       <button onClick={checkEmail}>Verify</button>

//       {allowed && <EditProfile user={user} />}
//     </div>
//   );
// };

// export default CheckEmail;

// // ✅ Edit Profile Component
// const EditProfile = ({ user }) => {
//   const [form, setForm] = useState({
//     name: user.name,
//     username: user.username,
//     mobile: user.mobile,
//     password: "",
//     avatar: null,
//   });

//   const token = Cookies.get("token");

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "avatar") setForm({ ...form, avatar: files[0] });
//     else setForm({ ...form, [name]: value });
//   };

//   const submit = async (e) => {
//     e.preventDefault();

//     const fd = new FormData();
//     Object.keys(form).forEach((k) => {
//       if (form[k]) fd.append(k, form[k]);
//     });

//     await axios.put("/api/users/me", fd, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     alert("Updated");
//   };

//   const deleteAcc = async () => {
//     await axios.delete("/api/users/me", {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     alert("Account deleted");
//   };

//   return (
//     <form onSubmit={submit}>
//       <input name="name" value={form.name} onChange={handleChange} />
//       <input name="username" value={form.username} onChange={handleChange} />
//       <input name="mobile" value={form.mobile} onChange={handleChange} />
//       <input type="password" name="password" onChange={handleChange} />
//       <input type="file" name="avatar" onChange={handleChange} />

//       <button type="submit">Update</button>
//       <button type="button" onClick={deleteAcc}>
//         Delete
//       </button>
//     </form>
//   );
// };
