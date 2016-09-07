const chai = require('chai');
const sinon = require('sinon');

chai.should();

const trekStatusMonitor = require('../index');
const defaultConfig = require('../helpers/default-config');

describe('trek-status-monitor', () => {
  describe('when initialised', () => {
    const middleware = trekStatusMonitor();

    it('then it should be an instance of Function', () => {
      middleware.should.be.an.instanceof(Function);
    });

    const req = { socket: {} };
    const res = { end: sinon.stub() };
    const next = sinon.stub();

    describe('when invoked', () => {
      beforeEach(() => {
        req.path = defaultConfig.path;
        res.end.reset();
      });

      it(`and req.path === ${defaultConfig.path}, then res.end called`, () => {
        middleware({ req, rawRes: res }, next);
        sinon.assert.called(res.end);
      });

      it(`and req.path !== ${defaultConfig.path}, then res.end not called`, () => {
        req.path = '/another-path';
        middleware({ req, rawRes: res }, next);
        sinon.assert.notCalled(res.end);
      });
    });
  });
});
