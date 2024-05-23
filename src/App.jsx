import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import wordsStore from "./stores/WordsStore";
import { Provider } from "mobx-react";

// Components
import Header from "./components/Header/header";
import WordList from "./components/WordList/WordList";
import CardWrapper from "./components/Card/CardWrapper";
import MissingPage from "./components/MissingPage/MissingPage";

function App() {
  return (
    <Provider store={wordsStore}>
      {" "}
      {/*создание контекста Mobx*/}
      <Router>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<WordList />} />
            <Route path="/game" element={<CardWrapper />} />
            <Route path="*" element={<MissingPage />} />{" "}
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
