export function removeDuplicates(
  values: string[]
): string[] {

  return [...new Set(values)];
}