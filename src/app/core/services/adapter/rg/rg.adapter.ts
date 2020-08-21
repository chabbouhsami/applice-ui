import { Injectable } from '@angular/core';
import { Adapter } from '../adapter';
import { Rg } from 'src/app/models/rg/rg';

@Injectable({
  providedIn: 'root',
})
export class RgAdapter implements Adapter<Rg> {
  adapt(item: Rg): Rg {
    return new Rg(
      item.ageEnfant,
      item.dateAnciennete ? new Date(item.dateAnciennete) : null
    );
  }
}
