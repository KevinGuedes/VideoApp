import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.scss']
})
export class VideoUploadComponent implements OnInit {

  public showUploadStatus: boolean = false;
  public showUploadProgress: boolean = false;
  public showUploadFinishedMessage: boolean = false;
  public uploadProgress: number = 0;

  constructor(
    private readonly _videoService: VideoService,
  ) { }

  ngOnInit(): void {
  }

  public uploadVideoFile = (files: FileList | null) => {
    try {
      if (files) {
        let fileToUpload = files[0];
        this.uploadProgress = 0;
        this.showUploadStatus = true;
        this.showUploadProgress = true;
        this.showUploadFinishedMessage = false;

        this._videoService.uploadProgress.subscribe((uploadProgress: number) => this.uploadProgress = uploadProgress)
        this._videoService.uploadFinished.subscribe(_ => {
          this.showUploadProgress = false;
          this.showUploadFinishedMessage = true;
        })

        this._videoService.uploadVideo(fileToUpload);
      }
      else {
        console.error('Failed to upload file');
      }
    }
    catch (error) {
      console.error(error);
    }
  }
}
