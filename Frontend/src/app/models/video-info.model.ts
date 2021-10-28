import { SafeUrl } from '@angular/platform-browser';

export class VideoInfo {
    safeUrl: SafeUrl | string;
    mimeType: string;

    constructor(safeUrl: SafeUrl | string, mimeType: string) {
        this.safeUrl = safeUrl;
        this.mimeType = mimeType;
    }
}
