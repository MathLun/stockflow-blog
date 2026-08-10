import { SeriesCard }
from '@/components/series';

import { ProjectCTA } from '@/components/growth';

export const SeriesPage = () => (
	<section>
	  <header>
	    <h1>Séries</h1>
	    <p>
	     Acompanhe as séries de desenvolvimento, arquitetura e evolução dos projetos.
	    </p>
	  </header>
	  <SeriesCard title="Building StockFlow" description="" href="/series/building-stockflow" articleCount={8} />
	  <ProjectCTA source="series" />
	</section>
);
