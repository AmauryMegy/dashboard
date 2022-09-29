import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  apiError ?: string;
  isVerification = false;
  user = new User();
  hide = true;

  constructor( private authService : AuthService, private router : Router) { }

  signIn() {
    this.isVerification = true;
    this.authService.signIn(this.user).subscribe(data => {
      localStorage.setItem('access_token', data.token);
      this.router.navigate(['/dashboard']);
    }, (error :any) => {
      if (error.status === 401) {
        this.apiError = 'Identifiants incorrects';
      }
      this.isVerification = false
    });
  }
}
