import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [message, setMessage] = useState(null);

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (!newName || !newNumber) {
      setMessage("Please enter a name and a number.");
      return;
    }

    const newPerson = { name: newName, number: newNumber };

    const personExists = persons.some((person) => person.name === newName);

    if (personExists) {
      setMessage(`${newName} is already added to phonebook`);
    } else {
      setPersons([...persons, newPerson]);
      setMessage(`${newName} is added succesfully to phonebook`);
    }

    setTimeout(() => {
      setNewName("");
      setNewNumber("");
      setMessage(null);
    }, 3000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {message && <div>{message}</div>}
      <Filter
        filterValue={filterValue}
        handleFilterChange={handleFilterChange}
      />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleSubmit={addPerson}
      />

      <h3>Numbers</h3>

      <Person persons={persons} filterValue={filterValue} />
    </div>
  );
};

export default App;
