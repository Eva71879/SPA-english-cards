// Main.jsx
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "../Content/Content.module.css";
import CardWrapper from "./Card/CardWrapper";
import WordList from "../WordList/WordList";

const Content = () => {
  return (
    <div>
      <div className={styles.wrapper}>
        <WordList />
        <CardWrapper />
      </div>
    </div>
    // <Router>
    //   <div>
    //     <div className={styles.wrapper}>
    //       <Routes>
    //         <Route path="/" element={<WordList />} />
    //         <Route path="/game" element={<CardWrapper />} />
    //       </Routes>
    //     </div>
    //   </div>
    // </Router>
  );
};

export default Content;
