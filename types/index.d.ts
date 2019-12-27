import { IAsyncComputedValue } from 'vue-async-computed';
import { VueDecorator } from 'vue-class-component';

export function AsyncComputed<T>(computedOptions?: IAsyncComputedValue<T>): VueDecorator;
