/**
 * Verifica offline le foto del sito prima della build Cloudflare.
 * NON esegue richieste di rete e NON dipende dal vecchio branch main.
 */
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../public/immagini/', import.meta.url));
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
const errors = [];
let bytesTotal = 0;
for (const name of files) {
  const fullPath = path.join(root, name);
  try {
    const info = await stat(fullPath);
    if (!info.isFile() || info.size < 5000) {
      throw new Error(`dimensione non valida: ${info.size} byte`);
    }
    const f = await readFile(fullPath);
    if (!(f[0] === 0xff && f[1] === 0xd8 && f[2] === 0xff)) {
      throw new Error('il file non sembra una fotografia JPEG');
    }
    bytesTotal += info.size;
    console.log(`OK ${name} (${Math.round(info.size/1024)} KB)`);
  } catch (e) {
    errors.push(`${name}: ${e.code === 'ENOENT' ? 'file non presente' : e.message}`);
  }
}
if (errors.length) {
  console.error(`\nERRORE: ${errors.length} fotografie mancanti o non valide!`);
  for (const e of errors) console.error(` - ${e}`);
  console.error('\nPrima di fare Push, esegui IMPORTA-FOTO-LABRI.cmd nella cartella del repository.');
  console.error('La compilazione e stata bloccata per evitare di pubblicare un sito con foto mancanti.');
  process.exitCode = 1;
} else {
  console.log(`\nVERIFICA COMPLETATA: ${files.length} fotografie locali, ${(bytesTotal/1024/1024).toFixed(2)} MB.`);
  console.log('Build indipendente dal vecchio branch main.');
}
