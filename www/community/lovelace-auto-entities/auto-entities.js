!function(t){var e={};function i(s){if(e[s])return e[s].exports;var r=e[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(s,r,function(e){return t[e]}.bind(null,r));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e);const s=customElements.get("home-assistant-main")?Object.getPrototypeOf(customElements.get("home-assistant-main")):Object.getPrototypeOf(customElements.get("hui-view")),r=s.prototype.html;s.prototype.css;function n(){return document.querySelector("home-assistant").hass}const a=n().callWS({type:"config/area_registry/list"}),o=n().callWS({type:"config/device_registry/list"}),l=n().callWS({type:"config/entity_registry/list"});async function c(){return window.cardToolsData=window.cardToolsData||{areas:await a,devices:await o,entities:await l},window.cardToolsData}function u(t){const e=window.cardToolsData;let i=[];if(!t)return i;for(const s of e.devices)s.area_id===t.area_id&&i.push(s);return i}function f(t){const e=window.cardToolsData;let i=[];if(!t)return i;for(const s of e.entities)s.device_id===t.id&&i.push(s.entity_id);return i}function d(t,e){if("string"==typeof e&&"string"==typeof t&&(t.startsWith("/")&&t.endsWith("/")||-1!==t.indexOf("*"))){return t.startsWith("/")||(t=`/^${t=t.replace(/\./g,".").replace(/\*/g,".*")}$/`),new RegExp(t.slice(1,-1)).test(e)}if("string"==typeof t){if(t.startsWith("<="))return parseFloat(e)<=parseFloat(t.substr(2));if(t.startsWith(">="))return parseFloat(e)>=parseFloat(t.substr(2));if(t.startsWith("<"))return parseFloat(e)<parseFloat(t.substr(1));if(t.startsWith(">"))return parseFloat(e)>parseFloat(t.substr(1));if(t.startsWith("!"))return parseFloat(e)!=parseFloat(t.substr(1));if(t.startsWith("="))return parseFloat(e)==parseFloat(t.substr(1))}return t===e}function h(t,e){return function(i){const s="string"==typeof i?t.states[i]:t.states[i.entity];if(!i)return!1;for(const[r,n]of Object.entries(e))switch(r.split(" ")[0]){case"options":case"sort":break;case"domain":if(!d(n,s.entity_id.split(".")[0]))return!1;break;case"entity_id":if(!d(n,s.entity_id))return!1;break;case"state":if(!d(n,s.state))return!1;break;case"name":if(!s.attributes.friendly_name||!d(n,s.attributes.friendly_name))return!1;break;case"group":if(!(n.startsWith("group.")&&t.states[n]&&t.states[n].attributes.entity_id&&t.states[n].attributes.entity_id.includes(s.entity_id)))return!1;break;case"attributes":for(const[t,e]of Object.entries(n)){let i=t.trim(),r=s.attributes;for(;i&&r;){let t;[t,i]=i.split(":"),r=r[t]}if(void 0===r||void 0!==e&&!d(e,r))return!1}break;case"not":if(h(t,n)(i))return!1;break;case"device":if(!window.cardToolsData||!window.cardToolsData.devices)return!1;let e=!1;for(const t of window.cardToolsData.devices)d(n,t.name)&&f(t).includes(s.entity_id)&&(e=!0);if(!e)return!1;break;case"area":if(!window.cardToolsData||!window.cardToolsData.areas)return!1;let r=!1;for(const t of window.cardToolsData.areas)d(n,t.name)&&u(t).flatMap(f).includes(s.entity_id)&&(r=!0);if(!r)return!1;break;case"last_changed":if(!d(n,((new Date).getTime()-new Date(s.last_changed).getTime())/6e4))return!1;break;case"last_updated":if(!d(n,((new Date).getTime()-new Date(s.last_updated).getTime())/6e4))return!1;break;default:return!1}return!0}}function g(t,e){return"string"==typeof e&&(e={method:e}),function(i,s){const r="string"==typeof i?t.states[i]:t.states[i.entity],n="string"==typeof s?t.states[s]:t.states[s.entity];if(void 0===r||void 0===n)return 0;const[a,o]=e.reverse?[-1,1]:[1,-1];function l(t,i){return e.ignore_case&&t.toLowerCase&&(t=t.toLowerCase()),e.ignore_case&&i.toLowerCase&&(i=i.toLowerCase()),e.numeric&&(isNaN(parseFloat(t))&&isNaN(parseFloat(i))||(t=isNaN(parseFloat(t))?void 0:parseFloat(t),i=isNaN(parseFloat(i))?void 0:parseFloat(i))),void 0===t&&void 0===i?0:void 0===t?a:void 0===i?o:t<i?o:t>i?a:0}switch(e.method){case"domain":return l(r.entity_id.split(".")[0],n.entity_id.split(".")[0]);case"entity_id":return l(r.entity_id,n.entity_id);case"friendly_name":case"name":return l(r.attributes.friendly_name||r.entity_id.split(".")[1],n.attributes.friendly_name||n.entity_id.split(".")[1]);case"state":return l(r.state,n.state);case"attribute":let t=r.attributes,i=n.attributes,s=e.attribute;for(;s;){let e;if([e,s]=s.split(":"),t=t[e],i=i[e],void 0===t&&void 0===i)return 0;if(void 0===t)return a;if(void 0===i)return o}return l(t,i);case"last_changed":case"last_updated":return e.numeric=!0,l(new Date(n.last_changed).getTime(),new Date(r.last_changed).getTime());case"last_triggered":return null==r.attributes.last_triggered||null==n.attributes.last_triggered?0:(e.numeric=!0,l(new Date(n.attributes.last_triggered).getTime(),new Date(r.attributes.last_triggered).getTime()));default:return 0}}}function p(t,e,i=null){if((t=new Event(t,{bubbles:!0,cancelable:!1,composed:!0})).detail=e||{},i)i.dispatchEvent(t);else{var s=document.querySelector("home-assistant");(s=(s=(s=(s=(s=(s=(s=(s=(s=(s=(s=s&&s.shadowRoot)&&s.querySelector("home-assistant-main"))&&s.shadowRoot)&&s.querySelector("app-drawer-layout partial-panel-resolver"))&&s.shadowRoot||s)&&s.querySelector("ha-panel-lovelace"))&&s.shadowRoot)&&s.querySelector("hui-root"))&&s.shadowRoot)&&s.querySelector("ha-app-layout #view"))&&s.firstElementChild)&&s.dispatchEvent(t)}}c();function y(t,e){const i=document.createElement("hui-error-card");return i.setConfig({type:"error",error:t,origConfig:e}),i}function m(t,e){if(!e||"object"!=typeof e||!e.type)return y(`No ${t} type configured`,e);let i=e.type;if(i=i.startsWith("custom:")?i.substr("custom:".length):`hui-${i}-${t}`,customElements.get(i))return function(t,e){const i=document.createElement(t);try{i.setConfig(e)}catch(t){return y(t,e)}return i}(i,e);const s=y(`Custom element doesn't exist: ${i}.`,e);s.style.display="None";const r=setTimeout(()=>{s.style.display=""},2e3);return customElements.whenDefined(i).then(()=>{clearTimeout(r),p("ll-rebuild",{},s)}),s}let _=function(){if(window.fully&&"function"==typeof fully.getDeviceId)return fully.getDeviceId();if(!localStorage["lovelace-player-device-id"]){const t=()=>Math.floor(1e5*(1+Math.random())).toString(16).substring(1);localStorage["lovelace-player-device-id"]=`${t()}${t()}-${t()}${t()}`}return localStorage["lovelace-player-device-id"]}();customElements.define("auto-entities",class extends s{static get properties(){return{hass:{}}}setConfig(t){if(!t||!t.card)throw new Error("Invalid configuration");this._config?(this._config=t,this.hass=this.hass):(this._config=t,this.hass=n(),this._getEntities(),this.cardConfig={entities:this.entities,...t.card},this.card=function(t){return m("card",t)}(this.cardConfig)),t.filter&&t.filter.template&&(this.template="",(String(t.filter.template).includes("{%")||String(t.filter.template).includes("{{"))&&function(t,e,i){t||(t=n().connection);let s={user:n().user.name,browser:_,hash:location.hash.substr(1)||" ",...i.variables},r=i.template,a=i.entity_ids;t.subscribeMessage(t=>e(t.result),{type:"render_template",template:r,variables:s,entity_ids:a})}(null,t=>{this.template=t,this._getEntities()},{template:t.filter.template,variables:{config:t},entity_ids:t.filter.entity_ids})),c().then(()=>this._getEntities())}_getEntities(){const t=t=>t?"string"==typeof t?{entity:t.trim()}:t:null;let e=[];if(this._config.entities&&(e=e.concat(this._config.entities.map(t))),!this.hass||!this._config.filter)return e;if(this.template&&(e=e.concat(this.template.split(/[\s,]+/).map(t))),e=e.filter(Boolean),this._config.filter.include){const i=Object.keys(this.hass.states).map(t);for(const t of this._config.filter.include){if(void 0!==t.type){e.push(t);continue}let s=i.filter(h(this.hass,t)).map(e=>JSON.parse(JSON.stringify(new Object({...e,...t.options})).replace(/this.entity_id/g,e.entity)));void 0!==t.sort&&(s=s.sort(g(this.hass,t.sort))),e=e.concat(s)}}if(this._config.filter.exclude)for(const t of this._config.filter.exclude)e=e.filter(e=>"string"!=typeof e&&void 0===e.entity||!h(this.hass,t)(e));if(this._config.sort&&(e=e.sort(g(this.hass,this._config.sort)),this._config.sort.count)){const t=this._config.sort.first||0;e=e.slice(t,t+this._config.sort.count)}if(this._config.unique){function i(t,e){return typeof t==typeof e&&("object"!=typeof t?t===e:!Object.keys(t).some(t=>!Object.keys(e).includes(t))&&Object.keys(t).every(s=>i(t[s],e[s])))}let t=[];for(const s of e)t.some(t=>i(t,s))||t.push(s);e=t}this.entities=e}set entities(t){(function(t,e){if(t===e)return!0;if(null==t||null==e)return!1;if(t.length!=e.length)return!1;for(var i=0;i<t.length;i++)if(JSON.stringify(t[i])!==JSON.stringify(e[i]))return!1;return!0})(t,this._entities)||(this._entities=t,this.cardConfig={...this.cardConfig,entities:this._entities},0===t.length&&!1===this._config.show_empty?(this.style.display="none",this.style.margin="0"):(this.style.display=null,this.style.margin=null))}get entities(){return this._entities}set cardConfig(t){this._cardConfig=t,this.card&&this.card.setConfig(t)}get cardConfig(){return this._cardConfig}updated(t){t.has("hass")&&this.hass&&(this.card.hass=this.hass,setTimeout(()=>this._getEntities(),0))}createRenderRoot(){return this}render(){return r`
    ${this.card}`}getCardSize(){let t=0;return this.card&&this.card.getCardSize&&(t=this.card.getCardSize()),1===t&&this.entities.length&&(t=this.entities.length),0===t&&this._config.filter&&this._config.filter.include&&(t=Object.keys(this._config.filter.include).length),t||1}}),p("ll-rebuild",{})}]);