import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [prompt, setPrompt] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();

    const newQuestion = {
      prompt,
      answers,
      correctIndex: parseInt(correctIndex),
    };

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    })
      .then((res) => res.json())
      .then((data) => {
        onAddQuestion(data);
        setPrompt("");
        setAnswers(["", "", "", ""]);
        setCorrectIndex(0);
      });
  }

  function handleAnswerChange(index, value) {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>New Question</h3>

      <label htmlFor="prompt">Prompt:</label>
      <input
        id="prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      {answers.map((ans, index) => (
        <div key={index}>
          <label htmlFor={`answer-${index}`}>Answer {index + 1}:</label>
          <input
            id={`answer-${index}`}
            value={ans}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
          />
        </div>
      ))}

      <label htmlFor="correct-select">Correct Answer:</label>
      <select
        id="correct-select"
        aria-label="Form Correct Answer"
        value={correctIndex}
        onChange={(e) => setCorrectIndex(e.target.value)}
      >
        <option value="0">1</option>
        <option value="1">2</option>
        <option value="2">3</option>
        <option value="3">4</option>
      </select>

      <button type="submit">Add Question</button>
    </form>
  );
}

export default QuestionForm;
