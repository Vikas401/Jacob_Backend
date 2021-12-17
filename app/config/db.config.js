var mongoose = require("mongoose");

var uri =
  "mongodb+srv://Zentyment:Zentyment@jacob.ukboc.mongodb.net/Zentiment_data?retryWrites=true&w=majority";

var config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  auto_reconnect: true,
};
try {
  var db = mongoose.connect(uri, config, () => console.log("connected"));
} catch (error) {
  console.log("connection time out");
}

module.exports.db = db;
