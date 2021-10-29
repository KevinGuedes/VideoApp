import { Component, OnInit } from '@angular/core';
import { VideoInfo } from 'src/app/models/video-info.model';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-video-tag',
  templateUrl: './video-tag.component.html',
  styleUrls: ['./video-tag.component.scss']
})
export class VideoTagComponent implements OnInit {

  public videoInfo!: VideoInfo;

  constructor(
    private readonly _videoService: VideoService,
  ) { }

  public get getApiVideoEndpoint(): string {
    return this._videoService.getApiVideoEndpoint();
  }

  public get getVideoStreamEndpoint(): string {
    return this._videoService.getVideoStreamEndpoint();
  }

  public get videoExists(): boolean {
    return Boolean(this.videoInfo)
  }

  async ngOnInit(): Promise<void> {
    this.videoInfo = await this._videoService.getVideoInfoWithBlob();
  }
}
