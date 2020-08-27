import { User } from '../user/user';
import { Article } from '../article/article';

export class Approvisionnement {
  code: number;
  user: User;
  article: Article;
  nombre: number;
  type: string;
  dateAppro: Date;
  montantTotal: number;
  montantSigne: number;
  quantite: number;
  commentaire: string;
}
