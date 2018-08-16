

var mongoose = require('mongoose'),
  Task = mongoose.model('Collections');

exports.list_all_collections = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
    res.send(err);
    res.json(task);
  });
};




exports.create_a_collections = function(req, res) {
  var new_task = new Task({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    message: req.body.message,
    productImage: req.file.path
  });
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
      res.json(task);
  });
};


exports.read_a_collections = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_collections = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_collections = function(req, res) {


  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};
