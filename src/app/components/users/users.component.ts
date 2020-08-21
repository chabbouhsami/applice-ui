import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UsersService } from 'src/app/core/services/users/users.service';
import { User } from 'src/app/models/user/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: Observable<User[]>;
  user: User;
  displayMessageModal: boolean;
  messageModal: string;
  actionButton: string;
  droits = [
    { id: 'A', value: 'Administrateur' },
    { id: 'V', value: 'Vendeur' },
  ];
  titleSaveOrUpdate: string;
  saveLabel: string;
  updateLabel: string;
  deleteLabel: string;

  constructor(
    private userService: UsersService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.user = new User();
    this.getUsers();
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

  async saveOrUpdateUser(addUserForm: NgForm): Promise<void> {
    this.displayMessageModal = false;
    if (!addUserForm.valid) {
      this.buildMessageModal('Error in the form');
    }
    if (this.actionButton === this.saveLabel) {
      this.saveNewUser(this.user);
    } else if (this.actionButton === this.updateLabel) {
      this.updateUser(this.user);
    }
    this.displayMessageModal = true;
    this.user = Object.assign({}, new User());
    this.actionButton = this.saveLabel;
    this.getUsers();
  }

  saveNewUser(user: User): void {
    this.userService.saveUser(user).subscribe(
      (result: User) => {
        if (result.code) {
          this.buildMessageModal('Save operation correctly done');
        }
      },
      (error) => {
        this.buildMessageModal('An error occurs when saving the user data');
      }
    );
  }

  getUsers(): void {
    this.users = this.userService.loadUsers();
  }

  setUpdateUser(user: User): void {
    this.titleSaveOrUpdate = 'Update Book Form';
    this.actionButton = this.updateLabel;
    this.user = Object.assign({}, user);
    this.displayMessageModal = false;
  }

  updateUser(user: User): void {
    this.userService.updateUser(user).subscribe(
      (result: User) => {
        if (result.code) {
          this.buildMessageModal('Update operation correctly done');
          this.displayMessageModal = true;
        }
      },
      (error) => {
        this.buildMessageModal('An error occurs when saving the user data');
      }
    );
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user).subscribe(
      (result: User) => {
        if (result.code) {
          this.getUsers();
          this.buildMessageModal('Delete operation correctly done');
          this.displayMessageModal = true;
        }
      },
      (error) => {
        this.buildMessageModal('An error occurs when saving the user data');
      }
    );
    this.getUsers();
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
