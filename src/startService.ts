import { ApplicationContext } from "./";

const { converterService } = new ApplicationContext();
converterService.start();

process.on("SIGTERM", () => converterService.stop());
process.on("SIGINT", () => converterService.stop());
