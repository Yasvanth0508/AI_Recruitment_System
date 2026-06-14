import { gemini } from "@/lib/gemini";
import {
  JobProfileSchema,
  JobProfile,
} from "@/schemas/job-profile.schema";

export async function createJobProfile(
  rawText: string
): Promise<JobProfile> {

  const prompt = `
You are an expert recruitment analyst.

Extract the following information from the Job Description.

Return ONLY valid JSON.

{
  "jobTitle": "",
  "requiredSkills": [],
  "preferredSkills": [],
  "experienceRequired": 0,
  "domain": "",
  "education": "",
  "responsibilities": []
}

Rules:

1. Normalize skill names.
2. Remove duplicates.
3. Convert experience to number of years.
4. Return empty arrays if unavailable.
5. Return empty strings if unavailable.

Job Description:

${rawText}
`;

  const response =
    await gemini.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

  const text =
    response.text ?? "";

  const cleanedText = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const parsed =
    JSON.parse(cleanedText);

  return JobProfileSchema.parse(
    parsed
  );
}