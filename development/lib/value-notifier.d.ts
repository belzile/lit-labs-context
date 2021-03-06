/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { ContextCallback } from './context-request-event.js';
/**
 * A simple class which stores a value, and triggers registered callbacks when the
 * value is changed via its setter.
 *
 * An implementor might use other observable patterns such as MobX or Redux to get
 * behavior like this. But this is a pretty minimal approach that will likely work
 * for a number of use cases.
 */
export declare class ValueNotifier<T> {
    private callbacks;
    private _value;
    get value(): T;
    set value(v: T);
    setValue(v: T, force?: boolean): void;
    constructor(defaultValue?: T);
    updateObservers: () => void;
    addCallback(callback: ContextCallback<T>, subscribe?: boolean): void;
    clearCallbacks(): void;
}
//# sourceMappingURL=value-notifier.d.ts.map