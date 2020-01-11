import test from 'tape'
import AsyncComputedPlugin from 'vue-async-computed'
import AsyncComputed from '../dist/index.js'
import Component from 'vue-class-component'
import Vue from 'vue'

Vue.use(AsyncComputedPlugin)

test('The AsyncComputed decorator defines async computed properties', t => {
  t.plan(4)

  @Component()
  class TestComponent extends Vue {
    @AsyncComputed()
    async shouldBeComputed () {
      return 1
    }
  }
  const vm = new TestComponent()

  t.equal(vm.shouldBeComputed, null)
  t.equal(vm.$asyncComputed.shouldBeComputed.state, 'updating')

  Vue.nextTick(() => {
    t.equal(vm.$asyncComputed.shouldBeComputed.state, 'success')
    t.equal(vm.shouldBeComputed, 1)
  })
})

test('The AsyncComputed decorator allows options on async computed properties', t => {
  t.plan(3)

  @Component()
  class TestComponent extends Vue {
    @AsyncComputed({ lazy: true })
    async shouldBeComputed () {
      return 1
    }
  }
  const vm = new TestComponent()

  t.equal(vm.shouldBeComputed, null)

  Vue.nextTick(() => {
    t.equal(vm.shouldBeComputed, null)
    Vue.nextTick(() => {
      t.equal(vm.shouldBeComputed, 1)
    })
  })
})
