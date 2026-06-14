from docx import Document

def extract_docx_text(file_path: str) -> str:

    document = Document(file_path)

    text = []

    for paragraph in document.paragraphs:
        text.append(paragraph.text)

    return "\n".join(text)