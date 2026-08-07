import type { FC, ReactNode }
from 'react'

import { Header, Footer }
from '../components/layout'

import styles
from './MainLayout.module.css';

type Props = {
  children: ReactNode
}

export const MainLayout: FC<Props> = (props) => (
	<div className={styles.container}>
	  <Header />
	  <main className="content">{props.children}</main>
	  <Footer />
	</div>
);
