import { z } from "zod";

const environmentVariables = z.object({
	SOURCE_DIRECTORY_PATH: z.string(),
	DESTINATION_DIRECTORY_PATH: z.string(),
	FFMPEG_COMMAND: z.string(),
});

type EnvironmentConfiguration = z.infer<typeof environmentVariables>;

export class Configuration {
	constructor(
		public config: EnvironmentConfiguration = environmentVariables.parse(
			process.env,
		),
	) {}
}
