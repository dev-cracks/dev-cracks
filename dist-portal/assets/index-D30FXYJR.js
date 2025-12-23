(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function C_(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var um={exports:{}},Cl={},cm={exports:{}},Xe={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Uo=Symbol.for("react.element"),P_=Symbol.for("react.portal"),L_=Symbol.for("react.fragment"),b_=Symbol.for("react.strict_mode"),D_=Symbol.for("react.profiler"),U_=Symbol.for("react.provider"),N_=Symbol.for("react.context"),I_=Symbol.for("react.forward_ref"),F_=Symbol.for("react.suspense"),O_=Symbol.for("react.memo"),k_=Symbol.for("react.lazy"),Ad=Symbol.iterator;function B_(t){return t===null||typeof t!="object"?null:(t=Ad&&t[Ad]||t["@@iterator"],typeof t=="function"?t:null)}var fm={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},dm=Object.assign,hm={};function Cs(t,e,n){this.props=t,this.context=e,this.refs=hm,this.updater=n||fm}Cs.prototype.isReactComponent={};Cs.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Cs.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function pm(){}pm.prototype=Cs.prototype;function hf(t,e,n){this.props=t,this.context=e,this.refs=hm,this.updater=n||fm}var pf=hf.prototype=new pm;pf.constructor=hf;dm(pf,Cs.prototype);pf.isPureReactComponent=!0;var Rd=Array.isArray,mm=Object.prototype.hasOwnProperty,mf={current:null},gm={key:!0,ref:!0,__self:!0,__source:!0};function vm(t,e,n){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)mm.call(e,i)&&!gm.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var l=Array(a),u=0;u<a;u++)l[u]=arguments[u+2];r.children=l}if(t&&t.defaultProps)for(i in a=t.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:Uo,type:t,key:s,ref:o,props:r,_owner:mf.current}}function z_(t,e){return{$$typeof:Uo,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function gf(t){return typeof t=="object"&&t!==null&&t.$$typeof===Uo}function H_(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Cd=/\/+/g;function nu(t,e){return typeof t=="object"&&t!==null&&t.key!=null?H_(""+t.key):e.toString(36)}function Na(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case Uo:case P_:o=!0}}if(o)return o=t,r=r(o),t=i===""?"."+nu(o,0):i,Rd(r)?(n="",t!=null&&(n=t.replace(Cd,"$&/")+"/"),Na(r,e,n,"",function(u){return u})):r!=null&&(gf(r)&&(r=z_(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(Cd,"$&/")+"/")+t)),e.push(r)),1;if(o=0,i=i===""?".":i+":",Rd(t))for(var a=0;a<t.length;a++){s=t[a];var l=i+nu(s,a);o+=Na(s,e,n,l,r)}else if(l=B_(t),typeof l=="function")for(t=l.call(t),a=0;!(s=t.next()).done;)s=s.value,l=i+nu(s,a++),o+=Na(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function jo(t,e,n){if(t==null)return t;var i=[],r=0;return Na(t,i,"","",function(s){return e.call(n,s,r++)}),i}function G_(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var qt={current:null},Ia={transition:null},V_={ReactCurrentDispatcher:qt,ReactCurrentBatchConfig:Ia,ReactCurrentOwner:mf};function _m(){throw Error("act(...) is not supported in production builds of React.")}Xe.Children={map:jo,forEach:function(t,e,n){jo(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return jo(t,function(){e++}),e},toArray:function(t){return jo(t,function(e){return e})||[]},only:function(t){if(!gf(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Xe.Component=Cs;Xe.Fragment=L_;Xe.Profiler=D_;Xe.PureComponent=hf;Xe.StrictMode=b_;Xe.Suspense=F_;Xe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=V_;Xe.act=_m;Xe.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=dm({},t.props),r=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=mf.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(l in e)mm.call(e,l)&&!gm.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){a=Array(l);for(var u=0;u<l;u++)a[u]=arguments[u+2];i.children=a}return{$$typeof:Uo,type:t.type,key:r,ref:s,props:i,_owner:o}};Xe.createContext=function(t){return t={$$typeof:N_,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:U_,_context:t},t.Consumer=t};Xe.createElement=vm;Xe.createFactory=function(t){var e=vm.bind(null,t);return e.type=t,e};Xe.createRef=function(){return{current:null}};Xe.forwardRef=function(t){return{$$typeof:I_,render:t}};Xe.isValidElement=gf;Xe.lazy=function(t){return{$$typeof:k_,_payload:{_status:-1,_result:t},_init:G_}};Xe.memo=function(t,e){return{$$typeof:O_,type:t,compare:e===void 0?null:e}};Xe.startTransition=function(t){var e=Ia.transition;Ia.transition={};try{t()}finally{Ia.transition=e}};Xe.unstable_act=_m;Xe.useCallback=function(t,e){return qt.current.useCallback(t,e)};Xe.useContext=function(t){return qt.current.useContext(t)};Xe.useDebugValue=function(){};Xe.useDeferredValue=function(t){return qt.current.useDeferredValue(t)};Xe.useEffect=function(t,e){return qt.current.useEffect(t,e)};Xe.useId=function(){return qt.current.useId()};Xe.useImperativeHandle=function(t,e,n){return qt.current.useImperativeHandle(t,e,n)};Xe.useInsertionEffect=function(t,e){return qt.current.useInsertionEffect(t,e)};Xe.useLayoutEffect=function(t,e){return qt.current.useLayoutEffect(t,e)};Xe.useMemo=function(t,e){return qt.current.useMemo(t,e)};Xe.useReducer=function(t,e,n){return qt.current.useReducer(t,e,n)};Xe.useRef=function(t){return qt.current.useRef(t)};Xe.useState=function(t){return qt.current.useState(t)};Xe.useSyncExternalStore=function(t,e,n){return qt.current.useSyncExternalStore(t,e,n)};Xe.useTransition=function(){return qt.current.useTransition()};Xe.version="18.3.1";cm.exports=Xe;var I=cm.exports;const W_=C_(I);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var X_=I,Y_=Symbol.for("react.element"),j_=Symbol.for("react.fragment"),$_=Object.prototype.hasOwnProperty,q_=X_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,K_={key:!0,ref:!0,__self:!0,__source:!0};function xm(t,e,n){var i,r={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)$_.call(e,i)&&!K_.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:Y_,type:t,key:s,ref:o,props:r,_owner:q_.current}}Cl.Fragment=j_;Cl.jsx=xm;Cl.jsxs=xm;um.exports=Cl;var li=um.exports,oc={},ym={exports:{}},pn={},Sm={exports:{}},Em={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(b,N){var H=b.length;b.push(N);e:for(;0<H;){var K=H-1>>>1,Z=b[K];if(0<r(Z,N))b[K]=N,b[H]=Z,H=K;else break e}}function n(b){return b.length===0?null:b[0]}function i(b){if(b.length===0)return null;var N=b[0],H=b.pop();if(H!==N){b[0]=H;e:for(var K=0,Z=b.length,X=Z>>>1;K<X;){var Q=2*(K+1)-1,le=b[Q],me=Q+1,re=b[me];if(0>r(le,H))me<Z&&0>r(re,le)?(b[K]=re,b[me]=H,K=me):(b[K]=le,b[Q]=H,K=Q);else if(me<Z&&0>r(re,H))b[K]=re,b[me]=H,K=me;else break e}}return N}function r(b,N){var H=b.sortIndex-N.sortIndex;return H!==0?H:b.id-N.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();t.unstable_now=function(){return o.now()-a}}var l=[],u=[],f=1,d=null,h=3,m=!1,_=!1,x=!1,p=typeof setTimeout=="function"?setTimeout:null,c=typeof clearTimeout=="function"?clearTimeout:null,v=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function g(b){for(var N=n(u);N!==null;){if(N.callback===null)i(u);else if(N.startTime<=b)i(u),N.sortIndex=N.expirationTime,e(l,N);else break;N=n(u)}}function y(b){if(x=!1,g(b),!_)if(n(l)!==null)_=!0,Y(C);else{var N=n(u);N!==null&&$(y,N.startTime-b)}}function C(b,N){_=!1,x&&(x=!1,c(U),U=-1),m=!0;var H=h;try{for(g(N),d=n(l);d!==null&&(!(d.expirationTime>N)||b&&!W());){var K=d.callback;if(typeof K=="function"){d.callback=null,h=d.priorityLevel;var Z=K(d.expirationTime<=N);N=t.unstable_now(),typeof Z=="function"?d.callback=Z:d===n(l)&&i(l),g(N)}else i(l);d=n(l)}if(d!==null)var X=!0;else{var Q=n(u);Q!==null&&$(y,Q.startTime-N),X=!1}return X}finally{d=null,h=H,m=!1}}var R=!1,A=null,U=-1,E=5,T=-1;function W(){return!(t.unstable_now()-T<E)}function j(){if(A!==null){var b=t.unstable_now();T=b;var N=!0;try{N=A(!0,b)}finally{N?ie():(R=!1,A=null)}}else R=!1}var ie;if(typeof v=="function")ie=function(){v(j)};else if(typeof MessageChannel<"u"){var L=new MessageChannel,z=L.port2;L.port1.onmessage=j,ie=function(){z.postMessage(null)}}else ie=function(){p(j,0)};function Y(b){A=b,R||(R=!0,ie())}function $(b,N){U=p(function(){b(t.unstable_now())},N)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(b){b.callback=null},t.unstable_continueExecution=function(){_||m||(_=!0,Y(C))},t.unstable_forceFrameRate=function(b){0>b||125<b?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):E=0<b?Math.floor(1e3/b):5},t.unstable_getCurrentPriorityLevel=function(){return h},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(b){switch(h){case 1:case 2:case 3:var N=3;break;default:N=h}var H=h;h=N;try{return b()}finally{h=H}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(b,N){switch(b){case 1:case 2:case 3:case 4:case 5:break;default:b=3}var H=h;h=b;try{return N()}finally{h=H}},t.unstable_scheduleCallback=function(b,N,H){var K=t.unstable_now();switch(typeof H=="object"&&H!==null?(H=H.delay,H=typeof H=="number"&&0<H?K+H:K):H=K,b){case 1:var Z=-1;break;case 2:Z=250;break;case 5:Z=1073741823;break;case 4:Z=1e4;break;default:Z=5e3}return Z=H+Z,b={id:f++,callback:N,priorityLevel:b,startTime:H,expirationTime:Z,sortIndex:-1},H>K?(b.sortIndex=H,e(u,b),n(l)===null&&b===n(u)&&(x?(c(U),U=-1):x=!0,$(y,H-K))):(b.sortIndex=Z,e(l,b),_||m||(_=!0,Y(C))),b},t.unstable_shouldYield=W,t.unstable_wrapCallback=function(b){var N=h;return function(){var H=h;h=N;try{return b.apply(this,arguments)}finally{h=H}}}})(Em);Sm.exports=Em;var Q_=Sm.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Z_=I,hn=Q_;function te(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Mm=new Set,ho={};function Rr(t,e){gs(t,e),gs(t+"Capture",e)}function gs(t,e){for(ho[t]=e,t=0;t<e.length;t++)Mm.add(e[t])}var vi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ac=Object.prototype.hasOwnProperty,J_=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Pd={},Ld={};function e0(t){return ac.call(Ld,t)?!0:ac.call(Pd,t)?!1:J_.test(t)?Ld[t]=!0:(Pd[t]=!0,!1)}function t0(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function n0(t,e,n,i){if(e===null||typeof e>"u"||t0(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function Kt(t,e,n,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var Ut={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Ut[t]=new Kt(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Ut[e]=new Kt(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Ut[t]=new Kt(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Ut[t]=new Kt(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Ut[t]=new Kt(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Ut[t]=new Kt(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Ut[t]=new Kt(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Ut[t]=new Kt(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Ut[t]=new Kt(t,5,!1,t.toLowerCase(),null,!1,!1)});var vf=/[\-:]([a-z])/g;function _f(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(vf,_f);Ut[e]=new Kt(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(vf,_f);Ut[e]=new Kt(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(vf,_f);Ut[e]=new Kt(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Ut[t]=new Kt(t,1,!1,t.toLowerCase(),null,!1,!1)});Ut.xlinkHref=new Kt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Ut[t]=new Kt(t,1,!1,t.toLowerCase(),null,!0,!0)});function xf(t,e,n,i){var r=Ut.hasOwnProperty(e)?Ut[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(n0(e,n,r,i)&&(n=null),i||r===null?e0(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Mi=Z_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,$o=Symbol.for("react.element"),$r=Symbol.for("react.portal"),qr=Symbol.for("react.fragment"),yf=Symbol.for("react.strict_mode"),lc=Symbol.for("react.profiler"),Tm=Symbol.for("react.provider"),wm=Symbol.for("react.context"),Sf=Symbol.for("react.forward_ref"),uc=Symbol.for("react.suspense"),cc=Symbol.for("react.suspense_list"),Ef=Symbol.for("react.memo"),bi=Symbol.for("react.lazy"),Am=Symbol.for("react.offscreen"),bd=Symbol.iterator;function Os(t){return t===null||typeof t!="object"?null:(t=bd&&t[bd]||t["@@iterator"],typeof t=="function"?t:null)}var ft=Object.assign,iu;function Ks(t){if(iu===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);iu=e&&e[1]||""}return`
`+iu+t}var ru=!1;function su(t,e){if(!t||ru)return"";ru=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(u){var i=u}Reflect.construct(t,[],e)}else{try{e.call()}catch(u){i=u}t.call(e.prototype)}else{try{throw Error()}catch(u){i=u}t()}}catch(u){if(u&&i&&typeof u.stack=="string"){for(var r=u.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=a);break}}}finally{ru=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Ks(t):""}function i0(t){switch(t.tag){case 5:return Ks(t.type);case 16:return Ks("Lazy");case 13:return Ks("Suspense");case 19:return Ks("SuspenseList");case 0:case 2:case 15:return t=su(t.type,!1),t;case 11:return t=su(t.type.render,!1),t;case 1:return t=su(t.type,!0),t;default:return""}}function fc(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case qr:return"Fragment";case $r:return"Portal";case lc:return"Profiler";case yf:return"StrictMode";case uc:return"Suspense";case cc:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case wm:return(t.displayName||"Context")+".Consumer";case Tm:return(t._context.displayName||"Context")+".Provider";case Sf:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Ef:return e=t.displayName||null,e!==null?e:fc(t.type)||"Memo";case bi:e=t._payload,t=t._init;try{return fc(t(e))}catch{}}return null}function r0(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return fc(e);case 8:return e===yf?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function qi(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Rm(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function s0(t){var e=Rm(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function qo(t){t._valueTracker||(t._valueTracker=s0(t))}function Cm(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=Rm(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function qa(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function dc(t,e){var n=e.checked;return ft({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Dd(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=qi(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Pm(t,e){e=e.checked,e!=null&&xf(t,"checked",e,!1)}function hc(t,e){Pm(t,e);var n=qi(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?pc(t,e.type,n):e.hasOwnProperty("defaultValue")&&pc(t,e.type,qi(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Ud(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function pc(t,e,n){(e!=="number"||qa(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Qs=Array.isArray;function ls(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+qi(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function mc(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(te(91));return ft({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Nd(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(te(92));if(Qs(n)){if(1<n.length)throw Error(te(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:qi(n)}}function Lm(t,e){var n=qi(e.value),i=qi(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function Id(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function bm(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function gc(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?bm(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Ko,Dm=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Ko=Ko||document.createElement("div"),Ko.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Ko.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function po(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var eo={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},o0=["Webkit","ms","Moz","O"];Object.keys(eo).forEach(function(t){o0.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),eo[e]=eo[t]})});function Um(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||eo.hasOwnProperty(t)&&eo[t]?(""+e).trim():e+"px"}function Nm(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=Um(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var a0=ft({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function vc(t,e){if(e){if(a0[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(te(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(te(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(te(61))}if(e.style!=null&&typeof e.style!="object")throw Error(te(62))}}function _c(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var xc=null;function Mf(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var yc=null,us=null,cs=null;function Fd(t){if(t=Fo(t)){if(typeof yc!="function")throw Error(te(280));var e=t.stateNode;e&&(e=Ul(e),yc(t.stateNode,t.type,e))}}function Im(t){us?cs?cs.push(t):cs=[t]:us=t}function Fm(){if(us){var t=us,e=cs;if(cs=us=null,Fd(t),e)for(t=0;t<e.length;t++)Fd(e[t])}}function Om(t,e){return t(e)}function km(){}var ou=!1;function Bm(t,e,n){if(ou)return t(e,n);ou=!0;try{return Om(t,e,n)}finally{ou=!1,(us!==null||cs!==null)&&(km(),Fm())}}function mo(t,e){var n=t.stateNode;if(n===null)return null;var i=Ul(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(te(231,e,typeof n));return n}var Sc=!1;if(vi)try{var ks={};Object.defineProperty(ks,"passive",{get:function(){Sc=!0}}),window.addEventListener("test",ks,ks),window.removeEventListener("test",ks,ks)}catch{Sc=!1}function l0(t,e,n,i,r,s,o,a,l){var u=Array.prototype.slice.call(arguments,3);try{e.apply(n,u)}catch(f){this.onError(f)}}var to=!1,Ka=null,Qa=!1,Ec=null,u0={onError:function(t){to=!0,Ka=t}};function c0(t,e,n,i,r,s,o,a,l){to=!1,Ka=null,l0.apply(u0,arguments)}function f0(t,e,n,i,r,s,o,a,l){if(c0.apply(this,arguments),to){if(to){var u=Ka;to=!1,Ka=null}else throw Error(te(198));Qa||(Qa=!0,Ec=u)}}function Cr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function zm(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Od(t){if(Cr(t)!==t)throw Error(te(188))}function d0(t){var e=t.alternate;if(!e){if(e=Cr(t),e===null)throw Error(te(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return Od(r),t;if(s===i)return Od(r),e;s=s.sibling}throw Error(te(188))}if(n.return!==i.return)n=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===n){o=!0,n=r,i=s;break}if(a===i){o=!0,i=r,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,i=r;break}if(a===i){o=!0,i=s,n=r;break}a=a.sibling}if(!o)throw Error(te(189))}}if(n.alternate!==i)throw Error(te(190))}if(n.tag!==3)throw Error(te(188));return n.stateNode.current===n?t:e}function Hm(t){return t=d0(t),t!==null?Gm(t):null}function Gm(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=Gm(t);if(e!==null)return e;t=t.sibling}return null}var Vm=hn.unstable_scheduleCallback,kd=hn.unstable_cancelCallback,h0=hn.unstable_shouldYield,p0=hn.unstable_requestPaint,mt=hn.unstable_now,m0=hn.unstable_getCurrentPriorityLevel,Tf=hn.unstable_ImmediatePriority,Wm=hn.unstable_UserBlockingPriority,Za=hn.unstable_NormalPriority,g0=hn.unstable_LowPriority,Xm=hn.unstable_IdlePriority,Pl=null,qn=null;function v0(t){if(qn&&typeof qn.onCommitFiberRoot=="function")try{qn.onCommitFiberRoot(Pl,t,void 0,(t.current.flags&128)===128)}catch{}}var kn=Math.clz32?Math.clz32:y0,_0=Math.log,x0=Math.LN2;function y0(t){return t>>>=0,t===0?32:31-(_0(t)/x0|0)|0}var Qo=64,Zo=4194304;function Zs(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Ja(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var a=o&~r;a!==0?i=Zs(a):(s&=o,s!==0&&(i=Zs(s)))}else o=n&~r,o!==0?i=Zs(o):s!==0&&(i=Zs(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-kn(e),r=1<<n,i|=t[n],e&=~r;return i}function S0(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function E0(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-kn(s),a=1<<o,l=r[o];l===-1?(!(a&n)||a&i)&&(r[o]=S0(a,e)):l<=e&&(t.expiredLanes|=a),s&=~a}}function Mc(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Ym(){var t=Qo;return Qo<<=1,!(Qo&4194240)&&(Qo=64),t}function au(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function No(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-kn(e),t[e]=n}function M0(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-kn(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function wf(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-kn(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var Ke=0;function jm(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var $m,Af,qm,Km,Qm,Tc=!1,Jo=[],Bi=null,zi=null,Hi=null,go=new Map,vo=new Map,Ui=[],T0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Bd(t,e){switch(t){case"focusin":case"focusout":Bi=null;break;case"dragenter":case"dragleave":zi=null;break;case"mouseover":case"mouseout":Hi=null;break;case"pointerover":case"pointerout":go.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":vo.delete(e.pointerId)}}function Bs(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=Fo(e),e!==null&&Af(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function w0(t,e,n,i,r){switch(e){case"focusin":return Bi=Bs(Bi,t,e,n,i,r),!0;case"dragenter":return zi=Bs(zi,t,e,n,i,r),!0;case"mouseover":return Hi=Bs(Hi,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return go.set(s,Bs(go.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,vo.set(s,Bs(vo.get(s)||null,t,e,n,i,r)),!0}return!1}function Zm(t){var e=pr(t.target);if(e!==null){var n=Cr(e);if(n!==null){if(e=n.tag,e===13){if(e=zm(n),e!==null){t.blockedOn=e,Qm(t.priority,function(){qm(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Fa(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=wc(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);xc=i,n.target.dispatchEvent(i),xc=null}else return e=Fo(n),e!==null&&Af(e),t.blockedOn=n,!1;e.shift()}return!0}function zd(t,e,n){Fa(t)&&n.delete(e)}function A0(){Tc=!1,Bi!==null&&Fa(Bi)&&(Bi=null),zi!==null&&Fa(zi)&&(zi=null),Hi!==null&&Fa(Hi)&&(Hi=null),go.forEach(zd),vo.forEach(zd)}function zs(t,e){t.blockedOn===e&&(t.blockedOn=null,Tc||(Tc=!0,hn.unstable_scheduleCallback(hn.unstable_NormalPriority,A0)))}function _o(t){function e(r){return zs(r,t)}if(0<Jo.length){zs(Jo[0],t);for(var n=1;n<Jo.length;n++){var i=Jo[n];i.blockedOn===t&&(i.blockedOn=null)}}for(Bi!==null&&zs(Bi,t),zi!==null&&zs(zi,t),Hi!==null&&zs(Hi,t),go.forEach(e),vo.forEach(e),n=0;n<Ui.length;n++)i=Ui[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<Ui.length&&(n=Ui[0],n.blockedOn===null);)Zm(n),n.blockedOn===null&&Ui.shift()}var fs=Mi.ReactCurrentBatchConfig,el=!0;function R0(t,e,n,i){var r=Ke,s=fs.transition;fs.transition=null;try{Ke=1,Rf(t,e,n,i)}finally{Ke=r,fs.transition=s}}function C0(t,e,n,i){var r=Ke,s=fs.transition;fs.transition=null;try{Ke=4,Rf(t,e,n,i)}finally{Ke=r,fs.transition=s}}function Rf(t,e,n,i){if(el){var r=wc(t,e,n,i);if(r===null)vu(t,e,i,tl,n),Bd(t,i);else if(w0(r,t,e,n,i))i.stopPropagation();else if(Bd(t,i),e&4&&-1<T0.indexOf(t)){for(;r!==null;){var s=Fo(r);if(s!==null&&$m(s),s=wc(t,e,n,i),s===null&&vu(t,e,i,tl,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else vu(t,e,i,null,n)}}var tl=null;function wc(t,e,n,i){if(tl=null,t=Mf(i),t=pr(t),t!==null)if(e=Cr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=zm(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return tl=t,null}function Jm(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(m0()){case Tf:return 1;case Wm:return 4;case Za:case g0:return 16;case Xm:return 536870912;default:return 16}default:return 16}}var Ii=null,Cf=null,Oa=null;function eg(){if(Oa)return Oa;var t,e=Cf,n=e.length,i,r="value"in Ii?Ii.value:Ii.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(i=1;i<=o&&e[n-i]===r[s-i];i++);return Oa=r.slice(t,1<i?1-i:void 0)}function ka(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function ea(){return!0}function Hd(){return!1}function mn(t){function e(n,i,r,s,o){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?ea:Hd,this.isPropagationStopped=Hd,this}return ft(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ea)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ea)},persist:function(){},isPersistent:ea}),e}var Ps={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Pf=mn(Ps),Io=ft({},Ps,{view:0,detail:0}),P0=mn(Io),lu,uu,Hs,Ll=ft({},Io,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Lf,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Hs&&(Hs&&t.type==="mousemove"?(lu=t.screenX-Hs.screenX,uu=t.screenY-Hs.screenY):uu=lu=0,Hs=t),lu)},movementY:function(t){return"movementY"in t?t.movementY:uu}}),Gd=mn(Ll),L0=ft({},Ll,{dataTransfer:0}),b0=mn(L0),D0=ft({},Io,{relatedTarget:0}),cu=mn(D0),U0=ft({},Ps,{animationName:0,elapsedTime:0,pseudoElement:0}),N0=mn(U0),I0=ft({},Ps,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),F0=mn(I0),O0=ft({},Ps,{data:0}),Vd=mn(O0),k0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},B0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},z0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function H0(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=z0[t])?!!e[t]:!1}function Lf(){return H0}var G0=ft({},Io,{key:function(t){if(t.key){var e=k0[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=ka(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?B0[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Lf,charCode:function(t){return t.type==="keypress"?ka(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?ka(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),V0=mn(G0),W0=ft({},Ll,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Wd=mn(W0),X0=ft({},Io,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Lf}),Y0=mn(X0),j0=ft({},Ps,{propertyName:0,elapsedTime:0,pseudoElement:0}),$0=mn(j0),q0=ft({},Ll,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),K0=mn(q0),Q0=[9,13,27,32],bf=vi&&"CompositionEvent"in window,no=null;vi&&"documentMode"in document&&(no=document.documentMode);var Z0=vi&&"TextEvent"in window&&!no,tg=vi&&(!bf||no&&8<no&&11>=no),Xd=" ",Yd=!1;function ng(t,e){switch(t){case"keyup":return Q0.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ig(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Kr=!1;function J0(t,e){switch(t){case"compositionend":return ig(e);case"keypress":return e.which!==32?null:(Yd=!0,Xd);case"textInput":return t=e.data,t===Xd&&Yd?null:t;default:return null}}function ex(t,e){if(Kr)return t==="compositionend"||!bf&&ng(t,e)?(t=eg(),Oa=Cf=Ii=null,Kr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return tg&&e.locale!=="ko"?null:e.data;default:return null}}var tx={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function jd(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!tx[t.type]:e==="textarea"}function rg(t,e,n,i){Im(i),e=nl(e,"onChange"),0<e.length&&(n=new Pf("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var io=null,xo=null;function nx(t){mg(t,0)}function bl(t){var e=Jr(t);if(Cm(e))return t}function ix(t,e){if(t==="change")return e}var sg=!1;if(vi){var fu;if(vi){var du="oninput"in document;if(!du){var $d=document.createElement("div");$d.setAttribute("oninput","return;"),du=typeof $d.oninput=="function"}fu=du}else fu=!1;sg=fu&&(!document.documentMode||9<document.documentMode)}function qd(){io&&(io.detachEvent("onpropertychange",og),xo=io=null)}function og(t){if(t.propertyName==="value"&&bl(xo)){var e=[];rg(e,xo,t,Mf(t)),Bm(nx,e)}}function rx(t,e,n){t==="focusin"?(qd(),io=e,xo=n,io.attachEvent("onpropertychange",og)):t==="focusout"&&qd()}function sx(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return bl(xo)}function ox(t,e){if(t==="click")return bl(e)}function ax(t,e){if(t==="input"||t==="change")return bl(e)}function lx(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Hn=typeof Object.is=="function"?Object.is:lx;function yo(t,e){if(Hn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!ac.call(e,r)||!Hn(t[r],e[r]))return!1}return!0}function Kd(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Qd(t,e){var n=Kd(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Kd(n)}}function ag(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?ag(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function lg(){for(var t=window,e=qa();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=qa(t.document)}return e}function Df(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function ux(t){var e=lg(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&ag(n.ownerDocument.documentElement,n)){if(i!==null&&Df(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=Qd(n,s);var o=Qd(n,i);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var cx=vi&&"documentMode"in document&&11>=document.documentMode,Qr=null,Ac=null,ro=null,Rc=!1;function Zd(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Rc||Qr==null||Qr!==qa(i)||(i=Qr,"selectionStart"in i&&Df(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),ro&&yo(ro,i)||(ro=i,i=nl(Ac,"onSelect"),0<i.length&&(e=new Pf("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=Qr)))}function ta(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Zr={animationend:ta("Animation","AnimationEnd"),animationiteration:ta("Animation","AnimationIteration"),animationstart:ta("Animation","AnimationStart"),transitionend:ta("Transition","TransitionEnd")},hu={},ug={};vi&&(ug=document.createElement("div").style,"AnimationEvent"in window||(delete Zr.animationend.animation,delete Zr.animationiteration.animation,delete Zr.animationstart.animation),"TransitionEvent"in window||delete Zr.transitionend.transition);function Dl(t){if(hu[t])return hu[t];if(!Zr[t])return t;var e=Zr[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in ug)return hu[t]=e[n];return t}var cg=Dl("animationend"),fg=Dl("animationiteration"),dg=Dl("animationstart"),hg=Dl("transitionend"),pg=new Map,Jd="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Zi(t,e){pg.set(t,e),Rr(e,[t])}for(var pu=0;pu<Jd.length;pu++){var mu=Jd[pu],fx=mu.toLowerCase(),dx=mu[0].toUpperCase()+mu.slice(1);Zi(fx,"on"+dx)}Zi(cg,"onAnimationEnd");Zi(fg,"onAnimationIteration");Zi(dg,"onAnimationStart");Zi("dblclick","onDoubleClick");Zi("focusin","onFocus");Zi("focusout","onBlur");Zi(hg,"onTransitionEnd");gs("onMouseEnter",["mouseout","mouseover"]);gs("onMouseLeave",["mouseout","mouseover"]);gs("onPointerEnter",["pointerout","pointerover"]);gs("onPointerLeave",["pointerout","pointerover"]);Rr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Rr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Rr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Rr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Rr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Rr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Js="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),hx=new Set("cancel close invalid load scroll toggle".split(" ").concat(Js));function eh(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,f0(i,e,void 0,t),t.currentTarget=null}function mg(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,u=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;eh(r,a,u),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,u=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;eh(r,a,u),s=l}}}if(Qa)throw t=Ec,Qa=!1,Ec=null,t}function it(t,e){var n=e[Dc];n===void 0&&(n=e[Dc]=new Set);var i=t+"__bubble";n.has(i)||(gg(e,t,2,!1),n.add(i))}function gu(t,e,n){var i=0;e&&(i|=4),gg(n,t,i,e)}var na="_reactListening"+Math.random().toString(36).slice(2);function So(t){if(!t[na]){t[na]=!0,Mm.forEach(function(n){n!=="selectionchange"&&(hx.has(n)||gu(n,!1,t),gu(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[na]||(e[na]=!0,gu("selectionchange",!1,e))}}function gg(t,e,n,i){switch(Jm(e)){case 1:var r=R0;break;case 4:r=C0;break;default:r=Rf}n=r.bind(null,e,n,t),r=void 0,!Sc||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function vu(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=pr(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}Bm(function(){var u=s,f=Mf(n),d=[];e:{var h=pg.get(t);if(h!==void 0){var m=Pf,_=t;switch(t){case"keypress":if(ka(n)===0)break e;case"keydown":case"keyup":m=V0;break;case"focusin":_="focus",m=cu;break;case"focusout":_="blur",m=cu;break;case"beforeblur":case"afterblur":m=cu;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":m=Gd;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":m=b0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":m=Y0;break;case cg:case fg:case dg:m=N0;break;case hg:m=$0;break;case"scroll":m=P0;break;case"wheel":m=K0;break;case"copy":case"cut":case"paste":m=F0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":m=Wd}var x=(e&4)!==0,p=!x&&t==="scroll",c=x?h!==null?h+"Capture":null:h;x=[];for(var v=u,g;v!==null;){g=v;var y=g.stateNode;if(g.tag===5&&y!==null&&(g=y,c!==null&&(y=mo(v,c),y!=null&&x.push(Eo(v,y,g)))),p)break;v=v.return}0<x.length&&(h=new m(h,_,null,n,f),d.push({event:h,listeners:x}))}}if(!(e&7)){e:{if(h=t==="mouseover"||t==="pointerover",m=t==="mouseout"||t==="pointerout",h&&n!==xc&&(_=n.relatedTarget||n.fromElement)&&(pr(_)||_[_i]))break e;if((m||h)&&(h=f.window===f?f:(h=f.ownerDocument)?h.defaultView||h.parentWindow:window,m?(_=n.relatedTarget||n.toElement,m=u,_=_?pr(_):null,_!==null&&(p=Cr(_),_!==p||_.tag!==5&&_.tag!==6)&&(_=null)):(m=null,_=u),m!==_)){if(x=Gd,y="onMouseLeave",c="onMouseEnter",v="mouse",(t==="pointerout"||t==="pointerover")&&(x=Wd,y="onPointerLeave",c="onPointerEnter",v="pointer"),p=m==null?h:Jr(m),g=_==null?h:Jr(_),h=new x(y,v+"leave",m,n,f),h.target=p,h.relatedTarget=g,y=null,pr(f)===u&&(x=new x(c,v+"enter",_,n,f),x.target=g,x.relatedTarget=p,y=x),p=y,m&&_)t:{for(x=m,c=_,v=0,g=x;g;g=Lr(g))v++;for(g=0,y=c;y;y=Lr(y))g++;for(;0<v-g;)x=Lr(x),v--;for(;0<g-v;)c=Lr(c),g--;for(;v--;){if(x===c||c!==null&&x===c.alternate)break t;x=Lr(x),c=Lr(c)}x=null}else x=null;m!==null&&th(d,h,m,x,!1),_!==null&&p!==null&&th(d,p,_,x,!0)}}e:{if(h=u?Jr(u):window,m=h.nodeName&&h.nodeName.toLowerCase(),m==="select"||m==="input"&&h.type==="file")var C=ix;else if(jd(h))if(sg)C=ax;else{C=sx;var R=rx}else(m=h.nodeName)&&m.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(C=ox);if(C&&(C=C(t,u))){rg(d,C,n,f);break e}R&&R(t,h,u),t==="focusout"&&(R=h._wrapperState)&&R.controlled&&h.type==="number"&&pc(h,"number",h.value)}switch(R=u?Jr(u):window,t){case"focusin":(jd(R)||R.contentEditable==="true")&&(Qr=R,Ac=u,ro=null);break;case"focusout":ro=Ac=Qr=null;break;case"mousedown":Rc=!0;break;case"contextmenu":case"mouseup":case"dragend":Rc=!1,Zd(d,n,f);break;case"selectionchange":if(cx)break;case"keydown":case"keyup":Zd(d,n,f)}var A;if(bf)e:{switch(t){case"compositionstart":var U="onCompositionStart";break e;case"compositionend":U="onCompositionEnd";break e;case"compositionupdate":U="onCompositionUpdate";break e}U=void 0}else Kr?ng(t,n)&&(U="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(U="onCompositionStart");U&&(tg&&n.locale!=="ko"&&(Kr||U!=="onCompositionStart"?U==="onCompositionEnd"&&Kr&&(A=eg()):(Ii=f,Cf="value"in Ii?Ii.value:Ii.textContent,Kr=!0)),R=nl(u,U),0<R.length&&(U=new Vd(U,t,null,n,f),d.push({event:U,listeners:R}),A?U.data=A:(A=ig(n),A!==null&&(U.data=A)))),(A=Z0?J0(t,n):ex(t,n))&&(u=nl(u,"onBeforeInput"),0<u.length&&(f=new Vd("onBeforeInput","beforeinput",null,n,f),d.push({event:f,listeners:u}),f.data=A))}mg(d,e)})}function Eo(t,e,n){return{instance:t,listener:e,currentTarget:n}}function nl(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=mo(t,n),s!=null&&i.unshift(Eo(t,s,r)),s=mo(t,e),s!=null&&i.push(Eo(t,s,r))),t=t.return}return i}function Lr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function th(t,e,n,i,r){for(var s=e._reactName,o=[];n!==null&&n!==i;){var a=n,l=a.alternate,u=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&u!==null&&(a=u,r?(l=mo(n,s),l!=null&&o.unshift(Eo(n,l,a))):r||(l=mo(n,s),l!=null&&o.push(Eo(n,l,a)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var px=/\r\n?/g,mx=/\u0000|\uFFFD/g;function nh(t){return(typeof t=="string"?t:""+t).replace(px,`
`).replace(mx,"")}function ia(t,e,n){if(e=nh(e),nh(t)!==e&&n)throw Error(te(425))}function il(){}var Cc=null,Pc=null;function Lc(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var bc=typeof setTimeout=="function"?setTimeout:void 0,gx=typeof clearTimeout=="function"?clearTimeout:void 0,ih=typeof Promise=="function"?Promise:void 0,vx=typeof queueMicrotask=="function"?queueMicrotask:typeof ih<"u"?function(t){return ih.resolve(null).then(t).catch(_x)}:bc;function _x(t){setTimeout(function(){throw t})}function _u(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),_o(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);_o(e)}function Gi(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function rh(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Ls=Math.random().toString(36).slice(2),jn="__reactFiber$"+Ls,Mo="__reactProps$"+Ls,_i="__reactContainer$"+Ls,Dc="__reactEvents$"+Ls,xx="__reactListeners$"+Ls,yx="__reactHandles$"+Ls;function pr(t){var e=t[jn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[_i]||n[jn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=rh(t);t!==null;){if(n=t[jn])return n;t=rh(t)}return e}t=n,n=t.parentNode}return null}function Fo(t){return t=t[jn]||t[_i],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Jr(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(te(33))}function Ul(t){return t[Mo]||null}var Uc=[],es=-1;function Ji(t){return{current:t}}function st(t){0>es||(t.current=Uc[es],Uc[es]=null,es--)}function tt(t,e){es++,Uc[es]=t.current,t.current=e}var Ki={},zt=Ji(Ki),en=Ji(!1),Er=Ki;function vs(t,e){var n=t.type.contextTypes;if(!n)return Ki;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function tn(t){return t=t.childContextTypes,t!=null}function rl(){st(en),st(zt)}function sh(t,e,n){if(zt.current!==Ki)throw Error(te(168));tt(zt,e),tt(en,n)}function vg(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(te(108,r0(t)||"Unknown",r));return ft({},n,i)}function sl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Ki,Er=zt.current,tt(zt,t),tt(en,en.current),!0}function oh(t,e,n){var i=t.stateNode;if(!i)throw Error(te(169));n?(t=vg(t,e,Er),i.__reactInternalMemoizedMergedChildContext=t,st(en),st(zt),tt(zt,t)):st(en),tt(en,n)}var oi=null,Nl=!1,xu=!1;function _g(t){oi===null?oi=[t]:oi.push(t)}function Sx(t){Nl=!0,_g(t)}function er(){if(!xu&&oi!==null){xu=!0;var t=0,e=Ke;try{var n=oi;for(Ke=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}oi=null,Nl=!1}catch(r){throw oi!==null&&(oi=oi.slice(t+1)),Vm(Tf,er),r}finally{Ke=e,xu=!1}}return null}var ts=[],ns=0,ol=null,al=0,_n=[],xn=0,Mr=null,ui=1,ci="";function lr(t,e){ts[ns++]=al,ts[ns++]=ol,ol=t,al=e}function xg(t,e,n){_n[xn++]=ui,_n[xn++]=ci,_n[xn++]=Mr,Mr=t;var i=ui;t=ci;var r=32-kn(i)-1;i&=~(1<<r),n+=1;var s=32-kn(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,ui=1<<32-kn(e)+r|n<<r|i,ci=s+t}else ui=1<<s|n<<r|i,ci=t}function Uf(t){t.return!==null&&(lr(t,1),xg(t,1,0))}function Nf(t){for(;t===ol;)ol=ts[--ns],ts[ns]=null,al=ts[--ns],ts[ns]=null;for(;t===Mr;)Mr=_n[--xn],_n[xn]=null,ci=_n[--xn],_n[xn]=null,ui=_n[--xn],_n[xn]=null}var cn=null,un=null,ot=!1,Un=null;function yg(t,e){var n=En(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function ah(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,cn=t,un=Gi(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,cn=t,un=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Mr!==null?{id:ui,overflow:ci}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=En(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,cn=t,un=null,!0):!1;default:return!1}}function Nc(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Ic(t){if(ot){var e=un;if(e){var n=e;if(!ah(t,e)){if(Nc(t))throw Error(te(418));e=Gi(n.nextSibling);var i=cn;e&&ah(t,e)?yg(i,n):(t.flags=t.flags&-4097|2,ot=!1,cn=t)}}else{if(Nc(t))throw Error(te(418));t.flags=t.flags&-4097|2,ot=!1,cn=t}}}function lh(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;cn=t}function ra(t){if(t!==cn)return!1;if(!ot)return lh(t),ot=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Lc(t.type,t.memoizedProps)),e&&(e=un)){if(Nc(t))throw Sg(),Error(te(418));for(;e;)yg(t,e),e=Gi(e.nextSibling)}if(lh(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(te(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){un=Gi(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}un=null}}else un=cn?Gi(t.stateNode.nextSibling):null;return!0}function Sg(){for(var t=un;t;)t=Gi(t.nextSibling)}function _s(){un=cn=null,ot=!1}function If(t){Un===null?Un=[t]:Un.push(t)}var Ex=Mi.ReactCurrentBatchConfig;function Gs(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(te(309));var i=n.stateNode}if(!i)throw Error(te(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(te(284));if(!n._owner)throw Error(te(290,t))}return t}function sa(t,e){throw t=Object.prototype.toString.call(e),Error(te(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function uh(t){var e=t._init;return e(t._payload)}function Eg(t){function e(c,v){if(t){var g=c.deletions;g===null?(c.deletions=[v],c.flags|=16):g.push(v)}}function n(c,v){if(!t)return null;for(;v!==null;)e(c,v),v=v.sibling;return null}function i(c,v){for(c=new Map;v!==null;)v.key!==null?c.set(v.key,v):c.set(v.index,v),v=v.sibling;return c}function r(c,v){return c=Yi(c,v),c.index=0,c.sibling=null,c}function s(c,v,g){return c.index=g,t?(g=c.alternate,g!==null?(g=g.index,g<v?(c.flags|=2,v):g):(c.flags|=2,v)):(c.flags|=1048576,v)}function o(c){return t&&c.alternate===null&&(c.flags|=2),c}function a(c,v,g,y){return v===null||v.tag!==6?(v=Au(g,c.mode,y),v.return=c,v):(v=r(v,g),v.return=c,v)}function l(c,v,g,y){var C=g.type;return C===qr?f(c,v,g.props.children,y,g.key):v!==null&&(v.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===bi&&uh(C)===v.type)?(y=r(v,g.props),y.ref=Gs(c,v,g),y.return=c,y):(y=Xa(g.type,g.key,g.props,null,c.mode,y),y.ref=Gs(c,v,g),y.return=c,y)}function u(c,v,g,y){return v===null||v.tag!==4||v.stateNode.containerInfo!==g.containerInfo||v.stateNode.implementation!==g.implementation?(v=Ru(g,c.mode,y),v.return=c,v):(v=r(v,g.children||[]),v.return=c,v)}function f(c,v,g,y,C){return v===null||v.tag!==7?(v=_r(g,c.mode,y,C),v.return=c,v):(v=r(v,g),v.return=c,v)}function d(c,v,g){if(typeof v=="string"&&v!==""||typeof v=="number")return v=Au(""+v,c.mode,g),v.return=c,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case $o:return g=Xa(v.type,v.key,v.props,null,c.mode,g),g.ref=Gs(c,null,v),g.return=c,g;case $r:return v=Ru(v,c.mode,g),v.return=c,v;case bi:var y=v._init;return d(c,y(v._payload),g)}if(Qs(v)||Os(v))return v=_r(v,c.mode,g,null),v.return=c,v;sa(c,v)}return null}function h(c,v,g,y){var C=v!==null?v.key:null;if(typeof g=="string"&&g!==""||typeof g=="number")return C!==null?null:a(c,v,""+g,y);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case $o:return g.key===C?l(c,v,g,y):null;case $r:return g.key===C?u(c,v,g,y):null;case bi:return C=g._init,h(c,v,C(g._payload),y)}if(Qs(g)||Os(g))return C!==null?null:f(c,v,g,y,null);sa(c,g)}return null}function m(c,v,g,y,C){if(typeof y=="string"&&y!==""||typeof y=="number")return c=c.get(g)||null,a(v,c,""+y,C);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case $o:return c=c.get(y.key===null?g:y.key)||null,l(v,c,y,C);case $r:return c=c.get(y.key===null?g:y.key)||null,u(v,c,y,C);case bi:var R=y._init;return m(c,v,g,R(y._payload),C)}if(Qs(y)||Os(y))return c=c.get(g)||null,f(v,c,y,C,null);sa(v,y)}return null}function _(c,v,g,y){for(var C=null,R=null,A=v,U=v=0,E=null;A!==null&&U<g.length;U++){A.index>U?(E=A,A=null):E=A.sibling;var T=h(c,A,g[U],y);if(T===null){A===null&&(A=E);break}t&&A&&T.alternate===null&&e(c,A),v=s(T,v,U),R===null?C=T:R.sibling=T,R=T,A=E}if(U===g.length)return n(c,A),ot&&lr(c,U),C;if(A===null){for(;U<g.length;U++)A=d(c,g[U],y),A!==null&&(v=s(A,v,U),R===null?C=A:R.sibling=A,R=A);return ot&&lr(c,U),C}for(A=i(c,A);U<g.length;U++)E=m(A,c,U,g[U],y),E!==null&&(t&&E.alternate!==null&&A.delete(E.key===null?U:E.key),v=s(E,v,U),R===null?C=E:R.sibling=E,R=E);return t&&A.forEach(function(W){return e(c,W)}),ot&&lr(c,U),C}function x(c,v,g,y){var C=Os(g);if(typeof C!="function")throw Error(te(150));if(g=C.call(g),g==null)throw Error(te(151));for(var R=C=null,A=v,U=v=0,E=null,T=g.next();A!==null&&!T.done;U++,T=g.next()){A.index>U?(E=A,A=null):E=A.sibling;var W=h(c,A,T.value,y);if(W===null){A===null&&(A=E);break}t&&A&&W.alternate===null&&e(c,A),v=s(W,v,U),R===null?C=W:R.sibling=W,R=W,A=E}if(T.done)return n(c,A),ot&&lr(c,U),C;if(A===null){for(;!T.done;U++,T=g.next())T=d(c,T.value,y),T!==null&&(v=s(T,v,U),R===null?C=T:R.sibling=T,R=T);return ot&&lr(c,U),C}for(A=i(c,A);!T.done;U++,T=g.next())T=m(A,c,U,T.value,y),T!==null&&(t&&T.alternate!==null&&A.delete(T.key===null?U:T.key),v=s(T,v,U),R===null?C=T:R.sibling=T,R=T);return t&&A.forEach(function(j){return e(c,j)}),ot&&lr(c,U),C}function p(c,v,g,y){if(typeof g=="object"&&g!==null&&g.type===qr&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case $o:e:{for(var C=g.key,R=v;R!==null;){if(R.key===C){if(C=g.type,C===qr){if(R.tag===7){n(c,R.sibling),v=r(R,g.props.children),v.return=c,c=v;break e}}else if(R.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===bi&&uh(C)===R.type){n(c,R.sibling),v=r(R,g.props),v.ref=Gs(c,R,g),v.return=c,c=v;break e}n(c,R);break}else e(c,R);R=R.sibling}g.type===qr?(v=_r(g.props.children,c.mode,y,g.key),v.return=c,c=v):(y=Xa(g.type,g.key,g.props,null,c.mode,y),y.ref=Gs(c,v,g),y.return=c,c=y)}return o(c);case $r:e:{for(R=g.key;v!==null;){if(v.key===R)if(v.tag===4&&v.stateNode.containerInfo===g.containerInfo&&v.stateNode.implementation===g.implementation){n(c,v.sibling),v=r(v,g.children||[]),v.return=c,c=v;break e}else{n(c,v);break}else e(c,v);v=v.sibling}v=Ru(g,c.mode,y),v.return=c,c=v}return o(c);case bi:return R=g._init,p(c,v,R(g._payload),y)}if(Qs(g))return _(c,v,g,y);if(Os(g))return x(c,v,g,y);sa(c,g)}return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,v!==null&&v.tag===6?(n(c,v.sibling),v=r(v,g),v.return=c,c=v):(n(c,v),v=Au(g,c.mode,y),v.return=c,c=v),o(c)):n(c,v)}return p}var xs=Eg(!0),Mg=Eg(!1),ll=Ji(null),ul=null,is=null,Ff=null;function Of(){Ff=is=ul=null}function kf(t){var e=ll.current;st(ll),t._currentValue=e}function Fc(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function ds(t,e){ul=t,Ff=is=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(Zt=!0),t.firstContext=null)}function Tn(t){var e=t._currentValue;if(Ff!==t)if(t={context:t,memoizedValue:e,next:null},is===null){if(ul===null)throw Error(te(308));is=t,ul.dependencies={lanes:0,firstContext:t}}else is=is.next=t;return e}var mr=null;function Bf(t){mr===null?mr=[t]:mr.push(t)}function Tg(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,Bf(e)):(n.next=r.next,r.next=n),e.interleaved=n,xi(t,i)}function xi(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Di=!1;function zf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function wg(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function di(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Vi(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,qe&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,xi(t,n)}return r=i.interleaved,r===null?(e.next=e,Bf(i)):(e.next=r.next,r.next=e),i.interleaved=e,xi(t,n)}function Ba(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,wf(t,n)}}function ch(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function cl(t,e,n,i){var r=t.updateQueue;Di=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,u=l.next;l.next=null,o===null?s=u:o.next=u,o=l;var f=t.alternate;f!==null&&(f=f.updateQueue,a=f.lastBaseUpdate,a!==o&&(a===null?f.firstBaseUpdate=u:a.next=u,f.lastBaseUpdate=l))}if(s!==null){var d=r.baseState;o=0,f=u=l=null,a=s;do{var h=a.lane,m=a.eventTime;if((i&h)===h){f!==null&&(f=f.next={eventTime:m,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var _=t,x=a;switch(h=e,m=n,x.tag){case 1:if(_=x.payload,typeof _=="function"){d=_.call(m,d,h);break e}d=_;break e;case 3:_.flags=_.flags&-65537|128;case 0:if(_=x.payload,h=typeof _=="function"?_.call(m,d,h):_,h==null)break e;d=ft({},d,h);break e;case 2:Di=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,h=r.effects,h===null?r.effects=[a]:h.push(a))}else m={eventTime:m,lane:h,tag:a.tag,payload:a.payload,callback:a.callback,next:null},f===null?(u=f=m,l=d):f=f.next=m,o|=h;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;h=a,a=h.next,h.next=null,r.lastBaseUpdate=h,r.shared.pending=null}}while(!0);if(f===null&&(l=d),r.baseState=l,r.firstBaseUpdate=u,r.lastBaseUpdate=f,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);wr|=o,t.lanes=o,t.memoizedState=d}}function fh(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(te(191,r));r.call(i)}}}var Oo={},Kn=Ji(Oo),To=Ji(Oo),wo=Ji(Oo);function gr(t){if(t===Oo)throw Error(te(174));return t}function Hf(t,e){switch(tt(wo,e),tt(To,t),tt(Kn,Oo),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:gc(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=gc(e,t)}st(Kn),tt(Kn,e)}function ys(){st(Kn),st(To),st(wo)}function Ag(t){gr(wo.current);var e=gr(Kn.current),n=gc(e,t.type);e!==n&&(tt(To,t),tt(Kn,n))}function Gf(t){To.current===t&&(st(Kn),st(To))}var lt=Ji(0);function fl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var yu=[];function Vf(){for(var t=0;t<yu.length;t++)yu[t]._workInProgressVersionPrimary=null;yu.length=0}var za=Mi.ReactCurrentDispatcher,Su=Mi.ReactCurrentBatchConfig,Tr=0,ut=null,_t=null,At=null,dl=!1,so=!1,Ao=0,Mx=0;function It(){throw Error(te(321))}function Wf(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Hn(t[n],e[n]))return!1;return!0}function Xf(t,e,n,i,r,s){if(Tr=s,ut=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,za.current=t===null||t.memoizedState===null?Rx:Cx,t=n(i,r),so){s=0;do{if(so=!1,Ao=0,25<=s)throw Error(te(301));s+=1,At=_t=null,e.updateQueue=null,za.current=Px,t=n(i,r)}while(so)}if(za.current=hl,e=_t!==null&&_t.next!==null,Tr=0,At=_t=ut=null,dl=!1,e)throw Error(te(300));return t}function Yf(){var t=Ao!==0;return Ao=0,t}function Xn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return At===null?ut.memoizedState=At=t:At=At.next=t,At}function wn(){if(_t===null){var t=ut.alternate;t=t!==null?t.memoizedState:null}else t=_t.next;var e=At===null?ut.memoizedState:At.next;if(e!==null)At=e,_t=t;else{if(t===null)throw Error(te(310));_t=t,t={memoizedState:_t.memoizedState,baseState:_t.baseState,baseQueue:_t.baseQueue,queue:_t.queue,next:null},At===null?ut.memoizedState=At=t:At=At.next=t}return At}function Ro(t,e){return typeof e=="function"?e(t):e}function Eu(t){var e=wn(),n=e.queue;if(n===null)throw Error(te(311));n.lastRenderedReducer=t;var i=_t,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,u=s;do{var f=u.lane;if((Tr&f)===f)l!==null&&(l=l.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),i=u.hasEagerState?u.eagerState:t(i,u.action);else{var d={lane:f,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};l===null?(a=l=d,o=i):l=l.next=d,ut.lanes|=f,wr|=f}u=u.next}while(u!==null&&u!==s);l===null?o=i:l.next=a,Hn(i,e.memoizedState)||(Zt=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,ut.lanes|=s,wr|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Mu(t){var e=wn(),n=e.queue;if(n===null)throw Error(te(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do s=t(s,o.action),o=o.next;while(o!==r);Hn(s,e.memoizedState)||(Zt=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function Rg(){}function Cg(t,e){var n=ut,i=wn(),r=e(),s=!Hn(i.memoizedState,r);if(s&&(i.memoizedState=r,Zt=!0),i=i.queue,jf(bg.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||At!==null&&At.memoizedState.tag&1){if(n.flags|=2048,Co(9,Lg.bind(null,n,i,r,e),void 0,null),Rt===null)throw Error(te(349));Tr&30||Pg(n,e,r)}return r}function Pg(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=ut.updateQueue,e===null?(e={lastEffect:null,stores:null},ut.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Lg(t,e,n,i){e.value=n,e.getSnapshot=i,Dg(e)&&Ug(t)}function bg(t,e,n){return n(function(){Dg(e)&&Ug(t)})}function Dg(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Hn(t,n)}catch{return!0}}function Ug(t){var e=xi(t,1);e!==null&&Bn(e,t,1,-1)}function dh(t){var e=Xn();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ro,lastRenderedState:t},e.queue=t,t=t.dispatch=Ax.bind(null,ut,t),[e.memoizedState,t]}function Co(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=ut.updateQueue,e===null?(e={lastEffect:null,stores:null},ut.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function Ng(){return wn().memoizedState}function Ha(t,e,n,i){var r=Xn();ut.flags|=t,r.memoizedState=Co(1|e,n,void 0,i===void 0?null:i)}function Il(t,e,n,i){var r=wn();i=i===void 0?null:i;var s=void 0;if(_t!==null){var o=_t.memoizedState;if(s=o.destroy,i!==null&&Wf(i,o.deps)){r.memoizedState=Co(e,n,s,i);return}}ut.flags|=t,r.memoizedState=Co(1|e,n,s,i)}function hh(t,e){return Ha(8390656,8,t,e)}function jf(t,e){return Il(2048,8,t,e)}function Ig(t,e){return Il(4,2,t,e)}function Fg(t,e){return Il(4,4,t,e)}function Og(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function kg(t,e,n){return n=n!=null?n.concat([t]):null,Il(4,4,Og.bind(null,e,t),n)}function $f(){}function Bg(t,e){var n=wn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Wf(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function zg(t,e){var n=wn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Wf(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function Hg(t,e,n){return Tr&21?(Hn(n,e)||(n=Ym(),ut.lanes|=n,wr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,Zt=!0),t.memoizedState=n)}function Tx(t,e){var n=Ke;Ke=n!==0&&4>n?n:4,t(!0);var i=Su.transition;Su.transition={};try{t(!1),e()}finally{Ke=n,Su.transition=i}}function Gg(){return wn().memoizedState}function wx(t,e,n){var i=Xi(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},Vg(t))Wg(e,n);else if(n=Tg(t,e,n,i),n!==null){var r=$t();Bn(n,t,i,r),Xg(n,e,i)}}function Ax(t,e,n){var i=Xi(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(Vg(t))Wg(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,n);if(r.hasEagerState=!0,r.eagerState=a,Hn(a,o)){var l=e.interleaved;l===null?(r.next=r,Bf(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=Tg(t,e,r,i),n!==null&&(r=$t(),Bn(n,t,i,r),Xg(n,e,i))}}function Vg(t){var e=t.alternate;return t===ut||e!==null&&e===ut}function Wg(t,e){so=dl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Xg(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,wf(t,n)}}var hl={readContext:Tn,useCallback:It,useContext:It,useEffect:It,useImperativeHandle:It,useInsertionEffect:It,useLayoutEffect:It,useMemo:It,useReducer:It,useRef:It,useState:It,useDebugValue:It,useDeferredValue:It,useTransition:It,useMutableSource:It,useSyncExternalStore:It,useId:It,unstable_isNewReconciler:!1},Rx={readContext:Tn,useCallback:function(t,e){return Xn().memoizedState=[t,e===void 0?null:e],t},useContext:Tn,useEffect:hh,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Ha(4194308,4,Og.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Ha(4194308,4,t,e)},useInsertionEffect:function(t,e){return Ha(4,2,t,e)},useMemo:function(t,e){var n=Xn();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=Xn();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=wx.bind(null,ut,t),[i.memoizedState,t]},useRef:function(t){var e=Xn();return t={current:t},e.memoizedState=t},useState:dh,useDebugValue:$f,useDeferredValue:function(t){return Xn().memoizedState=t},useTransition:function(){var t=dh(!1),e=t[0];return t=Tx.bind(null,t[1]),Xn().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=ut,r=Xn();if(ot){if(n===void 0)throw Error(te(407));n=n()}else{if(n=e(),Rt===null)throw Error(te(349));Tr&30||Pg(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,hh(bg.bind(null,i,s,t),[t]),i.flags|=2048,Co(9,Lg.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=Xn(),e=Rt.identifierPrefix;if(ot){var n=ci,i=ui;n=(i&~(1<<32-kn(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=Ao++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=Mx++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},Cx={readContext:Tn,useCallback:Bg,useContext:Tn,useEffect:jf,useImperativeHandle:kg,useInsertionEffect:Ig,useLayoutEffect:Fg,useMemo:zg,useReducer:Eu,useRef:Ng,useState:function(){return Eu(Ro)},useDebugValue:$f,useDeferredValue:function(t){var e=wn();return Hg(e,_t.memoizedState,t)},useTransition:function(){var t=Eu(Ro)[0],e=wn().memoizedState;return[t,e]},useMutableSource:Rg,useSyncExternalStore:Cg,useId:Gg,unstable_isNewReconciler:!1},Px={readContext:Tn,useCallback:Bg,useContext:Tn,useEffect:jf,useImperativeHandle:kg,useInsertionEffect:Ig,useLayoutEffect:Fg,useMemo:zg,useReducer:Mu,useRef:Ng,useState:function(){return Mu(Ro)},useDebugValue:$f,useDeferredValue:function(t){var e=wn();return _t===null?e.memoizedState=t:Hg(e,_t.memoizedState,t)},useTransition:function(){var t=Mu(Ro)[0],e=wn().memoizedState;return[t,e]},useMutableSource:Rg,useSyncExternalStore:Cg,useId:Gg,unstable_isNewReconciler:!1};function bn(t,e){if(t&&t.defaultProps){e=ft({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Oc(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:ft({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Fl={isMounted:function(t){return(t=t._reactInternals)?Cr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=$t(),r=Xi(t),s=di(i,r);s.payload=e,n!=null&&(s.callback=n),e=Vi(t,s,r),e!==null&&(Bn(e,t,r,i),Ba(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=$t(),r=Xi(t),s=di(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Vi(t,s,r),e!==null&&(Bn(e,t,r,i),Ba(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=$t(),i=Xi(t),r=di(n,i);r.tag=2,e!=null&&(r.callback=e),e=Vi(t,r,i),e!==null&&(Bn(e,t,i,n),Ba(e,t,i))}};function ph(t,e,n,i,r,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!yo(n,i)||!yo(r,s):!0}function Yg(t,e,n){var i=!1,r=Ki,s=e.contextType;return typeof s=="object"&&s!==null?s=Tn(s):(r=tn(e)?Er:zt.current,i=e.contextTypes,s=(i=i!=null)?vs(t,r):Ki),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Fl,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function mh(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&Fl.enqueueReplaceState(e,e.state,null)}function kc(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},zf(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Tn(s):(s=tn(e)?Er:zt.current,r.context=vs(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Oc(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&Fl.enqueueReplaceState(r,r.state,null),cl(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function Ss(t,e){try{var n="",i=e;do n+=i0(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function Tu(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Bc(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var Lx=typeof WeakMap=="function"?WeakMap:Map;function jg(t,e,n){n=di(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){ml||(ml=!0,qc=i),Bc(t,e)},n}function $g(t,e,n){n=di(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){Bc(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Bc(t,e),typeof i!="function"&&(Wi===null?Wi=new Set([this]):Wi.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function gh(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new Lx;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=Wx.bind(null,t,e,n),e.then(t,t))}function vh(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function _h(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=di(-1,1),e.tag=2,Vi(n,e,1))),n.lanes|=1),t)}var bx=Mi.ReactCurrentOwner,Zt=!1;function Xt(t,e,n,i){e.child=t===null?Mg(e,null,n,i):xs(e,t.child,n,i)}function xh(t,e,n,i,r){n=n.render;var s=e.ref;return ds(e,r),i=Xf(t,e,n,i,s,r),n=Yf(),t!==null&&!Zt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,yi(t,e,r)):(ot&&n&&Uf(e),e.flags|=1,Xt(t,e,i,r),e.child)}function yh(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!nd(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,qg(t,e,s,i,r)):(t=Xa(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:yo,n(o,i)&&t.ref===e.ref)return yi(t,e,r)}return e.flags|=1,t=Yi(s,i),t.ref=e.ref,t.return=e,e.child=t}function qg(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(yo(s,i)&&t.ref===e.ref)if(Zt=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(Zt=!0);else return e.lanes=t.lanes,yi(t,e,r)}return zc(t,e,n,i,r)}function Kg(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},tt(ss,ln),ln|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,tt(ss,ln),ln|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,tt(ss,ln),ln|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,tt(ss,ln),ln|=i;return Xt(t,e,r,n),e.child}function Qg(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function zc(t,e,n,i,r){var s=tn(n)?Er:zt.current;return s=vs(e,s),ds(e,r),n=Xf(t,e,n,i,s,r),i=Yf(),t!==null&&!Zt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,yi(t,e,r)):(ot&&i&&Uf(e),e.flags|=1,Xt(t,e,n,r),e.child)}function Sh(t,e,n,i,r){if(tn(n)){var s=!0;sl(e)}else s=!1;if(ds(e,r),e.stateNode===null)Ga(t,e),Yg(e,n,i),kc(e,n,i,r),i=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,u=n.contextType;typeof u=="object"&&u!==null?u=Tn(u):(u=tn(n)?Er:zt.current,u=vs(e,u));var f=n.getDerivedStateFromProps,d=typeof f=="function"||typeof o.getSnapshotBeforeUpdate=="function";d||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==u)&&mh(e,o,i,u),Di=!1;var h=e.memoizedState;o.state=h,cl(e,i,o,r),l=e.memoizedState,a!==i||h!==l||en.current||Di?(typeof f=="function"&&(Oc(e,n,f,i),l=e.memoizedState),(a=Di||ph(e,n,a,i,h,l,u))?(d||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=u,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,wg(t,e),a=e.memoizedProps,u=e.type===e.elementType?a:bn(e.type,a),o.props=u,d=e.pendingProps,h=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=Tn(l):(l=tn(n)?Er:zt.current,l=vs(e,l));var m=n.getDerivedStateFromProps;(f=typeof m=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==d||h!==l)&&mh(e,o,i,l),Di=!1,h=e.memoizedState,o.state=h,cl(e,i,o,r);var _=e.memoizedState;a!==d||h!==_||en.current||Di?(typeof m=="function"&&(Oc(e,n,m,i),_=e.memoizedState),(u=Di||ph(e,n,u,i,h,_,l)||!1)?(f||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,_,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,_,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=_),o.props=i,o.state=_,o.context=l,i=u):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),i=!1)}return Hc(t,e,n,i,s,r)}function Hc(t,e,n,i,r,s){Qg(t,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&oh(e,n,!1),yi(t,e,s);i=e.stateNode,bx.current=e;var a=o&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&o?(e.child=xs(e,t.child,null,s),e.child=xs(e,null,a,s)):Xt(t,e,a,s),e.memoizedState=i.state,r&&oh(e,n,!0),e.child}function Zg(t){var e=t.stateNode;e.pendingContext?sh(t,e.pendingContext,e.pendingContext!==e.context):e.context&&sh(t,e.context,!1),Hf(t,e.containerInfo)}function Eh(t,e,n,i,r){return _s(),If(r),e.flags|=256,Xt(t,e,n,i),e.child}var Gc={dehydrated:null,treeContext:null,retryLane:0};function Vc(t){return{baseLanes:t,cachePool:null,transitions:null}}function Jg(t,e,n){var i=e.pendingProps,r=lt.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),tt(lt,r&1),t===null)return Ic(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,t=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=Bl(o,i,0,null),t=_r(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=Vc(n),e.memoizedState=Gc,t):qf(e,o));if(r=t.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return Dx(t,e,o,i,a,r,n);if(s){s=i.fallback,o=e.mode,r=t.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=Yi(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=Yi(a,s):(s=_r(s,o,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=t.child.memoizedState,o=o===null?Vc(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=Gc,i}return s=t.child,t=s.sibling,i=Yi(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function qf(t,e){return e=Bl({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function oa(t,e,n,i){return i!==null&&If(i),xs(e,t.child,null,n),t=qf(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Dx(t,e,n,i,r,s,o){if(n)return e.flags&256?(e.flags&=-257,i=Tu(Error(te(422))),oa(t,e,o,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=Bl({mode:"visible",children:i.children},r,0,null),s=_r(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&xs(e,t.child,null,o),e.child.memoizedState=Vc(o),e.memoizedState=Gc,s);if(!(e.mode&1))return oa(t,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(te(419)),i=Tu(s,i,void 0),oa(t,e,o,i)}if(a=(o&t.childLanes)!==0,Zt||a){if(i=Rt,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,xi(t,r),Bn(i,t,r,-1))}return td(),i=Tu(Error(te(421))),oa(t,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=Xx.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,un=Gi(r.nextSibling),cn=e,ot=!0,Un=null,t!==null&&(_n[xn++]=ui,_n[xn++]=ci,_n[xn++]=Mr,ui=t.id,ci=t.overflow,Mr=e),e=qf(e,i.children),e.flags|=4096,e)}function Mh(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),Fc(t.return,e,n)}function wu(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function ev(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(Xt(t,e,i.children,n),i=lt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Mh(t,n,e);else if(t.tag===19)Mh(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(tt(lt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&fl(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),wu(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&fl(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}wu(e,!0,n,null,s);break;case"together":wu(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Ga(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function yi(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),wr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(te(153));if(e.child!==null){for(t=e.child,n=Yi(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Yi(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Ux(t,e,n){switch(e.tag){case 3:Zg(e),_s();break;case 5:Ag(e);break;case 1:tn(e.type)&&sl(e);break;case 4:Hf(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;tt(ll,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(tt(lt,lt.current&1),e.flags|=128,null):n&e.child.childLanes?Jg(t,e,n):(tt(lt,lt.current&1),t=yi(t,e,n),t!==null?t.sibling:null);tt(lt,lt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return ev(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),tt(lt,lt.current),i)break;return null;case 22:case 23:return e.lanes=0,Kg(t,e,n)}return yi(t,e,n)}var tv,Wc,nv,iv;tv=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Wc=function(){};nv=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,gr(Kn.current);var s=null;switch(n){case"input":r=dc(t,r),i=dc(t,i),s=[];break;case"select":r=ft({},r,{value:void 0}),i=ft({},i,{value:void 0}),s=[];break;case"textarea":r=mc(t,r),i=mc(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=il)}vc(n,i);var o;n=null;for(u in r)if(!i.hasOwnProperty(u)&&r.hasOwnProperty(u)&&r[u]!=null)if(u==="style"){var a=r[u];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(ho.hasOwnProperty(u)?s||(s=[]):(s=s||[]).push(u,null));for(u in i){var l=i[u];if(a=r!=null?r[u]:void 0,i.hasOwnProperty(u)&&l!==a&&(l!=null||a!=null))if(u==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(s||(s=[]),s.push(u,n)),n=l;else u==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(u,l)):u==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(u,""+l):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(ho.hasOwnProperty(u)?(l!=null&&u==="onScroll"&&it("scroll",t),s||a===l||(s=[])):(s=s||[]).push(u,l))}n&&(s=s||[]).push("style",n);var u=s;(e.updateQueue=u)&&(e.flags|=4)}};iv=function(t,e,n,i){n!==i&&(e.flags|=4)};function Vs(t,e){if(!ot)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Ft(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function Nx(t,e,n){var i=e.pendingProps;switch(Nf(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ft(e),null;case 1:return tn(e.type)&&rl(),Ft(e),null;case 3:return i=e.stateNode,ys(),st(en),st(zt),Vf(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(ra(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Un!==null&&(Zc(Un),Un=null))),Wc(t,e),Ft(e),null;case 5:Gf(e);var r=gr(wo.current);if(n=e.type,t!==null&&e.stateNode!=null)nv(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(te(166));return Ft(e),null}if(t=gr(Kn.current),ra(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[jn]=e,i[Mo]=s,t=(e.mode&1)!==0,n){case"dialog":it("cancel",i),it("close",i);break;case"iframe":case"object":case"embed":it("load",i);break;case"video":case"audio":for(r=0;r<Js.length;r++)it(Js[r],i);break;case"source":it("error",i);break;case"img":case"image":case"link":it("error",i),it("load",i);break;case"details":it("toggle",i);break;case"input":Dd(i,s),it("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},it("invalid",i);break;case"textarea":Nd(i,s),it("invalid",i)}vc(n,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&ia(i.textContent,a,t),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&ia(i.textContent,a,t),r=["children",""+a]):ho.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&it("scroll",i)}switch(n){case"input":qo(i),Ud(i,s,!0);break;case"textarea":qo(i),Id(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=il)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=bm(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=o.createElement(n,{is:i.is}):(t=o.createElement(n),n==="select"&&(o=t,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):t=o.createElementNS(t,n),t[jn]=e,t[Mo]=i,tv(t,e,!1,!1),e.stateNode=t;e:{switch(o=_c(n,i),n){case"dialog":it("cancel",t),it("close",t),r=i;break;case"iframe":case"object":case"embed":it("load",t),r=i;break;case"video":case"audio":for(r=0;r<Js.length;r++)it(Js[r],t);r=i;break;case"source":it("error",t),r=i;break;case"img":case"image":case"link":it("error",t),it("load",t),r=i;break;case"details":it("toggle",t),r=i;break;case"input":Dd(t,i),r=dc(t,i),it("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=ft({},i,{value:void 0}),it("invalid",t);break;case"textarea":Nd(t,i),r=mc(t,i),it("invalid",t);break;default:r=i}vc(n,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?Nm(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&Dm(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&po(t,l):typeof l=="number"&&po(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(ho.hasOwnProperty(s)?l!=null&&s==="onScroll"&&it("scroll",t):l!=null&&xf(t,s,l,o))}switch(n){case"input":qo(t),Ud(t,i,!1);break;case"textarea":qo(t),Id(t);break;case"option":i.value!=null&&t.setAttribute("value",""+qi(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?ls(t,!!i.multiple,s,!1):i.defaultValue!=null&&ls(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=il)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Ft(e),null;case 6:if(t&&e.stateNode!=null)iv(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(te(166));if(n=gr(wo.current),gr(Kn.current),ra(e)){if(i=e.stateNode,n=e.memoizedProps,i[jn]=e,(s=i.nodeValue!==n)&&(t=cn,t!==null))switch(t.tag){case 3:ia(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&ia(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[jn]=e,e.stateNode=i}return Ft(e),null;case 13:if(st(lt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(ot&&un!==null&&e.mode&1&&!(e.flags&128))Sg(),_s(),e.flags|=98560,s=!1;else if(s=ra(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(te(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(te(317));s[jn]=e}else _s(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Ft(e),s=!1}else Un!==null&&(Zc(Un),Un=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||lt.current&1?xt===0&&(xt=3):td())),e.updateQueue!==null&&(e.flags|=4),Ft(e),null);case 4:return ys(),Wc(t,e),t===null&&So(e.stateNode.containerInfo),Ft(e),null;case 10:return kf(e.type._context),Ft(e),null;case 17:return tn(e.type)&&rl(),Ft(e),null;case 19:if(st(lt),s=e.memoizedState,s===null)return Ft(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)Vs(s,!1);else{if(xt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=fl(t),o!==null){for(e.flags|=128,Vs(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return tt(lt,lt.current&1|2),e.child}t=t.sibling}s.tail!==null&&mt()>Es&&(e.flags|=128,i=!0,Vs(s,!1),e.lanes=4194304)}else{if(!i)if(t=fl(o),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Vs(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!ot)return Ft(e),null}else 2*mt()-s.renderingStartTime>Es&&n!==1073741824&&(e.flags|=128,i=!0,Vs(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=mt(),e.sibling=null,n=lt.current,tt(lt,i?n&1|2:n&1),e):(Ft(e),null);case 22:case 23:return ed(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?ln&1073741824&&(Ft(e),e.subtreeFlags&6&&(e.flags|=8192)):Ft(e),null;case 24:return null;case 25:return null}throw Error(te(156,e.tag))}function Ix(t,e){switch(Nf(e),e.tag){case 1:return tn(e.type)&&rl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return ys(),st(en),st(zt),Vf(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Gf(e),null;case 13:if(st(lt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(te(340));_s()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return st(lt),null;case 4:return ys(),null;case 10:return kf(e.type._context),null;case 22:case 23:return ed(),null;case 24:return null;default:return null}}var aa=!1,Bt=!1,Fx=typeof WeakSet=="function"?WeakSet:Set,de=null;function rs(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){ht(t,e,i)}else n.current=null}function Xc(t,e,n){try{n()}catch(i){ht(t,e,i)}}var Th=!1;function Ox(t,e){if(Cc=el,t=lg(),Df(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,l=-1,u=0,f=0,d=t,h=null;t:for(;;){for(var m;d!==n||r!==0&&d.nodeType!==3||(a=o+r),d!==s||i!==0&&d.nodeType!==3||(l=o+i),d.nodeType===3&&(o+=d.nodeValue.length),(m=d.firstChild)!==null;)h=d,d=m;for(;;){if(d===t)break t;if(h===n&&++u===r&&(a=o),h===s&&++f===i&&(l=o),(m=d.nextSibling)!==null)break;d=h,h=d.parentNode}d=m}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Pc={focusedElem:t,selectionRange:n},el=!1,de=e;de!==null;)if(e=de,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,de=t;else for(;de!==null;){e=de;try{var _=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(_!==null){var x=_.memoizedProps,p=_.memoizedState,c=e.stateNode,v=c.getSnapshotBeforeUpdate(e.elementType===e.type?x:bn(e.type,x),p);c.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var g=e.stateNode.containerInfo;g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(te(163))}}catch(y){ht(e,e.return,y)}if(t=e.sibling,t!==null){t.return=e.return,de=t;break}de=e.return}return _=Th,Th=!1,_}function oo(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&Xc(e,n,s)}r=r.next}while(r!==i)}}function Ol(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function Yc(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function rv(t){var e=t.alternate;e!==null&&(t.alternate=null,rv(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[jn],delete e[Mo],delete e[Dc],delete e[xx],delete e[yx])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function sv(t){return t.tag===5||t.tag===3||t.tag===4}function wh(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||sv(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function jc(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=il));else if(i!==4&&(t=t.child,t!==null))for(jc(t,e,n),t=t.sibling;t!==null;)jc(t,e,n),t=t.sibling}function $c(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for($c(t,e,n),t=t.sibling;t!==null;)$c(t,e,n),t=t.sibling}var Ct=null,Dn=!1;function wi(t,e,n){for(n=n.child;n!==null;)ov(t,e,n),n=n.sibling}function ov(t,e,n){if(qn&&typeof qn.onCommitFiberUnmount=="function")try{qn.onCommitFiberUnmount(Pl,n)}catch{}switch(n.tag){case 5:Bt||rs(n,e);case 6:var i=Ct,r=Dn;Ct=null,wi(t,e,n),Ct=i,Dn=r,Ct!==null&&(Dn?(t=Ct,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Ct.removeChild(n.stateNode));break;case 18:Ct!==null&&(Dn?(t=Ct,n=n.stateNode,t.nodeType===8?_u(t.parentNode,n):t.nodeType===1&&_u(t,n),_o(t)):_u(Ct,n.stateNode));break;case 4:i=Ct,r=Dn,Ct=n.stateNode.containerInfo,Dn=!0,wi(t,e,n),Ct=i,Dn=r;break;case 0:case 11:case 14:case 15:if(!Bt&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&Xc(n,e,o),r=r.next}while(r!==i)}wi(t,e,n);break;case 1:if(!Bt&&(rs(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(a){ht(n,e,a)}wi(t,e,n);break;case 21:wi(t,e,n);break;case 22:n.mode&1?(Bt=(i=Bt)||n.memoizedState!==null,wi(t,e,n),Bt=i):wi(t,e,n);break;default:wi(t,e,n)}}function Ah(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new Fx),e.forEach(function(i){var r=Yx.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function Rn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:Ct=a.stateNode,Dn=!1;break e;case 3:Ct=a.stateNode.containerInfo,Dn=!0;break e;case 4:Ct=a.stateNode.containerInfo,Dn=!0;break e}a=a.return}if(Ct===null)throw Error(te(160));ov(s,o,r),Ct=null,Dn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(u){ht(r,e,u)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)av(e,t),e=e.sibling}function av(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Rn(e,t),Wn(t),i&4){try{oo(3,t,t.return),Ol(3,t)}catch(x){ht(t,t.return,x)}try{oo(5,t,t.return)}catch(x){ht(t,t.return,x)}}break;case 1:Rn(e,t),Wn(t),i&512&&n!==null&&rs(n,n.return);break;case 5:if(Rn(e,t),Wn(t),i&512&&n!==null&&rs(n,n.return),t.flags&32){var r=t.stateNode;try{po(r,"")}catch(x){ht(t,t.return,x)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,a=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&Pm(r,s),_c(a,o);var u=_c(a,s);for(o=0;o<l.length;o+=2){var f=l[o],d=l[o+1];f==="style"?Nm(r,d):f==="dangerouslySetInnerHTML"?Dm(r,d):f==="children"?po(r,d):xf(r,f,d,u)}switch(a){case"input":hc(r,s);break;case"textarea":Lm(r,s);break;case"select":var h=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var m=s.value;m!=null?ls(r,!!s.multiple,m,!1):h!==!!s.multiple&&(s.defaultValue!=null?ls(r,!!s.multiple,s.defaultValue,!0):ls(r,!!s.multiple,s.multiple?[]:"",!1))}r[Mo]=s}catch(x){ht(t,t.return,x)}}break;case 6:if(Rn(e,t),Wn(t),i&4){if(t.stateNode===null)throw Error(te(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(x){ht(t,t.return,x)}}break;case 3:if(Rn(e,t),Wn(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{_o(e.containerInfo)}catch(x){ht(t,t.return,x)}break;case 4:Rn(e,t),Wn(t);break;case 13:Rn(e,t),Wn(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(Zf=mt())),i&4&&Ah(t);break;case 22:if(f=n!==null&&n.memoizedState!==null,t.mode&1?(Bt=(u=Bt)||f,Rn(e,t),Bt=u):Rn(e,t),Wn(t),i&8192){if(u=t.memoizedState!==null,(t.stateNode.isHidden=u)&&!f&&t.mode&1)for(de=t,f=t.child;f!==null;){for(d=de=f;de!==null;){switch(h=de,m=h.child,h.tag){case 0:case 11:case 14:case 15:oo(4,h,h.return);break;case 1:rs(h,h.return);var _=h.stateNode;if(typeof _.componentWillUnmount=="function"){i=h,n=h.return;try{e=i,_.props=e.memoizedProps,_.state=e.memoizedState,_.componentWillUnmount()}catch(x){ht(i,n,x)}}break;case 5:rs(h,h.return);break;case 22:if(h.memoizedState!==null){Ch(d);continue}}m!==null?(m.return=h,de=m):Ch(d)}f=f.sibling}e:for(f=null,d=t;;){if(d.tag===5){if(f===null){f=d;try{r=d.stateNode,u?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=d.stateNode,l=d.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=Um("display",o))}catch(x){ht(t,t.return,x)}}}else if(d.tag===6){if(f===null)try{d.stateNode.nodeValue=u?"":d.memoizedProps}catch(x){ht(t,t.return,x)}}else if((d.tag!==22&&d.tag!==23||d.memoizedState===null||d===t)&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===t)break e;for(;d.sibling===null;){if(d.return===null||d.return===t)break e;f===d&&(f=null),d=d.return}f===d&&(f=null),d.sibling.return=d.return,d=d.sibling}}break;case 19:Rn(e,t),Wn(t),i&4&&Ah(t);break;case 21:break;default:Rn(e,t),Wn(t)}}function Wn(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(sv(n)){var i=n;break e}n=n.return}throw Error(te(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(po(r,""),i.flags&=-33);var s=wh(t);$c(t,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=wh(t);jc(t,a,o);break;default:throw Error(te(161))}}catch(l){ht(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function kx(t,e,n){de=t,lv(t)}function lv(t,e,n){for(var i=(t.mode&1)!==0;de!==null;){var r=de,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||aa;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||Bt;a=aa;var u=Bt;if(aa=o,(Bt=l)&&!u)for(de=r;de!==null;)o=de,l=o.child,o.tag===22&&o.memoizedState!==null?Ph(r):l!==null?(l.return=o,de=l):Ph(r);for(;s!==null;)de=s,lv(s),s=s.sibling;de=r,aa=a,Bt=u}Rh(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,de=s):Rh(t)}}function Rh(t){for(;de!==null;){var e=de;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Bt||Ol(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!Bt)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:bn(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&fh(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}fh(e,o,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var u=e.alternate;if(u!==null){var f=u.memoizedState;if(f!==null){var d=f.dehydrated;d!==null&&_o(d)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(te(163))}Bt||e.flags&512&&Yc(e)}catch(h){ht(e,e.return,h)}}if(e===t){de=null;break}if(n=e.sibling,n!==null){n.return=e.return,de=n;break}de=e.return}}function Ch(t){for(;de!==null;){var e=de;if(e===t){de=null;break}var n=e.sibling;if(n!==null){n.return=e.return,de=n;break}de=e.return}}function Ph(t){for(;de!==null;){var e=de;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Ol(4,e)}catch(l){ht(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){ht(e,r,l)}}var s=e.return;try{Yc(e)}catch(l){ht(e,s,l)}break;case 5:var o=e.return;try{Yc(e)}catch(l){ht(e,o,l)}}}catch(l){ht(e,e.return,l)}if(e===t){de=null;break}var a=e.sibling;if(a!==null){a.return=e.return,de=a;break}de=e.return}}var Bx=Math.ceil,pl=Mi.ReactCurrentDispatcher,Kf=Mi.ReactCurrentOwner,Mn=Mi.ReactCurrentBatchConfig,qe=0,Rt=null,vt=null,bt=0,ln=0,ss=Ji(0),xt=0,Po=null,wr=0,kl=0,Qf=0,ao=null,Qt=null,Zf=0,Es=1/0,si=null,ml=!1,qc=null,Wi=null,la=!1,Fi=null,gl=0,lo=0,Kc=null,Va=-1,Wa=0;function $t(){return qe&6?mt():Va!==-1?Va:Va=mt()}function Xi(t){return t.mode&1?qe&2&&bt!==0?bt&-bt:Ex.transition!==null?(Wa===0&&(Wa=Ym()),Wa):(t=Ke,t!==0||(t=window.event,t=t===void 0?16:Jm(t.type)),t):1}function Bn(t,e,n,i){if(50<lo)throw lo=0,Kc=null,Error(te(185));No(t,n,i),(!(qe&2)||t!==Rt)&&(t===Rt&&(!(qe&2)&&(kl|=n),xt===4&&Ni(t,bt)),nn(t,i),n===1&&qe===0&&!(e.mode&1)&&(Es=mt()+500,Nl&&er()))}function nn(t,e){var n=t.callbackNode;E0(t,e);var i=Ja(t,t===Rt?bt:0);if(i===0)n!==null&&kd(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&kd(n),e===1)t.tag===0?Sx(Lh.bind(null,t)):_g(Lh.bind(null,t)),vx(function(){!(qe&6)&&er()}),n=null;else{switch(jm(i)){case 1:n=Tf;break;case 4:n=Wm;break;case 16:n=Za;break;case 536870912:n=Xm;break;default:n=Za}n=gv(n,uv.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function uv(t,e){if(Va=-1,Wa=0,qe&6)throw Error(te(327));var n=t.callbackNode;if(hs()&&t.callbackNode!==n)return null;var i=Ja(t,t===Rt?bt:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=vl(t,i);else{e=i;var r=qe;qe|=2;var s=fv();(Rt!==t||bt!==e)&&(si=null,Es=mt()+500,vr(t,e));do try{Gx();break}catch(a){cv(t,a)}while(!0);Of(),pl.current=s,qe=r,vt!==null?e=0:(Rt=null,bt=0,e=xt)}if(e!==0){if(e===2&&(r=Mc(t),r!==0&&(i=r,e=Qc(t,r))),e===1)throw n=Po,vr(t,0),Ni(t,i),nn(t,mt()),n;if(e===6)Ni(t,i);else{if(r=t.current.alternate,!(i&30)&&!zx(r)&&(e=vl(t,i),e===2&&(s=Mc(t),s!==0&&(i=s,e=Qc(t,s))),e===1))throw n=Po,vr(t,0),Ni(t,i),nn(t,mt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(te(345));case 2:ur(t,Qt,si);break;case 3:if(Ni(t,i),(i&130023424)===i&&(e=Zf+500-mt(),10<e)){if(Ja(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){$t(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=bc(ur.bind(null,t,Qt,si),e);break}ur(t,Qt,si);break;case 4:if(Ni(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var o=31-kn(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=mt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*Bx(i/1960))-i,10<i){t.timeoutHandle=bc(ur.bind(null,t,Qt,si),i);break}ur(t,Qt,si);break;case 5:ur(t,Qt,si);break;default:throw Error(te(329))}}}return nn(t,mt()),t.callbackNode===n?uv.bind(null,t):null}function Qc(t,e){var n=ao;return t.current.memoizedState.isDehydrated&&(vr(t,e).flags|=256),t=vl(t,e),t!==2&&(e=Qt,Qt=n,e!==null&&Zc(e)),t}function Zc(t){Qt===null?Qt=t:Qt.push.apply(Qt,t)}function zx(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!Hn(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Ni(t,e){for(e&=~Qf,e&=~kl,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-kn(e),i=1<<n;t[n]=-1,e&=~i}}function Lh(t){if(qe&6)throw Error(te(327));hs();var e=Ja(t,0);if(!(e&1))return nn(t,mt()),null;var n=vl(t,e);if(t.tag!==0&&n===2){var i=Mc(t);i!==0&&(e=i,n=Qc(t,i))}if(n===1)throw n=Po,vr(t,0),Ni(t,e),nn(t,mt()),n;if(n===6)throw Error(te(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,ur(t,Qt,si),nn(t,mt()),null}function Jf(t,e){var n=qe;qe|=1;try{return t(e)}finally{qe=n,qe===0&&(Es=mt()+500,Nl&&er())}}function Ar(t){Fi!==null&&Fi.tag===0&&!(qe&6)&&hs();var e=qe;qe|=1;var n=Mn.transition,i=Ke;try{if(Mn.transition=null,Ke=1,t)return t()}finally{Ke=i,Mn.transition=n,qe=e,!(qe&6)&&er()}}function ed(){ln=ss.current,st(ss)}function vr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,gx(n)),vt!==null)for(n=vt.return;n!==null;){var i=n;switch(Nf(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&rl();break;case 3:ys(),st(en),st(zt),Vf();break;case 5:Gf(i);break;case 4:ys();break;case 13:st(lt);break;case 19:st(lt);break;case 10:kf(i.type._context);break;case 22:case 23:ed()}n=n.return}if(Rt=t,vt=t=Yi(t.current,null),bt=ln=e,xt=0,Po=null,Qf=kl=wr=0,Qt=ao=null,mr!==null){for(e=0;e<mr.length;e++)if(n=mr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}n.pending=i}mr=null}return t}function cv(t,e){do{var n=vt;try{if(Of(),za.current=hl,dl){for(var i=ut.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}dl=!1}if(Tr=0,At=_t=ut=null,so=!1,Ao=0,Kf.current=null,n===null||n.return===null){xt=1,Po=e,vt=null;break}e:{var s=t,o=n.return,a=n,l=e;if(e=bt,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var u=l,f=a,d=f.tag;if(!(f.mode&1)&&(d===0||d===11||d===15)){var h=f.alternate;h?(f.updateQueue=h.updateQueue,f.memoizedState=h.memoizedState,f.lanes=h.lanes):(f.updateQueue=null,f.memoizedState=null)}var m=vh(o);if(m!==null){m.flags&=-257,_h(m,o,a,s,e),m.mode&1&&gh(s,u,e),e=m,l=u;var _=e.updateQueue;if(_===null){var x=new Set;x.add(l),e.updateQueue=x}else _.add(l);break e}else{if(!(e&1)){gh(s,u,e),td();break e}l=Error(te(426))}}else if(ot&&a.mode&1){var p=vh(o);if(p!==null){!(p.flags&65536)&&(p.flags|=256),_h(p,o,a,s,e),If(Ss(l,a));break e}}s=l=Ss(l,a),xt!==4&&(xt=2),ao===null?ao=[s]:ao.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var c=jg(s,l,e);ch(s,c);break e;case 1:a=l;var v=s.type,g=s.stateNode;if(!(s.flags&128)&&(typeof v.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(Wi===null||!Wi.has(g)))){s.flags|=65536,e&=-e,s.lanes|=e;var y=$g(s,a,e);ch(s,y);break e}}s=s.return}while(s!==null)}hv(n)}catch(C){e=C,vt===n&&n!==null&&(vt=n=n.return);continue}break}while(!0)}function fv(){var t=pl.current;return pl.current=hl,t===null?hl:t}function td(){(xt===0||xt===3||xt===2)&&(xt=4),Rt===null||!(wr&268435455)&&!(kl&268435455)||Ni(Rt,bt)}function vl(t,e){var n=qe;qe|=2;var i=fv();(Rt!==t||bt!==e)&&(si=null,vr(t,e));do try{Hx();break}catch(r){cv(t,r)}while(!0);if(Of(),qe=n,pl.current=i,vt!==null)throw Error(te(261));return Rt=null,bt=0,xt}function Hx(){for(;vt!==null;)dv(vt)}function Gx(){for(;vt!==null&&!h0();)dv(vt)}function dv(t){var e=mv(t.alternate,t,ln);t.memoizedProps=t.pendingProps,e===null?hv(t):vt=e,Kf.current=null}function hv(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=Ix(n,e),n!==null){n.flags&=32767,vt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{xt=6,vt=null;return}}else if(n=Nx(n,e,ln),n!==null){vt=n;return}if(e=e.sibling,e!==null){vt=e;return}vt=e=t}while(e!==null);xt===0&&(xt=5)}function ur(t,e,n){var i=Ke,r=Mn.transition;try{Mn.transition=null,Ke=1,Vx(t,e,n,i)}finally{Mn.transition=r,Ke=i}return null}function Vx(t,e,n,i){do hs();while(Fi!==null);if(qe&6)throw Error(te(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(te(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(M0(t,s),t===Rt&&(vt=Rt=null,bt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||la||(la=!0,gv(Za,function(){return hs(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Mn.transition,Mn.transition=null;var o=Ke;Ke=1;var a=qe;qe|=4,Kf.current=null,Ox(t,n),av(n,t),ux(Pc),el=!!Cc,Pc=Cc=null,t.current=n,kx(n),p0(),qe=a,Ke=o,Mn.transition=s}else t.current=n;if(la&&(la=!1,Fi=t,gl=r),s=t.pendingLanes,s===0&&(Wi=null),v0(n.stateNode),nn(t,mt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(ml)throw ml=!1,t=qc,qc=null,t;return gl&1&&t.tag!==0&&hs(),s=t.pendingLanes,s&1?t===Kc?lo++:(lo=0,Kc=t):lo=0,er(),null}function hs(){if(Fi!==null){var t=jm(gl),e=Mn.transition,n=Ke;try{if(Mn.transition=null,Ke=16>t?16:t,Fi===null)var i=!1;else{if(t=Fi,Fi=null,gl=0,qe&6)throw Error(te(331));var r=qe;for(qe|=4,de=t.current;de!==null;){var s=de,o=s.child;if(de.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var u=a[l];for(de=u;de!==null;){var f=de;switch(f.tag){case 0:case 11:case 15:oo(8,f,s)}var d=f.child;if(d!==null)d.return=f,de=d;else for(;de!==null;){f=de;var h=f.sibling,m=f.return;if(rv(f),f===u){de=null;break}if(h!==null){h.return=m,de=h;break}de=m}}}var _=s.alternate;if(_!==null){var x=_.child;if(x!==null){_.child=null;do{var p=x.sibling;x.sibling=null,x=p}while(x!==null)}}de=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,de=o;else e:for(;de!==null;){if(s=de,s.flags&2048)switch(s.tag){case 0:case 11:case 15:oo(9,s,s.return)}var c=s.sibling;if(c!==null){c.return=s.return,de=c;break e}de=s.return}}var v=t.current;for(de=v;de!==null;){o=de;var g=o.child;if(o.subtreeFlags&2064&&g!==null)g.return=o,de=g;else e:for(o=v;de!==null;){if(a=de,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:Ol(9,a)}}catch(C){ht(a,a.return,C)}if(a===o){de=null;break e}var y=a.sibling;if(y!==null){y.return=a.return,de=y;break e}de=a.return}}if(qe=r,er(),qn&&typeof qn.onPostCommitFiberRoot=="function")try{qn.onPostCommitFiberRoot(Pl,t)}catch{}i=!0}return i}finally{Ke=n,Mn.transition=e}}return!1}function bh(t,e,n){e=Ss(n,e),e=jg(t,e,1),t=Vi(t,e,1),e=$t(),t!==null&&(No(t,1,e),nn(t,e))}function ht(t,e,n){if(t.tag===3)bh(t,t,n);else for(;e!==null;){if(e.tag===3){bh(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Wi===null||!Wi.has(i))){t=Ss(n,t),t=$g(e,t,1),e=Vi(e,t,1),t=$t(),e!==null&&(No(e,1,t),nn(e,t));break}}e=e.return}}function Wx(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=$t(),t.pingedLanes|=t.suspendedLanes&n,Rt===t&&(bt&n)===n&&(xt===4||xt===3&&(bt&130023424)===bt&&500>mt()-Zf?vr(t,0):Qf|=n),nn(t,e)}function pv(t,e){e===0&&(t.mode&1?(e=Zo,Zo<<=1,!(Zo&130023424)&&(Zo=4194304)):e=1);var n=$t();t=xi(t,e),t!==null&&(No(t,e,n),nn(t,n))}function Xx(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),pv(t,n)}function Yx(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(te(314))}i!==null&&i.delete(e),pv(t,n)}var mv;mv=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||en.current)Zt=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return Zt=!1,Ux(t,e,n);Zt=!!(t.flags&131072)}else Zt=!1,ot&&e.flags&1048576&&xg(e,al,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;Ga(t,e),t=e.pendingProps;var r=vs(e,zt.current);ds(e,n),r=Xf(null,e,i,t,r,n);var s=Yf();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,tn(i)?(s=!0,sl(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,zf(e),r.updater=Fl,e.stateNode=r,r._reactInternals=e,kc(e,i,t,n),e=Hc(null,e,i,!0,s,n)):(e.tag=0,ot&&s&&Uf(e),Xt(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(Ga(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=$x(i),t=bn(i,t),r){case 0:e=zc(null,e,i,t,n);break e;case 1:e=Sh(null,e,i,t,n);break e;case 11:e=xh(null,e,i,t,n);break e;case 14:e=yh(null,e,i,bn(i.type,t),n);break e}throw Error(te(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:bn(i,r),zc(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:bn(i,r),Sh(t,e,i,r,n);case 3:e:{if(Zg(e),t===null)throw Error(te(387));i=e.pendingProps,s=e.memoizedState,r=s.element,wg(t,e),cl(e,i,null,n);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=Ss(Error(te(423)),e),e=Eh(t,e,i,n,r);break e}else if(i!==r){r=Ss(Error(te(424)),e),e=Eh(t,e,i,n,r);break e}else for(un=Gi(e.stateNode.containerInfo.firstChild),cn=e,ot=!0,Un=null,n=Mg(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(_s(),i===r){e=yi(t,e,n);break e}Xt(t,e,i,n)}e=e.child}return e;case 5:return Ag(e),t===null&&Ic(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,o=r.children,Lc(i,r)?o=null:s!==null&&Lc(i,s)&&(e.flags|=32),Qg(t,e),Xt(t,e,o,n),e.child;case 6:return t===null&&Ic(e),null;case 13:return Jg(t,e,n);case 4:return Hf(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=xs(e,null,i,n):Xt(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:bn(i,r),xh(t,e,i,r,n);case 7:return Xt(t,e,e.pendingProps,n),e.child;case 8:return Xt(t,e,e.pendingProps.children,n),e.child;case 12:return Xt(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,tt(ll,i._currentValue),i._currentValue=o,s!==null)if(Hn(s.value,o)){if(s.children===r.children&&!en.current){e=yi(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=di(-1,n&-n),l.tag=2;var u=s.updateQueue;if(u!==null){u=u.shared;var f=u.pending;f===null?l.next=l:(l.next=f.next,f.next=l),u.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),Fc(s.return,n,e),a.lanes|=n;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(te(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),Fc(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}Xt(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,ds(e,n),r=Tn(r),i=i(r),e.flags|=1,Xt(t,e,i,n),e.child;case 14:return i=e.type,r=bn(i,e.pendingProps),r=bn(i.type,r),yh(t,e,i,r,n);case 15:return qg(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:bn(i,r),Ga(t,e),e.tag=1,tn(i)?(t=!0,sl(e)):t=!1,ds(e,n),Yg(e,i,r),kc(e,i,r,n),Hc(null,e,i,!0,t,n);case 19:return ev(t,e,n);case 22:return Kg(t,e,n)}throw Error(te(156,e.tag))};function gv(t,e){return Vm(t,e)}function jx(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function En(t,e,n,i){return new jx(t,e,n,i)}function nd(t){return t=t.prototype,!(!t||!t.isReactComponent)}function $x(t){if(typeof t=="function")return nd(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Sf)return 11;if(t===Ef)return 14}return 2}function Yi(t,e){var n=t.alternate;return n===null?(n=En(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Xa(t,e,n,i,r,s){var o=2;if(i=t,typeof t=="function")nd(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case qr:return _r(n.children,r,s,e);case yf:o=8,r|=8;break;case lc:return t=En(12,n,e,r|2),t.elementType=lc,t.lanes=s,t;case uc:return t=En(13,n,e,r),t.elementType=uc,t.lanes=s,t;case cc:return t=En(19,n,e,r),t.elementType=cc,t.lanes=s,t;case Am:return Bl(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Tm:o=10;break e;case wm:o=9;break e;case Sf:o=11;break e;case Ef:o=14;break e;case bi:o=16,i=null;break e}throw Error(te(130,t==null?t:typeof t,""))}return e=En(o,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function _r(t,e,n,i){return t=En(7,t,i,e),t.lanes=n,t}function Bl(t,e,n,i){return t=En(22,t,i,e),t.elementType=Am,t.lanes=n,t.stateNode={isHidden:!1},t}function Au(t,e,n){return t=En(6,t,null,e),t.lanes=n,t}function Ru(t,e,n){return e=En(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function qx(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=au(0),this.expirationTimes=au(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=au(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function id(t,e,n,i,r,s,o,a,l){return t=new qx(t,e,n,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=En(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},zf(s),t}function Kx(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:$r,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function vv(t){if(!t)return Ki;t=t._reactInternals;e:{if(Cr(t)!==t||t.tag!==1)throw Error(te(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(tn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(te(171))}if(t.tag===1){var n=t.type;if(tn(n))return vg(t,n,e)}return e}function _v(t,e,n,i,r,s,o,a,l){return t=id(n,i,!0,t,r,s,o,a,l),t.context=vv(null),n=t.current,i=$t(),r=Xi(n),s=di(i,r),s.callback=e??null,Vi(n,s,r),t.current.lanes=r,No(t,r,i),nn(t,i),t}function zl(t,e,n,i){var r=e.current,s=$t(),o=Xi(r);return n=vv(n),e.context===null?e.context=n:e.pendingContext=n,e=di(s,o),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=Vi(r,e,o),t!==null&&(Bn(t,r,o,s),Ba(t,r,o)),o}function _l(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Dh(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function rd(t,e){Dh(t,e),(t=t.alternate)&&Dh(t,e)}function Qx(){return null}var xv=typeof reportError=="function"?reportError:function(t){console.error(t)};function sd(t){this._internalRoot=t}Hl.prototype.render=sd.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(te(409));zl(t,e,null,null)};Hl.prototype.unmount=sd.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Ar(function(){zl(null,t,null,null)}),e[_i]=null}};function Hl(t){this._internalRoot=t}Hl.prototype.unstable_scheduleHydration=function(t){if(t){var e=Km();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Ui.length&&e!==0&&e<Ui[n].priority;n++);Ui.splice(n,0,t),n===0&&Zm(t)}};function od(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Gl(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Uh(){}function Zx(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var u=_l(o);s.call(u)}}var o=_v(e,i,t,0,null,!1,!1,"",Uh);return t._reactRootContainer=o,t[_i]=o.current,So(t.nodeType===8?t.parentNode:t),Ar(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var u=_l(l);a.call(u)}}var l=id(t,0,!1,null,null,!1,!1,"",Uh);return t._reactRootContainer=l,t[_i]=l.current,So(t.nodeType===8?t.parentNode:t),Ar(function(){zl(e,l,n,i)}),l}function Vl(t,e,n,i,r){var s=n._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=_l(o);a.call(l)}}zl(e,o,t,r)}else o=Zx(n,e,t,r,i);return _l(o)}$m=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Zs(e.pendingLanes);n!==0&&(wf(e,n|1),nn(e,mt()),!(qe&6)&&(Es=mt()+500,er()))}break;case 13:Ar(function(){var i=xi(t,1);if(i!==null){var r=$t();Bn(i,t,1,r)}}),rd(t,1)}};Af=function(t){if(t.tag===13){var e=xi(t,134217728);if(e!==null){var n=$t();Bn(e,t,134217728,n)}rd(t,134217728)}};qm=function(t){if(t.tag===13){var e=Xi(t),n=xi(t,e);if(n!==null){var i=$t();Bn(n,t,e,i)}rd(t,e)}};Km=function(){return Ke};Qm=function(t,e){var n=Ke;try{return Ke=t,e()}finally{Ke=n}};yc=function(t,e,n){switch(e){case"input":if(hc(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=Ul(i);if(!r)throw Error(te(90));Cm(i),hc(i,r)}}}break;case"textarea":Lm(t,n);break;case"select":e=n.value,e!=null&&ls(t,!!n.multiple,e,!1)}};Om=Jf;km=Ar;var Jx={usingClientEntryPoint:!1,Events:[Fo,Jr,Ul,Im,Fm,Jf]},Ws={findFiberByHostInstance:pr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},ey={bundleType:Ws.bundleType,version:Ws.version,rendererPackageName:Ws.rendererPackageName,rendererConfig:Ws.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Mi.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Hm(t),t===null?null:t.stateNode},findFiberByHostInstance:Ws.findFiberByHostInstance||Qx,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ua=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ua.isDisabled&&ua.supportsFiber)try{Pl=ua.inject(ey),qn=ua}catch{}}pn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Jx;pn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!od(e))throw Error(te(200));return Kx(t,e,null,n)};pn.createRoot=function(t,e){if(!od(t))throw Error(te(299));var n=!1,i="",r=xv;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=id(t,1,!1,null,null,n,!1,i,r),t[_i]=e.current,So(t.nodeType===8?t.parentNode:t),new sd(e)};pn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(te(188)):(t=Object.keys(t).join(","),Error(te(268,t)));return t=Hm(e),t=t===null?null:t.stateNode,t};pn.flushSync=function(t){return Ar(t)};pn.hydrate=function(t,e,n){if(!Gl(e))throw Error(te(200));return Vl(null,t,e,!0,n)};pn.hydrateRoot=function(t,e,n){if(!od(t))throw Error(te(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",o=xv;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=_v(e,null,t,1,n??null,r,!1,s,o),t[_i]=e.current,So(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new Hl(e)};pn.render=function(t,e,n){if(!Gl(e))throw Error(te(200));return Vl(null,t,e,!1,n)};pn.unmountComponentAtNode=function(t){if(!Gl(t))throw Error(te(40));return t._reactRootContainer?(Ar(function(){Vl(null,null,t,!1,function(){t._reactRootContainer=null,t[_i]=null})}),!0):!1};pn.unstable_batchedUpdates=Jf;pn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!Gl(n))throw Error(te(200));if(t==null||t._reactInternals===void 0)throw Error(te(38));return Vl(t,e,n,!1,i)};pn.version="18.3.1-next-f1338f8080-20240426";function yv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(yv)}catch(t){console.error(t)}}yv(),ym.exports=pn;var ty=ym.exports,Nh=ty;oc.createRoot=Nh.createRoot,oc.hydrateRoot=Nh.hydrateRoot;/**
 * react-router v7.11.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var Ih="popstate";function ny(t={}){function e(i,r){let{pathname:s,search:o,hash:a}=i.location;return Jc("",{pathname:s,search:o,hash:a},r.state&&r.state.usr||null,r.state&&r.state.key||"default")}function n(i,r){return typeof r=="string"?r:Lo(r)}return ry(e,n,null,t)}function ct(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function Gn(t,e){if(!t){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function iy(){return Math.random().toString(36).substring(2,10)}function Fh(t,e){return{usr:t.state,key:t.key,idx:e}}function Jc(t,e,n=null,i){return{pathname:typeof t=="string"?t:t.pathname,search:"",hash:"",...typeof e=="string"?bs(e):e,state:n,key:e&&e.key||i||iy()}}function Lo({pathname:t="/",search:e="",hash:n=""}){return e&&e!=="?"&&(t+=e.charAt(0)==="?"?e:"?"+e),n&&n!=="#"&&(t+=n.charAt(0)==="#"?n:"#"+n),t}function bs(t){let e={};if(t){let n=t.indexOf("#");n>=0&&(e.hash=t.substring(n),t=t.substring(0,n));let i=t.indexOf("?");i>=0&&(e.search=t.substring(i),t=t.substring(0,i)),t&&(e.pathname=t)}return e}function ry(t,e,n,i={}){let{window:r=document.defaultView,v5Compat:s=!1}=i,o=r.history,a="POP",l=null,u=f();u==null&&(u=0,o.replaceState({...o.state,idx:u},""));function f(){return(o.state||{idx:null}).idx}function d(){a="POP";let p=f(),c=p==null?null:p-u;u=p,l&&l({action:a,location:x.location,delta:c})}function h(p,c){a="PUSH";let v=Jc(x.location,p,c);u=f()+1;let g=Fh(v,u),y=x.createHref(v);try{o.pushState(g,"",y)}catch(C){if(C instanceof DOMException&&C.name==="DataCloneError")throw C;r.location.assign(y)}s&&l&&l({action:a,location:x.location,delta:1})}function m(p,c){a="REPLACE";let v=Jc(x.location,p,c);u=f();let g=Fh(v,u),y=x.createHref(v);o.replaceState(g,"",y),s&&l&&l({action:a,location:x.location,delta:0})}function _(p){return sy(p)}let x={get action(){return a},get location(){return t(r,o)},listen(p){if(l)throw new Error("A history only accepts one active listener");return r.addEventListener(Ih,d),l=p,()=>{r.removeEventListener(Ih,d),l=null}},createHref(p){return e(r,p)},createURL:_,encodeLocation(p){let c=_(p);return{pathname:c.pathname,search:c.search,hash:c.hash}},push:h,replace:m,go(p){return o.go(p)}};return x}function sy(t,e=!1){let n="http://localhost";typeof window<"u"&&(n=window.location.origin!=="null"?window.location.origin:window.location.href),ct(n,"No window.location.(origin|href) available to create URL");let i=typeof t=="string"?t:Lo(t);return i=i.replace(/ $/,"%20"),!e&&i.startsWith("//")&&(i=n+i),new URL(i,n)}function Sv(t,e,n="/"){return oy(t,e,n,!1)}function oy(t,e,n,i){let r=typeof e=="string"?bs(e):e,s=Si(r.pathname||"/",n);if(s==null)return null;let o=Ev(t);ay(o);let a=null;for(let l=0;a==null&&l<o.length;++l){let u=_y(s);a=gy(o[l],u,i)}return a}function Ev(t,e=[],n=[],i="",r=!1){let s=(o,a,l=r,u)=>{let f={relativePath:u===void 0?o.path||"":u,caseSensitive:o.caseSensitive===!0,childrenIndex:a,route:o};if(f.relativePath.startsWith("/")){if(!f.relativePath.startsWith(i)&&l)return;ct(f.relativePath.startsWith(i),`Absolute route path "${f.relativePath}" nested under path "${i}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),f.relativePath=f.relativePath.slice(i.length)}let d=hi([i,f.relativePath]),h=n.concat(f);o.children&&o.children.length>0&&(ct(o.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${d}".`),Ev(o.children,e,h,d,l)),!(o.path==null&&!o.index)&&e.push({path:d,score:py(d,o.index),routesMeta:h})};return t.forEach((o,a)=>{var l;if(o.path===""||!((l=o.path)!=null&&l.includes("?")))s(o,a);else for(let u of Mv(o.path))s(o,a,!0,u)}),e}function Mv(t){let e=t.split("/");if(e.length===0)return[];let[n,...i]=e,r=n.endsWith("?"),s=n.replace(/\?$/,"");if(i.length===0)return r?[s,""]:[s];let o=Mv(i.join("/")),a=[];return a.push(...o.map(l=>l===""?s:[s,l].join("/"))),r&&a.push(...o),a.map(l=>t.startsWith("/")&&l===""?"/":l)}function ay(t){t.sort((e,n)=>e.score!==n.score?n.score-e.score:my(e.routesMeta.map(i=>i.childrenIndex),n.routesMeta.map(i=>i.childrenIndex)))}var ly=/^:[\w-]+$/,uy=3,cy=2,fy=1,dy=10,hy=-2,Oh=t=>t==="*";function py(t,e){let n=t.split("/"),i=n.length;return n.some(Oh)&&(i+=hy),e&&(i+=cy),n.filter(r=>!Oh(r)).reduce((r,s)=>r+(ly.test(s)?uy:s===""?fy:dy),i)}function my(t,e){return t.length===e.length&&t.slice(0,-1).every((i,r)=>i===e[r])?t[t.length-1]-e[e.length-1]:0}function gy(t,e,n=!1){let{routesMeta:i}=t,r={},s="/",o=[];for(let a=0;a<i.length;++a){let l=i[a],u=a===i.length-1,f=s==="/"?e:e.slice(s.length)||"/",d=xl({path:l.relativePath,caseSensitive:l.caseSensitive,end:u},f),h=l.route;if(!d&&u&&n&&!i[i.length-1].route.index&&(d=xl({path:l.relativePath,caseSensitive:l.caseSensitive,end:!1},f)),!d)return null;Object.assign(r,d.params),o.push({params:r,pathname:hi([s,d.pathname]),pathnameBase:Ey(hi([s,d.pathnameBase])),route:h}),d.pathnameBase!=="/"&&(s=hi([s,d.pathnameBase]))}return o}function xl(t,e){typeof t=="string"&&(t={path:t,caseSensitive:!1,end:!0});let[n,i]=vy(t.path,t.caseSensitive,t.end),r=e.match(n);if(!r)return null;let s=r[0],o=s.replace(/(.)\/+$/,"$1"),a=r.slice(1);return{params:i.reduce((u,{paramName:f,isOptional:d},h)=>{if(f==="*"){let _=a[h]||"";o=s.slice(0,s.length-_.length).replace(/(.)\/+$/,"$1")}const m=a[h];return d&&!m?u[f]=void 0:u[f]=(m||"").replace(/%2F/g,"/"),u},{}),pathname:s,pathnameBase:o,pattern:t}}function vy(t,e=!1,n=!0){Gn(t==="*"||!t.endsWith("*")||t.endsWith("/*"),`Route path "${t}" will be treated as if it were "${t.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${t.replace(/\*$/,"/*")}".`);let i=[],r="^"+t.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,a,l)=>(i.push({paramName:a,isOptional:l!=null}),l?"/?([^\\/]+)?":"/([^\\/]+)")).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return t.endsWith("*")?(i.push({paramName:"*"}),r+=t==="*"||t==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?r+="\\/*$":t!==""&&t!=="/"&&(r+="(?:(?=\\/|$))"),[new RegExp(r,e?void 0:"i"),i]}function _y(t){try{return t.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return Gn(!1,`The URL path "${t}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${e}).`),t}}function Si(t,e){if(e==="/")return t;if(!t.toLowerCase().startsWith(e.toLowerCase()))return null;let n=e.endsWith("/")?e.length-1:e.length,i=t.charAt(n);return i&&i!=="/"?null:t.slice(n)||"/"}var Tv=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,xy=t=>Tv.test(t);function yy(t,e="/"){let{pathname:n,search:i="",hash:r=""}=typeof t=="string"?bs(t):t,s;if(n)if(xy(n))s=n;else{if(n.includes("//")){let o=n;n=n.replace(/\/\/+/g,"/"),Gn(!1,`Pathnames cannot have embedded double slashes - normalizing ${o} -> ${n}`)}n.startsWith("/")?s=kh(n.substring(1),"/"):s=kh(n,e)}else s=e;return{pathname:s,search:My(i),hash:Ty(r)}}function kh(t,e){let n=e.replace(/\/+$/,"").split("/");return t.split("/").forEach(r=>{r===".."?n.length>1&&n.pop():r!=="."&&n.push(r)}),n.length>1?n.join("/"):"/"}function Cu(t,e,n,i){return`Cannot include a '${t}' character in a manually specified \`to.${e}\` field [${JSON.stringify(i)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Sy(t){return t.filter((e,n)=>n===0||e.route.path&&e.route.path.length>0)}function wv(t){let e=Sy(t);return e.map((n,i)=>i===e.length-1?n.pathname:n.pathnameBase)}function Av(t,e,n,i=!1){let r;typeof t=="string"?r=bs(t):(r={...t},ct(!r.pathname||!r.pathname.includes("?"),Cu("?","pathname","search",r)),ct(!r.pathname||!r.pathname.includes("#"),Cu("#","pathname","hash",r)),ct(!r.search||!r.search.includes("#"),Cu("#","search","hash",r)));let s=t===""||r.pathname==="",o=s?"/":r.pathname,a;if(o==null)a=n;else{let d=e.length-1;if(!i&&o.startsWith("..")){let h=o.split("/");for(;h[0]==="..";)h.shift(),d-=1;r.pathname=h.join("/")}a=d>=0?e[d]:"/"}let l=yy(r,a),u=o&&o!=="/"&&o.endsWith("/"),f=(s||o===".")&&n.endsWith("/");return!l.pathname.endsWith("/")&&(u||f)&&(l.pathname+="/"),l}var hi=t=>t.join("/").replace(/\/\/+/g,"/"),Ey=t=>t.replace(/\/+$/,"").replace(/^\/*/,"/"),My=t=>!t||t==="?"?"":t.startsWith("?")?t:"?"+t,Ty=t=>!t||t==="#"?"":t.startsWith("#")?t:"#"+t,wy=class{constructor(t,e,n,i=!1){this.status=t,this.statusText=e||"",this.internal=i,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function Ay(t){return t!=null&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.internal=="boolean"&&"data"in t}function Ry(t){return t.map(e=>e.route.path).filter(Boolean).join("/").replace(/\/\/*/g,"/")||"/"}var Rv=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function Cv(t,e){let n=t;if(typeof n!="string"||!Tv.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let i=n,r=!1;if(Rv)try{let s=new URL(window.location.href),o=n.startsWith("//")?new URL(s.protocol+n):new URL(n),a=Si(o.pathname,e);o.origin===s.origin&&a!=null?n=a+o.search+o.hash:r=!0}catch{Gn(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:i,isExternal:r,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var Pv=["POST","PUT","PATCH","DELETE"];new Set(Pv);var Cy=["GET",...Pv];new Set(Cy);var Ds=I.createContext(null);Ds.displayName="DataRouter";var Wl=I.createContext(null);Wl.displayName="DataRouterState";var Py=I.createContext(!1),Lv=I.createContext({isTransitioning:!1});Lv.displayName="ViewTransition";var Ly=I.createContext(new Map);Ly.displayName="Fetchers";var by=I.createContext(null);by.displayName="Await";var An=I.createContext(null);An.displayName="Navigation";var ko=I.createContext(null);ko.displayName="Location";var Ti=I.createContext({outlet:null,matches:[],isDataRoute:!1});Ti.displayName="Route";var ad=I.createContext(null);ad.displayName="RouteError";var bv="REACT_ROUTER_ERROR",Dy="REDIRECT",Uy="ROUTE_ERROR_RESPONSE";function Ny(t){if(t.startsWith(`${bv}:${Dy}:{`))try{let e=JSON.parse(t.slice(28));if(typeof e=="object"&&e&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.location=="string"&&typeof e.reloadDocument=="boolean"&&typeof e.replace=="boolean")return e}catch{}}function Iy(t){if(t.startsWith(`${bv}:${Uy}:{`))try{let e=JSON.parse(t.slice(40));if(typeof e=="object"&&e&&typeof e.status=="number"&&typeof e.statusText=="string")return new wy(e.status,e.statusText,e.data)}catch{}}function Fy(t,{relative:e}={}){ct(Bo(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:i}=I.useContext(An),{hash:r,pathname:s,search:o}=zo(t,{relative:e}),a=s;return n!=="/"&&(a=s==="/"?n:hi([n,s])),i.createHref({pathname:a,search:o,hash:r})}function Bo(){return I.useContext(ko)!=null}function Pr(){return ct(Bo(),"useLocation() may be used only in the context of a <Router> component."),I.useContext(ko).location}var Dv="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Uv(t){I.useContext(An).static||I.useLayoutEffect(t)}function Oy(){let{isDataRoute:t}=I.useContext(Ti);return t?Ky():ky()}function ky(){ct(Bo(),"useNavigate() may be used only in the context of a <Router> component.");let t=I.useContext(Ds),{basename:e,navigator:n}=I.useContext(An),{matches:i}=I.useContext(Ti),{pathname:r}=Pr(),s=JSON.stringify(wv(i)),o=I.useRef(!1);return Uv(()=>{o.current=!0}),I.useCallback((l,u={})=>{if(Gn(o.current,Dv),!o.current)return;if(typeof l=="number"){n.go(l);return}let f=Av(l,JSON.parse(s),r,u.relative==="path");t==null&&e!=="/"&&(f.pathname=f.pathname==="/"?e:hi([e,f.pathname])),(u.replace?n.replace:n.push)(f,u.state,u)},[e,n,s,r,t])}I.createContext(null);function zo(t,{relative:e}={}){let{matches:n}=I.useContext(Ti),{pathname:i}=Pr(),r=JSON.stringify(wv(n));return I.useMemo(()=>Av(t,JSON.parse(r),i,e==="path"),[t,r,i,e])}function By(t,e){return Nv(t,e)}function Nv(t,e,n,i,r){var v;ct(Bo(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:s}=I.useContext(An),{matches:o}=I.useContext(Ti),a=o[o.length-1],l=a?a.params:{},u=a?a.pathname:"/",f=a?a.pathnameBase:"/",d=a&&a.route;{let g=d&&d.path||"";Fv(u,!d||g.endsWith("*")||g.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${u}" (under <Route path="${g}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${g}"> to <Route path="${g==="/"?"*":`${g}/*`}">.`)}let h=Pr(),m;if(e){let g=typeof e=="string"?bs(e):e;ct(f==="/"||((v=g.pathname)==null?void 0:v.startsWith(f)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${f}" but pathname "${g.pathname}" was given in the \`location\` prop.`),m=g}else m=h;let _=m.pathname||"/",x=_;if(f!=="/"){let g=f.replace(/^\//,"").split("/");x="/"+_.replace(/^\//,"").split("/").slice(g.length).join("/")}let p=Sv(t,{pathname:x});Gn(d||p!=null,`No routes matched location "${m.pathname}${m.search}${m.hash}" `),Gn(p==null||p[p.length-1].route.element!==void 0||p[p.length-1].route.Component!==void 0||p[p.length-1].route.lazy!==void 0,`Matched leaf route at location "${m.pathname}${m.search}${m.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let c=Wy(p&&p.map(g=>Object.assign({},g,{params:Object.assign({},l,g.params),pathname:hi([f,s.encodeLocation?s.encodeLocation(g.pathname.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:g.pathname]),pathnameBase:g.pathnameBase==="/"?f:hi([f,s.encodeLocation?s.encodeLocation(g.pathnameBase.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:g.pathnameBase])})),o,n,i,r);return e&&c?I.createElement(ko.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...m},navigationType:"POP"}},c):c}function zy(){let t=qy(),e=Ay(t)?`${t.status} ${t.statusText}`:t instanceof Error?t.message:JSON.stringify(t),n=t instanceof Error?t.stack:null,i="rgba(200,200,200, 0.5)",r={padding:"0.5rem",backgroundColor:i},s={padding:"2px 4px",backgroundColor:i},o=null;return console.error("Error handled by React Router default ErrorBoundary:",t),o=I.createElement(I.Fragment,null,I.createElement("p",null,"💿 Hey developer 👋"),I.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",I.createElement("code",{style:s},"ErrorBoundary")," or"," ",I.createElement("code",{style:s},"errorElement")," prop on your route.")),I.createElement(I.Fragment,null,I.createElement("h2",null,"Unexpected Application Error!"),I.createElement("h3",{style:{fontStyle:"italic"}},e),n?I.createElement("pre",{style:r},n):null,o)}var Hy=I.createElement(zy,null),Iv=class extends I.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,e){return e.location!==t.location||e.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:e.error,location:e.location,revalidation:t.revalidation||e.revalidation}}componentDidCatch(t,e){this.props.onError?this.props.onError(t,e):console.error("React Router caught the following error during render",t)}render(){let t=this.state.error;if(this.context&&typeof t=="object"&&t&&"digest"in t&&typeof t.digest=="string"){const n=Iy(t.digest);n&&(t=n)}let e=t!==void 0?I.createElement(Ti.Provider,{value:this.props.routeContext},I.createElement(ad.Provider,{value:t,children:this.props.component})):this.props.children;return this.context?I.createElement(Gy,{error:t},e):e}};Iv.contextType=Py;var Pu=new WeakMap;function Gy({children:t,error:e}){let{basename:n}=I.useContext(An);if(typeof e=="object"&&e&&"digest"in e&&typeof e.digest=="string"){let i=Ny(e.digest);if(i){let r=Pu.get(e);if(r)throw r;let s=Cv(i.location,n);if(Rv&&!Pu.get(e))if(s.isExternal||i.reloadDocument)window.location.href=s.absoluteURL||s.to;else{const o=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(s.to,{replace:i.replace}));throw Pu.set(e,o),o}return I.createElement("meta",{httpEquiv:"refresh",content:`0;url=${s.absoluteURL||s.to}`})}}return t}function Vy({routeContext:t,match:e,children:n}){let i=I.useContext(Ds);return i&&i.static&&i.staticContext&&(e.route.errorElement||e.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=e.route.id),I.createElement(Ti.Provider,{value:t},n)}function Wy(t,e=[],n=null,i=null,r=null){if(t==null){if(!n)return null;if(n.errors)t=n.matches;else if(e.length===0&&!n.initialized&&n.matches.length>0)t=n.matches;else return null}let s=t,o=n==null?void 0:n.errors;if(o!=null){let f=s.findIndex(d=>d.route.id&&(o==null?void 0:o[d.route.id])!==void 0);ct(f>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(o).join(",")}`),s=s.slice(0,Math.min(s.length,f+1))}let a=!1,l=-1;if(n)for(let f=0;f<s.length;f++){let d=s[f];if((d.route.HydrateFallback||d.route.hydrateFallbackElement)&&(l=f),d.route.id){let{loaderData:h,errors:m}=n,_=d.route.loader&&!h.hasOwnProperty(d.route.id)&&(!m||m[d.route.id]===void 0);if(d.route.lazy||_){a=!0,l>=0?s=s.slice(0,l+1):s=[s[0]];break}}}let u=n&&i?(f,d)=>{var h,m;i(f,{location:n.location,params:((m=(h=n.matches)==null?void 0:h[0])==null?void 0:m.params)??{},unstable_pattern:Ry(n.matches),errorInfo:d})}:void 0;return s.reduceRight((f,d,h)=>{let m,_=!1,x=null,p=null;n&&(m=o&&d.route.id?o[d.route.id]:void 0,x=d.route.errorElement||Hy,a&&(l<0&&h===0?(Fv("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),_=!0,p=null):l===h&&(_=!0,p=d.route.hydrateFallbackElement||null)));let c=e.concat(s.slice(0,h+1)),v=()=>{let g;return m?g=x:_?g=p:d.route.Component?g=I.createElement(d.route.Component,null):d.route.element?g=d.route.element:g=f,I.createElement(Vy,{match:d,routeContext:{outlet:f,matches:c,isDataRoute:n!=null},children:g})};return n&&(d.route.ErrorBoundary||d.route.errorElement||h===0)?I.createElement(Iv,{location:n.location,revalidation:n.revalidation,component:x,error:m,children:v(),routeContext:{outlet:null,matches:c,isDataRoute:!0},onError:u}):v()},null)}function ld(t){return`${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Xy(t){let e=I.useContext(Ds);return ct(e,ld(t)),e}function Yy(t){let e=I.useContext(Wl);return ct(e,ld(t)),e}function jy(t){let e=I.useContext(Ti);return ct(e,ld(t)),e}function ud(t){let e=jy(t),n=e.matches[e.matches.length-1];return ct(n.route.id,`${t} can only be used on routes that contain a unique "id"`),n.route.id}function $y(){return ud("useRouteId")}function qy(){var i;let t=I.useContext(ad),e=Yy("useRouteError"),n=ud("useRouteError");return t!==void 0?t:(i=e.errors)==null?void 0:i[n]}function Ky(){let{router:t}=Xy("useNavigate"),e=ud("useNavigate"),n=I.useRef(!1);return Uv(()=>{n.current=!0}),I.useCallback(async(r,s={})=>{Gn(n.current,Dv),n.current&&(typeof r=="number"?await t.navigate(r):await t.navigate(r,{fromRouteId:e,...s}))},[t,e])}var Bh={};function Fv(t,e,n){!e&&!Bh[t]&&(Bh[t]=!0,Gn(!1,n))}I.memo(Qy);function Qy({routes:t,future:e,state:n,onError:i}){return Nv(t,void 0,n,i,e)}function Ov(t){ct(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function Zy({basename:t="/",children:e=null,location:n,navigationType:i="POP",navigator:r,static:s=!1,unstable_useTransitions:o}){ct(!Bo(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let a=t.replace(/^\/*/,"/"),l=I.useMemo(()=>({basename:a,navigator:r,static:s,unstable_useTransitions:o,future:{}}),[a,r,s,o]);typeof n=="string"&&(n=bs(n));let{pathname:u="/",search:f="",hash:d="",state:h=null,key:m="default"}=n,_=I.useMemo(()=>{let x=Si(u,a);return x==null?null:{location:{pathname:x,search:f,hash:d,state:h,key:m},navigationType:i}},[a,u,f,d,h,m,i]);return Gn(_!=null,`<Router basename="${a}"> is not able to match the URL "${u}${f}${d}" because it does not start with the basename, so the <Router> won't render anything.`),_==null?null:I.createElement(An.Provider,{value:l},I.createElement(ko.Provider,{children:e,value:_}))}function Jy({children:t,location:e}){return By(ef(t),e)}function ef(t,e=[]){let n=[];return I.Children.forEach(t,(i,r)=>{if(!I.isValidElement(i))return;let s=[...e,r];if(i.type===I.Fragment){n.push.apply(n,ef(i.props.children,s));return}ct(i.type===Ov,`[${typeof i.type=="string"?i.type:i.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),ct(!i.props.index||!i.props.children,"An index route cannot have child routes.");let o={id:i.props.id||s.join("-"),caseSensitive:i.props.caseSensitive,element:i.props.element,Component:i.props.Component,index:i.props.index,path:i.props.path,middleware:i.props.middleware,loader:i.props.loader,action:i.props.action,hydrateFallbackElement:i.props.hydrateFallbackElement,HydrateFallback:i.props.HydrateFallback,errorElement:i.props.errorElement,ErrorBoundary:i.props.ErrorBoundary,hasErrorBoundary:i.props.hasErrorBoundary===!0||i.props.ErrorBoundary!=null||i.props.errorElement!=null,shouldRevalidate:i.props.shouldRevalidate,handle:i.props.handle,lazy:i.props.lazy};i.props.children&&(o.children=ef(i.props.children,s)),n.push(o)}),n}var Ya="get",ja="application/x-www-form-urlencoded";function Xl(t){return typeof HTMLElement<"u"&&t instanceof HTMLElement}function eS(t){return Xl(t)&&t.tagName.toLowerCase()==="button"}function tS(t){return Xl(t)&&t.tagName.toLowerCase()==="form"}function nS(t){return Xl(t)&&t.tagName.toLowerCase()==="input"}function iS(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}function rS(t,e){return t.button===0&&(!e||e==="_self")&&!iS(t)}var ca=null;function sS(){if(ca===null)try{new FormData(document.createElement("form"),0),ca=!1}catch{ca=!0}return ca}var oS=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Lu(t){return t!=null&&!oS.has(t)?(Gn(!1,`"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${ja}"`),null):t}function aS(t,e){let n,i,r,s,o;if(tS(t)){let a=t.getAttribute("action");i=a?Si(a,e):null,n=t.getAttribute("method")||Ya,r=Lu(t.getAttribute("enctype"))||ja,s=new FormData(t)}else if(eS(t)||nS(t)&&(t.type==="submit"||t.type==="image")){let a=t.form;if(a==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let l=t.getAttribute("formaction")||a.getAttribute("action");if(i=l?Si(l,e):null,n=t.getAttribute("formmethod")||a.getAttribute("method")||Ya,r=Lu(t.getAttribute("formenctype"))||Lu(a.getAttribute("enctype"))||ja,s=new FormData(a,t),!sS()){let{name:u,type:f,value:d}=t;if(f==="image"){let h=u?`${u}.`:"";s.append(`${h}x`,"0"),s.append(`${h}y`,"0")}else u&&s.append(u,d)}}else{if(Xl(t))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=Ya,i=null,r=ja,o=t}return s&&r==="text/plain"&&(o=s,s=void 0),{action:i,method:n.toLowerCase(),encType:r,formData:s,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function cd(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function lS(t,e,n){let i=typeof t=="string"?new URL(t,typeof window>"u"?"server://singlefetch/":window.location.origin):t;return i.pathname==="/"?i.pathname=`_root.${n}`:e&&Si(i.pathname,e)==="/"?i.pathname=`${e.replace(/\/$/,"")}/_root.${n}`:i.pathname=`${i.pathname.replace(/\/$/,"")}.${n}`,i}async function uS(t,e){if(t.id in e)return e[t.id];try{let n=await import(t.module);return e[t.id]=n,n}catch(n){return console.error(`Error loading route module \`${t.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function cS(t){return t==null?!1:t.href==null?t.rel==="preload"&&typeof t.imageSrcSet=="string"&&typeof t.imageSizes=="string":typeof t.rel=="string"&&typeof t.href=="string"}async function fS(t,e,n){let i=await Promise.all(t.map(async r=>{let s=e.routes[r.route.id];if(s){let o=await uS(s,n);return o.links?o.links():[]}return[]}));return mS(i.flat(1).filter(cS).filter(r=>r.rel==="stylesheet"||r.rel==="preload").map(r=>r.rel==="stylesheet"?{...r,rel:"prefetch",as:"style"}:{...r,rel:"prefetch"}))}function zh(t,e,n,i,r,s){let o=(l,u)=>n[u]?l.route.id!==n[u].route.id:!0,a=(l,u)=>{var f;return n[u].pathname!==l.pathname||((f=n[u].route.path)==null?void 0:f.endsWith("*"))&&n[u].params["*"]!==l.params["*"]};return s==="assets"?e.filter((l,u)=>o(l,u)||a(l,u)):s==="data"?e.filter((l,u)=>{var d;let f=i.routes[l.route.id];if(!f||!f.hasLoader)return!1;if(o(l,u)||a(l,u))return!0;if(l.route.shouldRevalidate){let h=l.route.shouldRevalidate({currentUrl:new URL(r.pathname+r.search+r.hash,window.origin),currentParams:((d=n[0])==null?void 0:d.params)||{},nextUrl:new URL(t,window.origin),nextParams:l.params,defaultShouldRevalidate:!0});if(typeof h=="boolean")return h}return!0}):[]}function dS(t,e,{includeHydrateFallback:n}={}){return hS(t.map(i=>{let r=e.routes[i.route.id];if(!r)return[];let s=[r.module];return r.clientActionModule&&(s=s.concat(r.clientActionModule)),r.clientLoaderModule&&(s=s.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(s=s.concat(r.hydrateFallbackModule)),r.imports&&(s=s.concat(r.imports)),s}).flat(1))}function hS(t){return[...new Set(t)]}function pS(t){let e={},n=Object.keys(t).sort();for(let i of n)e[i]=t[i];return e}function mS(t,e){let n=new Set;return new Set(e),t.reduce((i,r)=>{let s=JSON.stringify(pS(r));return n.has(s)||(n.add(s),i.push({key:s,link:r})),i},[])}function kv(){let t=I.useContext(Ds);return cd(t,"You must render this element inside a <DataRouterContext.Provider> element"),t}function gS(){let t=I.useContext(Wl);return cd(t,"You must render this element inside a <DataRouterStateContext.Provider> element"),t}var fd=I.createContext(void 0);fd.displayName="FrameworkContext";function Bv(){let t=I.useContext(fd);return cd(t,"You must render this element inside a <HydratedRouter> element"),t}function vS(t,e){let n=I.useContext(fd),[i,r]=I.useState(!1),[s,o]=I.useState(!1),{onFocus:a,onBlur:l,onMouseEnter:u,onMouseLeave:f,onTouchStart:d}=e,h=I.useRef(null);I.useEffect(()=>{if(t==="render"&&o(!0),t==="viewport"){let x=c=>{c.forEach(v=>{o(v.isIntersecting)})},p=new IntersectionObserver(x,{threshold:.5});return h.current&&p.observe(h.current),()=>{p.disconnect()}}},[t]),I.useEffect(()=>{if(i){let x=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(x)}}},[i]);let m=()=>{r(!0)},_=()=>{r(!1),o(!1)};return n?t!=="intent"?[s,h,{}]:[s,h,{onFocus:Xs(a,m),onBlur:Xs(l,_),onMouseEnter:Xs(u,m),onMouseLeave:Xs(f,_),onTouchStart:Xs(d,m)}]:[!1,h,{}]}function Xs(t,e){return n=>{t&&t(n),n.defaultPrevented||e(n)}}function _S({page:t,...e}){let{router:n}=kv(),i=I.useMemo(()=>Sv(n.routes,t,n.basename),[n.routes,t,n.basename]);return i?I.createElement(yS,{page:t,matches:i,...e}):null}function xS(t){let{manifest:e,routeModules:n}=Bv(),[i,r]=I.useState([]);return I.useEffect(()=>{let s=!1;return fS(t,e,n).then(o=>{s||r(o)}),()=>{s=!0}},[t,e,n]),i}function yS({page:t,matches:e,...n}){let i=Pr(),{manifest:r,routeModules:s}=Bv(),{basename:o}=kv(),{loaderData:a,matches:l}=gS(),u=I.useMemo(()=>zh(t,e,l,r,i,"data"),[t,e,l,r,i]),f=I.useMemo(()=>zh(t,e,l,r,i,"assets"),[t,e,l,r,i]),d=I.useMemo(()=>{if(t===i.pathname+i.search+i.hash)return[];let _=new Set,x=!1;if(e.forEach(c=>{var g;let v=r.routes[c.route.id];!v||!v.hasLoader||(!u.some(y=>y.route.id===c.route.id)&&c.route.id in a&&((g=s[c.route.id])!=null&&g.shouldRevalidate)||v.hasClientLoader?x=!0:_.add(c.route.id))}),_.size===0)return[];let p=lS(t,o,"data");return x&&_.size>0&&p.searchParams.set("_routes",e.filter(c=>_.has(c.route.id)).map(c=>c.route.id).join(",")),[p.pathname+p.search]},[o,a,i,r,u,e,t,s]),h=I.useMemo(()=>dS(f,r),[f,r]),m=xS(f);return I.createElement(I.Fragment,null,d.map(_=>I.createElement("link",{key:_,rel:"prefetch",as:"fetch",href:_,...n})),h.map(_=>I.createElement("link",{key:_,rel:"modulepreload",href:_,...n})),m.map(({key:_,link:x})=>I.createElement("link",{key:_,nonce:n.nonce,...x})))}function SS(...t){return e=>{t.forEach(n=>{typeof n=="function"?n(e):n!=null&&(n.current=e)})}}var ES=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{ES&&(window.__reactRouterVersion="7.11.0")}catch{}function MS({basename:t,children:e,unstable_useTransitions:n,window:i}){let r=I.useRef();r.current==null&&(r.current=ny({window:i,v5Compat:!0}));let s=r.current,[o,a]=I.useState({action:s.action,location:s.location}),l=I.useCallback(u=>{n===!1?a(u):I.startTransition(()=>a(u))},[n]);return I.useLayoutEffect(()=>s.listen(l),[s,l]),I.createElement(Zy,{basename:t,children:e,location:o.location,navigationType:o.action,navigator:s,unstable_useTransitions:n})}var zv=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Hv=I.forwardRef(function({onClick:e,discover:n="render",prefetch:i="none",relative:r,reloadDocument:s,replace:o,state:a,target:l,to:u,preventScrollReset:f,viewTransition:d,unstable_defaultShouldRevalidate:h,...m},_){let{basename:x,unstable_useTransitions:p}=I.useContext(An),c=typeof u=="string"&&zv.test(u),v=Cv(u,x);u=v.to;let g=Fy(u,{relative:r}),[y,C,R]=vS(i,m),A=RS(u,{replace:o,state:a,target:l,preventScrollReset:f,relative:r,viewTransition:d,unstable_defaultShouldRevalidate:h,unstable_useTransitions:p});function U(T){e&&e(T),T.defaultPrevented||A(T)}let E=I.createElement("a",{...m,...R,href:v.absoluteURL||g,onClick:v.isExternal||s?e:U,ref:SS(_,C),target:l,"data-discover":!c&&n==="render"?"true":void 0});return y&&!c?I.createElement(I.Fragment,null,E,I.createElement(_S,{page:g})):E});Hv.displayName="Link";var TS=I.forwardRef(function({"aria-current":e="page",caseSensitive:n=!1,className:i="",end:r=!1,style:s,to:o,viewTransition:a,children:l,...u},f){let d=zo(o,{relative:u.relative}),h=Pr(),m=I.useContext(Wl),{navigator:_,basename:x}=I.useContext(An),p=m!=null&&DS(d)&&a===!0,c=_.encodeLocation?_.encodeLocation(d).pathname:d.pathname,v=h.pathname,g=m&&m.navigation&&m.navigation.location?m.navigation.location.pathname:null;n||(v=v.toLowerCase(),g=g?g.toLowerCase():null,c=c.toLowerCase()),g&&x&&(g=Si(g,x)||g);const y=c!=="/"&&c.endsWith("/")?c.length-1:c.length;let C=v===c||!r&&v.startsWith(c)&&v.charAt(y)==="/",R=g!=null&&(g===c||!r&&g.startsWith(c)&&g.charAt(c.length)==="/"),A={isActive:C,isPending:R,isTransitioning:p},U=C?e:void 0,E;typeof i=="function"?E=i(A):E=[i,C?"active":null,R?"pending":null,p?"transitioning":null].filter(Boolean).join(" ");let T=typeof s=="function"?s(A):s;return I.createElement(Hv,{...u,"aria-current":U,className:E,ref:f,style:T,to:o,viewTransition:a},typeof l=="function"?l(A):l)});TS.displayName="NavLink";var wS=I.forwardRef(({discover:t="render",fetcherKey:e,navigate:n,reloadDocument:i,replace:r,state:s,method:o=Ya,action:a,onSubmit:l,relative:u,preventScrollReset:f,viewTransition:d,unstable_defaultShouldRevalidate:h,...m},_)=>{let{unstable_useTransitions:x}=I.useContext(An),p=LS(),c=bS(a,{relative:u}),v=o.toLowerCase()==="get"?"get":"post",g=typeof a=="string"&&zv.test(a),y=C=>{if(l&&l(C),C.defaultPrevented)return;C.preventDefault();let R=C.nativeEvent.submitter,A=(R==null?void 0:R.getAttribute("formmethod"))||o,U=()=>p(R||C.currentTarget,{fetcherKey:e,method:A,navigate:n,replace:r,state:s,relative:u,preventScrollReset:f,viewTransition:d,unstable_defaultShouldRevalidate:h});x&&n!==!1?I.startTransition(()=>U()):U()};return I.createElement("form",{ref:_,method:v,action:c,onSubmit:i?l:y,...m,"data-discover":!g&&t==="render"?"true":void 0})});wS.displayName="Form";function AS(t){return`${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Gv(t){let e=I.useContext(Ds);return ct(e,AS(t)),e}function RS(t,{target:e,replace:n,state:i,preventScrollReset:r,relative:s,viewTransition:o,unstable_defaultShouldRevalidate:a,unstable_useTransitions:l}={}){let u=Oy(),f=Pr(),d=zo(t,{relative:s});return I.useCallback(h=>{if(rS(h,e)){h.preventDefault();let m=n!==void 0?n:Lo(f)===Lo(d),_=()=>u(t,{replace:m,state:i,preventScrollReset:r,relative:s,viewTransition:o,unstable_defaultShouldRevalidate:a});l?I.startTransition(()=>_()):_()}},[f,u,d,n,i,e,t,r,s,o,a,l])}var CS=0,PS=()=>`__${String(++CS)}__`;function LS(){let{router:t}=Gv("useSubmit"),{basename:e}=I.useContext(An),n=$y(),i=t.fetch,r=t.navigate;return I.useCallback(async(s,o={})=>{let{action:a,method:l,encType:u,formData:f,body:d}=aS(s,e);if(o.navigate===!1){let h=o.fetcherKey||PS();await i(h,n,o.action||a,{unstable_defaultShouldRevalidate:o.unstable_defaultShouldRevalidate,preventScrollReset:o.preventScrollReset,formData:f,body:d,formMethod:o.method||l,formEncType:o.encType||u,flushSync:o.flushSync})}else await r(o.action||a,{unstable_defaultShouldRevalidate:o.unstable_defaultShouldRevalidate,preventScrollReset:o.preventScrollReset,formData:f,body:d,formMethod:o.method||l,formEncType:o.encType||u,replace:o.replace,state:o.state,fromRouteId:n,flushSync:o.flushSync,viewTransition:o.viewTransition})},[i,r,e,n])}function bS(t,{relative:e}={}){let{basename:n}=I.useContext(An),i=I.useContext(Ti);ct(i,"useFormAction must be used inside a RouteContext");let[r]=i.matches.slice(-1),s={...zo(t||".",{relative:e})},o=Pr();if(t==null){s.search=o.search;let a=new URLSearchParams(s.search),l=a.getAll("index");if(l.some(f=>f==="")){a.delete("index"),l.filter(d=>d).forEach(d=>a.append("index",d));let f=a.toString();s.search=f?`?${f}`:""}}return(!t||t===".")&&r.route.index&&(s.search=s.search?s.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(s.pathname=s.pathname==="/"?n:hi([n,s.pathname])),Lo(s)}function DS(t,{relative:e}={}){let n=I.useContext(Lv);ct(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:i}=Gv("useViewTransitionState"),r=zo(t,{relative:e});if(!n.isTransitioning)return!1;let s=Si(n.currentLocation.pathname,i)||n.currentLocation.pathname,o=Si(n.nextLocation.pathname,i)||n.nextLocation.pathname;return xl(r.pathname,o)!=null||xl(r.pathname,s)!=null}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const dd="160",US=0,Hh=1,NS=2,Vv=1,IS=2,ri=3,Qi=0,rn=1,ai=2,pi=0,ps=1,tf=2,Gh=3,Vh=4,FS=5,dr=100,OS=101,kS=102,Wh=103,Xh=104,BS=200,zS=201,HS=202,GS=203,nf=204,rf=205,VS=206,WS=207,XS=208,YS=209,jS=210,$S=211,qS=212,KS=213,QS=214,ZS=0,JS=1,eE=2,yl=3,tE=4,nE=5,iE=6,rE=7,Wv=0,sE=1,oE=2,ji=0,aE=1,lE=2,uE=3,cE=4,fE=5,dE=6,Xv=300,Ms=301,Ts=302,sf=303,of=304,Yl=306,af=1e3,Fn=1001,lf=1002,Yt=1003,Yh=1004,bu=1005,yn=1006,hE=1007,bo=1008,$i=1009,pE=1010,mE=1011,hd=1012,Yv=1013,Oi=1014,ki=1015,mi=1016,jv=1017,$v=1018,xr=1020,gE=1021,On=1023,vE=1024,_E=1025,yr=1026,ws=1027,xE=1028,qv=1029,yE=1030,Kv=1031,Qv=1033,Du=33776,Uu=33777,Nu=33778,Iu=33779,jh=35840,$h=35841,qh=35842,Kh=35843,Zv=36196,Qh=37492,Zh=37496,Jh=37808,ep=37809,tp=37810,np=37811,ip=37812,rp=37813,sp=37814,op=37815,ap=37816,lp=37817,up=37818,cp=37819,fp=37820,dp=37821,Fu=36492,hp=36494,pp=36495,SE=36283,mp=36284,gp=36285,vp=36286,Jv=3e3,Sr=3001,EE=3200,ME=3201,TE=0,wE=1,Sn="",Pt="srgb",Ei="srgb-linear",pd="display-p3",jl="display-p3-linear",Sl="linear",rt="srgb",El="rec709",Ml="p3",br=7680,_p=519,AE=512,RE=513,CE=514,e_=515,PE=516,LE=517,bE=518,DE=519,xp=35044,yp="300 es",uf=1035,fi=2e3,Tl=2001;class Us{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Ot=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Sp=1234567;const uo=Math.PI/180,Do=180/Math.PI;function Ns(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ot[t&255]+Ot[t>>8&255]+Ot[t>>16&255]+Ot[t>>24&255]+"-"+Ot[e&255]+Ot[e>>8&255]+"-"+Ot[e>>16&15|64]+Ot[e>>24&255]+"-"+Ot[n&63|128]+Ot[n>>8&255]+"-"+Ot[n>>16&255]+Ot[n>>24&255]+Ot[i&255]+Ot[i>>8&255]+Ot[i>>16&255]+Ot[i>>24&255]).toLowerCase()}function jt(t,e,n){return Math.max(e,Math.min(n,t))}function md(t,e){return(t%e+e)%e}function UE(t,e,n,i,r){return i+(t-e)*(r-i)/(n-e)}function NE(t,e,n){return t!==e?(n-t)/(e-t):0}function co(t,e,n){return(1-n)*t+n*e}function IE(t,e,n,i){return co(t,e,1-Math.exp(-n*i))}function FE(t,e=1){return e-Math.abs(md(t,e*2)-e)}function OE(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*(3-2*t))}function kE(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*t*(t*(t*6-15)+10))}function BE(t,e){return t+Math.floor(Math.random()*(e-t+1))}function zE(t,e){return t+Math.random()*(e-t)}function HE(t){return t*(.5-Math.random())}function GE(t){t!==void 0&&(Sp=t);let e=Sp+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function VE(t){return t*uo}function WE(t){return t*Do}function cf(t){return(t&t-1)===0&&t!==0}function XE(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))}function wl(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function YE(t,e,n,i,r){const s=Math.cos,o=Math.sin,a=s(n/2),l=o(n/2),u=s((e+i)/2),f=o((e+i)/2),d=s((e-i)/2),h=o((e-i)/2),m=s((i-e)/2),_=o((i-e)/2);switch(r){case"XYX":t.set(a*f,l*d,l*h,a*u);break;case"YZY":t.set(l*h,a*f,l*d,a*u);break;case"ZXZ":t.set(l*d,l*h,a*f,a*u);break;case"XZX":t.set(a*f,l*_,l*m,a*u);break;case"YXY":t.set(l*m,a*f,l*_,a*u);break;case"ZYZ":t.set(l*_,l*m,a*f,a*u);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function jr(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function Vt(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}const Ep={DEG2RAD:uo,RAD2DEG:Do,generateUUID:Ns,clamp:jt,euclideanModulo:md,mapLinear:UE,inverseLerp:NE,lerp:co,damp:IE,pingpong:FE,smoothstep:OE,smootherstep:kE,randInt:BE,randFloat:zE,randFloatSpread:HE,seededRandom:GE,degToRad:VE,radToDeg:WE,isPowerOfTwo:cf,ceilPowerOfTwo:XE,floorPowerOfTwo:wl,setQuaternionFromProperEuler:YE,normalize:Vt,denormalize:jr};class Ie{constructor(e=0,n=0){Ie.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(jt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ve{constructor(e,n,i,r,s,o,a,l,u){Ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,u)}set(e,n,i,r,s,o,a,l,u){const f=this.elements;return f[0]=e,f[1]=r,f[2]=a,f[3]=n,f[4]=s,f[5]=l,f[6]=i,f[7]=o,f[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],l=i[6],u=i[1],f=i[4],d=i[7],h=i[2],m=i[5],_=i[8],x=r[0],p=r[3],c=r[6],v=r[1],g=r[4],y=r[7],C=r[2],R=r[5],A=r[8];return s[0]=o*x+a*v+l*C,s[3]=o*p+a*g+l*R,s[6]=o*c+a*y+l*A,s[1]=u*x+f*v+d*C,s[4]=u*p+f*g+d*R,s[7]=u*c+f*y+d*A,s[2]=h*x+m*v+_*C,s[5]=h*p+m*g+_*R,s[8]=h*c+m*y+_*A,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],f=e[8];return n*o*f-n*a*u-i*s*f+i*a*l+r*s*u-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],f=e[8],d=f*o-a*u,h=a*l-f*s,m=u*s-o*l,_=n*d+i*h+r*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/_;return e[0]=d*x,e[1]=(r*u-f*i)*x,e[2]=(a*i-r*o)*x,e[3]=h*x,e[4]=(f*n-r*l)*x,e[5]=(r*s-a*n)*x,e[6]=m*x,e[7]=(i*l-u*n)*x,e[8]=(o*n-i*s)*x,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,a){const l=Math.cos(s),u=Math.sin(s);return this.set(i*l,i*u,-i*(l*o+u*a)+o+e,-r*u,r*l,-r*(-u*o+l*a)+a+n,0,0,1),this}scale(e,n){return this.premultiply(Ou.makeScale(e,n)),this}rotate(e){return this.premultiply(Ou.makeRotation(-e)),this}translate(e,n){return this.premultiply(Ou.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ou=new Ve;function t_(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function Al(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function jE(){const t=Al("canvas");return t.style.display="block",t}const Mp={};function fo(t){t in Mp||(Mp[t]=!0,console.warn(t))}const Tp=new Ve().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),wp=new Ve().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),fa={[Ei]:{transfer:Sl,primaries:El,toReference:t=>t,fromReference:t=>t},[Pt]:{transfer:rt,primaries:El,toReference:t=>t.convertSRGBToLinear(),fromReference:t=>t.convertLinearToSRGB()},[jl]:{transfer:Sl,primaries:Ml,toReference:t=>t.applyMatrix3(wp),fromReference:t=>t.applyMatrix3(Tp)},[pd]:{transfer:rt,primaries:Ml,toReference:t=>t.convertSRGBToLinear().applyMatrix3(wp),fromReference:t=>t.applyMatrix3(Tp).convertLinearToSRGB()}},$E=new Set([Ei,jl]),Qe={enabled:!0,_workingColorSpace:Ei,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(t){if(!$E.has(t))throw new Error(`Unsupported working color space, "${t}".`);this._workingColorSpace=t},convert:function(t,e,n){if(this.enabled===!1||e===n||!e||!n)return t;const i=fa[e].toReference,r=fa[n].fromReference;return r(i(t))},fromWorkingColorSpace:function(t,e){return this.convert(t,this._workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this._workingColorSpace)},getPrimaries:function(t){return fa[t].primaries},getTransfer:function(t){return t===Sn?Sl:fa[t].transfer}};function ms(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function ku(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Dr;class n_{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Dr===void 0&&(Dr=Al("canvas")),Dr.width=e.width,Dr.height=e.height;const i=Dr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Dr}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Al("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=ms(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(ms(n[i]/255)*255):n[i]=ms(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let qE=0;class i_{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:qE++}),this.uuid=Ns(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Bu(r[o].image)):s.push(Bu(r[o]))}else s=Bu(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function Bu(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?n_.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let KE=0;class fn extends Us{constructor(e=fn.DEFAULT_IMAGE,n=fn.DEFAULT_MAPPING,i=Fn,r=Fn,s=yn,o=bo,a=On,l=$i,u=fn.DEFAULT_ANISOTROPY,f=Sn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:KE++}),this.uuid=Ns(),this.name="",this.source=new i_(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=u,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ie(0,0),this.repeat=new Ie(1,1),this.center=new Ie(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof f=="string"?this.colorSpace=f:(fo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=f===Sr?Pt:Sn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Xv)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case af:e.x=e.x-Math.floor(e.x);break;case Fn:e.x=e.x<0?0:1;break;case lf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case af:e.y=e.y-Math.floor(e.y);break;case Fn:e.y=e.y<0?0:1;break;case lf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return fo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Pt?Sr:Jv}set encoding(e){fo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Sr?Pt:Sn}}fn.DEFAULT_IMAGE=null;fn.DEFAULT_MAPPING=Xv;fn.DEFAULT_ANISOTROPY=1;class Lt{constructor(e=0,n=0,i=0,r=1){Lt.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,u=l[0],f=l[4],d=l[8],h=l[1],m=l[5],_=l[9],x=l[2],p=l[6],c=l[10];if(Math.abs(f-h)<.01&&Math.abs(d-x)<.01&&Math.abs(_-p)<.01){if(Math.abs(f+h)<.1&&Math.abs(d+x)<.1&&Math.abs(_+p)<.1&&Math.abs(u+m+c-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const g=(u+1)/2,y=(m+1)/2,C=(c+1)/2,R=(f+h)/4,A=(d+x)/4,U=(_+p)/4;return g>y&&g>C?g<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(g),r=R/i,s=A/i):y>C?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=R/r,s=U/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=A/s,r=U/s),this.set(i,r,s,n),this}let v=Math.sqrt((p-_)*(p-_)+(d-x)*(d-x)+(h-f)*(h-f));return Math.abs(v)<.001&&(v=1),this.x=(p-_)/v,this.y=(d-x)/v,this.z=(h-f)/v,this.w=Math.acos((u+m+c-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class QE extends Us{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new Lt(0,0,e,n),this.scissorTest=!1,this.viewport=new Lt(0,0,e,n);const r={width:e,height:n,depth:1};i.encoding!==void 0&&(fo("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Sr?Pt:Sn),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:yn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new fn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,n,i=1){(this.width!==e||this.height!==n||this.depth!==i)&&(this.width=e,this.height=n,this.depth=i,this.texture.image.width=e,this.texture.image.height=n,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new i_(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class zn extends QE{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class r_ extends fn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=Fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ZE extends fn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=Fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ho{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,a){let l=i[r+0],u=i[r+1],f=i[r+2],d=i[r+3];const h=s[o+0],m=s[o+1],_=s[o+2],x=s[o+3];if(a===0){e[n+0]=l,e[n+1]=u,e[n+2]=f,e[n+3]=d;return}if(a===1){e[n+0]=h,e[n+1]=m,e[n+2]=_,e[n+3]=x;return}if(d!==x||l!==h||u!==m||f!==_){let p=1-a;const c=l*h+u*m+f*_+d*x,v=c>=0?1:-1,g=1-c*c;if(g>Number.EPSILON){const C=Math.sqrt(g),R=Math.atan2(C,c*v);p=Math.sin(p*R)/C,a=Math.sin(a*R)/C}const y=a*v;if(l=l*p+h*y,u=u*p+m*y,f=f*p+_*y,d=d*p+x*y,p===1-a){const C=1/Math.sqrt(l*l+u*u+f*f+d*d);l*=C,u*=C,f*=C,d*=C}}e[n]=l,e[n+1]=u,e[n+2]=f,e[n+3]=d}static multiplyQuaternionsFlat(e,n,i,r,s,o){const a=i[r],l=i[r+1],u=i[r+2],f=i[r+3],d=s[o],h=s[o+1],m=s[o+2],_=s[o+3];return e[n]=a*_+f*d+l*m-u*h,e[n+1]=l*_+f*h+u*d-a*m,e[n+2]=u*_+f*m+a*h-l*d,e[n+3]=f*_-a*d-l*h-u*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,u=a(i/2),f=a(r/2),d=a(s/2),h=l(i/2),m=l(r/2),_=l(s/2);switch(o){case"XYZ":this._x=h*f*d+u*m*_,this._y=u*m*d-h*f*_,this._z=u*f*_+h*m*d,this._w=u*f*d-h*m*_;break;case"YXZ":this._x=h*f*d+u*m*_,this._y=u*m*d-h*f*_,this._z=u*f*_-h*m*d,this._w=u*f*d+h*m*_;break;case"ZXY":this._x=h*f*d-u*m*_,this._y=u*m*d+h*f*_,this._z=u*f*_+h*m*d,this._w=u*f*d-h*m*_;break;case"ZYX":this._x=h*f*d-u*m*_,this._y=u*m*d+h*f*_,this._z=u*f*_-h*m*d,this._w=u*f*d+h*m*_;break;case"YZX":this._x=h*f*d+u*m*_,this._y=u*m*d+h*f*_,this._z=u*f*_-h*m*d,this._w=u*f*d-h*m*_;break;case"XZY":this._x=h*f*d-u*m*_,this._y=u*m*d-h*f*_,this._z=u*f*_+h*m*d,this._w=u*f*d+h*m*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],l=n[9],u=n[2],f=n[6],d=n[10],h=i+a+d;if(h>0){const m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(f-l)*m,this._y=(s-u)*m,this._z=(o-r)*m}else if(i>a&&i>d){const m=2*Math.sqrt(1+i-a-d);this._w=(f-l)/m,this._x=.25*m,this._y=(r+o)/m,this._z=(s+u)/m}else if(a>d){const m=2*Math.sqrt(1+a-i-d);this._w=(s-u)/m,this._x=(r+o)/m,this._y=.25*m,this._z=(l+f)/m}else{const m=2*Math.sqrt(1+d-i-a);this._w=(o-r)/m,this._x=(s+u)/m,this._y=(l+f)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(jt(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,o=e._w,a=n._x,l=n._y,u=n._z,f=n._w;return this._x=i*f+o*a+r*u-s*l,this._y=r*f+o*l+s*a-i*u,this._z=s*f+o*u+i*l-r*a,this._w=o*f-i*a-r*l-s*u,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const m=1-n;return this._w=m*o+n*this._w,this._x=m*i+n*this._x,this._y=m*r+n*this._y,this._z=m*s+n*this._z,this.normalize(),this}const u=Math.sqrt(l),f=Math.atan2(u,a),d=Math.sin((1-n)*f)/u,h=Math.sin(n*f)/u;return this._w=o*d+this._w*h,this._x=i*d+this._x*h,this._y=r*d+this._y*h,this._z=s*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=Math.random(),n=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(n*Math.cos(r),i*Math.sin(s),i*Math.cos(s),n*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(e=0,n=0,i=0){F.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Ap.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Ap.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,u=2*(o*r-a*i),f=2*(a*n-s*r),d=2*(s*i-o*n);return this.x=n+l*u+o*d-a*f,this.y=i+l*f+a*u-s*d,this.z=r+l*d+s*f-o*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,o=n.x,a=n.y,l=n.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return zu.copy(this).projectOnVector(e),this.sub(zu)}reflect(e){return this.sub(zu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(jt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,n=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(n),this.y=i*Math.sin(n),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const zu=new F,Ap=new Ho;class Go{constructor(e=new F(1/0,1/0,1/0),n=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Cn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Cn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Cn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Cn):Cn.fromBufferAttribute(s,o),Cn.applyMatrix4(e.matrixWorld),this.expandByPoint(Cn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),da.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),da.copy(i.boundingBox)),da.applyMatrix4(e.matrixWorld),this.union(da)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Cn),Cn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ys),ha.subVectors(this.max,Ys),Ur.subVectors(e.a,Ys),Nr.subVectors(e.b,Ys),Ir.subVectors(e.c,Ys),Ai.subVectors(Nr,Ur),Ri.subVectors(Ir,Nr),rr.subVectors(Ur,Ir);let n=[0,-Ai.z,Ai.y,0,-Ri.z,Ri.y,0,-rr.z,rr.y,Ai.z,0,-Ai.x,Ri.z,0,-Ri.x,rr.z,0,-rr.x,-Ai.y,Ai.x,0,-Ri.y,Ri.x,0,-rr.y,rr.x,0];return!Hu(n,Ur,Nr,Ir,ha)||(n=[1,0,0,0,1,0,0,0,1],!Hu(n,Ur,Nr,Ir,ha))?!1:(pa.crossVectors(Ai,Ri),n=[pa.x,pa.y,pa.z],Hu(n,Ur,Nr,Ir,ha))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Cn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Cn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Jn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Jn=[new F,new F,new F,new F,new F,new F,new F,new F],Cn=new F,da=new Go,Ur=new F,Nr=new F,Ir=new F,Ai=new F,Ri=new F,rr=new F,Ys=new F,ha=new F,pa=new F,sr=new F;function Hu(t,e,n,i,r){for(let s=0,o=t.length-3;s<=o;s+=3){sr.fromArray(t,s);const a=r.x*Math.abs(sr.x)+r.y*Math.abs(sr.y)+r.z*Math.abs(sr.z),l=e.dot(sr),u=n.dot(sr),f=i.dot(sr);if(Math.max(-Math.max(l,u,f),Math.min(l,u,f))>a)return!1}return!0}const JE=new Go,js=new F,Gu=new F;class gd{constructor(e=new F,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):JE.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;js.subVectors(e,this.center);const n=js.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(js,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Gu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(js.copy(e.center).add(Gu)),this.expandByPoint(js.copy(e.center).sub(Gu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ei=new F,Vu=new F,ma=new F,Ci=new F,Wu=new F,ga=new F,Xu=new F;class eM{constructor(e=new F,n=new F(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ei)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=ei.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(ei.copy(this.origin).addScaledVector(this.direction,n),ei.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Vu.copy(e).add(n).multiplyScalar(.5),ma.copy(n).sub(e).normalize(),Ci.copy(this.origin).sub(Vu);const s=e.distanceTo(n)*.5,o=-this.direction.dot(ma),a=Ci.dot(this.direction),l=-Ci.dot(ma),u=Ci.lengthSq(),f=Math.abs(1-o*o);let d,h,m,_;if(f>0)if(d=o*l-a,h=o*a-l,_=s*f,d>=0)if(h>=-_)if(h<=_){const x=1/f;d*=x,h*=x,m=d*(d+o*h+2*a)+h*(o*d+h+2*l)+u}else h=s,d=Math.max(0,-(o*h+a)),m=-d*d+h*(h+2*l)+u;else h=-s,d=Math.max(0,-(o*h+a)),m=-d*d+h*(h+2*l)+u;else h<=-_?(d=Math.max(0,-(-o*s+a)),h=d>0?-s:Math.min(Math.max(-s,-l),s),m=-d*d+h*(h+2*l)+u):h<=_?(d=0,h=Math.min(Math.max(-s,-l),s),m=h*(h+2*l)+u):(d=Math.max(0,-(o*s+a)),h=d>0?s:Math.min(Math.max(-s,-l),s),m=-d*d+h*(h+2*l)+u);else h=o>0?-s:s,d=Math.max(0,-(o*h+a)),m=-d*d+h*(h+2*l)+u;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Vu).addScaledVector(ma,h),m}intersectSphere(e,n){ei.subVectors(e.center,this.origin);const i=ei.dot(this.direction),r=ei.dot(ei)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,n):this.at(a,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,a,l;const u=1/this.direction.x,f=1/this.direction.y,d=1/this.direction.z,h=this.origin;return u>=0?(i=(e.min.x-h.x)*u,r=(e.max.x-h.x)*u):(i=(e.max.x-h.x)*u,r=(e.min.x-h.x)*u),f>=0?(s=(e.min.y-h.y)*f,o=(e.max.y-h.y)*f):(s=(e.max.y-h.y)*f,o=(e.min.y-h.y)*f),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(a=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,ei)!==null}intersectTriangle(e,n,i,r,s){Wu.subVectors(n,e),ga.subVectors(i,e),Xu.crossVectors(Wu,ga);let o=this.direction.dot(Xu),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ci.subVectors(this.origin,e);const l=a*this.direction.dot(ga.crossVectors(Ci,ga));if(l<0)return null;const u=a*this.direction.dot(Wu.cross(Ci));if(u<0||l+u>o)return null;const f=-a*Ci.dot(Xu);return f<0?null:this.at(f/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Dt{constructor(e,n,i,r,s,o,a,l,u,f,d,h,m,_,x,p){Dt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,u,f,d,h,m,_,x,p)}set(e,n,i,r,s,o,a,l,u,f,d,h,m,_,x,p){const c=this.elements;return c[0]=e,c[4]=n,c[8]=i,c[12]=r,c[1]=s,c[5]=o,c[9]=a,c[13]=l,c[2]=u,c[6]=f,c[10]=d,c[14]=h,c[3]=m,c[7]=_,c[11]=x,c[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Dt().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/Fr.setFromMatrixColumn(e,0).length(),s=1/Fr.setFromMatrixColumn(e,1).length(),o=1/Fr.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),u=Math.sin(r),f=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const h=o*f,m=o*d,_=a*f,x=a*d;n[0]=l*f,n[4]=-l*d,n[8]=u,n[1]=m+_*u,n[5]=h-x*u,n[9]=-a*l,n[2]=x-h*u,n[6]=_+m*u,n[10]=o*l}else if(e.order==="YXZ"){const h=l*f,m=l*d,_=u*f,x=u*d;n[0]=h+x*a,n[4]=_*a-m,n[8]=o*u,n[1]=o*d,n[5]=o*f,n[9]=-a,n[2]=m*a-_,n[6]=x+h*a,n[10]=o*l}else if(e.order==="ZXY"){const h=l*f,m=l*d,_=u*f,x=u*d;n[0]=h-x*a,n[4]=-o*d,n[8]=_+m*a,n[1]=m+_*a,n[5]=o*f,n[9]=x-h*a,n[2]=-o*u,n[6]=a,n[10]=o*l}else if(e.order==="ZYX"){const h=o*f,m=o*d,_=a*f,x=a*d;n[0]=l*f,n[4]=_*u-m,n[8]=h*u+x,n[1]=l*d,n[5]=x*u+h,n[9]=m*u-_,n[2]=-u,n[6]=a*l,n[10]=o*l}else if(e.order==="YZX"){const h=o*l,m=o*u,_=a*l,x=a*u;n[0]=l*f,n[4]=x-h*d,n[8]=_*d+m,n[1]=d,n[5]=o*f,n[9]=-a*f,n[2]=-u*f,n[6]=m*d+_,n[10]=h-x*d}else if(e.order==="XZY"){const h=o*l,m=o*u,_=a*l,x=a*u;n[0]=l*f,n[4]=-d,n[8]=u*f,n[1]=h*d+x,n[5]=o*f,n[9]=m*d-_,n[2]=_*d-m,n[6]=a*f,n[10]=x*d+h}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(tM,e,nM)}lookAt(e,n,i){const r=this.elements;return on.subVectors(e,n),on.lengthSq()===0&&(on.z=1),on.normalize(),Pi.crossVectors(i,on),Pi.lengthSq()===0&&(Math.abs(i.z)===1?on.x+=1e-4:on.z+=1e-4,on.normalize(),Pi.crossVectors(i,on)),Pi.normalize(),va.crossVectors(on,Pi),r[0]=Pi.x,r[4]=va.x,r[8]=on.x,r[1]=Pi.y,r[5]=va.y,r[9]=on.y,r[2]=Pi.z,r[6]=va.z,r[10]=on.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],l=i[8],u=i[12],f=i[1],d=i[5],h=i[9],m=i[13],_=i[2],x=i[6],p=i[10],c=i[14],v=i[3],g=i[7],y=i[11],C=i[15],R=r[0],A=r[4],U=r[8],E=r[12],T=r[1],W=r[5],j=r[9],ie=r[13],L=r[2],z=r[6],Y=r[10],$=r[14],b=r[3],N=r[7],H=r[11],K=r[15];return s[0]=o*R+a*T+l*L+u*b,s[4]=o*A+a*W+l*z+u*N,s[8]=o*U+a*j+l*Y+u*H,s[12]=o*E+a*ie+l*$+u*K,s[1]=f*R+d*T+h*L+m*b,s[5]=f*A+d*W+h*z+m*N,s[9]=f*U+d*j+h*Y+m*H,s[13]=f*E+d*ie+h*$+m*K,s[2]=_*R+x*T+p*L+c*b,s[6]=_*A+x*W+p*z+c*N,s[10]=_*U+x*j+p*Y+c*H,s[14]=_*E+x*ie+p*$+c*K,s[3]=v*R+g*T+y*L+C*b,s[7]=v*A+g*W+y*z+C*N,s[11]=v*U+g*j+y*Y+C*H,s[15]=v*E+g*ie+y*$+C*K,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],u=e[13],f=e[2],d=e[6],h=e[10],m=e[14],_=e[3],x=e[7],p=e[11],c=e[15];return _*(+s*l*d-r*u*d-s*a*h+i*u*h+r*a*m-i*l*m)+x*(+n*l*m-n*u*h+s*o*h-r*o*m+r*u*f-s*l*f)+p*(+n*u*d-n*a*m-s*o*d+i*o*m+s*a*f-i*u*f)+c*(-r*a*f-n*l*d+n*a*h+r*o*d-i*o*h+i*l*f)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],f=e[8],d=e[9],h=e[10],m=e[11],_=e[12],x=e[13],p=e[14],c=e[15],v=d*p*u-x*h*u+x*l*m-a*p*m-d*l*c+a*h*c,g=_*h*u-f*p*u-_*l*m+o*p*m+f*l*c-o*h*c,y=f*x*u-_*d*u+_*a*m-o*x*m-f*a*c+o*d*c,C=_*d*l-f*x*l-_*a*h+o*x*h+f*a*p-o*d*p,R=n*v+i*g+r*y+s*C;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/R;return e[0]=v*A,e[1]=(x*h*s-d*p*s-x*r*m+i*p*m+d*r*c-i*h*c)*A,e[2]=(a*p*s-x*l*s+x*r*u-i*p*u-a*r*c+i*l*c)*A,e[3]=(d*l*s-a*h*s-d*r*u+i*h*u+a*r*m-i*l*m)*A,e[4]=g*A,e[5]=(f*p*s-_*h*s+_*r*m-n*p*m-f*r*c+n*h*c)*A,e[6]=(_*l*s-o*p*s-_*r*u+n*p*u+o*r*c-n*l*c)*A,e[7]=(o*h*s-f*l*s+f*r*u-n*h*u-o*r*m+n*l*m)*A,e[8]=y*A,e[9]=(_*d*s-f*x*s-_*i*m+n*x*m+f*i*c-n*d*c)*A,e[10]=(o*x*s-_*a*s+_*i*u-n*x*u-o*i*c+n*a*c)*A,e[11]=(f*a*s-o*d*s-f*i*u+n*d*u+o*i*m-n*a*m)*A,e[12]=C*A,e[13]=(f*x*r-_*d*r+_*i*h-n*x*h-f*i*p+n*d*p)*A,e[14]=(_*a*r-o*x*r-_*i*l+n*x*l+o*i*p-n*a*p)*A,e[15]=(o*d*r-f*a*r+f*i*l-n*d*l-o*i*h+n*a*h)*A,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,a=e.y,l=e.z,u=s*o,f=s*a;return this.set(u*o+i,u*a-r*l,u*l+r*a,0,u*a+r*l,f*a+i,f*l-r*o,0,u*l-r*a,f*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,l=n._w,u=s+s,f=o+o,d=a+a,h=s*u,m=s*f,_=s*d,x=o*f,p=o*d,c=a*d,v=l*u,g=l*f,y=l*d,C=i.x,R=i.y,A=i.z;return r[0]=(1-(x+c))*C,r[1]=(m+y)*C,r[2]=(_-g)*C,r[3]=0,r[4]=(m-y)*R,r[5]=(1-(h+c))*R,r[6]=(p+v)*R,r[7]=0,r[8]=(_+g)*A,r[9]=(p-v)*A,r[10]=(1-(h+x))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=Fr.set(r[0],r[1],r[2]).length();const o=Fr.set(r[4],r[5],r[6]).length(),a=Fr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Pn.copy(this);const u=1/s,f=1/o,d=1/a;return Pn.elements[0]*=u,Pn.elements[1]*=u,Pn.elements[2]*=u,Pn.elements[4]*=f,Pn.elements[5]*=f,Pn.elements[6]*=f,Pn.elements[8]*=d,Pn.elements[9]*=d,Pn.elements[10]*=d,n.setFromRotationMatrix(Pn),i.x=s,i.y=o,i.z=a,this}makePerspective(e,n,i,r,s,o,a=fi){const l=this.elements,u=2*s/(n-e),f=2*s/(i-r),d=(n+e)/(n-e),h=(i+r)/(i-r);let m,_;if(a===fi)m=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===Tl)m=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=f,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,r,s,o,a=fi){const l=this.elements,u=1/(n-e),f=1/(i-r),d=1/(o-s),h=(n+e)*u,m=(i+r)*f;let _,x;if(a===fi)_=(o+s)*d,x=-2*d;else if(a===Tl)_=s*d,x=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*u,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*f,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=x,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const Fr=new F,Pn=new Dt,tM=new F(0,0,0),nM=new F(1,1,1),Pi=new F,va=new F,on=new F,Rp=new Dt,Cp=new Ho;class $l{constructor(e=0,n=0,i=0,r=$l.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],u=r[5],f=r[9],d=r[2],h=r[6],m=r[10];switch(n){case"XYZ":this._y=Math.asin(jt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-f,m),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,u),this._z=0);break;case"YXZ":this._x=Math.asin(-jt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(jt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-o,u)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-jt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,u));break;case"YZX":this._z=Math.asin(jt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,u),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-jt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,u),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-f,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Rp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Rp,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Cp.setFromEuler(this),this.setFromQuaternion(Cp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}$l.DEFAULT_ORDER="XYZ";class s_{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let iM=0;const Pp=new F,Or=new Ho,ti=new Dt,_a=new F,$s=new F,rM=new F,sM=new Ho,Lp=new F(1,0,0),bp=new F(0,1,0),Dp=new F(0,0,1),oM={type:"added"},aM={type:"removed"};class dn extends Us{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:iM++}),this.uuid=Ns(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=dn.DEFAULT_UP.clone();const e=new F,n=new $l,i=new Ho,r=new F(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Dt},normalMatrix:{value:new Ve}}),this.matrix=new Dt,this.matrixWorld=new Dt,this.matrixAutoUpdate=dn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=dn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new s_,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Or.setFromAxisAngle(e,n),this.quaternion.multiply(Or),this}rotateOnWorldAxis(e,n){return Or.setFromAxisAngle(e,n),this.quaternion.premultiply(Or),this}rotateX(e){return this.rotateOnAxis(Lp,e)}rotateY(e){return this.rotateOnAxis(bp,e)}rotateZ(e){return this.rotateOnAxis(Dp,e)}translateOnAxis(e,n){return Pp.copy(e).applyQuaternion(this.quaternion),this.position.add(Pp.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Lp,e)}translateY(e){return this.translateOnAxis(bp,e)}translateZ(e){return this.translateOnAxis(Dp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ti.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?_a.copy(e):_a.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),$s.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ti.lookAt($s,_a,this.up):ti.lookAt(_a,$s,this.up),this.quaternion.setFromRotationMatrix(ti),r&&(ti.extractRotation(r.matrixWorld),Or.setFromRotationMatrix(ti),this.quaternion.premultiply(Or.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(oM)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(aM)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ti.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ti.multiply(e.parent.matrixWorld)),e.applyMatrix4(ti),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($s,e,rM),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($s,sM,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++){const s=n[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),n===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++){const a=r[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let u=0,f=l.length;u<f;u++){const d=l[u];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,u=this.material.length;l<u;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(n){const a=o(e.geometries),l=o(e.materials),u=o(e.textures),f=o(e.images),d=o(e.shapes),h=o(e.skeletons),m=o(e.animations),_=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),u.length>0&&(i.textures=u),f.length>0&&(i.images=f),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),m.length>0&&(i.animations=m),_.length>0&&(i.nodes=_)}return i.object=r,i;function o(a){const l=[];for(const u in a){const f=a[u];delete f.metadata,l.push(f)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}dn.DEFAULT_UP=new F(0,1,0);dn.DEFAULT_MATRIX_AUTO_UPDATE=!0;dn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ln=new F,ni=new F,Yu=new F,ii=new F,kr=new F,Br=new F,Up=new F,ju=new F,$u=new F,qu=new F;let xa=!1;class Nn{constructor(e=new F,n=new F,i=new F){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Ln.subVectors(e,n),r.cross(Ln);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){Ln.subVectors(r,n),ni.subVectors(i,n),Yu.subVectors(e,n);const o=Ln.dot(Ln),a=Ln.dot(ni),l=Ln.dot(Yu),u=ni.dot(ni),f=ni.dot(Yu),d=o*u-a*a;if(d===0)return s.set(0,0,0),null;const h=1/d,m=(u*l-a*f)*h,_=(o*f-a*l)*h;return s.set(1-m-_,_,m)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,ii)===null?!1:ii.x>=0&&ii.y>=0&&ii.x+ii.y<=1}static getUV(e,n,i,r,s,o,a,l){return xa===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),xa=!0),this.getInterpolation(e,n,i,r,s,o,a,l)}static getInterpolation(e,n,i,r,s,o,a,l){return this.getBarycoord(e,n,i,r,ii)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ii.x),l.addScaledVector(o,ii.y),l.addScaledVector(a,ii.z),l)}static isFrontFacing(e,n,i,r){return Ln.subVectors(i,n),ni.subVectors(e,n),Ln.cross(ni).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ln.subVectors(this.c,this.b),ni.subVectors(this.a,this.b),Ln.cross(ni).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Nn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Nn.getBarycoord(e,this.a,this.b,this.c,n)}getUV(e,n,i,r,s){return xa===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),xa=!0),Nn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}getInterpolation(e,n,i,r,s){return Nn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return Nn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Nn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let o,a;kr.subVectors(r,i),Br.subVectors(s,i),ju.subVectors(e,i);const l=kr.dot(ju),u=Br.dot(ju);if(l<=0&&u<=0)return n.copy(i);$u.subVectors(e,r);const f=kr.dot($u),d=Br.dot($u);if(f>=0&&d<=f)return n.copy(r);const h=l*d-f*u;if(h<=0&&l>=0&&f<=0)return o=l/(l-f),n.copy(i).addScaledVector(kr,o);qu.subVectors(e,s);const m=kr.dot(qu),_=Br.dot(qu);if(_>=0&&m<=_)return n.copy(s);const x=m*u-l*_;if(x<=0&&u>=0&&_<=0)return a=u/(u-_),n.copy(i).addScaledVector(Br,a);const p=f*_-m*d;if(p<=0&&d-f>=0&&m-_>=0)return Up.subVectors(s,r),a=(d-f)/(d-f+(m-_)),n.copy(r).addScaledVector(Up,a);const c=1/(p+x+h);return o=x*c,a=h*c,n.copy(i).addScaledVector(kr,o).addScaledVector(Br,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const o_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Li={h:0,s:0,l:0},ya={h:0,s:0,l:0};function Ku(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class je{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Pt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=Qe.workingColorSpace){return this.r=e,this.g=n,this.b=i,Qe.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=Qe.workingColorSpace){if(e=md(e,1),n=jt(n,0,1),i=jt(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=Ku(o,s,e+1/3),this.g=Ku(o,s,e),this.b=Ku(o,s,e-1/3)}return Qe.toWorkingColorSpace(this,r),this}setStyle(e,n=Pt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Pt){const i=o_[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ms(e.r),this.g=ms(e.g),this.b=ms(e.b),this}copyLinearToSRGB(e){return this.r=ku(e.r),this.g=ku(e.g),this.b=ku(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Pt){return Qe.fromWorkingColorSpace(kt.copy(this),e),Math.round(jt(kt.r*255,0,255))*65536+Math.round(jt(kt.g*255,0,255))*256+Math.round(jt(kt.b*255,0,255))}getHexString(e=Pt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=Qe.workingColorSpace){Qe.fromWorkingColorSpace(kt.copy(this),n);const i=kt.r,r=kt.g,s=kt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,u;const f=(a+o)/2;if(a===o)l=0,u=0;else{const d=o-a;switch(u=f<=.5?d/(o+a):d/(2-o-a),o){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=u,e.l=f,e}getRGB(e,n=Qe.workingColorSpace){return Qe.fromWorkingColorSpace(kt.copy(this),n),e.r=kt.r,e.g=kt.g,e.b=kt.b,e}getStyle(e=Pt){Qe.fromWorkingColorSpace(kt.copy(this),e);const n=kt.r,i=kt.g,r=kt.b;return e!==Pt?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Li),this.setHSL(Li.h+e,Li.s+n,Li.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Li),e.getHSL(ya);const i=co(Li.h,ya.h,n),r=co(Li.s,ya.s,n),s=co(Li.l,ya.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const kt=new je;je.NAMES=o_;let lM=0;class ql extends Us{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:lM++}),this.uuid=Ns(),this.name="",this.type="Material",this.blending=ps,this.side=Qi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=nf,this.blendDst=rf,this.blendEquation=dr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new je(0,0,0),this.blendAlpha=0,this.depthFunc=yl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_p,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=br,this.stencilZFail=br,this.stencilZPass=br,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ps&&(i.blending=this.blending),this.side!==Qi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==nf&&(i.blendSrc=this.blendSrc),this.blendDst!==rf&&(i.blendDst=this.blendDst),this.blendEquation!==dr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==yl&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==_p&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==br&&(i.stencilFail=this.stencilFail),this.stencilZFail!==br&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==br&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(n){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class vd extends ql{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Wv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const gt=new F,Sa=new Ie;class Qn{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=xp,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=ki,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Sa.fromBufferAttribute(this,n),Sa.applyMatrix3(e),this.setXY(n,Sa.x,Sa.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)gt.fromBufferAttribute(this,n),gt.applyMatrix3(e),this.setXYZ(n,gt.x,gt.y,gt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)gt.fromBufferAttribute(this,n),gt.applyMatrix4(e),this.setXYZ(n,gt.x,gt.y,gt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)gt.fromBufferAttribute(this,n),gt.applyNormalMatrix(e),this.setXYZ(n,gt.x,gt.y,gt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)gt.fromBufferAttribute(this,n),gt.transformDirection(e),this.setXYZ(n,gt.x,gt.y,gt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=jr(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=Vt(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=jr(n,this.array)),n}setX(e,n){return this.normalized&&(n=Vt(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=jr(n,this.array)),n}setY(e,n){return this.normalized&&(n=Vt(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=jr(n,this.array)),n}setZ(e,n){return this.normalized&&(n=Vt(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=jr(n,this.array)),n}setW(e,n){return this.normalized&&(n=Vt(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=Vt(n,this.array),i=Vt(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=Vt(n,this.array),i=Vt(i,this.array),r=Vt(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=Vt(n,this.array),i=Vt(i,this.array),r=Vt(r,this.array),s=Vt(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==xp&&(e.usage=this.usage),e}}class a_ extends Qn{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class l_ extends Qn{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class gi extends Qn{constructor(e,n,i){super(new Float32Array(e),n,i)}}let uM=0;const vn=new Dt,Qu=new dn,zr=new F,an=new Go,qs=new Go,wt=new F;class tr extends Us{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:uM++}),this.uuid=Ns(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(t_(e)?l_:a_)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ve().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return vn.makeRotationFromQuaternion(e),this.applyMatrix4(vn),this}rotateX(e){return vn.makeRotationX(e),this.applyMatrix4(vn),this}rotateY(e){return vn.makeRotationY(e),this.applyMatrix4(vn),this}rotateZ(e){return vn.makeRotationZ(e),this.applyMatrix4(vn),this}translate(e,n,i){return vn.makeTranslation(e,n,i),this.applyMatrix4(vn),this}scale(e,n,i){return vn.makeScale(e,n,i),this.applyMatrix4(vn),this}lookAt(e){return Qu.lookAt(e),Qu.updateMatrix(),this.applyMatrix4(Qu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(zr).negate(),this.translate(zr.x,zr.y,zr.z),this}setFromPoints(e){const n=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];n.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new gi(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Go);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];an.setFromBufferAttribute(s),this.morphTargetsRelative?(wt.addVectors(this.boundingBox.min,an.min),this.boundingBox.expandByPoint(wt),wt.addVectors(this.boundingBox.max,an.max),this.boundingBox.expandByPoint(wt)):(this.boundingBox.expandByPoint(an.min),this.boundingBox.expandByPoint(an.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new gd);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new F,1/0);return}if(e){const i=this.boundingSphere.center;if(an.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];qs.setFromBufferAttribute(a),this.morphTargetsRelative?(wt.addVectors(an.min,qs.min),an.expandByPoint(wt),wt.addVectors(an.max,qs.max),an.expandByPoint(wt)):(an.expandByPoint(qs.min),an.expandByPoint(qs.max))}an.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)wt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(wt));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],l=this.morphTargetsRelative;for(let u=0,f=a.count;u<f;u++)wt.fromBufferAttribute(a,u),l&&(zr.fromBufferAttribute(e,u),wt.add(zr)),r=Math.max(r,i.distanceToSquared(wt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=n.position.array,s=n.normal.array,o=n.uv.array,a=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Qn(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,u=[],f=[];for(let T=0;T<a;T++)u[T]=new F,f[T]=new F;const d=new F,h=new F,m=new F,_=new Ie,x=new Ie,p=new Ie,c=new F,v=new F;function g(T,W,j){d.fromArray(r,T*3),h.fromArray(r,W*3),m.fromArray(r,j*3),_.fromArray(o,T*2),x.fromArray(o,W*2),p.fromArray(o,j*2),h.sub(d),m.sub(d),x.sub(_),p.sub(_);const ie=1/(x.x*p.y-p.x*x.y);isFinite(ie)&&(c.copy(h).multiplyScalar(p.y).addScaledVector(m,-x.y).multiplyScalar(ie),v.copy(m).multiplyScalar(x.x).addScaledVector(h,-p.x).multiplyScalar(ie),u[T].add(c),u[W].add(c),u[j].add(c),f[T].add(v),f[W].add(v),f[j].add(v))}let y=this.groups;y.length===0&&(y=[{start:0,count:i.length}]);for(let T=0,W=y.length;T<W;++T){const j=y[T],ie=j.start,L=j.count;for(let z=ie,Y=ie+L;z<Y;z+=3)g(i[z+0],i[z+1],i[z+2])}const C=new F,R=new F,A=new F,U=new F;function E(T){A.fromArray(s,T*3),U.copy(A);const W=u[T];C.copy(W),C.sub(A.multiplyScalar(A.dot(W))).normalize(),R.crossVectors(U,W);const ie=R.dot(f[T])<0?-1:1;l[T*4]=C.x,l[T*4+1]=C.y,l[T*4+2]=C.z,l[T*4+3]=ie}for(let T=0,W=y.length;T<W;++T){const j=y[T],ie=j.start,L=j.count;for(let z=ie,Y=ie+L;z<Y;z+=3)E(i[z+0]),E(i[z+1]),E(i[z+2])}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Qn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let h=0,m=i.count;h<m;h++)i.setXYZ(h,0,0,0);const r=new F,s=new F,o=new F,a=new F,l=new F,u=new F,f=new F,d=new F;if(e)for(let h=0,m=e.count;h<m;h+=3){const _=e.getX(h+0),x=e.getX(h+1),p=e.getX(h+2);r.fromBufferAttribute(n,_),s.fromBufferAttribute(n,x),o.fromBufferAttribute(n,p),f.subVectors(o,s),d.subVectors(r,s),f.cross(d),a.fromBufferAttribute(i,_),l.fromBufferAttribute(i,x),u.fromBufferAttribute(i,p),a.add(f),l.add(f),u.add(f),i.setXYZ(_,a.x,a.y,a.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(p,u.x,u.y,u.z)}else for(let h=0,m=n.count;h<m;h+=3)r.fromBufferAttribute(n,h+0),s.fromBufferAttribute(n,h+1),o.fromBufferAttribute(n,h+2),f.subVectors(o,s),d.subVectors(r,s),f.cross(d),i.setXYZ(h+0,f.x,f.y,f.z),i.setXYZ(h+1,f.x,f.y,f.z),i.setXYZ(h+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)wt.fromBufferAttribute(e,n),wt.normalize(),e.setXYZ(n,wt.x,wt.y,wt.z)}toNonIndexed(){function e(a,l){const u=a.array,f=a.itemSize,d=a.normalized,h=new u.constructor(l.length*f);let m=0,_=0;for(let x=0,p=l.length;x<p;x++){a.isInterleavedBufferAttribute?m=l[x]*a.data.stride+a.offset:m=l[x]*f;for(let c=0;c<f;c++)h[_++]=u[m++]}return new Qn(h,f,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new tr,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],u=e(l,i);n.setAttribute(a,u)}const s=this.morphAttributes;for(const a in s){const l=[],u=s[a];for(let f=0,d=u.length;f<d;f++){const h=u[f],m=e(h,i);l.push(m)}n.morphAttributes[a]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const u=o[a];n.addGroup(u.start,u.count,u.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const u in l)l[u]!==void 0&&(e[u]=l[u]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const u=i[l];e.data.attributes[l]=u.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const u=this.morphAttributes[l],f=[];for(let d=0,h=u.length;d<h;d++){const m=u[d];f.push(m.toJSON(e.data))}f.length>0&&(r[l]=f,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const u in r){const f=r[u];this.setAttribute(u,f.clone(n))}const s=e.morphAttributes;for(const u in s){const f=[],d=s[u];for(let h=0,m=d.length;h<m;h++)f.push(d[h].clone(n));this.morphAttributes[u]=f}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let u=0,f=o.length;u<f;u++){const d=o[u];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Np=new Dt,or=new eM,Ea=new gd,Ip=new F,Hr=new F,Gr=new F,Vr=new F,Zu=new F,Ma=new F,Ta=new Ie,wa=new Ie,Aa=new Ie,Fp=new F,Op=new F,kp=new F,Ra=new F,Ca=new F;class $n extends dn{constructor(e=new tr,n=new vd){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Ma.set(0,0,0);for(let l=0,u=s.length;l<u;l++){const f=a[l],d=s[l];f!==0&&(Zu.fromBufferAttribute(d,e),o?Ma.addScaledVector(Zu,f):Ma.addScaledVector(Zu.sub(n),f))}n.add(Ma)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ea.copy(i.boundingSphere),Ea.applyMatrix4(s),or.copy(e.ray).recast(e.near),!(Ea.containsPoint(or.origin)===!1&&(or.intersectSphere(Ea,Ip)===null||or.origin.distanceToSquared(Ip)>(e.far-e.near)**2))&&(Np.copy(s).invert(),or.copy(e.ray).applyMatrix4(Np),!(i.boundingBox!==null&&or.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,or)))}_computeIntersections(e,n,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,u=s.attributes.uv,f=s.attributes.uv1,d=s.attributes.normal,h=s.groups,m=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,x=h.length;_<x;_++){const p=h[_],c=o[p.materialIndex],v=Math.max(p.start,m.start),g=Math.min(a.count,Math.min(p.start+p.count,m.start+m.count));for(let y=v,C=g;y<C;y+=3){const R=a.getX(y),A=a.getX(y+1),U=a.getX(y+2);r=Pa(this,c,e,i,u,f,d,R,A,U),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=p.materialIndex,n.push(r))}}else{const _=Math.max(0,m.start),x=Math.min(a.count,m.start+m.count);for(let p=_,c=x;p<c;p+=3){const v=a.getX(p),g=a.getX(p+1),y=a.getX(p+2);r=Pa(this,o,e,i,u,f,d,v,g,y),r&&(r.faceIndex=Math.floor(p/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,x=h.length;_<x;_++){const p=h[_],c=o[p.materialIndex],v=Math.max(p.start,m.start),g=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let y=v,C=g;y<C;y+=3){const R=y,A=y+1,U=y+2;r=Pa(this,c,e,i,u,f,d,R,A,U),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=p.materialIndex,n.push(r))}}else{const _=Math.max(0,m.start),x=Math.min(l.count,m.start+m.count);for(let p=_,c=x;p<c;p+=3){const v=p,g=p+1,y=p+2;r=Pa(this,o,e,i,u,f,d,v,g,y),r&&(r.faceIndex=Math.floor(p/3),n.push(r))}}}}function cM(t,e,n,i,r,s,o,a){let l;if(e.side===rn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Qi,a),l===null)return null;Ca.copy(a),Ca.applyMatrix4(t.matrixWorld);const u=n.ray.origin.distanceTo(Ca);return u<n.near||u>n.far?null:{distance:u,point:Ca.clone(),object:t}}function Pa(t,e,n,i,r,s,o,a,l,u){t.getVertexPosition(a,Hr),t.getVertexPosition(l,Gr),t.getVertexPosition(u,Vr);const f=cM(t,e,n,i,Hr,Gr,Vr,Ra);if(f){r&&(Ta.fromBufferAttribute(r,a),wa.fromBufferAttribute(r,l),Aa.fromBufferAttribute(r,u),f.uv=Nn.getInterpolation(Ra,Hr,Gr,Vr,Ta,wa,Aa,new Ie)),s&&(Ta.fromBufferAttribute(s,a),wa.fromBufferAttribute(s,l),Aa.fromBufferAttribute(s,u),f.uv1=Nn.getInterpolation(Ra,Hr,Gr,Vr,Ta,wa,Aa,new Ie),f.uv2=f.uv1),o&&(Fp.fromBufferAttribute(o,a),Op.fromBufferAttribute(o,l),kp.fromBufferAttribute(o,u),f.normal=Nn.getInterpolation(Ra,Hr,Gr,Vr,Fp,Op,kp,new F),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));const d={a,b:l,c:u,normal:new F,materialIndex:0};Nn.getNormal(Hr,Gr,Vr,d.normal),f.face=d}return f}class Vo extends tr{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],u=[],f=[],d=[];let h=0,m=0;_("z","y","x",-1,-1,i,n,e,o,s,0),_("z","y","x",1,-1,i,n,-e,o,s,1),_("x","z","y",1,1,e,i,n,r,o,2),_("x","z","y",1,-1,e,i,-n,r,o,3),_("x","y","z",1,-1,e,n,i,r,s,4),_("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new gi(u,3)),this.setAttribute("normal",new gi(f,3)),this.setAttribute("uv",new gi(d,2));function _(x,p,c,v,g,y,C,R,A,U,E){const T=y/A,W=C/U,j=y/2,ie=C/2,L=R/2,z=A+1,Y=U+1;let $=0,b=0;const N=new F;for(let H=0;H<Y;H++){const K=H*W-ie;for(let Z=0;Z<z;Z++){const X=Z*T-j;N[x]=X*v,N[p]=K*g,N[c]=L,u.push(N.x,N.y,N.z),N[x]=0,N[p]=0,N[c]=R>0?1:-1,f.push(N.x,N.y,N.z),d.push(Z/A),d.push(1-H/U),$+=1}}for(let H=0;H<U;H++)for(let K=0;K<A;K++){const Z=h+K+z*H,X=h+K+z*(H+1),Q=h+(K+1)+z*(H+1),le=h+(K+1)+z*H;l.push(Z,X,le),l.push(X,Q,le),b+=6}a.addGroup(m,b,E),m+=b,h+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vo(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function As(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function Wt(t){const e={};for(let n=0;n<t.length;n++){const i=As(t[n]);for(const r in i)e[r]=i[r]}return e}function fM(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function u_(t){return t.getRenderTarget()===null?t.outputColorSpace:Qe.workingColorSpace}const Rl={clone:As,merge:Wt};var dM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,hM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Jt extends ql{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=dM,this.fragmentShader=hM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=As(e.uniforms),this.uniformsGroups=fM(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class c_ extends dn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Dt,this.projectionMatrix=new Dt,this.projectionMatrixInverse=new Dt,this.coordinateSystem=fi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class In extends c_{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Do*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(uo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Do*2*Math.atan(Math.tan(uo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(uo*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,u=o.fullHeight;s+=o.offsetX*r/l,n-=o.offsetY*i/u,r*=o.width/l,i*=o.height/u}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Wr=-90,Xr=1;class pM extends dn{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new In(Wr,Xr,e,n);r.layers=this.layers,this.add(r);const s=new In(Wr,Xr,e,n);s.layers=this.layers,this.add(s);const o=new In(Wr,Xr,e,n);o.layers=this.layers,this.add(o);const a=new In(Wr,Xr,e,n);a.layers=this.layers,this.add(a);const l=new In(Wr,Xr,e,n);l.layers=this.layers,this.add(l);const u=new In(Wr,Xr,e,n);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,l]=n;for(const u of n)this.remove(u);if(e===fi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Tl)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of n)this.add(u),u.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,u,f]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,o),e.setRenderTarget(i,2,r),e.render(n,a),e.setRenderTarget(i,3,r),e.render(n,l),e.setRenderTarget(i,4,r),e.render(n,u),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),e.render(n,f),e.setRenderTarget(d,h,m),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class f_ extends fn{constructor(e,n,i,r,s,o,a,l,u,f){e=e!==void 0?e:[],n=n!==void 0?n:Ms,super(e,n,i,r,s,o,a,l,u,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class mM extends zn{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];n.encoding!==void 0&&(fo("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Sr?Pt:Sn),this.texture=new f_(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:yn}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Vo(5,5,5),s=new Jt({name:"CubemapFromEquirect",uniforms:As(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:rn,blending:pi});s.uniforms.tEquirect.value=n;const o=new $n(r,s),a=n.minFilter;return n.minFilter===bo&&(n.minFilter=yn),new pM(1,10,this).update(e,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}}const Ju=new F,gM=new F,vM=new Ve;class cr{constructor(e=new F(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=Ju.subVectors(i,n).cross(gM.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(Ju),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||vM.getNormalMatrix(e),r=this.coplanarPoint(Ju).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ar=new gd,La=new F;class d_{constructor(e=new cr,n=new cr,i=new cr,r=new cr,s=new cr,o=new cr){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=fi){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],u=r[4],f=r[5],d=r[6],h=r[7],m=r[8],_=r[9],x=r[10],p=r[11],c=r[12],v=r[13],g=r[14],y=r[15];if(i[0].setComponents(l-s,h-u,p-m,y-c).normalize(),i[1].setComponents(l+s,h+u,p+m,y+c).normalize(),i[2].setComponents(l+o,h+f,p+_,y+v).normalize(),i[3].setComponents(l-o,h-f,p-_,y-v).normalize(),i[4].setComponents(l-a,h-d,p-x,y-g).normalize(),n===fi)i[5].setComponents(l+a,h+d,p+x,y+g).normalize();else if(n===Tl)i[5].setComponents(a,d,x,g).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ar.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),ar.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ar)}intersectsSprite(e){return ar.center.set(0,0,0),ar.radius=.7071067811865476,ar.applyMatrix4(e.matrixWorld),this.intersectsSphere(ar)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(La.x=r.normal.x>0?e.max.x:e.min.x,La.y=r.normal.y>0?e.max.y:e.min.y,La.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(La)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function h_(){let t=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function _M(t,e){const n=e.isWebGL2,i=new WeakMap;function r(u,f){const d=u.array,h=u.usage,m=d.byteLength,_=t.createBuffer();t.bindBuffer(f,_),t.bufferData(f,d,h),u.onUploadCallback();let x;if(d instanceof Float32Array)x=t.FLOAT;else if(d instanceof Uint16Array)if(u.isFloat16BufferAttribute)if(n)x=t.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else x=t.UNSIGNED_SHORT;else if(d instanceof Int16Array)x=t.SHORT;else if(d instanceof Uint32Array)x=t.UNSIGNED_INT;else if(d instanceof Int32Array)x=t.INT;else if(d instanceof Int8Array)x=t.BYTE;else if(d instanceof Uint8Array)x=t.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)x=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:_,type:x,bytesPerElement:d.BYTES_PER_ELEMENT,version:u.version,size:m}}function s(u,f,d){const h=f.array,m=f._updateRange,_=f.updateRanges;if(t.bindBuffer(d,u),m.count===-1&&_.length===0&&t.bufferSubData(d,0,h),_.length!==0){for(let x=0,p=_.length;x<p;x++){const c=_[x];n?t.bufferSubData(d,c.start*h.BYTES_PER_ELEMENT,h,c.start,c.count):t.bufferSubData(d,c.start*h.BYTES_PER_ELEMENT,h.subarray(c.start,c.start+c.count))}f.clearUpdateRanges()}m.count!==-1&&(n?t.bufferSubData(d,m.offset*h.BYTES_PER_ELEMENT,h,m.offset,m.count):t.bufferSubData(d,m.offset*h.BYTES_PER_ELEMENT,h.subarray(m.offset,m.offset+m.count)),m.count=-1),f.onUploadCallback()}function o(u){return u.isInterleavedBufferAttribute&&(u=u.data),i.get(u)}function a(u){u.isInterleavedBufferAttribute&&(u=u.data);const f=i.get(u);f&&(t.deleteBuffer(f.buffer),i.delete(u))}function l(u,f){if(u.isGLBufferAttribute){const h=i.get(u);(!h||h.version<u.version)&&i.set(u,{buffer:u.buffer,type:u.type,bytesPerElement:u.elementSize,version:u.version});return}u.isInterleavedBufferAttribute&&(u=u.data);const d=i.get(u);if(d===void 0)i.set(u,r(u,f));else if(d.version<u.version){if(d.size!==u.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(d.buffer,u,f),d.version=u.version}}return{get:o,remove:a,update:l}}class Kl extends tr{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,o=n/2,a=Math.floor(i),l=Math.floor(r),u=a+1,f=l+1,d=e/a,h=n/l,m=[],_=[],x=[],p=[];for(let c=0;c<f;c++){const v=c*h-o;for(let g=0;g<u;g++){const y=g*d-s;_.push(y,-v,0),x.push(0,0,1),p.push(g/a),p.push(1-c/l)}}for(let c=0;c<l;c++)for(let v=0;v<a;v++){const g=v+u*c,y=v+u*(c+1),C=v+1+u*(c+1),R=v+1+u*c;m.push(g,y,R),m.push(y,C,R)}this.setIndex(m),this.setAttribute("position",new gi(_,3)),this.setAttribute("normal",new gi(x,3)),this.setAttribute("uv",new gi(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Kl(e.width,e.height,e.widthSegments,e.heightSegments)}}var xM=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,yM=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,SM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,EM=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,MM=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,TM=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,wM=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,AM=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,RM=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,CM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,PM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,LM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bM=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,DM=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,UM=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,NM=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,IM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,FM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,OM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,kM=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,BM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,zM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,HM=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,GM=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,VM=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,WM=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,XM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,YM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,jM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,$M=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,qM="gl_FragColor = linearToOutputTexel( gl_FragColor );",KM=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,QM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ZM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,JM=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,eT=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,tT=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,nT=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,iT=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,rT=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,sT=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,oT=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,aT=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,lT=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,uT=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,cT=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,fT=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,dT=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,hT=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,pT=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,mT=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,gT=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,vT=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,_T=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,xT=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,yT=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,ST=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ET=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,MT=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,TT=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,wT=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,AT=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,RT=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,CT=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,PT=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,LT=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,bT=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,DT=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,UT=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,NT=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,IT=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,FT=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,OT=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,kT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,BT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zT=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,HT=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,GT=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,VT=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,WT=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,XT=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,YT=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,jT=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,$T=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,qT=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,KT=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,QT=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ZT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,JT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ew=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,tw=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,nw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,iw=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,rw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,sw=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ow=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,aw=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,lw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,uw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,cw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,fw=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,dw=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,hw=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,pw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,mw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,gw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,vw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const _w=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,xw=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sw=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ew=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ww=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Aw=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Rw=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Cw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Pw=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lw=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,bw=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Dw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Uw=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Nw=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Iw=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fw=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Ow=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kw=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Bw=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,zw=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Hw=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gw=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Vw=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ww=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xw=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yw=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,jw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,$w=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qw=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Kw=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Qw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ze={alphahash_fragment:xM,alphahash_pars_fragment:yM,alphamap_fragment:SM,alphamap_pars_fragment:EM,alphatest_fragment:MM,alphatest_pars_fragment:TM,aomap_fragment:wM,aomap_pars_fragment:AM,batching_pars_vertex:RM,batching_vertex:CM,begin_vertex:PM,beginnormal_vertex:LM,bsdfs:bM,iridescence_fragment:DM,bumpmap_pars_fragment:UM,clipping_planes_fragment:NM,clipping_planes_pars_fragment:IM,clipping_planes_pars_vertex:FM,clipping_planes_vertex:OM,color_fragment:kM,color_pars_fragment:BM,color_pars_vertex:zM,color_vertex:HM,common:GM,cube_uv_reflection_fragment:VM,defaultnormal_vertex:WM,displacementmap_pars_vertex:XM,displacementmap_vertex:YM,emissivemap_fragment:jM,emissivemap_pars_fragment:$M,colorspace_fragment:qM,colorspace_pars_fragment:KM,envmap_fragment:QM,envmap_common_pars_fragment:ZM,envmap_pars_fragment:JM,envmap_pars_vertex:eT,envmap_physical_pars_fragment:dT,envmap_vertex:tT,fog_vertex:nT,fog_pars_vertex:iT,fog_fragment:rT,fog_pars_fragment:sT,gradientmap_pars_fragment:oT,lightmap_fragment:aT,lightmap_pars_fragment:lT,lights_lambert_fragment:uT,lights_lambert_pars_fragment:cT,lights_pars_begin:fT,lights_toon_fragment:hT,lights_toon_pars_fragment:pT,lights_phong_fragment:mT,lights_phong_pars_fragment:gT,lights_physical_fragment:vT,lights_physical_pars_fragment:_T,lights_fragment_begin:xT,lights_fragment_maps:yT,lights_fragment_end:ST,logdepthbuf_fragment:ET,logdepthbuf_pars_fragment:MT,logdepthbuf_pars_vertex:TT,logdepthbuf_vertex:wT,map_fragment:AT,map_pars_fragment:RT,map_particle_fragment:CT,map_particle_pars_fragment:PT,metalnessmap_fragment:LT,metalnessmap_pars_fragment:bT,morphcolor_vertex:DT,morphnormal_vertex:UT,morphtarget_pars_vertex:NT,morphtarget_vertex:IT,normal_fragment_begin:FT,normal_fragment_maps:OT,normal_pars_fragment:kT,normal_pars_vertex:BT,normal_vertex:zT,normalmap_pars_fragment:HT,clearcoat_normal_fragment_begin:GT,clearcoat_normal_fragment_maps:VT,clearcoat_pars_fragment:WT,iridescence_pars_fragment:XT,opaque_fragment:YT,packing:jT,premultiplied_alpha_fragment:$T,project_vertex:qT,dithering_fragment:KT,dithering_pars_fragment:QT,roughnessmap_fragment:ZT,roughnessmap_pars_fragment:JT,shadowmap_pars_fragment:ew,shadowmap_pars_vertex:tw,shadowmap_vertex:nw,shadowmask_pars_fragment:iw,skinbase_vertex:rw,skinning_pars_vertex:sw,skinning_vertex:ow,skinnormal_vertex:aw,specularmap_fragment:lw,specularmap_pars_fragment:uw,tonemapping_fragment:cw,tonemapping_pars_fragment:fw,transmission_fragment:dw,transmission_pars_fragment:hw,uv_pars_fragment:pw,uv_pars_vertex:mw,uv_vertex:gw,worldpos_vertex:vw,background_vert:_w,background_frag:xw,backgroundCube_vert:yw,backgroundCube_frag:Sw,cube_vert:Ew,cube_frag:Mw,depth_vert:Tw,depth_frag:ww,distanceRGBA_vert:Aw,distanceRGBA_frag:Rw,equirect_vert:Cw,equirect_frag:Pw,linedashed_vert:Lw,linedashed_frag:bw,meshbasic_vert:Dw,meshbasic_frag:Uw,meshlambert_vert:Nw,meshlambert_frag:Iw,meshmatcap_vert:Fw,meshmatcap_frag:Ow,meshnormal_vert:kw,meshnormal_frag:Bw,meshphong_vert:zw,meshphong_frag:Hw,meshphysical_vert:Gw,meshphysical_frag:Vw,meshtoon_vert:Ww,meshtoon_frag:Xw,points_vert:Yw,points_frag:jw,shadow_vert:$w,shadow_frag:qw,sprite_vert:Kw,sprite_frag:Qw},oe={common:{diffuse:{value:new je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new Ie(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new je(16777215)},opacity:{value:1},center:{value:new Ie(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},Yn={basic:{uniforms:Wt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.fog]),vertexShader:ze.meshbasic_vert,fragmentShader:ze.meshbasic_frag},lambert:{uniforms:Wt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new je(0)}}]),vertexShader:ze.meshlambert_vert,fragmentShader:ze.meshlambert_frag},phong:{uniforms:Wt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new je(0)},specular:{value:new je(1118481)},shininess:{value:30}}]),vertexShader:ze.meshphong_vert,fragmentShader:ze.meshphong_frag},standard:{uniforms:Wt([oe.common,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.roughnessmap,oe.metalnessmap,oe.fog,oe.lights,{emissive:{value:new je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag},toon:{uniforms:Wt([oe.common,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.gradientmap,oe.fog,oe.lights,{emissive:{value:new je(0)}}]),vertexShader:ze.meshtoon_vert,fragmentShader:ze.meshtoon_frag},matcap:{uniforms:Wt([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,{matcap:{value:null}}]),vertexShader:ze.meshmatcap_vert,fragmentShader:ze.meshmatcap_frag},points:{uniforms:Wt([oe.points,oe.fog]),vertexShader:ze.points_vert,fragmentShader:ze.points_frag},dashed:{uniforms:Wt([oe.common,oe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ze.linedashed_vert,fragmentShader:ze.linedashed_frag},depth:{uniforms:Wt([oe.common,oe.displacementmap]),vertexShader:ze.depth_vert,fragmentShader:ze.depth_frag},normal:{uniforms:Wt([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,{opacity:{value:1}}]),vertexShader:ze.meshnormal_vert,fragmentShader:ze.meshnormal_frag},sprite:{uniforms:Wt([oe.sprite,oe.fog]),vertexShader:ze.sprite_vert,fragmentShader:ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ze.background_vert,fragmentShader:ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:ze.backgroundCube_vert,fragmentShader:ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ze.cube_vert,fragmentShader:ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ze.equirect_vert,fragmentShader:ze.equirect_frag},distanceRGBA:{uniforms:Wt([oe.common,oe.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ze.distanceRGBA_vert,fragmentShader:ze.distanceRGBA_frag},shadow:{uniforms:Wt([oe.lights,oe.fog,{color:{value:new je(0)},opacity:{value:1}}]),vertexShader:ze.shadow_vert,fragmentShader:ze.shadow_frag}};Yn.physical={uniforms:Wt([Yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new Ie(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new Ie},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new je(0)},specularColor:{value:new je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new Ie},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag};const ba={r:0,b:0,g:0};function Zw(t,e,n,i,r,s,o){const a=new je(0);let l=s===!0?0:1,u,f,d=null,h=0,m=null;function _(p,c){let v=!1,g=c.isScene===!0?c.background:null;g&&g.isTexture&&(g=(c.backgroundBlurriness>0?n:e).get(g)),g===null?x(a,l):g&&g.isColor&&(x(g,1),v=!0);const y=t.xr.getEnvironmentBlendMode();y==="additive"?i.buffers.color.setClear(0,0,0,1,o):y==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(t.autoClear||v)&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),g&&(g.isCubeTexture||g.mapping===Yl)?(f===void 0&&(f=new $n(new Vo(1,1,1),new Jt({name:"BackgroundCubeMaterial",uniforms:As(Yn.backgroundCube.uniforms),vertexShader:Yn.backgroundCube.vertexShader,fragmentShader:Yn.backgroundCube.fragmentShader,side:rn,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(C,R,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(f)),f.material.uniforms.envMap.value=g,f.material.uniforms.flipEnvMap.value=g.isCubeTexture&&g.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=c.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=c.backgroundIntensity,f.material.toneMapped=Qe.getTransfer(g.colorSpace)!==rt,(d!==g||h!==g.version||m!==t.toneMapping)&&(f.material.needsUpdate=!0,d=g,h=g.version,m=t.toneMapping),f.layers.enableAll(),p.unshift(f,f.geometry,f.material,0,0,null)):g&&g.isTexture&&(u===void 0&&(u=new $n(new Kl(2,2),new Jt({name:"BackgroundMaterial",uniforms:As(Yn.background.uniforms),vertexShader:Yn.background.vertexShader,fragmentShader:Yn.background.fragmentShader,side:Qi,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(u)),u.material.uniforms.t2D.value=g,u.material.uniforms.backgroundIntensity.value=c.backgroundIntensity,u.material.toneMapped=Qe.getTransfer(g.colorSpace)!==rt,g.matrixAutoUpdate===!0&&g.updateMatrix(),u.material.uniforms.uvTransform.value.copy(g.matrix),(d!==g||h!==g.version||m!==t.toneMapping)&&(u.material.needsUpdate=!0,d=g,h=g.version,m=t.toneMapping),u.layers.enableAll(),p.unshift(u,u.geometry,u.material,0,0,null))}function x(p,c){p.getRGB(ba,u_(t)),i.buffers.color.setClear(ba.r,ba.g,ba.b,c,o)}return{getClearColor:function(){return a},setClearColor:function(p,c=1){a.set(p),l=c,x(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,x(a,l)},render:_}}function Jw(t,e,n,i){const r=t.getParameter(t.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),o=i.isWebGL2||s!==null,a={},l=p(null);let u=l,f=!1;function d(L,z,Y,$,b){let N=!1;if(o){const H=x($,Y,z);u!==H&&(u=H,m(u.object)),N=c(L,$,Y,b),N&&v(L,$,Y,b)}else{const H=z.wireframe===!0;(u.geometry!==$.id||u.program!==Y.id||u.wireframe!==H)&&(u.geometry=$.id,u.program=Y.id,u.wireframe=H,N=!0)}b!==null&&n.update(b,t.ELEMENT_ARRAY_BUFFER),(N||f)&&(f=!1,U(L,z,Y,$),b!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,n.get(b).buffer))}function h(){return i.isWebGL2?t.createVertexArray():s.createVertexArrayOES()}function m(L){return i.isWebGL2?t.bindVertexArray(L):s.bindVertexArrayOES(L)}function _(L){return i.isWebGL2?t.deleteVertexArray(L):s.deleteVertexArrayOES(L)}function x(L,z,Y){const $=Y.wireframe===!0;let b=a[L.id];b===void 0&&(b={},a[L.id]=b);let N=b[z.id];N===void 0&&(N={},b[z.id]=N);let H=N[$];return H===void 0&&(H=p(h()),N[$]=H),H}function p(L){const z=[],Y=[],$=[];for(let b=0;b<r;b++)z[b]=0,Y[b]=0,$[b]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:Y,attributeDivisors:$,object:L,attributes:{},index:null}}function c(L,z,Y,$){const b=u.attributes,N=z.attributes;let H=0;const K=Y.getAttributes();for(const Z in K)if(K[Z].location>=0){const Q=b[Z];let le=N[Z];if(le===void 0&&(Z==="instanceMatrix"&&L.instanceMatrix&&(le=L.instanceMatrix),Z==="instanceColor"&&L.instanceColor&&(le=L.instanceColor)),Q===void 0||Q.attribute!==le||le&&Q.data!==le.data)return!0;H++}return u.attributesNum!==H||u.index!==$}function v(L,z,Y,$){const b={},N=z.attributes;let H=0;const K=Y.getAttributes();for(const Z in K)if(K[Z].location>=0){let Q=N[Z];Q===void 0&&(Z==="instanceMatrix"&&L.instanceMatrix&&(Q=L.instanceMatrix),Z==="instanceColor"&&L.instanceColor&&(Q=L.instanceColor));const le={};le.attribute=Q,Q&&Q.data&&(le.data=Q.data),b[Z]=le,H++}u.attributes=b,u.attributesNum=H,u.index=$}function g(){const L=u.newAttributes;for(let z=0,Y=L.length;z<Y;z++)L[z]=0}function y(L){C(L,0)}function C(L,z){const Y=u.newAttributes,$=u.enabledAttributes,b=u.attributeDivisors;Y[L]=1,$[L]===0&&(t.enableVertexAttribArray(L),$[L]=1),b[L]!==z&&((i.isWebGL2?t:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,z),b[L]=z)}function R(){const L=u.newAttributes,z=u.enabledAttributes;for(let Y=0,$=z.length;Y<$;Y++)z[Y]!==L[Y]&&(t.disableVertexAttribArray(Y),z[Y]=0)}function A(L,z,Y,$,b,N,H){H===!0?t.vertexAttribIPointer(L,z,Y,b,N):t.vertexAttribPointer(L,z,Y,$,b,N)}function U(L,z,Y,$){if(i.isWebGL2===!1&&(L.isInstancedMesh||$.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;g();const b=$.attributes,N=Y.getAttributes(),H=z.defaultAttributeValues;for(const K in N){const Z=N[K];if(Z.location>=0){let X=b[K];if(X===void 0&&(K==="instanceMatrix"&&L.instanceMatrix&&(X=L.instanceMatrix),K==="instanceColor"&&L.instanceColor&&(X=L.instanceColor)),X!==void 0){const Q=X.normalized,le=X.itemSize,me=n.get(X);if(me===void 0)continue;const re=me.buffer,ge=me.type,Ce=me.bytesPerElement,ve=i.isWebGL2===!0&&(ge===t.INT||ge===t.UNSIGNED_INT||X.gpuType===Yv);if(X.isInterleavedBufferAttribute){const We=X.data,O=We.stride,Et=X.offset;if(We.isInstancedInterleavedBuffer){for(let Me=0;Me<Z.locationSize;Me++)C(Z.location+Me,We.meshPerAttribute);L.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=We.meshPerAttribute*We.count)}else for(let Me=0;Me<Z.locationSize;Me++)y(Z.location+Me);t.bindBuffer(t.ARRAY_BUFFER,re);for(let Me=0;Me<Z.locationSize;Me++)A(Z.location+Me,le/Z.locationSize,ge,Q,O*Ce,(Et+le/Z.locationSize*Me)*Ce,ve)}else{if(X.isInstancedBufferAttribute){for(let We=0;We<Z.locationSize;We++)C(Z.location+We,X.meshPerAttribute);L.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let We=0;We<Z.locationSize;We++)y(Z.location+We);t.bindBuffer(t.ARRAY_BUFFER,re);for(let We=0;We<Z.locationSize;We++)A(Z.location+We,le/Z.locationSize,ge,Q,le*Ce,le/Z.locationSize*We*Ce,ve)}}else if(H!==void 0){const Q=H[K];if(Q!==void 0)switch(Q.length){case 2:t.vertexAttrib2fv(Z.location,Q);break;case 3:t.vertexAttrib3fv(Z.location,Q);break;case 4:t.vertexAttrib4fv(Z.location,Q);break;default:t.vertexAttrib1fv(Z.location,Q)}}}}R()}function E(){j();for(const L in a){const z=a[L];for(const Y in z){const $=z[Y];for(const b in $)_($[b].object),delete $[b];delete z[Y]}delete a[L]}}function T(L){if(a[L.id]===void 0)return;const z=a[L.id];for(const Y in z){const $=z[Y];for(const b in $)_($[b].object),delete $[b];delete z[Y]}delete a[L.id]}function W(L){for(const z in a){const Y=a[z];if(Y[L.id]===void 0)continue;const $=Y[L.id];for(const b in $)_($[b].object),delete $[b];delete Y[L.id]}}function j(){ie(),f=!0,u!==l&&(u=l,m(u.object))}function ie(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:j,resetDefaultState:ie,dispose:E,releaseStatesOfGeometry:T,releaseStatesOfProgram:W,initAttributes:g,enableAttribute:y,disableUnusedAttributes:R}}function e1(t,e,n,i){const r=i.isWebGL2;let s;function o(f){s=f}function a(f,d){t.drawArrays(s,f,d),n.update(d,s,1)}function l(f,d,h){if(h===0)return;let m,_;if(r)m=t,_="drawArraysInstanced";else if(m=e.get("ANGLE_instanced_arrays"),_="drawArraysInstancedANGLE",m===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[_](s,f,d,h),n.update(d,s,h)}function u(f,d,h){if(h===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let _=0;_<h;_++)this.render(f[_],d[_]);else{m.multiDrawArraysWEBGL(s,f,0,d,0,h);let _=0;for(let x=0;x<h;x++)_+=d[x];n.update(_,s,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=u}function t1(t,e,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");i=t.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(A){if(A==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&t.constructor.name==="WebGL2RenderingContext";let a=n.precision!==void 0?n.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const u=o||e.has("WEBGL_draw_buffers"),f=n.logarithmicDepthBuffer===!0,d=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),h=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=t.getParameter(t.MAX_TEXTURE_SIZE),_=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),x=t.getParameter(t.MAX_VERTEX_ATTRIBS),p=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),c=t.getParameter(t.MAX_VARYING_VECTORS),v=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),g=h>0,y=o||e.has("OES_texture_float"),C=g&&y,R=o?t.getParameter(t.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:u,getMaxAnisotropy:r,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:f,maxTextures:d,maxVertexTextures:h,maxTextureSize:m,maxCubemapSize:_,maxAttributes:x,maxVertexUniforms:p,maxVaryings:c,maxFragmentUniforms:v,vertexTextures:g,floatFragmentTextures:y,floatVertexTextures:C,maxSamples:R}}function n1(t){const e=this;let n=null,i=0,r=!1,s=!1;const o=new cr,a=new Ve,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const m=d.length!==0||h||i!==0||r;return r=h,i=d.length,m},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){n=f(d,h,0)},this.setState=function(d,h,m){const _=d.clippingPlanes,x=d.clipIntersection,p=d.clipShadows,c=t.get(d);if(!r||_===null||_.length===0||s&&!p)s?f(null):u();else{const v=s?0:i,g=v*4;let y=c.clippingState||null;l.value=y,y=f(_,h,g,m);for(let C=0;C!==g;++C)y[C]=n[C];c.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function u(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function f(d,h,m,_){const x=d!==null?d.length:0;let p=null;if(x!==0){if(p=l.value,_!==!0||p===null){const c=m+x*4,v=h.matrixWorldInverse;a.getNormalMatrix(v),(p===null||p.length<c)&&(p=new Float32Array(c));for(let g=0,y=m;g!==x;++g,y+=4)o.copy(d[g]).applyMatrix4(v,a),o.normal.toArray(p,y),p[y+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,p}}function i1(t){let e=new WeakMap;function n(o,a){return a===sf?o.mapping=Ms:a===of&&(o.mapping=Ts),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===sf||a===of)if(e.has(o)){const l=e.get(o).texture;return n(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const u=new mM(l.height/2);return u.fromEquirectangularTexture(t,o),e.set(o,u),o.addEventListener("dispose",r),n(u.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class _d extends c_{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=u*this.view.offsetX,o=s+u*this.view.width,a-=f*this.view.offsetY,l=a-f*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const os=4,Bp=[.125,.215,.35,.446,.526,.582],hr=20,ec=new _d,zp=new je;let tc=null,nc=0,ic=0;const fr=(1+Math.sqrt(5))/2,Yr=1/fr,Hp=[new F(1,1,1),new F(-1,1,1),new F(1,1,-1),new F(-1,1,-1),new F(0,fr,Yr),new F(0,fr,-Yr),new F(Yr,0,fr),new F(-Yr,0,fr),new F(fr,Yr,0),new F(-fr,Yr,0)];class Gp{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){tc=this._renderer.getRenderTarget(),nc=this._renderer.getActiveCubeFace(),ic=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(tc,nc,ic),e.scissorTest=!1,Da(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Ms||e.mapping===Ts?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),tc=this._renderer.getRenderTarget(),nc=this._renderer.getActiveCubeFace(),ic=this._renderer.getActiveMipmapLevel();const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:yn,minFilter:yn,generateMipmaps:!1,type:mi,format:On,colorSpace:Ei,depthBuffer:!1},r=Vp(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Vp(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=r1(s)),this._blurMaterial=s1(s,e,n)}return r}_compileMaterial(e){const n=new $n(this._lodPlanes[0],e);this._renderer.compile(n,ec)}_sceneToCubeUV(e,n,i,r){const a=new In(90,1,n,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,h=f.toneMapping;f.getClearColor(zp),f.toneMapping=ji,f.autoClear=!1;const m=new vd({name:"PMREM.Background",side:rn,depthWrite:!1,depthTest:!1}),_=new $n(new Vo,m);let x=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,x=!0):(m.color.copy(zp),x=!0);for(let c=0;c<6;c++){const v=c%3;v===0?(a.up.set(0,l[c],0),a.lookAt(u[c],0,0)):v===1?(a.up.set(0,0,l[c]),a.lookAt(0,u[c],0)):(a.up.set(0,l[c],0),a.lookAt(0,0,u[c]));const g=this._cubeSize;Da(r,v*g,c>2?g:0,g,g),f.setRenderTarget(r),x&&f.render(_,a),f.render(e,a)}_.geometry.dispose(),_.material.dispose(),f.toneMapping=h,f.autoClear=d,e.background=p}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Ms||e.mapping===Ts;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wp());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new $n(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Da(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,ec)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Hp[(r-1)%Hp.length];this._blur(e,r-1,r,s,o)}n.autoClear=i}_blur(e,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,a){const l=this._renderer,u=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const f=3,d=new $n(this._lodPlanes[r],u),h=u.uniforms,m=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*hr-1),x=s/_,p=isFinite(s)?1+Math.floor(f*x):hr;p>hr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${hr}`);const c=[];let v=0;for(let A=0;A<hr;++A){const U=A/x,E=Math.exp(-U*U/2);c.push(E),A===0?v+=E:A<p&&(v+=2*E)}for(let A=0;A<c.length;A++)c[A]=c[A]/v;h.envMap.value=e.texture,h.samples.value=p,h.weights.value=c,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:g}=this;h.dTheta.value=_,h.mipInt.value=g-i;const y=this._sizeLods[r],C=3*y*(r>g-os?r-g+os:0),R=4*(this._cubeSize-y);Da(n,C,R,3*y,2*y),l.setRenderTarget(n),l.render(d,ec)}}function r1(t){const e=[],n=[],i=[];let r=t;const s=t-os+1+Bp.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);n.push(a);let l=1/a;o>t-os?l=Bp[o-t+os-1]:o===0&&(l=0),i.push(l);const u=1/(a-2),f=-u,d=1+u,h=[f,f,d,f,d,d,f,f,d,d,f,d],m=6,_=6,x=3,p=2,c=1,v=new Float32Array(x*_*m),g=new Float32Array(p*_*m),y=new Float32Array(c*_*m);for(let R=0;R<m;R++){const A=R%3*2/3-1,U=R>2?0:-1,E=[A,U,0,A+2/3,U,0,A+2/3,U+1,0,A,U,0,A+2/3,U+1,0,A,U+1,0];v.set(E,x*_*R),g.set(h,p*_*R);const T=[R,R,R,R,R,R];y.set(T,c*_*R)}const C=new tr;C.setAttribute("position",new Qn(v,x)),C.setAttribute("uv",new Qn(g,p)),C.setAttribute("faceIndex",new Qn(y,c)),e.push(C),r>os&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function Vp(t,e,n){const i=new zn(t,e,n);return i.texture.mapping=Yl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Da(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function s1(t,e,n){const i=new Float32Array(hr),r=new F(0,1,0);return new Jt({name:"SphericalGaussianBlur",defines:{n:hr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:xd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:pi,depthTest:!1,depthWrite:!1})}function Wp(){return new Jt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:pi,depthTest:!1,depthWrite:!1})}function Xp(){return new Jt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:pi,depthTest:!1,depthWrite:!1})}function xd(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function o1(t){let e=new WeakMap,n=null;function i(a){if(a&&a.isTexture){const l=a.mapping,u=l===sf||l===of,f=l===Ms||l===Ts;if(u||f)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let d=e.get(a);return n===null&&(n=new Gp(t)),d=u?n.fromEquirectangular(a,d):n.fromCubemap(a,d),e.set(a,d),d.texture}else{if(e.has(a))return e.get(a).texture;{const d=a.image;if(u&&d&&d.height>0||f&&d&&r(d)){n===null&&(n=new Gp(t));const h=u?n.fromEquirectangular(a):n.fromCubemap(a);return e.set(a,h),a.addEventListener("dispose",s),h.texture}else return null}}}return a}function r(a){let l=0;const u=6;for(let f=0;f<u;f++)a[f]!==void 0&&l++;return l===u}function s(a){const l=a.target;l.removeEventListener("dispose",s);const u=e.get(l);u!==void 0&&(e.delete(l),u.dispose())}function o(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function a1(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(i){i.isWebGL2?(n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance")):(n("WEBGL_depth_texture"),n("OES_texture_float"),n("OES_texture_half_float"),n("OES_texture_half_float_linear"),n("OES_standard_derivatives"),n("OES_element_index_uint"),n("OES_vertex_array_object"),n("ANGLE_instanced_arrays")),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture")},get:function(i){const r=n(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function l1(t,e,n,i){const r={},s=new WeakMap;function o(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const _ in h.attributes)e.remove(h.attributes[_]);for(const _ in h.morphAttributes){const x=h.morphAttributes[_];for(let p=0,c=x.length;p<c;p++)e.remove(x[p])}h.removeEventListener("dispose",o),delete r[h.id];const m=s.get(h);m&&(e.remove(m),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,n.memory.geometries--}function a(d,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,n.memory.geometries++),h}function l(d){const h=d.attributes;for(const _ in h)e.update(h[_],t.ARRAY_BUFFER);const m=d.morphAttributes;for(const _ in m){const x=m[_];for(let p=0,c=x.length;p<c;p++)e.update(x[p],t.ARRAY_BUFFER)}}function u(d){const h=[],m=d.index,_=d.attributes.position;let x=0;if(m!==null){const v=m.array;x=m.version;for(let g=0,y=v.length;g<y;g+=3){const C=v[g+0],R=v[g+1],A=v[g+2];h.push(C,R,R,A,A,C)}}else if(_!==void 0){const v=_.array;x=_.version;for(let g=0,y=v.length/3-1;g<y;g+=3){const C=g+0,R=g+1,A=g+2;h.push(C,R,R,A,A,C)}}else return;const p=new(t_(h)?l_:a_)(h,1);p.version=x;const c=s.get(d);c&&e.remove(c),s.set(d,p)}function f(d){const h=s.get(d);if(h){const m=d.index;m!==null&&h.version<m.version&&u(d)}else u(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:f}}function u1(t,e,n,i){const r=i.isWebGL2;let s;function o(m){s=m}let a,l;function u(m){a=m.type,l=m.bytesPerElement}function f(m,_){t.drawElements(s,_,a,m*l),n.update(_,s,1)}function d(m,_,x){if(x===0)return;let p,c;if(r)p=t,c="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),c="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[c](s,_,a,m*l,x),n.update(_,s,x)}function h(m,_,x){if(x===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let c=0;c<x;c++)this.render(m[c]/l,_[c]);else{p.multiDrawElementsWEBGL(s,_,0,a,m,0,x);let c=0;for(let v=0;v<x;v++)c+=_[v];n.update(c,s,1)}}this.setMode=o,this.setIndex=u,this.render=f,this.renderInstances=d,this.renderMultiDraw=h}function c1(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=a*(s/3);break;case t.LINES:n.lines+=a*(s/2);break;case t.LINE_STRIP:n.lines+=a*(s-1);break;case t.LINE_LOOP:n.lines+=a*s;break;case t.POINTS:n.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function f1(t,e){return t[0]-e[0]}function d1(t,e){return Math.abs(e[1])-Math.abs(t[1])}function h1(t,e,n){const i={},r=new Float32Array(8),s=new WeakMap,o=new Lt,a=[];for(let u=0;u<8;u++)a[u]=[u,0];function l(u,f,d){const h=u.morphTargetInfluences;if(e.isWebGL2===!0){const _=f.morphAttributes.position||f.morphAttributes.normal||f.morphAttributes.color,x=_!==void 0?_.length:0;let p=s.get(f);if(p===void 0||p.count!==x){let z=function(){ie.dispose(),s.delete(f),f.removeEventListener("dispose",z)};var m=z;p!==void 0&&p.texture.dispose();const g=f.morphAttributes.position!==void 0,y=f.morphAttributes.normal!==void 0,C=f.morphAttributes.color!==void 0,R=f.morphAttributes.position||[],A=f.morphAttributes.normal||[],U=f.morphAttributes.color||[];let E=0;g===!0&&(E=1),y===!0&&(E=2),C===!0&&(E=3);let T=f.attributes.position.count*E,W=1;T>e.maxTextureSize&&(W=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const j=new Float32Array(T*W*4*x),ie=new r_(j,T,W,x);ie.type=ki,ie.needsUpdate=!0;const L=E*4;for(let Y=0;Y<x;Y++){const $=R[Y],b=A[Y],N=U[Y],H=T*W*4*Y;for(let K=0;K<$.count;K++){const Z=K*L;g===!0&&(o.fromBufferAttribute($,K),j[H+Z+0]=o.x,j[H+Z+1]=o.y,j[H+Z+2]=o.z,j[H+Z+3]=0),y===!0&&(o.fromBufferAttribute(b,K),j[H+Z+4]=o.x,j[H+Z+5]=o.y,j[H+Z+6]=o.z,j[H+Z+7]=0),C===!0&&(o.fromBufferAttribute(N,K),j[H+Z+8]=o.x,j[H+Z+9]=o.y,j[H+Z+10]=o.z,j[H+Z+11]=N.itemSize===4?o.w:1)}}p={count:x,texture:ie,size:new Ie(T,W)},s.set(f,p),f.addEventListener("dispose",z)}let c=0;for(let g=0;g<h.length;g++)c+=h[g];const v=f.morphTargetsRelative?1:1-c;d.getUniforms().setValue(t,"morphTargetBaseInfluence",v),d.getUniforms().setValue(t,"morphTargetInfluences",h),d.getUniforms().setValue(t,"morphTargetsTexture",p.texture,n),d.getUniforms().setValue(t,"morphTargetsTextureSize",p.size)}else{const _=h===void 0?0:h.length;let x=i[f.id];if(x===void 0||x.length!==_){x=[];for(let y=0;y<_;y++)x[y]=[y,0];i[f.id]=x}for(let y=0;y<_;y++){const C=x[y];C[0]=y,C[1]=h[y]}x.sort(d1);for(let y=0;y<8;y++)y<_&&x[y][1]?(a[y][0]=x[y][0],a[y][1]=x[y][1]):(a[y][0]=Number.MAX_SAFE_INTEGER,a[y][1]=0);a.sort(f1);const p=f.morphAttributes.position,c=f.morphAttributes.normal;let v=0;for(let y=0;y<8;y++){const C=a[y],R=C[0],A=C[1];R!==Number.MAX_SAFE_INTEGER&&A?(p&&f.getAttribute("morphTarget"+y)!==p[R]&&f.setAttribute("morphTarget"+y,p[R]),c&&f.getAttribute("morphNormal"+y)!==c[R]&&f.setAttribute("morphNormal"+y,c[R]),r[y]=A,v+=A):(p&&f.hasAttribute("morphTarget"+y)===!0&&f.deleteAttribute("morphTarget"+y),c&&f.hasAttribute("morphNormal"+y)===!0&&f.deleteAttribute("morphNormal"+y),r[y]=0)}const g=f.morphTargetsRelative?1:1-v;d.getUniforms().setValue(t,"morphTargetBaseInfluence",g),d.getUniforms().setValue(t,"morphTargetInfluences",r)}}return{update:l}}function p1(t,e,n,i){let r=new WeakMap;function s(l){const u=i.render.frame,f=l.geometry,d=e.get(l,f);if(r.get(d)!==u&&(e.update(d),r.set(d,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==u&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==u&&(h.update(),r.set(h,u))}return d}function o(){r=new WeakMap}function a(l){const u=l.target;u.removeEventListener("dispose",a),n.remove(u.instanceMatrix),u.instanceColor!==null&&n.remove(u.instanceColor)}return{update:s,dispose:o}}class p_ extends fn{constructor(e,n,i,r,s,o,a,l,u,f){if(f=f!==void 0?f:yr,f!==yr&&f!==ws)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&f===yr&&(i=Oi),i===void 0&&f===ws&&(i=xr),super(null,r,s,o,a,l,f,i,u),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=a!==void 0?a:Yt,this.minFilter=l!==void 0?l:Yt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const m_=new fn,g_=new p_(1,1);g_.compareFunction=e_;const v_=new r_,__=new ZE,x_=new f_,Yp=[],jp=[],$p=new Float32Array(16),qp=new Float32Array(9),Kp=new Float32Array(4);function Is(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=Yp[r];if(s===void 0&&(s=new Float32Array(r),Yp[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=n,t[o].toArray(s,a)}return s}function yt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function St(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Ql(t,e){let n=jp[e];n===void 0&&(n=new Int32Array(e),jp[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function m1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function g1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(yt(n,e))return;t.uniform2fv(this.addr,e),St(n,e)}}function v1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(yt(n,e))return;t.uniform3fv(this.addr,e),St(n,e)}}function _1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(yt(n,e))return;t.uniform4fv(this.addr,e),St(n,e)}}function x1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(yt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),St(n,e)}else{if(yt(n,i))return;Kp.set(i),t.uniformMatrix2fv(this.addr,!1,Kp),St(n,i)}}function y1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(yt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),St(n,e)}else{if(yt(n,i))return;qp.set(i),t.uniformMatrix3fv(this.addr,!1,qp),St(n,i)}}function S1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(yt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),St(n,e)}else{if(yt(n,i))return;$p.set(i),t.uniformMatrix4fv(this.addr,!1,$p),St(n,i)}}function E1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function M1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(yt(n,e))return;t.uniform2iv(this.addr,e),St(n,e)}}function T1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(yt(n,e))return;t.uniform3iv(this.addr,e),St(n,e)}}function w1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(yt(n,e))return;t.uniform4iv(this.addr,e),St(n,e)}}function A1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function R1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(yt(n,e))return;t.uniform2uiv(this.addr,e),St(n,e)}}function C1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(yt(n,e))return;t.uniform3uiv(this.addr,e),St(n,e)}}function P1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(yt(n,e))return;t.uniform4uiv(this.addr,e),St(n,e)}}function L1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);const s=this.type===t.SAMPLER_2D_SHADOW?g_:m_;n.setTexture2D(e||s,r)}function b1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||__,r)}function D1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||x_,r)}function U1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||v_,r)}function N1(t){switch(t){case 5126:return m1;case 35664:return g1;case 35665:return v1;case 35666:return _1;case 35674:return x1;case 35675:return y1;case 35676:return S1;case 5124:case 35670:return E1;case 35667:case 35671:return M1;case 35668:case 35672:return T1;case 35669:case 35673:return w1;case 5125:return A1;case 36294:return R1;case 36295:return C1;case 36296:return P1;case 35678:case 36198:case 36298:case 36306:case 35682:return L1;case 35679:case 36299:case 36307:return b1;case 35680:case 36300:case 36308:case 36293:return D1;case 36289:case 36303:case 36311:case 36292:return U1}}function I1(t,e){t.uniform1fv(this.addr,e)}function F1(t,e){const n=Is(e,this.size,2);t.uniform2fv(this.addr,n)}function O1(t,e){const n=Is(e,this.size,3);t.uniform3fv(this.addr,n)}function k1(t,e){const n=Is(e,this.size,4);t.uniform4fv(this.addr,n)}function B1(t,e){const n=Is(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function z1(t,e){const n=Is(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function H1(t,e){const n=Is(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function G1(t,e){t.uniform1iv(this.addr,e)}function V1(t,e){t.uniform2iv(this.addr,e)}function W1(t,e){t.uniform3iv(this.addr,e)}function X1(t,e){t.uniform4iv(this.addr,e)}function Y1(t,e){t.uniform1uiv(this.addr,e)}function j1(t,e){t.uniform2uiv(this.addr,e)}function $1(t,e){t.uniform3uiv(this.addr,e)}function q1(t,e){t.uniform4uiv(this.addr,e)}function K1(t,e,n){const i=this.cache,r=e.length,s=Ql(n,r);yt(i,s)||(t.uniform1iv(this.addr,s),St(i,s));for(let o=0;o!==r;++o)n.setTexture2D(e[o]||m_,s[o])}function Q1(t,e,n){const i=this.cache,r=e.length,s=Ql(n,r);yt(i,s)||(t.uniform1iv(this.addr,s),St(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||__,s[o])}function Z1(t,e,n){const i=this.cache,r=e.length,s=Ql(n,r);yt(i,s)||(t.uniform1iv(this.addr,s),St(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||x_,s[o])}function J1(t,e,n){const i=this.cache,r=e.length,s=Ql(n,r);yt(i,s)||(t.uniform1iv(this.addr,s),St(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||v_,s[o])}function eA(t){switch(t){case 5126:return I1;case 35664:return F1;case 35665:return O1;case 35666:return k1;case 35674:return B1;case 35675:return z1;case 35676:return H1;case 5124:case 35670:return G1;case 35667:case 35671:return V1;case 35668:case 35672:return W1;case 35669:case 35673:return X1;case 5125:return Y1;case 36294:return j1;case 36295:return $1;case 36296:return q1;case 35678:case 36198:case 36298:case 36306:case 35682:return K1;case 35679:case 36299:case 36307:return Q1;case 35680:case 36300:case 36308:case 36293:return Z1;case 36289:case 36303:case 36311:case 36292:return J1}}class tA{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=N1(n.type)}}class nA{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=eA(n.type)}}class iA{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,n[a.id],i)}}}const rc=/(\w+)(\])?(\[|\.)?/g;function Qp(t,e){t.seq.push(e),t.map[e.id]=e}function rA(t,e,n){const i=t.name,r=i.length;for(rc.lastIndex=0;;){const s=rc.exec(i),o=rc.lastIndex;let a=s[1];const l=s[2]==="]",u=s[3];if(l&&(a=a|0),u===void 0||u==="["&&o+2===r){Qp(n,u===void 0?new tA(a,t,e):new nA(a,t,e));break}else{let d=n.map[a];d===void 0&&(d=new iA(a),Qp(n,d)),n=d}}}class $a{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),o=e.getUniformLocation(n,s.name);rA(s,o,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function Zp(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const sA=37297;let oA=0;function aA(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}function lA(t){const e=Qe.getPrimaries(Qe.workingColorSpace),n=Qe.getPrimaries(t);let i;switch(e===n?i="":e===Ml&&n===El?i="LinearDisplayP3ToLinearSRGB":e===El&&n===Ml&&(i="LinearSRGBToLinearDisplayP3"),t){case Ei:case jl:return[i,"LinearTransferOETF"];case Pt:case pd:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",t),[i,"LinearTransferOETF"]}}function Jp(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+aA(t.getShaderSource(e),o)}else return r}function uA(t,e){const n=lA(e);return`vec4 ${t}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function cA(t,e){let n;switch(e){case aE:n="Linear";break;case lE:n="Reinhard";break;case uE:n="OptimizedCineon";break;case cE:n="ACESFilmic";break;case dE:n="AgX";break;case fE:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}function fA(t){return[t.extensionDerivatives||t.envMapCubeUVHeight||t.bumpMap||t.normalMapTangentSpace||t.clearcoatNormalMap||t.flatShading||t.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(t.extensionFragDepth||t.logarithmicDepthBuffer)&&t.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",t.extensionDrawBuffers&&t.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(t.extensionShaderTextureLOD||t.envMap||t.transmission)&&t.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(as).join(`
`)}function dA(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(as).join(`
`)}function hA(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function pA(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),o=s.name;let a=1;s.type===t.FLOAT_MAT2&&(a=2),s.type===t.FLOAT_MAT3&&(a=3),s.type===t.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:t.getAttribLocation(e,o),locationSize:a}}return n}function as(t){return t!==""}function em(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function tm(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const mA=/^[ \t]*#include +<([\w\d./]+)>/gm;function ff(t){return t.replace(mA,vA)}const gA=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function vA(t,e){let n=ze[e];if(n===void 0){const i=gA.get(e);if(i!==void 0)n=ze[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return ff(n)}const _A=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function nm(t){return t.replace(_A,xA)}function xA(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function im(t){let e="precision "+t.precision+` float;
precision `+t.precision+" int;";return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function yA(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===Vv?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===IS?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===ri&&(e="SHADOWMAP_TYPE_VSM"),e}function SA(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case Ms:case Ts:e="ENVMAP_TYPE_CUBE";break;case Yl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function EA(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case Ts:e="ENVMAP_MODE_REFRACTION";break}return e}function MA(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case Wv:e="ENVMAP_BLENDING_MULTIPLY";break;case sE:e="ENVMAP_BLENDING_MIX";break;case oE:e="ENVMAP_BLENDING_ADD";break}return e}function TA(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function wA(t,e,n,i){const r=t.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const l=yA(n),u=SA(n),f=EA(n),d=MA(n),h=TA(n),m=n.isWebGL2?"":fA(n),_=dA(n),x=hA(s),p=r.createProgram();let c,v,g=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(c=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x].filter(as).join(`
`),c.length>0&&(c+=`
`),v=[m,"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x].filter(as).join(`
`),v.length>0&&(v+=`
`)):(c=[im(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+f:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors&&n.isWebGL2?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(as).join(`
`),v=[m,im(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.envMap?"#define "+f:"",n.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==ji?"#define TONE_MAPPING":"",n.toneMapping!==ji?ze.tonemapping_pars_fragment:"",n.toneMapping!==ji?cA("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",ze.colorspace_pars_fragment,uA("linearToOutputTexel",n.outputColorSpace),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(as).join(`
`)),o=ff(o),o=em(o,n),o=tm(o,n),a=ff(a),a=em(a,n),a=tm(a,n),o=nm(o),a=nm(a),n.isWebGL2&&n.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,c=[_,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+c,v=["precision mediump sampler2DArray;","#define varying in",n.glslVersion===yp?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===yp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const y=g+c+o,C=g+v+a,R=Zp(r,r.VERTEX_SHADER,y),A=Zp(r,r.FRAGMENT_SHADER,C);r.attachShader(p,R),r.attachShader(p,A),n.index0AttributeName!==void 0?r.bindAttribLocation(p,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(p,0,"position"),r.linkProgram(p);function U(j){if(t.debug.checkShaderErrors){const ie=r.getProgramInfoLog(p).trim(),L=r.getShaderInfoLog(R).trim(),z=r.getShaderInfoLog(A).trim();let Y=!0,$=!0;if(r.getProgramParameter(p,r.LINK_STATUS)===!1)if(Y=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,p,R,A);else{const b=Jp(r,R,"vertex"),N=Jp(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(p,r.VALIDATE_STATUS)+`

Program Info Log: `+ie+`
`+b+`
`+N)}else ie!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ie):(L===""||z==="")&&($=!1);$&&(j.diagnostics={runnable:Y,programLog:ie,vertexShader:{log:L,prefix:c},fragmentShader:{log:z,prefix:v}})}r.deleteShader(R),r.deleteShader(A),E=new $a(r,p),T=pA(r,p)}let E;this.getUniforms=function(){return E===void 0&&U(this),E};let T;this.getAttributes=function(){return T===void 0&&U(this),T};let W=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return W===!1&&(W=r.getProgramParameter(p,sA)),W},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(p),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=oA++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=R,this.fragmentShader=A,this}let AA=0;class RA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new CA(e),n.set(e,i)),i}}class CA{constructor(e){this.id=AA++,this.code=e,this.usedTimes=0}}function PA(t,e,n,i,r,s,o){const a=new s_,l=new RA,u=[],f=r.isWebGL2,d=r.logarithmicDepthBuffer,h=r.vertexTextures;let m=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(E){return E===0?"uv":`uv${E}`}function p(E,T,W,j,ie){const L=j.fog,z=ie.geometry,Y=E.isMeshStandardMaterial?j.environment:null,$=(E.isMeshStandardMaterial?n:e).get(E.envMap||Y),b=$&&$.mapping===Yl?$.image.height:null,N=_[E.type];E.precision!==null&&(m=r.getMaxPrecision(E.precision),m!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",m,"instead."));const H=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,K=H!==void 0?H.length:0;let Z=0;z.morphAttributes.position!==void 0&&(Z=1),z.morphAttributes.normal!==void 0&&(Z=2),z.morphAttributes.color!==void 0&&(Z=3);let X,Q,le,me;if(N){const Ht=Yn[N];X=Ht.vertexShader,Q=Ht.fragmentShader}else X=E.vertexShader,Q=E.fragmentShader,l.update(E),le=l.getVertexShaderID(E),me=l.getFragmentShaderID(E);const re=t.getRenderTarget(),ge=ie.isInstancedMesh===!0,Ce=ie.isBatchedMesh===!0,ve=!!E.map,We=!!E.matcap,O=!!$,Et=!!E.aoMap,Me=!!E.lightMap,be=!!E.bumpMap,_e=!!E.normalMap,nt=!!E.displacementMap,we=!!E.emissiveMap,w=!!E.metalnessMap,S=!!E.roughnessMap,k=E.anisotropy>0,ee=E.clearcoat>0,J=E.iridescence>0,ne=E.sheen>0,ye=E.transmission>0,ae=k&&!!E.anisotropyMap,pe=ee&&!!E.clearcoatMap,Ae=ee&&!!E.clearcoatNormalMap,Fe=ee&&!!E.clearcoatRoughnessMap,q=J&&!!E.iridescenceMap,ke=J&&!!E.iridescenceThicknessMap,Ee=ne&&!!E.sheenColorMap,Te=ne&&!!E.sheenRoughnessMap,xe=!!E.specularMap,he=!!E.specularColorMap,Pe=!!E.specularIntensityMap,Ye=ye&&!!E.transmissionMap,$e=ye&&!!E.thicknessMap,Ue=!!E.gradientMap,se=!!E.alphaMap,P=E.alphaTest>0,ue=!!E.alphaHash,ce=!!E.extensions,De=!!z.attributes.uv1,Re=!!z.attributes.uv2,Ze=!!z.attributes.uv3;let Je=ji;return E.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(Je=t.toneMapping),{isWebGL2:f,shaderID:N,shaderType:E.type,shaderName:E.name,vertexShader:X,fragmentShader:Q,defines:E.defines,customVertexShaderID:le,customFragmentShaderID:me,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:m,batching:Ce,instancing:ge,instancingColor:ge&&ie.instanceColor!==null,supportsVertexTextures:h,outputColorSpace:re===null?t.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:Ei,map:ve,matcap:We,envMap:O,envMapMode:O&&$.mapping,envMapCubeUVHeight:b,aoMap:Et,lightMap:Me,bumpMap:be,normalMap:_e,displacementMap:h&&nt,emissiveMap:we,normalMapObjectSpace:_e&&E.normalMapType===wE,normalMapTangentSpace:_e&&E.normalMapType===TE,metalnessMap:w,roughnessMap:S,anisotropy:k,anisotropyMap:ae,clearcoat:ee,clearcoatMap:pe,clearcoatNormalMap:Ae,clearcoatRoughnessMap:Fe,iridescence:J,iridescenceMap:q,iridescenceThicknessMap:ke,sheen:ne,sheenColorMap:Ee,sheenRoughnessMap:Te,specularMap:xe,specularColorMap:he,specularIntensityMap:Pe,transmission:ye,transmissionMap:Ye,thicknessMap:$e,gradientMap:Ue,opaque:E.transparent===!1&&E.blending===ps,alphaMap:se,alphaTest:P,alphaHash:ue,combine:E.combine,mapUv:ve&&x(E.map.channel),aoMapUv:Et&&x(E.aoMap.channel),lightMapUv:Me&&x(E.lightMap.channel),bumpMapUv:be&&x(E.bumpMap.channel),normalMapUv:_e&&x(E.normalMap.channel),displacementMapUv:nt&&x(E.displacementMap.channel),emissiveMapUv:we&&x(E.emissiveMap.channel),metalnessMapUv:w&&x(E.metalnessMap.channel),roughnessMapUv:S&&x(E.roughnessMap.channel),anisotropyMapUv:ae&&x(E.anisotropyMap.channel),clearcoatMapUv:pe&&x(E.clearcoatMap.channel),clearcoatNormalMapUv:Ae&&x(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Fe&&x(E.clearcoatRoughnessMap.channel),iridescenceMapUv:q&&x(E.iridescenceMap.channel),iridescenceThicknessMapUv:ke&&x(E.iridescenceThicknessMap.channel),sheenColorMapUv:Ee&&x(E.sheenColorMap.channel),sheenRoughnessMapUv:Te&&x(E.sheenRoughnessMap.channel),specularMapUv:xe&&x(E.specularMap.channel),specularColorMapUv:he&&x(E.specularColorMap.channel),specularIntensityMapUv:Pe&&x(E.specularIntensityMap.channel),transmissionMapUv:Ye&&x(E.transmissionMap.channel),thicknessMapUv:$e&&x(E.thicknessMap.channel),alphaMapUv:se&&x(E.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(_e||k),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,vertexUv1s:De,vertexUv2s:Re,vertexUv3s:Ze,pointsUvs:ie.isPoints===!0&&!!z.attributes.uv&&(ve||se),fog:!!L,useFog:E.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:ie.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:K,morphTextureStride:Z,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:t.shadowMap.enabled&&W.length>0,shadowMapType:t.shadowMap.type,toneMapping:Je,useLegacyLights:t._useLegacyLights,decodeVideoTexture:ve&&E.map.isVideoTexture===!0&&Qe.getTransfer(E.map.colorSpace)===rt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===ai,flipSided:E.side===rn,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionDerivatives:ce&&E.extensions.derivatives===!0,extensionFragDepth:ce&&E.extensions.fragDepth===!0,extensionDrawBuffers:ce&&E.extensions.drawBuffers===!0,extensionShaderTextureLOD:ce&&E.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ce&&E.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:f||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:f||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:f||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()}}function c(E){const T=[];if(E.shaderID?T.push(E.shaderID):(T.push(E.customVertexShaderID),T.push(E.customFragmentShaderID)),E.defines!==void 0)for(const W in E.defines)T.push(W),T.push(E.defines[W]);return E.isRawShaderMaterial===!1&&(v(T,E),g(T,E),T.push(t.outputColorSpace)),T.push(E.customProgramCacheKey),T.join()}function v(E,T){E.push(T.precision),E.push(T.outputColorSpace),E.push(T.envMapMode),E.push(T.envMapCubeUVHeight),E.push(T.mapUv),E.push(T.alphaMapUv),E.push(T.lightMapUv),E.push(T.aoMapUv),E.push(T.bumpMapUv),E.push(T.normalMapUv),E.push(T.displacementMapUv),E.push(T.emissiveMapUv),E.push(T.metalnessMapUv),E.push(T.roughnessMapUv),E.push(T.anisotropyMapUv),E.push(T.clearcoatMapUv),E.push(T.clearcoatNormalMapUv),E.push(T.clearcoatRoughnessMapUv),E.push(T.iridescenceMapUv),E.push(T.iridescenceThicknessMapUv),E.push(T.sheenColorMapUv),E.push(T.sheenRoughnessMapUv),E.push(T.specularMapUv),E.push(T.specularColorMapUv),E.push(T.specularIntensityMapUv),E.push(T.transmissionMapUv),E.push(T.thicknessMapUv),E.push(T.combine),E.push(T.fogExp2),E.push(T.sizeAttenuation),E.push(T.morphTargetsCount),E.push(T.morphAttributeCount),E.push(T.numDirLights),E.push(T.numPointLights),E.push(T.numSpotLights),E.push(T.numSpotLightMaps),E.push(T.numHemiLights),E.push(T.numRectAreaLights),E.push(T.numDirLightShadows),E.push(T.numPointLightShadows),E.push(T.numSpotLightShadows),E.push(T.numSpotLightShadowsWithMaps),E.push(T.numLightProbes),E.push(T.shadowMapType),E.push(T.toneMapping),E.push(T.numClippingPlanes),E.push(T.numClipIntersection),E.push(T.depthPacking)}function g(E,T){a.disableAll(),T.isWebGL2&&a.enable(0),T.supportsVertexTextures&&a.enable(1),T.instancing&&a.enable(2),T.instancingColor&&a.enable(3),T.matcap&&a.enable(4),T.envMap&&a.enable(5),T.normalMapObjectSpace&&a.enable(6),T.normalMapTangentSpace&&a.enable(7),T.clearcoat&&a.enable(8),T.iridescence&&a.enable(9),T.alphaTest&&a.enable(10),T.vertexColors&&a.enable(11),T.vertexAlphas&&a.enable(12),T.vertexUv1s&&a.enable(13),T.vertexUv2s&&a.enable(14),T.vertexUv3s&&a.enable(15),T.vertexTangents&&a.enable(16),T.anisotropy&&a.enable(17),T.alphaHash&&a.enable(18),T.batching&&a.enable(19),E.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.skinning&&a.enable(4),T.morphTargets&&a.enable(5),T.morphNormals&&a.enable(6),T.morphColors&&a.enable(7),T.premultipliedAlpha&&a.enable(8),T.shadowMapEnabled&&a.enable(9),T.useLegacyLights&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),E.push(a.mask)}function y(E){const T=_[E.type];let W;if(T){const j=Yn[T];W=Rl.clone(j.uniforms)}else W=E.uniforms;return W}function C(E,T){let W;for(let j=0,ie=u.length;j<ie;j++){const L=u[j];if(L.cacheKey===T){W=L,++W.usedTimes;break}}return W===void 0&&(W=new wA(t,T,E,s),u.push(W)),W}function R(E){if(--E.usedTimes===0){const T=u.indexOf(E);u[T]=u[u.length-1],u.pop(),E.destroy()}}function A(E){l.remove(E)}function U(){l.dispose()}return{getParameters:p,getProgramCacheKey:c,getUniforms:y,acquireProgram:C,releaseProgram:R,releaseShaderCache:A,programs:u,dispose:U}}function LA(){let t=new WeakMap;function e(s){let o=t.get(s);return o===void 0&&(o={},t.set(s,o)),o}function n(s){t.delete(s)}function i(s,o,a){t.get(s)[o]=a}function r(){t=new WeakMap}return{get:e,remove:n,update:i,dispose:r}}function bA(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function rm(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function sm(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(d,h,m,_,x,p){let c=t[e];return c===void 0?(c={id:d.id,object:d,geometry:h,material:m,groupOrder:_,renderOrder:d.renderOrder,z:x,group:p},t[e]=c):(c.id=d.id,c.object=d,c.geometry=h,c.material=m,c.groupOrder=_,c.renderOrder=d.renderOrder,c.z=x,c.group=p),e++,c}function a(d,h,m,_,x,p){const c=o(d,h,m,_,x,p);m.transmission>0?i.push(c):m.transparent===!0?r.push(c):n.push(c)}function l(d,h,m,_,x,p){const c=o(d,h,m,_,x,p);m.transmission>0?i.unshift(c):m.transparent===!0?r.unshift(c):n.unshift(c)}function u(d,h){n.length>1&&n.sort(d||bA),i.length>1&&i.sort(h||rm),r.length>1&&r.sort(h||rm)}function f(){for(let d=e,h=t.length;d<h;d++){const m=t[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:f,sort:u}}function DA(){let t=new WeakMap;function e(i,r){const s=t.get(i);let o;return s===void 0?(o=new sm,t.set(i,[o])):r>=s.length?(o=new sm,s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function UA(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new F,color:new je};break;case"SpotLight":n={position:new F,direction:new F,color:new je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new F,color:new je,distance:0,decay:0};break;case"HemisphereLight":n={direction:new F,skyColor:new je,groundColor:new je};break;case"RectAreaLight":n={color:new je,position:new F,halfWidth:new F,halfHeight:new F};break}return t[e.id]=n,n}}}function NA(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ie};break;case"SpotLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ie};break;case"PointLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ie,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let IA=0;function FA(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function OA(t,e){const n=new UA,i=NA(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let f=0;f<9;f++)r.probe.push(new F);const s=new F,o=new Dt,a=new Dt;function l(f,d){let h=0,m=0,_=0;for(let j=0;j<9;j++)r.probe[j].set(0,0,0);let x=0,p=0,c=0,v=0,g=0,y=0,C=0,R=0,A=0,U=0,E=0;f.sort(FA);const T=d===!0?Math.PI:1;for(let j=0,ie=f.length;j<ie;j++){const L=f[j],z=L.color,Y=L.intensity,$=L.distance,b=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=z.r*Y*T,m+=z.g*Y*T,_+=z.b*Y*T;else if(L.isLightProbe){for(let N=0;N<9;N++)r.probe[N].addScaledVector(L.sh.coefficients[N],Y);E++}else if(L.isDirectionalLight){const N=n.get(L);if(N.color.copy(L.color).multiplyScalar(L.intensity*T),L.castShadow){const H=L.shadow,K=i.get(L);K.shadowBias=H.bias,K.shadowNormalBias=H.normalBias,K.shadowRadius=H.radius,K.shadowMapSize=H.mapSize,r.directionalShadow[x]=K,r.directionalShadowMap[x]=b,r.directionalShadowMatrix[x]=L.shadow.matrix,y++}r.directional[x]=N,x++}else if(L.isSpotLight){const N=n.get(L);N.position.setFromMatrixPosition(L.matrixWorld),N.color.copy(z).multiplyScalar(Y*T),N.distance=$,N.coneCos=Math.cos(L.angle),N.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),N.decay=L.decay,r.spot[c]=N;const H=L.shadow;if(L.map&&(r.spotLightMap[A]=L.map,A++,H.updateMatrices(L),L.castShadow&&U++),r.spotLightMatrix[c]=H.matrix,L.castShadow){const K=i.get(L);K.shadowBias=H.bias,K.shadowNormalBias=H.normalBias,K.shadowRadius=H.radius,K.shadowMapSize=H.mapSize,r.spotShadow[c]=K,r.spotShadowMap[c]=b,R++}c++}else if(L.isRectAreaLight){const N=n.get(L);N.color.copy(z).multiplyScalar(Y),N.halfWidth.set(L.width*.5,0,0),N.halfHeight.set(0,L.height*.5,0),r.rectArea[v]=N,v++}else if(L.isPointLight){const N=n.get(L);if(N.color.copy(L.color).multiplyScalar(L.intensity*T),N.distance=L.distance,N.decay=L.decay,L.castShadow){const H=L.shadow,K=i.get(L);K.shadowBias=H.bias,K.shadowNormalBias=H.normalBias,K.shadowRadius=H.radius,K.shadowMapSize=H.mapSize,K.shadowCameraNear=H.camera.near,K.shadowCameraFar=H.camera.far,r.pointShadow[p]=K,r.pointShadowMap[p]=b,r.pointShadowMatrix[p]=L.shadow.matrix,C++}r.point[p]=N,p++}else if(L.isHemisphereLight){const N=n.get(L);N.skyColor.copy(L.color).multiplyScalar(Y*T),N.groundColor.copy(L.groundColor).multiplyScalar(Y*T),r.hemi[g]=N,g++}}v>0&&(e.isWebGL2?t.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=oe.LTC_FLOAT_1,r.rectAreaLTC2=oe.LTC_FLOAT_2):(r.rectAreaLTC1=oe.LTC_HALF_1,r.rectAreaLTC2=oe.LTC_HALF_2):t.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=oe.LTC_FLOAT_1,r.rectAreaLTC2=oe.LTC_FLOAT_2):t.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=oe.LTC_HALF_1,r.rectAreaLTC2=oe.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=h,r.ambient[1]=m,r.ambient[2]=_;const W=r.hash;(W.directionalLength!==x||W.pointLength!==p||W.spotLength!==c||W.rectAreaLength!==v||W.hemiLength!==g||W.numDirectionalShadows!==y||W.numPointShadows!==C||W.numSpotShadows!==R||W.numSpotMaps!==A||W.numLightProbes!==E)&&(r.directional.length=x,r.spot.length=c,r.rectArea.length=v,r.point.length=p,r.hemi.length=g,r.directionalShadow.length=y,r.directionalShadowMap.length=y,r.pointShadow.length=C,r.pointShadowMap.length=C,r.spotShadow.length=R,r.spotShadowMap.length=R,r.directionalShadowMatrix.length=y,r.pointShadowMatrix.length=C,r.spotLightMatrix.length=R+A-U,r.spotLightMap.length=A,r.numSpotLightShadowsWithMaps=U,r.numLightProbes=E,W.directionalLength=x,W.pointLength=p,W.spotLength=c,W.rectAreaLength=v,W.hemiLength=g,W.numDirectionalShadows=y,W.numPointShadows=C,W.numSpotShadows=R,W.numSpotMaps=A,W.numLightProbes=E,r.version=IA++)}function u(f,d){let h=0,m=0,_=0,x=0,p=0;const c=d.matrixWorldInverse;for(let v=0,g=f.length;v<g;v++){const y=f[v];if(y.isDirectionalLight){const C=r.directional[h];C.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(c),h++}else if(y.isSpotLight){const C=r.spot[_];C.position.setFromMatrixPosition(y.matrixWorld),C.position.applyMatrix4(c),C.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(c),_++}else if(y.isRectAreaLight){const C=r.rectArea[x];C.position.setFromMatrixPosition(y.matrixWorld),C.position.applyMatrix4(c),a.identity(),o.copy(y.matrixWorld),o.premultiply(c),a.extractRotation(o),C.halfWidth.set(y.width*.5,0,0),C.halfHeight.set(0,y.height*.5,0),C.halfWidth.applyMatrix4(a),C.halfHeight.applyMatrix4(a),x++}else if(y.isPointLight){const C=r.point[m];C.position.setFromMatrixPosition(y.matrixWorld),C.position.applyMatrix4(c),m++}else if(y.isHemisphereLight){const C=r.hemi[p];C.direction.setFromMatrixPosition(y.matrixWorld),C.direction.transformDirection(c),p++}}}return{setup:l,setupView:u,state:r}}function om(t,e){const n=new OA(t,e),i=[],r=[];function s(){i.length=0,r.length=0}function o(d){i.push(d)}function a(d){r.push(d)}function l(d){n.setup(i,d)}function u(d){n.setupView(i,d)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:n},setupLights:l,setupLightsView:u,pushLight:o,pushShadow:a}}function kA(t,e){let n=new WeakMap;function i(s,o=0){const a=n.get(s);let l;return a===void 0?(l=new om(t,e),n.set(s,[l])):o>=a.length?(l=new om(t,e),a.push(l)):l=a[o],l}function r(){n=new WeakMap}return{get:i,dispose:r}}class BA extends ql{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=EE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class zA extends ql{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const HA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,GA=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function VA(t,e,n){let i=new d_;const r=new Ie,s=new Ie,o=new Lt,a=new BA({depthPacking:ME}),l=new zA,u={},f=n.maxTextureSize,d={[Qi]:rn,[rn]:Qi,[ai]:ai},h=new Jt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ie},radius:{value:4}},vertexShader:HA,fragmentShader:GA}),m=h.clone();m.defines.HORIZONTAL_PASS=1;const _=new tr;_.setAttribute("position",new Qn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new $n(_,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Vv;let c=this.type;this.render=function(R,A,U){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||R.length===0)return;const E=t.getRenderTarget(),T=t.getActiveCubeFace(),W=t.getActiveMipmapLevel(),j=t.state;j.setBlending(pi),j.buffers.color.setClear(1,1,1,1),j.buffers.depth.setTest(!0),j.setScissorTest(!1);const ie=c!==ri&&this.type===ri,L=c===ri&&this.type!==ri;for(let z=0,Y=R.length;z<Y;z++){const $=R[z],b=$.shadow;if(b===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(b.autoUpdate===!1&&b.needsUpdate===!1)continue;r.copy(b.mapSize);const N=b.getFrameExtents();if(r.multiply(N),s.copy(b.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(s.x=Math.floor(f/N.x),r.x=s.x*N.x,b.mapSize.x=s.x),r.y>f&&(s.y=Math.floor(f/N.y),r.y=s.y*N.y,b.mapSize.y=s.y)),b.map===null||ie===!0||L===!0){const K=this.type!==ri?{minFilter:Yt,magFilter:Yt}:{};b.map!==null&&b.map.dispose(),b.map=new zn(r.x,r.y,K),b.map.texture.name=$.name+".shadowMap",b.camera.updateProjectionMatrix()}t.setRenderTarget(b.map),t.clear();const H=b.getViewportCount();for(let K=0;K<H;K++){const Z=b.getViewport(K);o.set(s.x*Z.x,s.y*Z.y,s.x*Z.z,s.y*Z.w),j.viewport(o),b.updateMatrices($,K),i=b.getFrustum(),y(A,U,b.camera,$,this.type)}b.isPointLightShadow!==!0&&this.type===ri&&v(b,U),b.needsUpdate=!1}c=this.type,p.needsUpdate=!1,t.setRenderTarget(E,T,W)};function v(R,A){const U=e.update(x);h.defines.VSM_SAMPLES!==R.blurSamples&&(h.defines.VSM_SAMPLES=R.blurSamples,m.defines.VSM_SAMPLES=R.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new zn(r.x,r.y)),h.uniforms.shadow_pass.value=R.map.texture,h.uniforms.resolution.value=R.mapSize,h.uniforms.radius.value=R.radius,t.setRenderTarget(R.mapPass),t.clear(),t.renderBufferDirect(A,null,U,h,x,null),m.uniforms.shadow_pass.value=R.mapPass.texture,m.uniforms.resolution.value=R.mapSize,m.uniforms.radius.value=R.radius,t.setRenderTarget(R.map),t.clear(),t.renderBufferDirect(A,null,U,m,x,null)}function g(R,A,U,E){let T=null;const W=U.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(W!==void 0)T=W;else if(T=U.isPointLight===!0?l:a,t.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const j=T.uuid,ie=A.uuid;let L=u[j];L===void 0&&(L={},u[j]=L);let z=L[ie];z===void 0&&(z=T.clone(),L[ie]=z,A.addEventListener("dispose",C)),T=z}if(T.visible=A.visible,T.wireframe=A.wireframe,E===ri?T.side=A.shadowSide!==null?A.shadowSide:A.side:T.side=A.shadowSide!==null?A.shadowSide:d[A.side],T.alphaMap=A.alphaMap,T.alphaTest=A.alphaTest,T.map=A.map,T.clipShadows=A.clipShadows,T.clippingPlanes=A.clippingPlanes,T.clipIntersection=A.clipIntersection,T.displacementMap=A.displacementMap,T.displacementScale=A.displacementScale,T.displacementBias=A.displacementBias,T.wireframeLinewidth=A.wireframeLinewidth,T.linewidth=A.linewidth,U.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const j=t.properties.get(T);j.light=U}return T}function y(R,A,U,E,T){if(R.visible===!1)return;if(R.layers.test(A.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&T===ri)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,R.matrixWorld);const ie=e.update(R),L=R.material;if(Array.isArray(L)){const z=ie.groups;for(let Y=0,$=z.length;Y<$;Y++){const b=z[Y],N=L[b.materialIndex];if(N&&N.visible){const H=g(R,N,E,T);R.onBeforeShadow(t,R,A,U,ie,H,b),t.renderBufferDirect(U,null,ie,H,R,b),R.onAfterShadow(t,R,A,U,ie,H,b)}}}else if(L.visible){const z=g(R,L,E,T);R.onBeforeShadow(t,R,A,U,ie,z,null),t.renderBufferDirect(U,null,ie,z,R,null),R.onAfterShadow(t,R,A,U,ie,z,null)}}const j=R.children;for(let ie=0,L=j.length;ie<L;ie++)y(j[ie],A,U,E,T)}function C(R){R.target.removeEventListener("dispose",C);for(const U in u){const E=u[U],T=R.target.uuid;T in E&&(E[T].dispose(),delete E[T])}}}function WA(t,e,n){const i=n.isWebGL2;function r(){let P=!1;const ue=new Lt;let ce=null;const De=new Lt(0,0,0,0);return{setMask:function(Re){ce!==Re&&!P&&(t.colorMask(Re,Re,Re,Re),ce=Re)},setLocked:function(Re){P=Re},setClear:function(Re,Ze,Je,Mt,Ht){Ht===!0&&(Re*=Mt,Ze*=Mt,Je*=Mt),ue.set(Re,Ze,Je,Mt),De.equals(ue)===!1&&(t.clearColor(Re,Ze,Je,Mt),De.copy(ue))},reset:function(){P=!1,ce=null,De.set(-1,0,0,0)}}}function s(){let P=!1,ue=null,ce=null,De=null;return{setTest:function(Re){Re?Ce(t.DEPTH_TEST):ve(t.DEPTH_TEST)},setMask:function(Re){ue!==Re&&!P&&(t.depthMask(Re),ue=Re)},setFunc:function(Re){if(ce!==Re){switch(Re){case ZS:t.depthFunc(t.NEVER);break;case JS:t.depthFunc(t.ALWAYS);break;case eE:t.depthFunc(t.LESS);break;case yl:t.depthFunc(t.LEQUAL);break;case tE:t.depthFunc(t.EQUAL);break;case nE:t.depthFunc(t.GEQUAL);break;case iE:t.depthFunc(t.GREATER);break;case rE:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}ce=Re}},setLocked:function(Re){P=Re},setClear:function(Re){De!==Re&&(t.clearDepth(Re),De=Re)},reset:function(){P=!1,ue=null,ce=null,De=null}}}function o(){let P=!1,ue=null,ce=null,De=null,Re=null,Ze=null,Je=null,Mt=null,Ht=null;return{setTest:function(et){P||(et?Ce(t.STENCIL_TEST):ve(t.STENCIL_TEST))},setMask:function(et){ue!==et&&!P&&(t.stencilMask(et),ue=et)},setFunc:function(et,Gt,Vn){(ce!==et||De!==Gt||Re!==Vn)&&(t.stencilFunc(et,Gt,Vn),ce=et,De=Gt,Re=Vn)},setOp:function(et,Gt,Vn){(Ze!==et||Je!==Gt||Mt!==Vn)&&(t.stencilOp(et,Gt,Vn),Ze=et,Je=Gt,Mt=Vn)},setLocked:function(et){P=et},setClear:function(et){Ht!==et&&(t.clearStencil(et),Ht=et)},reset:function(){P=!1,ue=null,ce=null,De=null,Re=null,Ze=null,Je=null,Mt=null,Ht=null}}}const a=new r,l=new s,u=new o,f=new WeakMap,d=new WeakMap;let h={},m={},_=new WeakMap,x=[],p=null,c=!1,v=null,g=null,y=null,C=null,R=null,A=null,U=null,E=new je(0,0,0),T=0,W=!1,j=null,ie=null,L=null,z=null,Y=null;const $=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let b=!1,N=0;const H=t.getParameter(t.VERSION);H.indexOf("WebGL")!==-1?(N=parseFloat(/^WebGL (\d)/.exec(H)[1]),b=N>=1):H.indexOf("OpenGL ES")!==-1&&(N=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),b=N>=2);let K=null,Z={};const X=t.getParameter(t.SCISSOR_BOX),Q=t.getParameter(t.VIEWPORT),le=new Lt().fromArray(X),me=new Lt().fromArray(Q);function re(P,ue,ce,De){const Re=new Uint8Array(4),Ze=t.createTexture();t.bindTexture(P,Ze),t.texParameteri(P,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(P,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Je=0;Je<ce;Je++)i&&(P===t.TEXTURE_3D||P===t.TEXTURE_2D_ARRAY)?t.texImage3D(ue,0,t.RGBA,1,1,De,0,t.RGBA,t.UNSIGNED_BYTE,Re):t.texImage2D(ue+Je,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,Re);return Ze}const ge={};ge[t.TEXTURE_2D]=re(t.TEXTURE_2D,t.TEXTURE_2D,1),ge[t.TEXTURE_CUBE_MAP]=re(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(ge[t.TEXTURE_2D_ARRAY]=re(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),ge[t.TEXTURE_3D]=re(t.TEXTURE_3D,t.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),u.setClear(0),Ce(t.DEPTH_TEST),l.setFunc(yl),we(!1),w(Hh),Ce(t.CULL_FACE),_e(pi);function Ce(P){h[P]!==!0&&(t.enable(P),h[P]=!0)}function ve(P){h[P]!==!1&&(t.disable(P),h[P]=!1)}function We(P,ue){return m[P]!==ue?(t.bindFramebuffer(P,ue),m[P]=ue,i&&(P===t.DRAW_FRAMEBUFFER&&(m[t.FRAMEBUFFER]=ue),P===t.FRAMEBUFFER&&(m[t.DRAW_FRAMEBUFFER]=ue)),!0):!1}function O(P,ue){let ce=x,De=!1;if(P)if(ce=_.get(ue),ce===void 0&&(ce=[],_.set(ue,ce)),P.isWebGLMultipleRenderTargets){const Re=P.texture;if(ce.length!==Re.length||ce[0]!==t.COLOR_ATTACHMENT0){for(let Ze=0,Je=Re.length;Ze<Je;Ze++)ce[Ze]=t.COLOR_ATTACHMENT0+Ze;ce.length=Re.length,De=!0}}else ce[0]!==t.COLOR_ATTACHMENT0&&(ce[0]=t.COLOR_ATTACHMENT0,De=!0);else ce[0]!==t.BACK&&(ce[0]=t.BACK,De=!0);De&&(n.isWebGL2?t.drawBuffers(ce):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ce))}function Et(P){return p!==P?(t.useProgram(P),p=P,!0):!1}const Me={[dr]:t.FUNC_ADD,[OS]:t.FUNC_SUBTRACT,[kS]:t.FUNC_REVERSE_SUBTRACT};if(i)Me[Wh]=t.MIN,Me[Xh]=t.MAX;else{const P=e.get("EXT_blend_minmax");P!==null&&(Me[Wh]=P.MIN_EXT,Me[Xh]=P.MAX_EXT)}const be={[BS]:t.ZERO,[zS]:t.ONE,[HS]:t.SRC_COLOR,[nf]:t.SRC_ALPHA,[jS]:t.SRC_ALPHA_SATURATE,[XS]:t.DST_COLOR,[VS]:t.DST_ALPHA,[GS]:t.ONE_MINUS_SRC_COLOR,[rf]:t.ONE_MINUS_SRC_ALPHA,[YS]:t.ONE_MINUS_DST_COLOR,[WS]:t.ONE_MINUS_DST_ALPHA,[$S]:t.CONSTANT_COLOR,[qS]:t.ONE_MINUS_CONSTANT_COLOR,[KS]:t.CONSTANT_ALPHA,[QS]:t.ONE_MINUS_CONSTANT_ALPHA};function _e(P,ue,ce,De,Re,Ze,Je,Mt,Ht,et){if(P===pi){c===!0&&(ve(t.BLEND),c=!1);return}if(c===!1&&(Ce(t.BLEND),c=!0),P!==FS){if(P!==v||et!==W){if((g!==dr||R!==dr)&&(t.blendEquation(t.FUNC_ADD),g=dr,R=dr),et)switch(P){case ps:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case tf:t.blendFunc(t.ONE,t.ONE);break;case Gh:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Vh:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case ps:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case tf:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case Gh:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Vh:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}y=null,C=null,A=null,U=null,E.set(0,0,0),T=0,v=P,W=et}return}Re=Re||ue,Ze=Ze||ce,Je=Je||De,(ue!==g||Re!==R)&&(t.blendEquationSeparate(Me[ue],Me[Re]),g=ue,R=Re),(ce!==y||De!==C||Ze!==A||Je!==U)&&(t.blendFuncSeparate(be[ce],be[De],be[Ze],be[Je]),y=ce,C=De,A=Ze,U=Je),(Mt.equals(E)===!1||Ht!==T)&&(t.blendColor(Mt.r,Mt.g,Mt.b,Ht),E.copy(Mt),T=Ht),v=P,W=!1}function nt(P,ue){P.side===ai?ve(t.CULL_FACE):Ce(t.CULL_FACE);let ce=P.side===rn;ue&&(ce=!ce),we(ce),P.blending===ps&&P.transparent===!1?_e(pi):_e(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),l.setFunc(P.depthFunc),l.setTest(P.depthTest),l.setMask(P.depthWrite),a.setMask(P.colorWrite);const De=P.stencilWrite;u.setTest(De),De&&(u.setMask(P.stencilWriteMask),u.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),u.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),k(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?Ce(t.SAMPLE_ALPHA_TO_COVERAGE):ve(t.SAMPLE_ALPHA_TO_COVERAGE)}function we(P){j!==P&&(P?t.frontFace(t.CW):t.frontFace(t.CCW),j=P)}function w(P){P!==US?(Ce(t.CULL_FACE),P!==ie&&(P===Hh?t.cullFace(t.BACK):P===NS?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):ve(t.CULL_FACE),ie=P}function S(P){P!==L&&(b&&t.lineWidth(P),L=P)}function k(P,ue,ce){P?(Ce(t.POLYGON_OFFSET_FILL),(z!==ue||Y!==ce)&&(t.polygonOffset(ue,ce),z=ue,Y=ce)):ve(t.POLYGON_OFFSET_FILL)}function ee(P){P?Ce(t.SCISSOR_TEST):ve(t.SCISSOR_TEST)}function J(P){P===void 0&&(P=t.TEXTURE0+$-1),K!==P&&(t.activeTexture(P),K=P)}function ne(P,ue,ce){ce===void 0&&(K===null?ce=t.TEXTURE0+$-1:ce=K);let De=Z[ce];De===void 0&&(De={type:void 0,texture:void 0},Z[ce]=De),(De.type!==P||De.texture!==ue)&&(K!==ce&&(t.activeTexture(ce),K=ce),t.bindTexture(P,ue||ge[P]),De.type=P,De.texture=ue)}function ye(){const P=Z[K];P!==void 0&&P.type!==void 0&&(t.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function ae(){try{t.compressedTexImage2D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function pe(){try{t.compressedTexImage3D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ae(){try{t.texSubImage2D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Fe(){try{t.texSubImage3D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function q(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ke(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ee(){try{t.texStorage2D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Te(){try{t.texStorage3D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function xe(){try{t.texImage2D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function he(){try{t.texImage3D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Pe(P){le.equals(P)===!1&&(t.scissor(P.x,P.y,P.z,P.w),le.copy(P))}function Ye(P){me.equals(P)===!1&&(t.viewport(P.x,P.y,P.z,P.w),me.copy(P))}function $e(P,ue){let ce=d.get(ue);ce===void 0&&(ce=new WeakMap,d.set(ue,ce));let De=ce.get(P);De===void 0&&(De=t.getUniformBlockIndex(ue,P.name),ce.set(P,De))}function Ue(P,ue){const De=d.get(ue).get(P);f.get(ue)!==De&&(t.uniformBlockBinding(ue,De,P.__bindingPointIndex),f.set(ue,De))}function se(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),i===!0&&(t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null)),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),h={},K=null,Z={},m={},_=new WeakMap,x=[],p=null,c=!1,v=null,g=null,y=null,C=null,R=null,A=null,U=null,E=new je(0,0,0),T=0,W=!1,j=null,ie=null,L=null,z=null,Y=null,le.set(0,0,t.canvas.width,t.canvas.height),me.set(0,0,t.canvas.width,t.canvas.height),a.reset(),l.reset(),u.reset()}return{buffers:{color:a,depth:l,stencil:u},enable:Ce,disable:ve,bindFramebuffer:We,drawBuffers:O,useProgram:Et,setBlending:_e,setMaterial:nt,setFlipSided:we,setCullFace:w,setLineWidth:S,setPolygonOffset:k,setScissorTest:ee,activeTexture:J,bindTexture:ne,unbindTexture:ye,compressedTexImage2D:ae,compressedTexImage3D:pe,texImage2D:xe,texImage3D:he,updateUBOMapping:$e,uniformBlockBinding:Ue,texStorage2D:Ee,texStorage3D:Te,texSubImage2D:Ae,texSubImage3D:Fe,compressedTexSubImage2D:q,compressedTexSubImage3D:ke,scissor:Pe,viewport:Ye,reset:se}}function XA(t,e,n,i,r,s,o){const a=r.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,u=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),f=new WeakMap;let d;const h=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(w,S){return m?new OffscreenCanvas(w,S):Al("canvas")}function x(w,S,k,ee){let J=1;if((w.width>ee||w.height>ee)&&(J=ee/Math.max(w.width,w.height)),J<1||S===!0)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap){const ne=S?wl:Math.floor,ye=ne(J*w.width),ae=ne(J*w.height);d===void 0&&(d=_(ye,ae));const pe=k?_(ye,ae):d;return pe.width=ye,pe.height=ae,pe.getContext("2d").drawImage(w,0,0,ye,ae),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+w.width+"x"+w.height+") to ("+ye+"x"+ae+")."),pe}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+w.width+"x"+w.height+")."),w;return w}function p(w){return cf(w.width)&&cf(w.height)}function c(w){return a?!1:w.wrapS!==Fn||w.wrapT!==Fn||w.minFilter!==Yt&&w.minFilter!==yn}function v(w,S){return w.generateMipmaps&&S&&w.minFilter!==Yt&&w.minFilter!==yn}function g(w){t.generateMipmap(w)}function y(w,S,k,ee,J=!1){if(a===!1)return S;if(w!==null){if(t[w]!==void 0)return t[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let ne=S;if(S===t.RED&&(k===t.FLOAT&&(ne=t.R32F),k===t.HALF_FLOAT&&(ne=t.R16F),k===t.UNSIGNED_BYTE&&(ne=t.R8)),S===t.RED_INTEGER&&(k===t.UNSIGNED_BYTE&&(ne=t.R8UI),k===t.UNSIGNED_SHORT&&(ne=t.R16UI),k===t.UNSIGNED_INT&&(ne=t.R32UI),k===t.BYTE&&(ne=t.R8I),k===t.SHORT&&(ne=t.R16I),k===t.INT&&(ne=t.R32I)),S===t.RG&&(k===t.FLOAT&&(ne=t.RG32F),k===t.HALF_FLOAT&&(ne=t.RG16F),k===t.UNSIGNED_BYTE&&(ne=t.RG8)),S===t.RGBA){const ye=J?Sl:Qe.getTransfer(ee);k===t.FLOAT&&(ne=t.RGBA32F),k===t.HALF_FLOAT&&(ne=t.RGBA16F),k===t.UNSIGNED_BYTE&&(ne=ye===rt?t.SRGB8_ALPHA8:t.RGBA8),k===t.UNSIGNED_SHORT_4_4_4_4&&(ne=t.RGBA4),k===t.UNSIGNED_SHORT_5_5_5_1&&(ne=t.RGB5_A1)}return(ne===t.R16F||ne===t.R32F||ne===t.RG16F||ne===t.RG32F||ne===t.RGBA16F||ne===t.RGBA32F)&&e.get("EXT_color_buffer_float"),ne}function C(w,S,k){return v(w,k)===!0||w.isFramebufferTexture&&w.minFilter!==Yt&&w.minFilter!==yn?Math.log2(Math.max(S.width,S.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?S.mipmaps.length:1}function R(w){return w===Yt||w===Yh||w===bu?t.NEAREST:t.LINEAR}function A(w){const S=w.target;S.removeEventListener("dispose",A),E(S),S.isVideoTexture&&f.delete(S)}function U(w){const S=w.target;S.removeEventListener("dispose",U),W(S)}function E(w){const S=i.get(w);if(S.__webglInit===void 0)return;const k=w.source,ee=h.get(k);if(ee){const J=ee[S.__cacheKey];J.usedTimes--,J.usedTimes===0&&T(w),Object.keys(ee).length===0&&h.delete(k)}i.remove(w)}function T(w){const S=i.get(w);t.deleteTexture(S.__webglTexture);const k=w.source,ee=h.get(k);delete ee[S.__cacheKey],o.memory.textures--}function W(w){const S=w.texture,k=i.get(w),ee=i.get(S);if(ee.__webglTexture!==void 0&&(t.deleteTexture(ee.__webglTexture),o.memory.textures--),w.depthTexture&&w.depthTexture.dispose(),w.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(k.__webglFramebuffer[J]))for(let ne=0;ne<k.__webglFramebuffer[J].length;ne++)t.deleteFramebuffer(k.__webglFramebuffer[J][ne]);else t.deleteFramebuffer(k.__webglFramebuffer[J]);k.__webglDepthbuffer&&t.deleteRenderbuffer(k.__webglDepthbuffer[J])}else{if(Array.isArray(k.__webglFramebuffer))for(let J=0;J<k.__webglFramebuffer.length;J++)t.deleteFramebuffer(k.__webglFramebuffer[J]);else t.deleteFramebuffer(k.__webglFramebuffer);if(k.__webglDepthbuffer&&t.deleteRenderbuffer(k.__webglDepthbuffer),k.__webglMultisampledFramebuffer&&t.deleteFramebuffer(k.__webglMultisampledFramebuffer),k.__webglColorRenderbuffer)for(let J=0;J<k.__webglColorRenderbuffer.length;J++)k.__webglColorRenderbuffer[J]&&t.deleteRenderbuffer(k.__webglColorRenderbuffer[J]);k.__webglDepthRenderbuffer&&t.deleteRenderbuffer(k.__webglDepthRenderbuffer)}if(w.isWebGLMultipleRenderTargets)for(let J=0,ne=S.length;J<ne;J++){const ye=i.get(S[J]);ye.__webglTexture&&(t.deleteTexture(ye.__webglTexture),o.memory.textures--),i.remove(S[J])}i.remove(S),i.remove(w)}let j=0;function ie(){j=0}function L(){const w=j;return w>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+r.maxTextures),j+=1,w}function z(w){const S=[];return S.push(w.wrapS),S.push(w.wrapT),S.push(w.wrapR||0),S.push(w.magFilter),S.push(w.minFilter),S.push(w.anisotropy),S.push(w.internalFormat),S.push(w.format),S.push(w.type),S.push(w.generateMipmaps),S.push(w.premultiplyAlpha),S.push(w.flipY),S.push(w.unpackAlignment),S.push(w.colorSpace),S.join()}function Y(w,S){const k=i.get(w);if(w.isVideoTexture&&nt(w),w.isRenderTargetTexture===!1&&w.version>0&&k.__version!==w.version){const ee=w.image;if(ee===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{le(k,w,S);return}}n.bindTexture(t.TEXTURE_2D,k.__webglTexture,t.TEXTURE0+S)}function $(w,S){const k=i.get(w);if(w.version>0&&k.__version!==w.version){le(k,w,S);return}n.bindTexture(t.TEXTURE_2D_ARRAY,k.__webglTexture,t.TEXTURE0+S)}function b(w,S){const k=i.get(w);if(w.version>0&&k.__version!==w.version){le(k,w,S);return}n.bindTexture(t.TEXTURE_3D,k.__webglTexture,t.TEXTURE0+S)}function N(w,S){const k=i.get(w);if(w.version>0&&k.__version!==w.version){me(k,w,S);return}n.bindTexture(t.TEXTURE_CUBE_MAP,k.__webglTexture,t.TEXTURE0+S)}const H={[af]:t.REPEAT,[Fn]:t.CLAMP_TO_EDGE,[lf]:t.MIRRORED_REPEAT},K={[Yt]:t.NEAREST,[Yh]:t.NEAREST_MIPMAP_NEAREST,[bu]:t.NEAREST_MIPMAP_LINEAR,[yn]:t.LINEAR,[hE]:t.LINEAR_MIPMAP_NEAREST,[bo]:t.LINEAR_MIPMAP_LINEAR},Z={[AE]:t.NEVER,[DE]:t.ALWAYS,[RE]:t.LESS,[e_]:t.LEQUAL,[CE]:t.EQUAL,[bE]:t.GEQUAL,[PE]:t.GREATER,[LE]:t.NOTEQUAL};function X(w,S,k){if(k?(t.texParameteri(w,t.TEXTURE_WRAP_S,H[S.wrapS]),t.texParameteri(w,t.TEXTURE_WRAP_T,H[S.wrapT]),(w===t.TEXTURE_3D||w===t.TEXTURE_2D_ARRAY)&&t.texParameteri(w,t.TEXTURE_WRAP_R,H[S.wrapR]),t.texParameteri(w,t.TEXTURE_MAG_FILTER,K[S.magFilter]),t.texParameteri(w,t.TEXTURE_MIN_FILTER,K[S.minFilter])):(t.texParameteri(w,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(w,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),(w===t.TEXTURE_3D||w===t.TEXTURE_2D_ARRAY)&&t.texParameteri(w,t.TEXTURE_WRAP_R,t.CLAMP_TO_EDGE),(S.wrapS!==Fn||S.wrapT!==Fn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),t.texParameteri(w,t.TEXTURE_MAG_FILTER,R(S.magFilter)),t.texParameteri(w,t.TEXTURE_MIN_FILTER,R(S.minFilter)),S.minFilter!==Yt&&S.minFilter!==yn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),S.compareFunction&&(t.texParameteri(w,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(w,t.TEXTURE_COMPARE_FUNC,Z[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const ee=e.get("EXT_texture_filter_anisotropic");if(S.magFilter===Yt||S.minFilter!==bu&&S.minFilter!==bo||S.type===ki&&e.has("OES_texture_float_linear")===!1||a===!1&&S.type===mi&&e.has("OES_texture_half_float_linear")===!1)return;(S.anisotropy>1||i.get(S).__currentAnisotropy)&&(t.texParameterf(w,ee.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy)}}function Q(w,S){let k=!1;w.__webglInit===void 0&&(w.__webglInit=!0,S.addEventListener("dispose",A));const ee=S.source;let J=h.get(ee);J===void 0&&(J={},h.set(ee,J));const ne=z(S);if(ne!==w.__cacheKey){J[ne]===void 0&&(J[ne]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,k=!0),J[ne].usedTimes++;const ye=J[w.__cacheKey];ye!==void 0&&(J[w.__cacheKey].usedTimes--,ye.usedTimes===0&&T(S)),w.__cacheKey=ne,w.__webglTexture=J[ne].texture}return k}function le(w,S,k){let ee=t.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(ee=t.TEXTURE_2D_ARRAY),S.isData3DTexture&&(ee=t.TEXTURE_3D);const J=Q(w,S),ne=S.source;n.bindTexture(ee,w.__webglTexture,t.TEXTURE0+k);const ye=i.get(ne);if(ne.version!==ye.__version||J===!0){n.activeTexture(t.TEXTURE0+k);const ae=Qe.getPrimaries(Qe.workingColorSpace),pe=S.colorSpace===Sn?null:Qe.getPrimaries(S.colorSpace),Ae=S.colorSpace===Sn||ae===pe?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);const Fe=c(S)&&p(S.image)===!1;let q=x(S.image,Fe,!1,r.maxTextureSize);q=we(S,q);const ke=p(q)||a,Ee=s.convert(S.format,S.colorSpace);let Te=s.convert(S.type),xe=y(S.internalFormat,Ee,Te,S.colorSpace,S.isVideoTexture);X(ee,S,ke);let he;const Pe=S.mipmaps,Ye=a&&S.isVideoTexture!==!0&&xe!==Zv,$e=ye.__version===void 0||J===!0,Ue=C(S,q,ke);if(S.isDepthTexture)xe=t.DEPTH_COMPONENT,a?S.type===ki?xe=t.DEPTH_COMPONENT32F:S.type===Oi?xe=t.DEPTH_COMPONENT24:S.type===xr?xe=t.DEPTH24_STENCIL8:xe=t.DEPTH_COMPONENT16:S.type===ki&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),S.format===yr&&xe===t.DEPTH_COMPONENT&&S.type!==hd&&S.type!==Oi&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),S.type=Oi,Te=s.convert(S.type)),S.format===ws&&xe===t.DEPTH_COMPONENT&&(xe=t.DEPTH_STENCIL,S.type!==xr&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),S.type=xr,Te=s.convert(S.type))),$e&&(Ye?n.texStorage2D(t.TEXTURE_2D,1,xe,q.width,q.height):n.texImage2D(t.TEXTURE_2D,0,xe,q.width,q.height,0,Ee,Te,null));else if(S.isDataTexture)if(Pe.length>0&&ke){Ye&&$e&&n.texStorage2D(t.TEXTURE_2D,Ue,xe,Pe[0].width,Pe[0].height);for(let se=0,P=Pe.length;se<P;se++)he=Pe[se],Ye?n.texSubImage2D(t.TEXTURE_2D,se,0,0,he.width,he.height,Ee,Te,he.data):n.texImage2D(t.TEXTURE_2D,se,xe,he.width,he.height,0,Ee,Te,he.data);S.generateMipmaps=!1}else Ye?($e&&n.texStorage2D(t.TEXTURE_2D,Ue,xe,q.width,q.height),n.texSubImage2D(t.TEXTURE_2D,0,0,0,q.width,q.height,Ee,Te,q.data)):n.texImage2D(t.TEXTURE_2D,0,xe,q.width,q.height,0,Ee,Te,q.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Ye&&$e&&n.texStorage3D(t.TEXTURE_2D_ARRAY,Ue,xe,Pe[0].width,Pe[0].height,q.depth);for(let se=0,P=Pe.length;se<P;se++)he=Pe[se],S.format!==On?Ee!==null?Ye?n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,se,0,0,0,he.width,he.height,q.depth,Ee,he.data,0,0):n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,se,xe,he.width,he.height,q.depth,0,he.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?n.texSubImage3D(t.TEXTURE_2D_ARRAY,se,0,0,0,he.width,he.height,q.depth,Ee,Te,he.data):n.texImage3D(t.TEXTURE_2D_ARRAY,se,xe,he.width,he.height,q.depth,0,Ee,Te,he.data)}else{Ye&&$e&&n.texStorage2D(t.TEXTURE_2D,Ue,xe,Pe[0].width,Pe[0].height);for(let se=0,P=Pe.length;se<P;se++)he=Pe[se],S.format!==On?Ee!==null?Ye?n.compressedTexSubImage2D(t.TEXTURE_2D,se,0,0,he.width,he.height,Ee,he.data):n.compressedTexImage2D(t.TEXTURE_2D,se,xe,he.width,he.height,0,he.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?n.texSubImage2D(t.TEXTURE_2D,se,0,0,he.width,he.height,Ee,Te,he.data):n.texImage2D(t.TEXTURE_2D,se,xe,he.width,he.height,0,Ee,Te,he.data)}else if(S.isDataArrayTexture)Ye?($e&&n.texStorage3D(t.TEXTURE_2D_ARRAY,Ue,xe,q.width,q.height,q.depth),n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,q.width,q.height,q.depth,Ee,Te,q.data)):n.texImage3D(t.TEXTURE_2D_ARRAY,0,xe,q.width,q.height,q.depth,0,Ee,Te,q.data);else if(S.isData3DTexture)Ye?($e&&n.texStorage3D(t.TEXTURE_3D,Ue,xe,q.width,q.height,q.depth),n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,q.width,q.height,q.depth,Ee,Te,q.data)):n.texImage3D(t.TEXTURE_3D,0,xe,q.width,q.height,q.depth,0,Ee,Te,q.data);else if(S.isFramebufferTexture){if($e)if(Ye)n.texStorage2D(t.TEXTURE_2D,Ue,xe,q.width,q.height);else{let se=q.width,P=q.height;for(let ue=0;ue<Ue;ue++)n.texImage2D(t.TEXTURE_2D,ue,xe,se,P,0,Ee,Te,null),se>>=1,P>>=1}}else if(Pe.length>0&&ke){Ye&&$e&&n.texStorage2D(t.TEXTURE_2D,Ue,xe,Pe[0].width,Pe[0].height);for(let se=0,P=Pe.length;se<P;se++)he=Pe[se],Ye?n.texSubImage2D(t.TEXTURE_2D,se,0,0,Ee,Te,he):n.texImage2D(t.TEXTURE_2D,se,xe,Ee,Te,he);S.generateMipmaps=!1}else Ye?($e&&n.texStorage2D(t.TEXTURE_2D,Ue,xe,q.width,q.height),n.texSubImage2D(t.TEXTURE_2D,0,0,0,Ee,Te,q)):n.texImage2D(t.TEXTURE_2D,0,xe,Ee,Te,q);v(S,ke)&&g(ee),ye.__version=ne.version,S.onUpdate&&S.onUpdate(S)}w.__version=S.version}function me(w,S,k){if(S.image.length!==6)return;const ee=Q(w,S),J=S.source;n.bindTexture(t.TEXTURE_CUBE_MAP,w.__webglTexture,t.TEXTURE0+k);const ne=i.get(J);if(J.version!==ne.__version||ee===!0){n.activeTexture(t.TEXTURE0+k);const ye=Qe.getPrimaries(Qe.workingColorSpace),ae=S.colorSpace===Sn?null:Qe.getPrimaries(S.colorSpace),pe=S.colorSpace===Sn||ye===ae?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe);const Ae=S.isCompressedTexture||S.image[0].isCompressedTexture,Fe=S.image[0]&&S.image[0].isDataTexture,q=[];for(let se=0;se<6;se++)!Ae&&!Fe?q[se]=x(S.image[se],!1,!0,r.maxCubemapSize):q[se]=Fe?S.image[se].image:S.image[se],q[se]=we(S,q[se]);const ke=q[0],Ee=p(ke)||a,Te=s.convert(S.format,S.colorSpace),xe=s.convert(S.type),he=y(S.internalFormat,Te,xe,S.colorSpace),Pe=a&&S.isVideoTexture!==!0,Ye=ne.__version===void 0||ee===!0;let $e=C(S,ke,Ee);X(t.TEXTURE_CUBE_MAP,S,Ee);let Ue;if(Ae){Pe&&Ye&&n.texStorage2D(t.TEXTURE_CUBE_MAP,$e,he,ke.width,ke.height);for(let se=0;se<6;se++){Ue=q[se].mipmaps;for(let P=0;P<Ue.length;P++){const ue=Ue[P];S.format!==On?Te!==null?Pe?n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+se,P,0,0,ue.width,ue.height,Te,ue.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+se,P,he,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Pe?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+se,P,0,0,ue.width,ue.height,Te,xe,ue.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+se,P,he,ue.width,ue.height,0,Te,xe,ue.data)}}}else{Ue=S.mipmaps,Pe&&Ye&&(Ue.length>0&&$e++,n.texStorage2D(t.TEXTURE_CUBE_MAP,$e,he,q[0].width,q[0].height));for(let se=0;se<6;se++)if(Fe){Pe?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,q[se].width,q[se].height,Te,xe,q[se].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,he,q[se].width,q[se].height,0,Te,xe,q[se].data);for(let P=0;P<Ue.length;P++){const ce=Ue[P].image[se].image;Pe?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+se,P+1,0,0,ce.width,ce.height,Te,xe,ce.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+se,P+1,he,ce.width,ce.height,0,Te,xe,ce.data)}}else{Pe?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,Te,xe,q[se]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,he,Te,xe,q[se]);for(let P=0;P<Ue.length;P++){const ue=Ue[P];Pe?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+se,P+1,0,0,Te,xe,ue.image[se]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+se,P+1,he,Te,xe,ue.image[se])}}}v(S,Ee)&&g(t.TEXTURE_CUBE_MAP),ne.__version=J.version,S.onUpdate&&S.onUpdate(S)}w.__version=S.version}function re(w,S,k,ee,J,ne){const ye=s.convert(k.format,k.colorSpace),ae=s.convert(k.type),pe=y(k.internalFormat,ye,ae,k.colorSpace);if(!i.get(S).__hasExternalTextures){const Fe=Math.max(1,S.width>>ne),q=Math.max(1,S.height>>ne);J===t.TEXTURE_3D||J===t.TEXTURE_2D_ARRAY?n.texImage3D(J,ne,pe,Fe,q,S.depth,0,ye,ae,null):n.texImage2D(J,ne,pe,Fe,q,0,ye,ae,null)}n.bindFramebuffer(t.FRAMEBUFFER,w),_e(S)?l.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ee,J,i.get(k).__webglTexture,0,be(S)):(J===t.TEXTURE_2D||J>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,ee,J,i.get(k).__webglTexture,ne),n.bindFramebuffer(t.FRAMEBUFFER,null)}function ge(w,S,k){if(t.bindRenderbuffer(t.RENDERBUFFER,w),S.depthBuffer&&!S.stencilBuffer){let ee=a===!0?t.DEPTH_COMPONENT24:t.DEPTH_COMPONENT16;if(k||_e(S)){const J=S.depthTexture;J&&J.isDepthTexture&&(J.type===ki?ee=t.DEPTH_COMPONENT32F:J.type===Oi&&(ee=t.DEPTH_COMPONENT24));const ne=be(S);_e(S)?l.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ne,ee,S.width,S.height):t.renderbufferStorageMultisample(t.RENDERBUFFER,ne,ee,S.width,S.height)}else t.renderbufferStorage(t.RENDERBUFFER,ee,S.width,S.height);t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,w)}else if(S.depthBuffer&&S.stencilBuffer){const ee=be(S);k&&_e(S)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,ee,t.DEPTH24_STENCIL8,S.width,S.height):_e(S)?l.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ee,t.DEPTH24_STENCIL8,S.width,S.height):t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_STENCIL,S.width,S.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.RENDERBUFFER,w)}else{const ee=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let J=0;J<ee.length;J++){const ne=ee[J],ye=s.convert(ne.format,ne.colorSpace),ae=s.convert(ne.type),pe=y(ne.internalFormat,ye,ae,ne.colorSpace),Ae=be(S);k&&_e(S)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,Ae,pe,S.width,S.height):_e(S)?l.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Ae,pe,S.width,S.height):t.renderbufferStorage(t.RENDERBUFFER,pe,S.width,S.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function Ce(w,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,w),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),Y(S.depthTexture,0);const ee=i.get(S.depthTexture).__webglTexture,J=be(S);if(S.depthTexture.format===yr)_e(S)?l.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ee,0,J):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ee,0);else if(S.depthTexture.format===ws)_e(S)?l.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ee,0,J):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function ve(w){const S=i.get(w),k=w.isWebGLCubeRenderTarget===!0;if(w.depthTexture&&!S.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");Ce(S.__webglFramebuffer,w)}else if(k){S.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer[ee]),S.__webglDepthbuffer[ee]=t.createRenderbuffer(),ge(S.__webglDepthbuffer[ee],w,!1)}else n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer=t.createRenderbuffer(),ge(S.__webglDepthbuffer,w,!1);n.bindFramebuffer(t.FRAMEBUFFER,null)}function We(w,S,k){const ee=i.get(w);S!==void 0&&re(ee.__webglFramebuffer,w,w.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),k!==void 0&&ve(w)}function O(w){const S=w.texture,k=i.get(w),ee=i.get(S);w.addEventListener("dispose",U),w.isWebGLMultipleRenderTargets!==!0&&(ee.__webglTexture===void 0&&(ee.__webglTexture=t.createTexture()),ee.__version=S.version,o.memory.textures++);const J=w.isWebGLCubeRenderTarget===!0,ne=w.isWebGLMultipleRenderTargets===!0,ye=p(w)||a;if(J){k.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(a&&S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer[ae]=[];for(let pe=0;pe<S.mipmaps.length;pe++)k.__webglFramebuffer[ae][pe]=t.createFramebuffer()}else k.__webglFramebuffer[ae]=t.createFramebuffer()}else{if(a&&S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer=[];for(let ae=0;ae<S.mipmaps.length;ae++)k.__webglFramebuffer[ae]=t.createFramebuffer()}else k.__webglFramebuffer=t.createFramebuffer();if(ne)if(r.drawBuffers){const ae=w.texture;for(let pe=0,Ae=ae.length;pe<Ae;pe++){const Fe=i.get(ae[pe]);Fe.__webglTexture===void 0&&(Fe.__webglTexture=t.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&w.samples>0&&_e(w)===!1){const ae=ne?S:[S];k.__webglMultisampledFramebuffer=t.createFramebuffer(),k.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let pe=0;pe<ae.length;pe++){const Ae=ae[pe];k.__webglColorRenderbuffer[pe]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,k.__webglColorRenderbuffer[pe]);const Fe=s.convert(Ae.format,Ae.colorSpace),q=s.convert(Ae.type),ke=y(Ae.internalFormat,Fe,q,Ae.colorSpace,w.isXRRenderTarget===!0),Ee=be(w);t.renderbufferStorageMultisample(t.RENDERBUFFER,Ee,ke,w.width,w.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+pe,t.RENDERBUFFER,k.__webglColorRenderbuffer[pe])}t.bindRenderbuffer(t.RENDERBUFFER,null),w.depthBuffer&&(k.__webglDepthRenderbuffer=t.createRenderbuffer(),ge(k.__webglDepthRenderbuffer,w,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(J){n.bindTexture(t.TEXTURE_CUBE_MAP,ee.__webglTexture),X(t.TEXTURE_CUBE_MAP,S,ye);for(let ae=0;ae<6;ae++)if(a&&S.mipmaps&&S.mipmaps.length>0)for(let pe=0;pe<S.mipmaps.length;pe++)re(k.__webglFramebuffer[ae][pe],w,S,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,pe);else re(k.__webglFramebuffer[ae],w,S,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);v(S,ye)&&g(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(ne){const ae=w.texture;for(let pe=0,Ae=ae.length;pe<Ae;pe++){const Fe=ae[pe],q=i.get(Fe);n.bindTexture(t.TEXTURE_2D,q.__webglTexture),X(t.TEXTURE_2D,Fe,ye),re(k.__webglFramebuffer,w,Fe,t.COLOR_ATTACHMENT0+pe,t.TEXTURE_2D,0),v(Fe,ye)&&g(t.TEXTURE_2D)}n.unbindTexture()}else{let ae=t.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(a?ae=w.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),n.bindTexture(ae,ee.__webglTexture),X(ae,S,ye),a&&S.mipmaps&&S.mipmaps.length>0)for(let pe=0;pe<S.mipmaps.length;pe++)re(k.__webglFramebuffer[pe],w,S,t.COLOR_ATTACHMENT0,ae,pe);else re(k.__webglFramebuffer,w,S,t.COLOR_ATTACHMENT0,ae,0);v(S,ye)&&g(ae),n.unbindTexture()}w.depthBuffer&&ve(w)}function Et(w){const S=p(w)||a,k=w.isWebGLMultipleRenderTargets===!0?w.texture:[w.texture];for(let ee=0,J=k.length;ee<J;ee++){const ne=k[ee];if(v(ne,S)){const ye=w.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:t.TEXTURE_2D,ae=i.get(ne).__webglTexture;n.bindTexture(ye,ae),g(ye),n.unbindTexture()}}}function Me(w){if(a&&w.samples>0&&_e(w)===!1){const S=w.isWebGLMultipleRenderTargets?w.texture:[w.texture],k=w.width,ee=w.height;let J=t.COLOR_BUFFER_BIT;const ne=[],ye=w.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ae=i.get(w),pe=w.isWebGLMultipleRenderTargets===!0;if(pe)for(let Ae=0;Ae<S.length;Ae++)n.bindFramebuffer(t.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ae,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,ae.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ae,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,ae.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ae.__webglFramebuffer);for(let Ae=0;Ae<S.length;Ae++){ne.push(t.COLOR_ATTACHMENT0+Ae),w.depthBuffer&&ne.push(ye);const Fe=ae.__ignoreDepthValues!==void 0?ae.__ignoreDepthValues:!1;if(Fe===!1&&(w.depthBuffer&&(J|=t.DEPTH_BUFFER_BIT),w.stencilBuffer&&(J|=t.STENCIL_BUFFER_BIT)),pe&&t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,ae.__webglColorRenderbuffer[Ae]),Fe===!0&&(t.invalidateFramebuffer(t.READ_FRAMEBUFFER,[ye]),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[ye])),pe){const q=i.get(S[Ae]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,q,0)}t.blitFramebuffer(0,0,k,ee,0,0,k,ee,J,t.NEAREST),u&&t.invalidateFramebuffer(t.READ_FRAMEBUFFER,ne)}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),pe)for(let Ae=0;Ae<S.length;Ae++){n.bindFramebuffer(t.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ae,t.RENDERBUFFER,ae.__webglColorRenderbuffer[Ae]);const Fe=i.get(S[Ae]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,ae.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ae,t.TEXTURE_2D,Fe,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ae.__webglMultisampledFramebuffer)}}function be(w){return Math.min(r.maxSamples,w.samples)}function _e(w){const S=i.get(w);return a&&w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function nt(w){const S=o.render.frame;f.get(w)!==S&&(f.set(w,S),w.update())}function we(w,S){const k=w.colorSpace,ee=w.format,J=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||w.format===uf||k!==Ei&&k!==Sn&&(Qe.getTransfer(k)===rt?a===!1?e.has("EXT_sRGB")===!0&&ee===On?(w.format=uf,w.minFilter=yn,w.generateMipmaps=!1):S=n_.sRGBToLinear(S):(ee!==On||J!==$i)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),S}this.allocateTextureUnit=L,this.resetTextureUnits=ie,this.setTexture2D=Y,this.setTexture2DArray=$,this.setTexture3D=b,this.setTextureCube=N,this.rebindTextures=We,this.setupRenderTarget=O,this.updateRenderTargetMipmap=Et,this.updateMultisampleRenderTarget=Me,this.setupDepthRenderbuffer=ve,this.setupFrameBufferTexture=re,this.useMultisampledRTT=_e}function YA(t,e,n){const i=n.isWebGL2;function r(s,o=Sn){let a;const l=Qe.getTransfer(o);if(s===$i)return t.UNSIGNED_BYTE;if(s===jv)return t.UNSIGNED_SHORT_4_4_4_4;if(s===$v)return t.UNSIGNED_SHORT_5_5_5_1;if(s===pE)return t.BYTE;if(s===mE)return t.SHORT;if(s===hd)return t.UNSIGNED_SHORT;if(s===Yv)return t.INT;if(s===Oi)return t.UNSIGNED_INT;if(s===ki)return t.FLOAT;if(s===mi)return i?t.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===gE)return t.ALPHA;if(s===On)return t.RGBA;if(s===vE)return t.LUMINANCE;if(s===_E)return t.LUMINANCE_ALPHA;if(s===yr)return t.DEPTH_COMPONENT;if(s===ws)return t.DEPTH_STENCIL;if(s===uf)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===xE)return t.RED;if(s===qv)return t.RED_INTEGER;if(s===yE)return t.RG;if(s===Kv)return t.RG_INTEGER;if(s===Qv)return t.RGBA_INTEGER;if(s===Du||s===Uu||s===Nu||s===Iu)if(l===rt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===Du)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Uu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Nu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Iu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===Du)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Uu)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Nu)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Iu)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===jh||s===$h||s===qh||s===Kh)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===jh)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===$h)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===qh)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Kh)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Zv)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Qh||s===Zh)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===Qh)return l===rt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===Zh)return l===rt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Jh||s===ep||s===tp||s===np||s===ip||s===rp||s===sp||s===op||s===ap||s===lp||s===up||s===cp||s===fp||s===dp)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===Jh)return l===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===ep)return l===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===tp)return l===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===np)return l===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===ip)return l===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===rp)return l===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===sp)return l===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===op)return l===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===ap)return l===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===lp)return l===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===up)return l===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===cp)return l===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===fp)return l===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===dp)return l===rt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Fu||s===hp||s===pp)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===Fu)return l===rt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===hp)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===pp)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===SE||s===mp||s===gp||s===vp)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===Fu)return a.COMPRESSED_RED_RGTC1_EXT;if(s===mp)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===gp)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===vp)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===xr?i?t.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):t[s]!==void 0?t[s]:null}return{convert:r}}class jA extends In{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ua extends dn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const $A={type:"move"};class sc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ua,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ua,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ua,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,u=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(u&&e.hand){o=!0;for(const x of e.hand.values()){const p=n.getJointPose(x,i),c=this._getHandJoint(u,x);p!==null&&(c.matrix.fromArray(p.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,c.jointRadius=p.radius),c.visible=p!==null}const f=u.joints["index-finger-tip"],d=u.joints["thumb-tip"],h=f.position.distanceTo(d.position),m=.02,_=.005;u.inputState.pinching&&h>m+_?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&h<=m-_&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent($A)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),u!==null&&(u.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Ua;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}class qA extends Us{constructor(e,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,u=null,f=null,d=null,h=null,m=null,_=null;const x=n.getContextAttributes();let p=null,c=null;const v=[],g=[],y=new Ie;let C=null;const R=new In;R.layers.enable(1),R.viewport=new Lt;const A=new In;A.layers.enable(2),A.viewport=new Lt;const U=[R,A],E=new jA;E.layers.enable(1),E.layers.enable(2);let T=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let Q=v[X];return Q===void 0&&(Q=new sc,v[X]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(X){let Q=v[X];return Q===void 0&&(Q=new sc,v[X]=Q),Q.getGripSpace()},this.getHand=function(X){let Q=v[X];return Q===void 0&&(Q=new sc,v[X]=Q),Q.getHandSpace()};function j(X){const Q=g.indexOf(X.inputSource);if(Q===-1)return;const le=v[Q];le!==void 0&&(le.update(X.inputSource,X.frame,u||o),le.dispatchEvent({type:X.type,data:X.inputSource}))}function ie(){r.removeEventListener("select",j),r.removeEventListener("selectstart",j),r.removeEventListener("selectend",j),r.removeEventListener("squeeze",j),r.removeEventListener("squeezestart",j),r.removeEventListener("squeezeend",j),r.removeEventListener("end",ie),r.removeEventListener("inputsourceschange",L);for(let X=0;X<v.length;X++){const Q=g[X];Q!==null&&(g[X]=null,v[X].disconnect(Q))}T=null,W=null,e.setRenderTarget(p),m=null,h=null,d=null,r=null,c=null,Z.stop(),i.isPresenting=!1,e.setPixelRatio(C),e.setSize(y.width,y.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||o},this.setReferenceSpace=function(X){u=X},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return d},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(X){if(r=X,r!==null){if(p=e.getRenderTarget(),r.addEventListener("select",j),r.addEventListener("selectstart",j),r.addEventListener("selectend",j),r.addEventListener("squeeze",j),r.addEventListener("squeezestart",j),r.addEventListener("squeezeend",j),r.addEventListener("end",ie),r.addEventListener("inputsourceschange",L),x.xrCompatible!==!0&&await n.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(y),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const Q={antialias:r.renderState.layers===void 0?x.antialias:!0,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,n,Q),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),c=new zn(m.framebufferWidth,m.framebufferHeight,{format:On,type:$i,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil})}else{let Q=null,le=null,me=null;x.depth&&(me=x.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,Q=x.stencil?ws:yr,le=x.stencil?xr:Oi);const re={colorFormat:n.RGBA8,depthFormat:me,scaleFactor:s};d=new XRWebGLBinding(r,n),h=d.createProjectionLayer(re),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),c=new zn(h.textureWidth,h.textureHeight,{format:On,type:$i,depthTexture:new p_(h.textureWidth,h.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,Q),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0});const ge=e.properties.get(c);ge.__ignoreDepthValues=h.ignoreDepthValues}c.isXRRenderTarget=!0,this.setFoveation(l),u=null,o=await r.requestReferenceSpace(a),Z.setContext(r),Z.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function L(X){for(let Q=0;Q<X.removed.length;Q++){const le=X.removed[Q],me=g.indexOf(le);me>=0&&(g[me]=null,v[me].disconnect(le))}for(let Q=0;Q<X.added.length;Q++){const le=X.added[Q];let me=g.indexOf(le);if(me===-1){for(let ge=0;ge<v.length;ge++)if(ge>=g.length){g.push(le),me=ge;break}else if(g[ge]===null){g[ge]=le,me=ge;break}if(me===-1)break}const re=v[me];re&&re.connect(le)}}const z=new F,Y=new F;function $(X,Q,le){z.setFromMatrixPosition(Q.matrixWorld),Y.setFromMatrixPosition(le.matrixWorld);const me=z.distanceTo(Y),re=Q.projectionMatrix.elements,ge=le.projectionMatrix.elements,Ce=re[14]/(re[10]-1),ve=re[14]/(re[10]+1),We=(re[9]+1)/re[5],O=(re[9]-1)/re[5],Et=(re[8]-1)/re[0],Me=(ge[8]+1)/ge[0],be=Ce*Et,_e=Ce*Me,nt=me/(-Et+Me),we=nt*-Et;Q.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(we),X.translateZ(nt),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert();const w=Ce+nt,S=ve+nt,k=be-we,ee=_e+(me-we),J=We*ve/S*w,ne=O*ve/S*w;X.projectionMatrix.makePerspective(k,ee,J,ne,w,S),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}function b(X,Q){Q===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(Q.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(r===null)return;E.near=A.near=R.near=X.near,E.far=A.far=R.far=X.far,(T!==E.near||W!==E.far)&&(r.updateRenderState({depthNear:E.near,depthFar:E.far}),T=E.near,W=E.far);const Q=X.parent,le=E.cameras;b(E,Q);for(let me=0;me<le.length;me++)b(le[me],Q);le.length===2?$(E,R,A):E.projectionMatrix.copy(R.projectionMatrix),N(X,E,Q)};function N(X,Q,le){le===null?X.matrix.copy(Q.matrixWorld):(X.matrix.copy(le.matrixWorld),X.matrix.invert(),X.matrix.multiply(Q.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(Q.projectionMatrix),X.projectionMatrixInverse.copy(Q.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Do*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(h===null&&m===null))return l},this.setFoveation=function(X){l=X,h!==null&&(h.fixedFoveation=X),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=X)};let H=null;function K(X,Q){if(f=Q.getViewerPose(u||o),_=Q,f!==null){const le=f.views;m!==null&&(e.setRenderTargetFramebuffer(c,m.framebuffer),e.setRenderTarget(c));let me=!1;le.length!==E.cameras.length&&(E.cameras.length=0,me=!0);for(let re=0;re<le.length;re++){const ge=le[re];let Ce=null;if(m!==null)Ce=m.getViewport(ge);else{const We=d.getViewSubImage(h,ge);Ce=We.viewport,re===0&&(e.setRenderTargetTextures(c,We.colorTexture,h.ignoreDepthValues?void 0:We.depthStencilTexture),e.setRenderTarget(c))}let ve=U[re];ve===void 0&&(ve=new In,ve.layers.enable(re),ve.viewport=new Lt,U[re]=ve),ve.matrix.fromArray(ge.transform.matrix),ve.matrix.decompose(ve.position,ve.quaternion,ve.scale),ve.projectionMatrix.fromArray(ge.projectionMatrix),ve.projectionMatrixInverse.copy(ve.projectionMatrix).invert(),ve.viewport.set(Ce.x,Ce.y,Ce.width,Ce.height),re===0&&(E.matrix.copy(ve.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),me===!0&&E.cameras.push(ve)}}for(let le=0;le<v.length;le++){const me=g[le],re=v[le];me!==null&&re!==void 0&&re.update(me,Q,u||o)}H&&H(X,Q),Q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Q}),_=null}const Z=new h_;Z.setAnimationLoop(K),this.setAnimationLoop=function(X){H=X},this.dispose=function(){}}}function KA(t,e){function n(p,c){p.matrixAutoUpdate===!0&&p.updateMatrix(),c.value.copy(p.matrix)}function i(p,c){c.color.getRGB(p.fogColor.value,u_(t)),c.isFog?(p.fogNear.value=c.near,p.fogFar.value=c.far):c.isFogExp2&&(p.fogDensity.value=c.density)}function r(p,c,v,g,y){c.isMeshBasicMaterial||c.isMeshLambertMaterial?s(p,c):c.isMeshToonMaterial?(s(p,c),d(p,c)):c.isMeshPhongMaterial?(s(p,c),f(p,c)):c.isMeshStandardMaterial?(s(p,c),h(p,c),c.isMeshPhysicalMaterial&&m(p,c,y)):c.isMeshMatcapMaterial?(s(p,c),_(p,c)):c.isMeshDepthMaterial?s(p,c):c.isMeshDistanceMaterial?(s(p,c),x(p,c)):c.isMeshNormalMaterial?s(p,c):c.isLineBasicMaterial?(o(p,c),c.isLineDashedMaterial&&a(p,c)):c.isPointsMaterial?l(p,c,v,g):c.isSpriteMaterial?u(p,c):c.isShadowMaterial?(p.color.value.copy(c.color),p.opacity.value=c.opacity):c.isShaderMaterial&&(c.uniformsNeedUpdate=!1)}function s(p,c){p.opacity.value=c.opacity,c.color&&p.diffuse.value.copy(c.color),c.emissive&&p.emissive.value.copy(c.emissive).multiplyScalar(c.emissiveIntensity),c.map&&(p.map.value=c.map,n(c.map,p.mapTransform)),c.alphaMap&&(p.alphaMap.value=c.alphaMap,n(c.alphaMap,p.alphaMapTransform)),c.bumpMap&&(p.bumpMap.value=c.bumpMap,n(c.bumpMap,p.bumpMapTransform),p.bumpScale.value=c.bumpScale,c.side===rn&&(p.bumpScale.value*=-1)),c.normalMap&&(p.normalMap.value=c.normalMap,n(c.normalMap,p.normalMapTransform),p.normalScale.value.copy(c.normalScale),c.side===rn&&p.normalScale.value.negate()),c.displacementMap&&(p.displacementMap.value=c.displacementMap,n(c.displacementMap,p.displacementMapTransform),p.displacementScale.value=c.displacementScale,p.displacementBias.value=c.displacementBias),c.emissiveMap&&(p.emissiveMap.value=c.emissiveMap,n(c.emissiveMap,p.emissiveMapTransform)),c.specularMap&&(p.specularMap.value=c.specularMap,n(c.specularMap,p.specularMapTransform)),c.alphaTest>0&&(p.alphaTest.value=c.alphaTest);const v=e.get(c).envMap;if(v&&(p.envMap.value=v,p.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=c.reflectivity,p.ior.value=c.ior,p.refractionRatio.value=c.refractionRatio),c.lightMap){p.lightMap.value=c.lightMap;const g=t._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=c.lightMapIntensity*g,n(c.lightMap,p.lightMapTransform)}c.aoMap&&(p.aoMap.value=c.aoMap,p.aoMapIntensity.value=c.aoMapIntensity,n(c.aoMap,p.aoMapTransform))}function o(p,c){p.diffuse.value.copy(c.color),p.opacity.value=c.opacity,c.map&&(p.map.value=c.map,n(c.map,p.mapTransform))}function a(p,c){p.dashSize.value=c.dashSize,p.totalSize.value=c.dashSize+c.gapSize,p.scale.value=c.scale}function l(p,c,v,g){p.diffuse.value.copy(c.color),p.opacity.value=c.opacity,p.size.value=c.size*v,p.scale.value=g*.5,c.map&&(p.map.value=c.map,n(c.map,p.uvTransform)),c.alphaMap&&(p.alphaMap.value=c.alphaMap,n(c.alphaMap,p.alphaMapTransform)),c.alphaTest>0&&(p.alphaTest.value=c.alphaTest)}function u(p,c){p.diffuse.value.copy(c.color),p.opacity.value=c.opacity,p.rotation.value=c.rotation,c.map&&(p.map.value=c.map,n(c.map,p.mapTransform)),c.alphaMap&&(p.alphaMap.value=c.alphaMap,n(c.alphaMap,p.alphaMapTransform)),c.alphaTest>0&&(p.alphaTest.value=c.alphaTest)}function f(p,c){p.specular.value.copy(c.specular),p.shininess.value=Math.max(c.shininess,1e-4)}function d(p,c){c.gradientMap&&(p.gradientMap.value=c.gradientMap)}function h(p,c){p.metalness.value=c.metalness,c.metalnessMap&&(p.metalnessMap.value=c.metalnessMap,n(c.metalnessMap,p.metalnessMapTransform)),p.roughness.value=c.roughness,c.roughnessMap&&(p.roughnessMap.value=c.roughnessMap,n(c.roughnessMap,p.roughnessMapTransform)),e.get(c).envMap&&(p.envMapIntensity.value=c.envMapIntensity)}function m(p,c,v){p.ior.value=c.ior,c.sheen>0&&(p.sheenColor.value.copy(c.sheenColor).multiplyScalar(c.sheen),p.sheenRoughness.value=c.sheenRoughness,c.sheenColorMap&&(p.sheenColorMap.value=c.sheenColorMap,n(c.sheenColorMap,p.sheenColorMapTransform)),c.sheenRoughnessMap&&(p.sheenRoughnessMap.value=c.sheenRoughnessMap,n(c.sheenRoughnessMap,p.sheenRoughnessMapTransform))),c.clearcoat>0&&(p.clearcoat.value=c.clearcoat,p.clearcoatRoughness.value=c.clearcoatRoughness,c.clearcoatMap&&(p.clearcoatMap.value=c.clearcoatMap,n(c.clearcoatMap,p.clearcoatMapTransform)),c.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=c.clearcoatRoughnessMap,n(c.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),c.clearcoatNormalMap&&(p.clearcoatNormalMap.value=c.clearcoatNormalMap,n(c.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(c.clearcoatNormalScale),c.side===rn&&p.clearcoatNormalScale.value.negate())),c.iridescence>0&&(p.iridescence.value=c.iridescence,p.iridescenceIOR.value=c.iridescenceIOR,p.iridescenceThicknessMinimum.value=c.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=c.iridescenceThicknessRange[1],c.iridescenceMap&&(p.iridescenceMap.value=c.iridescenceMap,n(c.iridescenceMap,p.iridescenceMapTransform)),c.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=c.iridescenceThicknessMap,n(c.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),c.transmission>0&&(p.transmission.value=c.transmission,p.transmissionSamplerMap.value=v.texture,p.transmissionSamplerSize.value.set(v.width,v.height),c.transmissionMap&&(p.transmissionMap.value=c.transmissionMap,n(c.transmissionMap,p.transmissionMapTransform)),p.thickness.value=c.thickness,c.thicknessMap&&(p.thicknessMap.value=c.thicknessMap,n(c.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=c.attenuationDistance,p.attenuationColor.value.copy(c.attenuationColor)),c.anisotropy>0&&(p.anisotropyVector.value.set(c.anisotropy*Math.cos(c.anisotropyRotation),c.anisotropy*Math.sin(c.anisotropyRotation)),c.anisotropyMap&&(p.anisotropyMap.value=c.anisotropyMap,n(c.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=c.specularIntensity,p.specularColor.value.copy(c.specularColor),c.specularColorMap&&(p.specularColorMap.value=c.specularColorMap,n(c.specularColorMap,p.specularColorMapTransform)),c.specularIntensityMap&&(p.specularIntensityMap.value=c.specularIntensityMap,n(c.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,c){c.matcap&&(p.matcap.value=c.matcap)}function x(p,c){const v=e.get(c).light;p.referencePosition.value.setFromMatrixPosition(v.matrixWorld),p.nearDistance.value=v.shadow.camera.near,p.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function QA(t,e,n,i){let r={},s={},o=[];const a=n.isWebGL2?t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(v,g){const y=g.program;i.uniformBlockBinding(v,y)}function u(v,g){let y=r[v.id];y===void 0&&(_(v),y=f(v),r[v.id]=y,v.addEventListener("dispose",p));const C=g.program;i.updateUBOMapping(v,C);const R=e.render.frame;s[v.id]!==R&&(h(v),s[v.id]=R)}function f(v){const g=d();v.__bindingPointIndex=g;const y=t.createBuffer(),C=v.__size,R=v.usage;return t.bindBuffer(t.UNIFORM_BUFFER,y),t.bufferData(t.UNIFORM_BUFFER,C,R),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,g,y),y}function d(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){const g=r[v.id],y=v.uniforms,C=v.__cache;t.bindBuffer(t.UNIFORM_BUFFER,g);for(let R=0,A=y.length;R<A;R++){const U=Array.isArray(y[R])?y[R]:[y[R]];for(let E=0,T=U.length;E<T;E++){const W=U[E];if(m(W,R,E,C)===!0){const j=W.__offset,ie=Array.isArray(W.value)?W.value:[W.value];let L=0;for(let z=0;z<ie.length;z++){const Y=ie[z],$=x(Y);typeof Y=="number"||typeof Y=="boolean"?(W.__data[0]=Y,t.bufferSubData(t.UNIFORM_BUFFER,j+L,W.__data)):Y.isMatrix3?(W.__data[0]=Y.elements[0],W.__data[1]=Y.elements[1],W.__data[2]=Y.elements[2],W.__data[3]=0,W.__data[4]=Y.elements[3],W.__data[5]=Y.elements[4],W.__data[6]=Y.elements[5],W.__data[7]=0,W.__data[8]=Y.elements[6],W.__data[9]=Y.elements[7],W.__data[10]=Y.elements[8],W.__data[11]=0):(Y.toArray(W.__data,L),L+=$.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,j,W.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function m(v,g,y,C){const R=v.value,A=g+"_"+y;if(C[A]===void 0)return typeof R=="number"||typeof R=="boolean"?C[A]=R:C[A]=R.clone(),!0;{const U=C[A];if(typeof R=="number"||typeof R=="boolean"){if(U!==R)return C[A]=R,!0}else if(U.equals(R)===!1)return U.copy(R),!0}return!1}function _(v){const g=v.uniforms;let y=0;const C=16;for(let A=0,U=g.length;A<U;A++){const E=Array.isArray(g[A])?g[A]:[g[A]];for(let T=0,W=E.length;T<W;T++){const j=E[T],ie=Array.isArray(j.value)?j.value:[j.value];for(let L=0,z=ie.length;L<z;L++){const Y=ie[L],$=x(Y),b=y%C;b!==0&&C-b<$.boundary&&(y+=C-b),j.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),j.__offset=y,y+=$.storage}}}const R=y%C;return R>0&&(y+=C-R),v.__size=y,v.__cache={},this}function x(v){const g={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(g.boundary=4,g.storage=4):v.isVector2?(g.boundary=8,g.storage=8):v.isVector3||v.isColor?(g.boundary=16,g.storage=12):v.isVector4?(g.boundary=16,g.storage=16):v.isMatrix3?(g.boundary=48,g.storage=48):v.isMatrix4?(g.boundary=64,g.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),g}function p(v){const g=v.target;g.removeEventListener("dispose",p);const y=o.indexOf(g.__bindingPointIndex);o.splice(y,1),t.deleteBuffer(r[g.id]),delete r[g.id],delete s[g.id]}function c(){for(const v in r)t.deleteBuffer(r[v]);o=[],r={},s={}}return{bind:l,update:u,dispose:c}}class y_{constructor(e={}){const{canvas:n=jE(),context:i=null,depth:r=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:u=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let h;i!==null?h=i.getContextAttributes().alpha:h=o;const m=new Uint32Array(4),_=new Int32Array(4);let x=null,p=null;const c=[],v=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Pt,this._useLegacyLights=!1,this.toneMapping=ji,this.toneMappingExposure=1;const g=this;let y=!1,C=0,R=0,A=null,U=-1,E=null;const T=new Lt,W=new Lt;let j=null;const ie=new je(0);let L=0,z=n.width,Y=n.height,$=1,b=null,N=null;const H=new Lt(0,0,z,Y),K=new Lt(0,0,z,Y);let Z=!1;const X=new d_;let Q=!1,le=!1,me=null;const re=new Dt,ge=new Ie,Ce=new F,ve={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function We(){return A===null?$:1}let O=i;function Et(M,D){for(let G=0;G<M.length;G++){const V=M[G],B=n.getContext(V,D);if(B!==null)return B}return null}try{const M={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:f,failIfMajorPerformanceCaveat:d};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${dd}`),n.addEventListener("webglcontextlost",se,!1),n.addEventListener("webglcontextrestored",P,!1),n.addEventListener("webglcontextcreationerror",ue,!1),O===null){const D=["webgl2","webgl","experimental-webgl"];if(g.isWebGL1Renderer===!0&&D.shift(),O=Et(D,M),O===null)throw Et(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&O instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),O.getShaderPrecisionFormat===void 0&&(O.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let Me,be,_e,nt,we,w,S,k,ee,J,ne,ye,ae,pe,Ae,Fe,q,ke,Ee,Te,xe,he,Pe,Ye;function $e(){Me=new a1(O),be=new t1(O,Me,e),Me.init(be),he=new YA(O,Me,be),_e=new WA(O,Me,be),nt=new c1(O),we=new LA,w=new XA(O,Me,_e,we,be,he,nt),S=new i1(g),k=new o1(g),ee=new _M(O,be),Pe=new Jw(O,Me,ee,be),J=new l1(O,ee,nt,Pe),ne=new p1(O,J,ee,nt),Ee=new h1(O,be,w),Fe=new n1(we),ye=new PA(g,S,k,Me,be,Pe,Fe),ae=new KA(g,we),pe=new DA,Ae=new kA(Me,be),ke=new Zw(g,S,k,_e,ne,h,l),q=new VA(g,ne,be),Ye=new QA(O,nt,be,_e),Te=new e1(O,Me,nt,be),xe=new u1(O,Me,nt,be),nt.programs=ye.programs,g.capabilities=be,g.extensions=Me,g.properties=we,g.renderLists=pe,g.shadowMap=q,g.state=_e,g.info=nt}$e();const Ue=new qA(g,O);this.xr=Ue,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const M=Me.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=Me.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(M){M!==void 0&&($=M,this.setSize(z,Y,!1))},this.getSize=function(M){return M.set(z,Y)},this.setSize=function(M,D,G=!0){if(Ue.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=M,Y=D,n.width=Math.floor(M*$),n.height=Math.floor(D*$),G===!0&&(n.style.width=M+"px",n.style.height=D+"px"),this.setViewport(0,0,M,D)},this.getDrawingBufferSize=function(M){return M.set(z*$,Y*$).floor()},this.setDrawingBufferSize=function(M,D,G){z=M,Y=D,$=G,n.width=Math.floor(M*G),n.height=Math.floor(D*G),this.setViewport(0,0,M,D)},this.getCurrentViewport=function(M){return M.copy(T)},this.getViewport=function(M){return M.copy(H)},this.setViewport=function(M,D,G,V){M.isVector4?H.set(M.x,M.y,M.z,M.w):H.set(M,D,G,V),_e.viewport(T.copy(H).multiplyScalar($).floor())},this.getScissor=function(M){return M.copy(K)},this.setScissor=function(M,D,G,V){M.isVector4?K.set(M.x,M.y,M.z,M.w):K.set(M,D,G,V),_e.scissor(W.copy(K).multiplyScalar($).floor())},this.getScissorTest=function(){return Z},this.setScissorTest=function(M){_e.setScissorTest(Z=M)},this.setOpaqueSort=function(M){b=M},this.setTransparentSort=function(M){N=M},this.getClearColor=function(M){return M.copy(ke.getClearColor())},this.setClearColor=function(){ke.setClearColor.apply(ke,arguments)},this.getClearAlpha=function(){return ke.getClearAlpha()},this.setClearAlpha=function(){ke.setClearAlpha.apply(ke,arguments)},this.clear=function(M=!0,D=!0,G=!0){let V=0;if(M){let B=!1;if(A!==null){const fe=A.texture.format;B=fe===Qv||fe===Kv||fe===qv}if(B){const fe=A.texture.type,Se=fe===$i||fe===Oi||fe===hd||fe===xr||fe===jv||fe===$v,Le=ke.getClearColor(),Ne=ke.getClearAlpha(),He=Le.r,Oe=Le.g,Be=Le.b;Se?(m[0]=He,m[1]=Oe,m[2]=Be,m[3]=Ne,O.clearBufferuiv(O.COLOR,0,m)):(_[0]=He,_[1]=Oe,_[2]=Be,_[3]=Ne,O.clearBufferiv(O.COLOR,0,_))}else V|=O.COLOR_BUFFER_BIT}D&&(V|=O.DEPTH_BUFFER_BIT),G&&(V|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",se,!1),n.removeEventListener("webglcontextrestored",P,!1),n.removeEventListener("webglcontextcreationerror",ue,!1),pe.dispose(),Ae.dispose(),we.dispose(),S.dispose(),k.dispose(),ne.dispose(),Pe.dispose(),Ye.dispose(),ye.dispose(),Ue.dispose(),Ue.removeEventListener("sessionstart",Ht),Ue.removeEventListener("sessionend",et),me&&(me.dispose(),me=null),Gt.stop()};function se(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function P(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const M=nt.autoReset,D=q.enabled,G=q.autoUpdate,V=q.needsUpdate,B=q.type;$e(),nt.autoReset=M,q.enabled=D,q.autoUpdate=G,q.needsUpdate=V,q.type=B}function ue(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function ce(M){const D=M.target;D.removeEventListener("dispose",ce),De(D)}function De(M){Re(M),we.remove(M)}function Re(M){const D=we.get(M).programs;D!==void 0&&(D.forEach(function(G){ye.releaseProgram(G)}),M.isShaderMaterial&&ye.releaseShaderCache(M))}this.renderBufferDirect=function(M,D,G,V,B,fe){D===null&&(D=ve);const Se=B.isMesh&&B.matrixWorld.determinant()<0,Le=T_(M,D,G,V,B);_e.setMaterial(V,Se);let Ne=G.index,He=1;if(V.wireframe===!0){if(Ne=J.getWireframeAttribute(G),Ne===void 0)return;He=2}const Oe=G.drawRange,Be=G.attributes.position;let pt=Oe.start*He,sn=(Oe.start+Oe.count)*He;fe!==null&&(pt=Math.max(pt,fe.start*He),sn=Math.min(sn,(fe.start+fe.count)*He)),Ne!==null?(pt=Math.max(pt,0),sn=Math.min(sn,Ne.count)):Be!=null&&(pt=Math.max(pt,0),sn=Math.min(sn,Be.count));const Tt=sn-pt;if(Tt<0||Tt===1/0)return;Pe.setup(B,V,Le,G,Ne);let Zn,at=Te;if(Ne!==null&&(Zn=ee.get(Ne),at=xe,at.setIndex(Zn)),B.isMesh)V.wireframe===!0?(_e.setLineWidth(V.wireframeLinewidth*We()),at.setMode(O.LINES)):at.setMode(O.TRIANGLES);else if(B.isLine){let Ge=V.linewidth;Ge===void 0&&(Ge=1),_e.setLineWidth(Ge*We()),B.isLineSegments?at.setMode(O.LINES):B.isLineLoop?at.setMode(O.LINE_LOOP):at.setMode(O.LINE_STRIP)}else B.isPoints?at.setMode(O.POINTS):B.isSprite&&at.setMode(O.TRIANGLES);if(B.isBatchedMesh)at.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else if(B.isInstancedMesh)at.renderInstances(pt,Tt,B.count);else if(G.isInstancedBufferGeometry){const Ge=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,Zl=Math.min(G.instanceCount,Ge);at.renderInstances(pt,Tt,Zl)}else at.render(pt,Tt)};function Ze(M,D,G){M.transparent===!0&&M.side===ai&&M.forceSinglePass===!1?(M.side=rn,M.needsUpdate=!0,Yo(M,D,G),M.side=Qi,M.needsUpdate=!0,Yo(M,D,G),M.side=ai):Yo(M,D,G)}this.compile=function(M,D,G=null){G===null&&(G=M),p=Ae.get(G),p.init(),v.push(p),G.traverseVisible(function(B){B.isLight&&B.layers.test(D.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),M!==G&&M.traverseVisible(function(B){B.isLight&&B.layers.test(D.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights(g._useLegacyLights);const V=new Set;return M.traverse(function(B){const fe=B.material;if(fe)if(Array.isArray(fe))for(let Se=0;Se<fe.length;Se++){const Le=fe[Se];Ze(Le,G,B),V.add(Le)}else Ze(fe,G,B),V.add(fe)}),v.pop(),p=null,V},this.compileAsync=function(M,D,G=null){const V=this.compile(M,D,G);return new Promise(B=>{function fe(){if(V.forEach(function(Se){we.get(Se).currentProgram.isReady()&&V.delete(Se)}),V.size===0){B(M);return}setTimeout(fe,10)}Me.get("KHR_parallel_shader_compile")!==null?fe():setTimeout(fe,10)})};let Je=null;function Mt(M){Je&&Je(M)}function Ht(){Gt.stop()}function et(){Gt.start()}const Gt=new h_;Gt.setAnimationLoop(Mt),typeof self<"u"&&Gt.setContext(self),this.setAnimationLoop=function(M){Je=M,Ue.setAnimationLoop(M),M===null?Gt.stop():Gt.start()},Ue.addEventListener("sessionstart",Ht),Ue.addEventListener("sessionend",et),this.render=function(M,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Ue.enabled===!0&&Ue.isPresenting===!0&&(Ue.cameraAutoUpdate===!0&&Ue.updateCamera(D),D=Ue.getCamera()),M.isScene===!0&&M.onBeforeRender(g,M,D,A),p=Ae.get(M,v.length),p.init(),v.push(p),re.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),X.setFromProjectionMatrix(re),le=this.localClippingEnabled,Q=Fe.init(this.clippingPlanes,le),x=pe.get(M,c.length),x.init(),c.push(x),Vn(M,D,0,g.sortObjects),x.finish(),g.sortObjects===!0&&x.sort(b,N),this.info.render.frame++,Q===!0&&Fe.beginShadows();const G=p.state.shadowsArray;if(q.render(G,M,D),Q===!0&&Fe.endShadows(),this.info.autoReset===!0&&this.info.reset(),ke.render(x,M),p.setupLights(g._useLegacyLights),D.isArrayCamera){const V=D.cameras;for(let B=0,fe=V.length;B<fe;B++){const Se=V[B];yd(x,M,Se,Se.viewport)}}else yd(x,M,D);A!==null&&(w.updateMultisampleRenderTarget(A),w.updateRenderTargetMipmap(A)),M.isScene===!0&&M.onAfterRender(g,M,D),Pe.resetDefaultState(),U=-1,E=null,v.pop(),v.length>0?p=v[v.length-1]:p=null,c.pop(),c.length>0?x=c[c.length-1]:x=null};function Vn(M,D,G,V){if(M.visible===!1)return;if(M.layers.test(D.layers)){if(M.isGroup)G=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(D);else if(M.isLight)p.pushLight(M),M.castShadow&&p.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||X.intersectsSprite(M)){V&&Ce.setFromMatrixPosition(M.matrixWorld).applyMatrix4(re);const Se=ne.update(M),Le=M.material;Le.visible&&x.push(M,Se,Le,G,Ce.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||X.intersectsObject(M))){const Se=ne.update(M),Le=M.material;if(V&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Ce.copy(M.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),Ce.copy(Se.boundingSphere.center)),Ce.applyMatrix4(M.matrixWorld).applyMatrix4(re)),Array.isArray(Le)){const Ne=Se.groups;for(let He=0,Oe=Ne.length;He<Oe;He++){const Be=Ne[He],pt=Le[Be.materialIndex];pt&&pt.visible&&x.push(M,Se,pt,G,Ce.z,Be)}}else Le.visible&&x.push(M,Se,Le,G,Ce.z,null)}}const fe=M.children;for(let Se=0,Le=fe.length;Se<Le;Se++)Vn(fe[Se],D,G,V)}function yd(M,D,G,V){const B=M.opaque,fe=M.transmissive,Se=M.transparent;p.setupLightsView(G),Q===!0&&Fe.setGlobalState(g.clippingPlanes,G),fe.length>0&&M_(B,fe,D,G),V&&_e.viewport(T.copy(V)),B.length>0&&Xo(B,D,G),fe.length>0&&Xo(fe,D,G),Se.length>0&&Xo(Se,D,G),_e.buffers.depth.setTest(!0),_e.buffers.depth.setMask(!0),_e.buffers.color.setMask(!0),_e.setPolygonOffset(!1)}function M_(M,D,G,V){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;const fe=be.isWebGL2;me===null&&(me=new zn(1,1,{generateMipmaps:!0,type:Me.has("EXT_color_buffer_half_float")?mi:$i,minFilter:bo,samples:fe?4:0})),g.getDrawingBufferSize(ge),fe?me.setSize(ge.x,ge.y):me.setSize(wl(ge.x),wl(ge.y));const Se=g.getRenderTarget();g.setRenderTarget(me),g.getClearColor(ie),L=g.getClearAlpha(),L<1&&g.setClearColor(16777215,.5),g.clear();const Le=g.toneMapping;g.toneMapping=ji,Xo(M,G,V),w.updateMultisampleRenderTarget(me),w.updateRenderTargetMipmap(me);let Ne=!1;for(let He=0,Oe=D.length;He<Oe;He++){const Be=D[He],pt=Be.object,sn=Be.geometry,Tt=Be.material,Zn=Be.group;if(Tt.side===ai&&pt.layers.test(V.layers)){const at=Tt.side;Tt.side=rn,Tt.needsUpdate=!0,Sd(pt,G,V,sn,Tt,Zn),Tt.side=at,Tt.needsUpdate=!0,Ne=!0}}Ne===!0&&(w.updateMultisampleRenderTarget(me),w.updateRenderTargetMipmap(me)),g.setRenderTarget(Se),g.setClearColor(ie,L),g.toneMapping=Le}function Xo(M,D,G){const V=D.isScene===!0?D.overrideMaterial:null;for(let B=0,fe=M.length;B<fe;B++){const Se=M[B],Le=Se.object,Ne=Se.geometry,He=V===null?Se.material:V,Oe=Se.group;Le.layers.test(G.layers)&&Sd(Le,D,G,Ne,He,Oe)}}function Sd(M,D,G,V,B,fe){M.onBeforeRender(g,D,G,V,B,fe),M.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),B.onBeforeRender(g,D,G,V,M,fe),B.transparent===!0&&B.side===ai&&B.forceSinglePass===!1?(B.side=rn,B.needsUpdate=!0,g.renderBufferDirect(G,D,V,B,M,fe),B.side=Qi,B.needsUpdate=!0,g.renderBufferDirect(G,D,V,B,M,fe),B.side=ai):g.renderBufferDirect(G,D,V,B,M,fe),M.onAfterRender(g,D,G,V,B,fe)}function Yo(M,D,G){D.isScene!==!0&&(D=ve);const V=we.get(M),B=p.state.lights,fe=p.state.shadowsArray,Se=B.state.version,Le=ye.getParameters(M,B.state,fe,D,G),Ne=ye.getProgramCacheKey(Le);let He=V.programs;V.environment=M.isMeshStandardMaterial?D.environment:null,V.fog=D.fog,V.envMap=(M.isMeshStandardMaterial?k:S).get(M.envMap||V.environment),He===void 0&&(M.addEventListener("dispose",ce),He=new Map,V.programs=He);let Oe=He.get(Ne);if(Oe!==void 0){if(V.currentProgram===Oe&&V.lightsStateVersion===Se)return Md(M,Le),Oe}else Le.uniforms=ye.getUniforms(M),M.onBuild(G,Le,g),M.onBeforeCompile(Le,g),Oe=ye.acquireProgram(Le,Ne),He.set(Ne,Oe),V.uniforms=Le.uniforms;const Be=V.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Be.clippingPlanes=Fe.uniform),Md(M,Le),V.needsLights=A_(M),V.lightsStateVersion=Se,V.needsLights&&(Be.ambientLightColor.value=B.state.ambient,Be.lightProbe.value=B.state.probe,Be.directionalLights.value=B.state.directional,Be.directionalLightShadows.value=B.state.directionalShadow,Be.spotLights.value=B.state.spot,Be.spotLightShadows.value=B.state.spotShadow,Be.rectAreaLights.value=B.state.rectArea,Be.ltc_1.value=B.state.rectAreaLTC1,Be.ltc_2.value=B.state.rectAreaLTC2,Be.pointLights.value=B.state.point,Be.pointLightShadows.value=B.state.pointShadow,Be.hemisphereLights.value=B.state.hemi,Be.directionalShadowMap.value=B.state.directionalShadowMap,Be.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Be.spotShadowMap.value=B.state.spotShadowMap,Be.spotLightMatrix.value=B.state.spotLightMatrix,Be.spotLightMap.value=B.state.spotLightMap,Be.pointShadowMap.value=B.state.pointShadowMap,Be.pointShadowMatrix.value=B.state.pointShadowMatrix),V.currentProgram=Oe,V.uniformsList=null,Oe}function Ed(M){if(M.uniformsList===null){const D=M.currentProgram.getUniforms();M.uniformsList=$a.seqWithValue(D.seq,M.uniforms)}return M.uniformsList}function Md(M,D){const G=we.get(M);G.outputColorSpace=D.outputColorSpace,G.batching=D.batching,G.instancing=D.instancing,G.instancingColor=D.instancingColor,G.skinning=D.skinning,G.morphTargets=D.morphTargets,G.morphNormals=D.morphNormals,G.morphColors=D.morphColors,G.morphTargetsCount=D.morphTargetsCount,G.numClippingPlanes=D.numClippingPlanes,G.numIntersection=D.numClipIntersection,G.vertexAlphas=D.vertexAlphas,G.vertexTangents=D.vertexTangents,G.toneMapping=D.toneMapping}function T_(M,D,G,V,B){D.isScene!==!0&&(D=ve),w.resetTextureUnits();const fe=D.fog,Se=V.isMeshStandardMaterial?D.environment:null,Le=A===null?g.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Ei,Ne=(V.isMeshStandardMaterial?k:S).get(V.envMap||Se),He=V.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Oe=!!G.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Be=!!G.morphAttributes.position,pt=!!G.morphAttributes.normal,sn=!!G.morphAttributes.color;let Tt=ji;V.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Tt=g.toneMapping);const Zn=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,at=Zn!==void 0?Zn.length:0,Ge=we.get(V),Zl=p.state.lights;if(Q===!0&&(le===!0||M!==E)){const gn=M===E&&V.id===U;Fe.setState(V,M,gn)}let dt=!1;V.version===Ge.__version?(Ge.needsLights&&Ge.lightsStateVersion!==Zl.state.version||Ge.outputColorSpace!==Le||B.isBatchedMesh&&Ge.batching===!1||!B.isBatchedMesh&&Ge.batching===!0||B.isInstancedMesh&&Ge.instancing===!1||!B.isInstancedMesh&&Ge.instancing===!0||B.isSkinnedMesh&&Ge.skinning===!1||!B.isSkinnedMesh&&Ge.skinning===!0||B.isInstancedMesh&&Ge.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Ge.instancingColor===!1&&B.instanceColor!==null||Ge.envMap!==Ne||V.fog===!0&&Ge.fog!==fe||Ge.numClippingPlanes!==void 0&&(Ge.numClippingPlanes!==Fe.numPlanes||Ge.numIntersection!==Fe.numIntersection)||Ge.vertexAlphas!==He||Ge.vertexTangents!==Oe||Ge.morphTargets!==Be||Ge.morphNormals!==pt||Ge.morphColors!==sn||Ge.toneMapping!==Tt||be.isWebGL2===!0&&Ge.morphTargetsCount!==at)&&(dt=!0):(dt=!0,Ge.__version=V.version);let nr=Ge.currentProgram;dt===!0&&(nr=Yo(V,D,B));let Td=!1,Fs=!1,Jl=!1;const Nt=nr.getUniforms(),ir=Ge.uniforms;if(_e.useProgram(nr.program)&&(Td=!0,Fs=!0,Jl=!0),V.id!==U&&(U=V.id,Fs=!0),Td||E!==M){Nt.setValue(O,"projectionMatrix",M.projectionMatrix),Nt.setValue(O,"viewMatrix",M.matrixWorldInverse);const gn=Nt.map.cameraPosition;gn!==void 0&&gn.setValue(O,Ce.setFromMatrixPosition(M.matrixWorld)),be.logarithmicDepthBuffer&&Nt.setValue(O,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&Nt.setValue(O,"isOrthographic",M.isOrthographicCamera===!0),E!==M&&(E=M,Fs=!0,Jl=!0)}if(B.isSkinnedMesh){Nt.setOptional(O,B,"bindMatrix"),Nt.setOptional(O,B,"bindMatrixInverse");const gn=B.skeleton;gn&&(be.floatVertexTextures?(gn.boneTexture===null&&gn.computeBoneTexture(),Nt.setValue(O,"boneTexture",gn.boneTexture,w)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}B.isBatchedMesh&&(Nt.setOptional(O,B,"batchingTexture"),Nt.setValue(O,"batchingTexture",B._matricesTexture,w));const eu=G.morphAttributes;if((eu.position!==void 0||eu.normal!==void 0||eu.color!==void 0&&be.isWebGL2===!0)&&Ee.update(B,G,nr),(Fs||Ge.receiveShadow!==B.receiveShadow)&&(Ge.receiveShadow=B.receiveShadow,Nt.setValue(O,"receiveShadow",B.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(ir.envMap.value=Ne,ir.flipEnvMap.value=Ne.isCubeTexture&&Ne.isRenderTargetTexture===!1?-1:1),Fs&&(Nt.setValue(O,"toneMappingExposure",g.toneMappingExposure),Ge.needsLights&&w_(ir,Jl),fe&&V.fog===!0&&ae.refreshFogUniforms(ir,fe),ae.refreshMaterialUniforms(ir,V,$,Y,me),$a.upload(O,Ed(Ge),ir,w)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&($a.upload(O,Ed(Ge),ir,w),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&Nt.setValue(O,"center",B.center),Nt.setValue(O,"modelViewMatrix",B.modelViewMatrix),Nt.setValue(O,"normalMatrix",B.normalMatrix),Nt.setValue(O,"modelMatrix",B.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const gn=V.uniformsGroups;for(let tu=0,R_=gn.length;tu<R_;tu++)if(be.isWebGL2){const wd=gn[tu];Ye.update(wd,nr),Ye.bind(wd,nr)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return nr}function w_(M,D){M.ambientLightColor.needsUpdate=D,M.lightProbe.needsUpdate=D,M.directionalLights.needsUpdate=D,M.directionalLightShadows.needsUpdate=D,M.pointLights.needsUpdate=D,M.pointLightShadows.needsUpdate=D,M.spotLights.needsUpdate=D,M.spotLightShadows.needsUpdate=D,M.rectAreaLights.needsUpdate=D,M.hemisphereLights.needsUpdate=D}function A_(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(M,D,G){we.get(M.texture).__webglTexture=D,we.get(M.depthTexture).__webglTexture=G;const V=we.get(M);V.__hasExternalTextures=!0,V.__hasExternalTextures&&(V.__autoAllocateDepthBuffer=G===void 0,V.__autoAllocateDepthBuffer||Me.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(M,D){const G=we.get(M);G.__webglFramebuffer=D,G.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(M,D=0,G=0){A=M,C=D,R=G;let V=!0,B=null,fe=!1,Se=!1;if(M){const Ne=we.get(M);Ne.__useDefaultFramebuffer!==void 0?(_e.bindFramebuffer(O.FRAMEBUFFER,null),V=!1):Ne.__webglFramebuffer===void 0?w.setupRenderTarget(M):Ne.__hasExternalTextures&&w.rebindTextures(M,we.get(M.texture).__webglTexture,we.get(M.depthTexture).__webglTexture);const He=M.texture;(He.isData3DTexture||He.isDataArrayTexture||He.isCompressedArrayTexture)&&(Se=!0);const Oe=we.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Oe[D])?B=Oe[D][G]:B=Oe[D],fe=!0):be.isWebGL2&&M.samples>0&&w.useMultisampledRTT(M)===!1?B=we.get(M).__webglMultisampledFramebuffer:Array.isArray(Oe)?B=Oe[G]:B=Oe,T.copy(M.viewport),W.copy(M.scissor),j=M.scissorTest}else T.copy(H).multiplyScalar($).floor(),W.copy(K).multiplyScalar($).floor(),j=Z;if(_e.bindFramebuffer(O.FRAMEBUFFER,B)&&be.drawBuffers&&V&&_e.drawBuffers(M,B),_e.viewport(T),_e.scissor(W),_e.setScissorTest(j),fe){const Ne=we.get(M.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+D,Ne.__webglTexture,G)}else if(Se){const Ne=we.get(M.texture),He=D||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ne.__webglTexture,G||0,He)}U=-1},this.readRenderTargetPixels=function(M,D,G,V,B,fe,Se){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Le=we.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Se!==void 0&&(Le=Le[Se]),Le){_e.bindFramebuffer(O.FRAMEBUFFER,Le);try{const Ne=M.texture,He=Ne.format,Oe=Ne.type;if(He!==On&&he.convert(He)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Be=Oe===mi&&(Me.has("EXT_color_buffer_half_float")||be.isWebGL2&&Me.has("EXT_color_buffer_float"));if(Oe!==$i&&he.convert(Oe)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Oe===ki&&(be.isWebGL2||Me.has("OES_texture_float")||Me.has("WEBGL_color_buffer_float")))&&!Be){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=M.width-V&&G>=0&&G<=M.height-B&&O.readPixels(D,G,V,B,he.convert(He),he.convert(Oe),fe)}finally{const Ne=A!==null?we.get(A).__webglFramebuffer:null;_e.bindFramebuffer(O.FRAMEBUFFER,Ne)}}},this.copyFramebufferToTexture=function(M,D,G=0){const V=Math.pow(2,-G),B=Math.floor(D.image.width*V),fe=Math.floor(D.image.height*V);w.setTexture2D(D,0),O.copyTexSubImage2D(O.TEXTURE_2D,G,0,0,M.x,M.y,B,fe),_e.unbindTexture()},this.copyTextureToTexture=function(M,D,G,V=0){const B=D.image.width,fe=D.image.height,Se=he.convert(G.format),Le=he.convert(G.type);w.setTexture2D(G,0),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,G.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,G.unpackAlignment),D.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,V,M.x,M.y,B,fe,Se,Le,D.image.data):D.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,V,M.x,M.y,D.mipmaps[0].width,D.mipmaps[0].height,Se,D.mipmaps[0].data):O.texSubImage2D(O.TEXTURE_2D,V,M.x,M.y,Se,Le,D.image),V===0&&G.generateMipmaps&&O.generateMipmap(O.TEXTURE_2D),_e.unbindTexture()},this.copyTextureToTexture3D=function(M,D,G,V,B=0){if(g.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const fe=M.max.x-M.min.x+1,Se=M.max.y-M.min.y+1,Le=M.max.z-M.min.z+1,Ne=he.convert(V.format),He=he.convert(V.type);let Oe;if(V.isData3DTexture)w.setTexture3D(V,0),Oe=O.TEXTURE_3D;else if(V.isDataArrayTexture||V.isCompressedArrayTexture)w.setTexture2DArray(V,0),Oe=O.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,V.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,V.unpackAlignment);const Be=O.getParameter(O.UNPACK_ROW_LENGTH),pt=O.getParameter(O.UNPACK_IMAGE_HEIGHT),sn=O.getParameter(O.UNPACK_SKIP_PIXELS),Tt=O.getParameter(O.UNPACK_SKIP_ROWS),Zn=O.getParameter(O.UNPACK_SKIP_IMAGES),at=G.isCompressedTexture?G.mipmaps[B]:G.image;O.pixelStorei(O.UNPACK_ROW_LENGTH,at.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,at.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,M.min.x),O.pixelStorei(O.UNPACK_SKIP_ROWS,M.min.y),O.pixelStorei(O.UNPACK_SKIP_IMAGES,M.min.z),G.isDataTexture||G.isData3DTexture?O.texSubImage3D(Oe,B,D.x,D.y,D.z,fe,Se,Le,Ne,He,at.data):G.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),O.compressedTexSubImage3D(Oe,B,D.x,D.y,D.z,fe,Se,Le,Ne,at.data)):O.texSubImage3D(Oe,B,D.x,D.y,D.z,fe,Se,Le,Ne,He,at),O.pixelStorei(O.UNPACK_ROW_LENGTH,Be),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,pt),O.pixelStorei(O.UNPACK_SKIP_PIXELS,sn),O.pixelStorei(O.UNPACK_SKIP_ROWS,Tt),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Zn),B===0&&V.generateMipmaps&&O.generateMipmap(Oe),_e.unbindTexture()},this.initTexture=function(M){M.isCubeTexture?w.setTextureCube(M,0):M.isData3DTexture?w.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?w.setTexture2DArray(M,0):w.setTexture2D(M,0),_e.unbindTexture()},this.resetState=function(){C=0,R=0,A=null,_e.reset(),Pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=e===pd?"display-p3":"srgb",n.unpackColorSpace=Qe.workingColorSpace===jl?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Pt?Sr:Jv}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Sr?Pt:Ei}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class ZA extends y_{}ZA.prototype.isWebGL1Renderer=!0;class JA extends dn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n}}class eR{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=am(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=am();e=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=e}return e}}function am(){return(typeof performance>"u"?Date:performance).now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:dd}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=dd);const S_={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Wo{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const tR=new _d(-1,1,1,-1,0,1);class nR extends tr{constructor(){super(),this.setAttribute("position",new gi([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new gi([0,2,0,0,2,0],2))}}const iR=new nR;class E_{constructor(e){this._mesh=new $n(iR,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,tR)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class df extends Wo{constructor(e,n){super(),this.textureID=n!==void 0?n:"tDiffuse",e instanceof Jt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Rl.clone(e.uniforms),this.material=new Jt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new E_(this.material)}render(e,n,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class lm extends Wo{constructor(e,n){super(),this.scene=e,this.camera=n,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,n,i){const r=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,o,4294967295),s.buffers.stencil.setClear(a),s.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}}class rR extends Wo{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class sR{constructor(e,n){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),n===void 0){const i=e.getSize(new Ie);this._width=i.width,this._height=i.height,n=new zn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:mi}),n.texture.name="EffectComposer.rt1"}else this._width=n.width,this._height=n.height;this.renderTarget1=n,this.renderTarget2=n.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new df(S_),this.copyPass.material.blending=pi,this.clock=new eR}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,n){this.passes.splice(n,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const n=this.passes.indexOf(e);n!==-1&&this.passes.splice(n,1)}isLastEnabledPass(e){for(let n=e+1;n<this.passes.length;n++)if(this.passes[n].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const n=this.renderer.getRenderTarget();let i=!1;for(let r=0,s=this.passes.length;r<s;r++){const o=this.passes[r];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),o.needsSwap){if(i){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}lm!==void 0&&(o instanceof lm?i=!0:o instanceof rR&&(i=!1))}}this.renderer.setRenderTarget(n)}reset(e){if(e===void 0){const n=this.renderer.getSize(new Ie);this._pixelRatio=this.renderer.getPixelRatio(),this._width=n.width,this._height=n.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,n){this._width=e,this._height=n;const i=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(i,r),this.renderTarget2.setSize(i,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(i,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class oR extends Wo{constructor(e,n,i=null,r=null,s=null){super(),this.scene=e,this.camera=n,this.overrideMaterial=i,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new je}render(e,n,i){const r=e.autoClear;e.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor)),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=r}}const aR={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new je(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Rs extends Wo{constructor(e,n,i,r){super(),this.strength=n!==void 0?n:1,this.radius=i,this.threshold=r,this.resolution=e!==void 0?new Ie(e.x,e.y):new Ie(256,256),this.clearColor=new je(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new zn(s,o,{type:mi}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){const h=new zn(s,o,{type:mi});h.texture.name="UnrealBloomPass.h"+d,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const m=new zn(s,o,{type:mi});m.texture.name="UnrealBloomPass.v"+d,m.texture.generateMipmaps=!1,this.renderTargetsVertical.push(m),s=Math.round(s/2),o=Math.round(o/2)}const a=aR;this.highPassUniforms=Rl.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Jt({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new Ie(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=n,this.compositeMaterial.uniforms.bloomRadius.value=.1;const u=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=u,this.bloomTintColors=[new F(1,1,1),new F(1,1,1),new F(1,1,1),new F(1,1,1),new F(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const f=S_;this.copyUniforms=Rl.clone(f.uniforms),this.blendMaterial=new Jt({uniforms:this.copyUniforms,vertexShader:f.vertexShader,fragmentShader:f.fragmentShader,blending:tf,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new je,this.oldClearAlpha=1,this.basic=new vd,this.fsQuad=new E_(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,n){let i=Math.round(e/2),r=Math.round(n/2);this.renderTargetBright.setSize(i,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(i,r),this.renderTargetsVertical[s].setSize(i,r),this.separableBlurMaterials[s].uniforms.invSize.value=new Ie(1/i,1/r),i=Math.round(i/2),r=Math.round(r/2)}render(e,n,i,r,s){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=Rs.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Rs.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(i),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=o}getSeperableBlurMaterial(e){const n=[];for(let i=0;i<e;i++)n.push(.39894*Math.exp(-.5*i*i/(e*e))/e);return new Jt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Ie(.5,.5)},direction:{value:new Ie(.5,.5)},gaussianCoefficients:{value:n}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new Jt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Rs.BlurDirectionX=new Ie(1,0);Rs.BlurDirectionY=new Ie(0,1);const lR=({className:t,style:e,trailLength:n=50,inertia:i=.5,grainIntensity:r=.05,bloomStrength:s=.1,bloomRadius:o=1,bloomThreshold:a=.025,brightness:l=1,color:u="#B19EEF",mixBlendMode:f="screen",edgeIntensity:d=0,maxDevicePixelRatio:h=.5,targetPixels:m,fadeDelayMs:_,fadeDurationMs:x,zIndex:p=10})=>{const c=I.useRef(null),v=I.useRef(null),g=I.useRef(null),y=I.useRef(null),C=I.useRef(null),R=I.useRef(null),A=I.useRef([]),U=I.useRef(0),E=I.useRef(null),T=I.useRef(null),W=I.useRef(new Ie(.5,.5)),j=I.useRef(new Ie(0,0)),ie=I.useRef(1),L=I.useRef(typeof performance<"u"?performance.now():Date.now()),z=I.useRef(!1),Y=I.useRef(!1),$=I.useMemo(()=>typeof window<"u"&&("ontouchstart"in window||navigator.maxTouchPoints>0),[]),b=m??($?9e5:13e5),N=_??($?500:1e3),H=x??($?1e3:1500),K=`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,Z=`
    uniform float iTime;
    uniform vec3  iResolution;
    uniform vec2  iMouse;
    uniform vec2  iPrevMouse[MAX_TRAIL_LENGTH];
    uniform float iOpacity;
    uniform float iScale;
    uniform vec3  iBaseColor;
    uniform float iBrightness;
    uniform float iEdgeIntensity;
    varying vec2  vUv;

    float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7))) * 43758.5453123); }

    float noise(vec2 p){
      vec2 i = floor(p), f = fract(p);
      f *= f * (3. - 2. * f);
      return mix(mix(hash(i + vec2(0.,0.)), hash(i + vec2(1.,0.)), f.x),
                 mix(hash(i + vec2(0.,1.)), hash(i + vec2(1.,1.)), f.x), f.y);
    }

    float fbm(vec2 p){
      float v = 0.0;
      float a = 0.5;
      mat2 m = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
      for(int i=0;i<5;i++){
        v += a * noise(p);
        p = m * p * 2.0;
        a *= 0.5;
      }
      return v;
    }

    vec3 tint1(vec3 base){ return mix(base, vec3(1.0), 0.15); }
    vec3 tint2(vec3 base){ return mix(base, vec3(0.8, 0.9, 1.0), 0.25); }

    vec4 blob(vec2 p, vec2 mousePos, float intensity, float activity) {
      vec2 q = vec2(fbm(p * iScale + iTime * 0.1), fbm(p * iScale + vec2(5.2,1.3) + iTime * 0.1));
      vec2 r = vec2(fbm(p * iScale + q * 1.5 + iTime * 0.15), fbm(p * iScale + q * 1.5 + vec2(8.3,2.8) + iTime * 0.15));
      float smoke = fbm(p * iScale + r * 0.8);
      float radius = 0.5 + 0.3 * (1.0 / iScale);
      float distFactor = 1.0 - smoothstep(0.0, radius * activity, length(p - mousePos));
      float alpha = pow(smoke, 2.5) * distFactor;
      vec3 c1 = tint1(iBaseColor);
      vec3 c2 = tint2(iBaseColor);
      vec3 color = mix(c1, c2, sin(iTime * 0.5) * 0.5 + 0.5);
      return vec4(color * alpha * intensity, alpha * intensity);
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy / iResolution.xy * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);
      vec2 mouse = (iMouse * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);
      vec3 colorAcc = vec3(0.0);
      float alphaAcc = 0.0;
      vec4 b = blob(uv, mouse, 1.0, iOpacity);
      colorAcc += b.rgb;
      alphaAcc += b.a;
      for (int i = 0; i < MAX_TRAIL_LENGTH; i++) {
        vec2 pm = (iPrevMouse[i] * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);
        float t = 1.0 - float(i) / float(MAX_TRAIL_LENGTH);
        t = pow(t, 2.0);
        if (t > 0.01) {
          vec4 bt = blob(uv, pm, t * 0.8, iOpacity);
          colorAcc += bt.rgb;
          alphaAcc += bt.a;
        }
      }
      colorAcc *= iBrightness;
      vec2 uv01 = gl_FragCoord.xy / iResolution.xy;
      float edgeDist = min(min(uv01.x, 1.0 - uv01.x), min(uv01.y, 1.0 - uv01.y));
      float distFromEdge = clamp(edgeDist * 2.0, 0.0, 1.0);
      float k = clamp(iEdgeIntensity, 0.0, 1.0);
      float edgeMask = mix(1.0 - k, 1.0, distFromEdge);
      float outAlpha = clamp(alphaAcc * iOpacity * edgeMask, 0.0, 1.0);
      gl_FragColor = vec4(colorAcc, outAlpha);
    }
  `,X=I.useMemo(()=>({uniforms:{tDiffuse:{value:null},iTime:{value:0},intensity:{value:r}},vertexShader:`
        varying vec2 vUv;
        void main(){
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform sampler2D tDiffuse;
        uniform float iTime;
        uniform float intensity;
        varying vec2 vUv;
        float hash1(float n){ return fract(sin(n)*43758.5453); }
        void main(){
          vec4 color = texture2D(tDiffuse, vUv);
          float n = hash1(vUv.x*1000.0 + vUv.y*2000.0 + iTime) * 2.0 - 1.0;
          color.rgb += n * intensity * color.rgb;
          gl_FragColor = color;
        }
      `}),[r]),Q=I.useMemo(()=>new df({uniforms:{tDiffuse:{value:null}},vertexShader:`
          varying vec2 vUv;
          void main(){
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,fragmentShader:`
          uniform sampler2D tDiffuse;
          varying vec2 vUv;
          void main(){
            vec4 c = texture2D(tDiffuse, vUv);
            float a = max(c.a, 1e-5);
            vec3 straight = c.rgb / a;
            gl_FragColor = vec4(clamp(straight, 0.0, 1.0), c.a);
          }
        `}),[]);function le(re){const ge=re.getBoundingClientRect(),Ce=600,ve=Math.min(Math.max(1,ge.width),Math.max(1,ge.height));return Math.max(.5,Math.min(2,ve/Ce))}I.useEffect(()=>{const re=c.current,ge=re==null?void 0:re.parentElement;if(!re||!ge)return;const Ce=ge.style.position;(!Ce||Ce==="static")&&(ge.style.position="relative");const ve=new y_({antialias:!$,alpha:!0,depth:!1,stencil:!1,powerPreference:$?"low-power":"high-performance",premultipliedAlpha:!1,preserveDrawingBuffer:!1});ve.setClearColor(0,0),v.current=ve,ve.domElement.style.pointerEvents="none",f?ve.domElement.style.mixBlendMode=String(f):ve.domElement.style.removeProperty("mix-blend-mode"),re.appendChild(ve.domElement);const We=new JA,O=new _d(-1,1,1,-1,0,1),Et=new Kl(2,2),Me=Math.max(1,Math.floor(n));A.current=Array.from({length:Me},()=>new Ie(.5,.5)),U.current=0;const be=new je(u),_e=new Jt({defines:{MAX_TRAIL_LENGTH:Me},uniforms:{iTime:{value:0},iResolution:{value:new F(1,1,1)},iMouse:{value:new Ie(.5,.5)},iPrevMouse:{value:A.current.map(q=>q.clone())},iOpacity:{value:1},iScale:{value:1},iBaseColor:{value:new F(be.r,be.g,be.b)},iBrightness:{value:l},iEdgeIntensity:{value:d}},vertexShader:K,fragmentShader:Z,transparent:!0,depthTest:!1,depthWrite:!1});y.current=_e;const nt=new $n(Et,_e);We.add(nt);const we=new sR(ve);g.current=we;const w=new oR(We,O);we.addPass(w);const S=new Rs(new Ie(1,1),s,o,a);C.current=S,we.addPass(S);const k=new df(X);R.current=k,we.addPass(k),we.addPass(Q);const ee=()=>{var Ue;const q=re.getBoundingClientRect(),ke=Math.max(1,Math.floor(q.width)),Ee=Math.max(1,Math.floor(q.height)),Te=Math.min(typeof window<"u"&&window.devicePixelRatio||1,h),xe=ke*Ee*Te*Te,he=xe<=b?1:Math.max(.5,Math.min(1,Math.sqrt(b/Math.max(1,xe)))),Pe=Te*he;ve.setPixelRatio(Pe),ve.setSize(ke,Ee,!1),(Ue=we.setPixelRatio)==null||Ue.call(we,Pe),we.setSize(ke,Ee);const Ye=Math.max(1,Math.floor(ke*Pe)),$e=Math.max(1,Math.floor(Ee*Pe));_e.uniforms.iResolution.value.set(Ye,$e,1),_e.uniforms.iScale.value=le(re),S.setSize(Ye,$e)};ee();const J=new ResizeObserver(ee);T.current=J,J.observe(ge),J.observe(re);const ne=typeof performance<"u"?performance.now():Date.now(),ye=()=>{var Pe,Ye;const q=performance.now(),ke=(q-ne)/1e3,Ee=y.current,Te=g.current;if(z.current)j.current.set(W.current.x-Ee.uniforms.iMouse.value.x,W.current.y-Ee.uniforms.iMouse.value.y),Ee.uniforms.iMouse.value.copy(W.current),ie.current=1;else{j.current.multiplyScalar(i),j.current.lengthSq()>1e-6&&Ee.uniforms.iMouse.value.add(j.current);const $e=q-L.current;if($e>N){const Ue=Math.min(1,($e-N)/H);ie.current=Math.max(0,1-Ue)}}const xe=A.current.length;U.current=(U.current+1)%xe,A.current[U.current].copy(Ee.uniforms.iMouse.value);const he=Ee.uniforms.iPrevMouse.value;for(let $e=0;$e<xe;$e++){const Ue=(U.current-$e+xe)%xe;he[$e].copy(A.current[Ue])}if(Ee.uniforms.iOpacity.value=ie.current,Ee.uniforms.iTime.value=ke,(Ye=(Pe=R.current)==null?void 0:Pe.uniforms)!=null&&Ye.iTime&&(R.current.uniforms.iTime.value=ke),Te.render(),!z.current&&ie.current<=.001){Y.current=!1,E.current=null;return}E.current=requestAnimationFrame(ye)},ae=()=>{Y.current||(Y.current=!0,E.current=requestAnimationFrame(ye))},pe=q=>{const ke=ge.getBoundingClientRect(),Ee=Ep.clamp((q.clientX-ke.left)/Math.max(1,ke.width),0,1),Te=Ep.clamp(1-(q.clientY-ke.top)/Math.max(1,ke.height),0,1);W.current.set(Ee,Te),z.current=!0,L.current=performance.now(),ae()},Ae=()=>{z.current=!0,ae()},Fe=()=>{z.current=!1,L.current=performance.now(),ae()};return ge.addEventListener("pointermove",pe,{passive:!0}),ge.addEventListener("pointerenter",Ae,{passive:!0}),ge.addEventListener("pointerleave",Fe,{passive:!0}),ae(),()=>{var q;E.current&&cancelAnimationFrame(E.current),Y.current=!1,E.current=null,ge.removeEventListener("pointermove",pe),ge.removeEventListener("pointerenter",Ae),ge.removeEventListener("pointerleave",Fe),(q=T.current)==null||q.disconnect(),We.clear(),Et.dispose(),_e.dispose(),we.dispose(),ve.dispose(),ve.domElement&&ve.domElement.parentElement&&ve.domElement.parentElement.removeChild(ve.domElement),(!Ce||Ce==="static")&&(ge.style.position=Ce)}},[n,i,r,s,o,a,b,N,H,$,u,l,f,d]),I.useEffect(()=>{if(y.current){const re=new je(u);y.current.uniforms.iBaseColor.value.set(re.r,re.g,re.b)}},[u]),I.useEffect(()=>{y.current&&(y.current.uniforms.iBrightness.value=l)},[l]),I.useEffect(()=>{y.current&&(y.current.uniforms.iEdgeIntensity.value=d)},[d]),I.useEffect(()=>{var re,ge;(ge=(re=R.current)==null?void 0:re.uniforms)!=null&&ge.intensity&&(R.current.uniforms.intensity.value=r)},[r]),I.useEffect(()=>{var ge;const re=(ge=v.current)==null?void 0:ge.domElement;re&&(f?re.style.mixBlendMode=String(f):re.style.removeProperty("mix-blend-mode"))},[f]);const me=I.useMemo(()=>({zIndex:p,...e}),[p,e]);return li.jsx("div",{ref:c,className:`ghost-cursor ${t??""}`,style:me})},uR=()=>li.jsx("div",{style:{height:"100vh",width:"100vw",position:"relative",backgroundColor:"rgb(6, 0, 16)",margin:0,padding:0,overflow:"hidden"},children:li.jsx(lR,{color:"#B19EEF",brightness:1,edgeIntensity:0,trailLength:50,inertia:.5,grainIntensity:.05,bloomStrength:.1,bloomRadius:1,bloomThreshold:.025,fadeDelayMs:1e3,fadeDurationMs:1500})}),cR=()=>li.jsx(MS,{children:li.jsx(Jy,{children:li.jsx(Ov,{path:"/",element:li.jsx(uR,{})})})});oc.createRoot(document.getElementById("root")).render(li.jsx(W_.StrictMode,{children:li.jsx(cR,{})}));
