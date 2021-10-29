import { Component, OnInit } from '@angular/core';
import { VideoInfo } from 'src/app/models/video-info.model';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-vime',
  templateUrl: './vime.component.html',
  styleUrls: ['./vime.component.scss']
})
export class VimeComponent implements OnInit {

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
