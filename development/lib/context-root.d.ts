/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * A ContextRoot can be used to gather unsatisfied context requests and redispatch these
 * requests when new providers which satisfy matching context keys are available.
 */
export declare class ContextRoot {
    private pendingContextRequests;
    /**
     * Attach the ContextRoot to a given element to intercept `context-request` and
     * `context-provider` events.
     *
     * @param element an element to add event listeners to
     */
    attach(element: HTMLElement): void;
    /**
     * Removes the ContextRoot event listeners from a given element.
     *
     * @param element an element from which to remove event listeners
     */
    detach(element: HTMLElement): void;
    private onContextProvider;
    private onContextRequest;
}
//# sourceMappingURL=context-root.d.ts.map