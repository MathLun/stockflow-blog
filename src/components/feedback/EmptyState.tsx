import styles from "./EmptyState.module.css";

interface EmptyStateProps {
  title?: string;
  message?: string;
}

const EmptyState = ({
  title = "Nenhum conteúdo encontrado",
  message = "Não há conteúdo disponível no momento.",
}: EmptyStateProps) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export { EmptyState };
