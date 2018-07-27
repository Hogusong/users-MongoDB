const assert = require('assert');
const User = require('../models/user');

describe('Creating records', () => {

  it('Save users', done => {
    const joe = new User({  name: 'Joseph',  gender: 'Male' });
    const narae = new User({  name: 'Narae',  gender: 'Female' });
    joe.save();
    narae.save()
      .then(() => {
        User.find({})
          .then(users => {
            assert(users.length === 2);
            assert(users[0].name === 'Joseph')
            done();    
          })
      });
  });

  it('Save users by using Promise', done => {
    const joe = new User({ name: 'Joseph',  gender: 'Male' });
    const randy = new User({ name: 'Randy',  gender: 'Unknown' });
    const narae = new User({ name: 'Narae',  gender: 'Female' });
    Promise.all([ joe.save(), randy.save(), narae.save() ])
      .then(() => {
        User.find({})
        .then(users => {
          console.log(users)
          assert(users.length === 3);
          assert(users[0].name === 'Joseph')
          assert(!narae.isNew);
          done();    
        })
      })
  });
});
