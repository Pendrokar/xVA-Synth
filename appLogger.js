"use strict"

const fs = require("fs")

class xVAAppLogger {

    constructor (fileLocation, appVersion) {
        this.lines = []
        this.fileLocation = fileLocation

        if (fs.existsSync(fileLocation)) {
            const data = fs.readFileSync(fileLocation, "utf8")
            this.lines = data.split("\n")
        }

        this.log(`New session - ${appVersion}`)
    }

    log (message) {
        this.lines.push(`${(new Date()).toJSON().replace("T", "_")} | ${message}`)

        if (this.lines.length>1000) {
            this.lines = this.lines.slice(this.lines.length-1000, this.lines.length)
        }

        fs.writeFileSync(this.fileLocation, this.lines.join("\n"), "utf8")
    }
}

exports.xVAAppLogger = xVAAppLogger
