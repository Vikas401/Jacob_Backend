const SentiScore = require("../models/sentiScoreModel");
var { ObjectID } = require("mongodb");
exports.create = (req, res) => {
  var senti_score = new SentiScore({
    score: req.body.score,
    categories: req.body.categories,
    topic: req.body.topic,
    entities: req.body.entities,
  });
  senti_score.save().then(
    (doc) => {
      doc.isNew === false;
      res.send(doc);
    },
    (e) => {
      res.status(400).send(e);
    }
  );
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  SentiScore.find().then(
    (senti_score) => {
      res.send({ senti_score });
    },
    (e) => {
      res.status(400).send(e);
    }
  );
};

// Find a single note with a noteId

exports.findOne = (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  SentiScore.findById(id)
    .then((senti_score) => {
      if (!senti_score) {
        return res.status(404).send();
      }
      res.send({ senti_score });
    })
    .catch((e) => {
      res.status(400).send();
    });
};

// Update a note identified by the noteId in the request

exports.update = (req, res) => {
  var id = req.params.id;
  const sentiscore = new SentiScore();

  //  var body = _.pick(req.body);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  SentiScore.findByIdAndUpdate(
    id,
    {
      $set: {
        senti_score: req.body.senti_score,
      },
    },
    { new: true }
  )
    .then((senti_score) => {
      if (!senti_score) {
        return res.status(404).send();
      }
      res.send({ senti_score });
    })
    .catch((e) => {
      res.status(400).send();
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  SentiScore.findByIdAndRemove(id)
    .then((senti_score) => {
      if (!senti_score) {
        return res.status(404).send();
      }
      res.send(senti_score);
    })
    .catch((e) => {
      res.status(400).send();
    });
};
