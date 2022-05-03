/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { ValueNotifier } from '../value-notifier.js';
export class ContextProviderEvent extends Event {
    /**
     *
     * @param context the context which this provider can provide
     */
    constructor(context) {
        super('context-provider', { bubbles: true, composed: true });
        this.context = context;
    }
}
/**
 * A ReactiveController which can add context provider behavior to a
 * custom-element.
 *
 * This controller simply listens to the `context-request` event when
 * the host is connected to the DOM and registers the received callbacks
 * against its observable Context implementation.
 */
export class ContextProvider extends ValueNotifier {
    constructor(host, context, initialValue) {
        super(initialValue);
        this.host = host;
        this.context = context;
        this.onContextRequest = (ev) => {
            if (ev.context !== this.context) {
                return;
            }
            ev.stopPropagation();
            this.addCallback(ev.callback, ev.subscribe);
        };
        this.host.addController(this);
        this.attachListeners();
    }
    attachListeners() {
        this.host.addEventListener('context-request', this.onContextRequest);
    }
    hostConnected() {
        // emit an event to signal a provider is available for this context
        this.host.dispatchEvent(new ContextProviderEvent(this.context));
    }
}
//# sourceMappingURL=context-provider.js.map