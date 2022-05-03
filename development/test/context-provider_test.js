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
const simpleContext = 'simple-context';
class ContextConsumerElement extends LitElement {
    constructor() {
        super(...arguments);
        this.value = 0;
    }
    render() {
        return html `Value <span id="value">${this.value}</span>`;
    }
}
__decorate([
    contextProvided({ context: simpleContext, subscribe: true }),
    property({ type: Number })
], ContextConsumerElement.prototype, "value", void 0);
customElements.define('context-consumer', ContextConsumerElement);
class ContextProviderElement extends LitElement {
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
], ContextProviderElement.prototype, "value", void 0);
customElements.define('context-provider', ContextProviderElement);
suite('@contextRequest', () => {
    let consumer;
    let provider;
    let container;
    setup(async () => {
        container = document.createElement('div');
        container.innerHTML = `
        <context-provider value="1000">            
            <context-consumer></context-consumer>
        </context-provider>
    `;
        document.body.appendChild(container);
        provider = container.querySelector('context-provider');
        consumer = container.querySelector('context-consumer');
        await provider.updateComplete;
        await consumer.updateComplete;
        assert.isDefined(consumer);
    });
    teardown(() => {
        document.body.removeChild(container);
    });
    test(`consumer receives a context`, async () => {
        assert.strictEqual(consumer.value, 1000);
    });
    test(`consumer receives updated context on provider change`, async () => {
        assert.strictEqual(consumer.value, 1000);
        provider.value = 500;
        await consumer.updateComplete;
        assert.strictEqual(consumer.value, 500);
    });
});
//# sourceMappingURL=context-provider_test.js.map