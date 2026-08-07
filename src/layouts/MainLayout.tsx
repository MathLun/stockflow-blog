import type { FC, ReactNode }
from 'react'

import { Header, Footer }
from '../components/layout'

type Props = {
  children: ReactNode
}

export const MainLayout: FC<Props> = (props) => (
	<>
	  <Header />
	  <main className="content">{props.children}</main>
	  <Footer />
	</>
);
