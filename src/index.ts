import { IAsyncComputedValue, IAsyncComputedValueBase } from "vue-async-computed";
import { createDecorator, VueDecorator } from "vue-class-component";

export type IAsyncComputedOptions<T> = IAsyncComputedValueBase<T>;

export default function AsyncComputed<TResult>(
    computedOptions?: IAsyncComputedOptions<TResult>): VueDecorator {
    return createDecorator((options, key) => {
        options.asyncComputed = options.asyncComputed || {};

        if (options.methods === undefined) {
            throw new Error("methods is undefined");
        }

        const method = options.methods[key];

        options.asyncComputed[key] = {
            get: method,
            ...computedOptions,
        } as IAsyncComputedValue<TResult>;

        delete options.methods[key];
    });
}
