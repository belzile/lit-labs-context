import{decorateProperty as e}from"@lit/reactive-element/decorators/base.js";import{ContextConsumer as r}from"../controllers/context-consumer.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function t({context:t,subscribe:o}){return e({finisher:(e,n)=>{e.addInitializer((e=>{new r(e,t,(r=>{e[n]=r}),o)}))}})}export{t as contextProvided};
//# sourceMappingURL=context-provided.js.map
