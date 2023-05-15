import React from "react";

export const Total = ({ parts }) => {
  console.log(parts);
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <div>
      <p>Number of exercises {totalExercises}</p>
    </div>
  );
};
