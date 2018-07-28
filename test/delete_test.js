const assert = require('assert');
const User = require('../models/user');

describe('Read users out of the database', () => {
  let joe, narae, clara, randy, umma;
  beforeEach(done => {
    narae = new User({ name: 'Narae', gender: 'Female' });
    clara = new User({ name: 'Narae', gender: 'Unknown' });
    randy = new User({ name: 'Randy', gender: 'Male'});
    umma = new User({ name: 'Annie' });
    joe = new User({ name: 'Joseph', gender: 'Male' });

    Promise.all([narae.save(), clara.save(), randy.save(), umma.save(), joe.save()])
      .then(() => {  done();  })
  });

  it('model class method remove a user', done => {
    User.remove({ name: 'Narae' })
      .then(() => User.find({}))
      .then(users => {
        assert(users.length === 3);
        done();
      })
  });  

  it('model instance remove a user', done => {
    clara.remove()
      .then(() => User.findOne({ name: 'Narae', gender: 'Unknown' }))
      .then((user) => {
        assert(user === null);
        done();
      })
  });

  it('model class method findByIdAndRemove a user', done => {
    User.findByIdAndRemove(joe._id)
    .then(() => User.findOne({ name: 'Joseph' }))
    .then((user) => {
      assert(user === null);
      done();
    })
  });

  it('model class method findOneAndRemove a user', done => {
    User.findOneAndRemove({ name: 'Narae', gender: 'Female' })
      .then(() => User.findOne({ name: 'Narae', gender: 'Female' }))
      .then((user) => {
        assert(user === null);
        done();
      })
  });
});