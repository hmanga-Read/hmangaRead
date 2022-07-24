const { MongoClient } = require('mongodb'),
  Mongo = new MongoClient(process.env.url),
  database = Mongo.db('hmangaRead');

export default database;