import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { Box, Typography, Button, IconButton } from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb"; // Lightbulb Icon
import VideocamIcon from "@mui/icons-material/Videocam"; // Camera ON
import VideocamOffIcon from "@mui/icons-material/VideocamOff"; // Camera OFF
import MicIcon from "@mui/icons-material/Mic"; // Mic ON
import MicOffIcon from "@mui/icons-material/MicOff"; // Mic OFF
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Placeholder User Avatar

const InstructionPage = () => {
  const [cameraOn, setCameraOn] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  // Toggle Camera
  const toggleCamera = () => {
    setCameraOn((prev) => !prev);
  };

  // Toggle Mic
  const toggleMic = () => {
    setMicOn((prev) => !prev);
  };

  return (
    <Box
      sx={{
        padding: "20px",
        textAlign: "center",
        minHeight: "100vh",
        backgroundColor: "#fff8d1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Lightbulb Icon for Creativity */}
      <LightbulbIcon sx={{ fontSize: 60, color: "#f39c12" }} />
    
      {/* Privacy Notice */}
      <Typography variant="body2" sx={{ marginTop: "5px", color: "gray" }}>
        🔏 We **do not** record your video or audio.
      </Typography>

      {/* Instructions */}
      <Typography variant="body1" sx={{ maxWidth: "600px", marginTop: "20px", fontSize: "16px" }}>
        To proceed, please **turn on your camera & microphone**. This ensures a **smooth interview experience**.  
        Click the buttons below to enable them.  
      </Typography>

      {/* Webcam Preview */}
      <Box
        sx={{
          width: 320,
          height: 320,
          borderRadius: "10px",
          backgroundColor: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          marginTop: "20px",
          border: "5px solid #f39c12",
        }}
      >
        {cameraOn ? (
          <Webcam ref={webcamRef} audio={micOn} width="100%" height="100%" mirrored={true} />
        ) : (
          <AccountCircleIcon sx={{ fontSize: 160, color: "gray" }} />
        )}
      </Box>

      {/* Toggle Buttons for Camera & Mic */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
        {/* Camera Button */}
        <IconButton
          onClick={toggleCamera}
          sx={{
            margin: "10px",
            color: cameraOn ? "green" : "red",
            backgroundColor: "#f4f4f4",
            "&:hover": { backgroundColor: "#ddd" },
          }}
        >
          {cameraOn ? <VideocamIcon fontSize="large" /> : <VideocamOffIcon fontSize="large" />}
        </IconButton>

        {/* Mic Button */}
        <IconButton
          onClick={toggleMic}
          sx={{
            margin: "10px",
            color: micOn ? "green" : "red",
            backgroundColor: "#f4f4f4",
            "&:hover": { backgroundColor: "#ddd" },
          }}
        >
          {micOn ? <MicIcon fontSize="large" /> : <MicOffIcon fontSize="large" />}
        </IconButton>
      </Box>

      {/* Interview Start Button */}
      <Button
        variant="contained"
        color="success"
        sx={{
          marginTop: "20px",
          fontSize: "16px",
          fontWeight: "bold",
          padding: "10px 20px",
        }}
        onClick={() => navigate("/interview")}
        disabled={!cameraOn || !micOn} // ✅ Button enabled only if both are ON
      >
        I am Ready for Interview 🚀
      </Button>
    </Box>
  );
};

export default InstructionPage;
