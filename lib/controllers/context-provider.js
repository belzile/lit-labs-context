import{ValueNotifier as t}from"../value-notifier.js";
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class s extends Event{constructor(t){super("context-provider",{bubbles:!0,composed:!0}),this.context=t}}class e extends t{constructor(t,s,e){super(e),this.host=t,this.context=s,this.onContextRequest=t=>{t.context===this.context&&(t.stopPropagation(),this.addCallback(t.callback,t.subscribe))},this.host.addController(this),this.attachListeners()}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest)}hostConnected(){this.host.dispatchEvent(new s(this.context))}}export{e as ContextProvider,s as ContextProviderEvent};
//# sourceMappingURL=context-provider.js.map
