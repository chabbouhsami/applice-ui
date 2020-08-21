import { TypeContrat } from '../contrat/type-contrat';

export class Salarie {
  constructor(
    public code: number,
    public lastName: string,
    public firstName: string,
    public dateEntree: Date,
    public dateSortie: Date,
    public plafond = false,
    public typeContratDTO: TypeContrat,
    public sexe: string,
    public actif: boolean
  ) {}
}
