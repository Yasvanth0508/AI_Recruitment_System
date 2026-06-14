export type SupportedFileType =
  | "pdf"
  | "docx"
  | "txt";

export interface ExtractedDocument {
  fileName: string;
  fileType: SupportedFileType;
  extractedText: string;
}