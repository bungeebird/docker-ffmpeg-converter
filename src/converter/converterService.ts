import { FFMPEGService, FileWatcherService, Logger } from "../";

export class ConverterService {
	private readonly abortController = new AbortController();

	constructor(
		private logger: Logger,
		private fileWatcherService: FileWatcherService,
		private ffmpegService: FFMPEGService,
	) {
		this.fileWatcherService.onNewFile(this.onNewFile);
	}

	start = () => {
		this.logger.info("Starting converter service");
		this.fileWatcherService.start();
	};

	stop = () => {
		this.logger.info("Stopping converter service");
		this.fileWatcherService.stop();
		this.logger.info("Aborting running ffmpeg processes");
		this.abortController.abort();
	};

	private onNewFile = async (file: string) => {
		this.logger.info("Converting new file", { file });
		try {
			await this.ffmpegService.exec(this.abortController.signal, file);
			this.logger.info("Successfully converted file", { file });
		} catch (err) {
			this.logger.error("Failed to convert file", { file });
		}
	};
}
