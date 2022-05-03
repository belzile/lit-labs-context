import{decorateProperty as t}from"@lit/reactive-element/decorators/base.js";import{ContextProvider as e}from"../controllers/context-provider.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function o({context:o}){return t({finisher:(t,r)=>{let n;t.addInitializer((t=>{n=new e(t,o)}));const c=Object.getOwnPropertyDescriptor(t.prototype,r),i=c?.set,s={...c,set:function(t){n?.setValue(t),i&&i.call(this,t)}};Object.defineProperty(t.prototype,r,s)}})}export{o as contextProvider};
//# sourceMappingURL=context-provider.js.map
