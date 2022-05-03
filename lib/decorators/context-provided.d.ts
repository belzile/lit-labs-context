/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { ReactiveElement } from '@lit/reactive-element';
import { ContextKey } from '../context-key.js';
/**
 * A property decorator that adds a ContextConsumer controller to the component
 * which will try and retrieve a value for the property via the Context API.
 *
 * @param context A Context identifier value created via `createContext`
 * @param multiple An optional boolean which when true allows the value to be updated
 *   multiple times.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
 *
 * @example
 *
 * ```ts
 * import {loggerContext, Logger} from 'community-protocols/logger';
 *
 * class MyElement {
 *   @contextProvided({context: loggerContext})
 *   logger?: Logger;
 *
 *   doThing() {
 *     this.logger!.log('thing was done');
 *   }
 * }
 * ```
 * @category Decorator
 */
export declare function contextProvided<ValueType>({ context: context, subscribe, }: {
    context: ContextKey<unknown, ValueType>;
    subscribe?: boolean;
}): <K extends PropertyKey>(protoOrDescriptor: ReactiveElement & Record<K, ValueType>, name?: K) => void | any;
//# sourceMappingURL=context-provided.d.ts.map