import { Link, useLocation }
from 'react-router-dom';

import styles from './Header.module.css';

export const Header = () => {
	const { pathname } = useLocation();
	const isHomePage = pathname === "/";
	return (
	  <header className={styles.container}>
	  <h1 className={styles.brand}>
	    <Link to="/">
	      StockFlow Blog
	    </Link>
	  </h1>

	  {isHomePage && (
	  <button className={styles.button}><Link to="/series">Começar a ler</Link></button>)}
	</header>
	)
}
