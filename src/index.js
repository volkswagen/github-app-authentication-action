"use strict";
const { getInput, setFailed, setOutput } = require('@actions/core');
const { createAppAuth } = require('@octokit/auth-app');

async function authenticate(authFunc, getInput, setOutput, setFailed) {
    try {
        const installationId = getInput('installationId', { required: true });
        const auth = authFunc({
            appId: getInput('appId', { required: true }),
            privateKey: getInput('privateKey', { required: true }),
            clientId: getInput('clientId', { required: true }),
            clientSecret: getInput('clientSecret', { required: true }),
        });
        const installationAuthentication = await auth({
            type: "installation",
            installationId: installationId,
        });
        setOutput("token", installationAuthentication.token);
    } catch (error) {
        setFailed(error.message);
    }
}

(async () => {
    await authenticate(createAppAuth, getInput, setOutput, setFailed);
})();

exports.authenticate = authenticate;