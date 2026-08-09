import { createBrowserRouter }
from 'react-router-dom';

import { MainLayout }
from '@/layouts';

import { 
	Home, 
	SeriesPage, 
	SeriesDetailsPage,  
	ArticleDetailsPage 
} from '@/pages';

const children = [
	{ path: '/', element: <Home /> },
	{ path: '/series', element: <SeriesPage /> },
	{ path: '/series/:slug', element: <SeriesDetailsPage /> },
	{ path: '/articles/:seriesSlug/:articleSlug', element: <ArticleDetailsPage />}
];

const routes = [
	{ element: <MainLayout />, 
	  children: children }
];

export const router = createBrowserRouter(routes);
