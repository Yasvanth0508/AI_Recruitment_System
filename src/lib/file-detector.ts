import { SupportedFileType } from "@/types/document";

export function detectFileType(
  fileName: string
): SupportedFileType {

  const extension =
    fileName.split(".").pop()?.toLowerCase();

  switch (extension) {

    case "pdf":
      return "pdf";

    case "docx":
      return "docx";

    case "txt":
      return "txt";

    default:
      throw new Error(
        "Unsupported file type"
      );
  }
}