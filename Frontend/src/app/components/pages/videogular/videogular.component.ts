import { Component, OnInit } from '@angular/core';
import { VideoInfo } from 'src/app/models/video-info.model';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-videogular',
  templateUrl: './videogular.component.html',
  styleUrls: ['./videogular.component.scss']
})
export class VideogularComponent implements OnInit {

  public videoInfo!: VideoInfo;

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
