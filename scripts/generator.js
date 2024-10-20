const fs = require('fs')
const path = require('path')

const ENCODING = 'utf-8'

class Generator {
  constructor(filePath) {
    const dist = path.resolve(__dirname, filePath)

    this.dist = dist
    this.content = fs.readFileSync(dist, { encoding: ENCODING })
  }

  render(name, newContent) {
    if (!name) return

    const reg = new RegExp(`<!-- ${name}_start -->([\\s\\S]*?)<!-- ${name}_end -->`, 'mg')

    this.content = this.content.replace(reg, newContent)
  }

  update() {
    fs.writeFileSync(this.dist, this.content, { encoding: ENCODING })
  }
}

module.exports = { Generator }
