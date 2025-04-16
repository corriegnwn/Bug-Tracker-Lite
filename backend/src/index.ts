import express from 'express';
import cors from 'cors';
import { Bug } from 'shared/bug.model'; 

const app = express();
app.use(cors({
  origin: 'http://localhost:4200'
}));

// Middleware um JSON zu parsen
app.use(express.json());

// Bugs in memory speichern
const bugs: Bug[] = [];

// gib aktuelle Liste der Bugs als JSON zurück
app.get("/bugs", (req, res) => {
  res.json(bugs);
});

// neuen Bug erstellen
app.post("/bugs", (req, res) => {
  const { title, description, priority } = req.body;

  const bug: Bug = {
    title,
    description,
    priority,
    createdAt: new Date() // timestamp automatisch setzen
  };

  bugs.push(bug);

  res.status(201).json(bug); // HTTP-Status 201: created
});

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));