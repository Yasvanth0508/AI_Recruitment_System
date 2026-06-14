import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

import { extractDocumentText } from "@/services/document-extractor.service";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "uploads");

    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(
      uploadDir,
      file.name
    );

    await fs.writeFile(filePath, buffer);

    const extractedText =
      await extractDocumentText(filePath);

    return NextResponse.json({
      success: true,
      fileName: file.name,
      extractedText,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Processing Failed" },
      { status: 500 }
    );
  }
}