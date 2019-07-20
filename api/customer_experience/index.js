const complaint = require(`./complaint`)
const feedback = require(`./feedback`)

module.exports = {
    ...complaint,
    ...feedback
};