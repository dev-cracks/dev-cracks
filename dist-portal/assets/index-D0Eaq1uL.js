(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function oy(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var wg={exports:{}},ic={},Tg={exports:{}},Xe={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ea=Symbol.for("react.element"),ay=Symbol.for("react.portal"),ly=Symbol.for("react.fragment"),cy=Symbol.for("react.strict_mode"),uy=Symbol.for("react.profiler"),dy=Symbol.for("react.provider"),fy=Symbol.for("react.context"),hy=Symbol.for("react.forward_ref"),py=Symbol.for("react.suspense"),my=Symbol.for("react.memo"),gy=Symbol.for("react.lazy"),Th=Symbol.iterator;function vy(t){return t===null||typeof t!="object"?null:(t=Th&&t[Th]||t["@@iterator"],typeof t=="function"?t:null)}var Ag={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Cg=Object.assign,Rg={};function Vs(t,e,n){this.props=t,this.context=e,this.refs=Rg,this.updater=n||Ag}Vs.prototype.isReactComponent={};Vs.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Vs.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function bg(){}bg.prototype=Vs.prototype;function Zd(t,e,n){this.props=t,this.context=e,this.refs=Rg,this.updater=n||Ag}var Jd=Zd.prototype=new bg;Jd.constructor=Zd;Cg(Jd,Vs.prototype);Jd.isPureReactComponent=!0;var Ah=Array.isArray,Pg=Object.prototype.hasOwnProperty,Qd={current:null},Lg={key:!0,ref:!0,__self:!0,__source:!0};function Dg(t,e,n){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)Pg.call(e,i)&&!Lg.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in a=t.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:ea,type:t,key:s,ref:o,props:r,_owner:Qd.current}}function _y(t,e){return{$$typeof:ea,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function ef(t){return typeof t=="object"&&t!==null&&t.$$typeof===ea}function yy(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Ch=/\/+/g;function Uc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?yy(""+t.key):e.toString(36)}function il(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case ea:case ay:o=!0}}if(o)return o=t,r=r(o),t=i===""?"."+Uc(o,0):i,Ah(r)?(n="",t!=null&&(n=t.replace(Ch,"$&/")+"/"),il(r,e,n,"",function(c){return c})):r!=null&&(ef(r)&&(r=_y(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(Ch,"$&/")+"/")+t)),e.push(r)),1;if(o=0,i=i===""?".":i+":",Ah(t))for(var a=0;a<t.length;a++){s=t[a];var l=i+Uc(s,a);o+=il(s,e,n,l,r)}else if(l=vy(t),typeof l=="function")for(t=l.call(t),a=0;!(s=t.next()).done;)s=s.value,l=i+Uc(s,a++),o+=il(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function pa(t,e,n){if(t==null)return t;var i=[],r=0;return il(t,i,"","",function(s){return e.call(n,s,r++)}),i}function xy(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var Qt={current:null},rl={transition:null},Sy={ReactCurrentDispatcher:Qt,ReactCurrentBatchConfig:rl,ReactCurrentOwner:Qd};function Ng(){throw Error("act(...) is not supported in production builds of React.")}Xe.Children={map:pa,forEach:function(t,e,n){pa(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return pa(t,function(){e++}),e},toArray:function(t){return pa(t,function(e){return e})||[]},only:function(t){if(!ef(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Xe.Component=Vs;Xe.Fragment=ly;Xe.Profiler=uy;Xe.PureComponent=Zd;Xe.StrictMode=cy;Xe.Suspense=py;Xe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Sy;Xe.act=Ng;Xe.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=Cg({},t.props),r=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=Qd.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(l in e)Pg.call(e,l)&&!Lg.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];i.children=a}return{$$typeof:ea,type:t.type,key:r,ref:s,props:i,_owner:o}};Xe.createContext=function(t){return t={$$typeof:fy,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:dy,_context:t},t.Consumer=t};Xe.createElement=Dg;Xe.createFactory=function(t){var e=Dg.bind(null,t);return e.type=t,e};Xe.createRef=function(){return{current:null}};Xe.forwardRef=function(t){return{$$typeof:hy,render:t}};Xe.isValidElement=ef;Xe.lazy=function(t){return{$$typeof:gy,_payload:{_status:-1,_result:t},_init:xy}};Xe.memo=function(t,e){return{$$typeof:my,type:t,compare:e===void 0?null:e}};Xe.startTransition=function(t){var e=rl.transition;rl.transition={};try{t()}finally{rl.transition=e}};Xe.unstable_act=Ng;Xe.useCallback=function(t,e){return Qt.current.useCallback(t,e)};Xe.useContext=function(t){return Qt.current.useContext(t)};Xe.useDebugValue=function(){};Xe.useDeferredValue=function(t){return Qt.current.useDeferredValue(t)};Xe.useEffect=function(t,e){return Qt.current.useEffect(t,e)};Xe.useId=function(){return Qt.current.useId()};Xe.useImperativeHandle=function(t,e,n){return Qt.current.useImperativeHandle(t,e,n)};Xe.useInsertionEffect=function(t,e){return Qt.current.useInsertionEffect(t,e)};Xe.useLayoutEffect=function(t,e){return Qt.current.useLayoutEffect(t,e)};Xe.useMemo=function(t,e){return Qt.current.useMemo(t,e)};Xe.useReducer=function(t,e,n){return Qt.current.useReducer(t,e,n)};Xe.useRef=function(t){return Qt.current.useRef(t)};Xe.useState=function(t){return Qt.current.useState(t)};Xe.useSyncExternalStore=function(t,e,n){return Qt.current.useSyncExternalStore(t,e,n)};Xe.useTransition=function(){return Qt.current.useTransition()};Xe.version="18.3.1";Tg.exports=Xe;var L=Tg.exports;const Ug=oy(L);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ey=L,My=Symbol.for("react.element"),wy=Symbol.for("react.fragment"),Ty=Object.prototype.hasOwnProperty,Ay=Ey.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Cy={key:!0,ref:!0,__self:!0,__source:!0};function Ig(t,e,n){var i,r={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)Ty.call(e,i)&&!Cy.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:My,type:t,key:s,ref:o,props:r,_owner:Ay.current}}ic.Fragment=wy;ic.jsx=Ig;ic.jsxs=Ig;wg.exports=ic;var I=wg.exports,Gu={},Og={exports:{}},_n={},kg={exports:{}},Fg={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(D,k){var W=D.length;D.push(k);e:for(;0<W;){var J=W-1>>>1,ee=D[J];if(0<r(ee,k))D[J]=k,D[W]=ee,W=J;else break e}}function n(D){return D.length===0?null:D[0]}function i(D){if(D.length===0)return null;var k=D[0],W=D.pop();if(W!==k){D[0]=W;e:for(var J=0,ee=D.length,K=ee>>>1;J<K;){var Q=2*(J+1)-1,ce=D[Q],ge=Q+1,se=D[ge];if(0>r(ce,W))ge<ee&&0>r(se,ce)?(D[J]=se,D[ge]=W,J=ge):(D[J]=ce,D[Q]=W,J=Q);else if(ge<ee&&0>r(se,W))D[J]=se,D[ge]=W,J=ge;else break e}}return k}function r(D,k){var W=D.sortIndex-k.sortIndex;return W!==0?W:D.id-k.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();t.unstable_now=function(){return o.now()-a}}var l=[],c=[],u=1,d=null,h=3,p=!1,_=!1,y=!1,m=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,v=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function g(D){for(var k=n(c);k!==null;){if(k.callback===null)i(c);else if(k.startTime<=D)i(c),k.sortIndex=k.expirationTime,e(l,k);else break;k=n(c)}}function x(D){if(y=!1,g(D),!_)if(n(l)!==null)_=!0,F(R);else{var k=n(c);k!==null&&Y(x,k.startTime-D)}}function R(D,k){_=!1,y&&(y=!1,f(N),N=-1),p=!0;var W=h;try{for(g(k),d=n(l);d!==null&&(!(d.expirationTime>k)||D&&!X());){var J=d.callback;if(typeof J=="function"){d.callback=null,h=d.priorityLevel;var ee=J(d.expirationTime<=k);k=t.unstable_now(),typeof ee=="function"?d.callback=ee:d===n(l)&&i(l),g(k)}else i(l);d=n(l)}if(d!==null)var K=!0;else{var Q=n(c);Q!==null&&Y(x,Q.startTime-k),K=!1}return K}finally{d=null,h=W,p=!1}}var C=!1,A=null,N=-1,E=5,w=-1;function X(){return!(t.unstable_now()-w<E)}function z(){if(A!==null){var D=t.unstable_now();w=D;var k=!0;try{k=A(!0,D)}finally{k?q():(C=!1,A=null)}}else C=!1}var q;if(typeof v=="function")q=function(){v(z)};else if(typeof MessageChannel<"u"){var b=new MessageChannel,U=b.port2;b.port1.onmessage=z,q=function(){U.postMessage(null)}}else q=function(){m(z,0)};function F(D){A=D,C||(C=!0,q())}function Y(D,k){N=m(function(){D(t.unstable_now())},k)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(D){D.callback=null},t.unstable_continueExecution=function(){_||p||(_=!0,F(R))},t.unstable_forceFrameRate=function(D){0>D||125<D?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):E=0<D?Math.floor(1e3/D):5},t.unstable_getCurrentPriorityLevel=function(){return h},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(D){switch(h){case 1:case 2:case 3:var k=3;break;default:k=h}var W=h;h=k;try{return D()}finally{h=W}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(D,k){switch(D){case 1:case 2:case 3:case 4:case 5:break;default:D=3}var W=h;h=D;try{return k()}finally{h=W}},t.unstable_scheduleCallback=function(D,k,W){var J=t.unstable_now();switch(typeof W=="object"&&W!==null?(W=W.delay,W=typeof W=="number"&&0<W?J+W:J):W=J,D){case 1:var ee=-1;break;case 2:ee=250;break;case 5:ee=1073741823;break;case 4:ee=1e4;break;default:ee=5e3}return ee=W+ee,D={id:u++,callback:k,priorityLevel:D,startTime:W,expirationTime:ee,sortIndex:-1},W>J?(D.sortIndex=W,e(c,D),n(l)===null&&D===n(c)&&(y?(f(N),N=-1):y=!0,Y(x,W-J))):(D.sortIndex=ee,e(l,D),_||p||(_=!0,F(R))),D},t.unstable_shouldYield=X,t.unstable_wrapCallback=function(D){var k=h;return function(){var W=h;h=k;try{return D.apply(this,arguments)}finally{h=W}}}})(Fg);kg.exports=Fg;var Ry=kg.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var by=L,vn=Ry;function ie(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var zg=new Set,No={};function Hr(t,e){Ls(t,e),Ls(t+"Capture",e)}function Ls(t,e){for(No[t]=e,t=0;t<e.length;t++)zg.add(e[t])}var Ei=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Vu=Object.prototype.hasOwnProperty,Py=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Rh={},bh={};function Ly(t){return Vu.call(bh,t)?!0:Vu.call(Rh,t)?!1:Py.test(t)?bh[t]=!0:(Rh[t]=!0,!1)}function Dy(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function Ny(t,e,n,i){if(e===null||typeof e>"u"||Dy(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function en(t,e,n,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var Ot={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Ot[t]=new en(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Ot[e]=new en(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Ot[t]=new en(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Ot[t]=new en(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Ot[t]=new en(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Ot[t]=new en(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Ot[t]=new en(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Ot[t]=new en(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Ot[t]=new en(t,5,!1,t.toLowerCase(),null,!1,!1)});var tf=/[\-:]([a-z])/g;function nf(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(tf,nf);Ot[e]=new en(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(tf,nf);Ot[e]=new en(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(tf,nf);Ot[e]=new en(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Ot[t]=new en(t,1,!1,t.toLowerCase(),null,!1,!1)});Ot.xlinkHref=new en("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Ot[t]=new en(t,1,!1,t.toLowerCase(),null,!0,!0)});function rf(t,e,n,i){var r=Ot.hasOwnProperty(e)?Ot[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(Ny(e,n,r,i)&&(n=null),i||r===null?Ly(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Ri=by.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ma=Symbol.for("react.element"),ls=Symbol.for("react.portal"),cs=Symbol.for("react.fragment"),sf=Symbol.for("react.strict_mode"),Wu=Symbol.for("react.profiler"),Bg=Symbol.for("react.provider"),Hg=Symbol.for("react.context"),of=Symbol.for("react.forward_ref"),ju=Symbol.for("react.suspense"),Xu=Symbol.for("react.suspense_list"),af=Symbol.for("react.memo"),Oi=Symbol.for("react.lazy"),Gg=Symbol.for("react.offscreen"),Ph=Symbol.iterator;function Js(t){return t===null||typeof t!="object"?null:(t=Ph&&t[Ph]||t["@@iterator"],typeof t=="function"?t:null)}var ft=Object.assign,Ic;function po(t){if(Ic===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Ic=e&&e[1]||""}return`
`+Ic+t}var Oc=!1;function kc(t,e){if(!t||Oc)return"";Oc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=a);break}}}finally{Oc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?po(t):""}function Uy(t){switch(t.tag){case 5:return po(t.type);case 16:return po("Lazy");case 13:return po("Suspense");case 19:return po("SuspenseList");case 0:case 2:case 15:return t=kc(t.type,!1),t;case 11:return t=kc(t.type.render,!1),t;case 1:return t=kc(t.type,!0),t;default:return""}}function $u(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case cs:return"Fragment";case ls:return"Portal";case Wu:return"Profiler";case sf:return"StrictMode";case ju:return"Suspense";case Xu:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Hg:return(t.displayName||"Context")+".Consumer";case Bg:return(t._context.displayName||"Context")+".Provider";case of:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case af:return e=t.displayName||null,e!==null?e:$u(t.type)||"Memo";case Oi:e=t._payload,t=t._init;try{return $u(t(e))}catch{}}return null}function Iy(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return $u(e);case 8:return e===sf?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function tr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Vg(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Oy(t){var e=Vg(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function ga(t){t._valueTracker||(t._valueTracker=Oy(t))}function Wg(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=Vg(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function xl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Ku(t,e){var n=e.checked;return ft({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Lh(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=tr(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function jg(t,e){e=e.checked,e!=null&&rf(t,"checked",e,!1)}function Yu(t,e){jg(t,e);var n=tr(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?qu(t,e.type,n):e.hasOwnProperty("defaultValue")&&qu(t,e.type,tr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Dh(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function qu(t,e,n){(e!=="number"||xl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var mo=Array.isArray;function Ms(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+tr(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function Zu(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(ie(91));return ft({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Nh(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(ie(92));if(mo(n)){if(1<n.length)throw Error(ie(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:tr(n)}}function Xg(t,e){var n=tr(e.value),i=tr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function Uh(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function $g(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ju(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?$g(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var va,Kg=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(va=va||document.createElement("div"),va.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=va.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Uo(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var yo={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},ky=["Webkit","ms","Moz","O"];Object.keys(yo).forEach(function(t){ky.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),yo[e]=yo[t]})});function Yg(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||yo.hasOwnProperty(t)&&yo[t]?(""+e).trim():e+"px"}function qg(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=Yg(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var Fy=ft({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Qu(t,e){if(e){if(Fy[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(ie(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(ie(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(ie(61))}if(e.style!=null&&typeof e.style!="object")throw Error(ie(62))}}function ed(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var td=null;function lf(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var nd=null,ws=null,Ts=null;function Ih(t){if(t=ia(t)){if(typeof nd!="function")throw Error(ie(280));var e=t.stateNode;e&&(e=lc(e),nd(t.stateNode,t.type,e))}}function Zg(t){ws?Ts?Ts.push(t):Ts=[t]:ws=t}function Jg(){if(ws){var t=ws,e=Ts;if(Ts=ws=null,Ih(t),e)for(t=0;t<e.length;t++)Ih(e[t])}}function Qg(t,e){return t(e)}function ev(){}var Fc=!1;function tv(t,e,n){if(Fc)return t(e,n);Fc=!0;try{return Qg(t,e,n)}finally{Fc=!1,(ws!==null||Ts!==null)&&(ev(),Jg())}}function Io(t,e){var n=t.stateNode;if(n===null)return null;var i=lc(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(ie(231,e,typeof n));return n}var id=!1;if(Ei)try{var Qs={};Object.defineProperty(Qs,"passive",{get:function(){id=!0}}),window.addEventListener("test",Qs,Qs),window.removeEventListener("test",Qs,Qs)}catch{id=!1}function zy(t,e,n,i,r,s,o,a,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(u){this.onError(u)}}var xo=!1,Sl=null,El=!1,rd=null,By={onError:function(t){xo=!0,Sl=t}};function Hy(t,e,n,i,r,s,o,a,l){xo=!1,Sl=null,zy.apply(By,arguments)}function Gy(t,e,n,i,r,s,o,a,l){if(Hy.apply(this,arguments),xo){if(xo){var c=Sl;xo=!1,Sl=null}else throw Error(ie(198));El||(El=!0,rd=c)}}function Gr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function nv(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Oh(t){if(Gr(t)!==t)throw Error(ie(188))}function Vy(t){var e=t.alternate;if(!e){if(e=Gr(t),e===null)throw Error(ie(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return Oh(r),t;if(s===i)return Oh(r),e;s=s.sibling}throw Error(ie(188))}if(n.return!==i.return)n=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===n){o=!0,n=r,i=s;break}if(a===i){o=!0,i=r,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,i=r;break}if(a===i){o=!0,i=s,n=r;break}a=a.sibling}if(!o)throw Error(ie(189))}}if(n.alternate!==i)throw Error(ie(190))}if(n.tag!==3)throw Error(ie(188));return n.stateNode.current===n?t:e}function iv(t){return t=Vy(t),t!==null?rv(t):null}function rv(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=rv(t);if(e!==null)return e;t=t.sibling}return null}var sv=vn.unstable_scheduleCallback,kh=vn.unstable_cancelCallback,Wy=vn.unstable_shouldYield,jy=vn.unstable_requestPaint,vt=vn.unstable_now,Xy=vn.unstable_getCurrentPriorityLevel,cf=vn.unstable_ImmediatePriority,ov=vn.unstable_UserBlockingPriority,Ml=vn.unstable_NormalPriority,$y=vn.unstable_LowPriority,av=vn.unstable_IdlePriority,rc=null,ti=null;function Ky(t){if(ti&&typeof ti.onCommitFiberRoot=="function")try{ti.onCommitFiberRoot(rc,t,void 0,(t.current.flags&128)===128)}catch{}}var Vn=Math.clz32?Math.clz32:Zy,Yy=Math.log,qy=Math.LN2;function Zy(t){return t>>>=0,t===0?32:31-(Yy(t)/qy|0)|0}var _a=64,ya=4194304;function go(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function wl(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var a=o&~r;a!==0?i=go(a):(s&=o,s!==0&&(i=go(s)))}else o=n&~r,o!==0?i=go(o):s!==0&&(i=go(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-Vn(e),r=1<<n,i|=t[n],e&=~r;return i}function Jy(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Qy(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-Vn(s),a=1<<o,l=r[o];l===-1?(!(a&n)||a&i)&&(r[o]=Jy(a,e)):l<=e&&(t.expiredLanes|=a),s&=~a}}function sd(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function lv(){var t=_a;return _a<<=1,!(_a&4194240)&&(_a=64),t}function zc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function ta(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Vn(e),t[e]=n}function ex(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-Vn(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function uf(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-Vn(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var Ze=0;function cv(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var uv,df,dv,fv,hv,od=!1,xa=[],ji=null,Xi=null,$i=null,Oo=new Map,ko=new Map,Fi=[],tx="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Fh(t,e){switch(t){case"focusin":case"focusout":ji=null;break;case"dragenter":case"dragleave":Xi=null;break;case"mouseover":case"mouseout":$i=null;break;case"pointerover":case"pointerout":Oo.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":ko.delete(e.pointerId)}}function eo(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=ia(e),e!==null&&df(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function nx(t,e,n,i,r){switch(e){case"focusin":return ji=eo(ji,t,e,n,i,r),!0;case"dragenter":return Xi=eo(Xi,t,e,n,i,r),!0;case"mouseover":return $i=eo($i,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return Oo.set(s,eo(Oo.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,ko.set(s,eo(ko.get(s)||null,t,e,n,i,r)),!0}return!1}function pv(t){var e=Ar(t.target);if(e!==null){var n=Gr(e);if(n!==null){if(e=n.tag,e===13){if(e=nv(n),e!==null){t.blockedOn=e,hv(t.priority,function(){dv(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function sl(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=ad(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);td=i,n.target.dispatchEvent(i),td=null}else return e=ia(n),e!==null&&df(e),t.blockedOn=n,!1;e.shift()}return!0}function zh(t,e,n){sl(t)&&n.delete(e)}function ix(){od=!1,ji!==null&&sl(ji)&&(ji=null),Xi!==null&&sl(Xi)&&(Xi=null),$i!==null&&sl($i)&&($i=null),Oo.forEach(zh),ko.forEach(zh)}function to(t,e){t.blockedOn===e&&(t.blockedOn=null,od||(od=!0,vn.unstable_scheduleCallback(vn.unstable_NormalPriority,ix)))}function Fo(t){function e(r){return to(r,t)}if(0<xa.length){to(xa[0],t);for(var n=1;n<xa.length;n++){var i=xa[n];i.blockedOn===t&&(i.blockedOn=null)}}for(ji!==null&&to(ji,t),Xi!==null&&to(Xi,t),$i!==null&&to($i,t),Oo.forEach(e),ko.forEach(e),n=0;n<Fi.length;n++)i=Fi[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<Fi.length&&(n=Fi[0],n.blockedOn===null);)pv(n),n.blockedOn===null&&Fi.shift()}var As=Ri.ReactCurrentBatchConfig,Tl=!0;function rx(t,e,n,i){var r=Ze,s=As.transition;As.transition=null;try{Ze=1,ff(t,e,n,i)}finally{Ze=r,As.transition=s}}function sx(t,e,n,i){var r=Ze,s=As.transition;As.transition=null;try{Ze=4,ff(t,e,n,i)}finally{Ze=r,As.transition=s}}function ff(t,e,n,i){if(Tl){var r=ad(t,e,n,i);if(r===null)Yc(t,e,i,Al,n),Fh(t,i);else if(nx(r,t,e,n,i))i.stopPropagation();else if(Fh(t,i),e&4&&-1<tx.indexOf(t)){for(;r!==null;){var s=ia(r);if(s!==null&&uv(s),s=ad(t,e,n,i),s===null&&Yc(t,e,i,Al,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else Yc(t,e,i,null,n)}}var Al=null;function ad(t,e,n,i){if(Al=null,t=lf(i),t=Ar(t),t!==null)if(e=Gr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=nv(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Al=t,null}function mv(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Xy()){case cf:return 1;case ov:return 4;case Ml:case $y:return 16;case av:return 536870912;default:return 16}default:return 16}}var Hi=null,hf=null,ol=null;function gv(){if(ol)return ol;var t,e=hf,n=e.length,i,r="value"in Hi?Hi.value:Hi.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(i=1;i<=o&&e[n-i]===r[s-i];i++);return ol=r.slice(t,1<i?1-i:void 0)}function al(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Sa(){return!0}function Bh(){return!1}function yn(t){function e(n,i,r,s,o){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Sa:Bh,this.isPropagationStopped=Bh,this}return ft(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Sa)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Sa)},persist:function(){},isPersistent:Sa}),e}var Ws={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},pf=yn(Ws),na=ft({},Ws,{view:0,detail:0}),ox=yn(na),Bc,Hc,no,sc=ft({},na,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:mf,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==no&&(no&&t.type==="mousemove"?(Bc=t.screenX-no.screenX,Hc=t.screenY-no.screenY):Hc=Bc=0,no=t),Bc)},movementY:function(t){return"movementY"in t?t.movementY:Hc}}),Hh=yn(sc),ax=ft({},sc,{dataTransfer:0}),lx=yn(ax),cx=ft({},na,{relatedTarget:0}),Gc=yn(cx),ux=ft({},Ws,{animationName:0,elapsedTime:0,pseudoElement:0}),dx=yn(ux),fx=ft({},Ws,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),hx=yn(fx),px=ft({},Ws,{data:0}),Gh=yn(px),mx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},gx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},vx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function _x(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=vx[t])?!!e[t]:!1}function mf(){return _x}var yx=ft({},na,{key:function(t){if(t.key){var e=mx[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=al(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?gx[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:mf,charCode:function(t){return t.type==="keypress"?al(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?al(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),xx=yn(yx),Sx=ft({},sc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Vh=yn(Sx),Ex=ft({},na,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:mf}),Mx=yn(Ex),wx=ft({},Ws,{propertyName:0,elapsedTime:0,pseudoElement:0}),Tx=yn(wx),Ax=ft({},sc,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Cx=yn(Ax),Rx=[9,13,27,32],gf=Ei&&"CompositionEvent"in window,So=null;Ei&&"documentMode"in document&&(So=document.documentMode);var bx=Ei&&"TextEvent"in window&&!So,vv=Ei&&(!gf||So&&8<So&&11>=So),Wh=" ",jh=!1;function _v(t,e){switch(t){case"keyup":return Rx.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function yv(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var us=!1;function Px(t,e){switch(t){case"compositionend":return yv(e);case"keypress":return e.which!==32?null:(jh=!0,Wh);case"textInput":return t=e.data,t===Wh&&jh?null:t;default:return null}}function Lx(t,e){if(us)return t==="compositionend"||!gf&&_v(t,e)?(t=gv(),ol=hf=Hi=null,us=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return vv&&e.locale!=="ko"?null:e.data;default:return null}}var Dx={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Xh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Dx[t.type]:e==="textarea"}function xv(t,e,n,i){Zg(i),e=Cl(e,"onChange"),0<e.length&&(n=new pf("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var Eo=null,zo=null;function Nx(t){Lv(t,0)}function oc(t){var e=hs(t);if(Wg(e))return t}function Ux(t,e){if(t==="change")return e}var Sv=!1;if(Ei){var Vc;if(Ei){var Wc="oninput"in document;if(!Wc){var $h=document.createElement("div");$h.setAttribute("oninput","return;"),Wc=typeof $h.oninput=="function"}Vc=Wc}else Vc=!1;Sv=Vc&&(!document.documentMode||9<document.documentMode)}function Kh(){Eo&&(Eo.detachEvent("onpropertychange",Ev),zo=Eo=null)}function Ev(t){if(t.propertyName==="value"&&oc(zo)){var e=[];xv(e,zo,t,lf(t)),tv(Nx,e)}}function Ix(t,e,n){t==="focusin"?(Kh(),Eo=e,zo=n,Eo.attachEvent("onpropertychange",Ev)):t==="focusout"&&Kh()}function Ox(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return oc(zo)}function kx(t,e){if(t==="click")return oc(e)}function Fx(t,e){if(t==="input"||t==="change")return oc(e)}function zx(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Xn=typeof Object.is=="function"?Object.is:zx;function Bo(t,e){if(Xn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!Vu.call(e,r)||!Xn(t[r],e[r]))return!1}return!0}function Yh(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function qh(t,e){var n=Yh(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Yh(n)}}function Mv(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Mv(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function wv(){for(var t=window,e=xl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=xl(t.document)}return e}function vf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function Bx(t){var e=wv(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&Mv(n.ownerDocument.documentElement,n)){if(i!==null&&vf(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=qh(n,s);var o=qh(n,i);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var Hx=Ei&&"documentMode"in document&&11>=document.documentMode,ds=null,ld=null,Mo=null,cd=!1;function Zh(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;cd||ds==null||ds!==xl(i)||(i=ds,"selectionStart"in i&&vf(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Mo&&Bo(Mo,i)||(Mo=i,i=Cl(ld,"onSelect"),0<i.length&&(e=new pf("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=ds)))}function Ea(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var fs={animationend:Ea("Animation","AnimationEnd"),animationiteration:Ea("Animation","AnimationIteration"),animationstart:Ea("Animation","AnimationStart"),transitionend:Ea("Transition","TransitionEnd")},jc={},Tv={};Ei&&(Tv=document.createElement("div").style,"AnimationEvent"in window||(delete fs.animationend.animation,delete fs.animationiteration.animation,delete fs.animationstart.animation),"TransitionEvent"in window||delete fs.transitionend.transition);function ac(t){if(jc[t])return jc[t];if(!fs[t])return t;var e=fs[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Tv)return jc[t]=e[n];return t}var Av=ac("animationend"),Cv=ac("animationiteration"),Rv=ac("animationstart"),bv=ac("transitionend"),Pv=new Map,Jh="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function rr(t,e){Pv.set(t,e),Hr(e,[t])}for(var Xc=0;Xc<Jh.length;Xc++){var $c=Jh[Xc],Gx=$c.toLowerCase(),Vx=$c[0].toUpperCase()+$c.slice(1);rr(Gx,"on"+Vx)}rr(Av,"onAnimationEnd");rr(Cv,"onAnimationIteration");rr(Rv,"onAnimationStart");rr("dblclick","onDoubleClick");rr("focusin","onFocus");rr("focusout","onBlur");rr(bv,"onTransitionEnd");Ls("onMouseEnter",["mouseout","mouseover"]);Ls("onMouseLeave",["mouseout","mouseover"]);Ls("onPointerEnter",["pointerout","pointerover"]);Ls("onPointerLeave",["pointerout","pointerover"]);Hr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Hr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Hr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Hr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Hr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Hr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var vo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Wx=new Set("cancel close invalid load scroll toggle".split(" ").concat(vo));function Qh(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,Gy(i,e,void 0,t),t.currentTarget=null}function Lv(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;Qh(r,a,c),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,c=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;Qh(r,a,c),s=l}}}if(El)throw t=rd,El=!1,rd=null,t}function rt(t,e){var n=e[pd];n===void 0&&(n=e[pd]=new Set);var i=t+"__bubble";n.has(i)||(Dv(e,t,2,!1),n.add(i))}function Kc(t,e,n){var i=0;e&&(i|=4),Dv(n,t,i,e)}var Ma="_reactListening"+Math.random().toString(36).slice(2);function Ho(t){if(!t[Ma]){t[Ma]=!0,zg.forEach(function(n){n!=="selectionchange"&&(Wx.has(n)||Kc(n,!1,t),Kc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Ma]||(e[Ma]=!0,Kc("selectionchange",!1,e))}}function Dv(t,e,n,i){switch(mv(e)){case 1:var r=rx;break;case 4:r=sx;break;default:r=ff}n=r.bind(null,e,n,t),r=void 0,!id||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Yc(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=Ar(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}tv(function(){var c=s,u=lf(n),d=[];e:{var h=Pv.get(t);if(h!==void 0){var p=pf,_=t;switch(t){case"keypress":if(al(n)===0)break e;case"keydown":case"keyup":p=xx;break;case"focusin":_="focus",p=Gc;break;case"focusout":_="blur",p=Gc;break;case"beforeblur":case"afterblur":p=Gc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=Hh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=lx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=Mx;break;case Av:case Cv:case Rv:p=dx;break;case bv:p=Tx;break;case"scroll":p=ox;break;case"wheel":p=Cx;break;case"copy":case"cut":case"paste":p=hx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=Vh}var y=(e&4)!==0,m=!y&&t==="scroll",f=y?h!==null?h+"Capture":null:h;y=[];for(var v=c,g;v!==null;){g=v;var x=g.stateNode;if(g.tag===5&&x!==null&&(g=x,f!==null&&(x=Io(v,f),x!=null&&y.push(Go(v,x,g)))),m)break;v=v.return}0<y.length&&(h=new p(h,_,null,n,u),d.push({event:h,listeners:y}))}}if(!(e&7)){e:{if(h=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",h&&n!==td&&(_=n.relatedTarget||n.fromElement)&&(Ar(_)||_[Mi]))break e;if((p||h)&&(h=u.window===u?u:(h=u.ownerDocument)?h.defaultView||h.parentWindow:window,p?(_=n.relatedTarget||n.toElement,p=c,_=_?Ar(_):null,_!==null&&(m=Gr(_),_!==m||_.tag!==5&&_.tag!==6)&&(_=null)):(p=null,_=c),p!==_)){if(y=Hh,x="onMouseLeave",f="onMouseEnter",v="mouse",(t==="pointerout"||t==="pointerover")&&(y=Vh,x="onPointerLeave",f="onPointerEnter",v="pointer"),m=p==null?h:hs(p),g=_==null?h:hs(_),h=new y(x,v+"leave",p,n,u),h.target=m,h.relatedTarget=g,x=null,Ar(u)===c&&(y=new y(f,v+"enter",_,n,u),y.target=g,y.relatedTarget=m,x=y),m=x,p&&_)t:{for(y=p,f=_,v=0,g=y;g;g=Vr(g))v++;for(g=0,x=f;x;x=Vr(x))g++;for(;0<v-g;)y=Vr(y),v--;for(;0<g-v;)f=Vr(f),g--;for(;v--;){if(y===f||f!==null&&y===f.alternate)break t;y=Vr(y),f=Vr(f)}y=null}else y=null;p!==null&&ep(d,h,p,y,!1),_!==null&&m!==null&&ep(d,m,_,y,!0)}}e:{if(h=c?hs(c):window,p=h.nodeName&&h.nodeName.toLowerCase(),p==="select"||p==="input"&&h.type==="file")var R=Ux;else if(Xh(h))if(Sv)R=Fx;else{R=Ox;var C=Ix}else(p=h.nodeName)&&p.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(R=kx);if(R&&(R=R(t,c))){xv(d,R,n,u);break e}C&&C(t,h,c),t==="focusout"&&(C=h._wrapperState)&&C.controlled&&h.type==="number"&&qu(h,"number",h.value)}switch(C=c?hs(c):window,t){case"focusin":(Xh(C)||C.contentEditable==="true")&&(ds=C,ld=c,Mo=null);break;case"focusout":Mo=ld=ds=null;break;case"mousedown":cd=!0;break;case"contextmenu":case"mouseup":case"dragend":cd=!1,Zh(d,n,u);break;case"selectionchange":if(Hx)break;case"keydown":case"keyup":Zh(d,n,u)}var A;if(gf)e:{switch(t){case"compositionstart":var N="onCompositionStart";break e;case"compositionend":N="onCompositionEnd";break e;case"compositionupdate":N="onCompositionUpdate";break e}N=void 0}else us?_v(t,n)&&(N="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(N="onCompositionStart");N&&(vv&&n.locale!=="ko"&&(us||N!=="onCompositionStart"?N==="onCompositionEnd"&&us&&(A=gv()):(Hi=u,hf="value"in Hi?Hi.value:Hi.textContent,us=!0)),C=Cl(c,N),0<C.length&&(N=new Gh(N,t,null,n,u),d.push({event:N,listeners:C}),A?N.data=A:(A=yv(n),A!==null&&(N.data=A)))),(A=bx?Px(t,n):Lx(t,n))&&(c=Cl(c,"onBeforeInput"),0<c.length&&(u=new Gh("onBeforeInput","beforeinput",null,n,u),d.push({event:u,listeners:c}),u.data=A))}Lv(d,e)})}function Go(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Cl(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=Io(t,n),s!=null&&i.unshift(Go(t,s,r)),s=Io(t,e),s!=null&&i.push(Go(t,s,r))),t=t.return}return i}function Vr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function ep(t,e,n,i,r){for(var s=e._reactName,o=[];n!==null&&n!==i;){var a=n,l=a.alternate,c=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&c!==null&&(a=c,r?(l=Io(n,s),l!=null&&o.unshift(Go(n,l,a))):r||(l=Io(n,s),l!=null&&o.push(Go(n,l,a)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var jx=/\r\n?/g,Xx=/\u0000|\uFFFD/g;function tp(t){return(typeof t=="string"?t:""+t).replace(jx,`
`).replace(Xx,"")}function wa(t,e,n){if(e=tp(e),tp(t)!==e&&n)throw Error(ie(425))}function Rl(){}var ud=null,dd=null;function fd(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var hd=typeof setTimeout=="function"?setTimeout:void 0,$x=typeof clearTimeout=="function"?clearTimeout:void 0,np=typeof Promise=="function"?Promise:void 0,Kx=typeof queueMicrotask=="function"?queueMicrotask:typeof np<"u"?function(t){return np.resolve(null).then(t).catch(Yx)}:hd;function Yx(t){setTimeout(function(){throw t})}function qc(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),Fo(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);Fo(e)}function Ki(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function ip(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var js=Math.random().toString(36).slice(2),Qn="__reactFiber$"+js,Vo="__reactProps$"+js,Mi="__reactContainer$"+js,pd="__reactEvents$"+js,qx="__reactListeners$"+js,Zx="__reactHandles$"+js;function Ar(t){var e=t[Qn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Mi]||n[Qn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=ip(t);t!==null;){if(n=t[Qn])return n;t=ip(t)}return e}t=n,n=t.parentNode}return null}function ia(t){return t=t[Qn]||t[Mi],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function hs(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(ie(33))}function lc(t){return t[Vo]||null}var md=[],ps=-1;function sr(t){return{current:t}}function ot(t){0>ps||(t.current=md[ps],md[ps]=null,ps--)}function nt(t,e){ps++,md[ps]=t.current,t.current=e}var nr={},Vt=sr(nr),sn=sr(!1),Or=nr;function Ds(t,e){var n=t.type.contextTypes;if(!n)return nr;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function on(t){return t=t.childContextTypes,t!=null}function bl(){ot(sn),ot(Vt)}function rp(t,e,n){if(Vt.current!==nr)throw Error(ie(168));nt(Vt,e),nt(sn,n)}function Nv(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(ie(108,Iy(t)||"Unknown",r));return ft({},n,i)}function Pl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||nr,Or=Vt.current,nt(Vt,t),nt(sn,sn.current),!0}function sp(t,e,n){var i=t.stateNode;if(!i)throw Error(ie(169));n?(t=Nv(t,e,Or),i.__reactInternalMemoizedMergedChildContext=t,ot(sn),ot(Vt),nt(Vt,t)):ot(sn),nt(sn,n)}var fi=null,cc=!1,Zc=!1;function Uv(t){fi===null?fi=[t]:fi.push(t)}function Jx(t){cc=!0,Uv(t)}function or(){if(!Zc&&fi!==null){Zc=!0;var t=0,e=Ze;try{var n=fi;for(Ze=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}fi=null,cc=!1}catch(r){throw fi!==null&&(fi=fi.slice(t+1)),sv(cf,or),r}finally{Ze=e,Zc=!1}}return null}var ms=[],gs=0,Ll=null,Dl=0,En=[],Mn=0,kr=null,pi=1,mi="";function _r(t,e){ms[gs++]=Dl,ms[gs++]=Ll,Ll=t,Dl=e}function Iv(t,e,n){En[Mn++]=pi,En[Mn++]=mi,En[Mn++]=kr,kr=t;var i=pi;t=mi;var r=32-Vn(i)-1;i&=~(1<<r),n+=1;var s=32-Vn(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,pi=1<<32-Vn(e)+r|n<<r|i,mi=s+t}else pi=1<<s|n<<r|i,mi=t}function _f(t){t.return!==null&&(_r(t,1),Iv(t,1,0))}function yf(t){for(;t===Ll;)Ll=ms[--gs],ms[gs]=null,Dl=ms[--gs],ms[gs]=null;for(;t===kr;)kr=En[--Mn],En[Mn]=null,mi=En[--Mn],En[Mn]=null,pi=En[--Mn],En[Mn]=null}var pn=null,hn=null,at=!1,Fn=null;function Ov(t,e){var n=Cn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function op(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,pn=t,hn=Ki(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,pn=t,hn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=kr!==null?{id:pi,overflow:mi}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Cn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,pn=t,hn=null,!0):!1;default:return!1}}function gd(t){return(t.mode&1)!==0&&(t.flags&128)===0}function vd(t){if(at){var e=hn;if(e){var n=e;if(!op(t,e)){if(gd(t))throw Error(ie(418));e=Ki(n.nextSibling);var i=pn;e&&op(t,e)?Ov(i,n):(t.flags=t.flags&-4097|2,at=!1,pn=t)}}else{if(gd(t))throw Error(ie(418));t.flags=t.flags&-4097|2,at=!1,pn=t}}}function ap(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;pn=t}function Ta(t){if(t!==pn)return!1;if(!at)return ap(t),at=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!fd(t.type,t.memoizedProps)),e&&(e=hn)){if(gd(t))throw kv(),Error(ie(418));for(;e;)Ov(t,e),e=Ki(e.nextSibling)}if(ap(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(ie(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){hn=Ki(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}hn=null}}else hn=pn?Ki(t.stateNode.nextSibling):null;return!0}function kv(){for(var t=hn;t;)t=Ki(t.nextSibling)}function Ns(){hn=pn=null,at=!1}function xf(t){Fn===null?Fn=[t]:Fn.push(t)}var Qx=Ri.ReactCurrentBatchConfig;function io(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(ie(309));var i=n.stateNode}if(!i)throw Error(ie(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(ie(284));if(!n._owner)throw Error(ie(290,t))}return t}function Aa(t,e){throw t=Object.prototype.toString.call(e),Error(ie(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function lp(t){var e=t._init;return e(t._payload)}function Fv(t){function e(f,v){if(t){var g=f.deletions;g===null?(f.deletions=[v],f.flags|=16):g.push(v)}}function n(f,v){if(!t)return null;for(;v!==null;)e(f,v),v=v.sibling;return null}function i(f,v){for(f=new Map;v!==null;)v.key!==null?f.set(v.key,v):f.set(v.index,v),v=v.sibling;return f}function r(f,v){return f=Ji(f,v),f.index=0,f.sibling=null,f}function s(f,v,g){return f.index=g,t?(g=f.alternate,g!==null?(g=g.index,g<v?(f.flags|=2,v):g):(f.flags|=2,v)):(f.flags|=1048576,v)}function o(f){return t&&f.alternate===null&&(f.flags|=2),f}function a(f,v,g,x){return v===null||v.tag!==6?(v=ru(g,f.mode,x),v.return=f,v):(v=r(v,g),v.return=f,v)}function l(f,v,g,x){var R=g.type;return R===cs?u(f,v,g.props.children,x,g.key):v!==null&&(v.elementType===R||typeof R=="object"&&R!==null&&R.$$typeof===Oi&&lp(R)===v.type)?(x=r(v,g.props),x.ref=io(f,v,g),x.return=f,x):(x=pl(g.type,g.key,g.props,null,f.mode,x),x.ref=io(f,v,g),x.return=f,x)}function c(f,v,g,x){return v===null||v.tag!==4||v.stateNode.containerInfo!==g.containerInfo||v.stateNode.implementation!==g.implementation?(v=su(g,f.mode,x),v.return=f,v):(v=r(v,g.children||[]),v.return=f,v)}function u(f,v,g,x,R){return v===null||v.tag!==7?(v=Dr(g,f.mode,x,R),v.return=f,v):(v=r(v,g),v.return=f,v)}function d(f,v,g){if(typeof v=="string"&&v!==""||typeof v=="number")return v=ru(""+v,f.mode,g),v.return=f,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case ma:return g=pl(v.type,v.key,v.props,null,f.mode,g),g.ref=io(f,null,v),g.return=f,g;case ls:return v=su(v,f.mode,g),v.return=f,v;case Oi:var x=v._init;return d(f,x(v._payload),g)}if(mo(v)||Js(v))return v=Dr(v,f.mode,g,null),v.return=f,v;Aa(f,v)}return null}function h(f,v,g,x){var R=v!==null?v.key:null;if(typeof g=="string"&&g!==""||typeof g=="number")return R!==null?null:a(f,v,""+g,x);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case ma:return g.key===R?l(f,v,g,x):null;case ls:return g.key===R?c(f,v,g,x):null;case Oi:return R=g._init,h(f,v,R(g._payload),x)}if(mo(g)||Js(g))return R!==null?null:u(f,v,g,x,null);Aa(f,g)}return null}function p(f,v,g,x,R){if(typeof x=="string"&&x!==""||typeof x=="number")return f=f.get(g)||null,a(v,f,""+x,R);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case ma:return f=f.get(x.key===null?g:x.key)||null,l(v,f,x,R);case ls:return f=f.get(x.key===null?g:x.key)||null,c(v,f,x,R);case Oi:var C=x._init;return p(f,v,g,C(x._payload),R)}if(mo(x)||Js(x))return f=f.get(g)||null,u(v,f,x,R,null);Aa(v,x)}return null}function _(f,v,g,x){for(var R=null,C=null,A=v,N=v=0,E=null;A!==null&&N<g.length;N++){A.index>N?(E=A,A=null):E=A.sibling;var w=h(f,A,g[N],x);if(w===null){A===null&&(A=E);break}t&&A&&w.alternate===null&&e(f,A),v=s(w,v,N),C===null?R=w:C.sibling=w,C=w,A=E}if(N===g.length)return n(f,A),at&&_r(f,N),R;if(A===null){for(;N<g.length;N++)A=d(f,g[N],x),A!==null&&(v=s(A,v,N),C===null?R=A:C.sibling=A,C=A);return at&&_r(f,N),R}for(A=i(f,A);N<g.length;N++)E=p(A,f,N,g[N],x),E!==null&&(t&&E.alternate!==null&&A.delete(E.key===null?N:E.key),v=s(E,v,N),C===null?R=E:C.sibling=E,C=E);return t&&A.forEach(function(X){return e(f,X)}),at&&_r(f,N),R}function y(f,v,g,x){var R=Js(g);if(typeof R!="function")throw Error(ie(150));if(g=R.call(g),g==null)throw Error(ie(151));for(var C=R=null,A=v,N=v=0,E=null,w=g.next();A!==null&&!w.done;N++,w=g.next()){A.index>N?(E=A,A=null):E=A.sibling;var X=h(f,A,w.value,x);if(X===null){A===null&&(A=E);break}t&&A&&X.alternate===null&&e(f,A),v=s(X,v,N),C===null?R=X:C.sibling=X,C=X,A=E}if(w.done)return n(f,A),at&&_r(f,N),R;if(A===null){for(;!w.done;N++,w=g.next())w=d(f,w.value,x),w!==null&&(v=s(w,v,N),C===null?R=w:C.sibling=w,C=w);return at&&_r(f,N),R}for(A=i(f,A);!w.done;N++,w=g.next())w=p(A,f,N,w.value,x),w!==null&&(t&&w.alternate!==null&&A.delete(w.key===null?N:w.key),v=s(w,v,N),C===null?R=w:C.sibling=w,C=w);return t&&A.forEach(function(z){return e(f,z)}),at&&_r(f,N),R}function m(f,v,g,x){if(typeof g=="object"&&g!==null&&g.type===cs&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case ma:e:{for(var R=g.key,C=v;C!==null;){if(C.key===R){if(R=g.type,R===cs){if(C.tag===7){n(f,C.sibling),v=r(C,g.props.children),v.return=f,f=v;break e}}else if(C.elementType===R||typeof R=="object"&&R!==null&&R.$$typeof===Oi&&lp(R)===C.type){n(f,C.sibling),v=r(C,g.props),v.ref=io(f,C,g),v.return=f,f=v;break e}n(f,C);break}else e(f,C);C=C.sibling}g.type===cs?(v=Dr(g.props.children,f.mode,x,g.key),v.return=f,f=v):(x=pl(g.type,g.key,g.props,null,f.mode,x),x.ref=io(f,v,g),x.return=f,f=x)}return o(f);case ls:e:{for(C=g.key;v!==null;){if(v.key===C)if(v.tag===4&&v.stateNode.containerInfo===g.containerInfo&&v.stateNode.implementation===g.implementation){n(f,v.sibling),v=r(v,g.children||[]),v.return=f,f=v;break e}else{n(f,v);break}else e(f,v);v=v.sibling}v=su(g,f.mode,x),v.return=f,f=v}return o(f);case Oi:return C=g._init,m(f,v,C(g._payload),x)}if(mo(g))return _(f,v,g,x);if(Js(g))return y(f,v,g,x);Aa(f,g)}return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,v!==null&&v.tag===6?(n(f,v.sibling),v=r(v,g),v.return=f,f=v):(n(f,v),v=ru(g,f.mode,x),v.return=f,f=v),o(f)):n(f,v)}return m}var Us=Fv(!0),zv=Fv(!1),Nl=sr(null),Ul=null,vs=null,Sf=null;function Ef(){Sf=vs=Ul=null}function Mf(t){var e=Nl.current;ot(Nl),t._currentValue=e}function _d(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function Cs(t,e){Ul=t,Sf=vs=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(nn=!0),t.firstContext=null)}function bn(t){var e=t._currentValue;if(Sf!==t)if(t={context:t,memoizedValue:e,next:null},vs===null){if(Ul===null)throw Error(ie(308));vs=t,Ul.dependencies={lanes:0,firstContext:t}}else vs=vs.next=t;return e}var Cr=null;function wf(t){Cr===null?Cr=[t]:Cr.push(t)}function Bv(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,wf(e)):(n.next=r.next,r.next=n),e.interleaved=n,wi(t,i)}function wi(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var ki=!1;function Tf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Hv(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function vi(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Yi(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,qe&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,wi(t,n)}return r=i.interleaved,r===null?(e.next=e,wf(i)):(e.next=r.next,r.next=e),i.interleaved=e,wi(t,n)}function ll(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,uf(t,n)}}function cp(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Il(t,e,n,i){var r=t.updateQueue;ki=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,c=l.next;l.next=null,o===null?s=c:o.next=c,o=l;var u=t.alternate;u!==null&&(u=u.updateQueue,a=u.lastBaseUpdate,a!==o&&(a===null?u.firstBaseUpdate=c:a.next=c,u.lastBaseUpdate=l))}if(s!==null){var d=r.baseState;o=0,u=c=l=null,a=s;do{var h=a.lane,p=a.eventTime;if((i&h)===h){u!==null&&(u=u.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var _=t,y=a;switch(h=e,p=n,y.tag){case 1:if(_=y.payload,typeof _=="function"){d=_.call(p,d,h);break e}d=_;break e;case 3:_.flags=_.flags&-65537|128;case 0:if(_=y.payload,h=typeof _=="function"?_.call(p,d,h):_,h==null)break e;d=ft({},d,h);break e;case 2:ki=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,h=r.effects,h===null?r.effects=[a]:h.push(a))}else p={eventTime:p,lane:h,tag:a.tag,payload:a.payload,callback:a.callback,next:null},u===null?(c=u=p,l=d):u=u.next=p,o|=h;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;h=a,a=h.next,h.next=null,r.lastBaseUpdate=h,r.shared.pending=null}}while(!0);if(u===null&&(l=d),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=u,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);zr|=o,t.lanes=o,t.memoizedState=d}}function up(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(ie(191,r));r.call(i)}}}var ra={},ni=sr(ra),Wo=sr(ra),jo=sr(ra);function Rr(t){if(t===ra)throw Error(ie(174));return t}function Af(t,e){switch(nt(jo,e),nt(Wo,t),nt(ni,ra),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Ju(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Ju(e,t)}ot(ni),nt(ni,e)}function Is(){ot(ni),ot(Wo),ot(jo)}function Gv(t){Rr(jo.current);var e=Rr(ni.current),n=Ju(e,t.type);e!==n&&(nt(Wo,t),nt(ni,n))}function Cf(t){Wo.current===t&&(ot(ni),ot(Wo))}var ct=sr(0);function Ol(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Jc=[];function Rf(){for(var t=0;t<Jc.length;t++)Jc[t]._workInProgressVersionPrimary=null;Jc.length=0}var cl=Ri.ReactCurrentDispatcher,Qc=Ri.ReactCurrentBatchConfig,Fr=0,ut=null,xt=null,bt=null,kl=!1,wo=!1,Xo=0,eS=0;function Ft(){throw Error(ie(321))}function bf(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Xn(t[n],e[n]))return!1;return!0}function Pf(t,e,n,i,r,s){if(Fr=s,ut=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,cl.current=t===null||t.memoizedState===null?rS:sS,t=n(i,r),wo){s=0;do{if(wo=!1,Xo=0,25<=s)throw Error(ie(301));s+=1,bt=xt=null,e.updateQueue=null,cl.current=oS,t=n(i,r)}while(wo)}if(cl.current=Fl,e=xt!==null&&xt.next!==null,Fr=0,bt=xt=ut=null,kl=!1,e)throw Error(ie(300));return t}function Lf(){var t=Xo!==0;return Xo=0,t}function qn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return bt===null?ut.memoizedState=bt=t:bt=bt.next=t,bt}function Pn(){if(xt===null){var t=ut.alternate;t=t!==null?t.memoizedState:null}else t=xt.next;var e=bt===null?ut.memoizedState:bt.next;if(e!==null)bt=e,xt=t;else{if(t===null)throw Error(ie(310));xt=t,t={memoizedState:xt.memoizedState,baseState:xt.baseState,baseQueue:xt.baseQueue,queue:xt.queue,next:null},bt===null?ut.memoizedState=bt=t:bt=bt.next=t}return bt}function $o(t,e){return typeof e=="function"?e(t):e}function eu(t){var e=Pn(),n=e.queue;if(n===null)throw Error(ie(311));n.lastRenderedReducer=t;var i=xt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,c=s;do{var u=c.lane;if((Fr&u)===u)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var d={lane:u,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=d,o=i):l=l.next=d,ut.lanes|=u,zr|=u}c=c.next}while(c!==null&&c!==s);l===null?o=i:l.next=a,Xn(i,e.memoizedState)||(nn=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,ut.lanes|=s,zr|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function tu(t){var e=Pn(),n=e.queue;if(n===null)throw Error(ie(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do s=t(s,o.action),o=o.next;while(o!==r);Xn(s,e.memoizedState)||(nn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function Vv(){}function Wv(t,e){var n=ut,i=Pn(),r=e(),s=!Xn(i.memoizedState,r);if(s&&(i.memoizedState=r,nn=!0),i=i.queue,Df($v.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||bt!==null&&bt.memoizedState.tag&1){if(n.flags|=2048,Ko(9,Xv.bind(null,n,i,r,e),void 0,null),Pt===null)throw Error(ie(349));Fr&30||jv(n,e,r)}return r}function jv(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=ut.updateQueue,e===null?(e={lastEffect:null,stores:null},ut.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Xv(t,e,n,i){e.value=n,e.getSnapshot=i,Kv(e)&&Yv(t)}function $v(t,e,n){return n(function(){Kv(e)&&Yv(t)})}function Kv(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Xn(t,n)}catch{return!0}}function Yv(t){var e=wi(t,1);e!==null&&Wn(e,t,1,-1)}function dp(t){var e=qn();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:$o,lastRenderedState:t},e.queue=t,t=t.dispatch=iS.bind(null,ut,t),[e.memoizedState,t]}function Ko(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=ut.updateQueue,e===null?(e={lastEffect:null,stores:null},ut.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function qv(){return Pn().memoizedState}function ul(t,e,n,i){var r=qn();ut.flags|=t,r.memoizedState=Ko(1|e,n,void 0,i===void 0?null:i)}function uc(t,e,n,i){var r=Pn();i=i===void 0?null:i;var s=void 0;if(xt!==null){var o=xt.memoizedState;if(s=o.destroy,i!==null&&bf(i,o.deps)){r.memoizedState=Ko(e,n,s,i);return}}ut.flags|=t,r.memoizedState=Ko(1|e,n,s,i)}function fp(t,e){return ul(8390656,8,t,e)}function Df(t,e){return uc(2048,8,t,e)}function Zv(t,e){return uc(4,2,t,e)}function Jv(t,e){return uc(4,4,t,e)}function Qv(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function e_(t,e,n){return n=n!=null?n.concat([t]):null,uc(4,4,Qv.bind(null,e,t),n)}function Nf(){}function t_(t,e){var n=Pn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&bf(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function n_(t,e){var n=Pn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&bf(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function i_(t,e,n){return Fr&21?(Xn(n,e)||(n=lv(),ut.lanes|=n,zr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,nn=!0),t.memoizedState=n)}function tS(t,e){var n=Ze;Ze=n!==0&&4>n?n:4,t(!0);var i=Qc.transition;Qc.transition={};try{t(!1),e()}finally{Ze=n,Qc.transition=i}}function r_(){return Pn().memoizedState}function nS(t,e,n){var i=Zi(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},s_(t))o_(e,n);else if(n=Bv(t,e,n,i),n!==null){var r=Jt();Wn(n,t,i,r),a_(n,e,i)}}function iS(t,e,n){var i=Zi(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(s_(t))o_(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,n);if(r.hasEagerState=!0,r.eagerState=a,Xn(a,o)){var l=e.interleaved;l===null?(r.next=r,wf(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=Bv(t,e,r,i),n!==null&&(r=Jt(),Wn(n,t,i,r),a_(n,e,i))}}function s_(t){var e=t.alternate;return t===ut||e!==null&&e===ut}function o_(t,e){wo=kl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function a_(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,uf(t,n)}}var Fl={readContext:bn,useCallback:Ft,useContext:Ft,useEffect:Ft,useImperativeHandle:Ft,useInsertionEffect:Ft,useLayoutEffect:Ft,useMemo:Ft,useReducer:Ft,useRef:Ft,useState:Ft,useDebugValue:Ft,useDeferredValue:Ft,useTransition:Ft,useMutableSource:Ft,useSyncExternalStore:Ft,useId:Ft,unstable_isNewReconciler:!1},rS={readContext:bn,useCallback:function(t,e){return qn().memoizedState=[t,e===void 0?null:e],t},useContext:bn,useEffect:fp,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,ul(4194308,4,Qv.bind(null,e,t),n)},useLayoutEffect:function(t,e){return ul(4194308,4,t,e)},useInsertionEffect:function(t,e){return ul(4,2,t,e)},useMemo:function(t,e){var n=qn();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=qn();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=nS.bind(null,ut,t),[i.memoizedState,t]},useRef:function(t){var e=qn();return t={current:t},e.memoizedState=t},useState:dp,useDebugValue:Nf,useDeferredValue:function(t){return qn().memoizedState=t},useTransition:function(){var t=dp(!1),e=t[0];return t=tS.bind(null,t[1]),qn().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=ut,r=qn();if(at){if(n===void 0)throw Error(ie(407));n=n()}else{if(n=e(),Pt===null)throw Error(ie(349));Fr&30||jv(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,fp($v.bind(null,i,s,t),[t]),i.flags|=2048,Ko(9,Xv.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=qn(),e=Pt.identifierPrefix;if(at){var n=mi,i=pi;n=(i&~(1<<32-Vn(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=Xo++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=eS++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},sS={readContext:bn,useCallback:t_,useContext:bn,useEffect:Df,useImperativeHandle:e_,useInsertionEffect:Zv,useLayoutEffect:Jv,useMemo:n_,useReducer:eu,useRef:qv,useState:function(){return eu($o)},useDebugValue:Nf,useDeferredValue:function(t){var e=Pn();return i_(e,xt.memoizedState,t)},useTransition:function(){var t=eu($o)[0],e=Pn().memoizedState;return[t,e]},useMutableSource:Vv,useSyncExternalStore:Wv,useId:r_,unstable_isNewReconciler:!1},oS={readContext:bn,useCallback:t_,useContext:bn,useEffect:Df,useImperativeHandle:e_,useInsertionEffect:Zv,useLayoutEffect:Jv,useMemo:n_,useReducer:tu,useRef:qv,useState:function(){return tu($o)},useDebugValue:Nf,useDeferredValue:function(t){var e=Pn();return xt===null?e.memoizedState=t:i_(e,xt.memoizedState,t)},useTransition:function(){var t=tu($o)[0],e=Pn().memoizedState;return[t,e]},useMutableSource:Vv,useSyncExternalStore:Wv,useId:r_,unstable_isNewReconciler:!1};function On(t,e){if(t&&t.defaultProps){e=ft({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function yd(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:ft({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var dc={isMounted:function(t){return(t=t._reactInternals)?Gr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=Jt(),r=Zi(t),s=vi(i,r);s.payload=e,n!=null&&(s.callback=n),e=Yi(t,s,r),e!==null&&(Wn(e,t,r,i),ll(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=Jt(),r=Zi(t),s=vi(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Yi(t,s,r),e!==null&&(Wn(e,t,r,i),ll(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=Jt(),i=Zi(t),r=vi(n,i);r.tag=2,e!=null&&(r.callback=e),e=Yi(t,r,i),e!==null&&(Wn(e,t,i,n),ll(e,t,i))}};function hp(t,e,n,i,r,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!Bo(n,i)||!Bo(r,s):!0}function l_(t,e,n){var i=!1,r=nr,s=e.contextType;return typeof s=="object"&&s!==null?s=bn(s):(r=on(e)?Or:Vt.current,i=e.contextTypes,s=(i=i!=null)?Ds(t,r):nr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=dc,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function pp(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&dc.enqueueReplaceState(e,e.state,null)}function xd(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},Tf(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=bn(s):(s=on(e)?Or:Vt.current,r.context=Ds(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(yd(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&dc.enqueueReplaceState(r,r.state,null),Il(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function Os(t,e){try{var n="",i=e;do n+=Uy(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function nu(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Sd(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var aS=typeof WeakMap=="function"?WeakMap:Map;function c_(t,e,n){n=vi(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){Bl||(Bl=!0,Ld=i),Sd(t,e)},n}function u_(t,e,n){n=vi(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){Sd(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Sd(t,e),typeof i!="function"&&(qi===null?qi=new Set([this]):qi.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function mp(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new aS;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=SS.bind(null,t,e,n),e.then(t,t))}function gp(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function vp(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=vi(-1,1),e.tag=2,Yi(n,e,1))),n.lanes|=1),t)}var lS=Ri.ReactCurrentOwner,nn=!1;function Yt(t,e,n,i){e.child=t===null?zv(e,null,n,i):Us(e,t.child,n,i)}function _p(t,e,n,i,r){n=n.render;var s=e.ref;return Cs(e,r),i=Pf(t,e,n,i,s,r),n=Lf(),t!==null&&!nn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ti(t,e,r)):(at&&n&&_f(e),e.flags|=1,Yt(t,e,i,r),e.child)}function yp(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!Hf(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,d_(t,e,s,i,r)):(t=pl(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:Bo,n(o,i)&&t.ref===e.ref)return Ti(t,e,r)}return e.flags|=1,t=Ji(s,i),t.ref=e.ref,t.return=e,e.child=t}function d_(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(Bo(s,i)&&t.ref===e.ref)if(nn=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(nn=!0);else return e.lanes=t.lanes,Ti(t,e,r)}return Ed(t,e,n,i,r)}function f_(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},nt(ys,fn),fn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,nt(ys,fn),fn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,nt(ys,fn),fn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,nt(ys,fn),fn|=i;return Yt(t,e,r,n),e.child}function h_(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Ed(t,e,n,i,r){var s=on(n)?Or:Vt.current;return s=Ds(e,s),Cs(e,r),n=Pf(t,e,n,i,s,r),i=Lf(),t!==null&&!nn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ti(t,e,r)):(at&&i&&_f(e),e.flags|=1,Yt(t,e,n,r),e.child)}function xp(t,e,n,i,r){if(on(n)){var s=!0;Pl(e)}else s=!1;if(Cs(e,r),e.stateNode===null)dl(t,e),l_(e,n,i),xd(e,n,i,r),i=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=bn(c):(c=on(n)?Or:Vt.current,c=Ds(e,c));var u=n.getDerivedStateFromProps,d=typeof u=="function"||typeof o.getSnapshotBeforeUpdate=="function";d||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==c)&&pp(e,o,i,c),ki=!1;var h=e.memoizedState;o.state=h,Il(e,i,o,r),l=e.memoizedState,a!==i||h!==l||sn.current||ki?(typeof u=="function"&&(yd(e,n,u,i),l=e.memoizedState),(a=ki||hp(e,n,a,i,h,l,c))?(d||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=c,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,Hv(t,e),a=e.memoizedProps,c=e.type===e.elementType?a:On(e.type,a),o.props=c,d=e.pendingProps,h=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=bn(l):(l=on(n)?Or:Vt.current,l=Ds(e,l));var p=n.getDerivedStateFromProps;(u=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==d||h!==l)&&pp(e,o,i,l),ki=!1,h=e.memoizedState,o.state=h,Il(e,i,o,r);var _=e.memoizedState;a!==d||h!==_||sn.current||ki?(typeof p=="function"&&(yd(e,n,p,i),_=e.memoizedState),(c=ki||hp(e,n,c,i,h,_,l)||!1)?(u||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,_,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,_,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=_),o.props=i,o.state=_,o.context=l,i=c):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),i=!1)}return Md(t,e,n,i,s,r)}function Md(t,e,n,i,r,s){h_(t,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&sp(e,n,!1),Ti(t,e,s);i=e.stateNode,lS.current=e;var a=o&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&o?(e.child=Us(e,t.child,null,s),e.child=Us(e,null,a,s)):Yt(t,e,a,s),e.memoizedState=i.state,r&&sp(e,n,!0),e.child}function p_(t){var e=t.stateNode;e.pendingContext?rp(t,e.pendingContext,e.pendingContext!==e.context):e.context&&rp(t,e.context,!1),Af(t,e.containerInfo)}function Sp(t,e,n,i,r){return Ns(),xf(r),e.flags|=256,Yt(t,e,n,i),e.child}var wd={dehydrated:null,treeContext:null,retryLane:0};function Td(t){return{baseLanes:t,cachePool:null,transitions:null}}function m_(t,e,n){var i=e.pendingProps,r=ct.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),nt(ct,r&1),t===null)return vd(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,t=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=pc(o,i,0,null),t=Dr(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=Td(n),e.memoizedState=wd,t):Uf(e,o));if(r=t.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return cS(t,e,o,i,a,r,n);if(s){s=i.fallback,o=e.mode,r=t.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=Ji(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=Ji(a,s):(s=Dr(s,o,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=t.child.memoizedState,o=o===null?Td(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=wd,i}return s=t.child,t=s.sibling,i=Ji(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function Uf(t,e){return e=pc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Ca(t,e,n,i){return i!==null&&xf(i),Us(e,t.child,null,n),t=Uf(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function cS(t,e,n,i,r,s,o){if(n)return e.flags&256?(e.flags&=-257,i=nu(Error(ie(422))),Ca(t,e,o,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=pc({mode:"visible",children:i.children},r,0,null),s=Dr(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&Us(e,t.child,null,o),e.child.memoizedState=Td(o),e.memoizedState=wd,s);if(!(e.mode&1))return Ca(t,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(ie(419)),i=nu(s,i,void 0),Ca(t,e,o,i)}if(a=(o&t.childLanes)!==0,nn||a){if(i=Pt,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,wi(t,r),Wn(i,t,r,-1))}return Bf(),i=nu(Error(ie(421))),Ca(t,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=ES.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,hn=Ki(r.nextSibling),pn=e,at=!0,Fn=null,t!==null&&(En[Mn++]=pi,En[Mn++]=mi,En[Mn++]=kr,pi=t.id,mi=t.overflow,kr=e),e=Uf(e,i.children),e.flags|=4096,e)}function Ep(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),_d(t.return,e,n)}function iu(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function g_(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(Yt(t,e,i.children,n),i=ct.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Ep(t,n,e);else if(t.tag===19)Ep(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(nt(ct,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&Ol(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),iu(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&Ol(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}iu(e,!0,n,null,s);break;case"together":iu(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function dl(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Ti(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),zr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(ie(153));if(e.child!==null){for(t=e.child,n=Ji(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Ji(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function uS(t,e,n){switch(e.tag){case 3:p_(e),Ns();break;case 5:Gv(e);break;case 1:on(e.type)&&Pl(e);break;case 4:Af(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;nt(Nl,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(nt(ct,ct.current&1),e.flags|=128,null):n&e.child.childLanes?m_(t,e,n):(nt(ct,ct.current&1),t=Ti(t,e,n),t!==null?t.sibling:null);nt(ct,ct.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return g_(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),nt(ct,ct.current),i)break;return null;case 22:case 23:return e.lanes=0,f_(t,e,n)}return Ti(t,e,n)}var v_,Ad,__,y_;v_=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Ad=function(){};__=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Rr(ni.current);var s=null;switch(n){case"input":r=Ku(t,r),i=Ku(t,i),s=[];break;case"select":r=ft({},r,{value:void 0}),i=ft({},i,{value:void 0}),s=[];break;case"textarea":r=Zu(t,r),i=Zu(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=Rl)}Qu(n,i);var o;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var a=r[c];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(No.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(a=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(No.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&rt("scroll",t),s||a===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};y_=function(t,e,n,i){n!==i&&(e.flags|=4)};function ro(t,e){if(!at)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function zt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function dS(t,e,n){var i=e.pendingProps;switch(yf(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return zt(e),null;case 1:return on(e.type)&&bl(),zt(e),null;case 3:return i=e.stateNode,Is(),ot(sn),ot(Vt),Rf(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(Ta(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Fn!==null&&(Ud(Fn),Fn=null))),Ad(t,e),zt(e),null;case 5:Cf(e);var r=Rr(jo.current);if(n=e.type,t!==null&&e.stateNode!=null)__(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(ie(166));return zt(e),null}if(t=Rr(ni.current),Ta(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[Qn]=e,i[Vo]=s,t=(e.mode&1)!==0,n){case"dialog":rt("cancel",i),rt("close",i);break;case"iframe":case"object":case"embed":rt("load",i);break;case"video":case"audio":for(r=0;r<vo.length;r++)rt(vo[r],i);break;case"source":rt("error",i);break;case"img":case"image":case"link":rt("error",i),rt("load",i);break;case"details":rt("toggle",i);break;case"input":Lh(i,s),rt("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},rt("invalid",i);break;case"textarea":Nh(i,s),rt("invalid",i)}Qu(n,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&wa(i.textContent,a,t),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&wa(i.textContent,a,t),r=["children",""+a]):No.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&rt("scroll",i)}switch(n){case"input":ga(i),Dh(i,s,!0);break;case"textarea":ga(i),Uh(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=Rl)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=$g(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=o.createElement(n,{is:i.is}):(t=o.createElement(n),n==="select"&&(o=t,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):t=o.createElementNS(t,n),t[Qn]=e,t[Vo]=i,v_(t,e,!1,!1),e.stateNode=t;e:{switch(o=ed(n,i),n){case"dialog":rt("cancel",t),rt("close",t),r=i;break;case"iframe":case"object":case"embed":rt("load",t),r=i;break;case"video":case"audio":for(r=0;r<vo.length;r++)rt(vo[r],t);r=i;break;case"source":rt("error",t),r=i;break;case"img":case"image":case"link":rt("error",t),rt("load",t),r=i;break;case"details":rt("toggle",t),r=i;break;case"input":Lh(t,i),r=Ku(t,i),rt("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=ft({},i,{value:void 0}),rt("invalid",t);break;case"textarea":Nh(t,i),r=Zu(t,i),rt("invalid",t);break;default:r=i}Qu(n,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?qg(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&Kg(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Uo(t,l):typeof l=="number"&&Uo(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(No.hasOwnProperty(s)?l!=null&&s==="onScroll"&&rt("scroll",t):l!=null&&rf(t,s,l,o))}switch(n){case"input":ga(t),Dh(t,i,!1);break;case"textarea":ga(t),Uh(t);break;case"option":i.value!=null&&t.setAttribute("value",""+tr(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?Ms(t,!!i.multiple,s,!1):i.defaultValue!=null&&Ms(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=Rl)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return zt(e),null;case 6:if(t&&e.stateNode!=null)y_(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(ie(166));if(n=Rr(jo.current),Rr(ni.current),Ta(e)){if(i=e.stateNode,n=e.memoizedProps,i[Qn]=e,(s=i.nodeValue!==n)&&(t=pn,t!==null))switch(t.tag){case 3:wa(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&wa(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[Qn]=e,e.stateNode=i}return zt(e),null;case 13:if(ot(ct),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(at&&hn!==null&&e.mode&1&&!(e.flags&128))kv(),Ns(),e.flags|=98560,s=!1;else if(s=Ta(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(ie(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(ie(317));s[Qn]=e}else Ns(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;zt(e),s=!1}else Fn!==null&&(Ud(Fn),Fn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||ct.current&1?St===0&&(St=3):Bf())),e.updateQueue!==null&&(e.flags|=4),zt(e),null);case 4:return Is(),Ad(t,e),t===null&&Ho(e.stateNode.containerInfo),zt(e),null;case 10:return Mf(e.type._context),zt(e),null;case 17:return on(e.type)&&bl(),zt(e),null;case 19:if(ot(ct),s=e.memoizedState,s===null)return zt(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)ro(s,!1);else{if(St!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=Ol(t),o!==null){for(e.flags|=128,ro(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return nt(ct,ct.current&1|2),e.child}t=t.sibling}s.tail!==null&&vt()>ks&&(e.flags|=128,i=!0,ro(s,!1),e.lanes=4194304)}else{if(!i)if(t=Ol(o),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),ro(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!at)return zt(e),null}else 2*vt()-s.renderingStartTime>ks&&n!==1073741824&&(e.flags|=128,i=!0,ro(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=vt(),e.sibling=null,n=ct.current,nt(ct,i?n&1|2:n&1),e):(zt(e),null);case 22:case 23:return zf(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?fn&1073741824&&(zt(e),e.subtreeFlags&6&&(e.flags|=8192)):zt(e),null;case 24:return null;case 25:return null}throw Error(ie(156,e.tag))}function fS(t,e){switch(yf(e),e.tag){case 1:return on(e.type)&&bl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Is(),ot(sn),ot(Vt),Rf(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Cf(e),null;case 13:if(ot(ct),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(ie(340));Ns()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return ot(ct),null;case 4:return Is(),null;case 10:return Mf(e.type._context),null;case 22:case 23:return zf(),null;case 24:return null;default:return null}}var Ra=!1,Gt=!1,hS=typeof WeakSet=="function"?WeakSet:Set,he=null;function _s(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){pt(t,e,i)}else n.current=null}function Cd(t,e,n){try{n()}catch(i){pt(t,e,i)}}var Mp=!1;function pS(t,e){if(ud=Tl,t=wv(),vf(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,l=-1,c=0,u=0,d=t,h=null;t:for(;;){for(var p;d!==n||r!==0&&d.nodeType!==3||(a=o+r),d!==s||i!==0&&d.nodeType!==3||(l=o+i),d.nodeType===3&&(o+=d.nodeValue.length),(p=d.firstChild)!==null;)h=d,d=p;for(;;){if(d===t)break t;if(h===n&&++c===r&&(a=o),h===s&&++u===i&&(l=o),(p=d.nextSibling)!==null)break;d=h,h=d.parentNode}d=p}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(dd={focusedElem:t,selectionRange:n},Tl=!1,he=e;he!==null;)if(e=he,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,he=t;else for(;he!==null;){e=he;try{var _=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(_!==null){var y=_.memoizedProps,m=_.memoizedState,f=e.stateNode,v=f.getSnapshotBeforeUpdate(e.elementType===e.type?y:On(e.type,y),m);f.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var g=e.stateNode.containerInfo;g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(ie(163))}}catch(x){pt(e,e.return,x)}if(t=e.sibling,t!==null){t.return=e.return,he=t;break}he=e.return}return _=Mp,Mp=!1,_}function To(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&Cd(e,n,s)}r=r.next}while(r!==i)}}function fc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function Rd(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function x_(t){var e=t.alternate;e!==null&&(t.alternate=null,x_(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[Qn],delete e[Vo],delete e[pd],delete e[qx],delete e[Zx])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function S_(t){return t.tag===5||t.tag===3||t.tag===4}function wp(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||S_(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function bd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Rl));else if(i!==4&&(t=t.child,t!==null))for(bd(t,e,n),t=t.sibling;t!==null;)bd(t,e,n),t=t.sibling}function Pd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(Pd(t,e,n),t=t.sibling;t!==null;)Pd(t,e,n),t=t.sibling}var Lt=null,kn=!1;function Pi(t,e,n){for(n=n.child;n!==null;)E_(t,e,n),n=n.sibling}function E_(t,e,n){if(ti&&typeof ti.onCommitFiberUnmount=="function")try{ti.onCommitFiberUnmount(rc,n)}catch{}switch(n.tag){case 5:Gt||_s(n,e);case 6:var i=Lt,r=kn;Lt=null,Pi(t,e,n),Lt=i,kn=r,Lt!==null&&(kn?(t=Lt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Lt.removeChild(n.stateNode));break;case 18:Lt!==null&&(kn?(t=Lt,n=n.stateNode,t.nodeType===8?qc(t.parentNode,n):t.nodeType===1&&qc(t,n),Fo(t)):qc(Lt,n.stateNode));break;case 4:i=Lt,r=kn,Lt=n.stateNode.containerInfo,kn=!0,Pi(t,e,n),Lt=i,kn=r;break;case 0:case 11:case 14:case 15:if(!Gt&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&Cd(n,e,o),r=r.next}while(r!==i)}Pi(t,e,n);break;case 1:if(!Gt&&(_s(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(a){pt(n,e,a)}Pi(t,e,n);break;case 21:Pi(t,e,n);break;case 22:n.mode&1?(Gt=(i=Gt)||n.memoizedState!==null,Pi(t,e,n),Gt=i):Pi(t,e,n);break;default:Pi(t,e,n)}}function Tp(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new hS),e.forEach(function(i){var r=MS.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function Dn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:Lt=a.stateNode,kn=!1;break e;case 3:Lt=a.stateNode.containerInfo,kn=!0;break e;case 4:Lt=a.stateNode.containerInfo,kn=!0;break e}a=a.return}if(Lt===null)throw Error(ie(160));E_(s,o,r),Lt=null,kn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){pt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)M_(e,t),e=e.sibling}function M_(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Dn(e,t),Yn(t),i&4){try{To(3,t,t.return),fc(3,t)}catch(y){pt(t,t.return,y)}try{To(5,t,t.return)}catch(y){pt(t,t.return,y)}}break;case 1:Dn(e,t),Yn(t),i&512&&n!==null&&_s(n,n.return);break;case 5:if(Dn(e,t),Yn(t),i&512&&n!==null&&_s(n,n.return),t.flags&32){var r=t.stateNode;try{Uo(r,"")}catch(y){pt(t,t.return,y)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,a=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&jg(r,s),ed(a,o);var c=ed(a,s);for(o=0;o<l.length;o+=2){var u=l[o],d=l[o+1];u==="style"?qg(r,d):u==="dangerouslySetInnerHTML"?Kg(r,d):u==="children"?Uo(r,d):rf(r,u,d,c)}switch(a){case"input":Yu(r,s);break;case"textarea":Xg(r,s);break;case"select":var h=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?Ms(r,!!s.multiple,p,!1):h!==!!s.multiple&&(s.defaultValue!=null?Ms(r,!!s.multiple,s.defaultValue,!0):Ms(r,!!s.multiple,s.multiple?[]:"",!1))}r[Vo]=s}catch(y){pt(t,t.return,y)}}break;case 6:if(Dn(e,t),Yn(t),i&4){if(t.stateNode===null)throw Error(ie(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(y){pt(t,t.return,y)}}break;case 3:if(Dn(e,t),Yn(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Fo(e.containerInfo)}catch(y){pt(t,t.return,y)}break;case 4:Dn(e,t),Yn(t);break;case 13:Dn(e,t),Yn(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(kf=vt())),i&4&&Tp(t);break;case 22:if(u=n!==null&&n.memoizedState!==null,t.mode&1?(Gt=(c=Gt)||u,Dn(e,t),Gt=c):Dn(e,t),Yn(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!u&&t.mode&1)for(he=t,u=t.child;u!==null;){for(d=he=u;he!==null;){switch(h=he,p=h.child,h.tag){case 0:case 11:case 14:case 15:To(4,h,h.return);break;case 1:_s(h,h.return);var _=h.stateNode;if(typeof _.componentWillUnmount=="function"){i=h,n=h.return;try{e=i,_.props=e.memoizedProps,_.state=e.memoizedState,_.componentWillUnmount()}catch(y){pt(i,n,y)}}break;case 5:_s(h,h.return);break;case 22:if(h.memoizedState!==null){Cp(d);continue}}p!==null?(p.return=h,he=p):Cp(d)}u=u.sibling}e:for(u=null,d=t;;){if(d.tag===5){if(u===null){u=d;try{r=d.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=d.stateNode,l=d.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=Yg("display",o))}catch(y){pt(t,t.return,y)}}}else if(d.tag===6){if(u===null)try{d.stateNode.nodeValue=c?"":d.memoizedProps}catch(y){pt(t,t.return,y)}}else if((d.tag!==22&&d.tag!==23||d.memoizedState===null||d===t)&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===t)break e;for(;d.sibling===null;){if(d.return===null||d.return===t)break e;u===d&&(u=null),d=d.return}u===d&&(u=null),d.sibling.return=d.return,d=d.sibling}}break;case 19:Dn(e,t),Yn(t),i&4&&Tp(t);break;case 21:break;default:Dn(e,t),Yn(t)}}function Yn(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(S_(n)){var i=n;break e}n=n.return}throw Error(ie(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Uo(r,""),i.flags&=-33);var s=wp(t);Pd(t,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=wp(t);bd(t,a,o);break;default:throw Error(ie(161))}}catch(l){pt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function mS(t,e,n){he=t,w_(t)}function w_(t,e,n){for(var i=(t.mode&1)!==0;he!==null;){var r=he,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||Ra;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||Gt;a=Ra;var c=Gt;if(Ra=o,(Gt=l)&&!c)for(he=r;he!==null;)o=he,l=o.child,o.tag===22&&o.memoizedState!==null?Rp(r):l!==null?(l.return=o,he=l):Rp(r);for(;s!==null;)he=s,w_(s),s=s.sibling;he=r,Ra=a,Gt=c}Ap(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,he=s):Ap(t)}}function Ap(t){for(;he!==null;){var e=he;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Gt||fc(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!Gt)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:On(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&up(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}up(e,o,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var u=c.memoizedState;if(u!==null){var d=u.dehydrated;d!==null&&Fo(d)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(ie(163))}Gt||e.flags&512&&Rd(e)}catch(h){pt(e,e.return,h)}}if(e===t){he=null;break}if(n=e.sibling,n!==null){n.return=e.return,he=n;break}he=e.return}}function Cp(t){for(;he!==null;){var e=he;if(e===t){he=null;break}var n=e.sibling;if(n!==null){n.return=e.return,he=n;break}he=e.return}}function Rp(t){for(;he!==null;){var e=he;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{fc(4,e)}catch(l){pt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){pt(e,r,l)}}var s=e.return;try{Rd(e)}catch(l){pt(e,s,l)}break;case 5:var o=e.return;try{Rd(e)}catch(l){pt(e,o,l)}}}catch(l){pt(e,e.return,l)}if(e===t){he=null;break}var a=e.sibling;if(a!==null){a.return=e.return,he=a;break}he=e.return}}var gS=Math.ceil,zl=Ri.ReactCurrentDispatcher,If=Ri.ReactCurrentOwner,Rn=Ri.ReactCurrentBatchConfig,qe=0,Pt=null,yt=null,Ut=0,fn=0,ys=sr(0),St=0,Yo=null,zr=0,hc=0,Of=0,Ao=null,tn=null,kf=0,ks=1/0,di=null,Bl=!1,Ld=null,qi=null,ba=!1,Gi=null,Hl=0,Co=0,Dd=null,fl=-1,hl=0;function Jt(){return qe&6?vt():fl!==-1?fl:fl=vt()}function Zi(t){return t.mode&1?qe&2&&Ut!==0?Ut&-Ut:Qx.transition!==null?(hl===0&&(hl=lv()),hl):(t=Ze,t!==0||(t=window.event,t=t===void 0?16:mv(t.type)),t):1}function Wn(t,e,n,i){if(50<Co)throw Co=0,Dd=null,Error(ie(185));ta(t,n,i),(!(qe&2)||t!==Pt)&&(t===Pt&&(!(qe&2)&&(hc|=n),St===4&&zi(t,Ut)),an(t,i),n===1&&qe===0&&!(e.mode&1)&&(ks=vt()+500,cc&&or()))}function an(t,e){var n=t.callbackNode;Qy(t,e);var i=wl(t,t===Pt?Ut:0);if(i===0)n!==null&&kh(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&kh(n),e===1)t.tag===0?Jx(bp.bind(null,t)):Uv(bp.bind(null,t)),Kx(function(){!(qe&6)&&or()}),n=null;else{switch(cv(i)){case 1:n=cf;break;case 4:n=ov;break;case 16:n=Ml;break;case 536870912:n=av;break;default:n=Ml}n=D_(n,T_.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function T_(t,e){if(fl=-1,hl=0,qe&6)throw Error(ie(327));var n=t.callbackNode;if(Rs()&&t.callbackNode!==n)return null;var i=wl(t,t===Pt?Ut:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=Gl(t,i);else{e=i;var r=qe;qe|=2;var s=C_();(Pt!==t||Ut!==e)&&(di=null,ks=vt()+500,Lr(t,e));do try{yS();break}catch(a){A_(t,a)}while(!0);Ef(),zl.current=s,qe=r,yt!==null?e=0:(Pt=null,Ut=0,e=St)}if(e!==0){if(e===2&&(r=sd(t),r!==0&&(i=r,e=Nd(t,r))),e===1)throw n=Yo,Lr(t,0),zi(t,i),an(t,vt()),n;if(e===6)zi(t,i);else{if(r=t.current.alternate,!(i&30)&&!vS(r)&&(e=Gl(t,i),e===2&&(s=sd(t),s!==0&&(i=s,e=Nd(t,s))),e===1))throw n=Yo,Lr(t,0),zi(t,i),an(t,vt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(ie(345));case 2:yr(t,tn,di);break;case 3:if(zi(t,i),(i&130023424)===i&&(e=kf+500-vt(),10<e)){if(wl(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){Jt(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=hd(yr.bind(null,t,tn,di),e);break}yr(t,tn,di);break;case 4:if(zi(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var o=31-Vn(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=vt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*gS(i/1960))-i,10<i){t.timeoutHandle=hd(yr.bind(null,t,tn,di),i);break}yr(t,tn,di);break;case 5:yr(t,tn,di);break;default:throw Error(ie(329))}}}return an(t,vt()),t.callbackNode===n?T_.bind(null,t):null}function Nd(t,e){var n=Ao;return t.current.memoizedState.isDehydrated&&(Lr(t,e).flags|=256),t=Gl(t,e),t!==2&&(e=tn,tn=n,e!==null&&Ud(e)),t}function Ud(t){tn===null?tn=t:tn.push.apply(tn,t)}function vS(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!Xn(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function zi(t,e){for(e&=~Of,e&=~hc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Vn(e),i=1<<n;t[n]=-1,e&=~i}}function bp(t){if(qe&6)throw Error(ie(327));Rs();var e=wl(t,0);if(!(e&1))return an(t,vt()),null;var n=Gl(t,e);if(t.tag!==0&&n===2){var i=sd(t);i!==0&&(e=i,n=Nd(t,i))}if(n===1)throw n=Yo,Lr(t,0),zi(t,e),an(t,vt()),n;if(n===6)throw Error(ie(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,yr(t,tn,di),an(t,vt()),null}function Ff(t,e){var n=qe;qe|=1;try{return t(e)}finally{qe=n,qe===0&&(ks=vt()+500,cc&&or())}}function Br(t){Gi!==null&&Gi.tag===0&&!(qe&6)&&Rs();var e=qe;qe|=1;var n=Rn.transition,i=Ze;try{if(Rn.transition=null,Ze=1,t)return t()}finally{Ze=i,Rn.transition=n,qe=e,!(qe&6)&&or()}}function zf(){fn=ys.current,ot(ys)}function Lr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,$x(n)),yt!==null)for(n=yt.return;n!==null;){var i=n;switch(yf(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&bl();break;case 3:Is(),ot(sn),ot(Vt),Rf();break;case 5:Cf(i);break;case 4:Is();break;case 13:ot(ct);break;case 19:ot(ct);break;case 10:Mf(i.type._context);break;case 22:case 23:zf()}n=n.return}if(Pt=t,yt=t=Ji(t.current,null),Ut=fn=e,St=0,Yo=null,Of=hc=zr=0,tn=Ao=null,Cr!==null){for(e=0;e<Cr.length;e++)if(n=Cr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}n.pending=i}Cr=null}return t}function A_(t,e){do{var n=yt;try{if(Ef(),cl.current=Fl,kl){for(var i=ut.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}kl=!1}if(Fr=0,bt=xt=ut=null,wo=!1,Xo=0,If.current=null,n===null||n.return===null){St=1,Yo=e,yt=null;break}e:{var s=t,o=n.return,a=n,l=e;if(e=Ut,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,u=a,d=u.tag;if(!(u.mode&1)&&(d===0||d===11||d===15)){var h=u.alternate;h?(u.updateQueue=h.updateQueue,u.memoizedState=h.memoizedState,u.lanes=h.lanes):(u.updateQueue=null,u.memoizedState=null)}var p=gp(o);if(p!==null){p.flags&=-257,vp(p,o,a,s,e),p.mode&1&&mp(s,c,e),e=p,l=c;var _=e.updateQueue;if(_===null){var y=new Set;y.add(l),e.updateQueue=y}else _.add(l);break e}else{if(!(e&1)){mp(s,c,e),Bf();break e}l=Error(ie(426))}}else if(at&&a.mode&1){var m=gp(o);if(m!==null){!(m.flags&65536)&&(m.flags|=256),vp(m,o,a,s,e),xf(Os(l,a));break e}}s=l=Os(l,a),St!==4&&(St=2),Ao===null?Ao=[s]:Ao.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var f=c_(s,l,e);cp(s,f);break e;case 1:a=l;var v=s.type,g=s.stateNode;if(!(s.flags&128)&&(typeof v.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(qi===null||!qi.has(g)))){s.flags|=65536,e&=-e,s.lanes|=e;var x=u_(s,a,e);cp(s,x);break e}}s=s.return}while(s!==null)}b_(n)}catch(R){e=R,yt===n&&n!==null&&(yt=n=n.return);continue}break}while(!0)}function C_(){var t=zl.current;return zl.current=Fl,t===null?Fl:t}function Bf(){(St===0||St===3||St===2)&&(St=4),Pt===null||!(zr&268435455)&&!(hc&268435455)||zi(Pt,Ut)}function Gl(t,e){var n=qe;qe|=2;var i=C_();(Pt!==t||Ut!==e)&&(di=null,Lr(t,e));do try{_S();break}catch(r){A_(t,r)}while(!0);if(Ef(),qe=n,zl.current=i,yt!==null)throw Error(ie(261));return Pt=null,Ut=0,St}function _S(){for(;yt!==null;)R_(yt)}function yS(){for(;yt!==null&&!Wy();)R_(yt)}function R_(t){var e=L_(t.alternate,t,fn);t.memoizedProps=t.pendingProps,e===null?b_(t):yt=e,If.current=null}function b_(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=fS(n,e),n!==null){n.flags&=32767,yt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{St=6,yt=null;return}}else if(n=dS(n,e,fn),n!==null){yt=n;return}if(e=e.sibling,e!==null){yt=e;return}yt=e=t}while(e!==null);St===0&&(St=5)}function yr(t,e,n){var i=Ze,r=Rn.transition;try{Rn.transition=null,Ze=1,xS(t,e,n,i)}finally{Rn.transition=r,Ze=i}return null}function xS(t,e,n,i){do Rs();while(Gi!==null);if(qe&6)throw Error(ie(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(ie(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(ex(t,s),t===Pt&&(yt=Pt=null,Ut=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||ba||(ba=!0,D_(Ml,function(){return Rs(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Rn.transition,Rn.transition=null;var o=Ze;Ze=1;var a=qe;qe|=4,If.current=null,pS(t,n),M_(n,t),Bx(dd),Tl=!!ud,dd=ud=null,t.current=n,mS(n),jy(),qe=a,Ze=o,Rn.transition=s}else t.current=n;if(ba&&(ba=!1,Gi=t,Hl=r),s=t.pendingLanes,s===0&&(qi=null),Ky(n.stateNode),an(t,vt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(Bl)throw Bl=!1,t=Ld,Ld=null,t;return Hl&1&&t.tag!==0&&Rs(),s=t.pendingLanes,s&1?t===Dd?Co++:(Co=0,Dd=t):Co=0,or(),null}function Rs(){if(Gi!==null){var t=cv(Hl),e=Rn.transition,n=Ze;try{if(Rn.transition=null,Ze=16>t?16:t,Gi===null)var i=!1;else{if(t=Gi,Gi=null,Hl=0,qe&6)throw Error(ie(331));var r=qe;for(qe|=4,he=t.current;he!==null;){var s=he,o=s.child;if(he.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(he=c;he!==null;){var u=he;switch(u.tag){case 0:case 11:case 15:To(8,u,s)}var d=u.child;if(d!==null)d.return=u,he=d;else for(;he!==null;){u=he;var h=u.sibling,p=u.return;if(x_(u),u===c){he=null;break}if(h!==null){h.return=p,he=h;break}he=p}}}var _=s.alternate;if(_!==null){var y=_.child;if(y!==null){_.child=null;do{var m=y.sibling;y.sibling=null,y=m}while(y!==null)}}he=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,he=o;else e:for(;he!==null;){if(s=he,s.flags&2048)switch(s.tag){case 0:case 11:case 15:To(9,s,s.return)}var f=s.sibling;if(f!==null){f.return=s.return,he=f;break e}he=s.return}}var v=t.current;for(he=v;he!==null;){o=he;var g=o.child;if(o.subtreeFlags&2064&&g!==null)g.return=o,he=g;else e:for(o=v;he!==null;){if(a=he,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:fc(9,a)}}catch(R){pt(a,a.return,R)}if(a===o){he=null;break e}var x=a.sibling;if(x!==null){x.return=a.return,he=x;break e}he=a.return}}if(qe=r,or(),ti&&typeof ti.onPostCommitFiberRoot=="function")try{ti.onPostCommitFiberRoot(rc,t)}catch{}i=!0}return i}finally{Ze=n,Rn.transition=e}}return!1}function Pp(t,e,n){e=Os(n,e),e=c_(t,e,1),t=Yi(t,e,1),e=Jt(),t!==null&&(ta(t,1,e),an(t,e))}function pt(t,e,n){if(t.tag===3)Pp(t,t,n);else for(;e!==null;){if(e.tag===3){Pp(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(qi===null||!qi.has(i))){t=Os(n,t),t=u_(e,t,1),e=Yi(e,t,1),t=Jt(),e!==null&&(ta(e,1,t),an(e,t));break}}e=e.return}}function SS(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=Jt(),t.pingedLanes|=t.suspendedLanes&n,Pt===t&&(Ut&n)===n&&(St===4||St===3&&(Ut&130023424)===Ut&&500>vt()-kf?Lr(t,0):Of|=n),an(t,e)}function P_(t,e){e===0&&(t.mode&1?(e=ya,ya<<=1,!(ya&130023424)&&(ya=4194304)):e=1);var n=Jt();t=wi(t,e),t!==null&&(ta(t,e,n),an(t,n))}function ES(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),P_(t,n)}function MS(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(ie(314))}i!==null&&i.delete(e),P_(t,n)}var L_;L_=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||sn.current)nn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return nn=!1,uS(t,e,n);nn=!!(t.flags&131072)}else nn=!1,at&&e.flags&1048576&&Iv(e,Dl,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;dl(t,e),t=e.pendingProps;var r=Ds(e,Vt.current);Cs(e,n),r=Pf(null,e,i,t,r,n);var s=Lf();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,on(i)?(s=!0,Pl(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Tf(e),r.updater=dc,e.stateNode=r,r._reactInternals=e,xd(e,i,t,n),e=Md(null,e,i,!0,s,n)):(e.tag=0,at&&s&&_f(e),Yt(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(dl(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=TS(i),t=On(i,t),r){case 0:e=Ed(null,e,i,t,n);break e;case 1:e=xp(null,e,i,t,n);break e;case 11:e=_p(null,e,i,t,n);break e;case 14:e=yp(null,e,i,On(i.type,t),n);break e}throw Error(ie(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:On(i,r),Ed(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:On(i,r),xp(t,e,i,r,n);case 3:e:{if(p_(e),t===null)throw Error(ie(387));i=e.pendingProps,s=e.memoizedState,r=s.element,Hv(t,e),Il(e,i,null,n);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=Os(Error(ie(423)),e),e=Sp(t,e,i,n,r);break e}else if(i!==r){r=Os(Error(ie(424)),e),e=Sp(t,e,i,n,r);break e}else for(hn=Ki(e.stateNode.containerInfo.firstChild),pn=e,at=!0,Fn=null,n=zv(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Ns(),i===r){e=Ti(t,e,n);break e}Yt(t,e,i,n)}e=e.child}return e;case 5:return Gv(e),t===null&&vd(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,o=r.children,fd(i,r)?o=null:s!==null&&fd(i,s)&&(e.flags|=32),h_(t,e),Yt(t,e,o,n),e.child;case 6:return t===null&&vd(e),null;case 13:return m_(t,e,n);case 4:return Af(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Us(e,null,i,n):Yt(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:On(i,r),_p(t,e,i,r,n);case 7:return Yt(t,e,e.pendingProps,n),e.child;case 8:return Yt(t,e,e.pendingProps.children,n),e.child;case 12:return Yt(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,nt(Nl,i._currentValue),i._currentValue=o,s!==null)if(Xn(s.value,o)){if(s.children===r.children&&!sn.current){e=Ti(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=vi(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var u=c.pending;u===null?l.next=l:(l.next=u.next,u.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),_d(s.return,n,e),a.lanes|=n;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(ie(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),_d(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}Yt(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,Cs(e,n),r=bn(r),i=i(r),e.flags|=1,Yt(t,e,i,n),e.child;case 14:return i=e.type,r=On(i,e.pendingProps),r=On(i.type,r),yp(t,e,i,r,n);case 15:return d_(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:On(i,r),dl(t,e),e.tag=1,on(i)?(t=!0,Pl(e)):t=!1,Cs(e,n),l_(e,i,r),xd(e,i,r,n),Md(null,e,i,!0,t,n);case 19:return g_(t,e,n);case 22:return f_(t,e,n)}throw Error(ie(156,e.tag))};function D_(t,e){return sv(t,e)}function wS(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Cn(t,e,n,i){return new wS(t,e,n,i)}function Hf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function TS(t){if(typeof t=="function")return Hf(t)?1:0;if(t!=null){if(t=t.$$typeof,t===of)return 11;if(t===af)return 14}return 2}function Ji(t,e){var n=t.alternate;return n===null?(n=Cn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function pl(t,e,n,i,r,s){var o=2;if(i=t,typeof t=="function")Hf(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case cs:return Dr(n.children,r,s,e);case sf:o=8,r|=8;break;case Wu:return t=Cn(12,n,e,r|2),t.elementType=Wu,t.lanes=s,t;case ju:return t=Cn(13,n,e,r),t.elementType=ju,t.lanes=s,t;case Xu:return t=Cn(19,n,e,r),t.elementType=Xu,t.lanes=s,t;case Gg:return pc(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Bg:o=10;break e;case Hg:o=9;break e;case of:o=11;break e;case af:o=14;break e;case Oi:o=16,i=null;break e}throw Error(ie(130,t==null?t:typeof t,""))}return e=Cn(o,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function Dr(t,e,n,i){return t=Cn(7,t,i,e),t.lanes=n,t}function pc(t,e,n,i){return t=Cn(22,t,i,e),t.elementType=Gg,t.lanes=n,t.stateNode={isHidden:!1},t}function ru(t,e,n){return t=Cn(6,t,null,e),t.lanes=n,t}function su(t,e,n){return e=Cn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function AS(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=zc(0),this.expirationTimes=zc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=zc(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Gf(t,e,n,i,r,s,o,a,l){return t=new AS(t,e,n,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Cn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Tf(s),t}function CS(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ls,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function N_(t){if(!t)return nr;t=t._reactInternals;e:{if(Gr(t)!==t||t.tag!==1)throw Error(ie(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(on(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(ie(171))}if(t.tag===1){var n=t.type;if(on(n))return Nv(t,n,e)}return e}function U_(t,e,n,i,r,s,o,a,l){return t=Gf(n,i,!0,t,r,s,o,a,l),t.context=N_(null),n=t.current,i=Jt(),r=Zi(n),s=vi(i,r),s.callback=e??null,Yi(n,s,r),t.current.lanes=r,ta(t,r,i),an(t,i),t}function mc(t,e,n,i){var r=e.current,s=Jt(),o=Zi(r);return n=N_(n),e.context===null?e.context=n:e.pendingContext=n,e=vi(s,o),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=Yi(r,e,o),t!==null&&(Wn(t,r,o,s),ll(t,r,o)),o}function Vl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Lp(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Vf(t,e){Lp(t,e),(t=t.alternate)&&Lp(t,e)}function RS(){return null}var I_=typeof reportError=="function"?reportError:function(t){console.error(t)};function Wf(t){this._internalRoot=t}gc.prototype.render=Wf.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(ie(409));mc(t,e,null,null)};gc.prototype.unmount=Wf.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Br(function(){mc(null,t,null,null)}),e[Mi]=null}};function gc(t){this._internalRoot=t}gc.prototype.unstable_scheduleHydration=function(t){if(t){var e=fv();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Fi.length&&e!==0&&e<Fi[n].priority;n++);Fi.splice(n,0,t),n===0&&pv(t)}};function jf(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function vc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Dp(){}function bS(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=Vl(o);s.call(c)}}var o=U_(e,i,t,0,null,!1,!1,"",Dp);return t._reactRootContainer=o,t[Mi]=o.current,Ho(t.nodeType===8?t.parentNode:t),Br(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var c=Vl(l);a.call(c)}}var l=Gf(t,0,!1,null,null,!1,!1,"",Dp);return t._reactRootContainer=l,t[Mi]=l.current,Ho(t.nodeType===8?t.parentNode:t),Br(function(){mc(e,l,n,i)}),l}function _c(t,e,n,i,r){var s=n._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=Vl(o);a.call(l)}}mc(e,o,t,r)}else o=bS(n,e,t,r,i);return Vl(o)}uv=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=go(e.pendingLanes);n!==0&&(uf(e,n|1),an(e,vt()),!(qe&6)&&(ks=vt()+500,or()))}break;case 13:Br(function(){var i=wi(t,1);if(i!==null){var r=Jt();Wn(i,t,1,r)}}),Vf(t,1)}};df=function(t){if(t.tag===13){var e=wi(t,134217728);if(e!==null){var n=Jt();Wn(e,t,134217728,n)}Vf(t,134217728)}};dv=function(t){if(t.tag===13){var e=Zi(t),n=wi(t,e);if(n!==null){var i=Jt();Wn(n,t,e,i)}Vf(t,e)}};fv=function(){return Ze};hv=function(t,e){var n=Ze;try{return Ze=t,e()}finally{Ze=n}};nd=function(t,e,n){switch(e){case"input":if(Yu(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=lc(i);if(!r)throw Error(ie(90));Wg(i),Yu(i,r)}}}break;case"textarea":Xg(t,n);break;case"select":e=n.value,e!=null&&Ms(t,!!n.multiple,e,!1)}};Qg=Ff;ev=Br;var PS={usingClientEntryPoint:!1,Events:[ia,hs,lc,Zg,Jg,Ff]},so={findFiberByHostInstance:Ar,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},LS={bundleType:so.bundleType,version:so.version,rendererPackageName:so.rendererPackageName,rendererConfig:so.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ri.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=iv(t),t===null?null:t.stateNode},findFiberByHostInstance:so.findFiberByHostInstance||RS,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Pa=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Pa.isDisabled&&Pa.supportsFiber)try{rc=Pa.inject(LS),ti=Pa}catch{}}_n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=PS;_n.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!jf(e))throw Error(ie(200));return CS(t,e,null,n)};_n.createRoot=function(t,e){if(!jf(t))throw Error(ie(299));var n=!1,i="",r=I_;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=Gf(t,1,!1,null,null,n,!1,i,r),t[Mi]=e.current,Ho(t.nodeType===8?t.parentNode:t),new Wf(e)};_n.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(ie(188)):(t=Object.keys(t).join(","),Error(ie(268,t)));return t=iv(e),t=t===null?null:t.stateNode,t};_n.flushSync=function(t){return Br(t)};_n.hydrate=function(t,e,n){if(!vc(e))throw Error(ie(200));return _c(null,t,e,!0,n)};_n.hydrateRoot=function(t,e,n){if(!jf(t))throw Error(ie(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",o=I_;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=U_(e,null,t,1,n??null,r,!1,s,o),t[Mi]=e.current,Ho(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new gc(e)};_n.render=function(t,e,n){if(!vc(e))throw Error(ie(200));return _c(null,t,e,!1,n)};_n.unmountComponentAtNode=function(t){if(!vc(t))throw Error(ie(40));return t._reactRootContainer?(Br(function(){_c(null,null,t,!1,function(){t._reactRootContainer=null,t[Mi]=null})}),!0):!1};_n.unstable_batchedUpdates=Ff;_n.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!vc(n))throw Error(ie(200));if(t==null||t._reactInternals===void 0)throw Error(ie(38));return _c(t,e,n,!1,i)};_n.version="18.3.1-next-f1338f8080-20240426";function O_(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(O_)}catch(t){console.error(t)}}O_(),Og.exports=_n;var DS=Og.exports,Np=DS;Gu.createRoot=Np.createRoot,Gu.hydrateRoot=Np.hydrateRoot;var Id=function(t,e){return Id=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(n[r]=i[r])},Id(t,e)};function NS(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");Id(t,e);function n(){this.constructor=t}t.prototype=e===null?Object.create(e):(n.prototype=e.prototype,new n)}var Rt=function(){return Rt=Object.assign||function(e){for(var n,i=1,r=arguments.length;i<r;i++){n=arguments[i];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(e[s]=n[s])}return e},Rt.apply(this,arguments)};function Up(t,e){var n={};for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&e.indexOf(i)<0&&(n[i]=t[i]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,i=Object.getOwnPropertySymbols(t);r<i.length;r++)e.indexOf(i[r])<0&&Object.prototype.propertyIsEnumerable.call(t,i[r])&&(n[i[r]]=t[i[r]]);return n}function dr(t,e,n,i){function r(s){return s instanceof n?s:new n(function(o){o(s)})}return new(n||(n=Promise))(function(s,o){function a(u){try{c(i.next(u))}catch(d){o(d)}}function l(u){try{c(i.throw(u))}catch(d){o(d)}}function c(u){u.done?s(u.value):r(u.value).then(a,l)}c((i=i.apply(t,e||[])).next())})}function fr(t,e){var n={label:0,sent:function(){if(s[0]&1)throw s[1];return s[1]},trys:[],ops:[]},i,r,s,o=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return o.next=a(0),o.throw=a(1),o.return=a(2),typeof Symbol=="function"&&(o[Symbol.iterator]=function(){return this}),o;function a(c){return function(u){return l([c,u])}}function l(c){if(i)throw new TypeError("Generator is already executing.");for(;o&&(o=0,c[0]&&(n=0)),n;)try{if(i=1,r&&(s=c[0]&2?r.return:c[0]?r.throw||((s=r.return)&&s.call(r),0):r.next)&&!(s=s.call(r,c[1])).done)return s;switch(r=0,s&&(c=[c[0]&2,s.value]),c[0]){case 0:case 1:s=c;break;case 4:return n.label++,{value:c[1],done:!1};case 5:n.label++,r=c[1],c=[0];continue;case 7:c=n.ops.pop(),n.trys.pop();continue;default:if(s=n.trys,!(s=s.length>0&&s[s.length-1])&&(c[0]===6||c[0]===2)){n=0;continue}if(c[0]===3&&(!s||c[1]>s[0]&&c[1]<s[3])){n.label=c[1];break}if(c[0]===6&&n.label<s[1]){n.label=s[1],s=c;break}if(s&&n.label<s[2]){n.label=s[2],n.ops.push(c);break}s[2]&&n.ops.pop(),n.trys.pop();continue}c=e.call(t,n)}catch(u){c=[6,u],r=0}finally{i=s=0}if(c[0]&5)throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}}function US(t,e,n){for(var i=0,r=e.length,s;i<r;i++)(s||!(i in e))&&(s||(s=Array.prototype.slice.call(e,0,i)),s[i]=e[i]);return t.concat(s||Array.prototype.slice.call(e))}function Zn(t,e){var n={};for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&e.indexOf(i)<0&&(n[i]=t[i]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function"){var r=0;for(i=Object.getOwnPropertySymbols(t);r<i.length;r++)e.indexOf(i[r])<0&&Object.prototype.propertyIsEnumerable.call(t,i[r])&&(n[i[r]]=t[i[r]])}return n}var Mr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Xf(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function $f(t,e){return t(e={exports:{}},e.exports),e.exports}var xr=$f(function(t,e){Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function i(){var r=this;this.locked=new Map,this.addToLocked=function(s,o){var a=r.locked.get(s);a===void 0?o===void 0?r.locked.set(s,[]):r.locked.set(s,[o]):o!==void 0&&(a.unshift(o),r.locked.set(s,a))},this.isLocked=function(s){return r.locked.has(s)},this.lock=function(s){return new Promise(function(o,a){r.isLocked(s)?r.addToLocked(s,o):(r.addToLocked(s),o())})},this.unlock=function(s){var o=r.locked.get(s);if(o!==void 0&&o.length!==0){var a=o.pop();r.locked.set(s,o),a!==void 0&&setTimeout(a,0)}else r.locked.delete(s)}}return i.getInstance=function(){return i.instance===void 0&&(i.instance=new i),i.instance},i}();e.default=function(){return n.getInstance()}});Xf(xr);var IS=Xf($f(function(t,e){var n=Mr&&Mr.__awaiter||function(u,d,h,p){return new(h||(h=Promise))(function(_,y){function m(g){try{v(p.next(g))}catch(x){y(x)}}function f(g){try{v(p.throw(g))}catch(x){y(x)}}function v(g){g.done?_(g.value):new h(function(x){x(g.value)}).then(m,f)}v((p=p.apply(u,d||[])).next())})},i=Mr&&Mr.__generator||function(u,d){var h,p,_,y,m={label:0,sent:function(){if(1&_[0])throw _[1];return _[1]},trys:[],ops:[]};return y={next:f(0),throw:f(1),return:f(2)},typeof Symbol=="function"&&(y[Symbol.iterator]=function(){return this}),y;function f(v){return function(g){return function(x){if(h)throw new TypeError("Generator is already executing.");for(;m;)try{if(h=1,p&&(_=2&x[0]?p.return:x[0]?p.throw||((_=p.return)&&_.call(p),0):p.next)&&!(_=_.call(p,x[1])).done)return _;switch(p=0,_&&(x=[2&x[0],_.value]),x[0]){case 0:case 1:_=x;break;case 4:return m.label++,{value:x[1],done:!1};case 5:m.label++,p=x[1],x=[0];continue;case 7:x=m.ops.pop(),m.trys.pop();continue;default:if(_=m.trys,!((_=_.length>0&&_[_.length-1])||x[0]!==6&&x[0]!==2)){m=0;continue}if(x[0]===3&&(!_||x[1]>_[0]&&x[1]<_[3])){m.label=x[1];break}if(x[0]===6&&m.label<_[1]){m.label=_[1],_=x;break}if(_&&m.label<_[2]){m.label=_[2],m.ops.push(x);break}_[2]&&m.ops.pop(),m.trys.pop();continue}x=d.call(u,m)}catch(R){x=[6,R],p=0}finally{h=_=0}if(5&x[0])throw x[1];return{value:x[0]?x[1]:void 0,done:!0}}([v,g])}}},r=Mr;Object.defineProperty(e,"__esModule",{value:!0});var s="browser-tabs-lock-key",o={key:function(u){return n(r,void 0,void 0,function(){return i(this,function(d){throw new Error("Unsupported")})})},getItem:function(u){return n(r,void 0,void 0,function(){return i(this,function(d){throw new Error("Unsupported")})})},clear:function(){return n(r,void 0,void 0,function(){return i(this,function(u){return[2,window.localStorage.clear()]})})},removeItem:function(u){return n(r,void 0,void 0,function(){return i(this,function(d){throw new Error("Unsupported")})})},setItem:function(u,d){return n(r,void 0,void 0,function(){return i(this,function(h){throw new Error("Unsupported")})})},keySync:function(u){return window.localStorage.key(u)},getItemSync:function(u){return window.localStorage.getItem(u)},clearSync:function(){return window.localStorage.clear()},removeItemSync:function(u){return window.localStorage.removeItem(u)},setItemSync:function(u,d){return window.localStorage.setItem(u,d)}};function a(u){return new Promise(function(d){return setTimeout(d,u)})}function l(u){for(var d="0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",h="",p=0;p<u;p++)h+=d[Math.floor(Math.random()*d.length)];return h}var c=function(){function u(d){this.acquiredIatSet=new Set,this.storageHandler=void 0,this.id=Date.now().toString()+l(15),this.acquireLock=this.acquireLock.bind(this),this.releaseLock=this.releaseLock.bind(this),this.releaseLock__private__=this.releaseLock__private__.bind(this),this.waitForSomethingToChange=this.waitForSomethingToChange.bind(this),this.refreshLockWhileAcquired=this.refreshLockWhileAcquired.bind(this),this.storageHandler=d,u.waiters===void 0&&(u.waiters=[])}return u.prototype.acquireLock=function(d,h){return h===void 0&&(h=5e3),n(this,void 0,void 0,function(){var p,_,y,m,f,v,g;return i(this,function(x){switch(x.label){case 0:p=Date.now()+l(4),_=Date.now()+h,y=s+"-"+d,m=this.storageHandler===void 0?o:this.storageHandler,x.label=1;case 1:return Date.now()<_?[4,a(30)]:[3,8];case 2:return x.sent(),m.getItemSync(y)!==null?[3,5]:(f=this.id+"-"+d+"-"+p,[4,a(Math.floor(25*Math.random()))]);case 3:return x.sent(),m.setItemSync(y,JSON.stringify({id:this.id,iat:p,timeoutKey:f,timeAcquired:Date.now(),timeRefreshed:Date.now()})),[4,a(30)];case 4:return x.sent(),(v=m.getItemSync(y))!==null&&(g=JSON.parse(v)).id===this.id&&g.iat===p?(this.acquiredIatSet.add(p),this.refreshLockWhileAcquired(y,p),[2,!0]):[3,7];case 5:return u.lockCorrector(this.storageHandler===void 0?o:this.storageHandler),[4,this.waitForSomethingToChange(_)];case 6:x.sent(),x.label=7;case 7:return p=Date.now()+l(4),[3,1];case 8:return[2,!1]}})})},u.prototype.refreshLockWhileAcquired=function(d,h){return n(this,void 0,void 0,function(){var p=this;return i(this,function(_){return setTimeout(function(){return n(p,void 0,void 0,function(){var y,m,f;return i(this,function(v){switch(v.label){case 0:return[4,xr.default().lock(h)];case 1:return v.sent(),this.acquiredIatSet.has(h)?(y=this.storageHandler===void 0?o:this.storageHandler,(m=y.getItemSync(d))===null?(xr.default().unlock(h),[2]):((f=JSON.parse(m)).timeRefreshed=Date.now(),y.setItemSync(d,JSON.stringify(f)),xr.default().unlock(h),this.refreshLockWhileAcquired(d,h),[2])):(xr.default().unlock(h),[2])}})})},1e3),[2]})})},u.prototype.waitForSomethingToChange=function(d){return n(this,void 0,void 0,function(){return i(this,function(h){switch(h.label){case 0:return[4,new Promise(function(p){var _=!1,y=Date.now(),m=!1;function f(){if(m||(window.removeEventListener("storage",f),u.removeFromWaiting(f),clearTimeout(v),m=!0),!_){_=!0;var g=50-(Date.now()-y);g>0?setTimeout(p,g):p(null)}}window.addEventListener("storage",f),u.addToWaiting(f);var v=setTimeout(f,Math.max(0,d-Date.now()))})];case 1:return h.sent(),[2]}})})},u.addToWaiting=function(d){this.removeFromWaiting(d),u.waiters!==void 0&&u.waiters.push(d)},u.removeFromWaiting=function(d){u.waiters!==void 0&&(u.waiters=u.waiters.filter(function(h){return h!==d}))},u.notifyWaiters=function(){u.waiters!==void 0&&u.waiters.slice().forEach(function(d){return d()})},u.prototype.releaseLock=function(d){return n(this,void 0,void 0,function(){return i(this,function(h){switch(h.label){case 0:return[4,this.releaseLock__private__(d)];case 1:return[2,h.sent()]}})})},u.prototype.releaseLock__private__=function(d){return n(this,void 0,void 0,function(){var h,p,_,y;return i(this,function(m){switch(m.label){case 0:return h=this.storageHandler===void 0?o:this.storageHandler,p=s+"-"+d,(_=h.getItemSync(p))===null?[2]:(y=JSON.parse(_)).id!==this.id?[3,2]:[4,xr.default().lock(y.iat)];case 1:m.sent(),this.acquiredIatSet.delete(y.iat),h.removeItemSync(p),xr.default().unlock(y.iat),u.notifyWaiters(),m.label=2;case 2:return[2]}})})},u.lockCorrector=function(d){for(var h=Date.now()-5e3,p=d,_=[],y=0;;){var m=p.keySync(y);if(m===null)break;_.push(m),y++}for(var f=!1,v=0;v<_.length;v++){var g=_[v];if(g.includes(s)){var x=p.getItemSync(g);if(x!==null){var R=JSON.parse(x);(R.timeRefreshed===void 0&&R.timeAcquired<h||R.timeRefreshed!==void 0&&R.timeRefreshed<h)&&(p.removeItemSync(g),f=!0)}}}f&&u.notifyWaiters()},u.waiters=void 0,u}();e.default=c}));const OS={timeoutInSeconds:60},k_={name:"auth0-spa-js",version:"2.11.0"},F_=()=>Date.now();class mt extends Error{constructor(e,n){super(n),this.error=e,this.error_description=n,Object.setPrototypeOf(this,mt.prototype)}static fromPayload({error:e,error_description:n}){return new mt(e,n)}}class Kf extends mt{constructor(e,n,i,r=null){super(e,n),this.state=i,this.appState=r,Object.setPrototypeOf(this,Kf.prototype)}}class Yf extends mt{constructor(e,n,i,r,s=null){super(e,n),this.connection=i,this.state=r,this.appState=s,Object.setPrototypeOf(this,Yf.prototype)}}class qo extends mt{constructor(){super("timeout","Timeout"),Object.setPrototypeOf(this,qo.prototype)}}class qf extends qo{constructor(e){super(),this.popup=e,Object.setPrototypeOf(this,qf.prototype)}}class Zf extends mt{constructor(e){super("cancelled","Popup closed"),this.popup=e,Object.setPrototypeOf(this,Zf.prototype)}}class Jf extends mt{constructor(){super("popup_open","Unable to open a popup for loginWithPopup - window.open returned `null`"),Object.setPrototypeOf(this,Jf.prototype)}}class Qf extends mt{constructor(e,n,i){super(e,n),this.mfa_token=i,Object.setPrototypeOf(this,Qf.prototype)}}class yc extends mt{constructor(e,n){super("missing_refresh_token",`Missing Refresh Token (audience: '${Wl(e,["default"])}', scope: '${Wl(n)}')`),this.audience=e,this.scope=n,Object.setPrototypeOf(this,yc.prototype)}}class eh extends mt{constructor(e,n){super("missing_scopes",`Missing requested scopes after refresh (audience: '${Wl(e,["default"])}', missing scope: '${Wl(n)}')`),this.audience=e,this.scope=n,Object.setPrototypeOf(this,eh.prototype)}}class xc extends mt{constructor(e){super("use_dpop_nonce","Server rejected DPoP proof: wrong nonce"),this.newDpopNonce=e,Object.setPrototypeOf(this,xc.prototype)}}function Wl(t,e=[]){return t&&!e.includes(t)?t:""}const jl=()=>window.crypto,oo=()=>{const t="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_~.";let e="";return Array.from(jl().getRandomValues(new Uint8Array(43))).forEach(n=>e+=t[n%t.length]),e},ou=t=>btoa(t),kS=[{key:"name",type:["string"]},{key:"version",type:["string","number"]},{key:"env",type:["object"]}],FS=t=>Object.keys(t).reduce((e,n)=>{const i=kS.find(r=>r.key===n);return i&&i.type.includes(typeof t[n])&&(e[n]=t[n]),e},{}),Od=t=>{var{clientId:e}=t,n=Zn(t,["clientId"]);return new URLSearchParams((i=>Object.keys(i).filter(r=>i[r]!==void 0).reduce((r,s)=>Object.assign(Object.assign({},r),{[s]:i[s]}),{}))(Object.assign({client_id:e},n))).toString()},Ip=async t=>await jl().subtle.digest({name:"SHA-256"},new TextEncoder().encode(t)),Op=t=>(e=>decodeURIComponent(atob(e).split("").map(n=>"%"+("00"+n.charCodeAt(0).toString(16)).slice(-2)).join("")))(t.replace(/_/g,"/").replace(/-/g,"+")),kp=t=>{const e=new Uint8Array(t);return(n=>{const i={"+":"-","/":"_","=":""};return n.replace(/[+/=]/g,r=>i[r])})(window.btoa(String.fromCharCode(...Array.from(e))))},zS=new TextEncoder,BS=new TextDecoder;function Ro(t){return typeof t=="string"?zS.encode(t):BS.decode(t)}function Fp(t){if(typeof t.modulusLength!="number"||t.modulusLength<2048)throw new GS(`${t.name} modulusLength must be at least 2048 bits`)}async function HS(t,e,n){if(n.usages.includes("sign")===!1)throw new TypeError('private CryptoKey instances used for signing assertions must include "sign" in their "usages"');const i=`${bo(Ro(JSON.stringify(t)))}.${bo(Ro(JSON.stringify(e)))}`;return`${i}.${bo(await crypto.subtle.sign(function(r){switch(r.algorithm.name){case"ECDSA":return{name:r.algorithm.name,hash:"SHA-256"};case"RSA-PSS":return Fp(r.algorithm),{name:r.algorithm.name,saltLength:32};case"RSASSA-PKCS1-v1_5":return Fp(r.algorithm),{name:r.algorithm.name};case"Ed25519":return{name:r.algorithm.name}}throw new br}(n),n,Ro(i)))}`}let kd;Uint8Array.prototype.toBase64?kd=t=>(t instanceof ArrayBuffer&&(t=new Uint8Array(t)),t.toBase64({alphabet:"base64url",omitPadding:!0})):kd=e=>{e instanceof ArrayBuffer&&(e=new Uint8Array(e));const n=[];for(let i=0;i<e.byteLength;i+=32768)n.push(String.fromCharCode.apply(null,e.subarray(i,i+32768)));return btoa(n.join("")).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")};function bo(t){return kd(t)}class br extends Error{constructor(e){var n;super(e??"operation not supported"),this.name=this.constructor.name,(n=Error.captureStackTrace)===null||n===void 0||n.call(Error,this,this.constructor)}}class GS extends Error{constructor(e){var n;super(e),this.name=this.constructor.name,(n=Error.captureStackTrace)===null||n===void 0||n.call(Error,this,this.constructor)}}function VS(t){switch(t.algorithm.name){case"RSA-PSS":return function(e){if(e.algorithm.hash.name==="SHA-256")return"PS256";throw new br("unsupported RsaHashedKeyAlgorithm hash name")}(t);case"RSASSA-PKCS1-v1_5":return function(e){if(e.algorithm.hash.name==="SHA-256")return"RS256";throw new br("unsupported RsaHashedKeyAlgorithm hash name")}(t);case"ECDSA":return function(e){if(e.algorithm.namedCurve==="P-256")return"ES256";throw new br("unsupported EcKeyAlgorithm namedCurve")}(t);case"Ed25519":return"Ed25519";default:throw new br("unsupported CryptoKey algorithm name")}}function z_(t){return t instanceof CryptoKey}function B_(t){return z_(t)&&t.type==="public"}async function WS(t,e,n,i,r,s){const o=t==null?void 0:t.privateKey,a=t==null?void 0:t.publicKey;if(!z_(l=o)||l.type!=="private")throw new TypeError('"keypair.privateKey" must be a private CryptoKey');var l;if(!B_(a))throw new TypeError('"keypair.publicKey" must be a public CryptoKey');if(a.extractable!==!0)throw new TypeError('"keypair.publicKey.extractable" must be true');if(typeof e!="string")throw new TypeError('"htu" must be a string');if(typeof n!="string")throw new TypeError('"htm" must be a string');if(i!==void 0&&typeof i!="string")throw new TypeError('"nonce" must be a string or undefined');if(r!==void 0&&typeof r!="string")throw new TypeError('"accessToken" must be a string or undefined');return HS({alg:VS(o),typ:"dpop+jwt",jwk:await H_(a)},Object.assign(Object.assign({},s),{iat:Math.floor(Date.now()/1e3),jti:crypto.randomUUID(),htm:n,nonce:i,htu:e,ath:r?bo(await crypto.subtle.digest("SHA-256",Ro(r))):void 0}),o)}async function H_(t){const{kty:e,e:n,n:i,x:r,y:s,crv:o}=await crypto.subtle.exportKey("jwk",t);return{kty:e,crv:o,e:n,n:i,x:r,y:s}}const jS=["authorization_code","refresh_token","urn:ietf:params:oauth:grant-type:token-exchange"];function XS(){return async function(t,e){var n;let i;if(t.length===0)throw new TypeError('"alg" must be a non-empty string');switch(t){case"PS256":i={name:"RSA-PSS",hash:"SHA-256",modulusLength:2048,publicExponent:new Uint8Array([1,0,1])};break;case"RS256":i={name:"RSASSA-PKCS1-v1_5",hash:"SHA-256",modulusLength:2048,publicExponent:new Uint8Array([1,0,1])};break;case"ES256":i={name:"ECDSA",namedCurve:"P-256"};break;case"Ed25519":i={name:"Ed25519"};break;default:throw new br}return crypto.subtle.generateKey(i,(n=e==null?void 0:e.extractable)!==null&&n!==void 0&&n,["sign","verify"])}("ES256",{extractable:!1})}function $S(t){return async function(e){if(!B_(e))throw new TypeError('"publicKey" must be a public CryptoKey');if(e.extractable!==!0)throw new TypeError('"publicKey.extractable" must be true');const n=await H_(e);let i;switch(n.kty){case"EC":i={crv:n.crv,kty:n.kty,x:n.x,y:n.y};break;case"OKP":i={crv:n.crv,kty:n.kty,x:n.x};break;case"RSA":i={e:n.e,kty:n.kty,n:n.n};break;default:throw new br("unsupported JWK kty")}return bo(await crypto.subtle.digest({name:"SHA-256"},Ro(JSON.stringify(i))))}(t.publicKey)}function KS({keyPair:t,url:e,method:n,nonce:i,accessToken:r}){const s=function(o){const a=new URL(o);return a.search="",a.hash="",a.href}(e);return WS(t,s,n,i,r)}const YS=async(t,e)=>{const n=await fetch(t,e);return{ok:n.ok,json:await n.json(),headers:(i=n.headers,[...i].reduce((r,[s,o])=>(r[s]=o,r),{}))};var i},qS=async(t,e,n)=>{const i=new AbortController;let r;return e.signal=i.signal,Promise.race([YS(t,e),new Promise((s,o)=>{r=setTimeout(()=>{i.abort(),o(new Error("Timeout when executing 'fetch'"))},n)})]).finally(()=>{clearTimeout(r)})},ZS=async(t,e,n,i,r,s,o,a)=>{return l={auth:{audience:e,scope:n},timeout:r,fetchUrl:t,fetchOptions:i,useFormData:o,useMrrt:a},c=s,new Promise(function(u,d){const h=new MessageChannel;h.port1.onmessage=function(p){p.data.error?d(new Error(p.data.error)):u(p.data),h.port1.close()},c.postMessage(l,[h.port2])});var l,c},JS=async(t,e,n,i,r,s,o=1e4,a)=>r?ZS(t,e,n,i,o,r,s,a):qS(t,i,o);async function G_(t,e,n,i,r,s,o,a,l,c){if(l){const g=await l.generateProof({url:t,method:r.method||"GET",nonce:await l.getNonce()});r.headers=Object.assign(Object.assign({},r.headers),{dpop:g})}let u,d=null;for(let g=0;g<3;g++)try{u=await JS(t,n,i,r,s,o,e,a),d=null;break}catch(x){d=x}if(d)throw d;const h=u.json,{error:p,error_description:_}=h,y=Zn(h,["error","error_description"]),{headers:m,ok:f}=u;let v;if(l&&(v=m["dpop-nonce"],v&&await l.setNonce(v)),!f){const g=_||`HTTP error. Unable to fetch ${t}`;if(p==="mfa_required")throw new Qf(p,g,y.mfa_token);if(p==="missing_refresh_token")throw new yc(n,i);if(p==="use_dpop_nonce"){if(!l||!v||c)throw new xc(v);return G_(t,e,n,i,r,s,o,a,l,!0)}throw new mt(p||"request_error",g)}return y}async function QS(t,e){var{baseUrl:n,timeout:i,audience:r,scope:s,auth0Client:o,useFormData:a,useMrrt:l,dpop:c}=t,u=Zn(t,["baseUrl","timeout","audience","scope","auth0Client","useFormData","useMrrt","dpop"]);const d=u.grant_type==="urn:ietf:params:oauth:grant-type:token-exchange",h=u.grant_type==="refresh_token"&&l,p=Object.assign(Object.assign(Object.assign(Object.assign({},u),d&&r&&{audience:r}),d&&s&&{scope:s}),h&&{audience:r,scope:s}),_=a?Od(p):JSON.stringify(p),y=(m=u.grant_type,jS.includes(m));var m;return await G_(`${n}/oauth/token`,i,r||"default",s,{method:"POST",body:_,headers:{"Content-Type":a?"application/x-www-form-urlencoded":"application/json","Auth0-Client":btoa(JSON.stringify(FS(o||k_)))}},e,a,l,y?c:void 0)}const ml=(...t)=>{return(e=t.filter(Boolean).join(" ").trim().split(/\s+/),Array.from(new Set(e))).join(" ");var e},La=(t,e,n)=>{let i;return n&&(i=t[n]),i||(i=t.default),ml(i,e)};class Tn{constructor(e,n="@@auth0spajs@@",i){this.prefix=n,this.suffix=i,this.clientId=e.clientId,this.scope=e.scope,this.audience=e.audience}toKey(){return[this.prefix,this.clientId,this.audience,this.scope,this.suffix].filter(Boolean).join("::")}static fromKey(e){const[n,i,r,s]=e.split("::");return new Tn({clientId:i,scope:s,audience:r},n)}static fromCacheEntry(e){const{scope:n,audience:i,client_id:r}=e;return new Tn({scope:n,audience:i,clientId:r})}}class eE{set(e,n){localStorage.setItem(e,JSON.stringify(n))}get(e){const n=window.localStorage.getItem(e);if(n)try{return JSON.parse(n)}catch{return}}remove(e){localStorage.removeItem(e)}allKeys(){return Object.keys(window.localStorage).filter(e=>e.startsWith("@@auth0spajs@@"))}}class V_{constructor(){this.enclosedCache=function(){let e={};return{set(n,i){e[n]=i},get(n){const i=e[n];if(i)return i},remove(n){delete e[n]},allKeys:()=>Object.keys(e)}}()}}class tE{constructor(e,n,i){this.cache=e,this.keyManifest=n,this.nowProvider=i||F_}async setIdToken(e,n,i){var r;const s=this.getIdTokenCacheKey(e);await this.cache.set(s,{id_token:n,decodedToken:i}),await((r=this.keyManifest)===null||r===void 0?void 0:r.add(s))}async getIdToken(e){const n=await this.cache.get(this.getIdTokenCacheKey(e.clientId));if(!n&&e.scope&&e.audience){const i=await this.get(e);return!i||!i.id_token||!i.decodedToken?void 0:{id_token:i.id_token,decodedToken:i.decodedToken}}if(n)return{id_token:n.id_token,decodedToken:n.decodedToken}}async get(e,n=0,i=!1,r){var s;let o=await this.cache.get(e.toKey());if(!o){const c=await this.getCacheKeys();if(!c)return;const u=this.matchExistingCacheKey(e,c);if(u&&(o=await this.cache.get(u)),!u&&i&&r!=="cache-only")return this.getEntryWithRefreshToken(e,c)}if(!o)return;const a=await this.nowProvider(),l=Math.floor(a/1e3);return o.expiresAt-n<l?o.body.refresh_token?this.modifiedCachedEntry(o,e):(await this.cache.remove(e.toKey()),void await((s=this.keyManifest)===null||s===void 0?void 0:s.remove(e.toKey()))):o.body}async modifiedCachedEntry(e,n){return e.body={refresh_token:e.body.refresh_token,audience:e.body.audience,scope:e.body.scope},await this.cache.set(n.toKey(),e),{refresh_token:e.body.refresh_token,audience:e.body.audience,scope:e.body.scope}}async set(e){var n;const i=new Tn({clientId:e.client_id,scope:e.scope,audience:e.audience}),r=await this.wrapCacheEntry(e);await this.cache.set(i.toKey(),r),await((n=this.keyManifest)===null||n===void 0?void 0:n.add(i.toKey()))}async remove(e,n,i){const r=new Tn({clientId:e,scope:i,audience:n});await this.cache.remove(r.toKey())}async clear(e){var n;const i=await this.getCacheKeys();i&&(await i.filter(r=>!e||r.includes(e)).reduce(async(r,s)=>{await r,await this.cache.remove(s)},Promise.resolve()),await((n=this.keyManifest)===null||n===void 0?void 0:n.clear()))}async wrapCacheEntry(e){const n=await this.nowProvider();return{body:e,expiresAt:Math.floor(n/1e3)+e.expires_in}}async getCacheKeys(){var e;return this.keyManifest?(e=await this.keyManifest.get())===null||e===void 0?void 0:e.keys:this.cache.allKeys?this.cache.allKeys():void 0}getIdTokenCacheKey(e){return new Tn({clientId:e},"@@auth0spajs@@","@@user@@").toKey()}matchExistingCacheKey(e,n){return n.filter(i=>{var r;const s=Tn.fromKey(i),o=new Set(s.scope&&s.scope.split(" ")),a=((r=e.scope)===null||r===void 0?void 0:r.split(" "))||[],l=s.scope&&a.reduce((c,u)=>c&&o.has(u),!0);return s.prefix==="@@auth0spajs@@"&&s.clientId===e.clientId&&s.audience===e.audience&&l})[0]}async getEntryWithRefreshToken(e,n){var i;for(const r of n){const s=Tn.fromKey(r);if(s.prefix==="@@auth0spajs@@"&&s.clientId===e.clientId){const o=await this.cache.get(r);if(!((i=o==null?void 0:o.body)===null||i===void 0)&&i.refresh_token)return this.modifiedCachedEntry(o,e)}}}async updateEntry(e,n){var i;const r=await this.getCacheKeys();if(r)for(const s of r){const o=await this.cache.get(s);if(((i=o==null?void 0:o.body)===null||i===void 0?void 0:i.refresh_token)===e){const a=Object.assign(Object.assign({},o.body),{refresh_token:n});await this.set(a)}}}}class nE{constructor(e,n,i){this.storage=e,this.clientId=n,this.cookieDomain=i,this.storageKey=`a0.spajs.txs.${this.clientId}`}create(e){this.storage.save(this.storageKey,e,{daysUntilExpire:1,cookieDomain:this.cookieDomain})}get(){return this.storage.get(this.storageKey)}remove(){this.storage.remove(this.storageKey,{cookieDomain:this.cookieDomain})}}const ao=t=>typeof t=="number",iE=["iss","aud","exp","nbf","iat","jti","azp","nonce","auth_time","at_hash","c_hash","acr","amr","sub_jwk","cnf","sip_from_tag","sip_date","sip_callid","sip_cseq_num","sip_via_branch","orig","dest","mky","events","toe","txn","rph","sid","vot","vtm"],rE=t=>{if(!t.id_token)throw new Error("ID token is required but missing");const e=(s=>{const o=s.split("."),[a,l,c]=o;if(o.length!==3||!a||!l||!c)throw new Error("ID token could not be decoded");const u=JSON.parse(Op(l)),d={__raw:s},h={};return Object.keys(u).forEach(p=>{d[p]=u[p],iE.includes(p)||(h[p]=u[p])}),{encoded:{header:a,payload:l,signature:c},header:JSON.parse(Op(a)),claims:d,user:h}})(t.id_token);if(!e.claims.iss)throw new Error("Issuer (iss) claim must be a string present in the ID token");if(e.claims.iss!==t.iss)throw new Error(`Issuer (iss) claim mismatch in the ID token; expected "${t.iss}", found "${e.claims.iss}"`);if(!e.user.sub)throw new Error("Subject (sub) claim must be a string present in the ID token");if(e.header.alg!=="RS256")throw new Error(`Signature algorithm of "${e.header.alg}" is not supported. Expected the ID token to be signed with "RS256".`);if(!e.claims.aud||typeof e.claims.aud!="string"&&!Array.isArray(e.claims.aud))throw new Error("Audience (aud) claim must be a string or array of strings present in the ID token");if(Array.isArray(e.claims.aud)){if(!e.claims.aud.includes(t.aud))throw new Error(`Audience (aud) claim mismatch in the ID token; expected "${t.aud}" but was not one of "${e.claims.aud.join(", ")}"`);if(e.claims.aud.length>1){if(!e.claims.azp)throw new Error("Authorized Party (azp) claim must be a string present in the ID token when Audience (aud) claim has multiple values");if(e.claims.azp!==t.aud)throw new Error(`Authorized Party (azp) claim mismatch in the ID token; expected "${t.aud}", found "${e.claims.azp}"`)}}else if(e.claims.aud!==t.aud)throw new Error(`Audience (aud) claim mismatch in the ID token; expected "${t.aud}" but found "${e.claims.aud}"`);if(t.nonce){if(!e.claims.nonce)throw new Error("Nonce (nonce) claim must be a string present in the ID token");if(e.claims.nonce!==t.nonce)throw new Error(`Nonce (nonce) claim mismatch in the ID token; expected "${t.nonce}", found "${e.claims.nonce}"`)}if(t.max_age&&!ao(e.claims.auth_time))throw new Error("Authentication Time (auth_time) claim must be a number present in the ID token when Max Age (max_age) is specified");if(e.claims.exp==null||!ao(e.claims.exp))throw new Error("Expiration Time (exp) claim must be a number present in the ID token");if(!ao(e.claims.iat))throw new Error("Issued At (iat) claim must be a number present in the ID token");const n=t.leeway||60,i=new Date(t.now||Date.now()),r=new Date(0);if(r.setUTCSeconds(e.claims.exp+n),i>r)throw new Error(`Expiration Time (exp) claim error in the ID token; current time (${i}) is after expiration time (${r})`);if(e.claims.nbf!=null&&ao(e.claims.nbf)){const s=new Date(0);if(s.setUTCSeconds(e.claims.nbf-n),i<s)throw new Error(`Not Before time (nbf) claim in the ID token indicates that this token can't be used just yet. Current time (${i}) is before ${s}`)}if(e.claims.auth_time!=null&&ao(e.claims.auth_time)){const s=new Date(0);if(s.setUTCSeconds(parseInt(e.claims.auth_time)+t.max_age+n),i>s)throw new Error(`Authentication Time (auth_time) claim in the ID token indicates that too much time has passed since the last end-user authentication. Current time (${i}) is after last auth at ${s}`)}if(t.organization){const s=t.organization.trim();if(s.startsWith("org_")){const o=s;if(!e.claims.org_id)throw new Error("Organization ID (org_id) claim must be a string present in the ID token");if(o!==e.claims.org_id)throw new Error(`Organization ID (org_id) claim mismatch in the ID token; expected "${o}", found "${e.claims.org_id}"`)}else{const o=s.toLowerCase();if(!e.claims.org_name)throw new Error("Organization Name (org_name) claim must be a string present in the ID token");if(o!==e.claims.org_name)throw new Error(`Organization Name (org_name) claim mismatch in the ID token; expected "${o}", found "${e.claims.org_name}"`)}}return e};var Pr=$f(function(t,e){var n=Mr&&Mr.__assign||function(){return n=Object.assign||function(l){for(var c,u=1,d=arguments.length;u<d;u++)for(var h in c=arguments[u])Object.prototype.hasOwnProperty.call(c,h)&&(l[h]=c[h]);return l},n.apply(this,arguments)};function i(l,c){if(!c)return"";var u="; "+l;return c===!0?u:u+"="+c}function r(l,c,u){return encodeURIComponent(l).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/\(/g,"%28").replace(/\)/g,"%29")+"="+encodeURIComponent(c).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent)+function(d){if(typeof d.expires=="number"){var h=new Date;h.setMilliseconds(h.getMilliseconds()+864e5*d.expires),d.expires=h}return i("Expires",d.expires?d.expires.toUTCString():"")+i("Domain",d.domain)+i("Path",d.path)+i("Secure",d.secure)+i("SameSite",d.sameSite)}(u)}function s(l){for(var c={},u=l?l.split("; "):[],d=/(%[\dA-F]{2})+/gi,h=0;h<u.length;h++){var p=u[h].split("="),_=p.slice(1).join("=");_.charAt(0)==='"'&&(_=_.slice(1,-1));try{c[p[0].replace(d,decodeURIComponent)]=_.replace(d,decodeURIComponent)}catch{}}return c}function o(){return s(document.cookie)}function a(l,c,u){document.cookie=r(l,c,n({path:"/"},u))}e.__esModule=!0,e.encode=r,e.parse=s,e.getAll=o,e.get=function(l){return o()[l]},e.set=a,e.remove=function(l,c){a(l,"",n(n({},c),{expires:-1}))}});Xf(Pr),Pr.encode,Pr.parse,Pr.getAll;var sE=Pr.get,W_=Pr.set,j_=Pr.remove;const os={get(t){const e=sE(t);if(e!==void 0)return JSON.parse(e)},save(t,e,n){let i={};window.location.protocol==="https:"&&(i={secure:!0,sameSite:"none"}),n!=null&&n.daysUntilExpire&&(i.expires=n.daysUntilExpire),n!=null&&n.cookieDomain&&(i.domain=n.cookieDomain),W_(t,JSON.stringify(e),i)},remove(t,e){let n={};e!=null&&e.cookieDomain&&(n.domain=e.cookieDomain),j_(t,n)}},oE={get(t){return os.get(t)||os.get(`_legacy_${t}`)},save(t,e,n){let i={};window.location.protocol==="https:"&&(i={secure:!0}),n!=null&&n.daysUntilExpire&&(i.expires=n.daysUntilExpire),n!=null&&n.cookieDomain&&(i.domain=n.cookieDomain),W_(`_legacy_${t}`,JSON.stringify(e),i),os.save(t,e,n)},remove(t,e){let n={};e!=null&&e.cookieDomain&&(n.domain=e.cookieDomain),j_(t,n),os.remove(t,e),os.remove(`_legacy_${t}`,e)}},aE={get(t){if(typeof sessionStorage>"u")return;const e=sessionStorage.getItem(t);return e!=null?JSON.parse(e):void 0},save(t,e){sessionStorage.setItem(t,JSON.stringify(e))},remove(t){sessionStorage.removeItem(t)}};var Bi;(function(t){t.Code="code",t.ConnectCode="connect_code"})(Bi||(Bi={}));function lE(t,e,n){var i=e===void 0?null:e,r=function(l,c){var u=atob(l);if(c){for(var d=new Uint8Array(u.length),h=0,p=u.length;h<p;++h)d[h]=u.charCodeAt(h);return String.fromCharCode.apply(null,new Uint16Array(d.buffer))}return u}(t,n!==void 0&&n),s=r.indexOf(`
`,10)+1,o=r.substring(s)+(i?"//# sourceMappingURL="+i:""),a=new Blob([o],{type:"application/javascript"});return URL.createObjectURL(a)}var zp,Bp,Hp,au,cE=(zp="Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwohZnVuY3Rpb24oKXsidXNlIHN0cmljdCI7Y2xhc3MgZSBleHRlbmRzIEVycm9ye2NvbnN0cnVjdG9yKHQscil7c3VwZXIociksdGhpcy5lcnJvcj10LHRoaXMuZXJyb3JfZGVzY3JpcHRpb249cixPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcyxlLnByb3RvdHlwZSl9c3RhdGljIGZyb21QYXlsb2FkKHtlcnJvcjp0LGVycm9yX2Rlc2NyaXB0aW9uOnJ9KXtyZXR1cm4gbmV3IGUodCxyKX19Y2xhc3MgdCBleHRlbmRzIGV7Y29uc3RydWN0b3IoZSxzKXtzdXBlcigibWlzc2luZ19yZWZyZXNoX3Rva2VuIixgTWlzc2luZyBSZWZyZXNoIFRva2VuIChhdWRpZW5jZTogJyR7cihlLFsiZGVmYXVsdCJdKX0nLCBzY29wZTogJyR7cihzKX0nKWApLHRoaXMuYXVkaWVuY2U9ZSx0aGlzLnNjb3BlPXMsT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsdC5wcm90b3R5cGUpfX1mdW5jdGlvbiByKGUsdD1bXSl7cmV0dXJuIGUmJiF0LmluY2x1ZGVzKGUpP2U6IiJ9ImZ1bmN0aW9uIj09dHlwZW9mIFN1cHByZXNzZWRFcnJvciYmU3VwcHJlc3NlZEVycm9yO2NvbnN0IHM9ZT0+e3ZhcntjbGllbnRJZDp0fT1lLHI9ZnVuY3Rpb24oZSx0KXt2YXIgcj17fTtmb3IodmFyIHMgaW4gZSlPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSxzKSYmdC5pbmRleE9mKHMpPDAmJihyW3NdPWVbc10pO2lmKG51bGwhPWUmJiJmdW5jdGlvbiI9PXR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKXt2YXIgbz0wO2ZvcihzPU9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZSk7bzxzLmxlbmd0aDtvKyspdC5pbmRleE9mKHNbb10pPDAmJk9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChlLHNbb10pJiYocltzW29dXT1lW3Nbb11dKX1yZXR1cm4gcn0oZSxbImNsaWVudElkIl0pO3JldHVybiBuZXcgVVJMU2VhcmNoUGFyYW1zKChlPT5PYmplY3Qua2V5cyhlKS5maWx0ZXIoKHQ9PnZvaWQgMCE9PWVbdF0pKS5yZWR1Y2UoKCh0LHIpPT5PYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sdCkse1tyXTplW3JdfSkpLHt9KSkoT2JqZWN0LmFzc2lnbih7Y2xpZW50X2lkOnR9LHIpKSkudG9TdHJpbmcoKX07bGV0IG89e307Y29uc3Qgbj0oZSx0KT0+YCR7ZX18JHt0fWA7YWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsKGFzeW5jKHtkYXRhOnt0aW1lb3V0OmUsYXV0aDpyLGZldGNoVXJsOmksZmV0Y2hPcHRpb25zOmMsdXNlRm9ybURhdGE6YSx1c2VNcnJ0OmZ9LHBvcnRzOltwXX0pPT57bGV0IGgsdSxsPXt9O2NvbnN0e2F1ZGllbmNlOmQsc2NvcGU6eX09cnx8e307dHJ5e2NvbnN0IHI9YT8oZT0+e2NvbnN0IHQ9bmV3IFVSTFNlYXJjaFBhcmFtcyhlKSxyPXt9O3JldHVybiB0LmZvckVhY2goKChlLHQpPT57clt0XT1lfSkpLHJ9KShjLmJvZHkpOkpTT04ucGFyc2UoYy5ib2R5KTtpZighci5yZWZyZXNoX3Rva2VuJiYicmVmcmVzaF90b2tlbiI9PT1yLmdyYW50X3R5cGUpe2lmKHU9KChlLHQpPT5vW24oZSx0KV0pKGQseSksIXUmJmYpe2NvbnN0IGU9by5sYXRlc3RfcmVmcmVzaF90b2tlbix0PSgoZSx0KT0+e2NvbnN0IHI9T2JqZWN0LmtleXMobykuZmluZCgocj0+e2lmKCJsYXRlc3RfcmVmcmVzaF90b2tlbiIhPT1yKXtjb25zdCBzPSgoZSx0KT0+dC5zdGFydHNXaXRoKGAke2V9fGApKSh0LHIpLG89ci5zcGxpdCgifCIpWzFdLnNwbGl0KCIgIiksbj1lLnNwbGl0KCIgIikuZXZlcnkoKGU9Pm8uaW5jbHVkZXMoZSkpKTtyZXR1cm4gcyYmbn19KSk7cmV0dXJuISFyfSkoeSxkKTtlJiYhdCYmKHU9ZSl9aWYoIXUpdGhyb3cgbmV3IHQoZCx5KTtjLmJvZHk9YT9zKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSxyKSx7cmVmcmVzaF90b2tlbjp1fSkpOkpTT04uc3RyaW5naWZ5KE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSxyKSx7cmVmcmVzaF90b2tlbjp1fSkpfWxldCBqLGs7ImZ1bmN0aW9uIj09dHlwZW9mIEFib3J0Q29udHJvbGxlciYmKGo9bmV3IEFib3J0Q29udHJvbGxlcixjLnNpZ25hbD1qLnNpZ25hbCk7dHJ5e2s9YXdhaXQgUHJvbWlzZS5yYWNlKFsoXz1lLG5ldyBQcm9taXNlKChlPT5zZXRUaW1lb3V0KGUsXykpKSksZmV0Y2goaSxPYmplY3QuYXNzaWduKHt9LGMpKV0pfWNhdGNoKGUpe3JldHVybiB2b2lkIHAucG9zdE1lc3NhZ2Uoe2Vycm9yOmUubWVzc2FnZX0pfWlmKCFrKXJldHVybiBqJiZqLmFib3J0KCksdm9pZCBwLnBvc3RNZXNzYWdlKHtlcnJvcjoiVGltZW91dCB3aGVuIGV4ZWN1dGluZyAnZmV0Y2gnIn0pO2c9ay5oZWFkZXJzLGw9Wy4uLmddLnJlZHVjZSgoKGUsW3Qscl0pPT4oZVt0XT1yLGUpKSx7fSksaD1hd2FpdCBrLmpzb24oKSxoLnJlZnJlc2hfdG9rZW4/KGYmJihvLmxhdGVzdF9yZWZyZXNoX3Rva2VuPWgucmVmcmVzaF90b2tlbixPPXUsYj1oLnJlZnJlc2hfdG9rZW4sT2JqZWN0LmVudHJpZXMobykuZm9yRWFjaCgoKFtlLHRdKT0+e3Q9PT1PJiYob1tlXT1iKX0pKSksKChlLHQscik9PntvW24odCxyKV09ZX0pKGgucmVmcmVzaF90b2tlbixkLHkpLGRlbGV0ZSBoLnJlZnJlc2hfdG9rZW4pOigoZSx0KT0+e2RlbGV0ZSBvW24oZSx0KV19KShkLHkpLHAucG9zdE1lc3NhZ2Uoe29rOmsub2ssanNvbjpoLGhlYWRlcnM6bH0pfWNhdGNoKGUpe3AucG9zdE1lc3NhZ2Uoe29rOiExLGpzb246e2Vycm9yOmUuZXJyb3IsZXJyb3JfZGVzY3JpcHRpb246ZS5tZXNzYWdlfSxoZWFkZXJzOmx9KX12YXIgTyxiLGcsX30pKX0oKTsKCg==",Bp=null,Hp=!1,function(t){return au=au||lE(zp,Bp,Hp),new Worker(au,t)});const lu={};class uE{constructor(e,n){this.cache=e,this.clientId=n,this.manifestKey=this.createManifestKeyFrom(this.clientId)}async add(e){var n;const i=new Set(((n=await this.cache.get(this.manifestKey))===null||n===void 0?void 0:n.keys)||[]);i.add(e),await this.cache.set(this.manifestKey,{keys:[...i]})}async remove(e){const n=await this.cache.get(this.manifestKey);if(n){const i=new Set(n.keys);return i.delete(e),i.size>0?await this.cache.set(this.manifestKey,{keys:[...i]}):await this.cache.remove(this.manifestKey)}}get(){return this.cache.get(this.manifestKey)}clear(){return this.cache.remove(this.manifestKey)}createManifestKeyFrom(e){return`@@auth0spajs@@::${e}`}}const dE={memory:()=>new V_().enclosedCache,localstorage:()=>new eE},Gp=t=>dE[t],Vp=t=>{const{openUrl:e,onRedirect:n}=t,i=Zn(t,["openUrl","onRedirect"]);return Object.assign(Object.assign({},i),{openUrl:e===!1||e?e:n})},Wp=(t,e)=>{const n=(e==null?void 0:e.split(" "))||[];return((t==null?void 0:t.split(" "))||[]).every(i=>n.includes(i))},hr={NONCE:"nonce",KEYPAIR:"keypair"};class fE{constructor(e){this.clientId=e}getVersion(){return 1}createDbHandle(){const e=window.indexedDB.open("auth0-spa-js",this.getVersion());return new Promise((n,i)=>{e.onupgradeneeded=()=>Object.values(hr).forEach(r=>e.result.createObjectStore(r)),e.onerror=()=>i(e.error),e.onsuccess=()=>n(e.result)})}async getDbHandle(){return this.dbHandle||(this.dbHandle=await this.createDbHandle()),this.dbHandle}async executeDbRequest(e,n,i){const r=i((await this.getDbHandle()).transaction(e,n).objectStore(e));return new Promise((s,o)=>{r.onsuccess=()=>s(r.result),r.onerror=()=>o(r.error)})}buildKey(e){const n=e?`_${e}`:"auth0";return`${this.clientId}::${n}`}setNonce(e,n){return this.save(hr.NONCE,this.buildKey(n),e)}setKeyPair(e){return this.save(hr.KEYPAIR,this.buildKey(),e)}async save(e,n,i){await this.executeDbRequest(e,"readwrite",r=>r.put(i,n))}findNonce(e){return this.find(hr.NONCE,this.buildKey(e))}findKeyPair(){return this.find(hr.KEYPAIR,this.buildKey())}find(e,n){return this.executeDbRequest(e,"readonly",i=>i.get(n))}async deleteBy(e,n){const i=await this.executeDbRequest(e,"readonly",r=>r.getAllKeys());i==null||i.filter(n).map(r=>this.executeDbRequest(e,"readwrite",s=>s.delete(r)))}deleteByClientId(e,n){return this.deleteBy(e,i=>typeof i=="string"&&i.startsWith(`${n}::`))}clearNonces(){return this.deleteByClientId(hr.NONCE,this.clientId)}clearKeyPairs(){return this.deleteByClientId(hr.KEYPAIR,this.clientId)}}class hE{constructor(e){this.storage=new fE(e)}getNonce(e){return this.storage.findNonce(e)}setNonce(e,n){return this.storage.setNonce(e,n)}async getOrGenerateKeyPair(){let e=await this.storage.findKeyPair();return e||(e=await XS(),await this.storage.setKeyPair(e)),e}async generateProof(e){const n=await this.getOrGenerateKeyPair();return KS(Object.assign({keyPair:n},e))}async calculateThumbprint(){return $S(await this.getOrGenerateKeyPair())}async clear(){await Promise.all([this.storage.clearNonces(),this.storage.clearKeyPairs()])}}var xs;(function(t){t.Bearer="Bearer",t.DPoP="DPoP"})(xs||(xs={}));class pE{constructor(e,n){this.hooks=n,this.config=Object.assign(Object.assign({},e),{fetch:e.fetch||(typeof window>"u"?fetch:window.fetch.bind(window))})}isAbsoluteUrl(e){return/^(https?:)?\/\//i.test(e)}buildUrl(e,n){if(n){if(this.isAbsoluteUrl(n))return n;if(e)return`${e.replace(/\/?\/$/,"")}/${n.replace(/^\/+/,"")}`}throw new TypeError("`url` must be absolute or `baseUrl` non-empty.")}getAccessToken(e){return this.config.getAccessToken?this.config.getAccessToken(e):this.hooks.getAccessToken(e)}extractUrl(e){return typeof e=="string"?e:e instanceof URL?e.href:e.url}buildBaseRequest(e,n){if(!this.config.baseUrl)return new Request(e,n);const i=this.buildUrl(this.config.baseUrl,this.extractUrl(e)),r=e instanceof Request?new Request(i,e):i;return new Request(r,n)}setAuthorizationHeader(e,n,i=xs.Bearer){e.headers.set("authorization",`${i} ${n}`)}async setDpopProofHeader(e,n){if(!this.config.dpopNonceId)return;const i=await this.hooks.getDpopNonce(),r=await this.hooks.generateDpopProof({accessToken:n,method:e.method,nonce:i,url:e.url});e.headers.set("dpop",r)}async prepareRequest(e,n){const i=await this.getAccessToken(n);let r,s;typeof i=="string"?(r=this.config.dpopNonceId?xs.DPoP:xs.Bearer,s=i):(r=i.token_type,s=i.access_token),this.setAuthorizationHeader(e,s,r),r===xs.DPoP&&await this.setDpopProofHeader(e,s)}getHeader(e,n){return Array.isArray(e)?new Headers(e).get(n)||"":typeof e.get=="function"?e.get(n)||"":e[n]||""}hasUseDpopNonceError(e){if(e.status!==401)return!1;const n=this.getHeader(e.headers,"www-authenticate");return n.includes("invalid_dpop_nonce")||n.includes("use_dpop_nonce")}async handleResponse(e,n){const i=this.getHeader(e.headers,"dpop-nonce");if(i&&await this.hooks.setDpopNonce(i),!this.hasUseDpopNonceError(e))return e;if(!i||!n.onUseDpopNonceError)throw new xc(i);return n.onUseDpopNonceError()}async internalFetchWithAuth(e,n,i,r){const s=this.buildBaseRequest(e,n);await this.prepareRequest(s,r);const o=await this.config.fetch(s);return this.handleResponse(o,i)}fetchWithAuth(e,n,i){const r={onUseDpopNonceError:()=>this.internalFetchWithAuth(e,n,Object.assign(Object.assign({},r),{onUseDpopNonceError:void 0}),i)};return this.internalFetchWithAuth(e,n,r,i)}}class mE{constructor(e,n){this.myAccountFetcher=e,this.apiBase=n}async connectAccount(e){const n=await this.myAccountFetcher.fetchWithAuth(`${this.apiBase}v1/connected-accounts/connect`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});return this._handleResponse(n)}async completeAccount(e){const n=await this.myAccountFetcher.fetchWithAuth(`${this.apiBase}v1/connected-accounts/complete`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});return this._handleResponse(n)}async _handleResponse(e){let n;try{n=await e.text(),n=JSON.parse(n)}catch(i){throw new Xl({type:"invalid_json",status:e.status,title:"Invalid JSON response",detail:n||String(i)})}if(e.ok)return n;throw new Xl(n)}}class Xl extends Error{constructor({type:e,status:n,title:i,detail:r,validation_errors:s}){super(r),this.name="MyAccountApiError",this.type=e,this.status=n,this.title=i,this.detail=r,this.validation_errors=s,Object.setPrototypeOf(this,Xl.prototype)}}const cu=new IS;class gE{constructor(e){let n,i;if(this.userCache=new V_().enclosedCache,this.activeLockKeys=new Set,this.defaultOptions={authorizationParams:{scope:"openid profile email"},useRefreshTokensFallback:!1,useFormData:!0},this._releaseLockOnPageHide=async()=>{const l=Array.from(this.activeLockKeys);for(const c of l)await cu.releaseLock(c);this.activeLockKeys.clear(),window.removeEventListener("pagehide",this._releaseLockOnPageHide)},this.options=Object.assign(Object.assign(Object.assign({},this.defaultOptions),e),{authorizationParams:Object.assign(Object.assign({},this.defaultOptions.authorizationParams),e.authorizationParams)}),typeof window<"u"&&(()=>{if(!jl())throw new Error("For security reasons, `window.crypto` is required to run `auth0-spa-js`.");if(jl().subtle===void 0)throw new Error(`
      auth0-spa-js must run on a secure origin. See https://github.com/auth0/auth0-spa-js/blob/main/FAQ.md#why-do-i-get-auth0-spa-js-must-run-on-a-secure-origin for more information.
    `)})(),e.cache&&e.cacheLocation&&console.warn("Both `cache` and `cacheLocation` options have been specified in the Auth0Client configuration; ignoring `cacheLocation` and using `cache`."),e.cache)i=e.cache;else{if(n=e.cacheLocation||"memory",!Gp(n))throw new Error(`Invalid cache location "${n}"`);i=Gp(n)()}this.httpTimeoutMs=e.httpTimeoutInSeconds?1e3*e.httpTimeoutInSeconds:1e4,this.cookieStorage=e.legacySameSiteCookie===!1?os:oE,this.orgHintCookieName=`auth0.${this.options.clientId}.organization_hint`,this.isAuthenticatedCookieName=(l=>`auth0.${l}.is.authenticated`)(this.options.clientId),this.sessionCheckExpiryDays=e.sessionCheckExpiryDays||1;const r=e.useCookiesForTransactions?this.cookieStorage:aE;var s;this.scope=((l,c,...u)=>{if(typeof l!="object")return{default:ml(c,l,...u)};let d={default:ml(c,...u)};return Object.keys(l).forEach(h=>{const p=l[h];d[h]=ml(c,p,...u)}),d})(this.options.authorizationParams.scope,"openid",this.options.useRefreshTokens?"offline_access":""),this.transactionManager=new nE(r,this.options.clientId,this.options.cookieDomain),this.nowProvider=this.options.nowProvider||F_,this.cacheManager=new tE(i,i.allKeys?void 0:new uE(i,this.options.clientId),this.nowProvider),this.dpop=this.options.useDpop?new hE(this.options.clientId):void 0,this.domainUrl=(s=this.options.domain,/^https?:\/\//.test(s)?s:`https://${s}`),this.tokenIssuer=((l,c)=>l?l.startsWith("https://")?l:`https://${l}/`:`${c}/`)(this.options.issuer,this.domainUrl);const o=`${this.domainUrl}/me/`,a=this.createFetcher(Object.assign(Object.assign({},this.options.useDpop&&{dpopNonceId:"__auth0_my_account_api__"}),{getAccessToken:()=>this.getTokenSilently({authorizationParams:{scope:"create:me:connected_accounts",audience:o},detailedResponse:!0})}));this.myAccountApi=new mE(a,o),typeof window<"u"&&window.Worker&&this.options.useRefreshTokens&&n==="memory"&&(this.options.workerUrl?this.worker=new Worker(this.options.workerUrl):this.worker=new cE)}_url(e){const n=encodeURIComponent(btoa(JSON.stringify(this.options.auth0Client||k_)));return`${this.domainUrl}${e}&auth0Client=${n}`}_authorizeUrl(e){return this._url(`/authorize?${Od(e)}`)}async _verifyIdToken(e,n,i){const r=await this.nowProvider();return rE({iss:this.tokenIssuer,aud:this.options.clientId,id_token:e,nonce:n,organization:i,leeway:this.options.leeway,max_age:(s=this.options.authorizationParams.max_age,typeof s!="string"?s:parseInt(s,10)||void 0),now:r});var s}_processOrgHint(e){e?this.cookieStorage.save(this.orgHintCookieName,e,{daysUntilExpire:this.sessionCheckExpiryDays,cookieDomain:this.options.cookieDomain}):this.cookieStorage.remove(this.orgHintCookieName,{cookieDomain:this.options.cookieDomain})}async _prepareAuthorizeUrl(e,n,i){var r;const s=ou(oo()),o=ou(oo()),a=oo(),l=await Ip(a),c=kp(l),u=await((r=this.dpop)===null||r===void 0?void 0:r.calculateThumbprint()),d=((p,_,y,m,f,v,g,x,R)=>Object.assign(Object.assign(Object.assign({client_id:p.clientId},p.authorizationParams),y),{scope:La(_,y.scope,y.audience),response_type:"code",response_mode:x||"query",state:m,nonce:f,redirect_uri:g||p.authorizationParams.redirect_uri,code_challenge:v,code_challenge_method:"S256",dpop_jkt:R}))(this.options,this.scope,e,s,o,c,e.redirect_uri||this.options.authorizationParams.redirect_uri||i,n==null?void 0:n.response_mode,u),h=this._authorizeUrl(d);return{nonce:o,code_verifier:a,scope:d.scope,audience:d.audience||"default",redirect_uri:d.redirect_uri,state:s,url:h}}async loginWithPopup(e,n){var i;if(e=e||{},!(n=n||{}).popup&&(n.popup=(a=>{const l=window.screenX+(window.innerWidth-400)/2,c=window.screenY+(window.innerHeight-600)/2;return window.open(a,"auth0:authorize:popup",`left=${l},top=${c},width=400,height=600,resizable,scrollbars=yes,status=1`)})(""),!n.popup))throw new Jf;const r=await this._prepareAuthorizeUrl(e.authorizationParams||{},{response_mode:"web_message"},window.location.origin);n.popup.location.href=r.url;const s=await(a=>new Promise((l,c)=>{let u;const d=setInterval(()=>{a.popup&&a.popup.closed&&(clearInterval(d),clearTimeout(h),window.removeEventListener("message",u,!1),c(new Zf(a.popup)))},1e3),h=setTimeout(()=>{clearInterval(d),c(new qf(a.popup)),window.removeEventListener("message",u,!1)},1e3*(a.timeoutInSeconds||60));u=function(p){if(p.data&&p.data.type==="authorization_response"){if(clearTimeout(h),clearInterval(d),window.removeEventListener("message",u,!1),a.popup.close(),p.data.response.error)return c(mt.fromPayload(p.data.response));l(p.data.response)}},window.addEventListener("message",u)}))(Object.assign(Object.assign({},n),{timeoutInSeconds:n.timeoutInSeconds||this.options.authorizeTimeoutInSeconds||60}));if(r.state!==s.state)throw new mt("state_mismatch","Invalid state");const o=((i=e.authorizationParams)===null||i===void 0?void 0:i.organization)||this.options.authorizationParams.organization;await this._requestToken({audience:r.audience,scope:r.scope,code_verifier:r.code_verifier,grant_type:"authorization_code",code:s.code,redirect_uri:r.redirect_uri},{nonceIn:r.nonce,organization:o})}async getUser(){var e;const n=await this._getIdTokenFromCache();return(e=n==null?void 0:n.decodedToken)===null||e===void 0?void 0:e.user}async getIdTokenClaims(){var e;const n=await this._getIdTokenFromCache();return(e=n==null?void 0:n.decodedToken)===null||e===void 0?void 0:e.claims}async loginWithRedirect(e={}){var n;const i=Vp(e),{openUrl:r,fragment:s,appState:o}=i,a=Zn(i,["openUrl","fragment","appState"]),l=((n=a.authorizationParams)===null||n===void 0?void 0:n.organization)||this.options.authorizationParams.organization,c=await this._prepareAuthorizeUrl(a.authorizationParams||{}),{url:u}=c,d=Zn(c,["url"]);this.transactionManager.create(Object.assign(Object.assign(Object.assign({},d),{appState:o,response_type:Bi.Code}),l&&{organization:l}));const h=s?`${u}#${s}`:u;r?await r(h):window.location.assign(h)}async handleRedirectCallback(e=window.location.href){const n=e.split("?").slice(1);if(n.length===0)throw new Error("There are no query params available for parsing.");const i=this.transactionManager.get();if(!i)throw new mt("missing_transaction","Invalid state");this.transactionManager.remove();const r=(s=>{s.indexOf("#")>-1&&(s=s.substring(0,s.indexOf("#")));const o=new URLSearchParams(s);return{state:o.get("state"),code:o.get("code")||void 0,connect_code:o.get("connect_code")||void 0,error:o.get("error")||void 0,error_description:o.get("error_description")||void 0}})(n.join(""));return i.response_type===Bi.ConnectCode?this._handleConnectAccountRedirectCallback(r,i):this._handleLoginRedirectCallback(r,i)}async _handleLoginRedirectCallback(e,n){const{code:i,state:r,error:s,error_description:o}=e;if(s)throw new Kf(s,o||s,r,n.appState);if(!n.code_verifier||n.state&&n.state!==r)throw new mt("state_mismatch","Invalid state");const a=n.organization,l=n.nonce,c=n.redirect_uri;return await this._requestToken(Object.assign({audience:n.audience,scope:n.scope,code_verifier:n.code_verifier,grant_type:"authorization_code",code:i},c?{redirect_uri:c}:{}),{nonceIn:l,organization:a}),{appState:n.appState,response_type:Bi.Code}}async _handleConnectAccountRedirectCallback(e,n){const{connect_code:i,state:r,error:s,error_description:o}=e;if(s)throw new Yf(s,o||s,n.connection,r,n.appState);if(!i)throw new mt("missing_connect_code","Missing connect code");if(!(n.code_verifier&&n.state&&n.auth_session&&n.redirect_uri&&n.state===r))throw new mt("state_mismatch","Invalid state");const a=await this.myAccountApi.completeAccount({auth_session:n.auth_session,connect_code:i,redirect_uri:n.redirect_uri,code_verifier:n.code_verifier});return Object.assign(Object.assign({},a),{appState:n.appState,response_type:Bi.ConnectCode})}async checkSession(e){if(!this.cookieStorage.get(this.isAuthenticatedCookieName)){if(!this.cookieStorage.get("auth0.is.authenticated"))return;this.cookieStorage.save(this.isAuthenticatedCookieName,!0,{daysUntilExpire:this.sessionCheckExpiryDays,cookieDomain:this.options.cookieDomain}),this.cookieStorage.remove("auth0.is.authenticated")}try{await this.getTokenSilently(e)}catch{}}async getTokenSilently(e={}){var n,i;const r=Object.assign(Object.assign({cacheMode:"on"},e),{authorizationParams:Object.assign(Object.assign(Object.assign({},this.options.authorizationParams),e.authorizationParams),{scope:La(this.scope,(n=e.authorizationParams)===null||n===void 0?void 0:n.scope,((i=e.authorizationParams)===null||i===void 0?void 0:i.audience)||this.options.authorizationParams.audience)})}),s=await((o,a)=>{let l=lu[a];return l||(l=o().finally(()=>{delete lu[a],l=null}),lu[a]=l),l})(()=>this._getTokenSilently(r),`${this.options.clientId}::${r.authorizationParams.audience}::${r.authorizationParams.scope}`);return e.detailedResponse?s:s==null?void 0:s.access_token}async _getTokenSilently(e){const{cacheMode:n}=e,i=Zn(e,["cacheMode"]);if(n!=="off"){const a=await this._getEntryFromCache({scope:i.authorizationParams.scope,audience:i.authorizationParams.audience||"default",clientId:this.options.clientId,cacheMode:n});if(a)return a}if(n==="cache-only")return;const r=(s=this.options.clientId,o=i.authorizationParams.audience||"default",`auth0.lock.getTokenSilently.${s}.${o}`);var s,o;if(!await(async(a,l=3)=>{for(let c=0;c<l;c++)if(await a())return!0;return!1})(()=>cu.acquireLock(r,5e3),10))throw new qo;this.activeLockKeys.add(r),this.activeLockKeys.size===1&&window.addEventListener("pagehide",this._releaseLockOnPageHide);try{if(n!=="off"){const p=await this._getEntryFromCache({scope:i.authorizationParams.scope,audience:i.authorizationParams.audience||"default",clientId:this.options.clientId});if(p)return p}const a=this.options.useRefreshTokens?await this._getTokenUsingRefreshToken(i):await this._getTokenFromIFrame(i),{id_token:l,token_type:c,access_token:u,oauthTokenScope:d,expires_in:h}=a;return Object.assign(Object.assign({id_token:l,token_type:c,access_token:u},d?{scope:d}:null),{expires_in:h})}finally{await cu.releaseLock(r),this.activeLockKeys.delete(r),this.activeLockKeys.size===0&&window.removeEventListener("pagehide",this._releaseLockOnPageHide)}}async getTokenWithPopup(e={},n={}){var i,r;const s=Object.assign(Object.assign({},e),{authorizationParams:Object.assign(Object.assign(Object.assign({},this.options.authorizationParams),e.authorizationParams),{scope:La(this.scope,(i=e.authorizationParams)===null||i===void 0?void 0:i.scope,((r=e.authorizationParams)===null||r===void 0?void 0:r.audience)||this.options.authorizationParams.audience)})});return n=Object.assign(Object.assign({},OS),n),await this.loginWithPopup(s,n),(await this.cacheManager.get(new Tn({scope:s.authorizationParams.scope,audience:s.authorizationParams.audience||"default",clientId:this.options.clientId}),void 0,this.options.useMrrt)).access_token}async isAuthenticated(){return!!await this.getUser()}_buildLogoutUrl(e){e.clientId!==null?e.clientId=e.clientId||this.options.clientId:delete e.clientId;const n=e.logoutParams||{},{federated:i}=n,r=Zn(n,["federated"]),s=i?"&federated":"";return this._url(`/v2/logout?${Od(Object.assign({clientId:e.clientId},r))}`)+s}async logout(e={}){var n;const i=Vp(e),{openUrl:r}=i,s=Zn(i,["openUrl"]);e.clientId===null?await this.cacheManager.clear():await this.cacheManager.clear(e.clientId||this.options.clientId),this.cookieStorage.remove(this.orgHintCookieName,{cookieDomain:this.options.cookieDomain}),this.cookieStorage.remove(this.isAuthenticatedCookieName,{cookieDomain:this.options.cookieDomain}),this.userCache.remove("@@user@@"),await((n=this.dpop)===null||n===void 0?void 0:n.clear());const o=this._buildLogoutUrl(s);r?await r(o):r!==!1&&window.location.assign(o)}async _getTokenFromIFrame(e){const n=Object.assign(Object.assign({},e.authorizationParams),{prompt:"none"}),i=this.cookieStorage.get(this.orgHintCookieName);i&&!n.organization&&(n.organization=i);const{url:r,state:s,nonce:o,code_verifier:a,redirect_uri:l,scope:c,audience:u}=await this._prepareAuthorizeUrl(n,{response_mode:"web_message"},window.location.origin);try{if(window.crossOriginIsolated)throw new mt("login_required","The application is running in a Cross-Origin Isolated context, silently retrieving a token without refresh token is not possible.");const d=e.timeoutInSeconds||this.options.authorizeTimeoutInSeconds;let h;try{h=new URL(this.domainUrl).origin}catch{h=this.domainUrl}const p=await((y,m,f=60)=>new Promise((v,g)=>{const x=window.document.createElement("iframe");x.setAttribute("width","0"),x.setAttribute("height","0"),x.style.display="none";const R=()=>{window.document.body.contains(x)&&(window.document.body.removeChild(x),window.removeEventListener("message",C,!1))};let C;const A=setTimeout(()=>{g(new qo),R()},1e3*f);C=function(N){if(N.origin!=m||!N.data||N.data.type!=="authorization_response")return;const E=N.source;E&&E.close(),N.data.response.error?g(mt.fromPayload(N.data.response)):v(N.data.response),clearTimeout(A),window.removeEventListener("message",C,!1),setTimeout(R,2e3)},window.addEventListener("message",C,!1),window.document.body.appendChild(x),x.setAttribute("src",y)}))(r,h,d);if(s!==p.state)throw new mt("state_mismatch","Invalid state");const _=await this._requestToken(Object.assign(Object.assign({},e.authorizationParams),{code_verifier:a,code:p.code,grant_type:"authorization_code",redirect_uri:l,timeout:e.authorizationParams.timeout||this.httpTimeoutMs}),{nonceIn:o,organization:n.organization});return Object.assign(Object.assign({},_),{scope:c,oauthTokenScope:_.scope,audience:u})}catch(d){throw d.error==="login_required"&&this.logout({openUrl:!1}),d}}async _getTokenUsingRefreshToken(e){const n=await this.cacheManager.get(new Tn({scope:e.authorizationParams.scope,audience:e.authorizationParams.audience||"default",clientId:this.options.clientId}),void 0,this.options.useMrrt);if(!(n&&n.refresh_token||this.worker)){if(this.options.useRefreshTokensFallback)return await this._getTokenFromIFrame(e);throw new yc(e.authorizationParams.audience||"default",e.authorizationParams.scope)}const i=e.authorizationParams.redirect_uri||this.options.authorizationParams.redirect_uri||window.location.origin,r=typeof e.timeoutInSeconds=="number"?1e3*e.timeoutInSeconds:null,s=((u,d,h,p)=>{var _;if(u&&h&&p){if(d.audience!==h)return d.scope;const y=p.split(" "),m=((_=d.scope)===null||_===void 0?void 0:_.split(" "))||[],f=m.every(v=>y.includes(v));return y.length>=m.length&&f?p:d.scope}return d.scope})(this.options.useMrrt,e.authorizationParams,n==null?void 0:n.audience,n==null?void 0:n.scope);try{const u=await this._requestToken(Object.assign(Object.assign(Object.assign({},e.authorizationParams),{grant_type:"refresh_token",refresh_token:n&&n.refresh_token,redirect_uri:i}),r&&{timeout:r}),{scopesToRequest:s});if(u.refresh_token&&this.options.useMrrt&&(n!=null&&n.refresh_token)&&await this.cacheManager.updateEntry(n.refresh_token,u.refresh_token),this.options.useMrrt&&(o=n==null?void 0:n.audience,a=n==null?void 0:n.scope,l=e.authorizationParams.audience,c=e.authorizationParams.scope,(o!==l||!Wp(c,a))&&!Wp(s,u.scope))){if(this.options.useRefreshTokensFallback)return await this._getTokenFromIFrame(e);await this.cacheManager.remove(this.options.clientId,e.authorizationParams.audience,e.authorizationParams.scope);const d=((h,p)=>{const _=(h==null?void 0:h.split(" "))||[],y=(p==null?void 0:p.split(" "))||[];return _.filter(m=>y.indexOf(m)==-1).join(",")})(s,u.scope);throw new eh(e.authorizationParams.audience||"default",d)}return Object.assign(Object.assign({},u),{scope:e.authorizationParams.scope,oauthTokenScope:u.scope,audience:e.authorizationParams.audience||"default"})}catch(u){if((u.message.indexOf("Missing Refresh Token")>-1||u.message&&u.message.indexOf("invalid refresh token")>-1)&&this.options.useRefreshTokensFallback)return await this._getTokenFromIFrame(e);throw u}var o,a,l,c}async _saveEntryInCache(e){const{id_token:n,decodedToken:i}=e,r=Zn(e,["id_token","decodedToken"]);this.userCache.set("@@user@@",{id_token:n,decodedToken:i}),await this.cacheManager.setIdToken(this.options.clientId,e.id_token,e.decodedToken),await this.cacheManager.set(r)}async _getIdTokenFromCache(){const e=this.options.authorizationParams.audience||"default",n=this.scope[e],i=await this.cacheManager.getIdToken(new Tn({clientId:this.options.clientId,audience:e,scope:n})),r=this.userCache.get("@@user@@");return i&&i.id_token===(r==null?void 0:r.id_token)?r:(this.userCache.set("@@user@@",i),i)}async _getEntryFromCache({scope:e,audience:n,clientId:i,cacheMode:r}){const s=await this.cacheManager.get(new Tn({scope:e,audience:n,clientId:i}),60,this.options.useMrrt,r);if(s&&s.access_token){const{token_type:o,access_token:a,oauthTokenScope:l,expires_in:c}=s,u=await this._getIdTokenFromCache();return u&&Object.assign(Object.assign({id_token:u.id_token,token_type:o||"Bearer",access_token:a},l?{scope:l}:null),{expires_in:c})}}async _requestToken(e,n){const{nonceIn:i,organization:r,scopesToRequest:s}=n||{},o=await QS(Object.assign(Object.assign({baseUrl:this.domainUrl,client_id:this.options.clientId,auth0Client:this.options.auth0Client,useFormData:this.options.useFormData,timeout:this.httpTimeoutMs,useMrrt:this.options.useMrrt,dpop:this.dpop},e),{scope:s||e.scope}),this.worker),a=await this._verifyIdToken(o.id_token,i,r);return await this._saveEntryInCache(Object.assign(Object.assign(Object.assign(Object.assign({},o),{decodedToken:a,scope:e.scope,audience:e.audience||"default"}),o.scope?{oauthTokenScope:o.scope}:null),{client_id:this.options.clientId})),this.cookieStorage.save(this.isAuthenticatedCookieName,!0,{daysUntilExpire:this.sessionCheckExpiryDays,cookieDomain:this.options.cookieDomain}),this._processOrgHint(r||a.claims.org_id),Object.assign(Object.assign({},o),{decodedToken:a})}async exchangeToken(e){return this._requestToken({grant_type:"urn:ietf:params:oauth:grant-type:token-exchange",subject_token:e.subject_token,subject_token_type:e.subject_token_type,scope:La(this.scope,e.scope,e.audience||this.options.authorizationParams.audience),audience:e.audience||this.options.authorizationParams.audience,organization:e.organization||this.options.authorizationParams.organization})}_assertDpop(e){if(!e)throw new Error("`useDpop` option must be enabled before using DPoP.")}getDpopNonce(e){return this._assertDpop(this.dpop),this.dpop.getNonce(e)}setDpopNonce(e,n){return this._assertDpop(this.dpop),this.dpop.setNonce(e,n)}generateDpopProof(e){return this._assertDpop(this.dpop),this.dpop.generateProof(e)}createFetcher(e={}){return new pE(e,{isDpopEnabled:()=>!!this.options.useDpop,getAccessToken:n=>{var i;return this.getTokenSilently({authorizationParams:{scope:(i=n==null?void 0:n.scope)===null||i===void 0?void 0:i.join(" "),audience:n==null?void 0:n.audience},detailedResponse:!0})},getDpopNonce:()=>this.getDpopNonce(e.dpopNonceId),setDpopNonce:n=>this.setDpopNonce(n,e.dpopNonceId),generateDpopProof:n=>this.generateDpopProof(n)})}async connectAccountWithRedirect(e){const{openUrl:n,appState:i,connection:r,scopes:s,authorization_params:o,redirectUri:a=this.options.authorizationParams.redirect_uri||window.location.origin}=e;if(!r)throw new Error("connection is required");const l=ou(oo()),c=oo(),u=await Ip(c),d=kp(u),{connect_uri:h,connect_params:p,auth_session:_}=await this.myAccountApi.connectAccount({connection:r,scopes:s,redirect_uri:a,state:l,code_challenge:d,code_challenge_method:"S256",authorization_params:o});this.transactionManager.create({state:l,code_verifier:c,auth_session:_,redirect_uri:a,appState:i,connection:r,response_type:Bi.ConnectCode});const y=new URL(h);y.searchParams.set("ticket",p.ticket),n?await n(y.toString()):window.location.assign(y)}}var X_={isAuthenticated:!1,isLoading:!0,error:void 0,user:void 0},Xt=function(){throw new Error("You forgot to wrap your component in <Auth0Provider>.")},vE=Rt(Rt({},X_),{buildAuthorizeUrl:Xt,buildLogoutUrl:Xt,getAccessTokenSilently:Xt,getAccessTokenWithPopup:Xt,getIdTokenClaims:Xt,exchangeToken:Xt,loginWithRedirect:Xt,loginWithPopup:Xt,connectAccountWithRedirect:Xt,logout:Xt,handleRedirectCallback:Xt,getDpopNonce:Xt,setDpopNonce:Xt,generateDpopProof:Xt,createFetcher:Xt}),$_=L.createContext(vE),jp=function(t){NS(e,t);function e(n,i){var r=t.call(this,i??n)||this;return r.error=n,r.error_description=i,Object.setPrototypeOf(r,e.prototype),r}return e}(Error),_E=/[?&](?:connect_)?code=[^&]+/,yE=/[?&]state=[^&]+/,xE=/[?&]error=[^&]+/,SE=function(t){return t===void 0&&(t=window.location.search),(_E.test(t)||xE.test(t))&&yE.test(t)},K_=function(t){return function(e){if(e instanceof Error)return e;if(e!==null&&typeof e=="object"&&"error"in e&&typeof e.error=="string"){if("error_description"in e&&typeof e.error_description=="string"){var n=e;return new jp(n.error,n.error_description)}var i=e;return new jp(i.error)}return new Error(t)}},Xp=K_("Login failed"),Da=K_("Get access token failed"),Y_=function(t){var e,n;t!=null&&t.redirectUri&&(console.warn("Using `redirectUri` has been deprecated, please use `authorizationParams.redirect_uri` instead as `redirectUri` will be no longer supported in a future version"),t.authorizationParams=(e=t.authorizationParams)!==null&&e!==void 0?e:{},t.authorizationParams.redirect_uri=t.redirectUri,delete t.redirectUri),!((n=t==null?void 0:t.authorizationParams)===null||n===void 0)&&n.redirectUri&&(console.warn("Using `authorizationParams.redirectUri` has been deprecated, please use `authorizationParams.redirect_uri` instead as `authorizationParams.redirectUri` will be removed in a future version"),t.authorizationParams.redirect_uri=t.authorizationParams.redirectUri,delete t.authorizationParams.redirectUri)},EE=function(t,e){switch(e.type){case"LOGIN_POPUP_STARTED":return Rt(Rt({},t),{isLoading:!0});case"LOGIN_POPUP_COMPLETE":case"INITIALISED":return Rt(Rt({},t),{isAuthenticated:!!e.user,user:e.user,isLoading:!1,error:void 0});case"HANDLE_REDIRECT_COMPLETE":case"GET_ACCESS_TOKEN_COMPLETE":return t.user===e.user?t:Rt(Rt({},t),{isAuthenticated:!!e.user,user:e.user});case"LOGOUT":return Rt(Rt({},t),{isAuthenticated:!1,user:void 0});case"ERROR":return Rt(Rt({},t),{isLoading:!1,error:e.error})}},ME=function(t){return Y_(t),Rt(Rt({},t),{auth0Client:{name:"auth0-react",version:"2.11.0"}})},wE=function(t){var e;window.history.replaceState({},document.title,(e=t.returnTo)!==null&&e!==void 0?e:window.location.pathname)},TE=function(t){var e=t.children,n=t.skipRedirectCallback,i=t.onRedirectCallback,r=i===void 0?wE:i,s=t.context,o=s===void 0?$_:s,a=Up(t,["children","skipRedirectCallback","onRedirectCallback","context"]),l=L.useState(function(){return new gE(ME(a))})[0],c=L.useReducer(EE,X_),u=c[0],d=c[1],h=L.useRef(!1),p=L.useCallback(function(z){return d({type:"ERROR",error:z}),z},[]);L.useEffect(function(){h.current||(h.current=!0,function(){return dr(void 0,void 0,void 0,function(){var z,q,b,U,F,Y,D;return fr(this,function(k){switch(k.label){case 0:return k.trys.push([0,7,,8]),z=void 0,SE()&&!n?[4,l.handleRedirectCallback()]:[3,3];case 1:return q=k.sent(),b=q.appState,U=b===void 0?{}:b,F=q.response_type,Y=Up(q,["appState","response_type"]),[4,l.getUser()];case 2:return z=k.sent(),U.response_type=F,F===Bi.ConnectCode&&(U.connectedAccount=Y),r(U,z),[3,6];case 3:return[4,l.checkSession()];case 4:return k.sent(),[4,l.getUser()];case 5:z=k.sent(),k.label=6;case 6:return d({type:"INITIALISED",user:z}),[3,8];case 7:return D=k.sent(),p(Xp(D)),[3,8];case 8:return[2]}})})}())},[l,r,n,p]);var _=L.useCallback(function(z){return Y_(z),l.loginWithRedirect(z)},[l]),y=L.useCallback(function(z,q){return dr(void 0,void 0,void 0,function(){var b,U;return fr(this,function(F){switch(F.label){case 0:d({type:"LOGIN_POPUP_STARTED"}),F.label=1;case 1:return F.trys.push([1,3,,4]),[4,l.loginWithPopup(z,q)];case 2:return F.sent(),[3,4];case 3:return b=F.sent(),p(Xp(b)),[2];case 4:return[4,l.getUser()];case 5:return U=F.sent(),d({type:"LOGIN_POPUP_COMPLETE",user:U}),[2]}})})},[l,p]),m=L.useCallback(function(){for(var z=[],q=0;q<arguments.length;q++)z[q]=arguments[q];return dr(void 0,US([],z),void 0,function(b){return b===void 0&&(b={}),fr(this,function(U){switch(U.label){case 0:return[4,l.logout(b)];case 1:return U.sent(),(b.openUrl||b.openUrl===!1)&&d({type:"LOGOUT"}),[2]}})})},[l]),f=L.useCallback(function(z){return dr(void 0,void 0,void 0,function(){var q,b,U,F;return fr(this,function(Y){switch(Y.label){case 0:return Y.trys.push([0,2,3,5]),[4,l.getTokenSilently(z)];case 1:return q=Y.sent(),[3,5];case 2:throw b=Y.sent(),Da(b);case 3:return U=d,F={type:"GET_ACCESS_TOKEN_COMPLETE"},[4,l.getUser()];case 4:return U.apply(void 0,[(F.user=Y.sent(),F)]),[7];case 5:return[2,q]}})})},[l]),v=L.useCallback(function(z,q){return dr(void 0,void 0,void 0,function(){var b,U,F,Y;return fr(this,function(D){switch(D.label){case 0:return D.trys.push([0,2,3,5]),[4,l.getTokenWithPopup(z,q)];case 1:return b=D.sent(),[3,5];case 2:throw U=D.sent(),Da(U);case 3:return F=d,Y={type:"GET_ACCESS_TOKEN_COMPLETE"},[4,l.getUser()];case 4:return F.apply(void 0,[(Y.user=D.sent(),Y)]),[7];case 5:return[2,b]}})})},[l]),g=L.useCallback(function(z){return l.connectAccountWithRedirect(z)},[l]),x=L.useCallback(function(){return l.getIdTokenClaims()},[l]),R=L.useCallback(function(z){return dr(void 0,void 0,void 0,function(){var q,b,U,F;return fr(this,function(Y){switch(Y.label){case 0:return Y.trys.push([0,2,3,5]),[4,l.exchangeToken(z)];case 1:return q=Y.sent(),[3,5];case 2:throw b=Y.sent(),Da(b);case 3:return U=d,F={type:"GET_ACCESS_TOKEN_COMPLETE"},[4,l.getUser()];case 4:return U.apply(void 0,[(F.user=Y.sent(),F)]),[7];case 5:return[2,q]}})})},[l]),C=L.useCallback(function(z){return dr(void 0,void 0,void 0,function(){var q,b,U;return fr(this,function(F){switch(F.label){case 0:return F.trys.push([0,2,3,5]),[4,l.handleRedirectCallback(z)];case 1:return[2,F.sent()];case 2:throw q=F.sent(),Da(q);case 3:return b=d,U={type:"HANDLE_REDIRECT_COMPLETE"},[4,l.getUser()];case 4:return b.apply(void 0,[(U.user=F.sent(),U)]),[7];case 5:return[2]}})})},[l]),A=L.useCallback(function(z){return l.getDpopNonce(z)},[l]),N=L.useCallback(function(z,q){return l.setDpopNonce(z,q)},[l]),E=L.useCallback(function(z){return l.generateDpopProof(z)},[l]),w=L.useCallback(function(z){return l.createFetcher(z)},[l]),X=L.useMemo(function(){return Rt(Rt({},u),{getAccessTokenSilently:f,getAccessTokenWithPopup:v,getIdTokenClaims:x,exchangeToken:R,loginWithRedirect:_,loginWithPopup:y,connectAccountWithRedirect:g,logout:m,handleRedirectCallback:C,getDpopNonce:A,setDpopNonce:N,generateDpopProof:E,createFetcher:w})},[u,f,v,x,R,_,y,g,m,C,A,N,E,w]);return Ug.createElement(o.Provider,{value:X},e)},AE=function(t){return t===void 0&&(t=$_),L.useContext(t)};/**
 * react-router v7.11.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var $p="popstate";function CE(t={}){function e(i,r){let{pathname:s,search:o,hash:a}=i.location;return Fd("",{pathname:s,search:o,hash:a},r.state&&r.state.usr||null,r.state&&r.state.key||"default")}function n(i,r){return typeof r=="string"?r:Zo(r)}return bE(e,n,null,t)}function dt(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function $n(t,e){if(!t){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function RE(){return Math.random().toString(36).substring(2,10)}function Kp(t,e){return{usr:t.state,key:t.key,idx:e}}function Fd(t,e,n=null,i){return{pathname:typeof t=="string"?t:t.pathname,search:"",hash:"",...typeof e=="string"?Xs(e):e,state:n,key:e&&e.key||i||RE()}}function Zo({pathname:t="/",search:e="",hash:n=""}){return e&&e!=="?"&&(t+=e.charAt(0)==="?"?e:"?"+e),n&&n!=="#"&&(t+=n.charAt(0)==="#"?n:"#"+n),t}function Xs(t){let e={};if(t){let n=t.indexOf("#");n>=0&&(e.hash=t.substring(n),t=t.substring(0,n));let i=t.indexOf("?");i>=0&&(e.search=t.substring(i),t=t.substring(0,i)),t&&(e.pathname=t)}return e}function bE(t,e,n,i={}){let{window:r=document.defaultView,v5Compat:s=!1}=i,o=r.history,a="POP",l=null,c=u();c==null&&(c=0,o.replaceState({...o.state,idx:c},""));function u(){return(o.state||{idx:null}).idx}function d(){a="POP";let m=u(),f=m==null?null:m-c;c=m,l&&l({action:a,location:y.location,delta:f})}function h(m,f){a="PUSH";let v=Fd(y.location,m,f);c=u()+1;let g=Kp(v,c),x=y.createHref(v);try{o.pushState(g,"",x)}catch(R){if(R instanceof DOMException&&R.name==="DataCloneError")throw R;r.location.assign(x)}s&&l&&l({action:a,location:y.location,delta:1})}function p(m,f){a="REPLACE";let v=Fd(y.location,m,f);c=u();let g=Kp(v,c),x=y.createHref(v);o.replaceState(g,"",x),s&&l&&l({action:a,location:y.location,delta:0})}function _(m){return PE(m)}let y={get action(){return a},get location(){return t(r,o)},listen(m){if(l)throw new Error("A history only accepts one active listener");return r.addEventListener($p,d),l=m,()=>{r.removeEventListener($p,d),l=null}},createHref(m){return e(r,m)},createURL:_,encodeLocation(m){let f=_(m);return{pathname:f.pathname,search:f.search,hash:f.hash}},push:h,replace:p,go(m){return o.go(m)}};return y}function PE(t,e=!1){let n="http://localhost";typeof window<"u"&&(n=window.location.origin!=="null"?window.location.origin:window.location.href),dt(n,"No window.location.(origin|href) available to create URL");let i=typeof t=="string"?t:Zo(t);return i=i.replace(/ $/,"%20"),!e&&i.startsWith("//")&&(i=n+i),new URL(i,n)}function q_(t,e,n="/"){return LE(t,e,n,!1)}function LE(t,e,n,i){let r=typeof e=="string"?Xs(e):e,s=Ai(r.pathname||"/",n);if(s==null)return null;let o=Z_(t);DE(o);let a=null;for(let l=0;a==null&&l<o.length;++l){let c=VE(s);a=HE(o[l],c,i)}return a}function Z_(t,e=[],n=[],i="",r=!1){let s=(o,a,l=r,c)=>{let u={relativePath:c===void 0?o.path||"":c,caseSensitive:o.caseSensitive===!0,childrenIndex:a,route:o};if(u.relativePath.startsWith("/")){if(!u.relativePath.startsWith(i)&&l)return;dt(u.relativePath.startsWith(i),`Absolute route path "${u.relativePath}" nested under path "${i}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),u.relativePath=u.relativePath.slice(i.length)}let d=_i([i,u.relativePath]),h=n.concat(u);o.children&&o.children.length>0&&(dt(o.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${d}".`),Z_(o.children,e,h,d,l)),!(o.path==null&&!o.index)&&e.push({path:d,score:zE(d,o.index),routesMeta:h})};return t.forEach((o,a)=>{var l;if(o.path===""||!((l=o.path)!=null&&l.includes("?")))s(o,a);else for(let c of J_(o.path))s(o,a,!0,c)}),e}function J_(t){let e=t.split("/");if(e.length===0)return[];let[n,...i]=e,r=n.endsWith("?"),s=n.replace(/\?$/,"");if(i.length===0)return r?[s,""]:[s];let o=J_(i.join("/")),a=[];return a.push(...o.map(l=>l===""?s:[s,l].join("/"))),r&&a.push(...o),a.map(l=>t.startsWith("/")&&l===""?"/":l)}function DE(t){t.sort((e,n)=>e.score!==n.score?n.score-e.score:BE(e.routesMeta.map(i=>i.childrenIndex),n.routesMeta.map(i=>i.childrenIndex)))}var NE=/^:[\w-]+$/,UE=3,IE=2,OE=1,kE=10,FE=-2,Yp=t=>t==="*";function zE(t,e){let n=t.split("/"),i=n.length;return n.some(Yp)&&(i+=FE),e&&(i+=IE),n.filter(r=>!Yp(r)).reduce((r,s)=>r+(NE.test(s)?UE:s===""?OE:kE),i)}function BE(t,e){return t.length===e.length&&t.slice(0,-1).every((i,r)=>i===e[r])?t[t.length-1]-e[e.length-1]:0}function HE(t,e,n=!1){let{routesMeta:i}=t,r={},s="/",o=[];for(let a=0;a<i.length;++a){let l=i[a],c=a===i.length-1,u=s==="/"?e:e.slice(s.length)||"/",d=$l({path:l.relativePath,caseSensitive:l.caseSensitive,end:c},u),h=l.route;if(!d&&c&&n&&!i[i.length-1].route.index&&(d=$l({path:l.relativePath,caseSensitive:l.caseSensitive,end:!1},u)),!d)return null;Object.assign(r,d.params),o.push({params:r,pathname:_i([s,d.pathname]),pathnameBase:$E(_i([s,d.pathnameBase])),route:h}),d.pathnameBase!=="/"&&(s=_i([s,d.pathnameBase]))}return o}function $l(t,e){typeof t=="string"&&(t={path:t,caseSensitive:!1,end:!0});let[n,i]=GE(t.path,t.caseSensitive,t.end),r=e.match(n);if(!r)return null;let s=r[0],o=s.replace(/(.)\/+$/,"$1"),a=r.slice(1);return{params:i.reduce((c,{paramName:u,isOptional:d},h)=>{if(u==="*"){let _=a[h]||"";o=s.slice(0,s.length-_.length).replace(/(.)\/+$/,"$1")}const p=a[h];return d&&!p?c[u]=void 0:c[u]=(p||"").replace(/%2F/g,"/"),c},{}),pathname:s,pathnameBase:o,pattern:t}}function GE(t,e=!1,n=!0){$n(t==="*"||!t.endsWith("*")||t.endsWith("/*"),`Route path "${t}" will be treated as if it were "${t.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${t.replace(/\*$/,"/*")}".`);let i=[],r="^"+t.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,a,l)=>(i.push({paramName:a,isOptional:l!=null}),l?"/?([^\\/]+)?":"/([^\\/]+)")).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return t.endsWith("*")?(i.push({paramName:"*"}),r+=t==="*"||t==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?r+="\\/*$":t!==""&&t!=="/"&&(r+="(?:(?=\\/|$))"),[new RegExp(r,e?void 0:"i"),i]}function VE(t){try{return t.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return $n(!1,`The URL path "${t}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${e}).`),t}}function Ai(t,e){if(e==="/")return t;if(!t.toLowerCase().startsWith(e.toLowerCase()))return null;let n=e.endsWith("/")?e.length-1:e.length,i=t.charAt(n);return i&&i!=="/"?null:t.slice(n)||"/"}var Q_=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,WE=t=>Q_.test(t);function jE(t,e="/"){let{pathname:n,search:i="",hash:r=""}=typeof t=="string"?Xs(t):t,s;if(n)if(WE(n))s=n;else{if(n.includes("//")){let o=n;n=n.replace(/\/\/+/g,"/"),$n(!1,`Pathnames cannot have embedded double slashes - normalizing ${o} -> ${n}`)}n.startsWith("/")?s=qp(n.substring(1),"/"):s=qp(n,e)}else s=e;return{pathname:s,search:KE(i),hash:YE(r)}}function qp(t,e){let n=e.replace(/\/+$/,"").split("/");return t.split("/").forEach(r=>{r===".."?n.length>1&&n.pop():r!=="."&&n.push(r)}),n.length>1?n.join("/"):"/"}function uu(t,e,n,i){return`Cannot include a '${t}' character in a manually specified \`to.${e}\` field [${JSON.stringify(i)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function XE(t){return t.filter((e,n)=>n===0||e.route.path&&e.route.path.length>0)}function e0(t){let e=XE(t);return e.map((n,i)=>i===e.length-1?n.pathname:n.pathnameBase)}function t0(t,e,n,i=!1){let r;typeof t=="string"?r=Xs(t):(r={...t},dt(!r.pathname||!r.pathname.includes("?"),uu("?","pathname","search",r)),dt(!r.pathname||!r.pathname.includes("#"),uu("#","pathname","hash",r)),dt(!r.search||!r.search.includes("#"),uu("#","search","hash",r)));let s=t===""||r.pathname==="",o=s?"/":r.pathname,a;if(o==null)a=n;else{let d=e.length-1;if(!i&&o.startsWith("..")){let h=o.split("/");for(;h[0]==="..";)h.shift(),d-=1;r.pathname=h.join("/")}a=d>=0?e[d]:"/"}let l=jE(r,a),c=o&&o!=="/"&&o.endsWith("/"),u=(s||o===".")&&n.endsWith("/");return!l.pathname.endsWith("/")&&(c||u)&&(l.pathname+="/"),l}var _i=t=>t.join("/").replace(/\/\/+/g,"/"),$E=t=>t.replace(/\/+$/,"").replace(/^\/*/,"/"),KE=t=>!t||t==="?"?"":t.startsWith("?")?t:"?"+t,YE=t=>!t||t==="#"?"":t.startsWith("#")?t:"#"+t,qE=class{constructor(t,e,n,i=!1){this.status=t,this.statusText=e||"",this.internal=i,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function ZE(t){return t!=null&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.internal=="boolean"&&"data"in t}function JE(t){return t.map(e=>e.route.path).filter(Boolean).join("/").replace(/\/\/*/g,"/")||"/"}var n0=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function i0(t,e){let n=t;if(typeof n!="string"||!Q_.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let i=n,r=!1;if(n0)try{let s=new URL(window.location.href),o=n.startsWith("//")?new URL(s.protocol+n):new URL(n),a=Ai(o.pathname,e);o.origin===s.origin&&a!=null?n=a+o.search+o.hash:r=!0}catch{$n(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:i,isExternal:r,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var r0=["POST","PUT","PATCH","DELETE"];new Set(r0);var QE=["GET",...r0];new Set(QE);var $s=L.createContext(null);$s.displayName="DataRouter";var Sc=L.createContext(null);Sc.displayName="DataRouterState";var eM=L.createContext(!1),s0=L.createContext({isTransitioning:!1});s0.displayName="ViewTransition";var tM=L.createContext(new Map);tM.displayName="Fetchers";var nM=L.createContext(null);nM.displayName="Await";var Ln=L.createContext(null);Ln.displayName="Navigation";var sa=L.createContext(null);sa.displayName="Location";var bi=L.createContext({outlet:null,matches:[],isDataRoute:!1});bi.displayName="Route";var th=L.createContext(null);th.displayName="RouteError";var o0="REACT_ROUTER_ERROR",iM="REDIRECT",rM="ROUTE_ERROR_RESPONSE";function sM(t){if(t.startsWith(`${o0}:${iM}:{`))try{let e=JSON.parse(t.slice(28));if(typeof e=="object"&&e&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.location=="string"&&typeof e.reloadDocument=="boolean"&&typeof e.replace=="boolean")return e}catch{}}function oM(t){if(t.startsWith(`${o0}:${rM}:{`))try{let e=JSON.parse(t.slice(40));if(typeof e=="object"&&e&&typeof e.status=="number"&&typeof e.statusText=="string")return new qE(e.status,e.statusText,e.data)}catch{}}function aM(t,{relative:e}={}){dt(oa(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:i}=L.useContext(Ln),{hash:r,pathname:s,search:o}=aa(t,{relative:e}),a=s;return n!=="/"&&(a=s==="/"?n:_i([n,s])),i.createHref({pathname:a,search:o,hash:r})}function oa(){return L.useContext(sa)!=null}function ar(){return dt(oa(),"useLocation() may be used only in the context of a <Router> component."),L.useContext(sa).location}var a0="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function l0(t){L.useContext(Ln).static||L.useLayoutEffect(t)}function Ec(){let{isDataRoute:t}=L.useContext(bi);return t?xM():lM()}function lM(){dt(oa(),"useNavigate() may be used only in the context of a <Router> component.");let t=L.useContext($s),{basename:e,navigator:n}=L.useContext(Ln),{matches:i}=L.useContext(bi),{pathname:r}=ar(),s=JSON.stringify(e0(i)),o=L.useRef(!1);return l0(()=>{o.current=!0}),L.useCallback((l,c={})=>{if($n(o.current,a0),!o.current)return;if(typeof l=="number"){n.go(l);return}let u=t0(l,JSON.parse(s),r,c.relative==="path");t==null&&e!=="/"&&(u.pathname=u.pathname==="/"?e:_i([e,u.pathname])),(c.replace?n.replace:n.push)(u,c.state,c)},[e,n,s,r,t])}L.createContext(null);function aa(t,{relative:e}={}){let{matches:n}=L.useContext(bi),{pathname:i}=ar(),r=JSON.stringify(e0(n));return L.useMemo(()=>t0(t,JSON.parse(r),i,e==="path"),[t,r,i,e])}function cM(t,e){return c0(t,e)}function c0(t,e,n,i,r){var v;dt(oa(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:s}=L.useContext(Ln),{matches:o}=L.useContext(bi),a=o[o.length-1],l=a?a.params:{},c=a?a.pathname:"/",u=a?a.pathnameBase:"/",d=a&&a.route;{let g=d&&d.path||"";d0(c,!d||g.endsWith("*")||g.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${c}" (under <Route path="${g}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${g}"> to <Route path="${g==="/"?"*":`${g}/*`}">.`)}let h=ar(),p;if(e){let g=typeof e=="string"?Xs(e):e;dt(u==="/"||((v=g.pathname)==null?void 0:v.startsWith(u)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${u}" but pathname "${g.pathname}" was given in the \`location\` prop.`),p=g}else p=h;let _=p.pathname||"/",y=_;if(u!=="/"){let g=u.replace(/^\//,"").split("/");y="/"+_.replace(/^\//,"").split("/").slice(g.length).join("/")}let m=q_(t,{pathname:y});$n(d||m!=null,`No routes matched location "${p.pathname}${p.search}${p.hash}" `),$n(m==null||m[m.length-1].route.element!==void 0||m[m.length-1].route.Component!==void 0||m[m.length-1].route.lazy!==void 0,`Matched leaf route at location "${p.pathname}${p.search}${p.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let f=pM(m&&m.map(g=>Object.assign({},g,{params:Object.assign({},l,g.params),pathname:_i([u,s.encodeLocation?s.encodeLocation(g.pathname.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:g.pathname]),pathnameBase:g.pathnameBase==="/"?u:_i([u,s.encodeLocation?s.encodeLocation(g.pathnameBase.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:g.pathnameBase])})),o,n,i,r);return e&&f?L.createElement(sa.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...p},navigationType:"POP"}},f):f}function uM(){let t=yM(),e=ZE(t)?`${t.status} ${t.statusText}`:t instanceof Error?t.message:JSON.stringify(t),n=t instanceof Error?t.stack:null,i="rgba(200,200,200, 0.5)",r={padding:"0.5rem",backgroundColor:i},s={padding:"2px 4px",backgroundColor:i},o=null;return console.error("Error handled by React Router default ErrorBoundary:",t),o=L.createElement(L.Fragment,null,L.createElement("p",null,"💿 Hey developer 👋"),L.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",L.createElement("code",{style:s},"ErrorBoundary")," or"," ",L.createElement("code",{style:s},"errorElement")," prop on your route.")),L.createElement(L.Fragment,null,L.createElement("h2",null,"Unexpected Application Error!"),L.createElement("h3",{style:{fontStyle:"italic"}},e),n?L.createElement("pre",{style:r},n):null,o)}var dM=L.createElement(uM,null),u0=class extends L.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,e){return e.location!==t.location||e.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:e.error,location:e.location,revalidation:t.revalidation||e.revalidation}}componentDidCatch(t,e){this.props.onError?this.props.onError(t,e):console.error("React Router caught the following error during render",t)}render(){let t=this.state.error;if(this.context&&typeof t=="object"&&t&&"digest"in t&&typeof t.digest=="string"){const n=oM(t.digest);n&&(t=n)}let e=t!==void 0?L.createElement(bi.Provider,{value:this.props.routeContext},L.createElement(th.Provider,{value:t,children:this.props.component})):this.props.children;return this.context?L.createElement(fM,{error:t},e):e}};u0.contextType=eM;var du=new WeakMap;function fM({children:t,error:e}){let{basename:n}=L.useContext(Ln);if(typeof e=="object"&&e&&"digest"in e&&typeof e.digest=="string"){let i=sM(e.digest);if(i){let r=du.get(e);if(r)throw r;let s=i0(i.location,n);if(n0&&!du.get(e))if(s.isExternal||i.reloadDocument)window.location.href=s.absoluteURL||s.to;else{const o=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(s.to,{replace:i.replace}));throw du.set(e,o),o}return L.createElement("meta",{httpEquiv:"refresh",content:`0;url=${s.absoluteURL||s.to}`})}}return t}function hM({routeContext:t,match:e,children:n}){let i=L.useContext($s);return i&&i.static&&i.staticContext&&(e.route.errorElement||e.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=e.route.id),L.createElement(bi.Provider,{value:t},n)}function pM(t,e=[],n=null,i=null,r=null){if(t==null){if(!n)return null;if(n.errors)t=n.matches;else if(e.length===0&&!n.initialized&&n.matches.length>0)t=n.matches;else return null}let s=t,o=n==null?void 0:n.errors;if(o!=null){let u=s.findIndex(d=>d.route.id&&(o==null?void 0:o[d.route.id])!==void 0);dt(u>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(o).join(",")}`),s=s.slice(0,Math.min(s.length,u+1))}let a=!1,l=-1;if(n)for(let u=0;u<s.length;u++){let d=s[u];if((d.route.HydrateFallback||d.route.hydrateFallbackElement)&&(l=u),d.route.id){let{loaderData:h,errors:p}=n,_=d.route.loader&&!h.hasOwnProperty(d.route.id)&&(!p||p[d.route.id]===void 0);if(d.route.lazy||_){a=!0,l>=0?s=s.slice(0,l+1):s=[s[0]];break}}}let c=n&&i?(u,d)=>{var h,p;i(u,{location:n.location,params:((p=(h=n.matches)==null?void 0:h[0])==null?void 0:p.params)??{},unstable_pattern:JE(n.matches),errorInfo:d})}:void 0;return s.reduceRight((u,d,h)=>{let p,_=!1,y=null,m=null;n&&(p=o&&d.route.id?o[d.route.id]:void 0,y=d.route.errorElement||dM,a&&(l<0&&h===0?(d0("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),_=!0,m=null):l===h&&(_=!0,m=d.route.hydrateFallbackElement||null)));let f=e.concat(s.slice(0,h+1)),v=()=>{let g;return p?g=y:_?g=m:d.route.Component?g=L.createElement(d.route.Component,null):d.route.element?g=d.route.element:g=u,L.createElement(hM,{match:d,routeContext:{outlet:u,matches:f,isDataRoute:n!=null},children:g})};return n&&(d.route.ErrorBoundary||d.route.errorElement||h===0)?L.createElement(u0,{location:n.location,revalidation:n.revalidation,component:y,error:p,children:v(),routeContext:{outlet:null,matches:f,isDataRoute:!0},onError:c}):v()},null)}function nh(t){return`${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function mM(t){let e=L.useContext($s);return dt(e,nh(t)),e}function gM(t){let e=L.useContext(Sc);return dt(e,nh(t)),e}function vM(t){let e=L.useContext(bi);return dt(e,nh(t)),e}function ih(t){let e=vM(t),n=e.matches[e.matches.length-1];return dt(n.route.id,`${t} can only be used on routes that contain a unique "id"`),n.route.id}function _M(){return ih("useRouteId")}function yM(){var i;let t=L.useContext(th),e=gM("useRouteError"),n=ih("useRouteError");return t!==void 0?t:(i=e.errors)==null?void 0:i[n]}function xM(){let{router:t}=mM("useNavigate"),e=ih("useNavigate"),n=L.useRef(!1);return l0(()=>{n.current=!0}),L.useCallback(async(r,s={})=>{$n(n.current,a0),n.current&&(typeof r=="number"?await t.navigate(r):await t.navigate(r,{fromRouteId:e,...s}))},[t,e])}var Zp={};function d0(t,e,n){!e&&!Zp[t]&&(Zp[t]=!0,$n(!1,n))}L.memo(SM);function SM({routes:t,future:e,state:n,onError:i}){return c0(t,void 0,n,i,e)}function _o(t){dt(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function EM({basename:t="/",children:e=null,location:n,navigationType:i="POP",navigator:r,static:s=!1,unstable_useTransitions:o}){dt(!oa(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let a=t.replace(/^\/*/,"/"),l=L.useMemo(()=>({basename:a,navigator:r,static:s,unstable_useTransitions:o,future:{}}),[a,r,s,o]);typeof n=="string"&&(n=Xs(n));let{pathname:c="/",search:u="",hash:d="",state:h=null,key:p="default"}=n,_=L.useMemo(()=>{let y=Ai(c,a);return y==null?null:{location:{pathname:y,search:u,hash:d,state:h,key:p},navigationType:i}},[a,c,u,d,h,p,i]);return $n(_!=null,`<Router basename="${a}"> is not able to match the URL "${c}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`),_==null?null:L.createElement(Ln.Provider,{value:l},L.createElement(sa.Provider,{children:e,value:_}))}function MM({children:t,location:e}){return cM(zd(t),e)}function zd(t,e=[]){let n=[];return L.Children.forEach(t,(i,r)=>{if(!L.isValidElement(i))return;let s=[...e,r];if(i.type===L.Fragment){n.push.apply(n,zd(i.props.children,s));return}dt(i.type===_o,`[${typeof i.type=="string"?i.type:i.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),dt(!i.props.index||!i.props.children,"An index route cannot have child routes.");let o={id:i.props.id||s.join("-"),caseSensitive:i.props.caseSensitive,element:i.props.element,Component:i.props.Component,index:i.props.index,path:i.props.path,middleware:i.props.middleware,loader:i.props.loader,action:i.props.action,hydrateFallbackElement:i.props.hydrateFallbackElement,HydrateFallback:i.props.HydrateFallback,errorElement:i.props.errorElement,ErrorBoundary:i.props.ErrorBoundary,hasErrorBoundary:i.props.hasErrorBoundary===!0||i.props.ErrorBoundary!=null||i.props.errorElement!=null,shouldRevalidate:i.props.shouldRevalidate,handle:i.props.handle,lazy:i.props.lazy};i.props.children&&(o.children=zd(i.props.children,s)),n.push(o)}),n}var gl="get",vl="application/x-www-form-urlencoded";function Mc(t){return typeof HTMLElement<"u"&&t instanceof HTMLElement}function wM(t){return Mc(t)&&t.tagName.toLowerCase()==="button"}function TM(t){return Mc(t)&&t.tagName.toLowerCase()==="form"}function AM(t){return Mc(t)&&t.tagName.toLowerCase()==="input"}function CM(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}function RM(t,e){return t.button===0&&(!e||e==="_self")&&!CM(t)}var Na=null;function bM(){if(Na===null)try{new FormData(document.createElement("form"),0),Na=!1}catch{Na=!0}return Na}var PM=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function fu(t){return t!=null&&!PM.has(t)?($n(!1,`"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${vl}"`),null):t}function LM(t,e){let n,i,r,s,o;if(TM(t)){let a=t.getAttribute("action");i=a?Ai(a,e):null,n=t.getAttribute("method")||gl,r=fu(t.getAttribute("enctype"))||vl,s=new FormData(t)}else if(wM(t)||AM(t)&&(t.type==="submit"||t.type==="image")){let a=t.form;if(a==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let l=t.getAttribute("formaction")||a.getAttribute("action");if(i=l?Ai(l,e):null,n=t.getAttribute("formmethod")||a.getAttribute("method")||gl,r=fu(t.getAttribute("formenctype"))||fu(a.getAttribute("enctype"))||vl,s=new FormData(a,t),!bM()){let{name:c,type:u,value:d}=t;if(u==="image"){let h=c?`${c}.`:"";s.append(`${h}x`,"0"),s.append(`${h}y`,"0")}else c&&s.append(c,d)}}else{if(Mc(t))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=gl,i=null,r=vl,o=t}return s&&r==="text/plain"&&(o=s,s=void 0),{action:i,method:n.toLowerCase(),encType:r,formData:s,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function rh(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function DM(t,e,n){let i=typeof t=="string"?new URL(t,typeof window>"u"?"server://singlefetch/":window.location.origin):t;return i.pathname==="/"?i.pathname=`_root.${n}`:e&&Ai(i.pathname,e)==="/"?i.pathname=`${e.replace(/\/$/,"")}/_root.${n}`:i.pathname=`${i.pathname.replace(/\/$/,"")}.${n}`,i}async function NM(t,e){if(t.id in e)return e[t.id];try{let n=await import(t.module);return e[t.id]=n,n}catch(n){return console.error(`Error loading route module \`${t.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function UM(t){return t==null?!1:t.href==null?t.rel==="preload"&&typeof t.imageSrcSet=="string"&&typeof t.imageSizes=="string":typeof t.rel=="string"&&typeof t.href=="string"}async function IM(t,e,n){let i=await Promise.all(t.map(async r=>{let s=e.routes[r.route.id];if(s){let o=await NM(s,n);return o.links?o.links():[]}return[]}));return zM(i.flat(1).filter(UM).filter(r=>r.rel==="stylesheet"||r.rel==="preload").map(r=>r.rel==="stylesheet"?{...r,rel:"prefetch",as:"style"}:{...r,rel:"prefetch"}))}function Jp(t,e,n,i,r,s){let o=(l,c)=>n[c]?l.route.id!==n[c].route.id:!0,a=(l,c)=>{var u;return n[c].pathname!==l.pathname||((u=n[c].route.path)==null?void 0:u.endsWith("*"))&&n[c].params["*"]!==l.params["*"]};return s==="assets"?e.filter((l,c)=>o(l,c)||a(l,c)):s==="data"?e.filter((l,c)=>{var d;let u=i.routes[l.route.id];if(!u||!u.hasLoader)return!1;if(o(l,c)||a(l,c))return!0;if(l.route.shouldRevalidate){let h=l.route.shouldRevalidate({currentUrl:new URL(r.pathname+r.search+r.hash,window.origin),currentParams:((d=n[0])==null?void 0:d.params)||{},nextUrl:new URL(t,window.origin),nextParams:l.params,defaultShouldRevalidate:!0});if(typeof h=="boolean")return h}return!0}):[]}function OM(t,e,{includeHydrateFallback:n}={}){return kM(t.map(i=>{let r=e.routes[i.route.id];if(!r)return[];let s=[r.module];return r.clientActionModule&&(s=s.concat(r.clientActionModule)),r.clientLoaderModule&&(s=s.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(s=s.concat(r.hydrateFallbackModule)),r.imports&&(s=s.concat(r.imports)),s}).flat(1))}function kM(t){return[...new Set(t)]}function FM(t){let e={},n=Object.keys(t).sort();for(let i of n)e[i]=t[i];return e}function zM(t,e){let n=new Set;return new Set(e),t.reduce((i,r)=>{let s=JSON.stringify(FM(r));return n.has(s)||(n.add(s),i.push({key:s,link:r})),i},[])}function f0(){let t=L.useContext($s);return rh(t,"You must render this element inside a <DataRouterContext.Provider> element"),t}function BM(){let t=L.useContext(Sc);return rh(t,"You must render this element inside a <DataRouterStateContext.Provider> element"),t}var sh=L.createContext(void 0);sh.displayName="FrameworkContext";function h0(){let t=L.useContext(sh);return rh(t,"You must render this element inside a <HydratedRouter> element"),t}function HM(t,e){let n=L.useContext(sh),[i,r]=L.useState(!1),[s,o]=L.useState(!1),{onFocus:a,onBlur:l,onMouseEnter:c,onMouseLeave:u,onTouchStart:d}=e,h=L.useRef(null);L.useEffect(()=>{if(t==="render"&&o(!0),t==="viewport"){let y=f=>{f.forEach(v=>{o(v.isIntersecting)})},m=new IntersectionObserver(y,{threshold:.5});return h.current&&m.observe(h.current),()=>{m.disconnect()}}},[t]),L.useEffect(()=>{if(i){let y=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(y)}}},[i]);let p=()=>{r(!0)},_=()=>{r(!1),o(!1)};return n?t!=="intent"?[s,h,{}]:[s,h,{onFocus:lo(a,p),onBlur:lo(l,_),onMouseEnter:lo(c,p),onMouseLeave:lo(u,_),onTouchStart:lo(d,p)}]:[!1,h,{}]}function lo(t,e){return n=>{t&&t(n),n.defaultPrevented||e(n)}}function GM({page:t,...e}){let{router:n}=f0(),i=L.useMemo(()=>q_(n.routes,t,n.basename),[n.routes,t,n.basename]);return i?L.createElement(WM,{page:t,matches:i,...e}):null}function VM(t){let{manifest:e,routeModules:n}=h0(),[i,r]=L.useState([]);return L.useEffect(()=>{let s=!1;return IM(t,e,n).then(o=>{s||r(o)}),()=>{s=!0}},[t,e,n]),i}function WM({page:t,matches:e,...n}){let i=ar(),{manifest:r,routeModules:s}=h0(),{basename:o}=f0(),{loaderData:a,matches:l}=BM(),c=L.useMemo(()=>Jp(t,e,l,r,i,"data"),[t,e,l,r,i]),u=L.useMemo(()=>Jp(t,e,l,r,i,"assets"),[t,e,l,r,i]),d=L.useMemo(()=>{if(t===i.pathname+i.search+i.hash)return[];let _=new Set,y=!1;if(e.forEach(f=>{var g;let v=r.routes[f.route.id];!v||!v.hasLoader||(!c.some(x=>x.route.id===f.route.id)&&f.route.id in a&&((g=s[f.route.id])!=null&&g.shouldRevalidate)||v.hasClientLoader?y=!0:_.add(f.route.id))}),_.size===0)return[];let m=DM(t,o,"data");return y&&_.size>0&&m.searchParams.set("_routes",e.filter(f=>_.has(f.route.id)).map(f=>f.route.id).join(",")),[m.pathname+m.search]},[o,a,i,r,c,e,t,s]),h=L.useMemo(()=>OM(u,r),[u,r]),p=VM(u);return L.createElement(L.Fragment,null,d.map(_=>L.createElement("link",{key:_,rel:"prefetch",as:"fetch",href:_,...n})),h.map(_=>L.createElement("link",{key:_,rel:"modulepreload",href:_,...n})),p.map(({key:_,link:y})=>L.createElement("link",{key:_,nonce:n.nonce,...y})))}function jM(...t){return e=>{t.forEach(n=>{typeof n=="function"?n(e):n!=null&&(n.current=e)})}}var XM=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{XM&&(window.__reactRouterVersion="7.11.0")}catch{}function $M({basename:t,children:e,unstable_useTransitions:n,window:i}){let r=L.useRef();r.current==null&&(r.current=CE({window:i,v5Compat:!0}));let s=r.current,[o,a]=L.useState({action:s.action,location:s.location}),l=L.useCallback(c=>{n===!1?a(c):L.startTransition(()=>a(c))},[n]);return L.useLayoutEffect(()=>s.listen(l),[s,l]),L.createElement(EM,{basename:t,children:e,location:o.location,navigationType:o.action,navigator:s,unstable_useTransitions:n})}var p0=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,m0=L.forwardRef(function({onClick:e,discover:n="render",prefetch:i="none",relative:r,reloadDocument:s,replace:o,state:a,target:l,to:c,preventScrollReset:u,viewTransition:d,unstable_defaultShouldRevalidate:h,...p},_){let{basename:y,unstable_useTransitions:m}=L.useContext(Ln),f=typeof c=="string"&&p0.test(c),v=i0(c,y);c=v.to;let g=aM(c,{relative:r}),[x,R,C]=HM(i,p),A=ZM(c,{replace:o,state:a,target:l,preventScrollReset:u,relative:r,viewTransition:d,unstable_defaultShouldRevalidate:h,unstable_useTransitions:m});function N(w){e&&e(w),w.defaultPrevented||A(w)}let E=L.createElement("a",{...p,...C,href:v.absoluteURL||g,onClick:v.isExternal||s?e:N,ref:jM(_,R),target:l,"data-discover":!f&&n==="render"?"true":void 0});return x&&!f?L.createElement(L.Fragment,null,E,L.createElement(GM,{page:g})):E});m0.displayName="Link";var KM=L.forwardRef(function({"aria-current":e="page",caseSensitive:n=!1,className:i="",end:r=!1,style:s,to:o,viewTransition:a,children:l,...c},u){let d=aa(o,{relative:c.relative}),h=ar(),p=L.useContext(Sc),{navigator:_,basename:y}=L.useContext(Ln),m=p!=null&&nw(d)&&a===!0,f=_.encodeLocation?_.encodeLocation(d).pathname:d.pathname,v=h.pathname,g=p&&p.navigation&&p.navigation.location?p.navigation.location.pathname:null;n||(v=v.toLowerCase(),g=g?g.toLowerCase():null,f=f.toLowerCase()),g&&y&&(g=Ai(g,y)||g);const x=f!=="/"&&f.endsWith("/")?f.length-1:f.length;let R=v===f||!r&&v.startsWith(f)&&v.charAt(x)==="/",C=g!=null&&(g===f||!r&&g.startsWith(f)&&g.charAt(f.length)==="/"),A={isActive:R,isPending:C,isTransitioning:m},N=R?e:void 0,E;typeof i=="function"?E=i(A):E=[i,R?"active":null,C?"pending":null,m?"transitioning":null].filter(Boolean).join(" ");let w=typeof s=="function"?s(A):s;return L.createElement(m0,{...c,"aria-current":N,className:E,ref:u,style:w,to:o,viewTransition:a},typeof l=="function"?l(A):l)});KM.displayName="NavLink";var YM=L.forwardRef(({discover:t="render",fetcherKey:e,navigate:n,reloadDocument:i,replace:r,state:s,method:o=gl,action:a,onSubmit:l,relative:c,preventScrollReset:u,viewTransition:d,unstable_defaultShouldRevalidate:h,...p},_)=>{let{unstable_useTransitions:y}=L.useContext(Ln),m=ew(),f=tw(a,{relative:c}),v=o.toLowerCase()==="get"?"get":"post",g=typeof a=="string"&&p0.test(a),x=R=>{if(l&&l(R),R.defaultPrevented)return;R.preventDefault();let C=R.nativeEvent.submitter,A=(C==null?void 0:C.getAttribute("formmethod"))||o,N=()=>m(C||R.currentTarget,{fetcherKey:e,method:A,navigate:n,replace:r,state:s,relative:c,preventScrollReset:u,viewTransition:d,unstable_defaultShouldRevalidate:h});y&&n!==!1?L.startTransition(()=>N()):N()};return L.createElement("form",{ref:_,method:v,action:f,onSubmit:i?l:x,...p,"data-discover":!g&&t==="render"?"true":void 0})});YM.displayName="Form";function qM(t){return`${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function g0(t){let e=L.useContext($s);return dt(e,qM(t)),e}function ZM(t,{target:e,replace:n,state:i,preventScrollReset:r,relative:s,viewTransition:o,unstable_defaultShouldRevalidate:a,unstable_useTransitions:l}={}){let c=Ec(),u=ar(),d=aa(t,{relative:s});return L.useCallback(h=>{if(RM(h,e)){h.preventDefault();let p=n!==void 0?n:Zo(u)===Zo(d),_=()=>c(t,{replace:p,state:i,preventScrollReset:r,relative:s,viewTransition:o,unstable_defaultShouldRevalidate:a});l?L.startTransition(()=>_()):_()}},[u,c,d,n,i,e,t,r,s,o,a,l])}var JM=0,QM=()=>`__${String(++JM)}__`;function ew(){let{router:t}=g0("useSubmit"),{basename:e}=L.useContext(Ln),n=_M(),i=t.fetch,r=t.navigate;return L.useCallback(async(s,o={})=>{let{action:a,method:l,encType:c,formData:u,body:d}=LM(s,e);if(o.navigate===!1){let h=o.fetcherKey||QM();await i(h,n,o.action||a,{unstable_defaultShouldRevalidate:o.unstable_defaultShouldRevalidate,preventScrollReset:o.preventScrollReset,formData:u,body:d,formMethod:o.method||l,formEncType:o.encType||c,flushSync:o.flushSync})}else await r(o.action||a,{unstable_defaultShouldRevalidate:o.unstable_defaultShouldRevalidate,preventScrollReset:o.preventScrollReset,formData:u,body:d,formMethod:o.method||l,formEncType:o.encType||c,replace:o.replace,state:o.state,fromRouteId:n,flushSync:o.flushSync,viewTransition:o.viewTransition})},[i,r,e,n])}function tw(t,{relative:e}={}){let{basename:n}=L.useContext(Ln),i=L.useContext(bi);dt(i,"useFormAction must be used inside a RouteContext");let[r]=i.matches.slice(-1),s={...aa(t||".",{relative:e})},o=ar();if(t==null){s.search=o.search;let a=new URLSearchParams(s.search),l=a.getAll("index");if(l.some(u=>u==="")){a.delete("index"),l.filter(d=>d).forEach(d=>a.append("index",d));let u=a.toString();s.search=u?`?${u}`:""}}return(!t||t===".")&&r.route.index&&(s.search=s.search?s.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(s.pathname=s.pathname==="/"?n:_i([n,s.pathname])),Zo(s)}function nw(t,{relative:e}={}){let n=L.useContext(s0);dt(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:i}=g0("useViewTransitionState"),r=aa(t,{relative:e});if(!n.isTransitioning)return!1;let s=Ai(n.currentLocation.pathname,i)||n.currentLocation.pathname,o=Ai(n.nextLocation.pathname,i)||n.nextLocation.pathname;return $l(r.pathname,o)!=null||$l(r.pathname,s)!=null}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const oh="160",iw=0,Qp=1,rw=2,v0=1,sw=2,ui=3,ir=0,ln=1,hi=2,yi=0,bs=1,Bd=2,em=3,tm=4,ow=5,wr=100,aw=101,lw=102,nm=103,im=104,cw=200,uw=201,dw=202,fw=203,Hd=204,Gd=205,hw=206,pw=207,mw=208,gw=209,vw=210,_w=211,yw=212,xw=213,Sw=214,Ew=0,Mw=1,ww=2,Kl=3,Tw=4,Aw=5,Cw=6,Rw=7,_0=0,bw=1,Pw=2,Qi=0,Lw=1,Dw=2,Nw=3,Uw=4,Iw=5,Ow=6,y0=300,Fs=301,zs=302,Vd=303,Wd=304,wc=306,jd=1e3,Hn=1001,Xd=1002,qt=1003,rm=1004,hu=1005,wn=1006,kw=1007,Jo=1008,er=1009,Fw=1010,zw=1011,ah=1012,x0=1013,Vi=1014,Wi=1015,xi=1016,S0=1017,E0=1018,Nr=1020,Bw=1021,Gn=1023,Hw=1024,Gw=1025,Ur=1026,Bs=1027,Vw=1028,M0=1029,Ww=1030,w0=1031,T0=1033,pu=33776,mu=33777,gu=33778,vu=33779,sm=35840,om=35841,am=35842,lm=35843,A0=36196,cm=37492,um=37496,dm=37808,fm=37809,hm=37810,pm=37811,mm=37812,gm=37813,vm=37814,_m=37815,ym=37816,xm=37817,Sm=37818,Em=37819,Mm=37820,wm=37821,_u=36492,Tm=36494,Am=36495,jw=36283,Cm=36284,Rm=36285,bm=36286,C0=3e3,Ir=3001,Xw=3200,$w=3201,Kw=0,Yw=1,An="",Dt="srgb",Ci="srgb-linear",lh="display-p3",Tc="display-p3-linear",Yl="linear",st="srgb",ql="rec709",Zl="p3",Wr=7680,Pm=519,qw=512,Zw=513,Jw=514,R0=515,Qw=516,eT=517,tT=518,nT=519,Lm=35044,Dm="300 es",$d=1035,gi=2e3,Jl=2001;class Ks{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Nm=1234567;const Po=Math.PI/180,Qo=180/Math.PI;function Ys(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Bt[t&255]+Bt[t>>8&255]+Bt[t>>16&255]+Bt[t>>24&255]+"-"+Bt[e&255]+Bt[e>>8&255]+"-"+Bt[e>>16&15|64]+Bt[e>>24&255]+"-"+Bt[n&63|128]+Bt[n>>8&255]+"-"+Bt[n>>16&255]+Bt[n>>24&255]+Bt[i&255]+Bt[i>>8&255]+Bt[i>>16&255]+Bt[i>>24&255]).toLowerCase()}function Zt(t,e,n){return Math.max(e,Math.min(n,t))}function ch(t,e){return(t%e+e)%e}function iT(t,e,n,i,r){return i+(t-e)*(r-i)/(n-e)}function rT(t,e,n){return t!==e?(n-t)/(e-t):0}function Lo(t,e,n){return(1-n)*t+n*e}function sT(t,e,n,i){return Lo(t,e,1-Math.exp(-n*i))}function oT(t,e=1){return e-Math.abs(ch(t,e*2)-e)}function aT(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*(3-2*t))}function lT(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*t*(t*(t*6-15)+10))}function cT(t,e){return t+Math.floor(Math.random()*(e-t+1))}function uT(t,e){return t+Math.random()*(e-t)}function dT(t){return t*(.5-Math.random())}function fT(t){t!==void 0&&(Nm=t);let e=Nm+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function hT(t){return t*Po}function pT(t){return t*Qo}function Kd(t){return(t&t-1)===0&&t!==0}function mT(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))}function Ql(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function gT(t,e,n,i,r){const s=Math.cos,o=Math.sin,a=s(n/2),l=o(n/2),c=s((e+i)/2),u=o((e+i)/2),d=s((e-i)/2),h=o((e-i)/2),p=s((i-e)/2),_=o((i-e)/2);switch(r){case"XYX":t.set(a*u,l*d,l*h,a*c);break;case"YZY":t.set(l*h,a*u,l*d,a*c);break;case"ZXZ":t.set(l*d,l*h,a*u,a*c);break;case"XZX":t.set(a*u,l*_,l*p,a*c);break;case"YXY":t.set(l*p,a*u,l*_,a*c);break;case"ZYZ":t.set(l*_,l*p,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function as(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function $t(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}const Um={DEG2RAD:Po,RAD2DEG:Qo,generateUUID:Ys,clamp:Zt,euclideanModulo:ch,mapLinear:iT,inverseLerp:rT,lerp:Lo,damp:sT,pingpong:oT,smoothstep:aT,smootherstep:lT,randInt:cT,randFloat:uT,randFloatSpread:dT,seededRandom:fT,degToRad:hT,radToDeg:pT,isPowerOfTwo:Kd,ceilPowerOfTwo:mT,floorPowerOfTwo:Ql,setQuaternionFromProperEuler:gT,normalize:$t,denormalize:as};class Oe{constructor(e=0,n=0){Oe.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Zt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class We{constructor(e,n,i,r,s,o,a,l,c){We.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c)}set(e,n,i,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=n,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],d=i[7],h=i[2],p=i[5],_=i[8],y=r[0],m=r[3],f=r[6],v=r[1],g=r[4],x=r[7],R=r[2],C=r[5],A=r[8];return s[0]=o*y+a*v+l*R,s[3]=o*m+a*g+l*C,s[6]=o*f+a*x+l*A,s[1]=c*y+u*v+d*R,s[4]=c*m+u*g+d*C,s[7]=c*f+u*x+d*A,s[2]=h*y+p*v+_*R,s[5]=h*m+p*g+_*C,s[8]=h*f+p*x+_*A,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return n*o*u-n*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,h=a*l-u*s,p=c*s-o*l,_=n*d+i*h+r*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/_;return e[0]=d*y,e[1]=(r*c-u*i)*y,e[2]=(a*i-r*o)*y,e[3]=h*y,e[4]=(u*n-r*l)*y,e[5]=(r*s-a*n)*y,e[6]=p*y,e[7]=(i*l-c*n)*y,e[8]=(o*n-i*s)*y,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+n,0,0,1),this}scale(e,n){return this.premultiply(yu.makeScale(e,n)),this}rotate(e){return this.premultiply(yu.makeRotation(-e)),this}translate(e,n){return this.premultiply(yu.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const yu=new We;function b0(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function ec(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function vT(){const t=ec("canvas");return t.style.display="block",t}const Im={};function Do(t){t in Im||(Im[t]=!0,console.warn(t))}const Om=new We().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),km=new We().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ua={[Ci]:{transfer:Yl,primaries:ql,toReference:t=>t,fromReference:t=>t},[Dt]:{transfer:st,primaries:ql,toReference:t=>t.convertSRGBToLinear(),fromReference:t=>t.convertLinearToSRGB()},[Tc]:{transfer:Yl,primaries:Zl,toReference:t=>t.applyMatrix3(km),fromReference:t=>t.applyMatrix3(Om)},[lh]:{transfer:st,primaries:Zl,toReference:t=>t.convertSRGBToLinear().applyMatrix3(km),fromReference:t=>t.applyMatrix3(Om).convertLinearToSRGB()}},_T=new Set([Ci,Tc]),Je={enabled:!0,_workingColorSpace:Ci,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(t){if(!_T.has(t))throw new Error(`Unsupported working color space, "${t}".`);this._workingColorSpace=t},convert:function(t,e,n){if(this.enabled===!1||e===n||!e||!n)return t;const i=Ua[e].toReference,r=Ua[n].fromReference;return r(i(t))},fromWorkingColorSpace:function(t,e){return this.convert(t,this._workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this._workingColorSpace)},getPrimaries:function(t){return Ua[t].primaries},getTransfer:function(t){return t===An?Yl:Ua[t].transfer}};function Ps(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function xu(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let jr;class P0{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{jr===void 0&&(jr=ec("canvas")),jr.width=e.width,jr.height=e.height;const i=jr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=jr}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=ec("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Ps(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Ps(n[i]/255)*255):n[i]=Ps(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let yT=0;class L0{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:yT++}),this.uuid=Ys(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Su(r[o].image)):s.push(Su(r[o]))}else s=Su(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function Su(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?P0.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let xT=0;class mn extends Ks{constructor(e=mn.DEFAULT_IMAGE,n=mn.DEFAULT_MAPPING,i=Hn,r=Hn,s=wn,o=Jo,a=Gn,l=er,c=mn.DEFAULT_ANISOTROPY,u=An){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:xT++}),this.uuid=Ys(),this.name="",this.source=new L0(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Oe(0,0),this.repeat=new Oe(1,1),this.center=new Oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(Do("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===Ir?Dt:An),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==y0)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case jd:e.x=e.x-Math.floor(e.x);break;case Hn:e.x=e.x<0?0:1;break;case Xd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case jd:e.y=e.y-Math.floor(e.y);break;case Hn:e.y=e.y<0?0:1;break;case Xd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Do("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Dt?Ir:C0}set encoding(e){Do("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Ir?Dt:An}}mn.DEFAULT_IMAGE=null;mn.DEFAULT_MAPPING=y0;mn.DEFAULT_ANISOTROPY=1;class Nt{constructor(e=0,n=0,i=0,r=1){Nt.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],p=l[5],_=l[9],y=l[2],m=l[6],f=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-y)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+y)<.1&&Math.abs(_+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const g=(c+1)/2,x=(p+1)/2,R=(f+1)/2,C=(u+h)/4,A=(d+y)/4,N=(_+m)/4;return g>x&&g>R?g<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(g),r=C/i,s=A/i):x>R?x<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),i=C/r,s=N/r):R<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),i=A/s,r=N/s),this.set(i,r,s,n),this}let v=Math.sqrt((m-_)*(m-_)+(d-y)*(d-y)+(h-u)*(h-u));return Math.abs(v)<.001&&(v=1),this.x=(m-_)/v,this.y=(d-y)/v,this.z=(h-u)/v,this.w=Math.acos((c+p+f-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ST extends Ks{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new Nt(0,0,e,n),this.scissorTest=!1,this.viewport=new Nt(0,0,e,n);const r={width:e,height:n,depth:1};i.encoding!==void 0&&(Do("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Ir?Dt:An),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:wn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new mn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,n,i=1){(this.width!==e||this.height!==n||this.depth!==i)&&(this.width=e,this.height=n,this.depth=i,this.texture.image.width=e,this.texture.image.height=n,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new L0(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class jn extends ST{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class D0 extends mn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=qt,this.minFilter=qt,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ET extends mn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=qt,this.minFilter=qt,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class la{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],d=i[r+3];const h=s[o+0],p=s[o+1],_=s[o+2],y=s[o+3];if(a===0){e[n+0]=l,e[n+1]=c,e[n+2]=u,e[n+3]=d;return}if(a===1){e[n+0]=h,e[n+1]=p,e[n+2]=_,e[n+3]=y;return}if(d!==y||l!==h||c!==p||u!==_){let m=1-a;const f=l*h+c*p+u*_+d*y,v=f>=0?1:-1,g=1-f*f;if(g>Number.EPSILON){const R=Math.sqrt(g),C=Math.atan2(R,f*v);m=Math.sin(m*C)/R,a=Math.sin(a*C)/R}const x=a*v;if(l=l*m+h*x,c=c*m+p*x,u=u*m+_*x,d=d*m+y*x,m===1-a){const R=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=R,c*=R,u*=R,d*=R}}e[n]=l,e[n+1]=c,e[n+2]=u,e[n+3]=d}static multiplyQuaternionsFlat(e,n,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],d=s[o],h=s[o+1],p=s[o+2],_=s[o+3];return e[n]=a*_+u*d+l*p-c*h,e[n+1]=l*_+u*h+c*d-a*p,e[n+2]=c*_+u*p+a*h-l*d,e[n+3]=u*_-a*d-l*h-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),d=a(s/2),h=l(i/2),p=l(r/2),_=l(s/2);switch(o){case"XYZ":this._x=h*u*d+c*p*_,this._y=c*p*d-h*u*_,this._z=c*u*_+h*p*d,this._w=c*u*d-h*p*_;break;case"YXZ":this._x=h*u*d+c*p*_,this._y=c*p*d-h*u*_,this._z=c*u*_-h*p*d,this._w=c*u*d+h*p*_;break;case"ZXY":this._x=h*u*d-c*p*_,this._y=c*p*d+h*u*_,this._z=c*u*_+h*p*d,this._w=c*u*d-h*p*_;break;case"ZYX":this._x=h*u*d-c*p*_,this._y=c*p*d+h*u*_,this._z=c*u*_-h*p*d,this._w=c*u*d+h*p*_;break;case"YZX":this._x=h*u*d+c*p*_,this._y=c*p*d+h*u*_,this._z=c*u*_-h*p*d,this._w=c*u*d-h*p*_;break;case"XZY":this._x=h*u*d-c*p*_,this._y=c*p*d-h*u*_,this._z=c*u*_+h*p*d,this._w=c*u*d+h*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],l=n[9],c=n[2],u=n[6],d=n[10],h=i+a+d;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>d){const p=2*Math.sqrt(1+i-a-d);this._w=(u-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>d){const p=2*Math.sqrt(1+a-i-d);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+d-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Zt(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,o=e._w,a=n._x,l=n._y,c=n._z,u=n._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-n;return this._w=p*o+n*this._w,this._x=p*i+n*this._x,this._y=p*r+n*this._y,this._z=p*s+n*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-n)*u)/c,h=Math.sin(n*u)/c;return this._w=o*d+this._w*h,this._x=i*d+this._x*h,this._y=r*d+this._y*h,this._z=s*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=Math.random(),n=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(n*Math.cos(r),i*Math.sin(s),i*Math.cos(s),n*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class B{constructor(e=0,n=0,i=0){B.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Fm.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Fm.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*n-s*r),d=2*(s*i-o*n);return this.x=n+l*c+o*d-a*u,this.y=i+l*u+a*c-s*d,this.z=r+l*d+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,o=n.x,a=n.y,l=n.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Eu.copy(this).projectOnVector(e),this.sub(Eu)}reflect(e){return this.sub(Eu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Zt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,n=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(n),this.y=i*Math.sin(n),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Eu=new B,Fm=new la;class ca{constructor(e=new B(1/0,1/0,1/0),n=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Nn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Nn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Nn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Nn):Nn.fromBufferAttribute(s,o),Nn.applyMatrix4(e.matrixWorld),this.expandByPoint(Nn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ia.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ia.copy(i.boundingBox)),Ia.applyMatrix4(e.matrixWorld),this.union(Ia)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Nn),Nn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(co),Oa.subVectors(this.max,co),Xr.subVectors(e.a,co),$r.subVectors(e.b,co),Kr.subVectors(e.c,co),Li.subVectors($r,Xr),Di.subVectors(Kr,$r),pr.subVectors(Xr,Kr);let n=[0,-Li.z,Li.y,0,-Di.z,Di.y,0,-pr.z,pr.y,Li.z,0,-Li.x,Di.z,0,-Di.x,pr.z,0,-pr.x,-Li.y,Li.x,0,-Di.y,Di.x,0,-pr.y,pr.x,0];return!Mu(n,Xr,$r,Kr,Oa)||(n=[1,0,0,0,1,0,0,0,1],!Mu(n,Xr,$r,Kr,Oa))?!1:(ka.crossVectors(Li,Di),n=[ka.x,ka.y,ka.z],Mu(n,Xr,$r,Kr,Oa))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Nn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Nn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(si),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const si=[new B,new B,new B,new B,new B,new B,new B,new B],Nn=new B,Ia=new ca,Xr=new B,$r=new B,Kr=new B,Li=new B,Di=new B,pr=new B,co=new B,Oa=new B,ka=new B,mr=new B;function Mu(t,e,n,i,r){for(let s=0,o=t.length-3;s<=o;s+=3){mr.fromArray(t,s);const a=r.x*Math.abs(mr.x)+r.y*Math.abs(mr.y)+r.z*Math.abs(mr.z),l=e.dot(mr),c=n.dot(mr),u=i.dot(mr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const MT=new ca,uo=new B,wu=new B;class uh{constructor(e=new B,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):MT.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;uo.subVectors(e,this.center);const n=uo.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(uo,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(wu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(uo.copy(e.center).add(wu)),this.expandByPoint(uo.copy(e.center).sub(wu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const oi=new B,Tu=new B,Fa=new B,Ni=new B,Au=new B,za=new B,Cu=new B;class wT{constructor(e=new B,n=new B(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,oi)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=oi.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(oi.copy(this.origin).addScaledVector(this.direction,n),oi.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Tu.copy(e).add(n).multiplyScalar(.5),Fa.copy(n).sub(e).normalize(),Ni.copy(this.origin).sub(Tu);const s=e.distanceTo(n)*.5,o=-this.direction.dot(Fa),a=Ni.dot(this.direction),l=-Ni.dot(Fa),c=Ni.lengthSq(),u=Math.abs(1-o*o);let d,h,p,_;if(u>0)if(d=o*l-a,h=o*a-l,_=s*u,d>=0)if(h>=-_)if(h<=_){const y=1/u;d*=y,h*=y,p=d*(d+o*h+2*a)+h*(o*d+h+2*l)+c}else h=s,d=Math.max(0,-(o*h+a)),p=-d*d+h*(h+2*l)+c;else h=-s,d=Math.max(0,-(o*h+a)),p=-d*d+h*(h+2*l)+c;else h<=-_?(d=Math.max(0,-(-o*s+a)),h=d>0?-s:Math.min(Math.max(-s,-l),s),p=-d*d+h*(h+2*l)+c):h<=_?(d=0,h=Math.min(Math.max(-s,-l),s),p=h*(h+2*l)+c):(d=Math.max(0,-(o*s+a)),h=d>0?s:Math.min(Math.max(-s,-l),s),p=-d*d+h*(h+2*l)+c);else h=o>0?-s:s,d=Math.max(0,-(o*h+a)),p=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Tu).addScaledVector(Fa,h),p}intersectSphere(e,n){oi.subVectors(e.center,this.origin);const i=oi.dot(this.direction),r=oi.dot(oi)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,n):this.at(a,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(a=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,oi)!==null}intersectTriangle(e,n,i,r,s){Au.subVectors(n,e),za.subVectors(i,e),Cu.crossVectors(Au,za);let o=this.direction.dot(Cu),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ni.subVectors(this.origin,e);const l=a*this.direction.dot(za.crossVectors(Ni,za));if(l<0)return null;const c=a*this.direction.dot(Au.cross(Ni));if(c<0||l+c>o)return null;const u=-a*Ni.dot(Cu);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class It{constructor(e,n,i,r,s,o,a,l,c,u,d,h,p,_,y,m){It.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c,u,d,h,p,_,y,m)}set(e,n,i,r,s,o,a,l,c,u,d,h,p,_,y,m){const f=this.elements;return f[0]=e,f[4]=n,f[8]=i,f[12]=r,f[1]=s,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=u,f[10]=d,f[14]=h,f[3]=p,f[7]=_,f[11]=y,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new It().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/Yr.setFromMatrixColumn(e,0).length(),s=1/Yr.setFromMatrixColumn(e,1).length(),o=1/Yr.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const h=o*u,p=o*d,_=a*u,y=a*d;n[0]=l*u,n[4]=-l*d,n[8]=c,n[1]=p+_*c,n[5]=h-y*c,n[9]=-a*l,n[2]=y-h*c,n[6]=_+p*c,n[10]=o*l}else if(e.order==="YXZ"){const h=l*u,p=l*d,_=c*u,y=c*d;n[0]=h+y*a,n[4]=_*a-p,n[8]=o*c,n[1]=o*d,n[5]=o*u,n[9]=-a,n[2]=p*a-_,n[6]=y+h*a,n[10]=o*l}else if(e.order==="ZXY"){const h=l*u,p=l*d,_=c*u,y=c*d;n[0]=h-y*a,n[4]=-o*d,n[8]=_+p*a,n[1]=p+_*a,n[5]=o*u,n[9]=y-h*a,n[2]=-o*c,n[6]=a,n[10]=o*l}else if(e.order==="ZYX"){const h=o*u,p=o*d,_=a*u,y=a*d;n[0]=l*u,n[4]=_*c-p,n[8]=h*c+y,n[1]=l*d,n[5]=y*c+h,n[9]=p*c-_,n[2]=-c,n[6]=a*l,n[10]=o*l}else if(e.order==="YZX"){const h=o*l,p=o*c,_=a*l,y=a*c;n[0]=l*u,n[4]=y-h*d,n[8]=_*d+p,n[1]=d,n[5]=o*u,n[9]=-a*u,n[2]=-c*u,n[6]=p*d+_,n[10]=h-y*d}else if(e.order==="XZY"){const h=o*l,p=o*c,_=a*l,y=a*c;n[0]=l*u,n[4]=-d,n[8]=c*u,n[1]=h*d+y,n[5]=o*u,n[9]=p*d-_,n[2]=_*d-p,n[6]=a*u,n[10]=y*d+h}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(TT,e,AT)}lookAt(e,n,i){const r=this.elements;return un.subVectors(e,n),un.lengthSq()===0&&(un.z=1),un.normalize(),Ui.crossVectors(i,un),Ui.lengthSq()===0&&(Math.abs(i.z)===1?un.x+=1e-4:un.z+=1e-4,un.normalize(),Ui.crossVectors(i,un)),Ui.normalize(),Ba.crossVectors(un,Ui),r[0]=Ui.x,r[4]=Ba.x,r[8]=un.x,r[1]=Ui.y,r[5]=Ba.y,r[9]=un.y,r[2]=Ui.z,r[6]=Ba.z,r[10]=un.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],d=i[5],h=i[9],p=i[13],_=i[2],y=i[6],m=i[10],f=i[14],v=i[3],g=i[7],x=i[11],R=i[15],C=r[0],A=r[4],N=r[8],E=r[12],w=r[1],X=r[5],z=r[9],q=r[13],b=r[2],U=r[6],F=r[10],Y=r[14],D=r[3],k=r[7],W=r[11],J=r[15];return s[0]=o*C+a*w+l*b+c*D,s[4]=o*A+a*X+l*U+c*k,s[8]=o*N+a*z+l*F+c*W,s[12]=o*E+a*q+l*Y+c*J,s[1]=u*C+d*w+h*b+p*D,s[5]=u*A+d*X+h*U+p*k,s[9]=u*N+d*z+h*F+p*W,s[13]=u*E+d*q+h*Y+p*J,s[2]=_*C+y*w+m*b+f*D,s[6]=_*A+y*X+m*U+f*k,s[10]=_*N+y*z+m*F+f*W,s[14]=_*E+y*q+m*Y+f*J,s[3]=v*C+g*w+x*b+R*D,s[7]=v*A+g*X+x*U+R*k,s[11]=v*N+g*z+x*F+R*W,s[15]=v*E+g*q+x*Y+R*J,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],p=e[14],_=e[3],y=e[7],m=e[11],f=e[15];return _*(+s*l*d-r*c*d-s*a*h+i*c*h+r*a*p-i*l*p)+y*(+n*l*p-n*c*h+s*o*h-r*o*p+r*c*u-s*l*u)+m*(+n*c*d-n*a*p-s*o*d+i*o*p+s*a*u-i*c*u)+f*(-r*a*u-n*l*d+n*a*h+r*o*d-i*o*h+i*l*u)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],p=e[11],_=e[12],y=e[13],m=e[14],f=e[15],v=d*m*c-y*h*c+y*l*p-a*m*p-d*l*f+a*h*f,g=_*h*c-u*m*c-_*l*p+o*m*p+u*l*f-o*h*f,x=u*y*c-_*d*c+_*a*p-o*y*p-u*a*f+o*d*f,R=_*d*l-u*y*l-_*a*h+o*y*h+u*a*m-o*d*m,C=n*v+i*g+r*x+s*R;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/C;return e[0]=v*A,e[1]=(y*h*s-d*m*s-y*r*p+i*m*p+d*r*f-i*h*f)*A,e[2]=(a*m*s-y*l*s+y*r*c-i*m*c-a*r*f+i*l*f)*A,e[3]=(d*l*s-a*h*s-d*r*c+i*h*c+a*r*p-i*l*p)*A,e[4]=g*A,e[5]=(u*m*s-_*h*s+_*r*p-n*m*p-u*r*f+n*h*f)*A,e[6]=(_*l*s-o*m*s-_*r*c+n*m*c+o*r*f-n*l*f)*A,e[7]=(o*h*s-u*l*s+u*r*c-n*h*c-o*r*p+n*l*p)*A,e[8]=x*A,e[9]=(_*d*s-u*y*s-_*i*p+n*y*p+u*i*f-n*d*f)*A,e[10]=(o*y*s-_*a*s+_*i*c-n*y*c-o*i*f+n*a*f)*A,e[11]=(u*a*s-o*d*s-u*i*c+n*d*c+o*i*p-n*a*p)*A,e[12]=R*A,e[13]=(u*y*r-_*d*r+_*i*h-n*y*h-u*i*m+n*d*m)*A,e[14]=(_*a*r-o*y*r-_*i*l+n*y*l+o*i*m-n*a*m)*A,e[15]=(o*d*r-u*a*r+u*i*l-n*d*l-o*i*h+n*a*h)*A,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,l=n._w,c=s+s,u=o+o,d=a+a,h=s*c,p=s*u,_=s*d,y=o*u,m=o*d,f=a*d,v=l*c,g=l*u,x=l*d,R=i.x,C=i.y,A=i.z;return r[0]=(1-(y+f))*R,r[1]=(p+x)*R,r[2]=(_-g)*R,r[3]=0,r[4]=(p-x)*C,r[5]=(1-(h+f))*C,r[6]=(m+v)*C,r[7]=0,r[8]=(_+g)*A,r[9]=(m-v)*A,r[10]=(1-(h+y))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=Yr.set(r[0],r[1],r[2]).length();const o=Yr.set(r[4],r[5],r[6]).length(),a=Yr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Un.copy(this);const c=1/s,u=1/o,d=1/a;return Un.elements[0]*=c,Un.elements[1]*=c,Un.elements[2]*=c,Un.elements[4]*=u,Un.elements[5]*=u,Un.elements[6]*=u,Un.elements[8]*=d,Un.elements[9]*=d,Un.elements[10]*=d,n.setFromRotationMatrix(Un),i.x=s,i.y=o,i.z=a,this}makePerspective(e,n,i,r,s,o,a=gi){const l=this.elements,c=2*s/(n-e),u=2*s/(i-r),d=(n+e)/(n-e),h=(i+r)/(i-r);let p,_;if(a===gi)p=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===Jl)p=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,r,s,o,a=gi){const l=this.elements,c=1/(n-e),u=1/(i-r),d=1/(o-s),h=(n+e)*c,p=(i+r)*u;let _,y;if(a===gi)_=(o+s)*d,y=-2*d;else if(a===Jl)_=s*d,y=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=y,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const Yr=new B,Un=new It,TT=new B(0,0,0),AT=new B(1,1,1),Ui=new B,Ba=new B,un=new B,zm=new It,Bm=new la;class Ac{constructor(e=0,n=0,i=0,r=Ac.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],d=r[2],h=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(Zt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Zt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Zt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Zt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Zt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Zt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return zm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(zm,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Bm.setFromEuler(this),this.setFromQuaternion(Bm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ac.DEFAULT_ORDER="XYZ";class N0{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let CT=0;const Hm=new B,qr=new la,ai=new It,Ha=new B,fo=new B,RT=new B,bT=new la,Gm=new B(1,0,0),Vm=new B(0,1,0),Wm=new B(0,0,1),PT={type:"added"},LT={type:"removed"};class gn extends Ks{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:CT++}),this.uuid=Ys(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=gn.DEFAULT_UP.clone();const e=new B,n=new Ac,i=new la,r=new B(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new It},normalMatrix:{value:new We}}),this.matrix=new It,this.matrixWorld=new It,this.matrixAutoUpdate=gn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=gn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new N0,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return qr.setFromAxisAngle(e,n),this.quaternion.multiply(qr),this}rotateOnWorldAxis(e,n){return qr.setFromAxisAngle(e,n),this.quaternion.premultiply(qr),this}rotateX(e){return this.rotateOnAxis(Gm,e)}rotateY(e){return this.rotateOnAxis(Vm,e)}rotateZ(e){return this.rotateOnAxis(Wm,e)}translateOnAxis(e,n){return Hm.copy(e).applyQuaternion(this.quaternion),this.position.add(Hm.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Gm,e)}translateY(e){return this.translateOnAxis(Vm,e)}translateZ(e){return this.translateOnAxis(Wm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ai.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Ha.copy(e):Ha.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),fo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ai.lookAt(fo,Ha,this.up):ai.lookAt(Ha,fo,this.up),this.quaternion.setFromRotationMatrix(ai),r&&(ai.extractRotation(r.matrixWorld),qr.setFromRotationMatrix(ai),this.quaternion.premultiply(qr.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(PT)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(LT)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ai.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ai.multiply(e.parent.matrixWorld)),e.applyMatrix4(ai),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fo,e,RT),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fo,bT,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++){const s=n[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),n===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++){const a=r[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(n){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),h=o(e.skeletons),p=o(e.animations),_=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}gn.DEFAULT_UP=new B(0,1,0);gn.DEFAULT_MATRIX_AUTO_UPDATE=!0;gn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const In=new B,li=new B,Ru=new B,ci=new B,Zr=new B,Jr=new B,jm=new B,bu=new B,Pu=new B,Lu=new B;let Ga=!1;class zn{constructor(e=new B,n=new B,i=new B){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),In.subVectors(e,n),r.cross(In);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){In.subVectors(r,n),li.subVectors(i,n),Ru.subVectors(e,n);const o=In.dot(In),a=In.dot(li),l=In.dot(Ru),c=li.dot(li),u=li.dot(Ru),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const h=1/d,p=(c*l-a*u)*h,_=(o*u-a*l)*h;return s.set(1-p-_,_,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,ci)===null?!1:ci.x>=0&&ci.y>=0&&ci.x+ci.y<=1}static getUV(e,n,i,r,s,o,a,l){return Ga===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ga=!0),this.getInterpolation(e,n,i,r,s,o,a,l)}static getInterpolation(e,n,i,r,s,o,a,l){return this.getBarycoord(e,n,i,r,ci)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ci.x),l.addScaledVector(o,ci.y),l.addScaledVector(a,ci.z),l)}static isFrontFacing(e,n,i,r){return In.subVectors(i,n),li.subVectors(e,n),In.cross(li).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return In.subVectors(this.c,this.b),li.subVectors(this.a,this.b),In.cross(li).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return zn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return zn.getBarycoord(e,this.a,this.b,this.c,n)}getUV(e,n,i,r,s){return Ga===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ga=!0),zn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}getInterpolation(e,n,i,r,s){return zn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return zn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return zn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let o,a;Zr.subVectors(r,i),Jr.subVectors(s,i),bu.subVectors(e,i);const l=Zr.dot(bu),c=Jr.dot(bu);if(l<=0&&c<=0)return n.copy(i);Pu.subVectors(e,r);const u=Zr.dot(Pu),d=Jr.dot(Pu);if(u>=0&&d<=u)return n.copy(r);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),n.copy(i).addScaledVector(Zr,o);Lu.subVectors(e,s);const p=Zr.dot(Lu),_=Jr.dot(Lu);if(_>=0&&p<=_)return n.copy(s);const y=p*c-l*_;if(y<=0&&c>=0&&_<=0)return a=c/(c-_),n.copy(i).addScaledVector(Jr,a);const m=u*_-p*d;if(m<=0&&d-u>=0&&p-_>=0)return jm.subVectors(s,r),a=(d-u)/(d-u+(p-_)),n.copy(r).addScaledVector(jm,a);const f=1/(m+y+h);return o=y*f,a=h*f,n.copy(i).addScaledVector(Zr,o).addScaledVector(Jr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const U0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ii={h:0,s:0,l:0},Va={h:0,s:0,l:0};function Du(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class Ke{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Dt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Je.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=Je.workingColorSpace){return this.r=e,this.g=n,this.b=i,Je.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=Je.workingColorSpace){if(e=ch(e,1),n=Zt(n,0,1),i=Zt(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=Du(o,s,e+1/3),this.g=Du(o,s,e),this.b=Du(o,s,e-1/3)}return Je.toWorkingColorSpace(this,r),this}setStyle(e,n=Dt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Dt){const i=U0[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ps(e.r),this.g=Ps(e.g),this.b=Ps(e.b),this}copyLinearToSRGB(e){return this.r=xu(e.r),this.g=xu(e.g),this.b=xu(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Dt){return Je.fromWorkingColorSpace(Ht.copy(this),e),Math.round(Zt(Ht.r*255,0,255))*65536+Math.round(Zt(Ht.g*255,0,255))*256+Math.round(Zt(Ht.b*255,0,255))}getHexString(e=Dt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=Je.workingColorSpace){Je.fromWorkingColorSpace(Ht.copy(this),n);const i=Ht.r,r=Ht.g,s=Ht.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,n=Je.workingColorSpace){return Je.fromWorkingColorSpace(Ht.copy(this),n),e.r=Ht.r,e.g=Ht.g,e.b=Ht.b,e}getStyle(e=Dt){Je.fromWorkingColorSpace(Ht.copy(this),e);const n=Ht.r,i=Ht.g,r=Ht.b;return e!==Dt?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Ii),this.setHSL(Ii.h+e,Ii.s+n,Ii.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Ii),e.getHSL(Va);const i=Lo(Ii.h,Va.h,n),r=Lo(Ii.s,Va.s,n),s=Lo(Ii.l,Va.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ht=new Ke;Ke.NAMES=U0;let DT=0;class Cc extends Ks{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:DT++}),this.uuid=Ys(),this.name="",this.type="Material",this.blending=bs,this.side=ir,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Hd,this.blendDst=Gd,this.blendEquation=wr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ke(0,0,0),this.blendAlpha=0,this.depthFunc=Kl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Pm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Wr,this.stencilZFail=Wr,this.stencilZPass=Wr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==bs&&(i.blending=this.blending),this.side!==ir&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Hd&&(i.blendSrc=this.blendSrc),this.blendDst!==Gd&&(i.blendDst=this.blendDst),this.blendEquation!==wr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Kl&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Pm&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Wr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Wr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Wr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(n){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class dh extends Cc{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=_0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const _t=new B,Wa=new Oe;class ii{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=Lm,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Wi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Wa.fromBufferAttribute(this,n),Wa.applyMatrix3(e),this.setXY(n,Wa.x,Wa.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)_t.fromBufferAttribute(this,n),_t.applyMatrix3(e),this.setXYZ(n,_t.x,_t.y,_t.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)_t.fromBufferAttribute(this,n),_t.applyMatrix4(e),this.setXYZ(n,_t.x,_t.y,_t.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)_t.fromBufferAttribute(this,n),_t.applyNormalMatrix(e),this.setXYZ(n,_t.x,_t.y,_t.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)_t.fromBufferAttribute(this,n),_t.transformDirection(e),this.setXYZ(n,_t.x,_t.y,_t.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=as(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=$t(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=as(n,this.array)),n}setX(e,n){return this.normalized&&(n=$t(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=as(n,this.array)),n}setY(e,n){return this.normalized&&(n=$t(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=as(n,this.array)),n}setZ(e,n){return this.normalized&&(n=$t(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=as(n,this.array)),n}setW(e,n){return this.normalized&&(n=$t(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=$t(n,this.array),i=$t(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=$t(n,this.array),i=$t(i,this.array),r=$t(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=$t(n,this.array),i=$t(i,this.array),r=$t(r,this.array),s=$t(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Lm&&(e.usage=this.usage),e}}class I0 extends ii{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class O0 extends ii{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class Si extends ii{constructor(e,n,i){super(new Float32Array(e),n,i)}}let NT=0;const Sn=new It,Nu=new gn,Qr=new B,dn=new ca,ho=new ca,Ct=new B;class lr extends Ks{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:NT++}),this.uuid=Ys(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(b0(e)?O0:I0)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new We().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Sn.makeRotationFromQuaternion(e),this.applyMatrix4(Sn),this}rotateX(e){return Sn.makeRotationX(e),this.applyMatrix4(Sn),this}rotateY(e){return Sn.makeRotationY(e),this.applyMatrix4(Sn),this}rotateZ(e){return Sn.makeRotationZ(e),this.applyMatrix4(Sn),this}translate(e,n,i){return Sn.makeTranslation(e,n,i),this.applyMatrix4(Sn),this}scale(e,n,i){return Sn.makeScale(e,n,i),this.applyMatrix4(Sn),this}lookAt(e){return Nu.lookAt(e),Nu.updateMatrix(),this.applyMatrix4(Nu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qr).negate(),this.translate(Qr.x,Qr.y,Qr.z),this}setFromPoints(e){const n=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];n.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Si(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ca);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];dn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ct.addVectors(this.boundingBox.min,dn.min),this.boundingBox.expandByPoint(Ct),Ct.addVectors(this.boundingBox.max,dn.max),this.boundingBox.expandByPoint(Ct)):(this.boundingBox.expandByPoint(dn.min),this.boundingBox.expandByPoint(dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new uh);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new B,1/0);return}if(e){const i=this.boundingSphere.center;if(dn.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];ho.setFromBufferAttribute(a),this.morphTargetsRelative?(Ct.addVectors(dn.min,ho.min),dn.expandByPoint(Ct),Ct.addVectors(dn.max,ho.max),dn.expandByPoint(Ct)):(dn.expandByPoint(ho.min),dn.expandByPoint(ho.max))}dn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Ct.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Ct));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Ct.fromBufferAttribute(a,c),l&&(Qr.fromBufferAttribute(e,c),Ct.add(Qr)),r=Math.max(r,i.distanceToSquared(Ct))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=n.position.array,s=n.normal.array,o=n.uv.array,a=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ii(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let w=0;w<a;w++)c[w]=new B,u[w]=new B;const d=new B,h=new B,p=new B,_=new Oe,y=new Oe,m=new Oe,f=new B,v=new B;function g(w,X,z){d.fromArray(r,w*3),h.fromArray(r,X*3),p.fromArray(r,z*3),_.fromArray(o,w*2),y.fromArray(o,X*2),m.fromArray(o,z*2),h.sub(d),p.sub(d),y.sub(_),m.sub(_);const q=1/(y.x*m.y-m.x*y.y);isFinite(q)&&(f.copy(h).multiplyScalar(m.y).addScaledVector(p,-y.y).multiplyScalar(q),v.copy(p).multiplyScalar(y.x).addScaledVector(h,-m.x).multiplyScalar(q),c[w].add(f),c[X].add(f),c[z].add(f),u[w].add(v),u[X].add(v),u[z].add(v))}let x=this.groups;x.length===0&&(x=[{start:0,count:i.length}]);for(let w=0,X=x.length;w<X;++w){const z=x[w],q=z.start,b=z.count;for(let U=q,F=q+b;U<F;U+=3)g(i[U+0],i[U+1],i[U+2])}const R=new B,C=new B,A=new B,N=new B;function E(w){A.fromArray(s,w*3),N.copy(A);const X=c[w];R.copy(X),R.sub(A.multiplyScalar(A.dot(X))).normalize(),C.crossVectors(N,X);const q=C.dot(u[w])<0?-1:1;l[w*4]=R.x,l[w*4+1]=R.y,l[w*4+2]=R.z,l[w*4+3]=q}for(let w=0,X=x.length;w<X;++w){const z=x[w],q=z.start,b=z.count;for(let U=q,F=q+b;U<F;U+=3)E(i[U+0]),E(i[U+1]),E(i[U+2])}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new ii(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const r=new B,s=new B,o=new B,a=new B,l=new B,c=new B,u=new B,d=new B;if(e)for(let h=0,p=e.count;h<p;h+=3){const _=e.getX(h+0),y=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(n,_),s.fromBufferAttribute(n,y),o.fromBufferAttribute(n,m),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),a.fromBufferAttribute(i,_),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(_,a.x,a.y,a.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=n.count;h<p;h+=3)r.fromBufferAttribute(n,h+0),s.fromBufferAttribute(n,h+1),o.fromBufferAttribute(n,h+2),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Ct.fromBufferAttribute(e,n),Ct.normalize(),e.setXYZ(n,Ct.x,Ct.y,Ct.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,h=new c.constructor(l.length*u);let p=0,_=0;for(let y=0,m=l.length;y<m;y++){a.isInterleavedBufferAttribute?p=l[y]*a.data.stride+a.offset:p=l[y]*u;for(let f=0;f<u;f++)h[_++]=c[p++]}return new ii(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new lr,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);n.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){const h=c[u],p=e(h,i);l.push(p)}n.morphAttributes[a]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const p=c[d];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(n))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let h=0,p=d.length;h<p;h++)u.push(d[h].clone(n));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Xm=new It,gr=new wT,ja=new uh,$m=new B,es=new B,ts=new B,ns=new B,Uu=new B,Xa=new B,$a=new Oe,Ka=new Oe,Ya=new Oe,Km=new B,Ym=new B,qm=new B,qa=new B,Za=new B;class ei extends gn{constructor(e=new lr,n=new dh){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Xa.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],d=s[l];u!==0&&(Uu.fromBufferAttribute(d,e),o?Xa.addScaledVector(Uu,u):Xa.addScaledVector(Uu.sub(n),u))}n.add(Xa)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ja.copy(i.boundingSphere),ja.applyMatrix4(s),gr.copy(e.ray).recast(e.near),!(ja.containsPoint(gr.origin)===!1&&(gr.intersectSphere(ja,$m)===null||gr.origin.distanceToSquared($m)>(e.far-e.near)**2))&&(Xm.copy(s).invert(),gr.copy(e.ray).applyMatrix4(Xm),!(i.boundingBox!==null&&gr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,gr)))}_computeIntersections(e,n,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,h=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,y=h.length;_<y;_++){const m=h[_],f=o[m.materialIndex],v=Math.max(m.start,p.start),g=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let x=v,R=g;x<R;x+=3){const C=a.getX(x),A=a.getX(x+1),N=a.getX(x+2);r=Ja(this,f,e,i,c,u,d,C,A,N),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const _=Math.max(0,p.start),y=Math.min(a.count,p.start+p.count);for(let m=_,f=y;m<f;m+=3){const v=a.getX(m),g=a.getX(m+1),x=a.getX(m+2);r=Ja(this,o,e,i,c,u,d,v,g,x),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,y=h.length;_<y;_++){const m=h[_],f=o[m.materialIndex],v=Math.max(m.start,p.start),g=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let x=v,R=g;x<R;x+=3){const C=x,A=x+1,N=x+2;r=Ja(this,f,e,i,c,u,d,C,A,N),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const _=Math.max(0,p.start),y=Math.min(l.count,p.start+p.count);for(let m=_,f=y;m<f;m+=3){const v=m,g=m+1,x=m+2;r=Ja(this,o,e,i,c,u,d,v,g,x),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}}}function UT(t,e,n,i,r,s,o,a){let l;if(e.side===ln?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===ir,a),l===null)return null;Za.copy(a),Za.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(Za);return c<n.near||c>n.far?null:{distance:c,point:Za.clone(),object:t}}function Ja(t,e,n,i,r,s,o,a,l,c){t.getVertexPosition(a,es),t.getVertexPosition(l,ts),t.getVertexPosition(c,ns);const u=UT(t,e,n,i,es,ts,ns,qa);if(u){r&&($a.fromBufferAttribute(r,a),Ka.fromBufferAttribute(r,l),Ya.fromBufferAttribute(r,c),u.uv=zn.getInterpolation(qa,es,ts,ns,$a,Ka,Ya,new Oe)),s&&($a.fromBufferAttribute(s,a),Ka.fromBufferAttribute(s,l),Ya.fromBufferAttribute(s,c),u.uv1=zn.getInterpolation(qa,es,ts,ns,$a,Ka,Ya,new Oe),u.uv2=u.uv1),o&&(Km.fromBufferAttribute(o,a),Ym.fromBufferAttribute(o,l),qm.fromBufferAttribute(o,c),u.normal=zn.getInterpolation(qa,es,ts,ns,Km,Ym,qm,new B),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new B,materialIndex:0};zn.getNormal(es,ts,ns,d.normal),u.face=d}return u}class ua extends lr{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],d=[];let h=0,p=0;_("z","y","x",-1,-1,i,n,e,o,s,0),_("z","y","x",1,-1,i,n,-e,o,s,1),_("x","z","y",1,1,e,i,n,r,o,2),_("x","z","y",1,-1,e,i,-n,r,o,3),_("x","y","z",1,-1,e,n,i,r,s,4),_("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Si(c,3)),this.setAttribute("normal",new Si(u,3)),this.setAttribute("uv",new Si(d,2));function _(y,m,f,v,g,x,R,C,A,N,E){const w=x/A,X=R/N,z=x/2,q=R/2,b=C/2,U=A+1,F=N+1;let Y=0,D=0;const k=new B;for(let W=0;W<F;W++){const J=W*X-q;for(let ee=0;ee<U;ee++){const K=ee*w-z;k[y]=K*v,k[m]=J*g,k[f]=b,c.push(k.x,k.y,k.z),k[y]=0,k[m]=0,k[f]=C>0?1:-1,u.push(k.x,k.y,k.z),d.push(ee/A),d.push(1-W/N),Y+=1}}for(let W=0;W<N;W++)for(let J=0;J<A;J++){const ee=h+J+U*W,K=h+J+U*(W+1),Q=h+(J+1)+U*(W+1),ce=h+(J+1)+U*W;l.push(ee,K,ce),l.push(K,Q,ce),D+=6}a.addGroup(p,D,E),p+=D,h+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ua(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Hs(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function Kt(t){const e={};for(let n=0;n<t.length;n++){const i=Hs(t[n]);for(const r in i)e[r]=i[r]}return e}function IT(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function k0(t){return t.getRenderTarget()===null?t.outputColorSpace:Je.workingColorSpace}const tc={clone:Hs,merge:Kt};var OT=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,kT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class rn extends Cc{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=OT,this.fragmentShader=kT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Hs(e.uniforms),this.uniformsGroups=IT(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class F0 extends gn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new It,this.projectionMatrix=new It,this.projectionMatrixInverse=new It,this.coordinateSystem=gi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Bn extends F0{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Qo*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Po*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Qo*2*Math.atan(Math.tan(Po*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(Po*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,n-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const is=-90,rs=1;class FT extends gn{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Bn(is,rs,e,n);r.layers=this.layers,this.add(r);const s=new Bn(is,rs,e,n);s.layers=this.layers,this.add(s);const o=new Bn(is,rs,e,n);o.layers=this.layers,this.add(o);const a=new Bn(is,rs,e,n);a.layers=this.layers,this.add(a);const l=new Bn(is,rs,e,n);l.layers=this.layers,this.add(l);const c=new Bn(is,rs,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,l]=n;for(const c of n)this.remove(c);if(e===gi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Jl)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,o),e.setRenderTarget(i,2,r),e.render(n,a),e.setRenderTarget(i,3,r),e.render(n,l),e.setRenderTarget(i,4,r),e.render(n,c),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,r),e.render(n,u),e.setRenderTarget(d,h,p),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class z0 extends mn{constructor(e,n,i,r,s,o,a,l,c,u){e=e!==void 0?e:[],n=n!==void 0?n:Fs,super(e,n,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class zT extends jn{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];n.encoding!==void 0&&(Do("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Ir?Dt:An),this.texture=new z0(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:wn}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new ua(5,5,5),s=new rn({name:"CubemapFromEquirect",uniforms:Hs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:ln,blending:yi});s.uniforms.tEquirect.value=n;const o=new ei(r,s),a=n.minFilter;return n.minFilter===Jo&&(n.minFilter=wn),new FT(1,10,this).update(e,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}}const Iu=new B,BT=new B,HT=new We;class Sr{constructor(e=new B(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=Iu.subVectors(i,n).cross(BT.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(Iu),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||HT.getNormalMatrix(e),r=this.coplanarPoint(Iu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const vr=new uh,Qa=new B;class B0{constructor(e=new Sr,n=new Sr,i=new Sr,r=new Sr,s=new Sr,o=new Sr){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=gi){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],u=r[5],d=r[6],h=r[7],p=r[8],_=r[9],y=r[10],m=r[11],f=r[12],v=r[13],g=r[14],x=r[15];if(i[0].setComponents(l-s,h-c,m-p,x-f).normalize(),i[1].setComponents(l+s,h+c,m+p,x+f).normalize(),i[2].setComponents(l+o,h+u,m+_,x+v).normalize(),i[3].setComponents(l-o,h-u,m-_,x-v).normalize(),i[4].setComponents(l-a,h-d,m-y,x-g).normalize(),n===gi)i[5].setComponents(l+a,h+d,m+y,x+g).normalize();else if(n===Jl)i[5].setComponents(a,d,y,g).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),vr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),vr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(vr)}intersectsSprite(e){return vr.center.set(0,0,0),vr.radius=.7071067811865476,vr.applyMatrix4(e.matrixWorld),this.intersectsSphere(vr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(Qa.x=r.normal.x>0?e.max.x:e.min.x,Qa.y=r.normal.y>0?e.max.y:e.min.y,Qa.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Qa)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function H0(){let t=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function GT(t,e){const n=e.isWebGL2,i=new WeakMap;function r(c,u){const d=c.array,h=c.usage,p=d.byteLength,_=t.createBuffer();t.bindBuffer(u,_),t.bufferData(u,d,h),c.onUploadCallback();let y;if(d instanceof Float32Array)y=t.FLOAT;else if(d instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(n)y=t.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else y=t.UNSIGNED_SHORT;else if(d instanceof Int16Array)y=t.SHORT;else if(d instanceof Uint32Array)y=t.UNSIGNED_INT;else if(d instanceof Int32Array)y=t.INT;else if(d instanceof Int8Array)y=t.BYTE;else if(d instanceof Uint8Array)y=t.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)y=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:_,type:y,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:p}}function s(c,u,d){const h=u.array,p=u._updateRange,_=u.updateRanges;if(t.bindBuffer(d,c),p.count===-1&&_.length===0&&t.bufferSubData(d,0,h),_.length!==0){for(let y=0,m=_.length;y<m;y++){const f=_[y];n?t.bufferSubData(d,f.start*h.BYTES_PER_ELEMENT,h,f.start,f.count):t.bufferSubData(d,f.start*h.BYTES_PER_ELEMENT,h.subarray(f.start,f.start+f.count))}u.clearUpdateRanges()}p.count!==-1&&(n?t.bufferSubData(d,p.offset*h.BYTES_PER_ELEMENT,h,p.offset,p.count):t.bufferSubData(d,p.offset*h.BYTES_PER_ELEMENT,h.subarray(p.offset,p.offset+p.count)),p.count=-1),u.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=i.get(c);u&&(t.deleteBuffer(u.buffer),i.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const h=i.get(c);(!h||h.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const d=i.get(c);if(d===void 0)i.set(c,r(c,u));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(d.buffer,c,u),d.version=c.version}}return{get:o,remove:a,update:l}}class Rc extends lr{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,o=n/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,d=e/a,h=n/l,p=[],_=[],y=[],m=[];for(let f=0;f<u;f++){const v=f*h-o;for(let g=0;g<c;g++){const x=g*d-s;_.push(x,-v,0),y.push(0,0,1),m.push(g/a),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let v=0;v<a;v++){const g=v+c*f,x=v+c*(f+1),R=v+1+c*(f+1),C=v+1+c*f;p.push(g,x,C),p.push(x,R,C)}this.setIndex(p),this.setAttribute("position",new Si(_,3)),this.setAttribute("normal",new Si(y,3)),this.setAttribute("uv",new Si(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rc(e.width,e.height,e.widthSegments,e.heightSegments)}}var VT=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,WT=`#ifdef USE_ALPHAHASH
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
#endif`,jT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,XT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$T=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,KT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,YT=`#ifdef USE_AOMAP
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
#endif`,qT=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ZT=`#ifdef USE_BATCHING
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
#endif`,JT=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,QT=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,e1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,t1=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,n1=`#ifdef USE_IRIDESCENCE
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
#endif`,i1=`#ifdef USE_BUMPMAP
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
#endif`,r1=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,s1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,o1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,a1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,l1=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,c1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,u1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,d1=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,f1=`#define PI 3.141592653589793
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
} // validated`,h1=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,p1=`vec3 transformedNormal = objectNormal;
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
#endif`,m1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,g1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,v1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,_1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,y1="gl_FragColor = linearToOutputTexel( gl_FragColor );",x1=`
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
}`,S1=`#ifdef USE_ENVMAP
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
#endif`,E1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,M1=`#ifdef USE_ENVMAP
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
#endif`,w1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,T1=`#ifdef USE_ENVMAP
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
#endif`,A1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,C1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,R1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,b1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,P1=`#ifdef USE_GRADIENTMAP
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
}`,L1=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,D1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,N1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,U1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,I1=`uniform bool receiveShadow;
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
#endif`,O1=`#ifdef USE_ENVMAP
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
#endif`,k1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,F1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,z1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,B1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,H1=`PhysicalMaterial material;
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
#endif`,G1=`struct PhysicalMaterial {
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
}`,V1=`
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
#endif`,W1=`#if defined( RE_IndirectDiffuse )
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
#endif`,j1=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,X1=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,$1=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,K1=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Y1=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,q1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Z1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,J1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Q1=`#if defined( USE_POINTS_UV )
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
#endif`,eA=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,tA=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,nA=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,iA=`#ifdef USE_MORPHNORMALS
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
#endif`,rA=`#ifdef USE_MORPHTARGETS
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
#endif`,sA=`#ifdef USE_MORPHTARGETS
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
#endif`,oA=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,aA=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,lA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,uA=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,dA=`#ifdef USE_NORMALMAP
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
#endif`,fA=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,hA=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,pA=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,mA=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,gA=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,vA=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,_A=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,yA=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,xA=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,SA=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,EA=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,MA=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,wA=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,TA=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,AA=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,CA=`float getShadowMask() {
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
}`,RA=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,bA=`#ifdef USE_SKINNING
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
#endif`,PA=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,LA=`#ifdef USE_SKINNING
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
#endif`,DA=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,NA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,UA=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,IA=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,OA=`#ifdef USE_TRANSMISSION
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
#endif`,kA=`#ifdef USE_TRANSMISSION
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
#endif`,FA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,BA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,HA=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const GA=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,VA=`uniform sampler2D t2D;
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
}`,WA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jA=`#ifdef ENVMAP_TYPE_CUBE
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
}`,XA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$A=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,KA=`#include <common>
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
}`,YA=`#if DEPTH_PACKING == 3200
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
}`,qA=`#define DISTANCE
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
}`,ZA=`#define DISTANCE
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
}`,JA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,QA=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,eC=`uniform float scale;
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
}`,tC=`uniform vec3 diffuse;
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
}`,nC=`#include <common>
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
}`,iC=`uniform vec3 diffuse;
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
}`,rC=`#define LAMBERT
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
}`,sC=`#define LAMBERT
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
}`,oC=`#define MATCAP
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
}`,aC=`#define MATCAP
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
}`,lC=`#define NORMAL
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
}`,cC=`#define NORMAL
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
}`,uC=`#define PHONG
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
}`,dC=`#define PHONG
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
}`,fC=`#define STANDARD
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
}`,hC=`#define STANDARD
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
}`,pC=`#define TOON
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
}`,mC=`#define TOON
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
}`,gC=`uniform float size;
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
}`,vC=`uniform vec3 diffuse;
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
}`,_C=`#include <common>
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
}`,yC=`uniform vec3 color;
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
}`,xC=`uniform float rotation;
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
}`,SC=`uniform vec3 diffuse;
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
}`,He={alphahash_fragment:VT,alphahash_pars_fragment:WT,alphamap_fragment:jT,alphamap_pars_fragment:XT,alphatest_fragment:$T,alphatest_pars_fragment:KT,aomap_fragment:YT,aomap_pars_fragment:qT,batching_pars_vertex:ZT,batching_vertex:JT,begin_vertex:QT,beginnormal_vertex:e1,bsdfs:t1,iridescence_fragment:n1,bumpmap_pars_fragment:i1,clipping_planes_fragment:r1,clipping_planes_pars_fragment:s1,clipping_planes_pars_vertex:o1,clipping_planes_vertex:a1,color_fragment:l1,color_pars_fragment:c1,color_pars_vertex:u1,color_vertex:d1,common:f1,cube_uv_reflection_fragment:h1,defaultnormal_vertex:p1,displacementmap_pars_vertex:m1,displacementmap_vertex:g1,emissivemap_fragment:v1,emissivemap_pars_fragment:_1,colorspace_fragment:y1,colorspace_pars_fragment:x1,envmap_fragment:S1,envmap_common_pars_fragment:E1,envmap_pars_fragment:M1,envmap_pars_vertex:w1,envmap_physical_pars_fragment:O1,envmap_vertex:T1,fog_vertex:A1,fog_pars_vertex:C1,fog_fragment:R1,fog_pars_fragment:b1,gradientmap_pars_fragment:P1,lightmap_fragment:L1,lightmap_pars_fragment:D1,lights_lambert_fragment:N1,lights_lambert_pars_fragment:U1,lights_pars_begin:I1,lights_toon_fragment:k1,lights_toon_pars_fragment:F1,lights_phong_fragment:z1,lights_phong_pars_fragment:B1,lights_physical_fragment:H1,lights_physical_pars_fragment:G1,lights_fragment_begin:V1,lights_fragment_maps:W1,lights_fragment_end:j1,logdepthbuf_fragment:X1,logdepthbuf_pars_fragment:$1,logdepthbuf_pars_vertex:K1,logdepthbuf_vertex:Y1,map_fragment:q1,map_pars_fragment:Z1,map_particle_fragment:J1,map_particle_pars_fragment:Q1,metalnessmap_fragment:eA,metalnessmap_pars_fragment:tA,morphcolor_vertex:nA,morphnormal_vertex:iA,morphtarget_pars_vertex:rA,morphtarget_vertex:sA,normal_fragment_begin:oA,normal_fragment_maps:aA,normal_pars_fragment:lA,normal_pars_vertex:cA,normal_vertex:uA,normalmap_pars_fragment:dA,clearcoat_normal_fragment_begin:fA,clearcoat_normal_fragment_maps:hA,clearcoat_pars_fragment:pA,iridescence_pars_fragment:mA,opaque_fragment:gA,packing:vA,premultiplied_alpha_fragment:_A,project_vertex:yA,dithering_fragment:xA,dithering_pars_fragment:SA,roughnessmap_fragment:EA,roughnessmap_pars_fragment:MA,shadowmap_pars_fragment:wA,shadowmap_pars_vertex:TA,shadowmap_vertex:AA,shadowmask_pars_fragment:CA,skinbase_vertex:RA,skinning_pars_vertex:bA,skinning_vertex:PA,skinnormal_vertex:LA,specularmap_fragment:DA,specularmap_pars_fragment:NA,tonemapping_fragment:UA,tonemapping_pars_fragment:IA,transmission_fragment:OA,transmission_pars_fragment:kA,uv_pars_fragment:FA,uv_pars_vertex:zA,uv_vertex:BA,worldpos_vertex:HA,background_vert:GA,background_frag:VA,backgroundCube_vert:WA,backgroundCube_frag:jA,cube_vert:XA,cube_frag:$A,depth_vert:KA,depth_frag:YA,distanceRGBA_vert:qA,distanceRGBA_frag:ZA,equirect_vert:JA,equirect_frag:QA,linedashed_vert:eC,linedashed_frag:tC,meshbasic_vert:nC,meshbasic_frag:iC,meshlambert_vert:rC,meshlambert_frag:sC,meshmatcap_vert:oC,meshmatcap_frag:aC,meshnormal_vert:lC,meshnormal_frag:cC,meshphong_vert:uC,meshphong_frag:dC,meshphysical_vert:fC,meshphysical_frag:hC,meshtoon_vert:pC,meshtoon_frag:mC,points_vert:gC,points_frag:vC,shadow_vert:_C,shadow_frag:yC,sprite_vert:xC,sprite_frag:SC},ae={common:{diffuse:{value:new Ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new Oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new Ke(16777215)},opacity:{value:1},center:{value:new Oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},Jn={basic:{uniforms:Kt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:He.meshbasic_vert,fragmentShader:He.meshbasic_frag},lambert:{uniforms:Kt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new Ke(0)}}]),vertexShader:He.meshlambert_vert,fragmentShader:He.meshlambert_frag},phong:{uniforms:Kt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new Ke(0)},specular:{value:new Ke(1118481)},shininess:{value:30}}]),vertexShader:He.meshphong_vert,fragmentShader:He.meshphong_frag},standard:{uniforms:Kt([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new Ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag},toon:{uniforms:Kt([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new Ke(0)}}]),vertexShader:He.meshtoon_vert,fragmentShader:He.meshtoon_frag},matcap:{uniforms:Kt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:He.meshmatcap_vert,fragmentShader:He.meshmatcap_frag},points:{uniforms:Kt([ae.points,ae.fog]),vertexShader:He.points_vert,fragmentShader:He.points_frag},dashed:{uniforms:Kt([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:He.linedashed_vert,fragmentShader:He.linedashed_frag},depth:{uniforms:Kt([ae.common,ae.displacementmap]),vertexShader:He.depth_vert,fragmentShader:He.depth_frag},normal:{uniforms:Kt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:He.meshnormal_vert,fragmentShader:He.meshnormal_frag},sprite:{uniforms:Kt([ae.sprite,ae.fog]),vertexShader:He.sprite_vert,fragmentShader:He.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:He.background_vert,fragmentShader:He.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:He.backgroundCube_vert,fragmentShader:He.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:He.cube_vert,fragmentShader:He.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:He.equirect_vert,fragmentShader:He.equirect_frag},distanceRGBA:{uniforms:Kt([ae.common,ae.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:He.distanceRGBA_vert,fragmentShader:He.distanceRGBA_frag},shadow:{uniforms:Kt([ae.lights,ae.fog,{color:{value:new Ke(0)},opacity:{value:1}}]),vertexShader:He.shadow_vert,fragmentShader:He.shadow_frag}};Jn.physical={uniforms:Kt([Jn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new Oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new Ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new Oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new Ke(0)},specularColor:{value:new Ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new Oe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag};const el={r:0,b:0,g:0};function EC(t,e,n,i,r,s,o){const a=new Ke(0);let l=s===!0?0:1,c,u,d=null,h=0,p=null;function _(m,f){let v=!1,g=f.isScene===!0?f.background:null;g&&g.isTexture&&(g=(f.backgroundBlurriness>0?n:e).get(g)),g===null?y(a,l):g&&g.isColor&&(y(g,1),v=!0);const x=t.xr.getEnvironmentBlendMode();x==="additive"?i.buffers.color.setClear(0,0,0,1,o):x==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(t.autoClear||v)&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),g&&(g.isCubeTexture||g.mapping===wc)?(u===void 0&&(u=new ei(new ua(1,1,1),new rn({name:"BackgroundCubeMaterial",uniforms:Hs(Jn.backgroundCube.uniforms),vertexShader:Jn.backgroundCube.vertexShader,fragmentShader:Jn.backgroundCube.fragmentShader,side:ln,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,C,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=g,u.material.uniforms.flipEnvMap.value=g.isCubeTexture&&g.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,u.material.toneMapped=Je.getTransfer(g.colorSpace)!==st,(d!==g||h!==g.version||p!==t.toneMapping)&&(u.material.needsUpdate=!0,d=g,h=g.version,p=t.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):g&&g.isTexture&&(c===void 0&&(c=new ei(new Rc(2,2),new rn({name:"BackgroundMaterial",uniforms:Hs(Jn.background.uniforms),vertexShader:Jn.background.vertexShader,fragmentShader:Jn.background.fragmentShader,side:ir,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=g,c.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,c.material.toneMapped=Je.getTransfer(g.colorSpace)!==st,g.matrixAutoUpdate===!0&&g.updateMatrix(),c.material.uniforms.uvTransform.value.copy(g.matrix),(d!==g||h!==g.version||p!==t.toneMapping)&&(c.material.needsUpdate=!0,d=g,h=g.version,p=t.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function y(m,f){m.getRGB(el,k0(t)),i.buffers.color.setClear(el.r,el.g,el.b,f,o)}return{getClearColor:function(){return a},setClearColor:function(m,f=1){a.set(m),l=f,y(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,y(a,l)},render:_}}function MC(t,e,n,i){const r=t.getParameter(t.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),o=i.isWebGL2||s!==null,a={},l=m(null);let c=l,u=!1;function d(b,U,F,Y,D){let k=!1;if(o){const W=y(Y,F,U);c!==W&&(c=W,p(c.object)),k=f(b,Y,F,D),k&&v(b,Y,F,D)}else{const W=U.wireframe===!0;(c.geometry!==Y.id||c.program!==F.id||c.wireframe!==W)&&(c.geometry=Y.id,c.program=F.id,c.wireframe=W,k=!0)}D!==null&&n.update(D,t.ELEMENT_ARRAY_BUFFER),(k||u)&&(u=!1,N(b,U,F,Y),D!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,n.get(D).buffer))}function h(){return i.isWebGL2?t.createVertexArray():s.createVertexArrayOES()}function p(b){return i.isWebGL2?t.bindVertexArray(b):s.bindVertexArrayOES(b)}function _(b){return i.isWebGL2?t.deleteVertexArray(b):s.deleteVertexArrayOES(b)}function y(b,U,F){const Y=F.wireframe===!0;let D=a[b.id];D===void 0&&(D={},a[b.id]=D);let k=D[U.id];k===void 0&&(k={},D[U.id]=k);let W=k[Y];return W===void 0&&(W=m(h()),k[Y]=W),W}function m(b){const U=[],F=[],Y=[];for(let D=0;D<r;D++)U[D]=0,F[D]=0,Y[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:F,attributeDivisors:Y,object:b,attributes:{},index:null}}function f(b,U,F,Y){const D=c.attributes,k=U.attributes;let W=0;const J=F.getAttributes();for(const ee in J)if(J[ee].location>=0){const Q=D[ee];let ce=k[ee];if(ce===void 0&&(ee==="instanceMatrix"&&b.instanceMatrix&&(ce=b.instanceMatrix),ee==="instanceColor"&&b.instanceColor&&(ce=b.instanceColor)),Q===void 0||Q.attribute!==ce||ce&&Q.data!==ce.data)return!0;W++}return c.attributesNum!==W||c.index!==Y}function v(b,U,F,Y){const D={},k=U.attributes;let W=0;const J=F.getAttributes();for(const ee in J)if(J[ee].location>=0){let Q=k[ee];Q===void 0&&(ee==="instanceMatrix"&&b.instanceMatrix&&(Q=b.instanceMatrix),ee==="instanceColor"&&b.instanceColor&&(Q=b.instanceColor));const ce={};ce.attribute=Q,Q&&Q.data&&(ce.data=Q.data),D[ee]=ce,W++}c.attributes=D,c.attributesNum=W,c.index=Y}function g(){const b=c.newAttributes;for(let U=0,F=b.length;U<F;U++)b[U]=0}function x(b){R(b,0)}function R(b,U){const F=c.newAttributes,Y=c.enabledAttributes,D=c.attributeDivisors;F[b]=1,Y[b]===0&&(t.enableVertexAttribArray(b),Y[b]=1),D[b]!==U&&((i.isWebGL2?t:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](b,U),D[b]=U)}function C(){const b=c.newAttributes,U=c.enabledAttributes;for(let F=0,Y=U.length;F<Y;F++)U[F]!==b[F]&&(t.disableVertexAttribArray(F),U[F]=0)}function A(b,U,F,Y,D,k,W){W===!0?t.vertexAttribIPointer(b,U,F,D,k):t.vertexAttribPointer(b,U,F,Y,D,k)}function N(b,U,F,Y){if(i.isWebGL2===!1&&(b.isInstancedMesh||Y.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;g();const D=Y.attributes,k=F.getAttributes(),W=U.defaultAttributeValues;for(const J in k){const ee=k[J];if(ee.location>=0){let K=D[J];if(K===void 0&&(J==="instanceMatrix"&&b.instanceMatrix&&(K=b.instanceMatrix),J==="instanceColor"&&b.instanceColor&&(K=b.instanceColor)),K!==void 0){const Q=K.normalized,ce=K.itemSize,ge=n.get(K);if(ge===void 0)continue;const se=ge.buffer,ve=ge.type,be=ge.bytesPerElement,_e=i.isWebGL2===!0&&(ve===t.INT||ve===t.UNSIGNED_INT||K.gpuType===x0);if(K.isInterleavedBufferAttribute){const je=K.data,H=je.stride,wt=K.offset;if(je.isInstancedInterleavedBuffer){for(let we=0;we<ee.locationSize;we++)R(ee.location+we,je.meshPerAttribute);b.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=je.meshPerAttribute*je.count)}else for(let we=0;we<ee.locationSize;we++)x(ee.location+we);t.bindBuffer(t.ARRAY_BUFFER,se);for(let we=0;we<ee.locationSize;we++)A(ee.location+we,ce/ee.locationSize,ve,Q,H*be,(wt+ce/ee.locationSize*we)*be,_e)}else{if(K.isInstancedBufferAttribute){for(let je=0;je<ee.locationSize;je++)R(ee.location+je,K.meshPerAttribute);b.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let je=0;je<ee.locationSize;je++)x(ee.location+je);t.bindBuffer(t.ARRAY_BUFFER,se);for(let je=0;je<ee.locationSize;je++)A(ee.location+je,ce/ee.locationSize,ve,Q,ce*be,ce/ee.locationSize*je*be,_e)}}else if(W!==void 0){const Q=W[J];if(Q!==void 0)switch(Q.length){case 2:t.vertexAttrib2fv(ee.location,Q);break;case 3:t.vertexAttrib3fv(ee.location,Q);break;case 4:t.vertexAttrib4fv(ee.location,Q);break;default:t.vertexAttrib1fv(ee.location,Q)}}}}C()}function E(){z();for(const b in a){const U=a[b];for(const F in U){const Y=U[F];for(const D in Y)_(Y[D].object),delete Y[D];delete U[F]}delete a[b]}}function w(b){if(a[b.id]===void 0)return;const U=a[b.id];for(const F in U){const Y=U[F];for(const D in Y)_(Y[D].object),delete Y[D];delete U[F]}delete a[b.id]}function X(b){for(const U in a){const F=a[U];if(F[b.id]===void 0)continue;const Y=F[b.id];for(const D in Y)_(Y[D].object),delete Y[D];delete F[b.id]}}function z(){q(),u=!0,c!==l&&(c=l,p(c.object))}function q(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:z,resetDefaultState:q,dispose:E,releaseStatesOfGeometry:w,releaseStatesOfProgram:X,initAttributes:g,enableAttribute:x,disableUnusedAttributes:C}}function wC(t,e,n,i){const r=i.isWebGL2;let s;function o(u){s=u}function a(u,d){t.drawArrays(s,u,d),n.update(d,s,1)}function l(u,d,h){if(h===0)return;let p,_;if(r)p=t,_="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),_="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[_](s,u,d,h),n.update(d,s,h)}function c(u,d,h){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<h;_++)this.render(u[_],d[_]);else{p.multiDrawArraysWEBGL(s,u,0,d,0,h);let _=0;for(let y=0;y<h;y++)_+=d[y];n.update(_,s,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function TC(t,e,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");i=t.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(A){if(A==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&t.constructor.name==="WebGL2RenderingContext";let a=n.precision!==void 0?n.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),u=n.logarithmicDepthBuffer===!0,d=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),h=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=t.getParameter(t.MAX_TEXTURE_SIZE),_=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),y=t.getParameter(t.MAX_VERTEX_ATTRIBS),m=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),f=t.getParameter(t.MAX_VARYING_VECTORS),v=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),g=h>0,x=o||e.has("OES_texture_float"),R=g&&x,C=o?t.getParameter(t.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:h,maxTextureSize:p,maxCubemapSize:_,maxAttributes:y,maxVertexUniforms:m,maxVaryings:f,maxFragmentUniforms:v,vertexTextures:g,floatFragmentTextures:x,floatVertexTextures:R,maxSamples:C}}function AC(t){const e=this;let n=null,i=0,r=!1,s=!1;const o=new Sr,a=new We,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const p=d.length!==0||h||i!==0||r;return r=h,i=d.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){n=u(d,h,0)},this.setState=function(d,h,p){const _=d.clippingPlanes,y=d.clipIntersection,m=d.clipShadows,f=t.get(d);if(!r||_===null||_.length===0||s&&!m)s?u(null):c();else{const v=s?0:i,g=v*4;let x=f.clippingState||null;l.value=x,x=u(_,h,g,p);for(let R=0;R!==g;++R)x[R]=n[R];f.clippingState=x,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,h,p,_){const y=d!==null?d.length:0;let m=null;if(y!==0){if(m=l.value,_!==!0||m===null){const f=p+y*4,v=h.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<f)&&(m=new Float32Array(f));for(let g=0,x=p;g!==y;++g,x+=4)o.copy(d[g]).applyMatrix4(v,a),o.normal.toArray(m,x),m[x+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}function CC(t){let e=new WeakMap;function n(o,a){return a===Vd?o.mapping=Fs:a===Wd&&(o.mapping=zs),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Vd||a===Wd)if(e.has(o)){const l=e.get(o).texture;return n(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new zT(l.height/2);return c.fromEquirectangularTexture(t,o),e.set(o,c),o.addEventListener("dispose",r),n(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class fh extends F0{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const Ss=4,Zm=[.125,.215,.35,.446,.526,.582],Tr=20,Ou=new fh,Jm=new Ke;let ku=null,Fu=0,zu=0;const Er=(1+Math.sqrt(5))/2,ss=1/Er,Qm=[new B(1,1,1),new B(-1,1,1),new B(1,1,-1),new B(-1,1,-1),new B(0,Er,ss),new B(0,Er,-ss),new B(ss,0,Er),new B(-ss,0,Er),new B(Er,ss,0),new B(-Er,ss,0)];class eg{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){ku=this._renderer.getRenderTarget(),Fu=this._renderer.getActiveCubeFace(),zu=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ig(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ng(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ku,Fu,zu),e.scissorTest=!1,tl(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Fs||e.mapping===zs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ku=this._renderer.getRenderTarget(),Fu=this._renderer.getActiveCubeFace(),zu=this._renderer.getActiveMipmapLevel();const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:wn,minFilter:wn,generateMipmaps:!1,type:xi,format:Gn,colorSpace:Ci,depthBuffer:!1},r=tg(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=tg(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=RC(s)),this._blurMaterial=bC(s,e,n)}return r}_compileMaterial(e){const n=new ei(this._lodPlanes[0],e);this._renderer.compile(n,Ou)}_sceneToCubeUV(e,n,i,r){const a=new Bn(90,1,n,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,h=u.toneMapping;u.getClearColor(Jm),u.toneMapping=Qi,u.autoClear=!1;const p=new dh({name:"PMREM.Background",side:ln,depthWrite:!1,depthTest:!1}),_=new ei(new ua,p);let y=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,y=!0):(p.color.copy(Jm),y=!0);for(let f=0;f<6;f++){const v=f%3;v===0?(a.up.set(0,l[f],0),a.lookAt(c[f],0,0)):v===1?(a.up.set(0,0,l[f]),a.lookAt(0,c[f],0)):(a.up.set(0,l[f],0),a.lookAt(0,0,c[f]));const g=this._cubeSize;tl(r,v*g,f>2?g:0,g,g),u.setRenderTarget(r),y&&u.render(_,a),u.render(e,a)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=h,u.autoClear=d,e.background=m}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Fs||e.mapping===zs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ig()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ng());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new ei(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;tl(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,Ou)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Qm[(r-1)%Qm.length];this._blur(e,r-1,r,s,o)}n.autoClear=i}_blur(e,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new ei(this._lodPlanes[r],c),h=c.uniforms,p=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Tr-1),y=s/_,m=isFinite(s)?1+Math.floor(u*y):Tr;m>Tr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Tr}`);const f=[];let v=0;for(let A=0;A<Tr;++A){const N=A/y,E=Math.exp(-N*N/2);f.push(E),A===0?v+=E:A<m&&(v+=2*E)}for(let A=0;A<f.length;A++)f[A]=f[A]/v;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=f,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:g}=this;h.dTheta.value=_,h.mipInt.value=g-i;const x=this._sizeLods[r],R=3*x*(r>g-Ss?r-g+Ss:0),C=4*(this._cubeSize-x);tl(n,R,C,3*x,2*x),l.setRenderTarget(n),l.render(d,Ou)}}function RC(t){const e=[],n=[],i=[];let r=t;const s=t-Ss+1+Zm.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);n.push(a);let l=1/a;o>t-Ss?l=Zm[o-t+Ss-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,_=6,y=3,m=2,f=1,v=new Float32Array(y*_*p),g=new Float32Array(m*_*p),x=new Float32Array(f*_*p);for(let C=0;C<p;C++){const A=C%3*2/3-1,N=C>2?0:-1,E=[A,N,0,A+2/3,N,0,A+2/3,N+1,0,A,N,0,A+2/3,N+1,0,A,N+1,0];v.set(E,y*_*C),g.set(h,m*_*C);const w=[C,C,C,C,C,C];x.set(w,f*_*C)}const R=new lr;R.setAttribute("position",new ii(v,y)),R.setAttribute("uv",new ii(g,m)),R.setAttribute("faceIndex",new ii(x,f)),e.push(R),r>Ss&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function tg(t,e,n){const i=new jn(t,e,n);return i.texture.mapping=wc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function tl(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function bC(t,e,n){const i=new Float32Array(Tr),r=new B(0,1,0);return new rn({name:"SphericalGaussianBlur",defines:{n:Tr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:hh(),fragmentShader:`

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
		`,blending:yi,depthTest:!1,depthWrite:!1})}function ng(){return new rn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:hh(),fragmentShader:`

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
		`,blending:yi,depthTest:!1,depthWrite:!1})}function ig(){return new rn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:hh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:yi,depthTest:!1,depthWrite:!1})}function hh(){return`

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
	`}function PC(t){let e=new WeakMap,n=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Vd||l===Wd,u=l===Fs||l===zs;if(c||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let d=e.get(a);return n===null&&(n=new eg(t)),d=c?n.fromEquirectangular(a,d):n.fromCubemap(a,d),e.set(a,d),d.texture}else{if(e.has(a))return e.get(a).texture;{const d=a.image;if(c&&d&&d.height>0||u&&d&&r(d)){n===null&&(n=new eg(t));const h=c?n.fromEquirectangular(a):n.fromCubemap(a);return e.set(a,h),a.addEventListener("dispose",s),h.texture}else return null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function LC(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(i){i.isWebGL2?(n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance")):(n("WEBGL_depth_texture"),n("OES_texture_float"),n("OES_texture_half_float"),n("OES_texture_half_float_linear"),n("OES_standard_derivatives"),n("OES_element_index_uint"),n("OES_vertex_array_object"),n("ANGLE_instanced_arrays")),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture")},get:function(i){const r=n(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function DC(t,e,n,i){const r={},s=new WeakMap;function o(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const _ in h.attributes)e.remove(h.attributes[_]);for(const _ in h.morphAttributes){const y=h.morphAttributes[_];for(let m=0,f=y.length;m<f;m++)e.remove(y[m])}h.removeEventListener("dispose",o),delete r[h.id];const p=s.get(h);p&&(e.remove(p),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,n.memory.geometries--}function a(d,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,n.memory.geometries++),h}function l(d){const h=d.attributes;for(const _ in h)e.update(h[_],t.ARRAY_BUFFER);const p=d.morphAttributes;for(const _ in p){const y=p[_];for(let m=0,f=y.length;m<f;m++)e.update(y[m],t.ARRAY_BUFFER)}}function c(d){const h=[],p=d.index,_=d.attributes.position;let y=0;if(p!==null){const v=p.array;y=p.version;for(let g=0,x=v.length;g<x;g+=3){const R=v[g+0],C=v[g+1],A=v[g+2];h.push(R,C,C,A,A,R)}}else if(_!==void 0){const v=_.array;y=_.version;for(let g=0,x=v.length/3-1;g<x;g+=3){const R=g+0,C=g+1,A=g+2;h.push(R,C,C,A,A,R)}}else return;const m=new(b0(h)?O0:I0)(h,1);m.version=y;const f=s.get(d);f&&e.remove(f),s.set(d,m)}function u(d){const h=s.get(d);if(h){const p=d.index;p!==null&&h.version<p.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function NC(t,e,n,i){const r=i.isWebGL2;let s;function o(p){s=p}let a,l;function c(p){a=p.type,l=p.bytesPerElement}function u(p,_){t.drawElements(s,_,a,p*l),n.update(_,s,1)}function d(p,_,y){if(y===0)return;let m,f;if(r)m=t,f="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),f="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[f](s,_,a,p*l,y),n.update(_,s,y)}function h(p,_,y){if(y===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<y;f++)this.render(p[f]/l,_[f]);else{m.multiDrawElementsWEBGL(s,_,0,a,p,0,y);let f=0;for(let v=0;v<y;v++)f+=_[v];n.update(f,s,1)}}this.setMode=o,this.setIndex=c,this.render=u,this.renderInstances=d,this.renderMultiDraw=h}function UC(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=a*(s/3);break;case t.LINES:n.lines+=a*(s/2);break;case t.LINE_STRIP:n.lines+=a*(s-1);break;case t.LINE_LOOP:n.lines+=a*s;break;case t.POINTS:n.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function IC(t,e){return t[0]-e[0]}function OC(t,e){return Math.abs(e[1])-Math.abs(t[1])}function kC(t,e,n){const i={},r=new Float32Array(8),s=new WeakMap,o=new Nt,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,u,d){const h=c.morphTargetInfluences;if(e.isWebGL2===!0){const _=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,y=_!==void 0?_.length:0;let m=s.get(u);if(m===void 0||m.count!==y){let U=function(){q.dispose(),s.delete(u),u.removeEventListener("dispose",U)};var p=U;m!==void 0&&m.texture.dispose();const g=u.morphAttributes.position!==void 0,x=u.morphAttributes.normal!==void 0,R=u.morphAttributes.color!==void 0,C=u.morphAttributes.position||[],A=u.morphAttributes.normal||[],N=u.morphAttributes.color||[];let E=0;g===!0&&(E=1),x===!0&&(E=2),R===!0&&(E=3);let w=u.attributes.position.count*E,X=1;w>e.maxTextureSize&&(X=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const z=new Float32Array(w*X*4*y),q=new D0(z,w,X,y);q.type=Wi,q.needsUpdate=!0;const b=E*4;for(let F=0;F<y;F++){const Y=C[F],D=A[F],k=N[F],W=w*X*4*F;for(let J=0;J<Y.count;J++){const ee=J*b;g===!0&&(o.fromBufferAttribute(Y,J),z[W+ee+0]=o.x,z[W+ee+1]=o.y,z[W+ee+2]=o.z,z[W+ee+3]=0),x===!0&&(o.fromBufferAttribute(D,J),z[W+ee+4]=o.x,z[W+ee+5]=o.y,z[W+ee+6]=o.z,z[W+ee+7]=0),R===!0&&(o.fromBufferAttribute(k,J),z[W+ee+8]=o.x,z[W+ee+9]=o.y,z[W+ee+10]=o.z,z[W+ee+11]=k.itemSize===4?o.w:1)}}m={count:y,texture:q,size:new Oe(w,X)},s.set(u,m),u.addEventListener("dispose",U)}let f=0;for(let g=0;g<h.length;g++)f+=h[g];const v=u.morphTargetsRelative?1:1-f;d.getUniforms().setValue(t,"morphTargetBaseInfluence",v),d.getUniforms().setValue(t,"morphTargetInfluences",h),d.getUniforms().setValue(t,"morphTargetsTexture",m.texture,n),d.getUniforms().setValue(t,"morphTargetsTextureSize",m.size)}else{const _=h===void 0?0:h.length;let y=i[u.id];if(y===void 0||y.length!==_){y=[];for(let x=0;x<_;x++)y[x]=[x,0];i[u.id]=y}for(let x=0;x<_;x++){const R=y[x];R[0]=x,R[1]=h[x]}y.sort(OC);for(let x=0;x<8;x++)x<_&&y[x][1]?(a[x][0]=y[x][0],a[x][1]=y[x][1]):(a[x][0]=Number.MAX_SAFE_INTEGER,a[x][1]=0);a.sort(IC);const m=u.morphAttributes.position,f=u.morphAttributes.normal;let v=0;for(let x=0;x<8;x++){const R=a[x],C=R[0],A=R[1];C!==Number.MAX_SAFE_INTEGER&&A?(m&&u.getAttribute("morphTarget"+x)!==m[C]&&u.setAttribute("morphTarget"+x,m[C]),f&&u.getAttribute("morphNormal"+x)!==f[C]&&u.setAttribute("morphNormal"+x,f[C]),r[x]=A,v+=A):(m&&u.hasAttribute("morphTarget"+x)===!0&&u.deleteAttribute("morphTarget"+x),f&&u.hasAttribute("morphNormal"+x)===!0&&u.deleteAttribute("morphNormal"+x),r[x]=0)}const g=u.morphTargetsRelative?1:1-v;d.getUniforms().setValue(t,"morphTargetBaseInfluence",g),d.getUniforms().setValue(t,"morphTargetInfluences",r)}}return{update:l}}function FC(t,e,n,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,d=e.get(l,u);if(r.get(d)!==c&&(e.update(d),r.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return d}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:s,dispose:o}}class G0 extends mn{constructor(e,n,i,r,s,o,a,l,c,u){if(u=u!==void 0?u:Ur,u!==Ur&&u!==Bs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Ur&&(i=Vi),i===void 0&&u===Bs&&(i=Nr),super(null,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=a!==void 0?a:qt,this.minFilter=l!==void 0?l:qt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const V0=new mn,W0=new G0(1,1);W0.compareFunction=R0;const j0=new D0,X0=new ET,$0=new z0,rg=[],sg=[],og=new Float32Array(16),ag=new Float32Array(9),lg=new Float32Array(4);function qs(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=rg[r];if(s===void 0&&(s=new Float32Array(r),rg[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=n,t[o].toArray(s,a)}return s}function Et(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Mt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function bc(t,e){let n=sg[e];n===void 0&&(n=new Int32Array(e),sg[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function zC(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function BC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Et(n,e))return;t.uniform2fv(this.addr,e),Mt(n,e)}}function HC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Et(n,e))return;t.uniform3fv(this.addr,e),Mt(n,e)}}function GC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Et(n,e))return;t.uniform4fv(this.addr,e),Mt(n,e)}}function VC(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Et(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Mt(n,e)}else{if(Et(n,i))return;lg.set(i),t.uniformMatrix2fv(this.addr,!1,lg),Mt(n,i)}}function WC(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Et(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Mt(n,e)}else{if(Et(n,i))return;ag.set(i),t.uniformMatrix3fv(this.addr,!1,ag),Mt(n,i)}}function jC(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Et(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Mt(n,e)}else{if(Et(n,i))return;og.set(i),t.uniformMatrix4fv(this.addr,!1,og),Mt(n,i)}}function XC(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function $C(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Et(n,e))return;t.uniform2iv(this.addr,e),Mt(n,e)}}function KC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Et(n,e))return;t.uniform3iv(this.addr,e),Mt(n,e)}}function YC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Et(n,e))return;t.uniform4iv(this.addr,e),Mt(n,e)}}function qC(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function ZC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Et(n,e))return;t.uniform2uiv(this.addr,e),Mt(n,e)}}function JC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Et(n,e))return;t.uniform3uiv(this.addr,e),Mt(n,e)}}function QC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Et(n,e))return;t.uniform4uiv(this.addr,e),Mt(n,e)}}function eR(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);const s=this.type===t.SAMPLER_2D_SHADOW?W0:V0;n.setTexture2D(e||s,r)}function tR(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||X0,r)}function nR(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||$0,r)}function iR(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||j0,r)}function rR(t){switch(t){case 5126:return zC;case 35664:return BC;case 35665:return HC;case 35666:return GC;case 35674:return VC;case 35675:return WC;case 35676:return jC;case 5124:case 35670:return XC;case 35667:case 35671:return $C;case 35668:case 35672:return KC;case 35669:case 35673:return YC;case 5125:return qC;case 36294:return ZC;case 36295:return JC;case 36296:return QC;case 35678:case 36198:case 36298:case 36306:case 35682:return eR;case 35679:case 36299:case 36307:return tR;case 35680:case 36300:case 36308:case 36293:return nR;case 36289:case 36303:case 36311:case 36292:return iR}}function sR(t,e){t.uniform1fv(this.addr,e)}function oR(t,e){const n=qs(e,this.size,2);t.uniform2fv(this.addr,n)}function aR(t,e){const n=qs(e,this.size,3);t.uniform3fv(this.addr,n)}function lR(t,e){const n=qs(e,this.size,4);t.uniform4fv(this.addr,n)}function cR(t,e){const n=qs(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function uR(t,e){const n=qs(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function dR(t,e){const n=qs(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function fR(t,e){t.uniform1iv(this.addr,e)}function hR(t,e){t.uniform2iv(this.addr,e)}function pR(t,e){t.uniform3iv(this.addr,e)}function mR(t,e){t.uniform4iv(this.addr,e)}function gR(t,e){t.uniform1uiv(this.addr,e)}function vR(t,e){t.uniform2uiv(this.addr,e)}function _R(t,e){t.uniform3uiv(this.addr,e)}function yR(t,e){t.uniform4uiv(this.addr,e)}function xR(t,e,n){const i=this.cache,r=e.length,s=bc(n,r);Et(i,s)||(t.uniform1iv(this.addr,s),Mt(i,s));for(let o=0;o!==r;++o)n.setTexture2D(e[o]||V0,s[o])}function SR(t,e,n){const i=this.cache,r=e.length,s=bc(n,r);Et(i,s)||(t.uniform1iv(this.addr,s),Mt(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||X0,s[o])}function ER(t,e,n){const i=this.cache,r=e.length,s=bc(n,r);Et(i,s)||(t.uniform1iv(this.addr,s),Mt(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||$0,s[o])}function MR(t,e,n){const i=this.cache,r=e.length,s=bc(n,r);Et(i,s)||(t.uniform1iv(this.addr,s),Mt(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||j0,s[o])}function wR(t){switch(t){case 5126:return sR;case 35664:return oR;case 35665:return aR;case 35666:return lR;case 35674:return cR;case 35675:return uR;case 35676:return dR;case 5124:case 35670:return fR;case 35667:case 35671:return hR;case 35668:case 35672:return pR;case 35669:case 35673:return mR;case 5125:return gR;case 36294:return vR;case 36295:return _R;case 36296:return yR;case 35678:case 36198:case 36298:case 36306:case 35682:return xR;case 35679:case 36299:case 36307:return SR;case 35680:case 36300:case 36308:case 36293:return ER;case 36289:case 36303:case 36311:case 36292:return MR}}class TR{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=rR(n.type)}}class AR{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=wR(n.type)}}class CR{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,n[a.id],i)}}}const Bu=/(\w+)(\])?(\[|\.)?/g;function cg(t,e){t.seq.push(e),t.map[e.id]=e}function RR(t,e,n){const i=t.name,r=i.length;for(Bu.lastIndex=0;;){const s=Bu.exec(i),o=Bu.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){cg(n,c===void 0?new TR(a,t,e):new AR(a,t,e));break}else{let d=n.map[a];d===void 0&&(d=new CR(a),cg(n,d)),n=d}}}class _l{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),o=e.getUniformLocation(n,s.name);RR(s,o,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function ug(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const bR=37297;let PR=0;function LR(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}function DR(t){const e=Je.getPrimaries(Je.workingColorSpace),n=Je.getPrimaries(t);let i;switch(e===n?i="":e===Zl&&n===ql?i="LinearDisplayP3ToLinearSRGB":e===ql&&n===Zl&&(i="LinearSRGBToLinearDisplayP3"),t){case Ci:case Tc:return[i,"LinearTransferOETF"];case Dt:case lh:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",t),[i,"LinearTransferOETF"]}}function dg(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+LR(t.getShaderSource(e),o)}else return r}function NR(t,e){const n=DR(e);return`vec4 ${t}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function UR(t,e){let n;switch(e){case Lw:n="Linear";break;case Dw:n="Reinhard";break;case Nw:n="OptimizedCineon";break;case Uw:n="ACESFilmic";break;case Ow:n="AgX";break;case Iw:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}function IR(t){return[t.extensionDerivatives||t.envMapCubeUVHeight||t.bumpMap||t.normalMapTangentSpace||t.clearcoatNormalMap||t.flatShading||t.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(t.extensionFragDepth||t.logarithmicDepthBuffer)&&t.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",t.extensionDrawBuffers&&t.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(t.extensionShaderTextureLOD||t.envMap||t.transmission)&&t.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Es).join(`
`)}function OR(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Es).join(`
`)}function kR(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function FR(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),o=s.name;let a=1;s.type===t.FLOAT_MAT2&&(a=2),s.type===t.FLOAT_MAT3&&(a=3),s.type===t.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:t.getAttribLocation(e,o),locationSize:a}}return n}function Es(t){return t!==""}function fg(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function hg(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const zR=/^[ \t]*#include +<([\w\d./]+)>/gm;function Yd(t){return t.replace(zR,HR)}const BR=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function HR(t,e){let n=He[e];if(n===void 0){const i=BR.get(e);if(i!==void 0)n=He[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Yd(n)}const GR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function pg(t){return t.replace(GR,VR)}function VR(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function mg(t){let e="precision "+t.precision+` float;
precision `+t.precision+" int;";return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function WR(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===v0?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===sw?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===ui&&(e="SHADOWMAP_TYPE_VSM"),e}function jR(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case Fs:case zs:e="ENVMAP_TYPE_CUBE";break;case wc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function XR(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case zs:e="ENVMAP_MODE_REFRACTION";break}return e}function $R(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case _0:e="ENVMAP_BLENDING_MULTIPLY";break;case bw:e="ENVMAP_BLENDING_MIX";break;case Pw:e="ENVMAP_BLENDING_ADD";break}return e}function KR(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function YR(t,e,n,i){const r=t.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const l=WR(n),c=jR(n),u=XR(n),d=$R(n),h=KR(n),p=n.isWebGL2?"":IR(n),_=OR(n),y=kR(s),m=r.createProgram();let f,v,g=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(f=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y].filter(Es).join(`
`),f.length>0&&(f+=`
`),v=[p,"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y].filter(Es).join(`
`),v.length>0&&(v+=`
`)):(f=[mg(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors&&n.isWebGL2?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Es).join(`
`),v=[p,mg(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+u:"",n.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Qi?"#define TONE_MAPPING":"",n.toneMapping!==Qi?He.tonemapping_pars_fragment:"",n.toneMapping!==Qi?UR("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",He.colorspace_pars_fragment,NR("linearToOutputTexel",n.outputColorSpace),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Es).join(`
`)),o=Yd(o),o=fg(o,n),o=hg(o,n),a=Yd(a),a=fg(a,n),a=hg(a,n),o=pg(o),a=pg(a),n.isWebGL2&&n.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,f=[_,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,v=["precision mediump sampler2DArray;","#define varying in",n.glslVersion===Dm?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Dm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const x=g+f+o,R=g+v+a,C=ug(r,r.VERTEX_SHADER,x),A=ug(r,r.FRAGMENT_SHADER,R);r.attachShader(m,C),r.attachShader(m,A),n.index0AttributeName!==void 0?r.bindAttribLocation(m,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m);function N(z){if(t.debug.checkShaderErrors){const q=r.getProgramInfoLog(m).trim(),b=r.getShaderInfoLog(C).trim(),U=r.getShaderInfoLog(A).trim();let F=!0,Y=!0;if(r.getProgramParameter(m,r.LINK_STATUS)===!1)if(F=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,m,C,A);else{const D=dg(r,C,"vertex"),k=dg(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,r.VALIDATE_STATUS)+`

Program Info Log: `+q+`
`+D+`
`+k)}else q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",q):(b===""||U==="")&&(Y=!1);Y&&(z.diagnostics={runnable:F,programLog:q,vertexShader:{log:b,prefix:f},fragmentShader:{log:U,prefix:v}})}r.deleteShader(C),r.deleteShader(A),E=new _l(r,m),w=FR(r,m)}let E;this.getUniforms=function(){return E===void 0&&N(this),E};let w;this.getAttributes=function(){return w===void 0&&N(this),w};let X=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return X===!1&&(X=r.getProgramParameter(m,bR)),X},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=PR++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=C,this.fragmentShader=A,this}let qR=0;class ZR{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new JR(e),n.set(e,i)),i}}class JR{constructor(e){this.id=qR++,this.code=e,this.usedTimes=0}}function QR(t,e,n,i,r,s,o){const a=new N0,l=new ZR,c=[],u=r.isWebGL2,d=r.logarithmicDepthBuffer,h=r.vertexTextures;let p=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(E){return E===0?"uv":`uv${E}`}function m(E,w,X,z,q){const b=z.fog,U=q.geometry,F=E.isMeshStandardMaterial?z.environment:null,Y=(E.isMeshStandardMaterial?n:e).get(E.envMap||F),D=Y&&Y.mapping===wc?Y.image.height:null,k=_[E.type];E.precision!==null&&(p=r.getMaxPrecision(E.precision),p!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));const W=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,J=W!==void 0?W.length:0;let ee=0;U.morphAttributes.position!==void 0&&(ee=1),U.morphAttributes.normal!==void 0&&(ee=2),U.morphAttributes.color!==void 0&&(ee=3);let K,Q,ce,ge;if(k){const Wt=Jn[k];K=Wt.vertexShader,Q=Wt.fragmentShader}else K=E.vertexShader,Q=E.fragmentShader,l.update(E),ce=l.getVertexShaderID(E),ge=l.getFragmentShaderID(E);const se=t.getRenderTarget(),ve=q.isInstancedMesh===!0,be=q.isBatchedMesh===!0,_e=!!E.map,je=!!E.matcap,H=!!Y,wt=!!E.aoMap,we=!!E.lightMap,De=!!E.bumpMap,ye=!!E.normalMap,it=!!E.displacementMap,Ae=!!E.emissiveMap,T=!!E.metalnessMap,S=!!E.roughnessMap,G=E.anisotropy>0,ne=E.clearcoat>0,te=E.iridescence>0,re=E.sheen>0,Se=E.transmission>0,le=G&&!!E.anisotropyMap,me=ne&&!!E.clearcoatMap,Ce=ne&&!!E.clearcoatNormalMap,ke=ne&&!!E.clearcoatRoughnessMap,Z=te&&!!E.iridescenceMap,ze=te&&!!E.iridescenceThicknessMap,Me=re&&!!E.sheenColorMap,Te=re&&!!E.sheenRoughnessMap,xe=!!E.specularMap,pe=!!E.specularColorMap,Pe=!!E.specularIntensityMap,$e=Se&&!!E.transmissionMap,Ye=Se&&!!E.thicknessMap,Ue=!!E.gradientMap,oe=!!E.alphaMap,P=E.alphaTest>0,ue=!!E.alphaHash,de=!!E.extensions,Ne=!!U.attributes.uv1,Re=!!U.attributes.uv2,Qe=!!U.attributes.uv3;let et=Qi;return E.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(et=t.toneMapping),{isWebGL2:u,shaderID:k,shaderType:E.type,shaderName:E.name,vertexShader:K,fragmentShader:Q,defines:E.defines,customVertexShaderID:ce,customFragmentShaderID:ge,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:be,instancing:ve,instancingColor:ve&&q.instanceColor!==null,supportsVertexTextures:h,outputColorSpace:se===null?t.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:Ci,map:_e,matcap:je,envMap:H,envMapMode:H&&Y.mapping,envMapCubeUVHeight:D,aoMap:wt,lightMap:we,bumpMap:De,normalMap:ye,displacementMap:h&&it,emissiveMap:Ae,normalMapObjectSpace:ye&&E.normalMapType===Yw,normalMapTangentSpace:ye&&E.normalMapType===Kw,metalnessMap:T,roughnessMap:S,anisotropy:G,anisotropyMap:le,clearcoat:ne,clearcoatMap:me,clearcoatNormalMap:Ce,clearcoatRoughnessMap:ke,iridescence:te,iridescenceMap:Z,iridescenceThicknessMap:ze,sheen:re,sheenColorMap:Me,sheenRoughnessMap:Te,specularMap:xe,specularColorMap:pe,specularIntensityMap:Pe,transmission:Se,transmissionMap:$e,thicknessMap:Ye,gradientMap:Ue,opaque:E.transparent===!1&&E.blending===bs,alphaMap:oe,alphaTest:P,alphaHash:ue,combine:E.combine,mapUv:_e&&y(E.map.channel),aoMapUv:wt&&y(E.aoMap.channel),lightMapUv:we&&y(E.lightMap.channel),bumpMapUv:De&&y(E.bumpMap.channel),normalMapUv:ye&&y(E.normalMap.channel),displacementMapUv:it&&y(E.displacementMap.channel),emissiveMapUv:Ae&&y(E.emissiveMap.channel),metalnessMapUv:T&&y(E.metalnessMap.channel),roughnessMapUv:S&&y(E.roughnessMap.channel),anisotropyMapUv:le&&y(E.anisotropyMap.channel),clearcoatMapUv:me&&y(E.clearcoatMap.channel),clearcoatNormalMapUv:Ce&&y(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ke&&y(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Z&&y(E.iridescenceMap.channel),iridescenceThicknessMapUv:ze&&y(E.iridescenceThicknessMap.channel),sheenColorMapUv:Me&&y(E.sheenColorMap.channel),sheenRoughnessMapUv:Te&&y(E.sheenRoughnessMap.channel),specularMapUv:xe&&y(E.specularMap.channel),specularColorMapUv:pe&&y(E.specularColorMap.channel),specularIntensityMapUv:Pe&&y(E.specularIntensityMap.channel),transmissionMapUv:$e&&y(E.transmissionMap.channel),thicknessMapUv:Ye&&y(E.thicknessMap.channel),alphaMapUv:oe&&y(E.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(ye||G),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,vertexUv1s:Ne,vertexUv2s:Re,vertexUv3s:Qe,pointsUvs:q.isPoints===!0&&!!U.attributes.uv&&(_e||oe),fog:!!b,useFog:E.fog===!0,fogExp2:b&&b.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:q.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:J,morphTextureStride:ee,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:t.shadowMap.enabled&&X.length>0,shadowMapType:t.shadowMap.type,toneMapping:et,useLegacyLights:t._useLegacyLights,decodeVideoTexture:_e&&E.map.isVideoTexture===!0&&Je.getTransfer(E.map.colorSpace)===st,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===hi,flipSided:E.side===ln,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionDerivatives:de&&E.extensions.derivatives===!0,extensionFragDepth:de&&E.extensions.fragDepth===!0,extensionDrawBuffers:de&&E.extensions.drawBuffers===!0,extensionShaderTextureLOD:de&&E.extensions.shaderTextureLOD===!0,extensionClipCullDistance:de&&E.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()}}function f(E){const w=[];if(E.shaderID?w.push(E.shaderID):(w.push(E.customVertexShaderID),w.push(E.customFragmentShaderID)),E.defines!==void 0)for(const X in E.defines)w.push(X),w.push(E.defines[X]);return E.isRawShaderMaterial===!1&&(v(w,E),g(w,E),w.push(t.outputColorSpace)),w.push(E.customProgramCacheKey),w.join()}function v(E,w){E.push(w.precision),E.push(w.outputColorSpace),E.push(w.envMapMode),E.push(w.envMapCubeUVHeight),E.push(w.mapUv),E.push(w.alphaMapUv),E.push(w.lightMapUv),E.push(w.aoMapUv),E.push(w.bumpMapUv),E.push(w.normalMapUv),E.push(w.displacementMapUv),E.push(w.emissiveMapUv),E.push(w.metalnessMapUv),E.push(w.roughnessMapUv),E.push(w.anisotropyMapUv),E.push(w.clearcoatMapUv),E.push(w.clearcoatNormalMapUv),E.push(w.clearcoatRoughnessMapUv),E.push(w.iridescenceMapUv),E.push(w.iridescenceThicknessMapUv),E.push(w.sheenColorMapUv),E.push(w.sheenRoughnessMapUv),E.push(w.specularMapUv),E.push(w.specularColorMapUv),E.push(w.specularIntensityMapUv),E.push(w.transmissionMapUv),E.push(w.thicknessMapUv),E.push(w.combine),E.push(w.fogExp2),E.push(w.sizeAttenuation),E.push(w.morphTargetsCount),E.push(w.morphAttributeCount),E.push(w.numDirLights),E.push(w.numPointLights),E.push(w.numSpotLights),E.push(w.numSpotLightMaps),E.push(w.numHemiLights),E.push(w.numRectAreaLights),E.push(w.numDirLightShadows),E.push(w.numPointLightShadows),E.push(w.numSpotLightShadows),E.push(w.numSpotLightShadowsWithMaps),E.push(w.numLightProbes),E.push(w.shadowMapType),E.push(w.toneMapping),E.push(w.numClippingPlanes),E.push(w.numClipIntersection),E.push(w.depthPacking)}function g(E,w){a.disableAll(),w.isWebGL2&&a.enable(0),w.supportsVertexTextures&&a.enable(1),w.instancing&&a.enable(2),w.instancingColor&&a.enable(3),w.matcap&&a.enable(4),w.envMap&&a.enable(5),w.normalMapObjectSpace&&a.enable(6),w.normalMapTangentSpace&&a.enable(7),w.clearcoat&&a.enable(8),w.iridescence&&a.enable(9),w.alphaTest&&a.enable(10),w.vertexColors&&a.enable(11),w.vertexAlphas&&a.enable(12),w.vertexUv1s&&a.enable(13),w.vertexUv2s&&a.enable(14),w.vertexUv3s&&a.enable(15),w.vertexTangents&&a.enable(16),w.anisotropy&&a.enable(17),w.alphaHash&&a.enable(18),w.batching&&a.enable(19),E.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.skinning&&a.enable(4),w.morphTargets&&a.enable(5),w.morphNormals&&a.enable(6),w.morphColors&&a.enable(7),w.premultipliedAlpha&&a.enable(8),w.shadowMapEnabled&&a.enable(9),w.useLegacyLights&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),E.push(a.mask)}function x(E){const w=_[E.type];let X;if(w){const z=Jn[w];X=tc.clone(z.uniforms)}else X=E.uniforms;return X}function R(E,w){let X;for(let z=0,q=c.length;z<q;z++){const b=c[z];if(b.cacheKey===w){X=b,++X.usedTimes;break}}return X===void 0&&(X=new YR(t,w,E,s),c.push(X)),X}function C(E){if(--E.usedTimes===0){const w=c.indexOf(E);c[w]=c[c.length-1],c.pop(),E.destroy()}}function A(E){l.remove(E)}function N(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:x,acquireProgram:R,releaseProgram:C,releaseShaderCache:A,programs:c,dispose:N}}function eb(){let t=new WeakMap;function e(s){let o=t.get(s);return o===void 0&&(o={},t.set(s,o)),o}function n(s){t.delete(s)}function i(s,o,a){t.get(s)[o]=a}function r(){t=new WeakMap}return{get:e,remove:n,update:i,dispose:r}}function tb(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function gg(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function vg(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(d,h,p,_,y,m){let f=t[e];return f===void 0?(f={id:d.id,object:d,geometry:h,material:p,groupOrder:_,renderOrder:d.renderOrder,z:y,group:m},t[e]=f):(f.id=d.id,f.object=d,f.geometry=h,f.material=p,f.groupOrder=_,f.renderOrder=d.renderOrder,f.z=y,f.group=m),e++,f}function a(d,h,p,_,y,m){const f=o(d,h,p,_,y,m);p.transmission>0?i.push(f):p.transparent===!0?r.push(f):n.push(f)}function l(d,h,p,_,y,m){const f=o(d,h,p,_,y,m);p.transmission>0?i.unshift(f):p.transparent===!0?r.unshift(f):n.unshift(f)}function c(d,h){n.length>1&&n.sort(d||tb),i.length>1&&i.sort(h||gg),r.length>1&&r.sort(h||gg)}function u(){for(let d=e,h=t.length;d<h;d++){const p=t[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function nb(){let t=new WeakMap;function e(i,r){const s=t.get(i);let o;return s===void 0?(o=new vg,t.set(i,[o])):r>=s.length?(o=new vg,s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function ib(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new B,color:new Ke};break;case"SpotLight":n={position:new B,direction:new B,color:new Ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new B,color:new Ke,distance:0,decay:0};break;case"HemisphereLight":n={direction:new B,skyColor:new Ke,groundColor:new Ke};break;case"RectAreaLight":n={color:new Ke,position:new B,halfWidth:new B,halfHeight:new B};break}return t[e.id]=n,n}}}function rb(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"SpotLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"PointLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let sb=0;function ob(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function ab(t,e){const n=new ib,i=rb(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)r.probe.push(new B);const s=new B,o=new It,a=new It;function l(u,d){let h=0,p=0,_=0;for(let z=0;z<9;z++)r.probe[z].set(0,0,0);let y=0,m=0,f=0,v=0,g=0,x=0,R=0,C=0,A=0,N=0,E=0;u.sort(ob);const w=d===!0?Math.PI:1;for(let z=0,q=u.length;z<q;z++){const b=u[z],U=b.color,F=b.intensity,Y=b.distance,D=b.shadow&&b.shadow.map?b.shadow.map.texture:null;if(b.isAmbientLight)h+=U.r*F*w,p+=U.g*F*w,_+=U.b*F*w;else if(b.isLightProbe){for(let k=0;k<9;k++)r.probe[k].addScaledVector(b.sh.coefficients[k],F);E++}else if(b.isDirectionalLight){const k=n.get(b);if(k.color.copy(b.color).multiplyScalar(b.intensity*w),b.castShadow){const W=b.shadow,J=i.get(b);J.shadowBias=W.bias,J.shadowNormalBias=W.normalBias,J.shadowRadius=W.radius,J.shadowMapSize=W.mapSize,r.directionalShadow[y]=J,r.directionalShadowMap[y]=D,r.directionalShadowMatrix[y]=b.shadow.matrix,x++}r.directional[y]=k,y++}else if(b.isSpotLight){const k=n.get(b);k.position.setFromMatrixPosition(b.matrixWorld),k.color.copy(U).multiplyScalar(F*w),k.distance=Y,k.coneCos=Math.cos(b.angle),k.penumbraCos=Math.cos(b.angle*(1-b.penumbra)),k.decay=b.decay,r.spot[f]=k;const W=b.shadow;if(b.map&&(r.spotLightMap[A]=b.map,A++,W.updateMatrices(b),b.castShadow&&N++),r.spotLightMatrix[f]=W.matrix,b.castShadow){const J=i.get(b);J.shadowBias=W.bias,J.shadowNormalBias=W.normalBias,J.shadowRadius=W.radius,J.shadowMapSize=W.mapSize,r.spotShadow[f]=J,r.spotShadowMap[f]=D,C++}f++}else if(b.isRectAreaLight){const k=n.get(b);k.color.copy(U).multiplyScalar(F),k.halfWidth.set(b.width*.5,0,0),k.halfHeight.set(0,b.height*.5,0),r.rectArea[v]=k,v++}else if(b.isPointLight){const k=n.get(b);if(k.color.copy(b.color).multiplyScalar(b.intensity*w),k.distance=b.distance,k.decay=b.decay,b.castShadow){const W=b.shadow,J=i.get(b);J.shadowBias=W.bias,J.shadowNormalBias=W.normalBias,J.shadowRadius=W.radius,J.shadowMapSize=W.mapSize,J.shadowCameraNear=W.camera.near,J.shadowCameraFar=W.camera.far,r.pointShadow[m]=J,r.pointShadowMap[m]=D,r.pointShadowMatrix[m]=b.shadow.matrix,R++}r.point[m]=k,m++}else if(b.isHemisphereLight){const k=n.get(b);k.skyColor.copy(b.color).multiplyScalar(F*w),k.groundColor.copy(b.groundColor).multiplyScalar(F*w),r.hemi[g]=k,g++}}v>0&&(e.isWebGL2?t.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ae.LTC_FLOAT_1,r.rectAreaLTC2=ae.LTC_FLOAT_2):(r.rectAreaLTC1=ae.LTC_HALF_1,r.rectAreaLTC2=ae.LTC_HALF_2):t.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ae.LTC_FLOAT_1,r.rectAreaLTC2=ae.LTC_FLOAT_2):t.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=ae.LTC_HALF_1,r.rectAreaLTC2=ae.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=h,r.ambient[1]=p,r.ambient[2]=_;const X=r.hash;(X.directionalLength!==y||X.pointLength!==m||X.spotLength!==f||X.rectAreaLength!==v||X.hemiLength!==g||X.numDirectionalShadows!==x||X.numPointShadows!==R||X.numSpotShadows!==C||X.numSpotMaps!==A||X.numLightProbes!==E)&&(r.directional.length=y,r.spot.length=f,r.rectArea.length=v,r.point.length=m,r.hemi.length=g,r.directionalShadow.length=x,r.directionalShadowMap.length=x,r.pointShadow.length=R,r.pointShadowMap.length=R,r.spotShadow.length=C,r.spotShadowMap.length=C,r.directionalShadowMatrix.length=x,r.pointShadowMatrix.length=R,r.spotLightMatrix.length=C+A-N,r.spotLightMap.length=A,r.numSpotLightShadowsWithMaps=N,r.numLightProbes=E,X.directionalLength=y,X.pointLength=m,X.spotLength=f,X.rectAreaLength=v,X.hemiLength=g,X.numDirectionalShadows=x,X.numPointShadows=R,X.numSpotShadows=C,X.numSpotMaps=A,X.numLightProbes=E,r.version=sb++)}function c(u,d){let h=0,p=0,_=0,y=0,m=0;const f=d.matrixWorldInverse;for(let v=0,g=u.length;v<g;v++){const x=u[v];if(x.isDirectionalLight){const R=r.directional[h];R.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(f),h++}else if(x.isSpotLight){const R=r.spot[_];R.position.setFromMatrixPosition(x.matrixWorld),R.position.applyMatrix4(f),R.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(f),_++}else if(x.isRectAreaLight){const R=r.rectArea[y];R.position.setFromMatrixPosition(x.matrixWorld),R.position.applyMatrix4(f),a.identity(),o.copy(x.matrixWorld),o.premultiply(f),a.extractRotation(o),R.halfWidth.set(x.width*.5,0,0),R.halfHeight.set(0,x.height*.5,0),R.halfWidth.applyMatrix4(a),R.halfHeight.applyMatrix4(a),y++}else if(x.isPointLight){const R=r.point[p];R.position.setFromMatrixPosition(x.matrixWorld),R.position.applyMatrix4(f),p++}else if(x.isHemisphereLight){const R=r.hemi[m];R.direction.setFromMatrixPosition(x.matrixWorld),R.direction.transformDirection(f),m++}}}return{setup:l,setupView:c,state:r}}function _g(t,e){const n=new ab(t,e),i=[],r=[];function s(){i.length=0,r.length=0}function o(d){i.push(d)}function a(d){r.push(d)}function l(d){n.setup(i,d)}function c(d){n.setupView(i,d)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:n},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function lb(t,e){let n=new WeakMap;function i(s,o=0){const a=n.get(s);let l;return a===void 0?(l=new _g(t,e),n.set(s,[l])):o>=a.length?(l=new _g(t,e),a.push(l)):l=a[o],l}function r(){n=new WeakMap}return{get:i,dispose:r}}class cb extends Cc{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Xw,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class ub extends Cc{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const db=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fb=`uniform sampler2D shadow_pass;
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
}`;function hb(t,e,n){let i=new B0;const r=new Oe,s=new Oe,o=new Nt,a=new cb({depthPacking:$w}),l=new ub,c={},u=n.maxTextureSize,d={[ir]:ln,[ln]:ir,[hi]:hi},h=new rn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Oe},radius:{value:4}},vertexShader:db,fragmentShader:fb}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const _=new lr;_.setAttribute("position",new ii(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new ei(_,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=v0;let f=this.type;this.render=function(C,A,N){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const E=t.getRenderTarget(),w=t.getActiveCubeFace(),X=t.getActiveMipmapLevel(),z=t.state;z.setBlending(yi),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const q=f!==ui&&this.type===ui,b=f===ui&&this.type!==ui;for(let U=0,F=C.length;U<F;U++){const Y=C[U],D=Y.shadow;if(D===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;r.copy(D.mapSize);const k=D.getFrameExtents();if(r.multiply(k),s.copy(D.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/k.x),r.x=s.x*k.x,D.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/k.y),r.y=s.y*k.y,D.mapSize.y=s.y)),D.map===null||q===!0||b===!0){const J=this.type!==ui?{minFilter:qt,magFilter:qt}:{};D.map!==null&&D.map.dispose(),D.map=new jn(r.x,r.y,J),D.map.texture.name=Y.name+".shadowMap",D.camera.updateProjectionMatrix()}t.setRenderTarget(D.map),t.clear();const W=D.getViewportCount();for(let J=0;J<W;J++){const ee=D.getViewport(J);o.set(s.x*ee.x,s.y*ee.y,s.x*ee.z,s.y*ee.w),z.viewport(o),D.updateMatrices(Y,J),i=D.getFrustum(),x(A,N,D.camera,Y,this.type)}D.isPointLightShadow!==!0&&this.type===ui&&v(D,N),D.needsUpdate=!1}f=this.type,m.needsUpdate=!1,t.setRenderTarget(E,w,X)};function v(C,A){const N=e.update(y);h.defines.VSM_SAMPLES!==C.blurSamples&&(h.defines.VSM_SAMPLES=C.blurSamples,p.defines.VSM_SAMPLES=C.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new jn(r.x,r.y)),h.uniforms.shadow_pass.value=C.map.texture,h.uniforms.resolution.value=C.mapSize,h.uniforms.radius.value=C.radius,t.setRenderTarget(C.mapPass),t.clear(),t.renderBufferDirect(A,null,N,h,y,null),p.uniforms.shadow_pass.value=C.mapPass.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,t.setRenderTarget(C.map),t.clear(),t.renderBufferDirect(A,null,N,p,y,null)}function g(C,A,N,E){let w=null;const X=N.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(X!==void 0)w=X;else if(w=N.isPointLight===!0?l:a,t.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const z=w.uuid,q=A.uuid;let b=c[z];b===void 0&&(b={},c[z]=b);let U=b[q];U===void 0&&(U=w.clone(),b[q]=U,A.addEventListener("dispose",R)),w=U}if(w.visible=A.visible,w.wireframe=A.wireframe,E===ui?w.side=A.shadowSide!==null?A.shadowSide:A.side:w.side=A.shadowSide!==null?A.shadowSide:d[A.side],w.alphaMap=A.alphaMap,w.alphaTest=A.alphaTest,w.map=A.map,w.clipShadows=A.clipShadows,w.clippingPlanes=A.clippingPlanes,w.clipIntersection=A.clipIntersection,w.displacementMap=A.displacementMap,w.displacementScale=A.displacementScale,w.displacementBias=A.displacementBias,w.wireframeLinewidth=A.wireframeLinewidth,w.linewidth=A.linewidth,N.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const z=t.properties.get(w);z.light=N}return w}function x(C,A,N,E,w){if(C.visible===!1)return;if(C.layers.test(A.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&w===ui)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,C.matrixWorld);const q=e.update(C),b=C.material;if(Array.isArray(b)){const U=q.groups;for(let F=0,Y=U.length;F<Y;F++){const D=U[F],k=b[D.materialIndex];if(k&&k.visible){const W=g(C,k,E,w);C.onBeforeShadow(t,C,A,N,q,W,D),t.renderBufferDirect(N,null,q,W,C,D),C.onAfterShadow(t,C,A,N,q,W,D)}}}else if(b.visible){const U=g(C,b,E,w);C.onBeforeShadow(t,C,A,N,q,U,null),t.renderBufferDirect(N,null,q,U,C,null),C.onAfterShadow(t,C,A,N,q,U,null)}}const z=C.children;for(let q=0,b=z.length;q<b;q++)x(z[q],A,N,E,w)}function R(C){C.target.removeEventListener("dispose",R);for(const N in c){const E=c[N],w=C.target.uuid;w in E&&(E[w].dispose(),delete E[w])}}}function pb(t,e,n){const i=n.isWebGL2;function r(){let P=!1;const ue=new Nt;let de=null;const Ne=new Nt(0,0,0,0);return{setMask:function(Re){de!==Re&&!P&&(t.colorMask(Re,Re,Re,Re),de=Re)},setLocked:function(Re){P=Re},setClear:function(Re,Qe,et,Tt,Wt){Wt===!0&&(Re*=Tt,Qe*=Tt,et*=Tt),ue.set(Re,Qe,et,Tt),Ne.equals(ue)===!1&&(t.clearColor(Re,Qe,et,Tt),Ne.copy(ue))},reset:function(){P=!1,de=null,Ne.set(-1,0,0,0)}}}function s(){let P=!1,ue=null,de=null,Ne=null;return{setTest:function(Re){Re?be(t.DEPTH_TEST):_e(t.DEPTH_TEST)},setMask:function(Re){ue!==Re&&!P&&(t.depthMask(Re),ue=Re)},setFunc:function(Re){if(de!==Re){switch(Re){case Ew:t.depthFunc(t.NEVER);break;case Mw:t.depthFunc(t.ALWAYS);break;case ww:t.depthFunc(t.LESS);break;case Kl:t.depthFunc(t.LEQUAL);break;case Tw:t.depthFunc(t.EQUAL);break;case Aw:t.depthFunc(t.GEQUAL);break;case Cw:t.depthFunc(t.GREATER);break;case Rw:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}de=Re}},setLocked:function(Re){P=Re},setClear:function(Re){Ne!==Re&&(t.clearDepth(Re),Ne=Re)},reset:function(){P=!1,ue=null,de=null,Ne=null}}}function o(){let P=!1,ue=null,de=null,Ne=null,Re=null,Qe=null,et=null,Tt=null,Wt=null;return{setTest:function(tt){P||(tt?be(t.STENCIL_TEST):_e(t.STENCIL_TEST))},setMask:function(tt){ue!==tt&&!P&&(t.stencilMask(tt),ue=tt)},setFunc:function(tt,jt,Kn){(de!==tt||Ne!==jt||Re!==Kn)&&(t.stencilFunc(tt,jt,Kn),de=tt,Ne=jt,Re=Kn)},setOp:function(tt,jt,Kn){(Qe!==tt||et!==jt||Tt!==Kn)&&(t.stencilOp(tt,jt,Kn),Qe=tt,et=jt,Tt=Kn)},setLocked:function(tt){P=tt},setClear:function(tt){Wt!==tt&&(t.clearStencil(tt),Wt=tt)},reset:function(){P=!1,ue=null,de=null,Ne=null,Re=null,Qe=null,et=null,Tt=null,Wt=null}}}const a=new r,l=new s,c=new o,u=new WeakMap,d=new WeakMap;let h={},p={},_=new WeakMap,y=[],m=null,f=!1,v=null,g=null,x=null,R=null,C=null,A=null,N=null,E=new Ke(0,0,0),w=0,X=!1,z=null,q=null,b=null,U=null,F=null;const Y=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let D=!1,k=0;const W=t.getParameter(t.VERSION);W.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(W)[1]),D=k>=1):W.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),D=k>=2);let J=null,ee={};const K=t.getParameter(t.SCISSOR_BOX),Q=t.getParameter(t.VIEWPORT),ce=new Nt().fromArray(K),ge=new Nt().fromArray(Q);function se(P,ue,de,Ne){const Re=new Uint8Array(4),Qe=t.createTexture();t.bindTexture(P,Qe),t.texParameteri(P,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(P,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let et=0;et<de;et++)i&&(P===t.TEXTURE_3D||P===t.TEXTURE_2D_ARRAY)?t.texImage3D(ue,0,t.RGBA,1,1,Ne,0,t.RGBA,t.UNSIGNED_BYTE,Re):t.texImage2D(ue+et,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,Re);return Qe}const ve={};ve[t.TEXTURE_2D]=se(t.TEXTURE_2D,t.TEXTURE_2D,1),ve[t.TEXTURE_CUBE_MAP]=se(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(ve[t.TEXTURE_2D_ARRAY]=se(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),ve[t.TEXTURE_3D]=se(t.TEXTURE_3D,t.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),be(t.DEPTH_TEST),l.setFunc(Kl),Ae(!1),T(Qp),be(t.CULL_FACE),ye(yi);function be(P){h[P]!==!0&&(t.enable(P),h[P]=!0)}function _e(P){h[P]!==!1&&(t.disable(P),h[P]=!1)}function je(P,ue){return p[P]!==ue?(t.bindFramebuffer(P,ue),p[P]=ue,i&&(P===t.DRAW_FRAMEBUFFER&&(p[t.FRAMEBUFFER]=ue),P===t.FRAMEBUFFER&&(p[t.DRAW_FRAMEBUFFER]=ue)),!0):!1}function H(P,ue){let de=y,Ne=!1;if(P)if(de=_.get(ue),de===void 0&&(de=[],_.set(ue,de)),P.isWebGLMultipleRenderTargets){const Re=P.texture;if(de.length!==Re.length||de[0]!==t.COLOR_ATTACHMENT0){for(let Qe=0,et=Re.length;Qe<et;Qe++)de[Qe]=t.COLOR_ATTACHMENT0+Qe;de.length=Re.length,Ne=!0}}else de[0]!==t.COLOR_ATTACHMENT0&&(de[0]=t.COLOR_ATTACHMENT0,Ne=!0);else de[0]!==t.BACK&&(de[0]=t.BACK,Ne=!0);Ne&&(n.isWebGL2?t.drawBuffers(de):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(de))}function wt(P){return m!==P?(t.useProgram(P),m=P,!0):!1}const we={[wr]:t.FUNC_ADD,[aw]:t.FUNC_SUBTRACT,[lw]:t.FUNC_REVERSE_SUBTRACT};if(i)we[nm]=t.MIN,we[im]=t.MAX;else{const P=e.get("EXT_blend_minmax");P!==null&&(we[nm]=P.MIN_EXT,we[im]=P.MAX_EXT)}const De={[cw]:t.ZERO,[uw]:t.ONE,[dw]:t.SRC_COLOR,[Hd]:t.SRC_ALPHA,[vw]:t.SRC_ALPHA_SATURATE,[mw]:t.DST_COLOR,[hw]:t.DST_ALPHA,[fw]:t.ONE_MINUS_SRC_COLOR,[Gd]:t.ONE_MINUS_SRC_ALPHA,[gw]:t.ONE_MINUS_DST_COLOR,[pw]:t.ONE_MINUS_DST_ALPHA,[_w]:t.CONSTANT_COLOR,[yw]:t.ONE_MINUS_CONSTANT_COLOR,[xw]:t.CONSTANT_ALPHA,[Sw]:t.ONE_MINUS_CONSTANT_ALPHA};function ye(P,ue,de,Ne,Re,Qe,et,Tt,Wt,tt){if(P===yi){f===!0&&(_e(t.BLEND),f=!1);return}if(f===!1&&(be(t.BLEND),f=!0),P!==ow){if(P!==v||tt!==X){if((g!==wr||C!==wr)&&(t.blendEquation(t.FUNC_ADD),g=wr,C=wr),tt)switch(P){case bs:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Bd:t.blendFunc(t.ONE,t.ONE);break;case em:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case tm:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case bs:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Bd:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case em:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case tm:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}x=null,R=null,A=null,N=null,E.set(0,0,0),w=0,v=P,X=tt}return}Re=Re||ue,Qe=Qe||de,et=et||Ne,(ue!==g||Re!==C)&&(t.blendEquationSeparate(we[ue],we[Re]),g=ue,C=Re),(de!==x||Ne!==R||Qe!==A||et!==N)&&(t.blendFuncSeparate(De[de],De[Ne],De[Qe],De[et]),x=de,R=Ne,A=Qe,N=et),(Tt.equals(E)===!1||Wt!==w)&&(t.blendColor(Tt.r,Tt.g,Tt.b,Wt),E.copy(Tt),w=Wt),v=P,X=!1}function it(P,ue){P.side===hi?_e(t.CULL_FACE):be(t.CULL_FACE);let de=P.side===ln;ue&&(de=!de),Ae(de),P.blending===bs&&P.transparent===!1?ye(yi):ye(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),l.setFunc(P.depthFunc),l.setTest(P.depthTest),l.setMask(P.depthWrite),a.setMask(P.colorWrite);const Ne=P.stencilWrite;c.setTest(Ne),Ne&&(c.setMask(P.stencilWriteMask),c.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),c.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),G(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?be(t.SAMPLE_ALPHA_TO_COVERAGE):_e(t.SAMPLE_ALPHA_TO_COVERAGE)}function Ae(P){z!==P&&(P?t.frontFace(t.CW):t.frontFace(t.CCW),z=P)}function T(P){P!==iw?(be(t.CULL_FACE),P!==q&&(P===Qp?t.cullFace(t.BACK):P===rw?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):_e(t.CULL_FACE),q=P}function S(P){P!==b&&(D&&t.lineWidth(P),b=P)}function G(P,ue,de){P?(be(t.POLYGON_OFFSET_FILL),(U!==ue||F!==de)&&(t.polygonOffset(ue,de),U=ue,F=de)):_e(t.POLYGON_OFFSET_FILL)}function ne(P){P?be(t.SCISSOR_TEST):_e(t.SCISSOR_TEST)}function te(P){P===void 0&&(P=t.TEXTURE0+Y-1),J!==P&&(t.activeTexture(P),J=P)}function re(P,ue,de){de===void 0&&(J===null?de=t.TEXTURE0+Y-1:de=J);let Ne=ee[de];Ne===void 0&&(Ne={type:void 0,texture:void 0},ee[de]=Ne),(Ne.type!==P||Ne.texture!==ue)&&(J!==de&&(t.activeTexture(de),J=de),t.bindTexture(P,ue||ve[P]),Ne.type=P,Ne.texture=ue)}function Se(){const P=ee[J];P!==void 0&&P.type!==void 0&&(t.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function le(){try{t.compressedTexImage2D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function me(){try{t.compressedTexImage3D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ce(){try{t.texSubImage2D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ke(){try{t.texSubImage3D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Z(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ze(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Me(){try{t.texStorage2D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Te(){try{t.texStorage3D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function xe(){try{t.texImage2D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function pe(){try{t.texImage3D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Pe(P){ce.equals(P)===!1&&(t.scissor(P.x,P.y,P.z,P.w),ce.copy(P))}function $e(P){ge.equals(P)===!1&&(t.viewport(P.x,P.y,P.z,P.w),ge.copy(P))}function Ye(P,ue){let de=d.get(ue);de===void 0&&(de=new WeakMap,d.set(ue,de));let Ne=de.get(P);Ne===void 0&&(Ne=t.getUniformBlockIndex(ue,P.name),de.set(P,Ne))}function Ue(P,ue){const Ne=d.get(ue).get(P);u.get(ue)!==Ne&&(t.uniformBlockBinding(ue,Ne,P.__bindingPointIndex),u.set(ue,Ne))}function oe(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),i===!0&&(t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null)),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),h={},J=null,ee={},p={},_=new WeakMap,y=[],m=null,f=!1,v=null,g=null,x=null,R=null,C=null,A=null,N=null,E=new Ke(0,0,0),w=0,X=!1,z=null,q=null,b=null,U=null,F=null,ce.set(0,0,t.canvas.width,t.canvas.height),ge.set(0,0,t.canvas.width,t.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:be,disable:_e,bindFramebuffer:je,drawBuffers:H,useProgram:wt,setBlending:ye,setMaterial:it,setFlipSided:Ae,setCullFace:T,setLineWidth:S,setPolygonOffset:G,setScissorTest:ne,activeTexture:te,bindTexture:re,unbindTexture:Se,compressedTexImage2D:le,compressedTexImage3D:me,texImage2D:xe,texImage3D:pe,updateUBOMapping:Ye,uniformBlockBinding:Ue,texStorage2D:Me,texStorage3D:Te,texSubImage2D:Ce,texSubImage3D:ke,compressedTexSubImage2D:Z,compressedTexSubImage3D:ze,scissor:Pe,viewport:$e,reset:oe}}function mb(t,e,n,i,r,s,o){const a=r.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap;let d;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(T,S){return p?new OffscreenCanvas(T,S):ec("canvas")}function y(T,S,G,ne){let te=1;if((T.width>ne||T.height>ne)&&(te=ne/Math.max(T.width,T.height)),te<1||S===!0)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap){const re=S?Ql:Math.floor,Se=re(te*T.width),le=re(te*T.height);d===void 0&&(d=_(Se,le));const me=G?_(Se,le):d;return me.width=Se,me.height=le,me.getContext("2d").drawImage(T,0,0,Se,le),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+T.width+"x"+T.height+") to ("+Se+"x"+le+")."),me}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+T.width+"x"+T.height+")."),T;return T}function m(T){return Kd(T.width)&&Kd(T.height)}function f(T){return a?!1:T.wrapS!==Hn||T.wrapT!==Hn||T.minFilter!==qt&&T.minFilter!==wn}function v(T,S){return T.generateMipmaps&&S&&T.minFilter!==qt&&T.minFilter!==wn}function g(T){t.generateMipmap(T)}function x(T,S,G,ne,te=!1){if(a===!1)return S;if(T!==null){if(t[T]!==void 0)return t[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let re=S;if(S===t.RED&&(G===t.FLOAT&&(re=t.R32F),G===t.HALF_FLOAT&&(re=t.R16F),G===t.UNSIGNED_BYTE&&(re=t.R8)),S===t.RED_INTEGER&&(G===t.UNSIGNED_BYTE&&(re=t.R8UI),G===t.UNSIGNED_SHORT&&(re=t.R16UI),G===t.UNSIGNED_INT&&(re=t.R32UI),G===t.BYTE&&(re=t.R8I),G===t.SHORT&&(re=t.R16I),G===t.INT&&(re=t.R32I)),S===t.RG&&(G===t.FLOAT&&(re=t.RG32F),G===t.HALF_FLOAT&&(re=t.RG16F),G===t.UNSIGNED_BYTE&&(re=t.RG8)),S===t.RGBA){const Se=te?Yl:Je.getTransfer(ne);G===t.FLOAT&&(re=t.RGBA32F),G===t.HALF_FLOAT&&(re=t.RGBA16F),G===t.UNSIGNED_BYTE&&(re=Se===st?t.SRGB8_ALPHA8:t.RGBA8),G===t.UNSIGNED_SHORT_4_4_4_4&&(re=t.RGBA4),G===t.UNSIGNED_SHORT_5_5_5_1&&(re=t.RGB5_A1)}return(re===t.R16F||re===t.R32F||re===t.RG16F||re===t.RG32F||re===t.RGBA16F||re===t.RGBA32F)&&e.get("EXT_color_buffer_float"),re}function R(T,S,G){return v(T,G)===!0||T.isFramebufferTexture&&T.minFilter!==qt&&T.minFilter!==wn?Math.log2(Math.max(S.width,S.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?S.mipmaps.length:1}function C(T){return T===qt||T===rm||T===hu?t.NEAREST:t.LINEAR}function A(T){const S=T.target;S.removeEventListener("dispose",A),E(S),S.isVideoTexture&&u.delete(S)}function N(T){const S=T.target;S.removeEventListener("dispose",N),X(S)}function E(T){const S=i.get(T);if(S.__webglInit===void 0)return;const G=T.source,ne=h.get(G);if(ne){const te=ne[S.__cacheKey];te.usedTimes--,te.usedTimes===0&&w(T),Object.keys(ne).length===0&&h.delete(G)}i.remove(T)}function w(T){const S=i.get(T);t.deleteTexture(S.__webglTexture);const G=T.source,ne=h.get(G);delete ne[S.__cacheKey],o.memory.textures--}function X(T){const S=T.texture,G=i.get(T),ne=i.get(S);if(ne.__webglTexture!==void 0&&(t.deleteTexture(ne.__webglTexture),o.memory.textures--),T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let te=0;te<6;te++){if(Array.isArray(G.__webglFramebuffer[te]))for(let re=0;re<G.__webglFramebuffer[te].length;re++)t.deleteFramebuffer(G.__webglFramebuffer[te][re]);else t.deleteFramebuffer(G.__webglFramebuffer[te]);G.__webglDepthbuffer&&t.deleteRenderbuffer(G.__webglDepthbuffer[te])}else{if(Array.isArray(G.__webglFramebuffer))for(let te=0;te<G.__webglFramebuffer.length;te++)t.deleteFramebuffer(G.__webglFramebuffer[te]);else t.deleteFramebuffer(G.__webglFramebuffer);if(G.__webglDepthbuffer&&t.deleteRenderbuffer(G.__webglDepthbuffer),G.__webglMultisampledFramebuffer&&t.deleteFramebuffer(G.__webglMultisampledFramebuffer),G.__webglColorRenderbuffer)for(let te=0;te<G.__webglColorRenderbuffer.length;te++)G.__webglColorRenderbuffer[te]&&t.deleteRenderbuffer(G.__webglColorRenderbuffer[te]);G.__webglDepthRenderbuffer&&t.deleteRenderbuffer(G.__webglDepthRenderbuffer)}if(T.isWebGLMultipleRenderTargets)for(let te=0,re=S.length;te<re;te++){const Se=i.get(S[te]);Se.__webglTexture&&(t.deleteTexture(Se.__webglTexture),o.memory.textures--),i.remove(S[te])}i.remove(S),i.remove(T)}let z=0;function q(){z=0}function b(){const T=z;return T>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),z+=1,T}function U(T){const S=[];return S.push(T.wrapS),S.push(T.wrapT),S.push(T.wrapR||0),S.push(T.magFilter),S.push(T.minFilter),S.push(T.anisotropy),S.push(T.internalFormat),S.push(T.format),S.push(T.type),S.push(T.generateMipmaps),S.push(T.premultiplyAlpha),S.push(T.flipY),S.push(T.unpackAlignment),S.push(T.colorSpace),S.join()}function F(T,S){const G=i.get(T);if(T.isVideoTexture&&it(T),T.isRenderTargetTexture===!1&&T.version>0&&G.__version!==T.version){const ne=T.image;if(ne===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ce(G,T,S);return}}n.bindTexture(t.TEXTURE_2D,G.__webglTexture,t.TEXTURE0+S)}function Y(T,S){const G=i.get(T);if(T.version>0&&G.__version!==T.version){ce(G,T,S);return}n.bindTexture(t.TEXTURE_2D_ARRAY,G.__webglTexture,t.TEXTURE0+S)}function D(T,S){const G=i.get(T);if(T.version>0&&G.__version!==T.version){ce(G,T,S);return}n.bindTexture(t.TEXTURE_3D,G.__webglTexture,t.TEXTURE0+S)}function k(T,S){const G=i.get(T);if(T.version>0&&G.__version!==T.version){ge(G,T,S);return}n.bindTexture(t.TEXTURE_CUBE_MAP,G.__webglTexture,t.TEXTURE0+S)}const W={[jd]:t.REPEAT,[Hn]:t.CLAMP_TO_EDGE,[Xd]:t.MIRRORED_REPEAT},J={[qt]:t.NEAREST,[rm]:t.NEAREST_MIPMAP_NEAREST,[hu]:t.NEAREST_MIPMAP_LINEAR,[wn]:t.LINEAR,[kw]:t.LINEAR_MIPMAP_NEAREST,[Jo]:t.LINEAR_MIPMAP_LINEAR},ee={[qw]:t.NEVER,[nT]:t.ALWAYS,[Zw]:t.LESS,[R0]:t.LEQUAL,[Jw]:t.EQUAL,[tT]:t.GEQUAL,[Qw]:t.GREATER,[eT]:t.NOTEQUAL};function K(T,S,G){if(G?(t.texParameteri(T,t.TEXTURE_WRAP_S,W[S.wrapS]),t.texParameteri(T,t.TEXTURE_WRAP_T,W[S.wrapT]),(T===t.TEXTURE_3D||T===t.TEXTURE_2D_ARRAY)&&t.texParameteri(T,t.TEXTURE_WRAP_R,W[S.wrapR]),t.texParameteri(T,t.TEXTURE_MAG_FILTER,J[S.magFilter]),t.texParameteri(T,t.TEXTURE_MIN_FILTER,J[S.minFilter])):(t.texParameteri(T,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(T,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),(T===t.TEXTURE_3D||T===t.TEXTURE_2D_ARRAY)&&t.texParameteri(T,t.TEXTURE_WRAP_R,t.CLAMP_TO_EDGE),(S.wrapS!==Hn||S.wrapT!==Hn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),t.texParameteri(T,t.TEXTURE_MAG_FILTER,C(S.magFilter)),t.texParameteri(T,t.TEXTURE_MIN_FILTER,C(S.minFilter)),S.minFilter!==qt&&S.minFilter!==wn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),S.compareFunction&&(t.texParameteri(T,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(T,t.TEXTURE_COMPARE_FUNC,ee[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const ne=e.get("EXT_texture_filter_anisotropic");if(S.magFilter===qt||S.minFilter!==hu&&S.minFilter!==Jo||S.type===Wi&&e.has("OES_texture_float_linear")===!1||a===!1&&S.type===xi&&e.has("OES_texture_half_float_linear")===!1)return;(S.anisotropy>1||i.get(S).__currentAnisotropy)&&(t.texParameterf(T,ne.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy)}}function Q(T,S){let G=!1;T.__webglInit===void 0&&(T.__webglInit=!0,S.addEventListener("dispose",A));const ne=S.source;let te=h.get(ne);te===void 0&&(te={},h.set(ne,te));const re=U(S);if(re!==T.__cacheKey){te[re]===void 0&&(te[re]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,G=!0),te[re].usedTimes++;const Se=te[T.__cacheKey];Se!==void 0&&(te[T.__cacheKey].usedTimes--,Se.usedTimes===0&&w(S)),T.__cacheKey=re,T.__webglTexture=te[re].texture}return G}function ce(T,S,G){let ne=t.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(ne=t.TEXTURE_2D_ARRAY),S.isData3DTexture&&(ne=t.TEXTURE_3D);const te=Q(T,S),re=S.source;n.bindTexture(ne,T.__webglTexture,t.TEXTURE0+G);const Se=i.get(re);if(re.version!==Se.__version||te===!0){n.activeTexture(t.TEXTURE0+G);const le=Je.getPrimaries(Je.workingColorSpace),me=S.colorSpace===An?null:Je.getPrimaries(S.colorSpace),Ce=S.colorSpace===An||le===me?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce);const ke=f(S)&&m(S.image)===!1;let Z=y(S.image,ke,!1,r.maxTextureSize);Z=Ae(S,Z);const ze=m(Z)||a,Me=s.convert(S.format,S.colorSpace);let Te=s.convert(S.type),xe=x(S.internalFormat,Me,Te,S.colorSpace,S.isVideoTexture);K(ne,S,ze);let pe;const Pe=S.mipmaps,$e=a&&S.isVideoTexture!==!0&&xe!==A0,Ye=Se.__version===void 0||te===!0,Ue=R(S,Z,ze);if(S.isDepthTexture)xe=t.DEPTH_COMPONENT,a?S.type===Wi?xe=t.DEPTH_COMPONENT32F:S.type===Vi?xe=t.DEPTH_COMPONENT24:S.type===Nr?xe=t.DEPTH24_STENCIL8:xe=t.DEPTH_COMPONENT16:S.type===Wi&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),S.format===Ur&&xe===t.DEPTH_COMPONENT&&S.type!==ah&&S.type!==Vi&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),S.type=Vi,Te=s.convert(S.type)),S.format===Bs&&xe===t.DEPTH_COMPONENT&&(xe=t.DEPTH_STENCIL,S.type!==Nr&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),S.type=Nr,Te=s.convert(S.type))),Ye&&($e?n.texStorage2D(t.TEXTURE_2D,1,xe,Z.width,Z.height):n.texImage2D(t.TEXTURE_2D,0,xe,Z.width,Z.height,0,Me,Te,null));else if(S.isDataTexture)if(Pe.length>0&&ze){$e&&Ye&&n.texStorage2D(t.TEXTURE_2D,Ue,xe,Pe[0].width,Pe[0].height);for(let oe=0,P=Pe.length;oe<P;oe++)pe=Pe[oe],$e?n.texSubImage2D(t.TEXTURE_2D,oe,0,0,pe.width,pe.height,Me,Te,pe.data):n.texImage2D(t.TEXTURE_2D,oe,xe,pe.width,pe.height,0,Me,Te,pe.data);S.generateMipmaps=!1}else $e?(Ye&&n.texStorage2D(t.TEXTURE_2D,Ue,xe,Z.width,Z.height),n.texSubImage2D(t.TEXTURE_2D,0,0,0,Z.width,Z.height,Me,Te,Z.data)):n.texImage2D(t.TEXTURE_2D,0,xe,Z.width,Z.height,0,Me,Te,Z.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){$e&&Ye&&n.texStorage3D(t.TEXTURE_2D_ARRAY,Ue,xe,Pe[0].width,Pe[0].height,Z.depth);for(let oe=0,P=Pe.length;oe<P;oe++)pe=Pe[oe],S.format!==Gn?Me!==null?$e?n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,oe,0,0,0,pe.width,pe.height,Z.depth,Me,pe.data,0,0):n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,oe,xe,pe.width,pe.height,Z.depth,0,pe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$e?n.texSubImage3D(t.TEXTURE_2D_ARRAY,oe,0,0,0,pe.width,pe.height,Z.depth,Me,Te,pe.data):n.texImage3D(t.TEXTURE_2D_ARRAY,oe,xe,pe.width,pe.height,Z.depth,0,Me,Te,pe.data)}else{$e&&Ye&&n.texStorage2D(t.TEXTURE_2D,Ue,xe,Pe[0].width,Pe[0].height);for(let oe=0,P=Pe.length;oe<P;oe++)pe=Pe[oe],S.format!==Gn?Me!==null?$e?n.compressedTexSubImage2D(t.TEXTURE_2D,oe,0,0,pe.width,pe.height,Me,pe.data):n.compressedTexImage2D(t.TEXTURE_2D,oe,xe,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$e?n.texSubImage2D(t.TEXTURE_2D,oe,0,0,pe.width,pe.height,Me,Te,pe.data):n.texImage2D(t.TEXTURE_2D,oe,xe,pe.width,pe.height,0,Me,Te,pe.data)}else if(S.isDataArrayTexture)$e?(Ye&&n.texStorage3D(t.TEXTURE_2D_ARRAY,Ue,xe,Z.width,Z.height,Z.depth),n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,Me,Te,Z.data)):n.texImage3D(t.TEXTURE_2D_ARRAY,0,xe,Z.width,Z.height,Z.depth,0,Me,Te,Z.data);else if(S.isData3DTexture)$e?(Ye&&n.texStorage3D(t.TEXTURE_3D,Ue,xe,Z.width,Z.height,Z.depth),n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,Me,Te,Z.data)):n.texImage3D(t.TEXTURE_3D,0,xe,Z.width,Z.height,Z.depth,0,Me,Te,Z.data);else if(S.isFramebufferTexture){if(Ye)if($e)n.texStorage2D(t.TEXTURE_2D,Ue,xe,Z.width,Z.height);else{let oe=Z.width,P=Z.height;for(let ue=0;ue<Ue;ue++)n.texImage2D(t.TEXTURE_2D,ue,xe,oe,P,0,Me,Te,null),oe>>=1,P>>=1}}else if(Pe.length>0&&ze){$e&&Ye&&n.texStorage2D(t.TEXTURE_2D,Ue,xe,Pe[0].width,Pe[0].height);for(let oe=0,P=Pe.length;oe<P;oe++)pe=Pe[oe],$e?n.texSubImage2D(t.TEXTURE_2D,oe,0,0,Me,Te,pe):n.texImage2D(t.TEXTURE_2D,oe,xe,Me,Te,pe);S.generateMipmaps=!1}else $e?(Ye&&n.texStorage2D(t.TEXTURE_2D,Ue,xe,Z.width,Z.height),n.texSubImage2D(t.TEXTURE_2D,0,0,0,Me,Te,Z)):n.texImage2D(t.TEXTURE_2D,0,xe,Me,Te,Z);v(S,ze)&&g(ne),Se.__version=re.version,S.onUpdate&&S.onUpdate(S)}T.__version=S.version}function ge(T,S,G){if(S.image.length!==6)return;const ne=Q(T,S),te=S.source;n.bindTexture(t.TEXTURE_CUBE_MAP,T.__webglTexture,t.TEXTURE0+G);const re=i.get(te);if(te.version!==re.__version||ne===!0){n.activeTexture(t.TEXTURE0+G);const Se=Je.getPrimaries(Je.workingColorSpace),le=S.colorSpace===An?null:Je.getPrimaries(S.colorSpace),me=S.colorSpace===An||Se===le?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const Ce=S.isCompressedTexture||S.image[0].isCompressedTexture,ke=S.image[0]&&S.image[0].isDataTexture,Z=[];for(let oe=0;oe<6;oe++)!Ce&&!ke?Z[oe]=y(S.image[oe],!1,!0,r.maxCubemapSize):Z[oe]=ke?S.image[oe].image:S.image[oe],Z[oe]=Ae(S,Z[oe]);const ze=Z[0],Me=m(ze)||a,Te=s.convert(S.format,S.colorSpace),xe=s.convert(S.type),pe=x(S.internalFormat,Te,xe,S.colorSpace),Pe=a&&S.isVideoTexture!==!0,$e=re.__version===void 0||ne===!0;let Ye=R(S,ze,Me);K(t.TEXTURE_CUBE_MAP,S,Me);let Ue;if(Ce){Pe&&$e&&n.texStorage2D(t.TEXTURE_CUBE_MAP,Ye,pe,ze.width,ze.height);for(let oe=0;oe<6;oe++){Ue=Z[oe].mipmaps;for(let P=0;P<Ue.length;P++){const ue=Ue[P];S.format!==Gn?Te!==null?Pe?n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,P,0,0,ue.width,ue.height,Te,ue.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,P,pe,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Pe?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,P,0,0,ue.width,ue.height,Te,xe,ue.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,P,pe,ue.width,ue.height,0,Te,xe,ue.data)}}}else{Ue=S.mipmaps,Pe&&$e&&(Ue.length>0&&Ye++,n.texStorage2D(t.TEXTURE_CUBE_MAP,Ye,pe,Z[0].width,Z[0].height));for(let oe=0;oe<6;oe++)if(ke){Pe?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Z[oe].width,Z[oe].height,Te,xe,Z[oe].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,pe,Z[oe].width,Z[oe].height,0,Te,xe,Z[oe].data);for(let P=0;P<Ue.length;P++){const de=Ue[P].image[oe].image;Pe?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,P+1,0,0,de.width,de.height,Te,xe,de.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,P+1,pe,de.width,de.height,0,Te,xe,de.data)}}else{Pe?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Te,xe,Z[oe]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,pe,Te,xe,Z[oe]);for(let P=0;P<Ue.length;P++){const ue=Ue[P];Pe?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,P+1,0,0,Te,xe,ue.image[oe]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,P+1,pe,Te,xe,ue.image[oe])}}}v(S,Me)&&g(t.TEXTURE_CUBE_MAP),re.__version=te.version,S.onUpdate&&S.onUpdate(S)}T.__version=S.version}function se(T,S,G,ne,te,re){const Se=s.convert(G.format,G.colorSpace),le=s.convert(G.type),me=x(G.internalFormat,Se,le,G.colorSpace);if(!i.get(S).__hasExternalTextures){const ke=Math.max(1,S.width>>re),Z=Math.max(1,S.height>>re);te===t.TEXTURE_3D||te===t.TEXTURE_2D_ARRAY?n.texImage3D(te,re,me,ke,Z,S.depth,0,Se,le,null):n.texImage2D(te,re,me,ke,Z,0,Se,le,null)}n.bindFramebuffer(t.FRAMEBUFFER,T),ye(S)?l.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ne,te,i.get(G).__webglTexture,0,De(S)):(te===t.TEXTURE_2D||te>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,ne,te,i.get(G).__webglTexture,re),n.bindFramebuffer(t.FRAMEBUFFER,null)}function ve(T,S,G){if(t.bindRenderbuffer(t.RENDERBUFFER,T),S.depthBuffer&&!S.stencilBuffer){let ne=a===!0?t.DEPTH_COMPONENT24:t.DEPTH_COMPONENT16;if(G||ye(S)){const te=S.depthTexture;te&&te.isDepthTexture&&(te.type===Wi?ne=t.DEPTH_COMPONENT32F:te.type===Vi&&(ne=t.DEPTH_COMPONENT24));const re=De(S);ye(S)?l.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,re,ne,S.width,S.height):t.renderbufferStorageMultisample(t.RENDERBUFFER,re,ne,S.width,S.height)}else t.renderbufferStorage(t.RENDERBUFFER,ne,S.width,S.height);t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,T)}else if(S.depthBuffer&&S.stencilBuffer){const ne=De(S);G&&ye(S)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,ne,t.DEPTH24_STENCIL8,S.width,S.height):ye(S)?l.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ne,t.DEPTH24_STENCIL8,S.width,S.height):t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_STENCIL,S.width,S.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.RENDERBUFFER,T)}else{const ne=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let te=0;te<ne.length;te++){const re=ne[te],Se=s.convert(re.format,re.colorSpace),le=s.convert(re.type),me=x(re.internalFormat,Se,le,re.colorSpace),Ce=De(S);G&&ye(S)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,Ce,me,S.width,S.height):ye(S)?l.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Ce,me,S.width,S.height):t.renderbufferStorage(t.RENDERBUFFER,me,S.width,S.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function be(T,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,T),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),F(S.depthTexture,0);const ne=i.get(S.depthTexture).__webglTexture,te=De(S);if(S.depthTexture.format===Ur)ye(S)?l.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ne,0,te):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ne,0);else if(S.depthTexture.format===Bs)ye(S)?l.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ne,0,te):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function _e(T){const S=i.get(T),G=T.isWebGLCubeRenderTarget===!0;if(T.depthTexture&&!S.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");be(S.__webglFramebuffer,T)}else if(G){S.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer[ne]),S.__webglDepthbuffer[ne]=t.createRenderbuffer(),ve(S.__webglDepthbuffer[ne],T,!1)}else n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer=t.createRenderbuffer(),ve(S.__webglDepthbuffer,T,!1);n.bindFramebuffer(t.FRAMEBUFFER,null)}function je(T,S,G){const ne=i.get(T);S!==void 0&&se(ne.__webglFramebuffer,T,T.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),G!==void 0&&_e(T)}function H(T){const S=T.texture,G=i.get(T),ne=i.get(S);T.addEventListener("dispose",N),T.isWebGLMultipleRenderTargets!==!0&&(ne.__webglTexture===void 0&&(ne.__webglTexture=t.createTexture()),ne.__version=S.version,o.memory.textures++);const te=T.isWebGLCubeRenderTarget===!0,re=T.isWebGLMultipleRenderTargets===!0,Se=m(T)||a;if(te){G.__webglFramebuffer=[];for(let le=0;le<6;le++)if(a&&S.mipmaps&&S.mipmaps.length>0){G.__webglFramebuffer[le]=[];for(let me=0;me<S.mipmaps.length;me++)G.__webglFramebuffer[le][me]=t.createFramebuffer()}else G.__webglFramebuffer[le]=t.createFramebuffer()}else{if(a&&S.mipmaps&&S.mipmaps.length>0){G.__webglFramebuffer=[];for(let le=0;le<S.mipmaps.length;le++)G.__webglFramebuffer[le]=t.createFramebuffer()}else G.__webglFramebuffer=t.createFramebuffer();if(re)if(r.drawBuffers){const le=T.texture;for(let me=0,Ce=le.length;me<Ce;me++){const ke=i.get(le[me]);ke.__webglTexture===void 0&&(ke.__webglTexture=t.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&T.samples>0&&ye(T)===!1){const le=re?S:[S];G.__webglMultisampledFramebuffer=t.createFramebuffer(),G.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let me=0;me<le.length;me++){const Ce=le[me];G.__webglColorRenderbuffer[me]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,G.__webglColorRenderbuffer[me]);const ke=s.convert(Ce.format,Ce.colorSpace),Z=s.convert(Ce.type),ze=x(Ce.internalFormat,ke,Z,Ce.colorSpace,T.isXRRenderTarget===!0),Me=De(T);t.renderbufferStorageMultisample(t.RENDERBUFFER,Me,ze,T.width,T.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+me,t.RENDERBUFFER,G.__webglColorRenderbuffer[me])}t.bindRenderbuffer(t.RENDERBUFFER,null),T.depthBuffer&&(G.__webglDepthRenderbuffer=t.createRenderbuffer(),ve(G.__webglDepthRenderbuffer,T,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(te){n.bindTexture(t.TEXTURE_CUBE_MAP,ne.__webglTexture),K(t.TEXTURE_CUBE_MAP,S,Se);for(let le=0;le<6;le++)if(a&&S.mipmaps&&S.mipmaps.length>0)for(let me=0;me<S.mipmaps.length;me++)se(G.__webglFramebuffer[le][me],T,S,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+le,me);else se(G.__webglFramebuffer[le],T,S,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);v(S,Se)&&g(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(re){const le=T.texture;for(let me=0,Ce=le.length;me<Ce;me++){const ke=le[me],Z=i.get(ke);n.bindTexture(t.TEXTURE_2D,Z.__webglTexture),K(t.TEXTURE_2D,ke,Se),se(G.__webglFramebuffer,T,ke,t.COLOR_ATTACHMENT0+me,t.TEXTURE_2D,0),v(ke,Se)&&g(t.TEXTURE_2D)}n.unbindTexture()}else{let le=t.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(a?le=T.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),n.bindTexture(le,ne.__webglTexture),K(le,S,Se),a&&S.mipmaps&&S.mipmaps.length>0)for(let me=0;me<S.mipmaps.length;me++)se(G.__webglFramebuffer[me],T,S,t.COLOR_ATTACHMENT0,le,me);else se(G.__webglFramebuffer,T,S,t.COLOR_ATTACHMENT0,le,0);v(S,Se)&&g(le),n.unbindTexture()}T.depthBuffer&&_e(T)}function wt(T){const S=m(T)||a,G=T.isWebGLMultipleRenderTargets===!0?T.texture:[T.texture];for(let ne=0,te=G.length;ne<te;ne++){const re=G[ne];if(v(re,S)){const Se=T.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:t.TEXTURE_2D,le=i.get(re).__webglTexture;n.bindTexture(Se,le),g(Se),n.unbindTexture()}}}function we(T){if(a&&T.samples>0&&ye(T)===!1){const S=T.isWebGLMultipleRenderTargets?T.texture:[T.texture],G=T.width,ne=T.height;let te=t.COLOR_BUFFER_BIT;const re=[],Se=T.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,le=i.get(T),me=T.isWebGLMultipleRenderTargets===!0;if(me)for(let Ce=0;Ce<S.length;Ce++)n.bindFramebuffer(t.FRAMEBUFFER,le.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ce,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,le.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ce,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,le.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,le.__webglFramebuffer);for(let Ce=0;Ce<S.length;Ce++){re.push(t.COLOR_ATTACHMENT0+Ce),T.depthBuffer&&re.push(Se);const ke=le.__ignoreDepthValues!==void 0?le.__ignoreDepthValues:!1;if(ke===!1&&(T.depthBuffer&&(te|=t.DEPTH_BUFFER_BIT),T.stencilBuffer&&(te|=t.STENCIL_BUFFER_BIT)),me&&t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,le.__webglColorRenderbuffer[Ce]),ke===!0&&(t.invalidateFramebuffer(t.READ_FRAMEBUFFER,[Se]),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[Se])),me){const Z=i.get(S[Ce]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Z,0)}t.blitFramebuffer(0,0,G,ne,0,0,G,ne,te,t.NEAREST),c&&t.invalidateFramebuffer(t.READ_FRAMEBUFFER,re)}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),me)for(let Ce=0;Ce<S.length;Ce++){n.bindFramebuffer(t.FRAMEBUFFER,le.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ce,t.RENDERBUFFER,le.__webglColorRenderbuffer[Ce]);const ke=i.get(S[Ce]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,le.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ce,t.TEXTURE_2D,ke,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,le.__webglMultisampledFramebuffer)}}function De(T){return Math.min(r.maxSamples,T.samples)}function ye(T){const S=i.get(T);return a&&T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function it(T){const S=o.render.frame;u.get(T)!==S&&(u.set(T,S),T.update())}function Ae(T,S){const G=T.colorSpace,ne=T.format,te=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||T.format===$d||G!==Ci&&G!==An&&(Je.getTransfer(G)===st?a===!1?e.has("EXT_sRGB")===!0&&ne===Gn?(T.format=$d,T.minFilter=wn,T.generateMipmaps=!1):S=P0.sRGBToLinear(S):(ne!==Gn||te!==er)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),S}this.allocateTextureUnit=b,this.resetTextureUnits=q,this.setTexture2D=F,this.setTexture2DArray=Y,this.setTexture3D=D,this.setTextureCube=k,this.rebindTextures=je,this.setupRenderTarget=H,this.updateRenderTargetMipmap=wt,this.updateMultisampleRenderTarget=we,this.setupDepthRenderbuffer=_e,this.setupFrameBufferTexture=se,this.useMultisampledRTT=ye}function gb(t,e,n){const i=n.isWebGL2;function r(s,o=An){let a;const l=Je.getTransfer(o);if(s===er)return t.UNSIGNED_BYTE;if(s===S0)return t.UNSIGNED_SHORT_4_4_4_4;if(s===E0)return t.UNSIGNED_SHORT_5_5_5_1;if(s===Fw)return t.BYTE;if(s===zw)return t.SHORT;if(s===ah)return t.UNSIGNED_SHORT;if(s===x0)return t.INT;if(s===Vi)return t.UNSIGNED_INT;if(s===Wi)return t.FLOAT;if(s===xi)return i?t.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===Bw)return t.ALPHA;if(s===Gn)return t.RGBA;if(s===Hw)return t.LUMINANCE;if(s===Gw)return t.LUMINANCE_ALPHA;if(s===Ur)return t.DEPTH_COMPONENT;if(s===Bs)return t.DEPTH_STENCIL;if(s===$d)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===Vw)return t.RED;if(s===M0)return t.RED_INTEGER;if(s===Ww)return t.RG;if(s===w0)return t.RG_INTEGER;if(s===T0)return t.RGBA_INTEGER;if(s===pu||s===mu||s===gu||s===vu)if(l===st)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===pu)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===mu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===gu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===vu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===pu)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===mu)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===gu)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===vu)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===sm||s===om||s===am||s===lm)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===sm)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===om)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===am)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===lm)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===A0)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===cm||s===um)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===cm)return l===st?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===um)return l===st?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===dm||s===fm||s===hm||s===pm||s===mm||s===gm||s===vm||s===_m||s===ym||s===xm||s===Sm||s===Em||s===Mm||s===wm)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===dm)return l===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===fm)return l===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===hm)return l===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===pm)return l===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===mm)return l===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===gm)return l===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===vm)return l===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===_m)return l===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===ym)return l===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===xm)return l===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Sm)return l===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Em)return l===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Mm)return l===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===wm)return l===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===_u||s===Tm||s===Am)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===_u)return l===st?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Tm)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Am)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===jw||s===Cm||s===Rm||s===bm)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===_u)return a.COMPRESSED_RED_RGTC1_EXT;if(s===Cm)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Rm)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===bm)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Nr?i?t.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):t[s]!==void 0?t[s]:null}return{convert:r}}class vb extends Bn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class nl extends gn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const _b={type:"move"};class Hu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new nl,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new nl,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new nl,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const y of e.hand.values()){const m=n.getJointPose(y,i),f=this._getHandJoint(c,y);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),p=.02,_=.005;c.inputState.pinching&&h>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(_b)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new nl;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}class yb extends Ks{constructor(e,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,h=null,p=null,_=null;const y=n.getContextAttributes();let m=null,f=null;const v=[],g=[],x=new Oe;let R=null;const C=new Bn;C.layers.enable(1),C.viewport=new Nt;const A=new Bn;A.layers.enable(2),A.viewport=new Nt;const N=[C,A],E=new vb;E.layers.enable(1),E.layers.enable(2);let w=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let Q=v[K];return Q===void 0&&(Q=new Hu,v[K]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(K){let Q=v[K];return Q===void 0&&(Q=new Hu,v[K]=Q),Q.getGripSpace()},this.getHand=function(K){let Q=v[K];return Q===void 0&&(Q=new Hu,v[K]=Q),Q.getHandSpace()};function z(K){const Q=g.indexOf(K.inputSource);if(Q===-1)return;const ce=v[Q];ce!==void 0&&(ce.update(K.inputSource,K.frame,c||o),ce.dispatchEvent({type:K.type,data:K.inputSource}))}function q(){r.removeEventListener("select",z),r.removeEventListener("selectstart",z),r.removeEventListener("selectend",z),r.removeEventListener("squeeze",z),r.removeEventListener("squeezestart",z),r.removeEventListener("squeezeend",z),r.removeEventListener("end",q),r.removeEventListener("inputsourceschange",b);for(let K=0;K<v.length;K++){const Q=g[K];Q!==null&&(g[K]=null,v[K].disconnect(Q))}w=null,X=null,e.setRenderTarget(m),p=null,h=null,d=null,r=null,f=null,ee.stop(),i.isPresenting=!1,e.setPixelRatio(R),e.setSize(x.width,x.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){s=K,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){a=K,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(K){if(r=K,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",z),r.addEventListener("selectstart",z),r.addEventListener("selectend",z),r.addEventListener("squeeze",z),r.addEventListener("squeezestart",z),r.addEventListener("squeezeend",z),r.addEventListener("end",q),r.addEventListener("inputsourceschange",b),y.xrCompatible!==!0&&await n.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(x),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const Q={antialias:r.renderState.layers===void 0?y.antialias:!0,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,Q),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),f=new jn(p.framebufferWidth,p.framebufferHeight,{format:Gn,type:er,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil})}else{let Q=null,ce=null,ge=null;y.depth&&(ge=y.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,Q=y.stencil?Bs:Ur,ce=y.stencil?Nr:Vi);const se={colorFormat:n.RGBA8,depthFormat:ge,scaleFactor:s};d=new XRWebGLBinding(r,n),h=d.createProjectionLayer(se),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),f=new jn(h.textureWidth,h.textureHeight,{format:Gn,type:er,depthTexture:new G0(h.textureWidth,h.textureHeight,ce,void 0,void 0,void 0,void 0,void 0,void 0,Q),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0});const ve=e.properties.get(f);ve.__ignoreDepthValues=h.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),ee.setContext(r),ee.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function b(K){for(let Q=0;Q<K.removed.length;Q++){const ce=K.removed[Q],ge=g.indexOf(ce);ge>=0&&(g[ge]=null,v[ge].disconnect(ce))}for(let Q=0;Q<K.added.length;Q++){const ce=K.added[Q];let ge=g.indexOf(ce);if(ge===-1){for(let ve=0;ve<v.length;ve++)if(ve>=g.length){g.push(ce),ge=ve;break}else if(g[ve]===null){g[ve]=ce,ge=ve;break}if(ge===-1)break}const se=v[ge];se&&se.connect(ce)}}const U=new B,F=new B;function Y(K,Q,ce){U.setFromMatrixPosition(Q.matrixWorld),F.setFromMatrixPosition(ce.matrixWorld);const ge=U.distanceTo(F),se=Q.projectionMatrix.elements,ve=ce.projectionMatrix.elements,be=se[14]/(se[10]-1),_e=se[14]/(se[10]+1),je=(se[9]+1)/se[5],H=(se[9]-1)/se[5],wt=(se[8]-1)/se[0],we=(ve[8]+1)/ve[0],De=be*wt,ye=be*we,it=ge/(-wt+we),Ae=it*-wt;Q.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Ae),K.translateZ(it),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert();const T=be+it,S=_e+it,G=De-Ae,ne=ye+(ge-Ae),te=je*_e/S*T,re=H*_e/S*T;K.projectionMatrix.makePerspective(G,ne,te,re,T,S),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}function D(K,Q){Q===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(Q.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(r===null)return;E.near=A.near=C.near=K.near,E.far=A.far=C.far=K.far,(w!==E.near||X!==E.far)&&(r.updateRenderState({depthNear:E.near,depthFar:E.far}),w=E.near,X=E.far);const Q=K.parent,ce=E.cameras;D(E,Q);for(let ge=0;ge<ce.length;ge++)D(ce[ge],Q);ce.length===2?Y(E,C,A):E.projectionMatrix.copy(C.projectionMatrix),k(K,E,Q)};function k(K,Q,ce){ce===null?K.matrix.copy(Q.matrixWorld):(K.matrix.copy(ce.matrixWorld),K.matrix.invert(),K.matrix.multiply(Q.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(Q.projectionMatrix),K.projectionMatrixInverse.copy(Q.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Qo*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(K){l=K,h!==null&&(h.fixedFoveation=K),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=K)};let W=null;function J(K,Q){if(u=Q.getViewerPose(c||o),_=Q,u!==null){const ce=u.views;p!==null&&(e.setRenderTargetFramebuffer(f,p.framebuffer),e.setRenderTarget(f));let ge=!1;ce.length!==E.cameras.length&&(E.cameras.length=0,ge=!0);for(let se=0;se<ce.length;se++){const ve=ce[se];let be=null;if(p!==null)be=p.getViewport(ve);else{const je=d.getViewSubImage(h,ve);be=je.viewport,se===0&&(e.setRenderTargetTextures(f,je.colorTexture,h.ignoreDepthValues?void 0:je.depthStencilTexture),e.setRenderTarget(f))}let _e=N[se];_e===void 0&&(_e=new Bn,_e.layers.enable(se),_e.viewport=new Nt,N[se]=_e),_e.matrix.fromArray(ve.transform.matrix),_e.matrix.decompose(_e.position,_e.quaternion,_e.scale),_e.projectionMatrix.fromArray(ve.projectionMatrix),_e.projectionMatrixInverse.copy(_e.projectionMatrix).invert(),_e.viewport.set(be.x,be.y,be.width,be.height),se===0&&(E.matrix.copy(_e.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),ge===!0&&E.cameras.push(_e)}}for(let ce=0;ce<v.length;ce++){const ge=g[ce],se=v[ce];ge!==null&&se!==void 0&&se.update(ge,Q,c||o)}W&&W(K,Q),Q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Q}),_=null}const ee=new H0;ee.setAnimationLoop(J),this.setAnimationLoop=function(K){W=K},this.dispose=function(){}}}function xb(t,e){function n(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,k0(t)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function r(m,f,v,g,x){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(m,f):f.isMeshToonMaterial?(s(m,f),d(m,f)):f.isMeshPhongMaterial?(s(m,f),u(m,f)):f.isMeshStandardMaterial?(s(m,f),h(m,f),f.isMeshPhysicalMaterial&&p(m,f,x)):f.isMeshMatcapMaterial?(s(m,f),_(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),y(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?l(m,f,v,g):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,n(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,n(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,n(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===ln&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,n(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===ln&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,n(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,n(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,n(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const v=e.get(f).envMap;if(v&&(m.envMap.value=v,m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap){m.lightMap.value=f.lightMap;const g=t._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=f.lightMapIntensity*g,n(f.lightMap,m.lightMapTransform)}f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,n(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,n(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,v,g){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*v,m.scale.value=g*.5,f.map&&(m.map.value=f.map,n(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,n(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,n(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,n(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,n(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,n(f.roughnessMap,m.roughnessMapTransform)),e.get(f).envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,v){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,n(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,n(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,n(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,n(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,n(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===ln&&m.clearcoatNormalScale.value.negate())),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,n(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,n(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,n(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,n(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,n(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,n(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,n(f.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,f){f.matcap&&(m.matcap.value=f.matcap)}function y(m,f){const v=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Sb(t,e,n,i){let r={},s={},o=[];const a=n.isWebGL2?t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(v,g){const x=g.program;i.uniformBlockBinding(v,x)}function c(v,g){let x=r[v.id];x===void 0&&(_(v),x=u(v),r[v.id]=x,v.addEventListener("dispose",m));const R=g.program;i.updateUBOMapping(v,R);const C=e.render.frame;s[v.id]!==C&&(h(v),s[v.id]=C)}function u(v){const g=d();v.__bindingPointIndex=g;const x=t.createBuffer(),R=v.__size,C=v.usage;return t.bindBuffer(t.UNIFORM_BUFFER,x),t.bufferData(t.UNIFORM_BUFFER,R,C),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,g,x),x}function d(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){const g=r[v.id],x=v.uniforms,R=v.__cache;t.bindBuffer(t.UNIFORM_BUFFER,g);for(let C=0,A=x.length;C<A;C++){const N=Array.isArray(x[C])?x[C]:[x[C]];for(let E=0,w=N.length;E<w;E++){const X=N[E];if(p(X,C,E,R)===!0){const z=X.__offset,q=Array.isArray(X.value)?X.value:[X.value];let b=0;for(let U=0;U<q.length;U++){const F=q[U],Y=y(F);typeof F=="number"||typeof F=="boolean"?(X.__data[0]=F,t.bufferSubData(t.UNIFORM_BUFFER,z+b,X.__data)):F.isMatrix3?(X.__data[0]=F.elements[0],X.__data[1]=F.elements[1],X.__data[2]=F.elements[2],X.__data[3]=0,X.__data[4]=F.elements[3],X.__data[5]=F.elements[4],X.__data[6]=F.elements[5],X.__data[7]=0,X.__data[8]=F.elements[6],X.__data[9]=F.elements[7],X.__data[10]=F.elements[8],X.__data[11]=0):(F.toArray(X.__data,b),b+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,z,X.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(v,g,x,R){const C=v.value,A=g+"_"+x;if(R[A]===void 0)return typeof C=="number"||typeof C=="boolean"?R[A]=C:R[A]=C.clone(),!0;{const N=R[A];if(typeof C=="number"||typeof C=="boolean"){if(N!==C)return R[A]=C,!0}else if(N.equals(C)===!1)return N.copy(C),!0}return!1}function _(v){const g=v.uniforms;let x=0;const R=16;for(let A=0,N=g.length;A<N;A++){const E=Array.isArray(g[A])?g[A]:[g[A]];for(let w=0,X=E.length;w<X;w++){const z=E[w],q=Array.isArray(z.value)?z.value:[z.value];for(let b=0,U=q.length;b<U;b++){const F=q[b],Y=y(F),D=x%R;D!==0&&R-D<Y.boundary&&(x+=R-D),z.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=x,x+=Y.storage}}}const C=x%R;return C>0&&(x+=R-C),v.__size=x,v.__cache={},this}function y(v){const g={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(g.boundary=4,g.storage=4):v.isVector2?(g.boundary=8,g.storage=8):v.isVector3||v.isColor?(g.boundary=16,g.storage=12):v.isVector4?(g.boundary=16,g.storage=16):v.isMatrix3?(g.boundary=48,g.storage=48):v.isMatrix4?(g.boundary=64,g.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),g}function m(v){const g=v.target;g.removeEventListener("dispose",m);const x=o.indexOf(g.__bindingPointIndex);o.splice(x,1),t.deleteBuffer(r[g.id]),delete r[g.id],delete s[g.id]}function f(){for(const v in r)t.deleteBuffer(r[v]);o=[],r={},s={}}return{bind:l,update:c,dispose:f}}class K0{constructor(e={}){const{canvas:n=vT(),context:i=null,depth:r=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let h;i!==null?h=i.getContextAttributes().alpha:h=o;const p=new Uint32Array(4),_=new Int32Array(4);let y=null,m=null;const f=[],v=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Dt,this._useLegacyLights=!1,this.toneMapping=Qi,this.toneMappingExposure=1;const g=this;let x=!1,R=0,C=0,A=null,N=-1,E=null;const w=new Nt,X=new Nt;let z=null;const q=new Ke(0);let b=0,U=n.width,F=n.height,Y=1,D=null,k=null;const W=new Nt(0,0,U,F),J=new Nt(0,0,U,F);let ee=!1;const K=new B0;let Q=!1,ce=!1,ge=null;const se=new It,ve=new Oe,be=new B,_e={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function je(){return A===null?Y:1}let H=i;function wt(M,O){for(let j=0;j<M.length;j++){const $=M[j],V=n.getContext($,O);if(V!==null)return V}return null}try{const M={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${oh}`),n.addEventListener("webglcontextlost",oe,!1),n.addEventListener("webglcontextrestored",P,!1),n.addEventListener("webglcontextcreationerror",ue,!1),H===null){const O=["webgl2","webgl","experimental-webgl"];if(g.isWebGL1Renderer===!0&&O.shift(),H=wt(O,M),H===null)throw wt(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&H instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),H.getShaderPrecisionFormat===void 0&&(H.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let we,De,ye,it,Ae,T,S,G,ne,te,re,Se,le,me,Ce,ke,Z,ze,Me,Te,xe,pe,Pe,$e;function Ye(){we=new LC(H),De=new TC(H,we,e),we.init(De),pe=new gb(H,we,De),ye=new pb(H,we,De),it=new UC(H),Ae=new eb,T=new mb(H,we,ye,Ae,De,pe,it),S=new CC(g),G=new PC(g),ne=new GT(H,De),Pe=new MC(H,we,ne,De),te=new DC(H,ne,it,Pe),re=new FC(H,te,ne,it),Me=new kC(H,De,T),ke=new AC(Ae),Se=new QR(g,S,G,we,De,Pe,ke),le=new xb(g,Ae),me=new nb,Ce=new lb(we,De),ze=new EC(g,S,G,ye,re,h,l),Z=new hb(g,re,De),$e=new Sb(H,it,De,ye),Te=new wC(H,we,it,De),xe=new NC(H,we,it,De),it.programs=Se.programs,g.capabilities=De,g.extensions=we,g.properties=Ae,g.renderLists=me,g.shadowMap=Z,g.state=ye,g.info=it}Ye();const Ue=new yb(g,H);this.xr=Ue,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){const M=we.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=we.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(M){M!==void 0&&(Y=M,this.setSize(U,F,!1))},this.getSize=function(M){return M.set(U,F)},this.setSize=function(M,O,j=!0){if(Ue.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}U=M,F=O,n.width=Math.floor(M*Y),n.height=Math.floor(O*Y),j===!0&&(n.style.width=M+"px",n.style.height=O+"px"),this.setViewport(0,0,M,O)},this.getDrawingBufferSize=function(M){return M.set(U*Y,F*Y).floor()},this.setDrawingBufferSize=function(M,O,j){U=M,F=O,Y=j,n.width=Math.floor(M*j),n.height=Math.floor(O*j),this.setViewport(0,0,M,O)},this.getCurrentViewport=function(M){return M.copy(w)},this.getViewport=function(M){return M.copy(W)},this.setViewport=function(M,O,j,$){M.isVector4?W.set(M.x,M.y,M.z,M.w):W.set(M,O,j,$),ye.viewport(w.copy(W).multiplyScalar(Y).floor())},this.getScissor=function(M){return M.copy(J)},this.setScissor=function(M,O,j,$){M.isVector4?J.set(M.x,M.y,M.z,M.w):J.set(M,O,j,$),ye.scissor(X.copy(J).multiplyScalar(Y).floor())},this.getScissorTest=function(){return ee},this.setScissorTest=function(M){ye.setScissorTest(ee=M)},this.setOpaqueSort=function(M){D=M},this.setTransparentSort=function(M){k=M},this.getClearColor=function(M){return M.copy(ze.getClearColor())},this.setClearColor=function(){ze.setClearColor.apply(ze,arguments)},this.getClearAlpha=function(){return ze.getClearAlpha()},this.setClearAlpha=function(){ze.setClearAlpha.apply(ze,arguments)},this.clear=function(M=!0,O=!0,j=!0){let $=0;if(M){let V=!1;if(A!==null){const fe=A.texture.format;V=fe===T0||fe===w0||fe===M0}if(V){const fe=A.texture.type,Ee=fe===er||fe===Vi||fe===ah||fe===Nr||fe===S0||fe===E0,Le=ze.getClearColor(),Ie=ze.getClearAlpha(),Ge=Le.r,Fe=Le.g,Be=Le.b;Ee?(p[0]=Ge,p[1]=Fe,p[2]=Be,p[3]=Ie,H.clearBufferuiv(H.COLOR,0,p)):(_[0]=Ge,_[1]=Fe,_[2]=Be,_[3]=Ie,H.clearBufferiv(H.COLOR,0,_))}else $|=H.COLOR_BUFFER_BIT}O&&($|=H.DEPTH_BUFFER_BIT),j&&($|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",oe,!1),n.removeEventListener("webglcontextrestored",P,!1),n.removeEventListener("webglcontextcreationerror",ue,!1),me.dispose(),Ce.dispose(),Ae.dispose(),S.dispose(),G.dispose(),re.dispose(),Pe.dispose(),$e.dispose(),Se.dispose(),Ue.dispose(),Ue.removeEventListener("sessionstart",Wt),Ue.removeEventListener("sessionend",tt),ge&&(ge.dispose(),ge=null),jt.stop()};function oe(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),x=!0}function P(){console.log("THREE.WebGLRenderer: Context Restored."),x=!1;const M=it.autoReset,O=Z.enabled,j=Z.autoUpdate,$=Z.needsUpdate,V=Z.type;Ye(),it.autoReset=M,Z.enabled=O,Z.autoUpdate=j,Z.needsUpdate=$,Z.type=V}function ue(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function de(M){const O=M.target;O.removeEventListener("dispose",de),Ne(O)}function Ne(M){Re(M),Ae.remove(M)}function Re(M){const O=Ae.get(M).programs;O!==void 0&&(O.forEach(function(j){Se.releaseProgram(j)}),M.isShaderMaterial&&Se.releaseShaderCache(M))}this.renderBufferDirect=function(M,O,j,$,V,fe){O===null&&(O=_e);const Ee=V.isMesh&&V.matrixWorld.determinant()<0,Le=ny(M,O,j,$,V);ye.setMaterial($,Ee);let Ie=j.index,Ge=1;if($.wireframe===!0){if(Ie=te.getWireframeAttribute(j),Ie===void 0)return;Ge=2}const Fe=j.drawRange,Be=j.attributes.position;let gt=Fe.start*Ge,cn=(Fe.start+Fe.count)*Ge;fe!==null&&(gt=Math.max(gt,fe.start*Ge),cn=Math.min(cn,(fe.start+fe.count)*Ge)),Ie!==null?(gt=Math.max(gt,0),cn=Math.min(cn,Ie.count)):Be!=null&&(gt=Math.max(gt,0),cn=Math.min(cn,Be.count));const At=cn-gt;if(At<0||At===1/0)return;Pe.setup(V,$,Le,j,Ie);let ri,lt=Te;if(Ie!==null&&(ri=ne.get(Ie),lt=xe,lt.setIndex(ri)),V.isMesh)$.wireframe===!0?(ye.setLineWidth($.wireframeLinewidth*je()),lt.setMode(H.LINES)):lt.setMode(H.TRIANGLES);else if(V.isLine){let Ve=$.linewidth;Ve===void 0&&(Ve=1),ye.setLineWidth(Ve*je()),V.isLineSegments?lt.setMode(H.LINES):V.isLineLoop?lt.setMode(H.LINE_LOOP):lt.setMode(H.LINE_STRIP)}else V.isPoints?lt.setMode(H.POINTS):V.isSprite&&lt.setMode(H.TRIANGLES);if(V.isBatchedMesh)lt.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else if(V.isInstancedMesh)lt.renderInstances(gt,At,V.count);else if(j.isInstancedBufferGeometry){const Ve=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,Pc=Math.min(j.instanceCount,Ve);lt.renderInstances(gt,At,Pc)}else lt.render(gt,At)};function Qe(M,O,j){M.transparent===!0&&M.side===hi&&M.forceSinglePass===!1?(M.side=ln,M.needsUpdate=!0,ha(M,O,j),M.side=ir,M.needsUpdate=!0,ha(M,O,j),M.side=hi):ha(M,O,j)}this.compile=function(M,O,j=null){j===null&&(j=M),m=Ce.get(j),m.init(),v.push(m),j.traverseVisible(function(V){V.isLight&&V.layers.test(O.layers)&&(m.pushLight(V),V.castShadow&&m.pushShadow(V))}),M!==j&&M.traverseVisible(function(V){V.isLight&&V.layers.test(O.layers)&&(m.pushLight(V),V.castShadow&&m.pushShadow(V))}),m.setupLights(g._useLegacyLights);const $=new Set;return M.traverse(function(V){const fe=V.material;if(fe)if(Array.isArray(fe))for(let Ee=0;Ee<fe.length;Ee++){const Le=fe[Ee];Qe(Le,j,V),$.add(Le)}else Qe(fe,j,V),$.add(fe)}),v.pop(),m=null,$},this.compileAsync=function(M,O,j=null){const $=this.compile(M,O,j);return new Promise(V=>{function fe(){if($.forEach(function(Ee){Ae.get(Ee).currentProgram.isReady()&&$.delete(Ee)}),$.size===0){V(M);return}setTimeout(fe,10)}we.get("KHR_parallel_shader_compile")!==null?fe():setTimeout(fe,10)})};let et=null;function Tt(M){et&&et(M)}function Wt(){jt.stop()}function tt(){jt.start()}const jt=new H0;jt.setAnimationLoop(Tt),typeof self<"u"&&jt.setContext(self),this.setAnimationLoop=function(M){et=M,Ue.setAnimationLoop(M),M===null?jt.stop():jt.start()},Ue.addEventListener("sessionstart",Wt),Ue.addEventListener("sessionend",tt),this.render=function(M,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(x===!0)return;M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Ue.enabled===!0&&Ue.isPresenting===!0&&(Ue.cameraAutoUpdate===!0&&Ue.updateCamera(O),O=Ue.getCamera()),M.isScene===!0&&M.onBeforeRender(g,M,O,A),m=Ce.get(M,v.length),m.init(),v.push(m),se.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),K.setFromProjectionMatrix(se),ce=this.localClippingEnabled,Q=ke.init(this.clippingPlanes,ce),y=me.get(M,f.length),y.init(),f.push(y),Kn(M,O,0,g.sortObjects),y.finish(),g.sortObjects===!0&&y.sort(D,k),this.info.render.frame++,Q===!0&&ke.beginShadows();const j=m.state.shadowsArray;if(Z.render(j,M,O),Q===!0&&ke.endShadows(),this.info.autoReset===!0&&this.info.reset(),ze.render(y,M),m.setupLights(g._useLegacyLights),O.isArrayCamera){const $=O.cameras;for(let V=0,fe=$.length;V<fe;V++){const Ee=$[V];yh(y,M,Ee,Ee.viewport)}}else yh(y,M,O);A!==null&&(T.updateMultisampleRenderTarget(A),T.updateRenderTargetMipmap(A)),M.isScene===!0&&M.onAfterRender(g,M,O),Pe.resetDefaultState(),N=-1,E=null,v.pop(),v.length>0?m=v[v.length-1]:m=null,f.pop(),f.length>0?y=f[f.length-1]:y=null};function Kn(M,O,j,$){if(M.visible===!1)return;if(M.layers.test(O.layers)){if(M.isGroup)j=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(O);else if(M.isLight)m.pushLight(M),M.castShadow&&m.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||K.intersectsSprite(M)){$&&be.setFromMatrixPosition(M.matrixWorld).applyMatrix4(se);const Ee=re.update(M),Le=M.material;Le.visible&&y.push(M,Ee,Le,j,be.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||K.intersectsObject(M))){const Ee=re.update(M),Le=M.material;if($&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),be.copy(M.boundingSphere.center)):(Ee.boundingSphere===null&&Ee.computeBoundingSphere(),be.copy(Ee.boundingSphere.center)),be.applyMatrix4(M.matrixWorld).applyMatrix4(se)),Array.isArray(Le)){const Ie=Ee.groups;for(let Ge=0,Fe=Ie.length;Ge<Fe;Ge++){const Be=Ie[Ge],gt=Le[Be.materialIndex];gt&&gt.visible&&y.push(M,Ee,gt,j,be.z,Be)}}else Le.visible&&y.push(M,Ee,Le,j,be.z,null)}}const fe=M.children;for(let Ee=0,Le=fe.length;Ee<Le;Ee++)Kn(fe[Ee],O,j,$)}function yh(M,O,j,$){const V=M.opaque,fe=M.transmissive,Ee=M.transparent;m.setupLightsView(j),Q===!0&&ke.setGlobalState(g.clippingPlanes,j),fe.length>0&&ty(V,fe,O,j),$&&ye.viewport(w.copy($)),V.length>0&&fa(V,O,j),fe.length>0&&fa(fe,O,j),Ee.length>0&&fa(Ee,O,j),ye.buffers.depth.setTest(!0),ye.buffers.depth.setMask(!0),ye.buffers.color.setMask(!0),ye.setPolygonOffset(!1)}function ty(M,O,j,$){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;const fe=De.isWebGL2;ge===null&&(ge=new jn(1,1,{generateMipmaps:!0,type:we.has("EXT_color_buffer_half_float")?xi:er,minFilter:Jo,samples:fe?4:0})),g.getDrawingBufferSize(ve),fe?ge.setSize(ve.x,ve.y):ge.setSize(Ql(ve.x),Ql(ve.y));const Ee=g.getRenderTarget();g.setRenderTarget(ge),g.getClearColor(q),b=g.getClearAlpha(),b<1&&g.setClearColor(16777215,.5),g.clear();const Le=g.toneMapping;g.toneMapping=Qi,fa(M,j,$),T.updateMultisampleRenderTarget(ge),T.updateRenderTargetMipmap(ge);let Ie=!1;for(let Ge=0,Fe=O.length;Ge<Fe;Ge++){const Be=O[Ge],gt=Be.object,cn=Be.geometry,At=Be.material,ri=Be.group;if(At.side===hi&&gt.layers.test($.layers)){const lt=At.side;At.side=ln,At.needsUpdate=!0,xh(gt,j,$,cn,At,ri),At.side=lt,At.needsUpdate=!0,Ie=!0}}Ie===!0&&(T.updateMultisampleRenderTarget(ge),T.updateRenderTargetMipmap(ge)),g.setRenderTarget(Ee),g.setClearColor(q,b),g.toneMapping=Le}function fa(M,O,j){const $=O.isScene===!0?O.overrideMaterial:null;for(let V=0,fe=M.length;V<fe;V++){const Ee=M[V],Le=Ee.object,Ie=Ee.geometry,Ge=$===null?Ee.material:$,Fe=Ee.group;Le.layers.test(j.layers)&&xh(Le,O,j,Ie,Ge,Fe)}}function xh(M,O,j,$,V,fe){M.onBeforeRender(g,O,j,$,V,fe),M.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),V.onBeforeRender(g,O,j,$,M,fe),V.transparent===!0&&V.side===hi&&V.forceSinglePass===!1?(V.side=ln,V.needsUpdate=!0,g.renderBufferDirect(j,O,$,V,M,fe),V.side=ir,V.needsUpdate=!0,g.renderBufferDirect(j,O,$,V,M,fe),V.side=hi):g.renderBufferDirect(j,O,$,V,M,fe),M.onAfterRender(g,O,j,$,V,fe)}function ha(M,O,j){O.isScene!==!0&&(O=_e);const $=Ae.get(M),V=m.state.lights,fe=m.state.shadowsArray,Ee=V.state.version,Le=Se.getParameters(M,V.state,fe,O,j),Ie=Se.getProgramCacheKey(Le);let Ge=$.programs;$.environment=M.isMeshStandardMaterial?O.environment:null,$.fog=O.fog,$.envMap=(M.isMeshStandardMaterial?G:S).get(M.envMap||$.environment),Ge===void 0&&(M.addEventListener("dispose",de),Ge=new Map,$.programs=Ge);let Fe=Ge.get(Ie);if(Fe!==void 0){if($.currentProgram===Fe&&$.lightsStateVersion===Ee)return Eh(M,Le),Fe}else Le.uniforms=Se.getUniforms(M),M.onBuild(j,Le,g),M.onBeforeCompile(Le,g),Fe=Se.acquireProgram(Le,Ie),Ge.set(Ie,Fe),$.uniforms=Le.uniforms;const Be=$.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Be.clippingPlanes=ke.uniform),Eh(M,Le),$.needsLights=ry(M),$.lightsStateVersion=Ee,$.needsLights&&(Be.ambientLightColor.value=V.state.ambient,Be.lightProbe.value=V.state.probe,Be.directionalLights.value=V.state.directional,Be.directionalLightShadows.value=V.state.directionalShadow,Be.spotLights.value=V.state.spot,Be.spotLightShadows.value=V.state.spotShadow,Be.rectAreaLights.value=V.state.rectArea,Be.ltc_1.value=V.state.rectAreaLTC1,Be.ltc_2.value=V.state.rectAreaLTC2,Be.pointLights.value=V.state.point,Be.pointLightShadows.value=V.state.pointShadow,Be.hemisphereLights.value=V.state.hemi,Be.directionalShadowMap.value=V.state.directionalShadowMap,Be.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Be.spotShadowMap.value=V.state.spotShadowMap,Be.spotLightMatrix.value=V.state.spotLightMatrix,Be.spotLightMap.value=V.state.spotLightMap,Be.pointShadowMap.value=V.state.pointShadowMap,Be.pointShadowMatrix.value=V.state.pointShadowMatrix),$.currentProgram=Fe,$.uniformsList=null,Fe}function Sh(M){if(M.uniformsList===null){const O=M.currentProgram.getUniforms();M.uniformsList=_l.seqWithValue(O.seq,M.uniforms)}return M.uniformsList}function Eh(M,O){const j=Ae.get(M);j.outputColorSpace=O.outputColorSpace,j.batching=O.batching,j.instancing=O.instancing,j.instancingColor=O.instancingColor,j.skinning=O.skinning,j.morphTargets=O.morphTargets,j.morphNormals=O.morphNormals,j.morphColors=O.morphColors,j.morphTargetsCount=O.morphTargetsCount,j.numClippingPlanes=O.numClippingPlanes,j.numIntersection=O.numClipIntersection,j.vertexAlphas=O.vertexAlphas,j.vertexTangents=O.vertexTangents,j.toneMapping=O.toneMapping}function ny(M,O,j,$,V){O.isScene!==!0&&(O=_e),T.resetTextureUnits();const fe=O.fog,Ee=$.isMeshStandardMaterial?O.environment:null,Le=A===null?g.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Ci,Ie=($.isMeshStandardMaterial?G:S).get($.envMap||Ee),Ge=$.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,Fe=!!j.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Be=!!j.morphAttributes.position,gt=!!j.morphAttributes.normal,cn=!!j.morphAttributes.color;let At=Qi;$.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(At=g.toneMapping);const ri=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,lt=ri!==void 0?ri.length:0,Ve=Ae.get($),Pc=m.state.lights;if(Q===!0&&(ce===!0||M!==E)){const xn=M===E&&$.id===N;ke.setState($,M,xn)}let ht=!1;$.version===Ve.__version?(Ve.needsLights&&Ve.lightsStateVersion!==Pc.state.version||Ve.outputColorSpace!==Le||V.isBatchedMesh&&Ve.batching===!1||!V.isBatchedMesh&&Ve.batching===!0||V.isInstancedMesh&&Ve.instancing===!1||!V.isInstancedMesh&&Ve.instancing===!0||V.isSkinnedMesh&&Ve.skinning===!1||!V.isSkinnedMesh&&Ve.skinning===!0||V.isInstancedMesh&&Ve.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Ve.instancingColor===!1&&V.instanceColor!==null||Ve.envMap!==Ie||$.fog===!0&&Ve.fog!==fe||Ve.numClippingPlanes!==void 0&&(Ve.numClippingPlanes!==ke.numPlanes||Ve.numIntersection!==ke.numIntersection)||Ve.vertexAlphas!==Ge||Ve.vertexTangents!==Fe||Ve.morphTargets!==Be||Ve.morphNormals!==gt||Ve.morphColors!==cn||Ve.toneMapping!==At||De.isWebGL2===!0&&Ve.morphTargetsCount!==lt)&&(ht=!0):(ht=!0,Ve.__version=$.version);let cr=Ve.currentProgram;ht===!0&&(cr=ha($,O,V));let Mh=!1,Zs=!1,Lc=!1;const kt=cr.getUniforms(),ur=Ve.uniforms;if(ye.useProgram(cr.program)&&(Mh=!0,Zs=!0,Lc=!0),$.id!==N&&(N=$.id,Zs=!0),Mh||E!==M){kt.setValue(H,"projectionMatrix",M.projectionMatrix),kt.setValue(H,"viewMatrix",M.matrixWorldInverse);const xn=kt.map.cameraPosition;xn!==void 0&&xn.setValue(H,be.setFromMatrixPosition(M.matrixWorld)),De.logarithmicDepthBuffer&&kt.setValue(H,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&kt.setValue(H,"isOrthographic",M.isOrthographicCamera===!0),E!==M&&(E=M,Zs=!0,Lc=!0)}if(V.isSkinnedMesh){kt.setOptional(H,V,"bindMatrix"),kt.setOptional(H,V,"bindMatrixInverse");const xn=V.skeleton;xn&&(De.floatVertexTextures?(xn.boneTexture===null&&xn.computeBoneTexture(),kt.setValue(H,"boneTexture",xn.boneTexture,T)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}V.isBatchedMesh&&(kt.setOptional(H,V,"batchingTexture"),kt.setValue(H,"batchingTexture",V._matricesTexture,T));const Dc=j.morphAttributes;if((Dc.position!==void 0||Dc.normal!==void 0||Dc.color!==void 0&&De.isWebGL2===!0)&&Me.update(V,j,cr),(Zs||Ve.receiveShadow!==V.receiveShadow)&&(Ve.receiveShadow=V.receiveShadow,kt.setValue(H,"receiveShadow",V.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(ur.envMap.value=Ie,ur.flipEnvMap.value=Ie.isCubeTexture&&Ie.isRenderTargetTexture===!1?-1:1),Zs&&(kt.setValue(H,"toneMappingExposure",g.toneMappingExposure),Ve.needsLights&&iy(ur,Lc),fe&&$.fog===!0&&le.refreshFogUniforms(ur,fe),le.refreshMaterialUniforms(ur,$,Y,F,ge),_l.upload(H,Sh(Ve),ur,T)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(_l.upload(H,Sh(Ve),ur,T),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&kt.setValue(H,"center",V.center),kt.setValue(H,"modelViewMatrix",V.modelViewMatrix),kt.setValue(H,"normalMatrix",V.normalMatrix),kt.setValue(H,"modelMatrix",V.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const xn=$.uniformsGroups;for(let Nc=0,sy=xn.length;Nc<sy;Nc++)if(De.isWebGL2){const wh=xn[Nc];$e.update(wh,cr),$e.bind(wh,cr)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return cr}function iy(M,O){M.ambientLightColor.needsUpdate=O,M.lightProbe.needsUpdate=O,M.directionalLights.needsUpdate=O,M.directionalLightShadows.needsUpdate=O,M.pointLights.needsUpdate=O,M.pointLightShadows.needsUpdate=O,M.spotLights.needsUpdate=O,M.spotLightShadows.needsUpdate=O,M.rectAreaLights.needsUpdate=O,M.hemisphereLights.needsUpdate=O}function ry(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(M,O,j){Ae.get(M.texture).__webglTexture=O,Ae.get(M.depthTexture).__webglTexture=j;const $=Ae.get(M);$.__hasExternalTextures=!0,$.__hasExternalTextures&&($.__autoAllocateDepthBuffer=j===void 0,$.__autoAllocateDepthBuffer||we.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(M,O){const j=Ae.get(M);j.__webglFramebuffer=O,j.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(M,O=0,j=0){A=M,R=O,C=j;let $=!0,V=null,fe=!1,Ee=!1;if(M){const Ie=Ae.get(M);Ie.__useDefaultFramebuffer!==void 0?(ye.bindFramebuffer(H.FRAMEBUFFER,null),$=!1):Ie.__webglFramebuffer===void 0?T.setupRenderTarget(M):Ie.__hasExternalTextures&&T.rebindTextures(M,Ae.get(M.texture).__webglTexture,Ae.get(M.depthTexture).__webglTexture);const Ge=M.texture;(Ge.isData3DTexture||Ge.isDataArrayTexture||Ge.isCompressedArrayTexture)&&(Ee=!0);const Fe=Ae.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Fe[O])?V=Fe[O][j]:V=Fe[O],fe=!0):De.isWebGL2&&M.samples>0&&T.useMultisampledRTT(M)===!1?V=Ae.get(M).__webglMultisampledFramebuffer:Array.isArray(Fe)?V=Fe[j]:V=Fe,w.copy(M.viewport),X.copy(M.scissor),z=M.scissorTest}else w.copy(W).multiplyScalar(Y).floor(),X.copy(J).multiplyScalar(Y).floor(),z=ee;if(ye.bindFramebuffer(H.FRAMEBUFFER,V)&&De.drawBuffers&&$&&ye.drawBuffers(M,V),ye.viewport(w),ye.scissor(X),ye.setScissorTest(z),fe){const Ie=Ae.get(M.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+O,Ie.__webglTexture,j)}else if(Ee){const Ie=Ae.get(M.texture),Ge=O||0;H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,Ie.__webglTexture,j||0,Ge)}N=-1},this.readRenderTargetPixels=function(M,O,j,$,V,fe,Ee){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Le=Ae.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Ee!==void 0&&(Le=Le[Ee]),Le){ye.bindFramebuffer(H.FRAMEBUFFER,Le);try{const Ie=M.texture,Ge=Ie.format,Fe=Ie.type;if(Ge!==Gn&&pe.convert(Ge)!==H.getParameter(H.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Be=Fe===xi&&(we.has("EXT_color_buffer_half_float")||De.isWebGL2&&we.has("EXT_color_buffer_float"));if(Fe!==er&&pe.convert(Fe)!==H.getParameter(H.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Fe===Wi&&(De.isWebGL2||we.has("OES_texture_float")||we.has("WEBGL_color_buffer_float")))&&!Be){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=M.width-$&&j>=0&&j<=M.height-V&&H.readPixels(O,j,$,V,pe.convert(Ge),pe.convert(Fe),fe)}finally{const Ie=A!==null?Ae.get(A).__webglFramebuffer:null;ye.bindFramebuffer(H.FRAMEBUFFER,Ie)}}},this.copyFramebufferToTexture=function(M,O,j=0){const $=Math.pow(2,-j),V=Math.floor(O.image.width*$),fe=Math.floor(O.image.height*$);T.setTexture2D(O,0),H.copyTexSubImage2D(H.TEXTURE_2D,j,0,0,M.x,M.y,V,fe),ye.unbindTexture()},this.copyTextureToTexture=function(M,O,j,$=0){const V=O.image.width,fe=O.image.height,Ee=pe.convert(j.format),Le=pe.convert(j.type);T.setTexture2D(j,0),H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,j.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,j.unpackAlignment),O.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,$,M.x,M.y,V,fe,Ee,Le,O.image.data):O.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,$,M.x,M.y,O.mipmaps[0].width,O.mipmaps[0].height,Ee,O.mipmaps[0].data):H.texSubImage2D(H.TEXTURE_2D,$,M.x,M.y,Ee,Le,O.image),$===0&&j.generateMipmaps&&H.generateMipmap(H.TEXTURE_2D),ye.unbindTexture()},this.copyTextureToTexture3D=function(M,O,j,$,V=0){if(g.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const fe=M.max.x-M.min.x+1,Ee=M.max.y-M.min.y+1,Le=M.max.z-M.min.z+1,Ie=pe.convert($.format),Ge=pe.convert($.type);let Fe;if($.isData3DTexture)T.setTexture3D($,0),Fe=H.TEXTURE_3D;else if($.isDataArrayTexture||$.isCompressedArrayTexture)T.setTexture2DArray($,0),Fe=H.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,$.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,$.unpackAlignment);const Be=H.getParameter(H.UNPACK_ROW_LENGTH),gt=H.getParameter(H.UNPACK_IMAGE_HEIGHT),cn=H.getParameter(H.UNPACK_SKIP_PIXELS),At=H.getParameter(H.UNPACK_SKIP_ROWS),ri=H.getParameter(H.UNPACK_SKIP_IMAGES),lt=j.isCompressedTexture?j.mipmaps[V]:j.image;H.pixelStorei(H.UNPACK_ROW_LENGTH,lt.width),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,lt.height),H.pixelStorei(H.UNPACK_SKIP_PIXELS,M.min.x),H.pixelStorei(H.UNPACK_SKIP_ROWS,M.min.y),H.pixelStorei(H.UNPACK_SKIP_IMAGES,M.min.z),j.isDataTexture||j.isData3DTexture?H.texSubImage3D(Fe,V,O.x,O.y,O.z,fe,Ee,Le,Ie,Ge,lt.data):j.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),H.compressedTexSubImage3D(Fe,V,O.x,O.y,O.z,fe,Ee,Le,Ie,lt.data)):H.texSubImage3D(Fe,V,O.x,O.y,O.z,fe,Ee,Le,Ie,Ge,lt),H.pixelStorei(H.UNPACK_ROW_LENGTH,Be),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,gt),H.pixelStorei(H.UNPACK_SKIP_PIXELS,cn),H.pixelStorei(H.UNPACK_SKIP_ROWS,At),H.pixelStorei(H.UNPACK_SKIP_IMAGES,ri),V===0&&$.generateMipmaps&&H.generateMipmap(Fe),ye.unbindTexture()},this.initTexture=function(M){M.isCubeTexture?T.setTextureCube(M,0):M.isData3DTexture?T.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?T.setTexture2DArray(M,0):T.setTexture2D(M,0),ye.unbindTexture()},this.resetState=function(){R=0,C=0,A=null,ye.reset(),Pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=e===lh?"display-p3":"srgb",n.unpackColorSpace=Je.workingColorSpace===Tc?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Dt?Ir:C0}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Ir?Dt:Ci}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Eb extends K0{}Eb.prototype.isWebGL1Renderer=!0;class Mb extends gn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n}}class wb{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=yg(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=yg();e=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=e}return e}}function yg(){return(typeof performance>"u"?Date:performance).now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:oh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=oh);const Y0={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class da{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Tb=new fh(-1,1,1,-1,0,1);class Ab extends lr{constructor(){super(),this.setAttribute("position",new Si([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Si([0,2,0,0,2,0],2))}}const Cb=new Ab;class q0{constructor(e){this._mesh=new ei(Cb,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Tb)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class qd extends da{constructor(e,n){super(),this.textureID=n!==void 0?n:"tDiffuse",e instanceof rn?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=tc.clone(e.uniforms),this.material=new rn({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new q0(this.material)}render(e,n,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class xg extends da{constructor(e,n){super(),this.scene=e,this.camera=n,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,n,i){const r=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,o,4294967295),s.buffers.stencil.setClear(a),s.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}}class Rb extends da{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class bb{constructor(e,n){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),n===void 0){const i=e.getSize(new Oe);this._width=i.width,this._height=i.height,n=new jn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:xi}),n.texture.name="EffectComposer.rt1"}else this._width=n.width,this._height=n.height;this.renderTarget1=n,this.renderTarget2=n.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new qd(Y0),this.copyPass.material.blending=yi,this.clock=new wb}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,n){this.passes.splice(n,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const n=this.passes.indexOf(e);n!==-1&&this.passes.splice(n,1)}isLastEnabledPass(e){for(let n=e+1;n<this.passes.length;n++)if(this.passes[n].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const n=this.renderer.getRenderTarget();let i=!1;for(let r=0,s=this.passes.length;r<s;r++){const o=this.passes[r];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),o.needsSwap){if(i){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}xg!==void 0&&(o instanceof xg?i=!0:o instanceof Rb&&(i=!1))}}this.renderer.setRenderTarget(n)}reset(e){if(e===void 0){const n=this.renderer.getSize(new Oe);this._pixelRatio=this.renderer.getPixelRatio(),this._width=n.width,this._height=n.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,n){this._width=e,this._height=n;const i=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(i,r),this.renderTarget2.setSize(i,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(i,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Pb extends da{constructor(e,n,i=null,r=null,s=null){super(),this.scene=e,this.camera=n,this.overrideMaterial=i,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Ke}render(e,n,i){const r=e.autoClear;e.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor)),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=r}}const Lb={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ke(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Gs extends da{constructor(e,n,i,r){super(),this.strength=n!==void 0?n:1,this.radius=i,this.threshold=r,this.resolution=e!==void 0?new Oe(e.x,e.y):new Oe(256,256),this.clearColor=new Ke(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new jn(s,o,{type:xi}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){const h=new jn(s,o,{type:xi});h.texture.name="UnrealBloomPass.h"+d,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const p=new jn(s,o,{type:xi});p.texture.name="UnrealBloomPass.v"+d,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),s=Math.round(s/2),o=Math.round(o/2)}const a=Lb;this.highPassUniforms=tc.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new rn({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new Oe(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=n,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new B(1,1,1),new B(1,1,1),new B(1,1,1),new B(1,1,1),new B(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=Y0;this.copyUniforms=tc.clone(u.uniforms),this.blendMaterial=new rn({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:Bd,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Ke,this.oldClearAlpha=1,this.basic=new dh,this.fsQuad=new q0(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,n){let i=Math.round(e/2),r=Math.round(n/2);this.renderTargetBright.setSize(i,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(i,r),this.renderTargetsVertical[s].setSize(i,r),this.separableBlurMaterials[s].uniforms.invSize.value=new Oe(1/i,1/r),i=Math.round(i/2),r=Math.round(r/2)}render(e,n,i,r,s){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=Gs.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Gs.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(i),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=o}getSeperableBlurMaterial(e){const n=[];for(let i=0;i<e;i++)n.push(.39894*Math.exp(-.5*i*i/(e*e))/e);return new rn({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Oe(.5,.5)},direction:{value:new Oe(.5,.5)},gaussianCoefficients:{value:n}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(e){return new rn({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}Gs.BlurDirectionX=new Oe(1,0);Gs.BlurDirectionY=new Oe(0,1);const Db=({className:t,style:e,trailLength:n=50,inertia:i=.5,grainIntensity:r=.05,bloomStrength:s=.1,bloomRadius:o=1,bloomThreshold:a=.025,brightness:l=1,color:c="#B19EEF",mixBlendMode:u="screen",edgeIntensity:d=0,maxDevicePixelRatio:h=.5,targetPixels:p,fadeDelayMs:_,fadeDurationMs:y,zIndex:m=10})=>{const f=L.useRef(null),v=L.useRef(null),g=L.useRef(null),x=L.useRef(null),R=L.useRef(null),C=L.useRef(null),A=L.useRef([]),N=L.useRef(0),E=L.useRef(null),w=L.useRef(null),X=L.useRef(new Oe(.5,.5)),z=L.useRef(new Oe(0,0)),q=L.useRef(1),b=L.useRef(typeof performance<"u"?performance.now():Date.now()),U=L.useRef(!1),F=L.useRef(!1),Y=L.useMemo(()=>typeof window<"u"&&("ontouchstart"in window||navigator.maxTouchPoints>0),[]),D=p??(Y?9e5:13e5),k=_??(Y?500:1e3),W=y??(Y?1e3:1500),J=`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,ee=`
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
  `,K=L.useMemo(()=>({uniforms:{tDiffuse:{value:null},iTime:{value:0},intensity:{value:r}},vertexShader:`
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
      `}),[r]),Q=L.useMemo(()=>new qd({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
        `}),[]);function ce(se){const ve=se.getBoundingClientRect(),be=600,_e=Math.min(Math.max(1,ve.width),Math.max(1,ve.height));return Math.max(.5,Math.min(2,_e/be))}L.useEffect(()=>{const se=f.current,ve=se==null?void 0:se.parentElement;if(!se||!ve)return;const be=ve.style.position;(!be||be==="static")&&(ve.style.position="relative");const _e=new K0({antialias:!Y,alpha:!0,depth:!1,stencil:!1,powerPreference:Y?"low-power":"high-performance",premultipliedAlpha:!1,preserveDrawingBuffer:!1});_e.setClearColor(0,0),v.current=_e,_e.domElement.style.pointerEvents="none",u?_e.domElement.style.mixBlendMode=String(u):_e.domElement.style.removeProperty("mix-blend-mode"),se.appendChild(_e.domElement);const je=new Mb,H=new fh(-1,1,1,-1,0,1),wt=new Rc(2,2),we=Math.max(1,Math.floor(n));A.current=Array.from({length:we},()=>new Oe(.5,.5)),N.current=0;const De=new Ke(c),ye=new rn({defines:{MAX_TRAIL_LENGTH:we},uniforms:{iTime:{value:0},iResolution:{value:new B(1,1,1)},iMouse:{value:new Oe(.5,.5)},iPrevMouse:{value:A.current.map(Z=>Z.clone())},iOpacity:{value:1},iScale:{value:1},iBaseColor:{value:new B(De.r,De.g,De.b)},iBrightness:{value:l},iEdgeIntensity:{value:d}},vertexShader:J,fragmentShader:ee,transparent:!0,depthTest:!1,depthWrite:!1});x.current=ye;const it=new ei(wt,ye);je.add(it);const Ae=new bb(_e);g.current=Ae;const T=new Pb(je,H);Ae.addPass(T);const S=new Gs(new Oe(1,1),s,o,a);R.current=S,Ae.addPass(S);const G=new qd(K);C.current=G,Ae.addPass(G),Ae.addPass(Q);const ne=()=>{var Ue;const Z=se.getBoundingClientRect(),ze=Math.max(1,Math.floor(Z.width)),Me=Math.max(1,Math.floor(Z.height)),Te=Math.min(typeof window<"u"&&window.devicePixelRatio||1,h),xe=ze*Me*Te*Te,pe=xe<=D?1:Math.max(.5,Math.min(1,Math.sqrt(D/Math.max(1,xe)))),Pe=Te*pe;_e.setPixelRatio(Pe),_e.setSize(ze,Me,!1),(Ue=Ae.setPixelRatio)==null||Ue.call(Ae,Pe),Ae.setSize(ze,Me);const $e=Math.max(1,Math.floor(ze*Pe)),Ye=Math.max(1,Math.floor(Me*Pe));ye.uniforms.iResolution.value.set($e,Ye,1),ye.uniforms.iScale.value=ce(se),S.setSize($e,Ye)};ne();const te=new ResizeObserver(ne);w.current=te,te.observe(ve),te.observe(se);const re=typeof performance<"u"?performance.now():Date.now(),Se=()=>{var Pe,$e;const Z=performance.now(),ze=(Z-re)/1e3,Me=x.current,Te=g.current;if(U.current)z.current.set(X.current.x-Me.uniforms.iMouse.value.x,X.current.y-Me.uniforms.iMouse.value.y),Me.uniforms.iMouse.value.copy(X.current),q.current=1;else{z.current.multiplyScalar(i),z.current.lengthSq()>1e-6&&Me.uniforms.iMouse.value.add(z.current);const Ye=Z-b.current;if(Ye>k){const Ue=Math.min(1,(Ye-k)/W);q.current=Math.max(0,1-Ue)}}const xe=A.current.length;N.current=(N.current+1)%xe,A.current[N.current].copy(Me.uniforms.iMouse.value);const pe=Me.uniforms.iPrevMouse.value;for(let Ye=0;Ye<xe;Ye++){const Ue=(N.current-Ye+xe)%xe;pe[Ye].copy(A.current[Ue])}if(Me.uniforms.iOpacity.value=q.current,Me.uniforms.iTime.value=ze,($e=(Pe=C.current)==null?void 0:Pe.uniforms)!=null&&$e.iTime&&(C.current.uniforms.iTime.value=ze),Te.render(),!U.current&&q.current<=.001){F.current=!1,E.current=null;return}E.current=requestAnimationFrame(Se)},le=()=>{F.current||(F.current=!0,E.current=requestAnimationFrame(Se))},me=Z=>{const ze=ve.getBoundingClientRect(),Me=Um.clamp((Z.clientX-ze.left)/Math.max(1,ze.width),0,1),Te=Um.clamp(1-(Z.clientY-ze.top)/Math.max(1,ze.height),0,1);X.current.set(Me,Te),U.current=!0,b.current=performance.now(),le()},Ce=()=>{U.current=!0,le()},ke=()=>{U.current=!1,b.current=performance.now(),le()};return ve.addEventListener("pointermove",me,{passive:!0}),ve.addEventListener("pointerenter",Ce,{passive:!0}),ve.addEventListener("pointerleave",ke,{passive:!0}),le(),()=>{var Z;E.current&&cancelAnimationFrame(E.current),F.current=!1,E.current=null,ve.removeEventListener("pointermove",me),ve.removeEventListener("pointerenter",Ce),ve.removeEventListener("pointerleave",ke),(Z=w.current)==null||Z.disconnect(),je.clear(),wt.dispose(),ye.dispose(),Ae.dispose(),_e.dispose(),_e.domElement&&_e.domElement.parentElement&&_e.domElement.parentElement.removeChild(_e.domElement),(!be||be==="static")&&(ve.style.position=be)}},[n,i,r,s,o,a,D,k,W,Y,c,l,u,d]),L.useEffect(()=>{if(x.current){const se=new Ke(c);x.current.uniforms.iBaseColor.value.set(se.r,se.g,se.b)}},[c]),L.useEffect(()=>{x.current&&(x.current.uniforms.iBrightness.value=l)},[l]),L.useEffect(()=>{x.current&&(x.current.uniforms.iEdgeIntensity.value=d)},[d]),L.useEffect(()=>{var se,ve;(ve=(se=C.current)==null?void 0:se.uniforms)!=null&&ve.intensity&&(C.current.uniforms.intensity.value=r)},[r]),L.useEffect(()=>{var ve;const se=(ve=v.current)==null?void 0:ve.domElement;se&&(u?se.style.mixBlendMode=String(u):se.style.removeProperty("mix-blend-mode"))},[u]);const ge=L.useMemo(()=>({zIndex:m,...e}),[m,e]);return I.jsx("div",{ref:f,className:`ghost-cursor ${t??""}`,style:ge})},Nb=()=>{const t=Ec(),[e,n]=L.useState(!0),i=()=>{n(!1),setTimeout(()=>{t("/dashboard")},300)};return I.jsxs("div",{className:`ghost-cursor-page ${e?"ghost-cursor-page--active":"ghost-cursor-page--inactive"}`,style:{height:"100vh",width:"100vw",position:"relative",backgroundColor:"rgb(6, 0, 16)",margin:0,padding:0,overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center"},children:[e&&I.jsx(Db,{style:{height:"100vh",width:"100vw"},color:"#B19EEF",brightness:1,edgeIntensity:0,trailLength:50,inertia:.5,grainIntensity:.05,bloomStrength:.1,bloomRadius:1,bloomThreshold:.025,fadeDelayMs:1e3,fadeDurationMs:1500}),I.jsxs("div",{className:"ghost-cursor-page__logo-container",onClick:i,children:[I.jsx("img",{src:"/dev-cracks-logo.jpg",alt:"Dev Cracks Logo",className:"ghost-cursor-page__logo"}),I.jsx("h1",{className:"ghost-cursor-page__title",children:"DEV CRACKS"})]})]})},nc=({className:t=""})=>{const e=Ec(),n=ar(),i=[{path:"/dashboard",label:"Dashboard"},{path:"/account",label:"Account"},{path:"/support",label:"Support"},{path:"/backoffice",label:"Backoffice",external:!0}],r=(o,a)=>{if(a.preventDefault(),o.external){const l=`${window.location.origin}/backoffice`;window.open(l,"_blank")}else e(o.path)},s=o=>n.pathname===o||n.pathname.startsWith(o+"/");return I.jsx("nav",{className:`pill-nav ${t}`,children:I.jsxs("div",{className:"pill-nav__container",children:[I.jsxs("div",{className:"pill-nav__logo",onClick:()=>e("/dashboard"),children:[I.jsx("img",{src:"/dev-cracks-logo.jpg",alt:"Dev Cracks Logo"}),I.jsx("span",{children:"DEV CRACKS"})]}),I.jsx("div",{className:"pill-nav__menu",children:i.map(o=>I.jsx("button",{className:`pill-nav__item ${s(o.path)?"pill-nav__item--active":""}`,onClick:a=>r(o,a),children:o.label},o.path))})]})})},Ub=()=>I.jsxs("div",{className:"dashboard-page",children:[I.jsx(nc,{}),I.jsx("main",{className:"dashboard-page__content",children:I.jsxs("div",{className:"dashboard-page__container",children:[I.jsx("h1",{className:"dashboard-page__title",children:"Dashboard"}),I.jsx("p",{className:"dashboard-page__subtitle",children:"Bienvenido al portal del cliente"}),I.jsxs("div",{className:"dashboard-page__grid",children:[I.jsxs("div",{className:"dashboard-page__card",children:[I.jsx("h2",{children:"Resumen"}),I.jsx("p",{children:"Información general de tu cuenta"})]}),I.jsxs("div",{className:"dashboard-page__card",children:[I.jsx("h2",{children:"Actividad Reciente"}),I.jsx("p",{children:"Últimas acciones realizadas"})]}),I.jsxs("div",{className:"dashboard-page__card",children:[I.jsx("h2",{children:"Notificaciones"}),I.jsx("p",{children:"Mensajes y alertas importantes"})]})]})]})})]}),Ib=t=>t?{id:t.sub,sub:t.sub,email:t.email||"",name:t.name||t.nickname||null,picture:t.picture}:null,Ob="user_image_cache_",kb="user_image_cache_expiry_",Fb=7*24*60*60*1e3,zb=async t=>{try{const e=await fetch(t,{mode:"cors",credentials:"omit"});if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);const n=await e.blob();return new Promise((i,r)=>{const s=new FileReader;s.onloadend=()=>{const o=s.result;i(o)},s.onerror=()=>{r(new Error("Error al leer el blob"))},s.readAsDataURL(n)})}catch{return new Promise((n,i)=>{const r=new Image;r.onload=()=>{const s=document.createElement("canvas");s.width=r.width,s.height=r.height;const o=s.getContext("2d");if(!o){i(new Error("No se pudo obtener el contexto del canvas"));return}try{o.drawImage(r,0,0);const a=s.toDataURL("image/jpeg",.8);n(a)}catch(a){i(a)}},r.onerror=()=>{i(new Error("No se pudo cargar la imagen"))},r.src=t})}},ph=t=>`${Ob}${t}`,mh=t=>`${kb}${t}`,Z0=t=>{const e=mh(t),n=localStorage.getItem(e);if(!n)return!0;const i=parseInt(n,10);return Date.now()>i},J0=async(t,e)=>{try{if(!Z0(t)){const o=Q0(t);if(o)return o}const n=await zb(e),i=ph(t),r=mh(t),s=Date.now()+Fb;return localStorage.setItem(i,n),localStorage.setItem(r,s.toString()),n}catch(n){return console.warn("No se pudo cachear la imagen del usuario:",n),null}},Q0=t=>{if(Z0(t))return ey(t),null;const e=ph(t);return localStorage.getItem(e)},ey=t=>{const e=ph(t),n=mh(t);localStorage.removeItem(e),localStorage.removeItem(n)},Bb=t=>t.replace(/\/+$/,""),Hb=(()=>{if(typeof window<"u"){const t=Bb(window.location.origin.toLowerCase()),e={"https://www.dev-cracks.com":"https://dev-cracks.onrender.com","https://dev-cracks.com":"https://dev-cracks.onrender.com","https://dev-cracks.onrender.com":"https://dev-cracks.onrender.com"}[t];if(e)return e}return"http://localhost:5020"})(),Gb="fractalize-services-api",yl={domain:"dev-cracks.eu.auth0.com",clientId:"puVivGd9KVmrSyVu8hCytE1juOlFLdht",authorizationParams:{redirect_uri:typeof window<"u"?window.location.origin:"http://localhost:5173",audience:Gb,scope:"openid profile email"}},Vb="connect@devcracks.com",Wb="Equipo Dev Cracks",gh={apiBaseUrl:Hb,contactRecipient:Vb,contactRecipientName:Wb},vh=()=>{const{user:t,isLoading:e,isAuthenticated:n,loginWithRedirect:i,logout:r,getAccessTokenSilently:s}=AE(),o=Ib(t);L.useEffect(()=>{if(o&&o.picture&&o.id){const d=setTimeout(()=>{J0(o.id,o.picture).catch(h=>{})},500);return()=>clearTimeout(d)}},[o==null?void 0:o.id,o==null?void 0:o.picture]);const a=L.useCallback(d=>{i({appState:{returnTo:d||window.location.pathname}})},[i]),l=L.useCallback(async()=>{o!=null&&o.id&&ey(o.id),await r({logoutParams:{returnTo:window.location.origin}})},[r,o==null?void 0:o.id]),c=L.useCallback(async()=>{},[]),u=L.useCallback(async()=>{if(n)try{return await s({authorizationParams:{audience:yl.authorizationParams.audience}})}catch(d){console.error("[useAuth] Error getting access token:",d);return}},[n,s]);return{user:o,isLoading:e,isAuthenticated:n,getAccessToken:u,login:a,logout:l,refreshUser:c}},jb={small:"32px",medium:"48px",large:"80px"},Xb={small:"0.9rem",medium:"1.2rem",large:"2rem"},Sg=({picture:t,name:e,email:n,userId:i,size:r="medium",className:s=""})=>{var g;const[o,a]=L.useState(!1),[l,c]=L.useState(!0),[u,d]=L.useState(null),h=L.useRef(null),p=e||n,_=((g=p[0])==null?void 0:g.toUpperCase())||"?",y=jb[r],m=Xb[r];L.useEffect(()=>{if(a(!1),c(!0),i&&t){const x=Q0(i);x?(d(x),h.current=t):(d(t),h.current=t,J0(i,t).then(R=>{R&&h.current===t&&d(R)}).catch(()=>{}))}else t?(d(t),h.current=t):(d(null),c(!1),h.current=null)},[i,t]);const f=()=>{a(!0),c(!1)},v=()=>{c(!1)};return!u||o?I.jsx("div",{className:`avatar avatar--fallback ${s}`,style:{width:y,height:y,fontSize:m},children:I.jsx("span",{children:_})}):I.jsxs("div",{className:`avatar ${s}`,style:{width:y,height:y},children:[l&&I.jsx("div",{className:"avatar__loading",children:I.jsx("span",{children:_})}),I.jsx("img",{src:u,alt:p,onError:f,onLoad:v,style:{display:l?"none":"block"},loading:"lazy",crossOrigin:u!=null&&u.startsWith("data:")||u!=null&&u.includes("googleusercontent.com")?void 0:"anonymous"})]})},_h=async t=>{const e={"Content-Type":"application/json"};return t&&(e.Authorization=`Bearer ${t}`),e},Eg=async t=>{try{const e=await _h(t),n=await fetch(`${gh.apiBaseUrl}/users/me`,{method:"GET",credentials:"include",headers:e});if(!n.ok){if(n.status===401)throw new Error("No autorizado");if(n.status===404)return null;throw new Error(`Error al obtener datos: ${n.statusText}`)}const i=await n.json();return{contactEmail:i.contactEmail||null,phone:i.phone||null}}catch(e){throw console.error("Error al obtener datos de contacto:",e),e}},$b=async(t,e)=>{try{const n=await _h(e),i=await fetch(`${gh.apiBaseUrl}/users/me/contact-data`,{method:"PUT",credentials:"include",headers:n,body:JSON.stringify({contactEmail:t.contactEmail||null,phone:t.phone||null})});if(!i.ok){if(i.status===401)throw new Error("No autorizado");if(i.status===404)throw new Error("Usuario no encontrado");const s=await i.json().catch(()=>({message:i.statusText}));throw new Error(s.message||`Error al actualizar datos: ${i.statusText}`)}const r=await i.json();return{contactEmail:r.contactEmail||null,phone:r.phone||null}}catch(n){throw console.error("Error al actualizar datos de contacto:",n),n}},Kb=async t=>{try{const e=await _h(t),n=await fetch(`${gh.apiBaseUrl}/users/me/change-history`,{method:"GET",credentials:"include",headers:e});if(!n.ok)throw n.status===401?new Error("No autorizado"):new Error(`Error al obtener historial: ${n.statusText}`);return(await n.json()).map(r=>({id:r.id,userId:r.userId,field:r.field,oldValue:r.oldValue||null,newValue:r.newValue||null,changedAt:r.changedAt}))}catch(e){throw console.error("Error al obtener historial:",e),e}},Yb=({userId:t,initialEmail:e,onUpdate:n})=>{const{getAccessToken:i}=vh(),[r,s]=L.useState(""),[o,a]=L.useState(""),[l,c]=L.useState(!1),[u,d]=L.useState(!1),[h,p]=L.useState(null);L.useEffect(()=>{(async()=>{try{const g=await i(),x=await Eg(g);x?(s(x.contactEmail||e),a(x.phone||"")):(s(e),a(""))}catch(g){console.error("Error al cargar datos:",g),s(e),a("")}})()},[t,e,i]);const _=v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),y=v=>v?/^[\d\s\-\+\(\)]+$/.test(v)&&v.replace(/\D/g,"").length>=8:!0,m=async()=>{if(p(null),!r.trim()){p("El correo electrónico es requerido");return}if(!_(r)){p("El correo electrónico no es válido");return}if(o&&!y(o)){p("El número de teléfono no es válido");return}d(!0);try{const v=await i(),g=await $b({contactEmail:r.trim(),phone:o.trim()},v);s(g.contactEmail||e),a(g.phone||""),n(g),c(!1),p(null)}catch(v){const g=v instanceof Error?v.message:"Error al guardar los datos. Por favor, intenta de nuevo.";p(g),console.error("Error al guardar datos:",v)}finally{d(!1)}},f=async()=>{try{const v=await i(),g=await Eg(v);g?(s(g.contactEmail||e),a(g.phone||"")):(s(e),a(""))}catch{s(e),a("")}c(!1),p(null)};return l?I.jsxs("div",{className:"user-data-editor",children:[h&&I.jsx("div",{className:"user-data-editor__error",children:h}),I.jsxs("div",{className:"user-data-editor__fields",children:[I.jsxs("div",{className:"user-data-editor__field",children:[I.jsx("label",{className:"user-data-editor__label",htmlFor:"email",children:"Correo Electrónico *"}),I.jsx("input",{id:"email",type:"email",className:"user-data-editor__input",value:r,onChange:v=>s(v.target.value),placeholder:"correo@ejemplo.com",disabled:u})]}),I.jsxs("div",{className:"user-data-editor__field",children:[I.jsx("label",{className:"user-data-editor__label",htmlFor:"phone",children:"Número de Móvil"}),I.jsx("input",{id:"phone",type:"tel",className:"user-data-editor__input",value:o,onChange:v=>a(v.target.value),placeholder:"+34 600 000 000",disabled:u})]})]}),I.jsxs("div",{className:"user-data-editor__actions",children:[I.jsx("button",{className:"user-data-editor__btn user-data-editor__btn--cancel",onClick:f,disabled:u,children:"Cancelar"}),I.jsx("button",{className:"user-data-editor__btn user-data-editor__btn--save",onClick:m,disabled:u,children:u?"Guardando...":"Guardar Cambios"})]})]}):I.jsxs("div",{className:"user-data-editor",children:[I.jsxs("div",{className:"user-data-editor__fields",children:[I.jsxs("div",{className:"user-data-editor__field",children:[I.jsx("label",{className:"user-data-editor__label",children:"Correo Electrónico"}),I.jsx("div",{className:"user-data-editor__value",children:r||"No especificado"})]}),I.jsxs("div",{className:"user-data-editor__field",children:[I.jsx("label",{className:"user-data-editor__label",children:"Número de Móvil"}),I.jsx("div",{className:"user-data-editor__value",children:o||"No especificado"})]})]}),I.jsx("button",{className:"user-data-editor__edit-btn",onClick:()=>c(!0),children:"Editar Datos"})]})},Mg=5,qb=({userId:t,refreshTrigger:e})=>{const{getAccessToken:n}=vh(),[i,r]=L.useState([]),[s,o]=L.useState(!0),[a,l]=L.useState(null),c=L.useRef(0);L.useEffect(()=>{let h=!0;return(async()=>{if(!(c.current>=Mg))try{const _=await n(),y=await Kb(_);h&&(r(y),l(null),c.current=0)}catch(_){console.error("Error al cargar historial:",_),h&&(c.current+=1,c.current>=Mg?l("No se pudo cargar el historial de cambios después de varios intentos. Por favor, recarga la página."):r([]))}finally{h&&o(!1)}})(),()=>{h=!1}},[t,n,e]);const u=h=>{const p=new Date(h);return new Intl.DateTimeFormat("es-ES",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"}).format(p)},d=h=>h==="contact_email"?"Correo Electrónico":h==="phone"?"Número de Móvil":h;return s?I.jsx("div",{className:"change-history",children:I.jsx("p",{children:"Cargando historial..."})}):a?I.jsx("div",{className:"change-history",children:I.jsx("div",{className:"change-history__error",children:I.jsx("p",{children:a})})}):i.length===0?I.jsx("div",{className:"change-history",children:I.jsx("div",{className:"change-history__empty",children:I.jsx("p",{children:"No hay cambios registrados aún."})})}):I.jsx("div",{className:"change-history",children:I.jsx("div",{className:"change-history__list",children:i.map(h=>I.jsxs("div",{className:"change-history__entry",children:[I.jsxs("div",{className:"change-history__entry-header",children:[I.jsx("span",{className:"change-history__field-badge",children:d(h.field)}),I.jsx("span",{className:"change-history__date",children:u(h.changedAt)})]}),I.jsxs("div",{className:"change-history__entry-content",children:[I.jsxs("div",{className:"change-history__change",children:[I.jsx("span",{className:"change-history__change-label",children:"Valor anterior:"}),I.jsx("span",{className:"change-history__change-value change-history__change-value--old",children:h.oldValue||"(vacío)"})]}),I.jsx("div",{className:"change-history__arrow",children:"→"}),I.jsxs("div",{className:"change-history__change",children:[I.jsx("span",{className:"change-history__change-label",children:"Nuevo valor:"}),I.jsx("span",{className:"change-history__change-value change-history__change-value--new",children:h.newValue||"(vacío)"})]})]})]},h.id))})})},Zb=()=>{const t=Ec(),{user:e,isAuthenticated:n,isLoading:i}=vh(),[r,s]=L.useState(0);return L.useEffect(()=>{!i&&!n&&t("/")},[n,i,t]),i?I.jsxs("div",{className:"account-page",children:[I.jsx(nc,{}),I.jsx("main",{className:"account-page__content-wrapper",children:I.jsx("div",{className:"account-page__container",children:I.jsx("p",{style:{textAlign:"center",color:"#fff"},children:"Cargando..."})})})]}):!n||!e?null:I.jsxs("div",{className:"account-page",children:[I.jsx(nc,{}),I.jsx("main",{className:"account-page__content-wrapper",children:I.jsxs("div",{className:"account-page__container",children:[I.jsxs("div",{className:"account-page__header",children:[I.jsx("h1",{children:"Mi Cuenta"}),I.jsx("p",{children:"Información de tu perfil"})]}),I.jsxs("div",{className:"account-page__content",children:[I.jsx("div",{className:"account-page__card",children:I.jsxs("div",{className:"account-page__profile",children:[I.jsx("div",{className:"account-page__avatar",children:I.jsx(Sg,{picture:e.picture,name:e.name,email:e.email,userId:e.id,size:"large"})}),I.jsxs("div",{className:"account-page__profile-info",children:[I.jsx("h2",{className:"account-page__profile-name",children:e.name||"Usuario"}),I.jsx("p",{className:"account-page__profile-email",children:e.email})]})]})}),I.jsxs("div",{className:"account-page__card",children:[I.jsx("h3",{className:"account-page__card-title",children:"Información Personal"}),I.jsxs("div",{className:"account-page__info-grid",children:[I.jsxs("div",{className:"account-page__info-item",children:[I.jsx("label",{className:"account-page__info-label",children:"Nombre"}),I.jsx("div",{className:"account-page__info-value",children:e.name||"No especificado"})]}),I.jsxs("div",{className:"account-page__info-item",children:[I.jsx("label",{className:"account-page__info-label",children:"Email"}),I.jsx("div",{className:"account-page__info-value",children:e.email})]}),I.jsxs("div",{className:"account-page__info-item",children:[I.jsx("label",{className:"account-page__info-label",children:"ID de Usuario"}),I.jsx("div",{className:"account-page__info-value account-page__info-value--mono",children:e.id})]})]}),I.jsx("div",{className:"account-page__section-divider"}),I.jsx("div",{className:"account-page__section-subtitle",children:"Datos de Contacto"}),I.jsx(Yb,{userId:e.id,initialEmail:e.email,onUpdate:()=>{s(o=>o+1)}})]}),I.jsxs("div",{className:"account-page__card",children:[I.jsx("h3",{className:"account-page__card-title",children:"Información de Autenticación"}),I.jsxs("div",{className:"account-page__info-grid",children:[I.jsxs("div",{className:"account-page__info-item",children:[I.jsx("label",{className:"account-page__info-label",children:"Estado"}),I.jsx("div",{className:"account-page__info-value",children:I.jsx("span",{className:"account-page__status account-page__status--active",children:"Autenticado"})})]}),I.jsxs("div",{className:"account-page__info-item",children:[I.jsx("label",{className:"account-page__info-label",children:"Proveedor"}),I.jsx("div",{className:"account-page__info-value",children:"Auth0"})]}),I.jsxs("div",{className:"account-page__info-item",children:[I.jsx("label",{className:"account-page__info-label",children:"Auth0 Sub"}),I.jsx("div",{className:"account-page__info-value account-page__info-value--mono",children:e.sub})]})]}),I.jsx("div",{className:"account-page__section-divider"}),I.jsx("div",{className:"account-page__section-subtitle",children:"Foto de Perfil"}),I.jsxs("div",{className:"account-page__picture-section",children:[I.jsx(Sg,{picture:e.picture,name:e.name,email:e.email,userId:e.id,size:"large",className:"account-page__picture-avatar"}),I.jsx("p",{className:"account-page__picture-note",children:e.picture?"Foto de perfil proporcionada por Auth0":"No hay foto de perfil disponible"})]})]}),I.jsxs("div",{className:"account-page__card",children:[I.jsx("h3",{className:"account-page__card-title",children:"Historial de Cambios"}),I.jsx(qb,{userId:e.id,refreshTrigger:r})]})]})]})})]})},Jb=()=>I.jsxs("div",{className:"support-page",children:[I.jsx(nc,{}),I.jsx("main",{className:"support-page__content",children:I.jsxs("div",{className:"support-page__container",children:[I.jsx("h1",{className:"support-page__title",children:"Support"}),I.jsx("p",{className:"support-page__subtitle",children:"Centro de ayuda y soporte"}),I.jsxs("div",{className:"support-page__grid",children:[I.jsxs("div",{className:"support-page__card",children:[I.jsx("h2",{children:"Documentación"}),I.jsx("p",{children:"Guías y documentación técnica"})]}),I.jsxs("div",{className:"support-page__card",children:[I.jsx("h2",{children:"Contacto"}),I.jsx("p",{children:"Ponte en contacto con nuestro equipo"})]}),I.jsxs("div",{className:"support-page__card",children:[I.jsx("h2",{children:"FAQ"}),I.jsx("p",{children:"Preguntas frecuentes"})]})]})]})})]}),Qb="/portal",eP=()=>I.jsx($M,{basename:Qb,children:I.jsxs(MM,{children:[I.jsx(_o,{path:"/",element:I.jsx(Nb,{})}),I.jsx(_o,{path:"/dashboard",element:I.jsx(Ub,{})}),I.jsx(_o,{path:"/account",element:I.jsx(Zb,{})}),I.jsx(_o,{path:"/support",element:I.jsx(Jb,{})})]})});Gu.createRoot(document.getElementById("root")).render(I.jsx(Ug.StrictMode,{children:I.jsx(TE,{domain:yl.domain,clientId:yl.clientId,authorizationParams:yl.authorizationParams,cacheLocation:"localstorage",useRefreshTokens:!0,children:I.jsx(eP,{})})}));
