const getRandomVideoId = () => {
    return Math.ceil(Math.random() * 10)
}
const concatPath = `/video/cb_0${getRandomVideoId()}`

class VideoManager {
    public autoplay = $state(false)
    public videoPlaying = $state(false)
    public videoSourcePath = concatPath
    public imagePlaceholder = '/images/donate_us_smiles/donate_us_smiles_01.webp'
    public video: HTMLVideoElement | undefined

    public toggleAutoplay = () => {
        this.autoplay = this.autoplay ? false : true
    }

    public startVideo = async () => {
        if (!this.video) return
        if (this.video.paused) {
            await this.video.play()
            this.videoPlaying = true
        }
    }

    public stopVideo = () => {
        if (this.video && this.video.paused) {
            this.video.pause()
            this.videoPlaying = false
        }
    }

    public togglePlay = async () => {
        if (!this.video) return

        if (this.video.paused) {
            await this.video.play()
            this.videoPlaying = true
        } else {
            this.video.pause()
            this.videoPlaying = false
        }
    }
}

/** Singleton */
let videoManager: VideoManager | undefined

export const useVideoManager = () => {
    if (!videoManager) videoManager = new VideoManager()

    return {
        videoManager,
    }
}
