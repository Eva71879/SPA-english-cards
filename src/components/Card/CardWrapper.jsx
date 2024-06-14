import { useState, useEffect, useRef } from "react";
import Card from "./Card";
import styles from "./CardWrapper.module.css";
import wordsStore from "../../stores/WordsStore";
import Loader from "../UI/Loader";

const CardWrapper = ({ defaultIndex = 0 }) => {
  const { words, fetchWords } = wordsStore;
  //извлечение из store
  const [error, setError] = useState(null); // Состояние для отслеживания ошибок
  const [loading, setLoading] = useState(true); // Состояние для отслеживания загрузки
  const [learnedWords, setLearnedWords] = useState([]); // Состояние для отслеживания выученных слов

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchWords();
        setLoading(false); // Устанавливаем загрузку в false после успешного получения данных
      } catch (error) {
        console.error("Error fetching words:", error); // Лог для отображения ошибки
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

  const markAsLearned = (wordId) => {
    setLearnedWords((prevLearnedWords) => {
      if (!prevLearnedWords.includes(wordId)) {
        return [...prevLearnedWords, wordId];
      }
      return prevLearnedWords;
    });
  };

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

  // Обновленный useEffect для установки фокуса при первой отрисовке и при изменении currentCardIndex
  useEffect(() => {
    if (buttonRef.current) {
      // Проверка на наличие buttonRef.current
      buttonRef.current.focus();
    }
  }, [currentCardIndex, loading]); // Добавлен loading для установки фокуса при первой загрузке

  if (error) {
    return <div className={styles.fetchError}>Ошибка: {error}</div>;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.cardWrapper}>
      <button className={styles.prevButton} onClick={handlePrevCard}>
        <i className="fa-solid fa-arrow-left-long fa-lg"></i>
      </button>
      <Card
        english={data[currentCardIndex].english}
        transcription={data[currentCardIndex].transcription}
        russian={data[currentCardIndex].russian}
        showTranslation={showTranslation} // передала функцию ребенку (Card)
        toggleTranslation={toggleTranslation} // передала функцию ребенку (Card)
        buttonRef={buttonRef} // передаю ref в дочерний компонент
        markAsLearned={() => markAsLearned(data[currentCardIndex].id)} // передаем функцию для пометки слова как выученного
        learnedWords={learnedWords} // передаем массив выученных слов
      />
      <button className={styles.nextButton} onClick={handleNextCard}>
        <i className="fa-solid fa-arrow-right-long fa-lg"></i>
      </button>
    </div>
  );
};

export default CardWrapper;
