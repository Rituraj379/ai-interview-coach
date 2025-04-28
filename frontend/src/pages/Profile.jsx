import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Candidate Name",
    role: "Aspiring AI Engineer",
    projects: 10,
    certifications: 5,
    experience: 3,
    bio: [
      "Proficient in Python, TensorFlow, and React",
      "Completed AI specialization from Coursera",
      "Developed an AI-based interview preparation tool",
      "Passionate about machine learning and NLP",
    ],
    profilePicture: "https://via.placeholder.com/150",
  });

  const handleEditClick = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileData({ ...profileData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(to right, #30cfd0, #330867)", // Updated background
        padding: 3,
        animation: `${fadeIn} 0.8s ease-out`,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          textAlign: "center",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: 5,
          paddingBottom: 4,
        }}
      >
        {/* Header Gradient */}
        <Box
          sx={{
            height: 150,
            background: "linear-gradient(135deg, #3498db, #2ecc71)",
            borderRadius: "12px 12px 0 0",
          }}
        />

        {/* Profile Picture */}
        <Avatar
          src={profileData.profilePicture}
          alt="Profile Picture"
          sx={{
            width: 100,
            height: 100,
            margin: "-50px auto 10px",
            border: "4px solid white",
          }}
        />
        <Button variant="outlined" component="label" sx={{ mt: 1 }}>
          Upload Photo
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleProfilePictureChange}
          />
        </Button>

        {/* Name & Role */}
        <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
          {profileData.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {profileData.role}
        </Typography>

        {/* Stats */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={4}>
            <Typography variant="h6" fontWeight="bold">
              {profileData.projects}
            </Typography>
            <Typography variant="body2">Projects</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" fontWeight="bold">
              {profileData.certifications}
            </Typography>
            <Typography variant="body2">Certifications</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" fontWeight="bold">
              {profileData.experience}
            </Typography>
            <Typography variant="body2">Years Experience</Typography>
          </Grid>
        </Grid>

        {/* Bio */}
        <Box sx={{ mt: 2, textAlign: "left", px: 3 }}>
          {profileData.bio.map((item, index) => (
            <Typography key={index} variant="body1" sx={{ mb: 1 }}>
              • {item}
            </Typography>
          ))}
        </Box>

        {/* Buttons */}
        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-around", px: 2 }}>
          <Button variant="outlined" color="primary">
            Message
          </Button>
          <Button variant="outlined" color="primary">
            View Resume
          </Button>
          <Button variant="contained" color="primary" onClick={handleEditClick}>
            Edit Profile
          </Button>
        </Box>
      </Box>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            name="name"
            margin="dense"
            value={profileData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Role"
            name="role"
            margin="dense"
            value={profileData.role}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Projects"
            name="projects"
            margin="dense"
            type="number"
            value={profileData.projects}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Certifications"
            name="certifications"
            margin="dense"
            type="number"
            value={profileData.certifications}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Years Experience"
            name="experience"
            margin="dense"
            type="number"
            value={profileData.experience}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditing(false)} color="error">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
