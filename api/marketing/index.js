const period = require(`./period`)
const promotion = require(`./promotion`)
const value = require(`./value`)

module.exports = {
    ...period,
    ...promotion,
    ...value
};