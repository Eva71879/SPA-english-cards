import { createContext } from "react";

const WordsContext = createContext({
  words: [],
  fetchWords: () => {},
  addWord: () => {},
  updateWord: () => {},
  deleteWord: () => {},
});

export default WordsContext;
// Этот контекст хранит данные и функции, связанные со словами, которые будут доступны всем компонентам, находящимся в его пределах.
// Начальный набор данных и функций в контексте пустой (words: [], fetchWords: () => {}, ...), они будут заполнены позже.
