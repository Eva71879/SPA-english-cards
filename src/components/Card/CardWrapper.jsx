import { useState, useEffect, useRef, useContext } from "react";
import WordsContext from "../../contexts/WordsContext";
import Card from "./Card";
// import data from "../../data/data.json";
import styles from "./CardWrapper.module.css";

const CardWrapper = ({ defaultIndex = 0 }) => {
  const { words, fetchWords } = useContext(WordsContext);

  useEffect(() => {
    fetchWords();
  }, []);

  const data = words;

  const [currentCardIndex, setCurrentCardIndex] = useState(defaultIndex);
  const [countTranslationClick, setCountTranslationClick] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const buttonRef = useRef(null); //объявляю ref

  const handleNextCard = () => {
    if (currentCardIndex < data.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowTranslation(false); //обнуляем вывод перевода
    } else {
      setCurrentCardIndex(0);
      setShowTranslation(false); //обнуляем вывод перевода
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowTranslation(false); //обнуляем вывод перевода
    } else {
      setCurrentCardIndex(data.length - 1 - currentCardIndex);
      setShowTranslation(false); //обнуляем вывод перевода
    }
  };

  const increment = () => {
    setCountTranslationClick(countTranslationClick + 1); //функция увеличения счетчика
  };

  const toggleTranslation = () => {
    setShowTranslation(!showTranslation); //функция переключения отображения и скрытия перевода
  };

  useEffect(() => {
    buttonRef.current.focus();
  }, [currentCardIndex]); //устанавливаю эффект на объявленный ref

  return (
    <div className={styles.cardWrapper}>
      <button className={styles.prevButton} onClick={handlePrevCard}>
        <i className="fa-solid fa-arrow-left-long fa-lg"></i>
      </button>
      <Card
        english={data[currentCardIndex].english}
        transcription={data[currentCardIndex].transcription}
        russian={data[currentCardIndex].russian}
        showTranslation={showTranslation} //передала функцию ребенку (Card)
        toggleTranslation={toggleTranslation} //передала функцию ребенку (Card)
        increment={increment} //передала функцию ребенку (Card)
        countTranslationClick={countTranslationClick} //передала функцию ребенку (Card)
        buttonRef={buttonRef} //передаю ref в дочерний компонент
      />
      <button className={styles.nextButton} onClick={handleNextCard}>
        <i className="fa-solid fa-arrow-right-long fa-lg"></i>
      </button>
    </div>
  );
};

// CardWrapper.defaultProps = {
//   defaultIndex: 0,
// };

export default CardWrapper;
