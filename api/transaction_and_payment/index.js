const bill = require(`./bill`)
const creditcard = require(`./creditcard`)
const emoney = require(`./emoney`)
const transfer = require(`./transfer`)

module.exports = {
    ...bill,
    ...creditcard,
    ...emoney,
    ...transfer
};