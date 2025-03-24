export function idPlugin(schema) {
  schema.virtual('id').get(function () {
    return this._id.toHexString()
  })

  schema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
      ret.id = ret._id.toHexString()
      delete ret._id
      delete ret.__v
    },
  })

  schema.set('toObject', {
    virtuals: true,
    transform: function (doc, ret) {
      ret.id = ret._id.toHexString()
      delete ret._id
      delete ret.__v
    },
  })
}
