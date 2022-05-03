/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { ContextKey, ContextType } from '../context-key.js';
import { ReactiveController, ReactiveElement } from 'lit';
/**
 * ContextConsumer is a ReactiveController which binds a custom-element's
 * lifecycle to the Context API. When an element is connected to the DOM it
 * will emit the context-request event, invoking the callback set on the
 * controller when the context request is satisfied. It will also call
 * the dispose method provided by the Context API when the element is
 * disconnected.
 */
export declare class ContextConsumer<Context extends ContextKey<unknown, unknown>, HostElement extends ReactiveElement> implements ReactiveController {
    protected host: HostElement;
    private context;
    private callback?;
    private subscribe;
    private provided;
    value?: ContextType<Context>;
    constructor(host: HostElement, context: Context, callback?: ((value: ContextType<Context>, dispose?: (() => void) | undefined) => void) | undefined, subscribe?: boolean);
    private unsubscribe?;
    hostConnected(): void;
    hostDisconnected(): void;
    private dispatchRequest;
}
//# sourceMappingURL=context-consumer.d.ts.map