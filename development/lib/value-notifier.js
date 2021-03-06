/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * A simple class which stores a value, and triggers registered callbacks when the
 * value is changed via its setter.
 *
 * An implementor might use other observable patterns such as MobX or Redux to get
 * behavior like this. But this is a pretty minimal approach that will likely work
 * for a number of use cases.
 */
export class ValueNotifier {
    constructor(defaultValue) {
        this.callbacks = new Map();
        this.updateObservers = () => {
            for (const [callback, disposer] of this.callbacks) {
                callback(this._value, disposer);
            }
        };
        if (defaultValue !== undefined) {
            this.value = defaultValue;
        }
    }
    get value() {
        return this._value;
    }
    set value(v) {
        this.setValue(v);
    }
    setValue(v, force = false) {
        let changed = false;
        if (!Object.is(v, this._value)) {
            changed = true;
        }
        this._value = v;
        if (changed || force) {
            this.updateObservers();
        }
    }
    addCallback(callback, subscribe) {
        if (subscribe) {
            if (!this.callbacks.has(callback)) {
                this.callbacks.set(callback, () => {
                    this.callbacks.delete(callback);
                });
            }
        }
        callback(this.value);
    }
    clearCallbacks() {
        this.callbacks.clear();
    }
}
//# sourceMappingURL=value-notifier.js.map