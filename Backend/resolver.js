import { fileURLToPath } from "url";
import { dirname, resolve as pathResolve } from "path";
import { pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const newSpecifier = pathToFileURL(
      pathResolve(__dirname, "dist", specifier.replace("@/", ""))
    ).href;
    return nextResolve(newSpecifier);
  }
  return nextResolve(specifier);
}
