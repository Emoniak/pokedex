import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  message: string ='Vous êtes deconnecté. (pikachu/pikachu)'
  name: string;
  password:string;
  auth: AuthService

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
      this.auth = this.authService
  }

  steMessage(){
    if(this.authService.isLoggeIn){
      this.message = "Vous êtes connecté"
    } else {
      this.message = "Identifiant ou mot de passe incorect"
    }
  }

  login(){
    this.message = 'Tentative de connexion en cours...';
    this.authService.login(this.name, this.password)
      .subscribe(() => {
        this.steMessage();
        if(this.authService.isLoggeIn){
          this.router.navigate(['/pokemons'])  
        } else{
          this.password = ''
          this.router.navigate(['/login'])
        }
      })
  }

  logout(){
    this.authService.logout()
    this.message = "Vous êtes deconecté"
  }

}

