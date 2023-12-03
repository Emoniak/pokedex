import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/classes/pokemon';

@Component({
  selector: 'app-add-pokemon',
  template: `
    <h2 class="center">Ajouter un pokemon </h2>
    <app-pokemon-form [pokemon]="pokemon"></app-pokemon-form>
  `
})
export class AddPokemonComponent implements OnInit {
  
  pokemon: Pokemon

  ngOnInit(): void {
      this.pokemon = new Pokemon()
  }

}
