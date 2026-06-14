import sys
import json


from extractors.pdf_extractor import (
    extract_pdf_text
)

from extractors.vision_extractor import (
    extract_text_with_vision
)

def process_document(file_path):

    text = extract_pdf_text(file_path)

    if text.strip():

        return {
            "source": "pymupdf",
            "text": text
        }

    text = extract_text_with_vision(file_path)

    return {
        "source": "gemini_vision",
        "text": text
    }

if __name__ == "__main__":

    file_path = sys.argv[1]

    result = process_document(file_path)

    print(json.dumps(result))