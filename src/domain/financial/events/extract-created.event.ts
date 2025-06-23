import { Extract } from "../entities/extract";

export class ExtractCreatedEvent {
    constructor(public readonly extract: Extract) {}
}
