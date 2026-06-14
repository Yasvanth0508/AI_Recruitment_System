from dotenv import load_dotenv
from pathlib import Path

import sys
import json
import os

from extractors.pdf_extractor import extract_pdf_text
from extractors.docx_extractor import extract_docx_text
from extractors.vision_extractor import extract_text_with_vision

load_dotenv(Path(__file__).parent / ".env")

def process_document(file_path: str):

    extension = os.path.splitext(file_path)[1].lower()

    # PDF Processing
    if extension == ".pdf":

        text = extract_pdf_text(file_path)

        if text and text.strip():
            return {
                "source": "pymupdf",
                "file_type": "pdf",
                "text": text
            }

        text = extract_text_with_vision(file_path)

        return {
            "source": "gemini_vision",
            "file_type": "pdf",
            "text": text
        }

    # DOCX Processing
    elif extension == ".docx":

        text = extract_docx_text(file_path)

        return {
            "source": "python-docx",
            "file_type": "docx",
            "text": text
        }

    # TXT Processing
    elif extension == ".txt":

        with open(
            file_path,
            "r",
            encoding="utf-8"
        ) as file:

            text = file.read()

        return {
            "source": "text_file",
            "file_type": "txt",
            "text": text
        }

    else:
        raise Exception(
            f"Unsupported file type: {extension}"
        )


if __name__ == "__main__":

    if len(sys.argv) < 2:
        raise Exception(
            "File path argument missing"
        )

    file_path = sys.argv[1]

    result = process_document(file_path)

    print(json.dumps(result))