import { FFMPEGService, FileWatcherService, Logger } from "../";
import { rm } from "fs/promises";

export class ConverterService {
	private readonly abortController = new AbortController();

	constructor(
		private logger: Logger,
		private fileWatcherService: FileWatcherService,
		private ffmpegService: FFMPEGService,
		private removeSourceFileAfterConvert: boolean,
	) {
		this.fileWatcherService.onNewFile(this.onNewFile);
	}

	start = () => {
		this.logger.info("Starting converter service");
		this.fileWatcherService.start();
	};

	stop = () => {
		this.fileWatcherService.stop();
		this.logger.info("Aborting running ffmpeg processes");
		this.abortController.abort();
		this.logger.info("Stopping converter service");
	};

	private removeSourceFile = async (file: string) => {
		this.logger.info("Removing source file", { file });
		await rm(file);
	};

	private onNewFile = async (file: string) => {
		this.logger.info("Converting new file", { file });
		try {
			await this.ffmpegService.exec(this.abortController.signal, file);
			this.logger.info("Successfully converted file", { file });
			if (this.removeSourceFileAfterConvert) {
				await this.removeSourceFile(file);
			} else {
				this.logger.debug("Not removing source file because setting is disabled");
			}
		} catch (error) {
			this.logger.error("Failed to convert file", { file, error });
		}
	};
}
