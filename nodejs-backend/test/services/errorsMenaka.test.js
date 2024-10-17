const assert = require('assert');
const app = require('../../src/app');

describe('\'errorsMenaka\' service', () => {
  it('registered the service', () => {
    const service = app.service('errorsMenaka');

    assert.ok(service, 'Registered the service (errorsMenaka)');
  });
});
