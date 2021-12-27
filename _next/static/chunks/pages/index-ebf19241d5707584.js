(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8e3:function(e,t,n){"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),t.AmpStateContext=void 0;var o=((r=n(7294))&&r.__esModule?r:{default:r}).default.createContext({});t.AmpStateContext=o},5646:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isInAmpMode=i,t.useAmp=function(){return i(o.default.useContext(a.AmpStateContext))};var r,o=(r=n(7294))&&r.__esModule?r:{default:r},a=n(8e3);function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=void 0!==t&&t,r=e.hybrid,o=void 0!==r&&r,a=e.hasQuery,i=void 0!==a&&a;return n||o&&i}},2717:function(e,t,n){"use strict";var r=n(1682);function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}Object.defineProperty(t,"__esModule",{value:!0}),t.defaultHead=d,t.default=void 0;var a,i=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};r.get||r.set?Object.defineProperty(t,n,r):t[n]=e[n]}return t.default=e,t}(n(7294)),c=(a=n(1585))&&a.__esModule?a:{default:a},s=n(8e3),u=n(5850),p=n(5646);function d(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[i.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(i.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function f(e,t){return"string"===typeof t||"number"===typeof t?e:t.type===i.default.Fragment?e.concat(i.default.Children.toArray(t.props.children).reduce((function(e,t){return"string"===typeof t||"number"===typeof t?e:e.concat(t)}),[])):e.concat(t)}var l=["name","httpEquiv","charSet","itemProp"];function h(e,t){return e.reduce((function(e,t){var n=i.default.Children.toArray(t.props.children);return e.concat(n)}),[]).reduce(f,[]).reverse().concat(d(t.inAmpMode)).filter(function(){var e=new Set,t=new Set,n=new Set,r={};return function(o){var a=!0,i=!1;if(o.key&&"number"!==typeof o.key&&o.key.indexOf("$")>0){i=!0;var c=o.key.slice(o.key.indexOf("$")+1);e.has(c)?a=!1:e.add(c)}switch(o.type){case"title":case"base":t.has(o.type)?a=!1:t.add(o.type);break;case"meta":for(var s=0,u=l.length;s<u;s++){var p=l[s];if(o.props.hasOwnProperty(p))if("charSet"===p)n.has(p)?a=!1:n.add(p);else{var d=o.props[p],f=r[p]||new Set;"name"===p&&i||!f.has(d)?(f.add(d),r[p]=f):a=!1}}}return a}}()).reverse().map((function(e,n){var a=e.key||n;if(!t.inAmpMode&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some((function(t){return e.props.href.startsWith(t)}))){var c=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e.props||{});return c["data-href"]=c.href,c.href=void 0,c["data-optimized-fonts"]=!0,i.default.cloneElement(e,c)}return i.default.cloneElement(e,{key:a})}))}var m=function(e){var t=e.children,n=i.useContext(s.AmpStateContext),r=i.useContext(u.HeadManagerContext);return i.default.createElement(c.default,{reduceComponentsToState:h,headManager:r,inAmpMode:p.isInAmpMode(n)},t)};t.default=m},1585:function(e,t,n){"use strict";var r=n(3115),o=n(2553),a=n(2012),i=(n(450),n(9807)),c=n(7690),s=n(9828);function u(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=s(e);if(t){var o=s(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return c(this,n)}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var p=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};r.get||r.set?Object.defineProperty(t,n,r):t[n]=e[n]}return t.default=e,t}(n(7294));var d=function(e){i(n,e);var t=u(n);function n(e){var a;return o(this,n),(a=t.call(this,e)).emitChange=function(){a._hasHeadManager&&a.props.headManager.updateHead(a.props.reduceComponentsToState(r(a.props.headManager.mountedInstances),a.props))},a._hasHeadManager=a.props.headManager&&a.props.headManager.mountedInstances,a}return a(n,[{key:"componentDidMount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.add(this),this.emitChange()}},{key:"componentDidUpdate",value:function(){this.emitChange()}},{key:"componentWillUnmount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.delete(this),this.emitChange()}},{key:"render",value:function(){return null}}]),n}(p.Component);t.default=d},6407:function(e,t,n){"use strict";n.r(t);var r=n(7379),o=n(9008),a=n(5893),i=(0,r.F4)(["0%{background-position:0 74%;}50%{background-position:100% 27%;}100%{background-position:0 74%;}"]),c=r.ZP.div.withConfig({displayName:"pages__Container",componentId:"sc-1b0wxvt-0"})(["",";animation:"," 30s ease infinite;background:linear-gradient(270deg,#45dce4,#bd85ea,#ea858d);background-size:600% 600%;"],{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh"},i),s=r.ZP.h1.withConfig({displayName:"pages__Logo",componentId:"sc-1b0wxvt-1"})(["",";font-family:'Pushster',cursive;color:transparent;background:linear-gradient( 270deg,hsl(206,100%,20%),hsl(289,100%,20%),hsl(36,100%,20%) );background-size:600% 600%;background-clip:text;animation:"," 30s ease infinite;"],{fontSize:"3.75rem",lineHeight:"1","--tw-text-opacity":"1",color:"rgba(31, 41, 55, var(--tw-text-opacity))",padding:"2rem","@media (min-width: 1024px)":{fontSize:"6rem",lineHeight:"1"}},i);t.default=function(){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(o.default,{children:[(0,a.jsx)("title",{children:"coming soon."}),(0,a.jsx)("meta",{name:"description",content:"colorscheme all the things"}),(0,a.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,a.jsxs)(c,{children:[(0,a.jsx)(s,{children:"farbenfroh.io"}),(0,a.jsxs)(u,{children:[(0,a.jsx)(p,{children:"/\u02c8farb\u0259nfro\u02d0/"}),(0,a.jsx)(d,{children:"[adjective]"}),(0,a.jsx)(f,{children:"full of colour"})]})]})]})};var u=(0,r.ZP)("div").withConfig({displayName:"pages___StyledDiv",componentId:"sc-1b0wxvt-2"})({textAlign:"center",marginTop:"1rem",marginBottom:"1rem"}),p=(0,r.ZP)("p").withConfig({displayName:"pages___StyledP",componentId:"sc-1b0wxvt-3"})({"--tw-text-opacity":"1",color:"rgba(55, 65, 81, var(--tw-text-opacity))",fontSize:"1.125rem",lineHeight:"1.75rem"}),d=(0,r.ZP)("p").withConfig({displayName:"pages___StyledP2",componentId:"sc-1b0wxvt-4"})({"--tw-text-opacity":"1",color:"rgba(55, 65, 81, var(--tw-text-opacity))",fontSize:"0.75rem",lineHeight:"1rem"}),f=(0,r.ZP)("p").withConfig({displayName:"pages___StyledP3",componentId:"sc-1b0wxvt-5"})({"--tw-text-opacity":"1",color:"rgba(17, 24, 39, var(--tw-text-opacity))",fontSize:"1.25rem",lineHeight:"1.75rem"})},3685:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(6407)}])},9008:function(e,t,n){e.exports=n(2717)},8164:function(e,t,n){var r=n(4360);e.exports=function(e){if(Array.isArray(e))return r(e)},e.exports.default=e.exports,e.exports.__esModule=!0},7381:function(e){e.exports=function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)},e.exports.default=e.exports,e.exports.__esModule=!0},5725:function(e){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.default=e.exports,e.exports.__esModule=!0},3115:function(e,t,n){var r=n(8164),o=n(7381),a=n(3585),i=n(5725);e.exports=function(e){return r(e)||o(e)||a(e)||i()},e.exports.default=e.exports,e.exports.__esModule=!0}},function(e){e.O(0,[774,888,179],(function(){return t=3685,e(e.s=t);var t}));var t=e.O();_N_E=t}]);