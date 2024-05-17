import { useState, useEffect } from "react";
import WordsContext from "./contexts/WordsContext";

import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header/header";
import WordList from "./components/WordList/WordList";
import CardWrapper from "./components/Card/CardWrapper";
import MissingPage from "./components/MissingPage/MissingPage";

function App() {
  const [words, setWords] = useState([]);

  // Загружаем слова при монтировании компонента
  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    const response = await fetch(`/api/words`);
    const data = await response.json();
    setWords(data);
  };

  const addWord = async (newWord) => {
    const response = await fetch("/api/words/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWord),
    });
    const data = await response.json();
    setWords((words) => [...words, data]);
  };

  const updateWord = async (updatedWord) => {
    const response = await fetch(`/api/words/${updatedWord.id}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedWord),
    });
    const data = await response.json();
    setWords(words.map((word) => (word.id === updatedWord.id ? data : word)));
  };

  const deleteWord = async (id) => {
    await fetch(`/api/words/${id}/delete`, {
      method: "POST",
    });
    setWords(words.filter((word) => word.id !== id));
  };

  return (
    <WordsContext.Provider
      value={{
        words: words,
        fetchWords: fetchWords,
        addWord,
        updateWord,
        deleteWord,
      }}
      // устанавливает значение контекста. Это значение становится доступно всем компонентам, которые обернуты в WordsContext.Provider.
    >
      <Router>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<WordList />} />
            <Route path="/game" element={<CardWrapper />} />
            <Route path="*" element={<MissingPage />} />
          </Routes>
        </div>
      </Router>
    </WordsContext.Provider>
  );
}

export default App;
