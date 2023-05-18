import React from "react";

const PersonForm = ({
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        Name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default PersonForm;
