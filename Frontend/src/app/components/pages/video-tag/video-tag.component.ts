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
  public directUrl: string = 'https://localhost:5001/api/video/direct';
  public get videoExists(): boolean {
    return Boolean(this.videoInfo)
  }

  constructor(
    private readonly _videoService: VideoService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.videoInfo = await this._videoService.getVideoInfoWithBlob();
  }
}
