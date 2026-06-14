export function cleanText(
  text: string
): string {

  return text

    .replace(/\r\n/g, "\n")

    .replace(/\n{3,}/g, "\n\n")

    .replace(/[ \t]+/g, " ")

    .replace(/\s+/g, " ")

    .trim();
}