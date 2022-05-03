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
import { ContextProvider } from '../index.js';
import { assert } from '@esm-bundle/chai';
import { ContextConsumer } from '../lib/controllers/context-consumer.js';
const simpleContext = 'simple-context';
class SimpleContextProvider extends LitElement {
    constructor() {
        super(...arguments);
        this.provider = new ContextProvider(this, simpleContext, 1000);
    }
    setValue(value) {
        this.provider.setValue(value);
    }
}
class MultipleContextConsumer extends LitElement {
    constructor() {
        super();
        this.value = 0;
        new ContextConsumer(this, simpleContext, (value) => {
            this.value = value;
        }, true // allow multiple values
        );
    }
    render() {
        return html `Value <span id="value">${this.value}</span>`;
    }
}
__decorate([
    property({ type: Number })
], MultipleContextConsumer.prototype, "value", void 0);
class OnceContextConsumer extends LitElement {
    constructor() {
        super();
        this.value = 0;
        new ContextConsumer(this, simpleContext, (value) => {
            this.value = value;
        });
    }
    render() {
        return html `Value <span id="value">${this.value}</span>`;
    }
}
__decorate([
    property({ type: Number })
], OnceContextConsumer.prototype, "value", void 0);
customElements.define('multiple-context-consumer', MultipleContextConsumer);
customElements.define('once-context-consumer', OnceContextConsumer);
customElements.define('simple-context-provider', SimpleContextProvider);
suite('context-provider', () => {
    let provider;
    let consumer;
    setup(async () => {
        const container = document.createElement('div');
        container.innerHTML = `
      <simple-context-provider>
        <multiple-context-consumer></multiple-context-consumer>
      </simple-context-provider>
    `;
        document.body.appendChild(container);
        provider = container.querySelector('simple-context-provider');
        assert.isDefined(provider);
        consumer = provider.querySelector('multiple-context-consumer');
        assert.isDefined(consumer);
    });
    test(`consumer receives a context`, async () => {
        assert.strictEqual(consumer.value, 1000);
    });
    test(`consumer receives updated context on provider change`, async () => {
        assert.strictEqual(consumer.value, 1000);
        provider.setValue(500);
        assert.strictEqual(consumer.value, 500);
    });
    test(`multiple consumers receive the same context`, async () => {
        const container = document.createElement('div');
        container.innerHTML = `
      <multiple-context-consumer>
      </multiple-context-consumer>
    `;
        provider.appendChild(container);
        const consumer2 = container.querySelector('multiple-context-consumer');
        assert.isDefined(consumer2);
        assert.strictEqual(consumer.value, 1000);
        assert.strictEqual(consumer2.value, 1000);
        provider.setValue(500);
        assert.strictEqual(consumer.value, 500);
        assert.strictEqual(consumer2.value, 500);
    });
    test(`one-time consumers only receive context once`, async () => {
        const container = document.createElement('div');
        container.innerHTML = `
      <once-context-consumer>
      </once-context-consumer>
    `;
        provider.appendChild(container);
        const consumer2 = container.querySelector('once-context-consumer');
        assert.isDefined(consumer2);
        assert.strictEqual(consumer.value, 1000);
        assert.strictEqual(consumer2.value, 1000);
        provider.setValue(500);
        assert.strictEqual(consumer.value, 500);
        assert.strictEqual(consumer2.value, 1000); // one-time consumer still has old value
    });
});
//# sourceMappingURL=provider-consumer_test.js.map