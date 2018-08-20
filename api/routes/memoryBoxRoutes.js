
module.exports = function(app) {
  var memoryBox = require('../controllers/memoryBoxController');
  var multer = require('multer')
  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });
  var fileFilter = (req, file, cb) => {
  // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);// new Error('only jpy or png') // handle in FE
    }
  };
  var upload = multer({
  storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });

    app.post('/collections',upload.single('productImage'), memoryBox.create_a_collections);


    // Retrieve all Notes
    app.get('/collections', memoryBox.read_a_collections);

    // Retrieve a single Note with noteId
    app.get('/collections/:collectionId', memoryBox.findOne);

    // Update a Note with noteId
    app.put('/collections/:collectionId', memoryBox.update_a_collections);

    // Delete a Note with noteId
    app.delete('/collections/:collectionId', memoryBox.delete_a_collections)

};
