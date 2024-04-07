import React from 'react';
import styles from './Card.module.css'

function Card() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.cardBody}>
        <div className={styles.cardMain}>
            <p className={styles.title}>Apple</p>
            <p className={styles.transcription}>[apl]</p>
        </div>
        <div className={styles.cardFooter}>
            <button className={styles.button}>перевод</button>
            <div className={styles.translationWrapper}><p className={styles.translation}>яблоко</p></div>
        </div>
      </div>
    </div>
  )
}

export default Card
