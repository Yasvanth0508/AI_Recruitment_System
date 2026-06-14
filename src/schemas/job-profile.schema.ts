import { z } from "zod";

export const JobProfileSchema = z.object({
  jobTitle: z.string(),

  requiredSkills: z.array(
    z.string()
  ),

  preferredSkills: z.array(
    z.string()
  ),

  experienceRequired: z.number(),

  domain: z.string(),

  education: z.string(),

  responsibilities: z.array(
    z.string()
  ),
});

export type JobProfileSchemaType =
  z.infer<typeof JobProfileSchema>;