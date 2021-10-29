import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { VideoInfo } from '../models/video-info.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private readonly _videoApiUrl: string = environment.videoApi;

  constructor(
    private readonly _http: HttpClient,
    private readonly _sanitizer: DomSanitizer,
  ) { }

  public getApiVideoEndpoint(): string {
    return `${this._videoApiUrl}/direct`;
  }

  public getVideoStreamEndpoint(): string {
    return `${this._videoApiUrl}/stream`;
  }

  public async getVideoInfoWithBlob(): Promise<VideoInfo> {
    return new Promise<VideoInfo>((resolve, reject) => {
      this._http.get(this._videoApiUrl, { responseType: 'arraybuffer', observe: 'response' })
        .subscribe(response => {

          if (response.status != 200)
            reject(new Error("Failed to get video information"))

          const blob = new window.Blob([response.body as ArrayBuffer]);
          const untrustedVideoUrl = window.URL.createObjectURL(blob);
          const safeUrl = this._sanitizer.bypassSecurityTrustUrl(untrustedVideoUrl);
          const videoInfo = new VideoInfo(safeUrl, response.headers.get("Content-Type") as string);

          console.log(videoInfo);
          resolve(videoInfo)
        })
    })
  }
}
