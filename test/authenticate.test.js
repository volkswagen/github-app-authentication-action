const { authenticate } = require('../src/index');

describe('authenticate', () => {
  test('when successful', async () => {
    const authMock = jest.fn();
    const getInputMock = jest.fn();
    const setOutputMock = jest.fn();
    const setFailedMock = jest.fn();

    authMock.mockReturnValue((options) => {
      expect(options).toStrictEqual({
        type: 'installation',
        installationId: 'InstallationID'
      });
      return { token: 'AUTHENTICATION_TOKEN' };
    });

    getInputMock
      .mockReturnValueOnce('InstallationID')
      .mockReturnValueOnce('AppID')
      .mockReturnValueOnce('PrivateKey')
      .mockReturnValueOnce('ClientId');

    await authenticate(authMock, getInputMock, setOutputMock, setFailedMock);

    expect(authMock.mock.calls.length).toBe(1);
    expect(authMock.mock.calls[0][0]).toStrictEqual({
      appId: 'AppID',
      privateKey: 'PrivateKey',
      clientId: 'ClientId'
    });

    expect(getInputMock.mock.calls.length).toBe(4);
    expect(getInputMock.mock.calls[0][0]).toBe('installationId');
    expect(getInputMock.mock.calls[0][1]).toStrictEqual({ required: true });
    expect(getInputMock.mock.calls[1][0]).toBe('appId');
    expect(getInputMock.mock.calls[1][1]).toStrictEqual({ required: true });
    expect(getInputMock.mock.calls[2][0]).toBe('privateKey');
    expect(getInputMock.mock.calls[2][1]).toStrictEqual({ required: true });
    expect(getInputMock.mock.calls[3][0]).toBe('clientId');
    expect(getInputMock.mock.calls[3][1]).toStrictEqual({ required: true });

    expect(setOutputMock.mock.calls.length).toBe(1);
    expect(setOutputMock.mock.calls[0][0]).toBe('token');
    expect(setOutputMock.mock.calls[0][1]).toBe('AUTHENTICATION_TOKEN');

    expect(setFailedMock.mock.calls.length).toBe(0);
  });

  const wrongInputCases = [
    ['appId', 0],
    ['privateKey', 1],
    ['clientId', 2],
    ['installationId', 3]
  ];

  test.each(wrongInputCases)('when input %s is missing', async (parameter, number) => {
    const authMock = jest.fn();
    const getInputMock = jest.fn();
    const setOutputMock = jest.fn();
    const setFailedMock = jest.fn();

    authMock.mockReturnValue((options) => {
      expect(options).toStrictEqual({ type: 'app' });
      return { token: 'AUTHENTICATION_TOKEN' };
    });

    let calledTimes = 0;
    getInputMock.mockImplementation(() => {
      if (calledTimes === number) {
        throw new Error('input error');
      } else {
        calledTimes += 1;
        return 'value';
      }
    });

    await authenticate(authMock, getInputMock, setOutputMock, setFailedMock);

    expect(authMock.mock.calls.length).toBe(0);

    expect(getInputMock.mock.calls.length).toBe(number + 1);
    expect(setOutputMock.mock.calls.length).toBe(0);
    expect(setFailedMock.mock.calls.length).toBe(1);
    expect(setFailedMock.mock.calls[0][0]).toBe('input error');
  });

  test('when authentication is failing', async () => {
    const authMock = jest.fn();
    const getInputMock = jest.fn();
    const setOutputMock = jest.fn();
    const setFailedMock = jest.fn();

    authMock.mockReturnValue(() => {
      throw new Error('auth fails');
    });

    getInputMock
      .mockReturnValueOnce('InstallationID')
      .mockReturnValueOnce('AppID')
      .mockReturnValueOnce('PrivateKey')
      .mockReturnValueOnce('ClientId');

    await authenticate(authMock, getInputMock, setOutputMock, setFailedMock);

    expect(authMock.mock.calls.length).toBe(1);
    expect(authMock.mock.calls[0][0]).toStrictEqual({
      appId: 'AppID',
      privateKey: 'PrivateKey',
      clientId: 'ClientId',
    });

    expect(getInputMock.mock.calls.length).toBe(4);
    expect(setOutputMock.mock.calls.length).toBe(0);
    expect(setFailedMock.mock.calls.length).toBe(1);
    expect(setFailedMock.mock.calls[0][0]).toBe('auth fails');
  });
});
