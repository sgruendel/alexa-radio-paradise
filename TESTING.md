# Testing Paradise Playlist

Run `mise install` from the repository root to install Node 24, matching the Lambda runtime in `ask-resources.json`.
Run the commands below from `lambda/` after `npm ci`.

| Command | Scope | External access |
| --- | --- | --- |
| `npm test` | Unit and local integration tests, with runtime coverage thresholds | None |
| `npm run test:unit` | Song normalization, speech formatting, and utility behavior | None |
| `npm run test:integration` | Lambda handler, ASK SDK, presentation, and HTTP adapter with Nock fixtures | None |
| `npm run test:contract` | Live Main Mix playlist contract | Radio Paradise |
| `npm run lint` | ESLint checks | None |

## Offline tests and coverage

Offline commands preload `test/env.js`, which sets a dummy skill ID and ignores local deployment configuration.
`test/setup.js` blocks HTTP connections with Nock, cleans up mocks after each test, and fails tests with unconsumed
expectations.

`npm test` includes unexecuted runtime files in coverage and enforces at least 90% line, statement, and function
coverage and 85% branch coverage. Reports are written to `lambda/coverage/`.

GitHub Actions runs lint and the offline suite on Node 24. The API contract workflow runs separately, weekly or on
demand, so an upstream outage does not fail ordinary pull request checks.

## Before release: device checks

Automated request tests do not verify speech recognition, pronunciation, microphone behavior, or actual rendering.
Check at least one voice-only Echo and one Echo Show (or use the developer console APL preview):

- Launch each supported locale and query every mix.
- Ask for previous and next tracks, including the end and refreshed beginning of the stored playlist.
- Check artist, title, album, year, duration, and rating pronunciation.
- Check the Echo Show layout, cover image, and Alexa app card.
- Verify the friendly response when Radio Paradise is unavailable.

The Lambda gives Radio Paradise lookups a six-second budget, shortened if less invocation time remains.
