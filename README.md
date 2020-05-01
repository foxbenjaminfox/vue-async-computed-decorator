<big><h1 align="center">vue-async-computed-decorator</h1></big>

<p align="center">
  <a href="https://npmjs.org/package/vue-async-computed-decorator">
    <img src="https://img.shields.io/npm/v/vue-async-computed-decorator.svg?style=flat-square"
         alt="NPM Version">
  </a>

  <a href="https://travis-ci.org/foxbenjaminfox/vue-async-computed-decorator">
    <img src="https://img.shields.io/travis/foxbenjaminfox/vue-async-computed-decorator.svg?style=flat-square"
         alt="Build Status">
  </a>

  <a href="https://npmjs.org/package/vue-async-computed-decorator">
    <img src="https://img.shields.io/npm/dm/vue-async-computed-decorator.svg?style=flat-square"
         alt="Downloads">
  </a>

  <a href="https://david-dm.org/foxbenjaminfox/vue-async-computed-decorator.svg">
    <img src="https://david-dm.org/foxbenjaminfox/vue-async-computed-decorator.svg?style=flat-square"
         alt="Dependency Status">
  </a>

  <a href="https://github.com/foxbenjaminfox/vue-async-computed-decorator/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/vue-async-computed-decorator.svg?style=flat-square"
         alt="License">
  </a>
</p>

This package provides two [`vue-class-component`](https://github.com/vuejs/vue-class-component/) decorators for [`vue-async-computed`](https://github.com/foxbenjaminfox/vue-async-computed). This allows you to use `vue-async-computed` in your class-style Vue components easily.

## First decorator usage Example:

The first decorator use the standard Async compute object definition directly inside the your class. 
This can result in strange typing resolution in your methods. 

```javascript
import Vue from 'vue'
import AsyncComputedPlugin from 'vue-async-computed'
import AsyncComputed from 'vue-async-computed-decorator'
import Component from 'vue-class-component'

Vue.use(AsyncComputedPlugin)

@Component
class MyComponent extends Vue {
  @AsyncComputed
  async someComputedProp() {
    ...
  }
}
```

## Second decorator usage Example:


The second decorator move Async computed object definition inside the decorator, your type resolution will not "see" the async computed object declaration but will see only the result type. 

```javascript
import Vue from 'vue'
import AsyncComputedPlugin from 'vue-async-computed'
import {Async} from 'vue-async-computed-decorator'
import Component from 'vue-class-component'

Vue.use(AsyncComputedPlugin)

@Component
class MyComponent extends Vue {
  @Async({
    get(){ /* async method */ }, 
    /* ... options ... */
  })
  property: <myType>
}
```





## Credits

Thanks to [@TheNoim](https://github.com/TheNoim), [@saraedum](https://github.com/saraedum), and [@nwtgck](https://github.com/nwtgck) for the implementation of this decorator.
