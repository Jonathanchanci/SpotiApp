import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {  

  constructor(private http: HttpClient) {  }

  getData(params: string){
    const URL = `https://api.spotify.com/v1/${ params }`;
    const headers = new HttpHeaders({
      "Authorization" : "Bearer BQCPPLNkLt3fXuyqZn2eG6CD0ThIA6o1VaLo8Rg-dyMgiTU2pJ4DTM-X7ApxYL2o_L-_W58yUinN4Ch7mzs"
    });
    return this.http.get( URL, { headers });
  }

  getNewRelease(){
    return this.getData('browse/new-releases?limit=20').pipe( map( (data: any) =>  data.albums.items));
  }

  getArtists(nombre: string ){
    return this.getData(`search?q=${ nombre }&type=artist&limit=10`).pipe( map( (data: any) => data.artists.items));
  }
  
  getArtist(id: string ){
    return this.getData(`artists/${ id }`);
  }

  getTopTracks(id: string ){
    return this.getData(`artists/${ id }/top-tracks?country=US`).pipe( map( (data: any) => data.tracks));
  }
}
