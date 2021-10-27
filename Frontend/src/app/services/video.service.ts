import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private readonly _apiUrl: string = environment.videoApi;

  constructor(
    private readonly _http: HttpClient,
  ) { }

  public getVideo(): Promise<ArrayBuffer> {
    return this._http.get(this._apiUrl, { responseType: 'arraybuffer' }).toPromise();
  }
}
