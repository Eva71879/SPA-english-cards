import styles from '../Footer/footer.module.css'

function Footer() {
  

  return (
    <>
    <div className={styles.footer}>
      <button className={styles.button}>учить слова</button>
      <button className={styles.button}>к списку слов</button>
    </div>
    </>
  )
}

export default Footer;