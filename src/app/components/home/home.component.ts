import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  albumes: any[] = [];
  cargando: boolean = true;
  error: boolean;
  desError: string;

  constructor(private spotify: SpotifyService, private router: Router) { 
    this.error = false;
    this.spotify.getNewRelease()    
      .subscribe((data: any) => {
        this.albumes = data;
        this.cargando = false;
      },
      error => {
        this.error = true;
        this.cargando = false;
        this.desError = error.error.error.message;
      });
    ;
  }

  verArtista(id: string){
    this.router.navigate(['/artist', id]);
  }

  ngOnInit() {
  }

}
