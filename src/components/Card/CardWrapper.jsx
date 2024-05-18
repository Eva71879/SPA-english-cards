import { useState, useEffect, useRef, useContext } from "react";
import WordsContext from "../../contexts/WordsContext";
import Card from "./Card";
import Loader from "../UI/Loader";
import styles from "./CardWrapper.module.css";

const CardWrapper = ({ defaultIndex = 0 }) => {
  const { words, fetchWords } = useContext(WordsContext);
  const [error, setError] = useState(null); // Состояние для отслеживания ошибок
  const [loading, setLoading] = useState(true); // Состояние для отслеживания загрузки
  const [learnedWords, setLearnedWords] = useState([]); // Состояние для отслеживания выученных слов

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchWords();
        setLoading(false); // Устанавливаем загрузку в false после успешного получения данных
      } catch (error) {
        setError(error.message);
        setLoading(false); // Устанавливаем загрузку в false в случае ошибки
      }
    };

    fetchData();
  }, [fetchWords]);

  const data = words;

  const [currentCardIndex, setCurrentCardIndex] = useState(defaultIndex);
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

  const toggleTranslation = () => {
    setShowTranslation(!showTranslation); //функция переключения отображения и скрытия перевода
  };

  const markAsLearned = (wordId) => {
    setLearnedWords((prevLearnedWords) => {
      if (!prevLearnedWords.includes(wordId)) {
        return [...prevLearnedWords, wordId];
      }
      return prevLearnedWords;
    });
  };

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [loading]); //устанавливаю эффект на объявленный ref

  return (
    <>
      {error ? (
        <div className={styles.fetchError}>Ошибка: {error}</div>
      ) : loading ? (
        <Loader />
      ) : (
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
            buttonRef={buttonRef} //передаю ref в дочерний компонент
            markAsLearned={() => markAsLearned(data[currentCardIndex].id)} // передаем функцию для пометки слова как выученного
            learnedWords={learnedWords} // передаем массив выученных слов
          />
          <button className={styles.nextButton} onClick={handleNextCard}>
            <i className="fa-solid fa-arrow-right-long fa-lg"></i>
          </button>
        </div>
      )}
    </>
  );
};

export default CardWrapper;
