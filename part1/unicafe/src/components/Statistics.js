import React from "react";

export const Statistics = ({ good, neutral, bad, all }) => {
  const average = (good - bad) / all || 0; // Calculate average rating
  const positivePercentage = (good / all) * 100 || 0; // Calculate positive feedback percentage

  return (
    <div>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {all}</p>
      <p>average: {average}</p>
      <p>positive {positivePercentage}%</p>
    </div>
  );
};
