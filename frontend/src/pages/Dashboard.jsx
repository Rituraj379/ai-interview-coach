import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import {
  Box,
  Card,
  CardActionArea,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Slide,
} from "@mui/material";
import { motion } from "framer-motion";
import AssessmentIcon from "@mui/icons-material/Assessment";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const CountUp = ({ end, label, Icon }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = end / (duration / 20);
    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(interval);
      }
      setCount(Math.floor(start));
    }, 20);

    return () => clearInterval(interval);
  }, [end]);

  return (
    <Box textAlign="center">
      <Icon style={{ fontSize: 36, color: "#ffffff", marginBottom: 4 }} />
      <Typography variant="h5" fontWeight="bold">
        {count}
        {typeof end === "number" && end < 100 ? "%" : "+"}
      </Typography>
      <Typography variant="body1">{label}</Typography>
    </Box>
  );
};

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    techStack: "",
    experienceLevel: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStartInterview = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/interview/generate",
        formData
      );
      console.log("Interview Questions:", response.data);
      navigate("/instructions");
    } catch (error) {
      console.error("Error fetching interview questions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Box
        sx={{
          padding: "40px",
          textAlign: "center",
          background: "linear-gradient(to right, #38d39f, #1e90ff)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h4"
            gutterBottom
            fontWeight="bold"
            sx={{ color: "#ffffff" }}
          >
            Welcome to Interview Dashboard
          </Typography>
        </motion.div>

        <Box
          component="img"
          src="https://i.ibb.co/WWTp6DzM/Whats-App-Image-2025-04-06-at-20-01-44-3e50ede1.jpg"
          alt="Dashboard Illustration"
          sx={{
            width: "80%",
            maxWidth: "600px",
            borderRadius: "8px",
            marginTop: "16px",
            boxShadow: 3,
          }}
        />

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card
            sx={{
              width: 300,
              padding: "20px",
              backgroundColor: "#3498db",
              color: "white",
              cursor: "pointer",
              borderRadius: "12px",
              boxShadow: 4,
              textAlign: "center",
              marginTop: "20px",
            }}
            onClick={() => setOpen(true)}
          >
            <CardActionArea>
              <Typography variant="h6" fontWeight="bold">
                + Create Interview
              </Typography>
            </CardActionArea>
          </Card>
        </motion.div>

        {/* Animated Stats Section */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 4,
            mt: 6,
            width: "100%",
            maxWidth: 800,
          }}
        >
          <CountUp end={8000} label="Interview Questions" Icon={AssessmentIcon} />
          <CountUp end={3000} label="Career Pathways" Icon={BusinessCenterIcon} />
          <CountUp end={97} label="Customer Satisfaction" Icon={EmojiEventsIcon} />
          <CountUp end={90} label="Time Efficiency" Icon={AccessTimeIcon} />
        </Box>

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          TransitionComponent={Slide}
          TransitionProps={{ direction: "up" }}
        >
          <DialogTitle>Create an Interview</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Job Title"
              name="jobTitle"
              margin="dense"
              value={formData.jobTitle}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Job Description"
              name="jobDescription"
              margin="dense"
              value={formData.jobDescription}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Tech Stack"
              name="techStack"
              margin="dense"
              value={formData.techStack}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Experience Level"
              name="experienceLevel"
              margin="dense"
              value={formData.experienceLevel}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpen(false)}
              color="error"
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              onClick={handleStartInterview}
              color="primary"
              variant="contained"
              disabled={loading}
            >
              {loading ? <BeatLoader color="white" size={8} /> : "Start Interview"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </motion.div>
  );
};

export default Dashboard;
