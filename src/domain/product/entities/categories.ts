import { z } from "zod";

export type Category = "FOOD" | "TRANSPORT" | "LUNCH" | "ENTRETAINMENT" | "LIBRARY" | "OTHER";

export const CategorySchema = z.enum(["FOOD", "TRANSPORT", "LUNCH", "ENTRETAINMENT", "LIBRARY", "OTHER"]);
