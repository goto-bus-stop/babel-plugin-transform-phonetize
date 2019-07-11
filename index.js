var d = require('defined')
var phonetic = require('phonetic')

var kRenamed = Symbol('renamed')

module.exports = function (b, opts) {
  var maxLength = d(opts && opts.maxLength, 3)
  var except = d(opts.except, [])

  return {
    visitor: {
      Program: {
        enter: function () {
          this.names = new NameGenerator(this.file.opts.filename)
        },
        exit: function () {
          this.names.close()
        }
      },
      ReferencedIdentifier: function (path) {
        if (path.node.name.length > maxLength) {
          return
        }
        if (except.indexOf(path.node.name) !== -1) {
          return
        }

        var binding = path.scope.getBinding(path.node.name)
        if (!binding) {
          return
        }
        if (binding[kRenamed]) {
          return
        }

        path.scope.rename(path.node.name, this.names.nextName())
        binding[kRenamed] = true
      }
    }
  }
}

function NameGenerator (seed) {
  this.last = seed || null
  this.used = new Set()
  this.length = 2
}
NameGenerator.prototype.nextName = function nextName () {
  var word = phonetic.generate({
    capFirst: false,
    syllables: this.length,
    seed: this.last
  })

  if (this.used.has(word)) {
    this.length++
    return this.nextName()
  }

  this.used.add(word)

  this.last = word
  return this.last
}
NameGenerator.prototype.close = function close () {
  this.used.clear()
}
