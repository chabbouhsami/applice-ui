import { Injectable } from '@angular/core';
import { Adapter } from '../adapter';
import { Salarie } from 'src/app/models/salarie/salarie';

@Injectable({
  providedIn: 'root',
})
export class SalarieAdapter implements Adapter<Salarie> {
  adapt(item: Salarie): Salarie {
    return new Salarie(
      item.code,
      item.lastName,
      item.firstName,
      item.dateEntree ? new Date(item.dateEntree) : null,
      item.dateSortie ? new Date(item.dateSortie) : null,
      item.plafond,
      item.typeContratDTO,
      item.sexe,
      item.actif
    );
  }
}
