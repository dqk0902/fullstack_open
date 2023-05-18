import React from "react";

const Persons = ({ persons, filterValue }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div>
      {filteredPersons.map((person) => (
        <p key={person.name + person.number}>
          {person.name} - {person.number}
        </p>
      ))}
    </div>
  );
};

export default Persons;
