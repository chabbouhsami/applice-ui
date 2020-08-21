import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import { Salarie } from 'src/app/models/salarie/salarie';
import { SalarieService } from 'src/app/core/services/salarie/salarie.service';
import { TypeContrat } from 'src/app/models/contrat/type-contrat';
import { TypeContratService } from 'src/app/core/services/contrat/type-contrat.service';
import { SalarieAdapter } from 'src/app/core/services/adapter/salarie/salarie.adapter';

@Component({
  selector: 'app-salarie',
  templateUrl: './salarie.component.html',
  styleUrls: ['./salarie.component.scss'],
})
export class SalarieComponent implements OnInit {
  entities$: Promise<Salarie[]>;
  entity: Salarie = this.adapter.adapt(this.getEmptySalarie());

  contrats$: Observable<TypeContrat[]>;
  displayMessageModal: boolean;
  messageModal: string;
  actionButton: string;
  sexes = [
    { id: 'F', value: 'Femme' },
    { id: 'M', value: 'Homme' },
  ];
  titleSaveOrUpdate: string;
  saveLabel: string;
  updateLabel: string;
  deleteLabel: string;

  constructor(
    private entityService: SalarieService,
    private translate: TranslateService,
    private contratService: TypeContratService,
    private adapter: SalarieAdapter
  ) {}

  ngOnInit(): void {
    this.entity = this.adapter.adapt(this.getEmptySalarie());
    this.getSalaries();
    this.getContrats();
    this.translate.get('button.save').subscribe((translation) => {
      this.saveLabel = translation;
      this.actionButton = translation;
    });

    this.translate.get('button.update').subscribe((translation) => {
      this.updateLabel = translation;
    });

    this.translate.get('button.delete').subscribe((translation) => {
      this.deleteLabel = translation;
    });
  }

  async saveOrUpdateSalarie(addSalarieForm: NgForm): Promise<void> {
    this.displayMessageModal = false;
    if (!addSalarieForm.valid) {
      this.buildMessageModal('Error in the form');
    }
    if (this.actionButton === this.saveLabel) {
      this.saveNewSalarie(this.entity);
    } else if (this.actionButton === this.updateLabel) {
      this.updateSalarie(this.entity);
    }
    this.displayMessageModal = true;
    this.entity = this.adapter.adapt(this.getEmptySalarie());
    this.actionButton = this.saveLabel;
    this.getSalaries();
  }

  saveNewSalarie(entity: Salarie): void {
    this.entityService.saveSalarie(entity).subscribe(
      (result: Salarie) => {
        if (result.code) {
          this.buildMessageModal('Save operation correctly done');
        }
      },
      (error) => {
        this.buildMessageModal('An error occurs when saving the entity data');
      }
    );
  }

  getSalaries(): void {
    this.entities$ = this.entityService.loadSalaries();
  }

  getContrats(): void {
    this.contrats$ = this.contratService.loadContrats();
  }

  setUpdateSalarie(entity: Salarie): void {
    this.titleSaveOrUpdate = 'Update Book Form';
    this.actionButton = this.updateLabel;
    this.entity = Object.assign({}, entity);
    this.displayMessageModal = false;
  }

  updateSalarie(entity: Salarie): void {
    this.entityService.updateSalarie(entity).subscribe(
      (result: Salarie) => {
        if (result.code) {
          this.buildMessageModal('Update operation correctly done');
          this.displayMessageModal = true;
        }
      },
      (error) => {
        this.buildMessageModal('An error occurs when saving the entity data');
      }
    );
  }

  deleteSalarie(entity: Salarie): void {
    this.entityService.deleteSalarie(entity).subscribe(
      (result: Salarie) => {
        if (result.code) {
          this.getSalaries();
          this.buildMessageModal('Delete operation correctly done');
          this.displayMessageModal = true;
        }
      },
      (error) => {
        this.buildMessageModal('An error occurs when saving the entity data');
      }
    );
    this.getSalaries();
  }

  getEmptySalarie(): Salarie {
    return new Salarie(
      0,
      '',
      '',
      undefined,
      undefined,
      false,
      new TypeContrat(),
      '',
      false
    );
  }

  clearForm(addForm: NgForm): void {
    addForm.form.reset();
    this.displayMessageModal = false;
  }

  buildMessageModal(msg: string): void {
    this.messageModal = msg;
    this.displayMessageModal = true;
  }
}
