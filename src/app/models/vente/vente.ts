import { Article } from '../article/article';
import { Salarie } from '../salarie/salarie';
import { User } from '../user/user';

export class Vente {
  article: Article;
  salarie: Salarie;
  vendeur: User;
  nombre: number;
  montant: number;
  date: Date;
  venteMois: number;
  venteAnne: string;
  typeVente: string;
  subvention: number;
  commentaire: string;
  quantiteSigne: string;
  montantSigne: string;
}
