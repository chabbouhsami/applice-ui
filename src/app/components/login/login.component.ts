import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login/login.service';
import { StateService } from 'src/app/core/service/state.service';
import { User } from 'src/app/models/user/user';

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
    private state: StateService
  ) {}

  ngOnInit(): void {
    sessionStorage.setItem('token', '');
  }

  login(): void {
    this.service.login(this.user).subscribe((result) => {
      sessionStorage.setItem('user', result.right);
      this.user = result;
      this.state.publish(this.user.right);
      this.router.navigate(['/typart']);
    });
  }
}
