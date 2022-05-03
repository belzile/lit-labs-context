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
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { ContextConsumer, ContextProvider, createContext } from '../index.js';
import { assert } from '@esm-bundle/chai';
import { contextProvided } from '../lib/decorators/context-provided.js';
const simpleContext = createContext('simple-context');
// @TODO: would be good to get this exported out of lit-elements
const stripExpressionComments = (html) => html.replace(/<!--\?lit\$[0-9]+\$-->|<!--\??-->/g, '');
class SimpleContextProvider extends LitElement {
    constructor() {
        super(...arguments);
        this.provider = new ContextProvider(this, simpleContext, 1000);
    }
    setValue(value) {
        this.provider.setValue(value);
    }
}
class SimpleContextConsumer extends LitElement {
    constructor() {
        super(...arguments);
        // a one-time property fullfilled by context
        this.onceValue = 0;
        // a subscribed property fulfilled by context
        this.subscribedValue = 0;
        // just use the controller directly
        this.controllerContext = new ContextConsumer(this, simpleContext, undefined, // no callback
        true // subscribe to updates
        );
    }
    render() {
        return html `${this.controllerContext.value}`;
    }
}
__decorate([
    contextProvided({ context: simpleContext }),
    property({ type: Number })
], SimpleContextConsumer.prototype, "onceValue", void 0);
__decorate([
    contextProvided({ context: simpleContext, subscribe: true }),
    property({ type: Number })
], SimpleContextConsumer.prototype, "subscribedValue", void 0);
customElements.define('simple-context-consumer', SimpleContextConsumer);
customElements.define('simple-context-provider', SimpleContextProvider);
suite('context-provider', () => {
    let provider;
    let consumer;
    setup(async () => {
        const container = document.createElement('div');
        container.innerHTML = `
       <simple-context-provider>
         <simple-context-consumer></simple-context-consumer>
       </simple-context-provider>
     `;
        document.body.appendChild(container);
        provider = container.querySelector('simple-context-provider');
        assert.isDefined(provider);
        consumer = provider.querySelector('simple-context-consumer');
        assert.isDefined(consumer);
    });
    test(`consumer receives a context`, async () => {
        assert.strictEqual(consumer.onceValue, 1000);
        assert.strictEqual(consumer.subscribedValue, 1000);
        assert.strictEqual(consumer.controllerContext.value, 1000);
        await consumer.updateComplete;
        assert.equal(stripExpressionComments(consumer.shadowRoot.innerHTML), '1000');
    });
    test(`consumer receives updated context on provider change`, async () => {
        assert.strictEqual(consumer.onceValue, 1000);
        assert.strictEqual(consumer.subscribedValue, 1000);
        assert.strictEqual(consumer.controllerContext.value, 1000);
        await consumer.updateComplete;
        assert.equal(stripExpressionComments(consumer.shadowRoot.innerHTML), '1000');
        provider.setValue(500);
        assert.strictEqual(consumer.onceValue, 1000); // once value shouldn't change
        assert.strictEqual(consumer.subscribedValue, 500);
        assert.strictEqual(consumer.controllerContext.value, 500);
        await consumer.updateComplete;
        assert.equal(stripExpressionComments(consumer.shadowRoot.innerHTML), '500');
    });
});
//# sourceMappingURL=context-request_test.js.map