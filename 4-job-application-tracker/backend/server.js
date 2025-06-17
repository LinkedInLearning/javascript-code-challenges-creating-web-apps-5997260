const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, "jobs.json");

app.use(cors());
app.use(express.json());

function readJobs() {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

function writeJobs(jobs) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(jobs, null, 2));
}

app.get("/api/jobs", (req, res) => {
  res.json(readJobs());
});

app.post("/api/jobs", (req, res) => {
  const jobs = readJobs();
  const newJob = {
    id: Date.now(),
    ...req.body,
    status: req.body.status || "applied",
  };
  jobs.push(newJob);
  writeJobs(jobs);
  res.status(201).json(newJob);
});

app.delete("/api/jobs/:id", (req, res) => {
  const jobs = readJobs();
  const updated = jobs.filter((job) => job.id !== Number(req.params.id));
  writeJobs(updated);
  res.status(204).send();
});

app.patch("/api/jobs/:id", (req, res) => {
  const jobs = readJobs();
  const job = jobs.find((job) => job.id === Number(req.params.id));
  if (job) {
    Object.assign(job, req.body); // can update status or favorite
    writeJobs(jobs);
    res.json(job);
  } else {
    res.status(404).json({ message: "Job not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
