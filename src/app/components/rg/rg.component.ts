import { Component, OnInit } from '@angular/core';
import { RgService } from 'src/app/core/services/rg/rg.service';
import { TranslateService } from '@ngx-translate/core';
import { Rg } from 'src/app/models/rg/rg';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rg',
  templateUrl: './rg.component.html',
  styleUrls: ['./rg.component.scss'],
})
export class RgComponent implements OnInit {
  displayMessageModal: boolean;
  messageModal: string;
  actionButton: string;
  rg: Rg = new Rg(0, new Date(0));

  constructor(
    private rgService: RgService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.rgService.getRg().subscribe((rg) => {
      this.rg = rg;
    });
    this.translate.get('button.save').subscribe((translation) => {
      this.actionButton = translation;
    });
  }

  async saveOrUpdateRg(addRgForm: NgForm): Promise<void> {
    this.displayMessageModal = false;
    if (!addRgForm.valid) {
      this.buildMessageModal('Error in the form');
    }

    this.saveOrUpdate(this.rg);
    this.displayMessageModal = true;
  }

  saveOrUpdate(user: Rg): void {
    this.rgService.saveOrUpdateRg(user).subscribe(
      (result: Rg) => {
        if (result.ageEnfant) {
          this.buildMessageModal('Save operation correctly done');
        }
      },
      (error) => {
        this.buildMessageModal('An error occurs when saving the user data');
      }
    );
  }

  buildMessageModal(msg: string): void {
    this.messageModal = msg;
    this.displayMessageModal = true;
  }
}
