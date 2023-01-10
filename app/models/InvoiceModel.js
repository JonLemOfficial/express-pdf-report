const { Schema, model } = require('mongoose');

const InvoiceSchema = new Schema({
  product_name: { type: String, required: true },
  price: { type: String, required: true },
  payed: {type: Boolean, required: false, default: false }
});

module.exports = model('Invoices', InvoiceSchema);