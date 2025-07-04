import pdfParse from "pdf-parse";
import { Readable } from "stream";

export async function getTextFromPdfStream(stream: Readable): Promise<string> {
  const chunks: Uint8Array[] = [];

  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", async () => {
      const buffer = Buffer.concat(chunks);
      const data = await pdfParse(buffer);
      resolve(data.text);
    });
    stream.on("error", reject);
  });
}
