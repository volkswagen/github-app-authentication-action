const { getInput, setFailed, setOutput } = require('@actions/core');
const { createAppAuth } = require('@octokit/auth-app');
const { authenticate } = require('./authenticate');

(async () => {
  await authenticate(createAppAuth, getInput, setOutput, setFailed);
})();
