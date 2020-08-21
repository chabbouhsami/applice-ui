import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login/login.service';
import { User } from 'src/app/models/user/user';
import { AppStorageService } from 'src/app/core/service/app-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: User = new User();

  constructor(
    private router: Router,
    private service: LoginService,
    private storage: AppStorageService
  ) {}

  ngOnInit(): void {}

  login(): void {
    this.service.login(this.user).subscribe((result) => {
      this.user = result;
      this.storage.saveData('user', this.user.right);
      this.router.navigate(['/users']);
    });
  }
}
