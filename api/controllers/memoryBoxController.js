

var mongoose = require('mongoose'),
  Task = require('../models/memoryBoxModel.js')

exports.list_all_collections = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
    res.send(err);
    res.json(task);
  });
};




exports.create_a_collections = function(req, res) {
  if(!req.body.name) {
      return res.status(400).send({
          message: "Collection content can not be empty"
      });
    }
    var task = new Task({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        message: req.body.message,
        productImage: req.file.path
    });
    task.save().then(data => {
        res.send(data);
    }).catch(err => {
            res.status(500).send({
            message: err.message || "Some error occurred while creating the collection"
        });
    })
};


exports.read_a_collections = function(req, res) {
    Task.find()
    .then(tasks => {
        res.send(tasks);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving collections."
        });
    });
};
exports.findOne = (req, res) => {
    Task.findById(req.params.taskId)
    .then(task => {
        if(!task) {
            return res.status(404).send({
                message: "Collection not found with id " + req.params.taskId
            });
        }
        res.send(task);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Collection not found with id " + req.params.taskId
            });
        }
        return res.status(500).send({
            message: "Error retrieving collection with id " + req.params.taskId
        });
    });
};

exports.update_a_collections = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });

      // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Collection content can not be empty"
        });
    }

    // Find note and update it with the request body
    Task.findByIdAndUpdate(req.params.taskId, {
        name: req.body.name,
        message: req.body.message,
        productImage: req.file.path
    }, {new: true})
    .then(task => {
        if(!task) {
            return res.status(404).send({
                message: "Collection not found with id " + req.params.taskId
            });
        }
        res.send(task);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Collection not found with id " + req.params.taskId
            });
        }
        return res.status(500).send({
            message: "Error updating Collection with id " + req.params.taskId
        });
    });



};


exports.delete_a_collections = function(req, res) {
    Task.remove(req.params.taskId).then(task => {
       if(!task) {
           return res.status(404).send({
               message: "not found with id " + req.params.taskId
           });
       }
       res.send({message: "Collection deleted successfully!"});
    }).catch(err => {
       if(err.kind === 'ObjectId' || err.name === 'NotFound') {
           return res.status(404).send({
               message: "Not found with id " + req.params.taskId
           });
       }
       return res.status(500).send({
           message: "Could not delete collection with id " + req.params.taskId
       });
    });
};
