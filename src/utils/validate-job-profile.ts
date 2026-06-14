import { JobProfileSchema }
from "@/schemas/job-profile.schema";

export function validateJobProfile(
  data: unknown
) {

  const result =
    JobProfileSchema.safeParse(data);

  if (!result.success) {

    throw new Error(
      JSON.stringify(
        result.error.flatten(),
        null,
        2
      )
    );
  }

  return result.data;
}