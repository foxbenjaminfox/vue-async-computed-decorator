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
    async shouldBeComputed() {
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
    @AsyncComputed({lazy: true})
    async shouldBeComputed() {
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


test('The AsyncComputed decorator can be applied to getter computed properties', t => {
  t.plan(4)

  @Component()
  class TestComponent extends Vue {
    @AsyncComputed({default: 0})
    get shouldBeComputed() {
      return new Promise(resolve => {
        resolve(1)
      })
    }
  }

  const vm = new TestComponent()

  t.equal(vm.shouldBeComputed, 0)
  t.equal(vm.$asyncComputed.shouldBeComputed.state, 'updating')

  Vue.nextTick(() => {
    t.equal(vm.$asyncComputed.shouldBeComputed.state, 'success')
    t.equal(vm.shouldBeComputed, 1)
  })
})


test('The AsyncComputed decorator works on getters with watch option', t => {
  // t.plan(7)

  @Component()
  class TestComponent extends Vue {
    watchValue = 'initial';
    computationCount = 0

    @AsyncComputed({default: 'default', watch: ['watchValue'], lazy: false})
    get asyncGetter() {
      this.computationCount++;
      return new Promise(resolve => {
        resolve(this.watchValue)
      })
    }
  }

  const vm = new TestComponent()

  t.equal(vm.watchValue, 'initial', 'initial watch value')
  t.equal(vm.computationCount, 1, 'getter calculation is triggered immediately')
  t.equal(vm.asyncGetter, 'default', 'initial asyncGetter value')
  t.equal(vm.computationCount, 1, 'getter is cached during this tick')

  Vue.nextTick(() => {
    t.equal(vm.asyncGetter, 'initial', 'getter is updated on next tick')
    t.equal(vm.computationCount, 1, 'getter is not recalculated')

    vm.watchValue = 'updated' // reactive set
    t.equals(vm.asyncGetter, 'initial', 'getter returns cached value after watched value changes') // reactive get
    t.equal(vm.computationCount, 1, 'no immediate recalculation after watched value changes')

    Vue.nextTick(() => {
      t.equal(vm.computationCount, 2, 'a recalculation is triggered on tick after watched value changes')
      Vue.nextTick(() => {
        t.equal(vm.asyncGetter, 'updated', 'getter value is updated in the ticket after recalculation was triggered')
        t.equal(vm.computationCount, 2, 'there were 2 calculations in total')
      })
    })
  })
})

