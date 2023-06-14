const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
morgan.token("req-body", (req) => JSON.stringify(req.body));

// Configure morgan to include the custom token
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :req-body"
  )
);

const { v4: uuidv4 } = require("uuid");
let phonebookEntries = [
  {
    id: 1,
    name: "Arto Hermanie",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Sudan",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(phonebookEntries);
});

app.get("/info", (req, res) => {
  const currentTime = new Date();

  res.send(`
    <div>
      <p>Phonebook has info for ${phonebookEntries.length} people</p>
      <p>Request received at: ${currentTime}</p>
    </div>
  `);
});
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const entry = phonebookEntries.find((entry) => entry.id === id);

  if (entry) {
    res.json(entry);
  } else {
    res.status(404).json({ error: "Phone number not found" });
  }
});
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedPhonebookEntries = phonebookEntries.filter(
    (entry) => entry.id !== id
  );
  phonebookEntries = updatedPhonebookEntries;
  res.status(204).end();
});
app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json({ error: "Name or number is missing" });
  }
  const existingEntry = phonebookEntries.find((entry) => entry.name === name);
  if (existingEntry) {
    return res
      .status(409)
      .json({ error: "Name already exists in the phonebook" });
  }
  const newEntry = {
    id: uuidv4(),
    name,
    number,
  };

  phonebookEntries.push(newEntry);

  res.status(201).json(newEntry);
});
// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
