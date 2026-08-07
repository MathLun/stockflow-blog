import type { FC }
from 'react';

import { Link }
from 'react-router-dom'

import type { SeriesCardProps }
from './SeriesCard.props'

import styles from './SeriesCard.module.css';

export const SeriesCard: FC<SeriesCardProps> = (props) => (
	<article className={styles.card}>
	 <div className={styles.content}>
	   <span className={styles.badge}>Série</span>
	   <h2 className={styles.title}>{props.title}</h2>
	 </div>
	 <footer className={styles.footer}>
	   <span className={styles.articles}>{props.articleCount} artigos</span>

	   <Link to={props.href} className={styles.button}>Ler série </Link>
	 </footer>
	</article>
);
