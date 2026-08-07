
import { Outlet }
from 'react-router-dom'

import { Header, Footer }
from '../components/layout'

import styles
from './MainLayout.module.css';

export const MainLayout = () => (
	<div className={styles.container}>
	  <Header />
	  <main className="content">
	    <Outlet />
	  </main>
	  <Footer />
	</div>
);
