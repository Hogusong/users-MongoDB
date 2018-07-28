const assert = require('assert');
const User = require('../models/user');

describe('Updating  a record', () => {
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

  function assertName(name, gender, done, operation) {
    operation
      .then(() => User.findById(clara._id))
      .then(user => {
        console.log('name:', name, ' gender:', gender);
        assert(user.name === name && user.gender === gender);
        done();
      });
  }

  it("A model class update with user's info", done => {
    assertName('Clara', 'Female', done, 
      User.findOneAndUpdate({ name: 'Narae', gender: "Unknown" }, { name: 'Clara', gender: "Female" })
    )
  });

  it("A model class update with user's ID", done => {
    assertName('Clara', 'MyGirl', done, 
      User.findByIdAndUpdate(clara._id, { name: 'Clara', gender: "MyGirl" })
    )
  });

  it('A model class update', done => {
    assertName('Unknown', 'Unknown', done,
      User.update({ name: 'Narae', gender: "Unknown" }, { name: 'Unknown', gender: 'Unknown' })
    );
  });

  it('A model instance can update', done => {
    assertName('Clara', 'Daughter', done, 
        clara.update({ name: 'Clara', gender: 'Daughter'})
    )
  });

  it('instance type using set and save', done => {
    clara.set('name', 'Clara');
    clara.set('gender', 'Girl');
    assertName('Clara', 'Girl', done, clara.save());
  });

  it('A user can have their commentsCount incremented by 1', done => {
    User.findOneAndUpdate({ name: 'Joseph' }, { $inc: { commentsCount: 2 }})
      .then(() => User.findOne({ name: 'Joseph' }))
      .then(user => {
        assert(user.name === 'Joseph' && user.commentsCount === 2);
        done()
      })
  });
});