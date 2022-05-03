/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { ContextRequestEvent } from './context-request-event.js';
/**
 * A ContextRoot can be used to gather unsatisfied context requests and redispatch these
 * requests when new providers which satisfy matching context keys are available.
 */
export class ContextRoot {
    constructor() {
        this.pendingContextRequests = new Map();
        this.onContextProvider = (ev) => {
            const pendingRequests = this.pendingContextRequests.get(ev.context);
            if (!pendingRequests) {
                return; // no pending requests for this provider at this time
            }
            // clear our list, any still unsatisfied requests will re-add themselves
            this.pendingContextRequests.delete(ev.context);
            // loop over all pending requests and re-dispatch them from their source
            pendingRequests.forEach((request) => {
                const element = request.element;
                const callback = request.callback;
                // redispatch if we still have all the parts of the request
                if (element) {
                    element.dispatchEvent(new ContextRequestEvent(ev.context, callback, true));
                }
            });
        };
        this.onContextRequest = (ev) => {
            // events that are not subscribing should not be captured
            if (!ev.subscribe) {
                return;
            }
            // store a weakref to this element under the context key
            const request = {
                element: ev.target,
                callback: ev.callback,
            };
            let pendingContextRequests = this.pendingContextRequests.get(ev.context);
            if (!pendingContextRequests) {
                pendingContextRequests = new Set();
                this.pendingContextRequests.set(ev.context, pendingContextRequests);
            }
            // NOTE: if the element is connected multiple times it will add itself
            // to this set multiple times since the set identify of the request
            // object will be unique each time.
            pendingContextRequests.add(request);
        };
    }
    /**
     * Attach the ContextRoot to a given element to intercept `context-request` and
     * `context-provider` events.
     *
     * @param element an element to add event listeners to
     */
    attach(element) {
        element.addEventListener('context-request', this.onContextRequest);
        element.addEventListener('context-provider', this.onContextProvider);
    }
    /**
     * Removes the ContextRoot event listeners from a given element.
     *
     * @param element an element from which to remove event listeners
     */
    detach(element) {
        element.removeEventListener('context-request', this.onContextRequest);
        element.removeEventListener('context-provider', this.onContextProvider);
    }
}
//# sourceMappingURL=context-root.js.map