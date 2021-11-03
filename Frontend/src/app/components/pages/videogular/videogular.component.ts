import { Component, OnInit } from '@angular/core';
import { VideoInfo } from 'src/app/models/video-info.model';
import { VideoService } from 'src/app/services/video.service';
import { handlePromise } from 'src/app/tools/promise-handler.tool'

@Component({
  selector: 'app-videogular',
  templateUrl: './videogular.component.html',
  styleUrls: ['./videogular.component.scss']
})
export class VideogularComponent implements OnInit {

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
    const [result] = await handlePromise(this._videoService.getVideoInfoWithBlob());

    if (result)
      this.videoInfo = result;
  }
}
