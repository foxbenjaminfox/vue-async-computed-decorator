import { IAsyncComputedValue } from 'vue-async-computed';
import { VueDecorator } from 'vue-class-component';

export function AsyncComputedProp<T>(computedOptions?: IAsyncComputedValue<T>): VueDecorator;
