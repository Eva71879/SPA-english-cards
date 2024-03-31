import styles from '../Footer/footer.module.css'

function Footer() {
  

  return (
    <>
    <div className="footer">
    <button className={styles.button}>Учить слова</button>
    <button className={styles.button}>К списку слов</button>
    </div>
    </>
  )
}

export default Footer;
