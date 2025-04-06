import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Webcam from "react-webcam";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useNavigate } from "react-router-dom";

const InterviewPage = () => {
  const questions = [
    "Tell me about yourself.",
    "What are your strengths and weaknesses?",
    "Why do you want to work for this company?",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);

  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const videoChunks = useRef([]);

  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const navigate = useNavigate();

  useEffect(() => {
    if (!listening && transcript) {
      const updatedResponses = [...responses];
      updatedResponses[currentIndex] = { question: questions[currentIndex], answer: transcript };
      setResponses(updatedResponses);
    }
  }, [listening, transcript]);

  // ✅ Check browser support for speech recognition
  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("Your browser does not support speech recognition.");
    }
  }, []);

  // ✅ Request microphone and camera permission
  useEffect(() => {
    navigator.permissions.query({ name: "microphone" }).then((result) => {
      if (result.state !== "granted") {
        alert("Microphone permission is required for recording.");
      }
    });
  }, []);

  // ✅ Start Recording
  const startRecording = async () => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("Speech Recognition is not supported in your browser.");
      return;
    }

    setIsRecording(true);
    SpeechRecognition.startListening({ continuous: true });

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          videoChunks.current.push(event.data);
        }
      };

      mediaRecorderRef.current.start();
    } catch (error) {
      alert("Error accessing camera or microphone: " + error.message);
    }
  };

  // ✅ Stop Recording
  const stopRecording = () => {
    setIsRecording(false);
    SpeechRecognition.stopListening();
    resetTranscript();

    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();

      mediaRecorderRef.current.onstop = () => {
        const videoBlob = new Blob(videoChunks.current, { type: "video/webm" });
        setVideoBlob(videoBlob);
        videoChunks.current = [];
      };
    }
  };

  // ✅ Next Question
  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      resetTranscript();
      setVideoBlob(null);
    }
  };

  // ✅ Finish Interview
  const finishInterview = () => {
    console.log("Final Responses:", responses);
    alert("Interview finished!");
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", padding: "20px" }}>
      {/* Left: Question Display */}
      <Box sx={{ flex: 1, padding: "20px" }}>
        <Typography variant="h5" fontWeight="bold">
          Question {currentIndex + 1}/{questions.length}
        </Typography>
        <Typography variant="h6" sx={{ marginTop: "10px" }}>{questions[currentIndex]}</Typography>

        {/* Speaker Button */}
        <IconButton>
          <VolumeUpIcon fontSize="large" />
        </IconButton>

        {/* Start/Stop Recording */}
        <Button
          variant="contained"
          color={isRecording ? "error" : "primary"}
          sx={{ marginTop: "20px" }}
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </Button>

        
        {/* Next or Finish Button */}
        {currentIndex < questions.length - 1 ? (
          <Button variant="contained" color="success" sx={{ marginTop: "20px" }} onClick={nextQuestion}>
            Next Question ➡️
          </Button>
        ) : (
          <Button variant="contained" color="secondary" sx={{ marginTop: "20px" }} onClick={finishInterview}>
            Finish Interview
          </Button>
        )}
      </Box>

      {/* Right: Webcam Display */}
      <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Webcam ref={webcamRef} mirrored={true} audio muted />
      </Box>
    </Box>
  );
};

export default InterviewPage;
