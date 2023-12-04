import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Pokemon } from 'src/app/classes/pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
})
export class SearchPokemonComponent implements OnInit{
  
  searchTerms = new Subject<string>(); //flux de donnée dans le temps des recherches de l'utilisateur
  pokemons$: Observable<Pokemon[]>

  constructor(
      private router: Router, 
      private pokemonService: PokemonService
    ){ }

  ngOnInit(): void {
      this.pokemons$ = this.searchTerms.pipe(
        // {..."a"."ab"."abz".."ab"..."abc"....} => touche utilisateur
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => this.pokemonService.searchePokemonList(term))
      );
  }
  
  search(term:string) {
    this.searchTerms.next(term);
  }

  goToDetail(pokemon: Pokemon){
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link)
  }
}
