import React, { useState } from "react";
import { Box, TextField, Button, Typography, Divider } from "@mui/material";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignUp ? "/api/signup" : "/api/signin";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert(isSignUp ? "Sign Up Successful!" : "Sign In Successful!");
      } else {
        alert(data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        background: "linear-gradient(to right, #38d39f, #1e90ff)", // ✅ Gradient background
      }}
    >
      {/* Left Illustration */}
      <Box
        sx={{
          flex: 1,
          backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/003/689/228/non_2x/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "20px",
          color: "black",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "5px",
            borderRadius: "8px",
          }}
        >
          Welcome to InterviewBot
        </Typography>
      </Box>

      {/* Right Form Card */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "32px",
            boxShadow: 6,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}>
            {isSignUp ? "Student Signup" : "Student Login"}
          </Typography>
          <Typography variant="body1" sx={{ color: "#7f8c8d", textAlign: "center", mb: 3 }}>
            {isSignUp
              ? "Hey, enter your details to create your account"
              : "Welcome back! Please log in to your account"}
          </Typography>

          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <TextField
                fullWidth
                label="Enter your Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                margin="normal"
                required
              />
            )}
            <TextField
              fullWidth
              label="Enter your Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            {isSignUp && (
              <TextField
                fullWidth
                label="Enter your Phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                margin="normal"
                required
              />
            )}
            <TextField
              fullWidth
              label="Create Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#2c3e50",
                color: "white",
                mt: 2,
                padding: "10px",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#34495e" },
              }}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </form>

          <Divider sx={{ my: 3 }}>Or Sign up with</Divider>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button
              variant="outlined"
              sx={{ borderColor: "#2c3e50", color: "#2c3e50", fontWeight: "bold" }}
            >
              Google
            </Button>
            <Button
              variant="outlined"
              sx={{ borderColor: "#2c3e50", color: "#2c3e50", fontWeight: "bold" }}
            >
              Facebook
            </Button>
          </Box>

          <Typography variant="body2" sx={{ textAlign: "center", mt: 3, color: "#7f8c8d" }}>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <Button
              onClick={() => setIsSignUp(!isSignUp)}
              sx={{ color: "#2c3e50", fontWeight: "bold", textTransform: "none" }}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </Button>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthPage;
