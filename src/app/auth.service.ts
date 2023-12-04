import { Injectable } from '@angular/core';
import { Observable, delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggeIn: boolean = false;
  redirectUrl: string;

  login(name: string, password: string): Observable<boolean>{
    const isLoggeIn = (name == 'pikachu' && password == 'pikachu');

    return of(isLoggeIn).pipe(
      delay(1000),
      tap(isLoggeIn => this.isLoggeIn = isLoggeIn)
    )
  }

  logout(){
    this.isLoggeIn = false;
  }
}
