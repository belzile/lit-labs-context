/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { decorateProperty } from '@lit/reactive-element/decorators/base.js';
import { ContextProvider } from '../controllers/context-provider.js';
/*
 * IMPORTANT: For compatibility with tsickle and the Closure JS compiler, all
 * property decorators (but not class decorators) in this file that have
 * an @ExportDecoratedItems annotation must be defined as a regular function,
 * not an arrow function.
 */
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
 * import {loggerContext} from 'community-protocols/logger';
 *
 * class MyElement {
 *   @contextProvided(loggerContext)
 *   logger;
 *
 *   doThing() {
 *     this.logger.log('thing was done');
 *   }
 * }
 * ```
 * @category Decorator
 */
export function contextProvider({ context: context, }) {
    return decorateProperty({
        finisher: (ctor, name) => {
            let controller;
            ctor.addInitializer((element) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                controller = new ContextProvider(element, context);
            });
            // proxy any existing setter for this property and use it to
            // notify the controller of an updated value
            const descriptor = Object.getOwnPropertyDescriptor(ctor.prototype, name);
            const oldSetter = descriptor === null || descriptor === void 0 ? void 0 : descriptor.set;
            const newDescriptor = {
                ...descriptor,
                set: function (value) {
                    controller === null || controller === void 0 ? void 0 : controller.setValue(value);
                    if (oldSetter) {
                        oldSetter.call(this, value);
                    }
                },
            };
            Object.defineProperty(ctor.prototype, name, newDescriptor);
        },
    });
}
//# sourceMappingURL=context-provider.js.map