import { IAsyncComputedValue, IAsyncComputedValueBase } from "vue-async-computed";
import { createDecorator, VueDecorator } from "vue-class-component";
import { DefaultComputed } from "vue/types/options";

export type IAsyncComputedOptions<T> = IAsyncComputedValueBase<T>;

export default function AsyncComputed<TResult>(
  computedOptions?: IAsyncComputedOptions<TResult>): VueDecorator {
    return createDecorator((options, key) => {
        options.asyncComputed = options.asyncComputed || {};

        let method: DefaultComputed | null = null
        if (options.methods?.[key]) {
            method = options.methods[key]
            delete options.methods[key];
        } else if (options.computed?.[key]) {
            method = options.computed[key]
            delete options.computed[key];
        } else {
            throw new Error(`AsyncComputed ${key} is not a method or computed property`);
        }

        options.asyncComputed[key] = {
            get: method,
            ...computedOptions,
        } as IAsyncComputedValue<TResult>;
    });
}
