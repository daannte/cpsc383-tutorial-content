import configuration from "../../content-collections.ts";
import { GetTypeByName } from "@content-collections/core";

export type Tutorial = GetTypeByName<typeof configuration, "Tutorials">;
export declare const allTutorials: Array<Tutorial>;

export {};
