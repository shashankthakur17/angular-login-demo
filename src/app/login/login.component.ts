import { Component, OnInit } from '@angular/core';
import { Router } from  '@angular/router';
import { AuthService } from './../auth.service';
import { User } from './../user';
import { FormBuilder, FormControl, FormGroup, Validators } from  '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }
  get formControls() { return this.loginForm.controls; }
  
  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });

  /* this.loginForm  =  new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(6)])
  }); */
  }

  loginForm: FormGroup;
  isSubmitted  =  false;

  login(){
    console.log(this.loginForm.value);
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.authService.login(this.loginForm.value);
    this.router.navigateByUrl('/welcomePage');
  }
}
