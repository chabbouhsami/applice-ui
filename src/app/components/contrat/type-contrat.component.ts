import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';

import { TypeContratService } from '../../core/services/contrat/type-contrat.service';
import { TypeContrat } from 'src/app/models/contrat/type-contrat';

@Component({
  selector: 'app-type-contrat',
  templateUrl: './type-contrat.component.html',
  styleUrls: ['./type-contrat.component.scss'],
})
export class TypeContratComponent implements OnInit {
  contrats: Observable<TypeContrat[]>;
  typeContrat: TypeContrat;
  displayMessageModal: boolean;
  messageModal: string;
  actionButton: string;
  titleSaveOrUpdate: string;
  saveLabel: string;
  updateLabel: string;
  deleteLabel: string;

  constructor(
    private service: TypeContratService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.typeContrat = new TypeContrat();
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

  async saveOrUpdateContrat(addContratForm: NgForm): Promise<void> {
    this.displayMessageModal = false;
    if (!addContratForm.valid) {
      this.buildMessageModal('Error in the form');
    }
    if (this.actionButton === this.saveLabel) {
      this.saveNewContrat(this.typeContrat);
    } else if (this.actionButton === this.updateLabel) {
      this.updateContrat(this.typeContrat);
    }
    this.displayMessageModal = true;
    this.typeContrat = Object.assign({}, new TypeContrat());
    this.actionButton = this.saveLabel;
    addContratForm.reset();
    this.getContrats();
  }

  saveNewContrat(typeContrat: TypeContrat): void {
    this.service.saveContrat(typeContrat).subscribe(
      (result: TypeContrat) => {
        if (result.code) {
          this.buildMessageModal('Save operation correctly done');
        }
      },
      (error) => {
        this.buildMessageModal(
          'An error occurs when saving the typeContrat data'
        );
      }
    );
  }

  getContrats(): void {
    this.contrats = this.service.loadContrats();
  }

  setUpdateContrat(typeContrat: TypeContrat): void {
    this.titleSaveOrUpdate = 'Update Book Form';
    this.actionButton = this.updateLabel;
    this.typeContrat = Object.assign({}, typeContrat);
    this.displayMessageModal = false;
  }

  updateContrat(typeContrat: TypeContrat): void {
    this.service.updateContrat(typeContrat).subscribe(
      (result: TypeContrat) => {
        if (result.code) {
          this.buildMessageModal('Update operation correctly done');
          this.displayMessageModal = true;
        }
      },
      (error) => {
        this.buildMessageModal(
          'An error occurs when saving the typeContrat data'
        );
      }
    );
  }

  deleteContrat(typeContrat: TypeContrat): void {
    this.service.deleteContrat(typeContrat).subscribe(
      (result: TypeContrat) => {
        if (result.code) {
          this.getContrats();
          this.buildMessageModal('Delete operation correctly done');
          this.displayMessageModal = true;
        }
      },
      (error) => {
        this.buildMessageModal(
          'An error occurs when saving the typeContrat data'
        );
      }
    );
    this.getContrats();
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
