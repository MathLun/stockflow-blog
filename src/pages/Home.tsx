import { ProjectCTA } from '@/components/growth';

export const Home = () => (
	<section>
	  <h2>Documentando toda a evolução do StockFlow</h2>

	  <p>Uma jornada de construção de software, arquitetura, decisões técnicas e evolução de um produção real.</p>

	  <p>Building StockFlow - Documentando a evolução do StockFlow</p>

	  <button onClick={() => {
		  throw new Error("Home Page - Sentry integration test");
	  }}>Test Sentry</button>
	  <ProjectCTA source="home" />
	</section>

);
