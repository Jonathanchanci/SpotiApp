import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SpotifyService } from 'src/app/services/spotify.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent implements OnInit {

  artista: any = {};
  cargando: boolean = true;
  topTracks: any[] = [];

  constructor(private activateRouter: ActivatedRoute, 
              private spotify: SpotifyService,
              private router: Router) { 
    this.activateRouter.params.subscribe( parametros => {
      this.getArtist(parametros['id']);
      this.getTopTrack(parametros['id']);
    });

  }

  getArtist(id: string){
    this.spotify.getArtist(id).subscribe( artista => {
      this.artista = artista;
      this.cargando = false;
    });    
  }

  getTopTrack(id: string){
    this.spotify.getTopTracks(id).subscribe(topTracks => {
      this.topTracks = topTracks;
    })
  }

  verArtista(id: string){
    this.router.navigate(['/artist', id]);
  }

  ngOnInit() {
  }

}
