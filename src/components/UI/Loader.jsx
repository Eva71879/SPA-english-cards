import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.cssloadPreloader}>
      <div className={styles.cssloadPreloaderBox}>
        {" "}
        <div>L</div> <div>o</div> <div>a</div> <div>d</div> <div>i</div>{" "}
        <div>n</div> <div>g</div>
      </div>
    </div>
  );
};

export default Loader;
