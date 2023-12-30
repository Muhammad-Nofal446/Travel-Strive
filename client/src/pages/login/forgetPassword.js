import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    try {
      const response = await axios.post("/auth/reset-password", { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <p>Enter your email to receive a password reset link.</p>
      <div>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleResetPassword}>Send Reset Link</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
