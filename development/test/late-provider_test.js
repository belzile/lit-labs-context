/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { contextProvided } from '../lib/decorators/context-provided.js';
import { contextProvider } from '../lib/decorators/context-provider.js';
import { assert } from '@esm-bundle/chai';
import { ContextRoot } from '../lib/context-root.js';
const simpleContext = 'simple-context';
class ContextConsumerElement extends LitElement {
    constructor() {
        super(...arguments);
        this.value = 0;
        this.onceValue = 0;
    }
    render() {
        return html `Value <span id="value">${this.value}</span>`;
    }
}
__decorate([
    contextProvided({ context: simpleContext, subscribe: true }),
    property({ type: Number })
], ContextConsumerElement.prototype, "value", void 0);
__decorate([
    contextProvided({ context: simpleContext }),
    property({ type: Number })
], ContextConsumerElement.prototype, "onceValue", void 0);
customElements.define('context-consumer', ContextConsumerElement);
class LateContextProviderElement extends LitElement {
    constructor() {
        super(...arguments);
        this.value = 0;
    }
    render() {
        return html `
      <div>
        <slot></slot>
      </div>
    `;
    }
}
__decorate([
    contextProvider({ context: simpleContext }),
    property({ type: Number, reflect: true })
], LateContextProviderElement.prototype, "value", void 0);
suite('late context provider', () => {
    let consumer;
    let provider;
    let container;
    setup(async () => {
        container = document.createElement('div');
        // add a root context to catch late providers and re-dispatch requests
        new ContextRoot().attach(container);
        container.innerHTML = `
         <late-context-provider value="1000">            
             <context-consumer></context-consumer>
         </late-context-provider>
     `;
        document.body.appendChild(container);
        provider = container.querySelector('late-context-provider');
        consumer = container.querySelector('context-consumer');
        await consumer.updateComplete;
        assert.isDefined(consumer);
    });
    teardown(() => {
        document.body.removeChild(container);
    });
    test(`handles late upgrade properly`, async () => {
        // initially consumer has initial value
        assert.strictEqual(consumer.value, 0);
        assert.strictEqual(consumer.onceValue, 0);
        // do upgrade
        customElements.define('late-context-provider', LateContextProviderElement);
        // await update of provider component
        await provider.updateComplete;
        // await update of consumer component
        await consumer.updateComplete;
        // should now have provided context
        assert.strictEqual(consumer.value, 1000);
        // but only to the subscribed value
        assert.strictEqual(consumer.onceValue, 0);
        // confirm subscription is established
        provider.value = 500;
        await consumer.updateComplete;
        assert.strictEqual(consumer.value, 500);
        // and once was not updated
        assert.strictEqual(consumer.onceValue, 0);
    });
});
//# sourceMappingURL=late-provider_test.js.map