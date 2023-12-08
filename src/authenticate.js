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

exports.authenticate = authenticate;
