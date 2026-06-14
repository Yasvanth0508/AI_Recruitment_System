import { extractDocumentText } from "@/services/document-extractor.service";

export default async function TestPage() {

  const text = await extractDocumentText(
    "Scanned_pdf.pdf"
  );

  return (
    <pre>
      {text}
    </pre>
  );
}