import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { whiteSpaceValidator } from '../shared/validators/whiteSpaceValidators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginError = '';
  loginForm: FormGroup;
  isVisible: boolean = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.logout();
    this.buildLoginForm();
  }

  buildLoginForm(): void {
    this.loginForm = this.fb.group({
      email : ['',[Validators.required, Validators.email, whiteSpaceValidator.cannotContainSpace]],
      password: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(50), whiteSpaceValidator.cannotContainSpace]]
    });
  }

  login(submittedForm: FormGroup){
    this.isVisible = true;
    this.authService.login(submittedForm.value.email, submittedForm.value.password).subscribe(authResponse => {
      this.isVisible = false;
      this.router.navigate(['/home']);
    },error => this.loginError = error);
  }

}
