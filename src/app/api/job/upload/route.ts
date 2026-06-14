import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import fs from "fs/promises";
import path from "path";

import {
  extractDocumentText
} from "@/services/document-extractor.service";

import {
  createJobProfile
} from "@/services/job-profile.service";

export async function POST(
  request: NextRequest
) {
  try {

    const formData =
      await request.formData();

    const file =
      formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "No file uploaded"
        },
        { status: 400 }
      );
    }

    const bytes =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    const uploadDir =
      path.join(
        process.cwd(),
        "uploads"
      );

    await fs.mkdir(
      uploadDir,
      { recursive: true }
    );

    const filePath =
      path.join(
        uploadDir,
        file.name
      );

    await fs.writeFile(
      filePath,
      buffer
    );

    // Step 1
    const rawText =
      await extractDocumentText(
        filePath
      );

    // Step 2
    const jobProfile =
      await createJobProfile(
        rawText
      );

    return NextResponse.json({
      success: true,
      data: jobProfile,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unknown Error",
      },
      { status: 500 }
    );
  }
}