npm init  
npm install --save mongoose nodemon mocha
modify package.json file
  "test": "echo \"Error: no test specified\" && exit 1"
    to
  "test": "nodemon --exec 'mocha -R min'"

Structure:
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
      reading_test.js
      subdocument_test.js
      test_helper.js
      update_test.js
      validation_test.js
      virtual_type.test.js

UserSchema related with BlogPostSchema and BlogPostSchema
BlogPostSchema related with CommentSchema
