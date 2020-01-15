import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  artistas: any[] = [];
  cargando: boolean;
  error: boolean;
  desError: string;
  constructor(private spotify: SpotifyService, private router: Router) { 
    this.error = false;
  }

  ngOnInit() {
  }

  buscar(nombre: string){
    this.cargando = true;
    this.spotify.getArtists(nombre)
        .subscribe((data : any) => { 
          this.artistas = data;
          this.cargando = false;
        },
        error => {
          this.error = true;
          this.cargando = false;
          this.desError = error.error.error.message;
        });
  }

  verArtista(id: string){
    this.router.navigate(['/artist', id]);
  }

}
