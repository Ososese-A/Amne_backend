const loggger = (req, res, next) => {
    console.log(`The URL: ${req.url},  The Method: ${req.method}`)
    console.log("req.header")
    console.log(req.header)
    console.log("req.body")
    console.log(req.body)
    next()
}

module.exports = {loggger}