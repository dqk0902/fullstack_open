const express = require("express");
const app = express();

const phonebookEntries = [
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

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
