To understand handling data with MongoDB (model, Schema) and
test all transactions with a library 'mocha' : 
  create, read, update, delete, validatoin, virtual_type, and association

mkdir users_mongo     -->  working folder
cd users_mongo
npm init  
npm install --save mongoose nodemon mocha

run 'Visual Studio' or 'Atom'

open <package.json> and modify 'script'
  "test": "echo \"Error: no test specified\" && exit 1"
    to
  "test": "nodemon --exec 'mocha -R min'"

npm run test          --> to start testing

When you save any file after modify, 'nodemon' execute 'mocha' to test.

to quit : press ctrl-c

Structure of root:
  users_mongo
    models
      blogPost.js
      comment.js
      post.js
      user.js
    src
    test
      association_test.js
      create_test.js
      delete_test.js
      middleware_test.js
      reading_test.js
      subdocument_test.js
      read_test.js
      subdocument_test.js
      test_helper.js
      update_test.js
      validation_test.js
      virtual_type.test.js

UserSchema related with BlogPostSchema and BlogPostSchema
BlogPostSchema related with CommentSchema
