import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const WEBHOOK_URL = process.env.WEBHOOK_URL;

app.get("/", (req, res) => {
  res.send("Voting backend is running");
});

app.post("/submit-vote", async (req, res) => {
  const { content } = req.body;

  if (!content) return res.status(400).send("Missing content.");

  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    res.status(200).send("Vote submitted!");
  } catch (error) {
    console.error("Error sending to Discord:", error);
    res.status(500).send("Failed to submit vote.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
