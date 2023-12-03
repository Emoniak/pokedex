import { Injectable } from '@angular/core';
import { Pokemon } from '../classes/pokemon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable()
export class PokemonService {

  constructor(private http: HttpClient) {}

  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap((pokemonList) => this.log(pokemonList)),
      catchError((error) => this.handleError(error,[]))
    );
  }

  getPokemonById(pokemonId: number): Observable<Pokemon|undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((pokemon) => this.log(pokemon)),
      catchError((error) => this.handleError(error,undefined))
    );
  }

  updatePokemon(pokemon: Pokemon): Observable<null>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.put('api/pokemons', pokemon, httpOption).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error,null))
    );
  }

  deletePokemonById(pokemonid: number): Observable<null>{
    return this.http.delete(`api/pokemons/${pokemonid}`).pipe(
      tap((pokemon) => this.log(pokemon)),
      catchError((error) => this.handleError(error,undefined))
    )
  }

  createPokemon(pokemon: Pokemon): Observable<Pokemon>{
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<Pokemon>('api/pokemons',pokemon,httpOption).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error,null))
    );
  }

  private log(response: any){
    console.table(response);
  }

  private  handleError(error: Error, errorValue: any){
    console.error(error);
    return of(errorValue);
  }

  getPokemonTypeList(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
      'Combat',
      'Psy'
    ];
  }
}
