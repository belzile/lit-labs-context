/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class t{constructor(t){this.callbacks=new Map,this.updateObservers=()=>{for(const[t,s]of this.callbacks)t(this.t,s)},void 0!==t&&(this.value=t)}get value(){return this.t}set value(t){this.setValue(t)}setValue(t,s=!1){let i=!1;Object.is(t,this.t)||(i=!0),this.t=t,(i||s)&&this.updateObservers()}addCallback(t,s){s&&(this.callbacks.has(t)||this.callbacks.set(t,(()=>{this.callbacks.delete(t)}))),t(this.value)}clearCallbacks(){this.callbacks.clear()}}export{t as ValueNotifier};
//# sourceMappingURL=value-notifier.js.map
