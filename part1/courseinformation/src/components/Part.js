import React from "react";

export const Part = ({ name, exercise }) => {
  return (
    <div>
      <p>
        {name} {exercise}
      </p>
    </div>
  );
};
