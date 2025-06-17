const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;
const DATA_PATH = path.join(__dirname, "data", "events.json");

app.use(cors());
app.use(express.json());

const readEvents = () => JSON.parse(fs.readFileSync(DATA_PATH));
const writeEvents = (data) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
};

app.get("/", (req, res) => {
  res.send("Event Management API is running!");
});

app.get("/api/events", (req, res) => {
  try {
    const events = readEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error reading event data" });
  }
});

app.get("/api/events/:id", (req, res) => {
  const events = readEvents();
  const event = events.find((e) => e.id === parseInt(req.params.id));
  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ message: "Event not found" });
  }
});

app.post("/api/events", (req, res) => {
  const events = readEvents();
  const newEvent = { ...req.body, id: Date.now() };
  events.push(newEvent);
  writeEvents(events);
  res.status(201).json(newEvent);
});


app.put("/api/events/:id", (req, res) => {
  let events = readEvents();
  const id = parseInt(req.params.id);
  events = events.map((e) => (e.id === id ? { ...e, ...req.body } : e));
  writeEvents(events);
  res.json({ message: "Event updated successfully" });
});

app.delete("/api/events/:id", (req, res) => {
  let events = readEvents();
  events = events.filter(e => e.id !== parseInt(req.params.id));
  writeEvents(events);
  res.json({ message: "Event deleted successfully" });
});


app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
