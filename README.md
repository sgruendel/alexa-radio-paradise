# alexa-radio-paradise
Alexa Skill for querying playlist from Radio Paradise

## Configuration

Commands are run from the `lambda/` directory. Copy `.env.example` to `.env` and set `SKILL_ID` to the Alexa skill
ID. The local file is ignored by Git. Both the Lambda entry point and the local handler tests require this variable;
`npm test` loads it from `.env` automatically.

GitHub Actions reads `SKILL_ID` from a repository variable. The deployed Lambda function must provide the same
variable in its environment configuration.

## Testing

Run commands from the `lambda/` directory:

```bash
npm test # local tests with Nock plus one live Radio Paradise check
```

## TODOs
- Add tests for CanFulfillIntentRequest
  * https://developer.amazon.com/docs/custom-skills/quick-start-canfulfill-intent-request.html
  * https://developer.amazon.com/docs/custom-skills/name-free-interaction.html
  * https://developer.amazon.com/de/docs/custom-skills/understand-name-free-interaction-for-custom-skills.html
- Integrate MusicBrainz info https://wiki.musicbrainz.org/Development/XML_Web_Service/Version_2#Identifying_your_application_to_the_MusicBrainz_Web_Service
