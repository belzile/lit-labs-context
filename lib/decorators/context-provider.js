import{decorateProperty as t}from"@lit/reactive-element/decorators/base.js";import{ContextProvider as e}from"../controllers/context-provider.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function o({context:o}){return t({finisher:(t,r)=>{let n;t.addInitializer((t=>{n=new e(t,o)}));const i=Object.getOwnPropertyDescriptor(t.prototype,r),c=null==i?void 0:i.set,l={...i,set:function(t){null==n||n.setValue(t),c&&c.call(this,t)}};Object.defineProperty(t.prototype,r,l)}})}export{o as contextProvider};
//# sourceMappingURL=context-provider.js.map
