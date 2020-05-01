import { IAsyncComputedValue } from "vue-async-computed";
import { createDecorator, VueDecorator } from "vue-class-component";

export interface IAsyncComputedOptions<TResult> {
  // NOTE: We cannot reuse the IAsyncComputedValue<T> interface from
  //       'vue-async-computed' because it requires the presence of a 'get'
  //       property (which is obviously the decorated function in this case).

  /**
   * The default value or a function which return the default value that will
   * be used until the data is loaded for the first time.
   */
  default?: TResult | (() => TResult);

  /**
   * An array of (nested) properties which are additional dependencies of
   * this computed value.
   */
  watch?: string[] | (() => void);

  /**
   * A function which determines whether the recalculation of the value is
   * required or not.
   */
  shouldUpdate?: () => boolean;

  /**
   * This flag indicates whether the value will be computed on first access
   * or immediately when initializing the corresponding Vue component.
   *
   * By default, or if this flag is `false`, the former behavior will take
   * place, otherwise (if the flag is `true`) the latter one will happen.
   */
  lazy?: boolean;
}


interface IAsyncComputedOptionsExtended<T> extends IAsyncComputedOptions<T> {
  get: () => Promise<T>
}

export const Async = <T>(options: IAsyncComputedOptionsExtended<T>) => {
  return (target: any, key: string) => {
    createDecorator((componentOptions: any, k: any) => {
      let async = (componentOptions.asyncComputed || ((componentOptions.asyncComputed = {}) as any));
      async[k] = options;
    })(target, key)
  }
}

export default function AsyncComputed<TResult>(
  computedOptions?: IAsyncComputedOptions<TResult>): VueDecorator {
  return createDecorator((options: any, key: any) => {
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
