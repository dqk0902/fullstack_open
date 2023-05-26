import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import { getAll, create, update, deletePerson } from "./server/CRUD_phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const personsData = await getAll();
        setPersons(personsData);
      } catch (error) {
        console.log(error);
        alert("Failed to fetch persons from the server.");
      }
    };

    fetchData();
  }, []);
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = async (event) => {
    event.preventDefault();

    if (!newName || !newNumber) {
      alert("Please enter a name and a number.");
      return;
    }

    const newPerson = { name: newName, number: newNumber };

    const personExists = persons.find((person) => person.name === newName);

    if (personExists) {
      const shouldReplace = window.confirm(
        `${newName} is already added to the phonebook. Replace the old number with the new one?`
      );

      if (shouldReplace) {
        try {
          const updatedPerson = await update(personExists.id, newPerson);
          setPersons(
            persons.map((person) =>
              person.id === updatedPerson.id ? updatedPerson : person
            )
          );
          alert(`Phone number for ${newName} updated successfully.`);
        } catch (error) {
          console.log(error);
          alert("Failed to update person on the server.");
        }
      }
    } else {
      try {
        const response = await create(newPerson);
        setPersons([...persons, response]);
        alert(`${newName} is added successfully to the phonebook.`);
      } catch (error) {
        console.log(error);
        alert("Failed to add person to the server.");
      }
    }
    setNewName("");
    setNewNumber("");
  };

  const handleDelete = async (id) => {
    try {
      await deletePerson(id);
      const updatedPersons = persons.filter((person) => person.id !== id);
      setPersons(updatedPersons);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
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

      <Person
        persons={persons}
        filterValue={filterValue}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
