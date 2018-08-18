
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
  // todoList Routes
  app.route('/')
    .get(memoryBox.list_all_collections)
    .post(upload.single('productImage'), memoryBox.create_a_collections);


  app.route('/:collectionId')
    .get(memoryBox.read_a_collections)
    .put(memoryBox.update_a_collections)
    .delete(memoryBox.delete_a_collections);
};
