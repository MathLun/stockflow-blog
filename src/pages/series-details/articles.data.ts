import type { Article }
from '@/../types/article';

export const articles: Article[] = [
  {
    id: 1,
    title: "Introdução",
    slug: "00-introduction",
    path: "docs/building-stockflow/README.md",
  },
  {
    id: 2,
    title: "Sprint 01 — Planejamento",
    slug: "01-planning",
    path: "docs/building-stockflow/sprint-01/README.md",
  },
  {
    id: 3,
    title: "Arquitetura do módulo",
    slug: "02-architecture",
    path: "docs/building-stockflow/sprint-01/architecture.md",
  },
  {
    id: 4,
    title: "Product Catalog",
    slug: "03-product-catalog",
    path: "docs/building-stockflow/sprint-01/product-catalog.md",
  },
  {
    id: 5,
    title: "Domain Model",
    slug: "04-domain-model",
    path: "docs/building-stockflow/sprint-01/domain-model.md",
  },
];
