const assert = require('assert');
const app = require('../../src/app');

describe('\'loops\' service', () => {
  it('registered the service', () => {
    const service = app.service('loops');

    assert.ok(service, 'Registered the service for loops');
  });
});
