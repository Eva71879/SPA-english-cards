// Main.jsx
import React from "react";
import styles from "../Content/Content.module.css";
import CardWrapper from "./Card/CardWrapper";
import WordList from "./WordList/WordList";

const Content = () => {
  return (
    <div>
      <div className={styles.wrapper}>
        {/* <p className={styles.title}>учи предложенные слова или добавляй свои для изучения!</p>
         */}
        <WordList />
        {/* <CardWrapper /> */}
      </div>
    </div>
  );
};

export default Content;
