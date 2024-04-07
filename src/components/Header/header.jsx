import styles from '../Header/header.module.css'

export default function Header() {
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>WordWizard</h1>
        <h2 className={styles.subtitle}>английский как по волшебству</h2>
      </div>
    </>
  )
}