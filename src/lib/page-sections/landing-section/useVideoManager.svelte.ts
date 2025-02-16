class VideoManager {
	private VIDEO_ID = 'X9qAB0y20ps';
	public autoplay = $state(1);
	public videoSrc = $derived(
		`https://www.youtube-nocookie.com/embed/${this.VIDEO_ID}?si=g_81oSxIMmVPALAz&autoplay=${this.autoplay}&controls=0&mute=1&disablekb=1&enablejsapi=1&fs=0&iv_load_policy=3&playlist=${this.VIDEO_ID}&loop=1`
	);

	public toggleAutoplay = () => {
		this.autoplay = this.autoplay ? 0 : 1;
	};
}

/** Singleton */
let videoManager: VideoManager | undefined;

export const useVideoManager = () => {
	if (!videoManager) videoManager = new VideoManager();

	return {
		videoManager
	};
};
