from google import genai
from PIL import Image
import fitz
import tempfile
import os

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

def extract_text_with_vision(pdf_path):

    document = fitz.open(pdf_path)

    extracted_text = ""

    for page_number in range(len(document)):

        page = document.load_page(page_number)

        pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))

        with tempfile.NamedTemporaryFile(
            suffix=".png",
            delete=False
        ) as temp_file:

            image_path = temp_file.name

        pix.save(image_path)

        image = Image.open(image_path)

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[
                "Extract all text from this document page exactly as written.",
                image
            ]
        )

        extracted_text += response.text + "\n"

        os.remove(image_path)

    document.close()

    return extracted_text
