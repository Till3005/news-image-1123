#!/usr/bin/env node
/**
 * make.fun news-image entry — 23 November 2026
 *
 * The deliverable is entry.png: a 1024x1024, 8-tile newspaper front page
 * recapping the day's world news (COP31 ends without a deal; a drone strike
 * on a Russian corvette off Benghazi; "El Chapo" Isidro captured; a factory
 * fire in Banten; an ICE protest in Seattle; Rubio's Ukraine talks; the
 * Hezbollah chief killed; the Nepali PM visiting Delhi).
 *
 * Node 22, standard library only. The script has one responsibility: emit
 * the exact bytes of the committed entry.png into the output directory.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, 'entry.png');
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outDir, 'entry.png');

// Fresh containers may not have the output dir yet.
mkdirSync(outDir, { recursive: true });

// Read then write: a deliberate byte-identical round trip (no re-encode).
writeFileSync(target, readFileSync(source));

console.log(`wrote ${target} (${readFileSync(source).length} bytes)`);
