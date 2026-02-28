import React from "react";

const LoadingPage = ({ msg = "Loading" }) => {
  return (
    <div style={styles.container}>
      <img
        src="../../../public/loadingPage/loading.png"
        style={styles.spinner}
      ></img>
      <p>{msg}</p>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDrection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    width: "80px",
    height: "80px",
    background: "none",
    // borderTop: "4px solid #ffff",
    borderRadius: "50%",
    animation: "loadingSpinner 4s linear infinite",
  },
};

export default LoadingPage;
