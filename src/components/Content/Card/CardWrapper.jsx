import { useState } from 'react';
import Card from './Card';
import data from '../../../data/data.json'
import styles from './CardWrapper.module.css';

const CardWrapper = ({defaultIndex = 0}) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(defaultIndex);

  const handleNextCard = () => {
    if (currentCardIndex < data.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  return (
    <div className={styles.cardWrapper}>
        <button className={styles.prevButton} onClick={handlePrevCard}><i className="fa-solid fa-arrow-left-long fa-lg"></i></button>
      <Card
        english={data[currentCardIndex].english}
        transcription={data[currentCardIndex].transcription}
        russian={data[currentCardIndex].russian}
      />
        <button className={styles.nextButton} onClick={handleNextCard}><i className="fa-solid fa-arrow-right-long fa-lg"></i></button>
    </div>
  );
}

CardWrapper.defaultProps = {
  defaultIndex: 0
};

export default CardWrapper;
