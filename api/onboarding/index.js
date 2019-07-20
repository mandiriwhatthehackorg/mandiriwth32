const admin = require(`./admin`)
const agent = require(`./agent`)
const client = require(`./client`)
const login = require(`./login`)
const register = require(`./register`)

module.exports = {
    ...admin,
    ...agent,
    ...client,
    ...login,
    ...register
};