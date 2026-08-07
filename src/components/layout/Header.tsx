import styles from './Header.module.css';

export const Header = () => (
	<header className={styles.container}>
	  <h1 className={styles.brand}>Building StockFlow</h1>
	  <button className={styles.button}>
	    Começar a ler
	  </button>
	</header>
);
