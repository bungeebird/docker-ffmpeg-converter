import { ConverterService, FFMPEGService } from "../convert";
import { FileWatcherService } from "../convert/fileWatcherService";

export class ApplicationContext {
	fileWatcherService = new FileWatcherService();
	ffmpegService = new FFMPEGService();
	converterService = new ConverterService();
}
