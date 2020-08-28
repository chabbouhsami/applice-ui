import { Salarie } from '../salarie/salarie';

export class Enfant {
  code: number;
  lastName: string;
  firstName: string;
  dateNaissance: Date;
  dateDeces: Date;
  actif: boolean;
  salarie: Salarie;
}
