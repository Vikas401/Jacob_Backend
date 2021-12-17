const Customers = require("../models/customerModel");
const SentiScores = require("../models/sentiScoreModel");
var { ObjectID } = require("mongodb");

const fs = require("fs");


exports.create = (req, res) => {
  fs.readFile("uploads/uploadedFile.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
   var data = JSON.parse(jsonString)
  
    data.map((value) => {
    customers = new Customers({
      id: value.id,
      conversation_id: value.conversation_id,
      conversationIndex: value.conversationIndex,
      createdDateTime: value.createdDateTime,
      lastModifiedDateTime: value.lastModifiedDateTime,
      receivedDateTime: value.receivedDateTime,
      sentDateTime: value.sentDateTime,
      subject: value.subject,
      isRead: value.isRead,
      isDraft: value.isDraft,
      sender: value.sender,
      from: value.from,
      toRecipients: value.toRecipients,
      ccRecipients: value.ccRecipients,
      bccRecipients: value.bccRecipients,
      replyTo: value.replyTo,
      // senti_score: val._id
    });
    Customers.find({conversation_id: customers.conversation_id}).then(docs=> {
      if(docs){
        console.log("user already register")
      }else{
        
      }
    })
    customers.save().then((docs) => {
      res.send(docs);
    });
    value.senti_score.map((senti) => {
      SentiScores.create(senti).then((sentiscore) => {
        return Customers.findOneAndUpdate(
          { id: value.id },
          { $push: { senti_score: sentiscore._id } },
          { new: true }
        );
      });
    });
  }); 
});
};

exports.findAll = (req, res) => {
  Customers.find()
    .populate("senti_score")
    .then(
      (docs) => {
        //   console.log(docs)
        res.send({ docs });
      },
      (e) => {
        res.status(400).send(e);
      }
    );
};

exports.findOne = (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Customers.findById(id)
    .populate("senti_score")
    .then((customers) => {
      if (!customers) {
        return res.status(404).send();
      }
      res.send(customers);
    })
    .catch((e) => {
      res.status(400).send();
    });
};

exports.update = (req, res) => {
  SentiScores.create(req.body)
    .then((sentiscores) => {
      return Customers.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { senti_score: sentiscores._id } },
        { new: true }
      );
    })

    .then((customers) => {
      // If we were able to successfully update a Product, send it back to the client
      res.json(customers);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
};

exports.delete = (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Customers.findByIdAndRemove(id)
    .populate("senti_score")
    .then((customers) => {
      if (!customers) {
        return res.status(404).send();
      }
      res.send(customers);
    })
    .catch((e) => {
      res.status(400).send();
    });
};

exports.deleteAll = async (req, res) => {
  await Customers.deleteMany();
};
