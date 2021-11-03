import { HttpClient, HttpEventType } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { VideoInfo } from '../models/video-info.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  public uploadProgress: EventEmitter<number> = new EventEmitter<number>();
  public uploadFinished: EventEmitter<void> = new EventEmitter<void>();

  private readonly _videoApiUrl: string = environment.videoApi;
  private readonly _isBlobVideoDownloadDisabled: boolean = environment.disableBlobVideoDownload;

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _sanitizer: DomSanitizer,
  ) { }

  public getApiVideoEndpoint(): string {
    return this._videoApiUrl;
  }

  public getVideoStreamEndpoint(): string {
    return `${this._videoApiUrl}/stream`;
  }

  public isBlobVideoDownloadDisabled(): boolean {
    return this._isBlobVideoDownloadDisabled;
  }

  public async getVideoInfoWithBlob(): Promise<VideoInfo> {
    return new Promise<VideoInfo>((resolve, reject) => {
      if (this._isBlobVideoDownloadDisabled) {
        console.warn('Video download currently disabled')
      }
      else {
        this._httpClient.get(this._videoApiUrl, { responseType: 'arraybuffer', observe: 'response', })
          .subscribe(response => {

            if (response.status == 200 && Boolean(response.body) && Boolean(response.headers.get("Content-Type"))) {
              console.log('%cVideo file downloaded from back end', 'color: green')

              const blob = new window.Blob([response.body as ArrayBuffer]);
              const untrustedVideoUrl = window.URL.createObjectURL(blob);
              const safeUrl = this._sanitizer.bypassSecurityTrustUrl(untrustedVideoUrl);
              const videoInfo = new VideoInfo(safeUrl, response.headers.get("Content-Type") as string);
              resolve(videoInfo)
            }

            reject(new Error("Failed to get video from back end"))
          })
      }
    })
  }

  public uploadVideo(file: File): void {
    if (file.type != 'video/mp4' && file.type != 'video/webm')
      throw new Error('Invalid file type')

    const formData = new FormData();
    formData.append('video-file-from-front-end', file, file.name);

    this._httpClient.post(this._videoApiUrl, formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress && event.total)
          this.uploadProgress.emit(Math.round(100 * event.loaded / event.total))
        else if (event.type === HttpEventType.Response) {
          this, this.uploadFinished.emit();
          console.log('%cUpload succeeded', 'color: green')
        }
      });
  }
}
