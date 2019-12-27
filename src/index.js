import { createDecorator } from 'vue-class-component'

export default function AsyncComputed (computedOptions) {
  return createDecorator((options, key) => {
    options.asyncComputed = options.asyncComputed || {}
    const method = options.methods[key]
    options.asyncComputed[key] = Object.assign(
      { get: method },
      computedOptions
    )
    delete options.methods[key]
  })
}
