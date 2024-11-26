import { Component, inject, signal, ViewChild } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { MatTabGroup } from '@angular/material/tabs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { CoreService } from '../../core/core.service';
import { MessageService } from 'primeng/api';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user-model';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.scss'
})
export class LoginRegisterComponent {


  loginFormCtrl: FormGroup;
  registerFormCtrl: FormGroup;
  @ViewChild('tabGroup') tabGroup:MatTabGroup;

  private authService = inject(AuthenticationService);
  private userService = inject(UserService);
  private coreService = inject(CoreService);
  private messageService = inject(MessageService);


  constructor( public dialogRef: MatDialogRef<LoginRegisterComponent>){}

  ngOnInit(){
    this.loadLoginForm();
    this.loadRegisterForm();
  }


  loadLoginForm(){
    this.loginFormCtrl = new FormGroup({
      username: new FormControl(null,Validators.required),
      password:new FormControl(null,Validators.required),
    })
  }

  loadRegisterForm(){
    this.registerFormCtrl = new FormGroup({
      firstName: new FormControl(null,Validators.required),
      lastName: new FormControl(null,Validators.required),
      email: new FormControl(null,[Validators.required,Validators.email]),
      username: new FormControl(null,Validators.required),
      password:new FormControl(null,Validators.required),
      confirmPassword:new FormControl(null,Validators.required)
    })
  }

   passwordMatchValidator() {
    const { password, confirmPassword,firstName } = this.registerFormCtrl.controls;
    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword.setErrors(null);
    }
  }

  nextTab(tabGroup:MatTabGroup){
    this.tabGroup.selectedIndex = (tabGroup?.selectedIndex ?? 0) + 1;
  }

  previousTab(tabGroup:MatTabGroup){
    this.tabGroup.selectedIndex = (tabGroup?.selectedIndex ?? 0) - 1;;
  }

  async login(){
   await this.authService.login({username:this.loginFormCtrl.value['username'],password:this.loginFormCtrl.value['password']});
   await this.coreService.loadAuthenticatedUserData();
   this.dialogRef.close();
   this.messageService.add({severity:'success',summary:`Success`,detail:"Successfully logged in"});
  }

  async registerUser(){
    let user:UserModel={
      userId: 0,
      username: this.registerFormCtrl.value['username'],
      email: this.registerFormCtrl.value['email'],
      password: this.registerFormCtrl.value['confirmPassword'],
      firstName: this.registerFormCtrl.value['firstName'],
      lastName: this.registerFormCtrl.value['lastName'],
      createdDate: null,
      updatedDate: null
    }
    let registereduser = await this.userService.registerUser(user);
    console.log(registereduser)
    this.messageService.add({severity:'success',summary:`Success`,detail:`Successfully registered profile for ${registereduser.firstName} ${registereduser.lastName}, please sign in!`});
  }
}
