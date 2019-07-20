const fee = require(`./fee`)
const rates = require(`./rates`)

module.exports = {
    ...fee,
    ...rates
};