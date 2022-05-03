/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { ContextRequestEvent } from '../context-request-event.js';
import { ContextKey, ContextType } from '../context-key.js';
import { ValueNotifier } from '../value-notifier.js';
import { ReactiveController, ReactiveElement } from 'lit';
declare global {
    interface HTMLElementEventMap {
        /**
         * A 'context-provider' event can be emitted by any element which hosts
         * a context provider to indicate it is available for use.
         */
        'context-provider': ContextProviderEvent<ContextKey<unknown, unknown>>;
    }
}
export declare class ContextProviderEvent<Context extends ContextKey<unknown, unknown>> extends Event {
    readonly context: Context;
    /**
     *
     * @param context the context which this provider can provide
     */
    constructor(context: Context);
}
/**
 * A ReactiveController which can add context provider behavior to a
 * custom-element.
 *
 * This controller simply listens to the `context-request` event when
 * the host is connected to the DOM and registers the received callbacks
 * against its observable Context implementation.
 */
export declare class ContextProvider<T extends ContextKey<unknown, unknown>> extends ValueNotifier<ContextType<T>> implements ReactiveController {
    protected host: ReactiveElement;
    private context;
    constructor(host: ReactiveElement, context: T, initialValue?: ContextType<T>);
    onContextRequest: (ev: ContextRequestEvent<ContextKey<unknown, unknown>>) => void;
    private attachListeners;
    hostConnected(): void;
}
//# sourceMappingURL=context-provider.d.ts.map