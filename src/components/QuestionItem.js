import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  function handleDelete() {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
    }).then(() => onDelete(question.id));
  }

  function handleChange(e) {
    const newIndex = parseInt(e.target.value, 10);
    const updatedQuestion = { ...question, correctIndex: newIndex };

    // ✅ Optimistic UI update
    onUpdate(updatedQuestion);

    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: newIndex }),
    })
      .then((res) => res.json())
      .then((updated) => onUpdate(updated));
  }

  return (
    <li>
      <h3>{question.prompt}</h3>
      <ul>
        {question.answers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>

      <label>
        Correct Answer:
        <select
          aria-label={`Correct Answer for ${question.prompt}`}
          value={question.correctIndex}
          onChange={handleChange}
        >
          {question.answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>

      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
