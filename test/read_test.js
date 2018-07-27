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
  })

  it('find a users with name', done => {
    // return first user whose name is 'Narae'.
    User.findOne({ name: 'Narae' })
      .then(user => {
        assert(user._id.toString() === narae._id.toString());
        done();
      })
  });

  it('find all users with name', done => {
    User.find({ name: 'Narae' })
      .then(users => {
        assert(users.length === 2);
        done()
      });
  });

  it('find all users with name and gender', done => {
    User.find({ name: 'Narae', gender: 'Unknown' })
      .then(users => {
        assert(users.length === 1);
        assert(users[0]._id.toString() === clara._id.toString())
        done()
      });
  });

  it('find a user with a particular id', done => {
    User.findById(umma._id)
      .then(user => {
        console.log('username:', user.name);
        assert(user.name === 'Annie');
        done()
      })
  });  

  it('skip some and limit the result set', done => {
    User.find({})
      .sort({ name: -1 })
      .skip(1)
      .limit(2)
      .then(users => {
        assert(users.length === 2);
        assert(users[0].name === users[1].name);
        done();
      })
  })
});