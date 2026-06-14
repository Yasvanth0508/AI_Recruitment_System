import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";
import { fileURLToPath } from "url";

const execFileAsync = promisify(execFile);

export async function extractDocumentText(
  filePath: string
): Promise<string> {
  // Get the project root directory
  const projectRoot = path.resolve(process.cwd());
  
  // Resolve the Python script path
  const pythonScriptPath = path.join(
    projectRoot,
    "python-services/document_processor/main.py"
  );
  
  // Resolve the document file path
  const resolvedFilePath = path.isAbsolute(filePath)
    ? filePath
    : path.join(projectRoot, filePath);

  const { stdout } = await execFileAsync(
    "python",
    [pythonScriptPath, resolvedFilePath],
    {
      cwd: projectRoot,
    }
  );

  const result = JSON.parse(stdout);

  return result.text;
}