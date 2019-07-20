const casa = require(`./casa`)
const creditcard = require(`./creditcard`)
const customer = require(`./customer`)
const ebilling = require(`./ebilling`)
const loan = require(`./loan`)

module.exports = {
    ...casa,
    ...creditcard,
    ...customer,
    ...ebilling,
    ...loan
};