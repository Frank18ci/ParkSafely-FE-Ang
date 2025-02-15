import { Component } from '@angular/core';
import { Conexion1Service } from '../../../services/ConexionApi/conexion1.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private serviceApi : Conexion1Service){

  }

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  user = {username: '', password: ''}
  login(){
    this.user.username = this.loginForm.value.username != null ? this.loginForm.value.username : ""
    this.user.password = this.loginForm.value.password != null ? this.loginForm.value.password : ""

    this.serviceApi.login(this.user).subscribe((data: any)=> {
      console.log(data)
    })
  }
  
}
