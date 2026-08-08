import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div
      className={styles.container}
      role="status"
      aria-live="polite"
    >
      <span className={styles.spinner} />
      <span>Carregando...</span>
    </div>
  );
};

export { Loading };
