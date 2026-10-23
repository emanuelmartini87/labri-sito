// Copies original owned photos into the built website, no paid storage or API.
import { mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";
const files = [
  "Home/Camera3.jpg",
  "Home/Colazione1.jpg",
  "Home/Colazione2.jpg",
  "Home/GarageMoto.jpg",
  "Home/Giardino1.jpg",
  "Home/Giardino2.jpg",
  "Home/Giardino3.jpg",
  "Home/Giardino4.jpg",
  "Home/Giardino5.jpg",
  "Home/Ingresso1.jpg",
  "camere/camera1-1.jpg",
  "camere/camera2-1.jpg",
  "camere/camera2-2.jpg",
  "camere/camera3-1.jpg",
  "camere/camera3-2.jpg",
  "camere/camera4-1.jpg",
  "camere/camera4-2.jpg",
  "camere/camera5-1.jpg",
  "camere/camera5-2.jpg",
  "camere/camera1-2.jpg"
];
const base = "https://raw.githubusercontent.com/emanuelmartini87/labri-sito/main/immagini/";
const root = path.resolve("public/immagini");
let errors = [];
for (const file of files) {
  const dest = path.join(root, file);
  await mkdir(path.dirname(dest), { recursive: true });
  try {
    if ((await stat(dest)).size > 5000) { console.log(`Già presente: ${file}`); continue; }
  } catch (_) {}
  try {
    const response = await fetch(base + file, { signal: AbortSignal.timeout(25000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length < 5000) throw new Error("Foto troppo piccola");
    await writeFile(dest, bytes);
    console.log(`Scaricata ${file}: ${Math.round(bytes.length/1024)} KB`);
  } catch (e) {
    errors.push(`${file}: ${e.message}`);
  }
}
if (errors.length) {
  console.error("Immagini mancanti:\n" + errors.join("\n"));
  console.error("Il deploy è interrotto per non pubblicare immagini rotte. Puoi inserire manualmente i file corrispondenti in public/immagini/ e ripetere il build.");
  process.exitCode = 1;
}
