const assert = require('assert');
const User = require('../models/user');

describe('Validation of UserSchema prop', () => {
  it('requires a user name', done => {
    const user = new User({ name: undefined, gender: 'Unknown'});
    const message = user.validateSync().errors.name.message;
    assert(message === 'UserSchema expected name prop.');
    done();
  });

  it("requires a user's name longer then 2 characters", done => {
    const user = new User({ name: 'Ab', gender: 'Unknown'});
    const message = user.validateSync().errors.name.message;
    assert(message === 'Name must be longer than 2 characters.');
    done();
  });

  it('not allowed invalid record from being saved', done => {
    const user = new User({ name: 'Ab', gender: 'Unknown'});
    user.save()
      .then(() => done())
      .catch(result => {
        const err = result.errors.name.message;
        assert( err === 'UserSchema expected name prop.' ||
                err === 'Name must be longer than 2 characters.');
        done();
      })
  });
});
