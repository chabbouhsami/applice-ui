import { Vente } from '../vente/vente';

export class Cart {
  total = 0;
  ventes: Array<Vente> = new Array<Vente>();
}
