const { getInput, setFailed, setOutput } = require('@actions/core');
const { createAppAuth } = require('@octokit/auth-app');

async function authenticate(authFunc, getInputFunc, setOutputFunc, setFailedFunc) {
  try {
    const installationId = getInputFunc('installationId', { required: true });
    const auth = authFunc({
      appId: getInputFunc('appId', { required: true }),
      privateKey: getInputFunc('privateKey', { required: true }),
      clientId: getInputFunc('clientId', { required: true })
    });
    const installationAuthentication = await auth({
      type: 'installation',
      installationId
    });
    setOutputFunc('token', installationAuthentication.token);
  } catch (error) {
    setFailedFunc(error.message);
  }
}

(async () => {
  await authenticate(createAppAuth, getInput, setOutput, setFailed);
})();

exports.authenticate = authenticate;
