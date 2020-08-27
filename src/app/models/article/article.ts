import { TypeArticle } from './type-article';

export class Article {
  code: number;
  libelle: string;
  type: TypeArticle;
  prixInfPlafond: number;
  prixSupPlafond: number;
  subventionSupPlafond: number;
  subventionInfPlafond: number;
  quantiteStock: number;
  alerteStock: number;
  pourEnfants = false;
  actif = true;
}
