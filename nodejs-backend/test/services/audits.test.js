const assert = require('assert');
const app = require('../../src/app');

describe('\'audits\' service', () => {
  it('registered the service', () => {
    const service = app.service('audits');

    assert.ok(service, 'Registered the service (audits)');
  });
});
