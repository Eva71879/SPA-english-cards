import { useState, useEffect } from 'react';
import styles from './Card.module.css';

function Card(props) {
  const { english, transcription, russian } = props;
  const [showTranslation, setShowTranslation] = useState(false);

  const toggleTranslation = () => {
    setShowTranslation(!showTranslation);
  };

  useEffect(() => {
    setShowTranslation(false);
  }, [props]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.cardBody}>
        <div className={styles.cardMain}>
          <p className={styles.title}>{english}</p>
          <p className={styles.transcription}>{transcription}</p>
        </div>
        <div className={styles.cardFooter}>
          {showTranslation ? (
            <div className={styles.translationWrapper}><p className={styles.translation}>{russian}</p></div>
          ) : (
            <button className={styles.button} onClick={toggleTranslation}>перевод</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
