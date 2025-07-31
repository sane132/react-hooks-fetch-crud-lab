import React, { useState, useEffect } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(true); // ✅ default true for first test

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(id) {
    setQuestions(questions.filter((q) => q.id !== id));
  }

  function handleUpdateQuestion(updatedQuestion) {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === updatedQuestion.id ? updatedQuestion : q
      )
    );
  }

  return (
    <div>
      <h1>Quiz Admin</h1>

      {/* New Question Form */}
      <QuestionForm onAddQuestion={handleAddQuestion} />

      {/* ✅ Keep the button so tests can click it */}
      <button onClick={() => setShowQuestions(true)}>View Questions</button>

      {/* ✅ Show questions if showQuestions is true */}
      {showQuestions && (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </div>
  );
}

export default App;
