# alexa-radio-paradise

[![CI](https://github.com/sgruendel/alexa-radio-paradise/actions/workflows/node.js.yaml/badge.svg?branch=master)](https://github.com/sgruendel/alexa-radio-paradise/actions/workflows/node.js.yaml)
[![Node.js 24](https://img.shields.io/badge/Node.js-24-339933?logo=nodedotjs&logoColor=white)](mise.toml)
[![License: GPL-3.0](https://img.shields.io/badge/license-GPL--3.0-blue.svg)](LICENSE)

Alexa Skill for querying the playlist from [Radio Paradise](https://radioparadise.com/).

## Configuration

Commands are run from the `lambda/` directory. Copy `.env.example` to `.env` and set `SKILL_ID` to the Alexa skill
ID. The local file is ignored by Git.

The deployed Lambda function must provide `SKILL_ID` in its environment configuration. Offline tests use a
dummy ID and require no deployment configuration.

## Testing

Run commands from the `lambda/` directory:

```bash
npm test              # offline unit + integration tests with coverage
npm run test:contract # live Radio Paradise API check
```

See [TESTING.md](TESTING.md) for setup, individual suites, CI, and device checks.

## TODOs

- Add tests for CanFulfillIntentRequest

  - <https://developer.amazon.com/docs/custom-skills/quick-start-canfulfill-intent-request.html>
  - <https://developer.amazon.com/docs/custom-skills/name-free-interaction.html>
  - <https://developer.amazon.com/de/docs/custom-skills/understand-name-free-interaction-for-custom-skills.html>

- Integrate MusicBrainz info https://wiki.musicbrainz.org/Development/XML_Web_Service/Version_2#Identifying_your_application_to_the_MusicBrainz_Web_Service
