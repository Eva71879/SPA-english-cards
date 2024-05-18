import React from "react";
import styles from "./Card.module.css";

function Card(props) {
  const {
    english,
    transcription,
    russian,
    showTranslation,
    toggleTranslation,
    buttonRef, //принимаю реф от родителя
    learnedWords,
    markAsLearned,
  } = props; //принимаю пропсы от родителя (CardWrapper)

  const handleTranslationClick = () => {
    toggleTranslation(); // показываем или скрываем перевод
    markAsLearned(); // Помечаем слово как выученное
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.cardBody}>
        <div className={styles.cardMain}>
          <p className={styles.title}>{english}</p>
          <p className={styles.transcription}>{transcription}</p>
        </div>
        <div className={styles.cardFooter}>
          {showTranslation ? (
            <div className={styles.translationWrapper}>
              <p className={styles.translation}>{russian}</p>
            </div>
          ) : (
            <button
              ref={buttonRef} //устанавливаю реф на кнопку
              className={styles.button}
              onClick={handleTranslationClick}
            >
              перевод
            </button>
          )}
        </div>
      </div>
      <p className={styles.counter}>
        Выучено слов сегодня: {learnedWords.length}
      </p>
    </div>
  );
}

export default Card;
