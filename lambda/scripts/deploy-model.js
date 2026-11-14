import { spawnSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { SKILL_ID } from '../config.js';

const MODELS_DIR = fileURLToPath(new URL('../../skill-package/interactionModels/custom/', import.meta.url));

const availableLocales = readdirSync(MODELS_DIR)
    .filter((file) => file.endsWith('.json'))
    .map((file) => file.slice(0, -'.json'.length))
    .sort();

// Deploy the locales given as arguments, or all checked-in locales by default.
const locales = process.argv.length > 2 ? process.argv.slice(2) : availableLocales;

const unknownLocales = locales.filter((locale) => !availableLocales.includes(locale));
if (unknownLocales.length > 0) {
    throw new Error(`Unknown locale(s): ${unknownLocales.join(', ')}. Available: ${availableLocales.join(', ')}`);
}

for (const locale of locales) {
    console.log(`Deploying interaction model for ${locale}...`);
    const result = spawnSync(
        'ask',
        [
            'smapi',
            'set-interaction-model',
            '--skill-id',
            SKILL_ID,
            '--stage',
            'development',
            '--locale',
            locale,
            '--interaction-model',
            `file:${MODELS_DIR}${locale}.json`,
            '--profile',
            'default',
        ],
        { stdio: 'inherit' },
    );

    if (result.error) {
        throw result.error;
    }
    if (result.status !== 0) {
        process.exitCode = result.status ?? 1;
        break;
    }
}
