import { useState } from "react";
import { Statistics } from "./components/Statistics";
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const handleFeedback = (type) => {
    if (type === "good") {
      setGood(good + 1);
    } else if (type === "neutral") {
      setNeutral(neutral + 1);
    } else if (type === "bad") {
      setBad(bad + 1);
    }
  };
  const all = good + neutral + bad;
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => handleFeedback("good")}>good</button>
      <button onClick={() => handleFeedback("neutral")}>neutral</button>
      <button onClick={() => handleFeedback("bad")}>bad</button>
      <h1>statistics</h1>
      {all === 0 ? (
        <div>No feedback given</div>
      ) : (
        <Statistics good={good} neutral={neutral} bad={bad} all={all} />
      )}
    </div>
  );
};

export default App;
