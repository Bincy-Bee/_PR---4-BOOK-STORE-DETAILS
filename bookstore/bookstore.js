const mongoose = require('mongoose');

const bookstoreSchema = new mongoose.Schema({
    title: String,
    author: String,
    category: String,
    publicationYear: Number,
    price: Number,
    quantity: Number,
    description: String,
    imageUrl: String,
  }, { timestamps: true });

  const bookstore = mongoose.model('bookstore', bookstoreSchema);

  module.exports= {bookstore};