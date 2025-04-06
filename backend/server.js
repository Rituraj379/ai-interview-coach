import "dotenv/config";
import express from "express";
import cors from "cors";
import interviewRoutes from "./routes/interviewRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/interview", interviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
