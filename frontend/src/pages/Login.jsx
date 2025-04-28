import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Stack,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", formData);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #43cea2, #185a9d)",
        px: 2,
      }}
    >
      <Card sx={{ width: 400, p: 4, borderRadius: 3, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" fontWeight="bold" mb={3}>
            Sign In With
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="center" mb={3}>
            <Button
              variant="contained"
              startIcon={<FacebookIcon />}
              sx={{
                backgroundColor: "#3b5998",
                textTransform: "none",
                width: "50%",
                "&:hover": { backgroundColor: "#2d4373" },
              }}
            >
              Facebook
            </Button>
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{
                textTransform: "none",
                width: "50%",
                backgroundColor: "#fff",
                borderColor: "#ccc",
              }}
            >
              Google
            </Button>
          </Stack>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              helperText={
                <Link href="#" underline="hover" fontSize={12}>
                  Forgot?
                </Link>
              }
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: "#333",
                textTransform: "none",
                fontWeight: "bold",
                fontSize: 16,
                "&:hover": { backgroundColor: "#000" },
              }}
            >
              Sign In
            </Button>
          </form>

          <Typography variant="body2" textAlign="center" mt={3}>
            Not a member?{" "}
            <Link href="#" underline="hover">
              Sign up now
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
