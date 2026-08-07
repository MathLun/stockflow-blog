import { createBrowserRouter }
from 'react-router-dom';

import { MainLayout }
from '@/layouts';

import { Home }
from '@/pages';

const children = [
	{ path: '/', element: <Home /> }
];

const routes = [
	{ element: <MainLayout />, 
	  children: children }
];

export const router = createBrowserRouter(routes);
