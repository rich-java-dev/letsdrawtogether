(this["webpackJsonprealtime-multi-player"]=this["webpackJsonprealtime-multi-player"]||[]).push([[0],{113:function(t,n,e){},114:function(t,n,e){},230:function(t,n,e){"use strict";e.r(n);var o,c=e(0),i=e.n(c),r=e(25),a=e.n(r),s=(e(113),e(114),e(6)),u=e(34),l=e.n(u),d=e(68),f=e(96),h=e(105),p=e(247),O=e(7),j=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).SERVER_ADDR||"letsdrawtogether.net",S=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).WEBSOCKET_ENDPOINT||"websockettest",v=JSON.stringify({action:"CLEAR"}),b=window.innerWidth-10,g=window.innerHeight-120,C=null,E="black",w=new Set,x=!1,m=function(){D();var t="wss://".concat(j,"/").concat(S);console.log("Attempting to connect to websocket on: ".concat(t)),(C=new WebSocket(t)).onopen=function(){console.log("WebSocket Client Connected")},C.onmessage=function(t){var n=JSON.parse(t.data);"CLEAR"===(null===n||void 0===n?void 0:n.action)&&w.clear(),void 0!==(null===n||void 0===n?void 0:n.type)&&w.add(n)}},T=function(t,n){var e=t.getBoundingClientRect(),o=n.clientX-e.left,c=n.clientY-e.top,i={type:"CIRCLE",color:E,radius:2,posX:o,posY:c};C.send(JSON.stringify(i))},_=function(t){t.fillStyle="white",t.fillRect(0,0,o.width,o.height),Array.from(w).map((function(n){!function(t){var n=t.ctx,e=t.posX,o=t.posY,c=t.radius,i=t.color;n.beginPath(),n.arc(e,o,c,0,2*Math.PI),n.fillStyle=i,n.fill(),n.strokeStyle=i,n.stroke()}(Object(f.a)({ctx:t},n))}))},R=function(){C.send(v)},D=function(){var t="https://letsdrawtogether.net/api/canvasState";console.log(t),fetch(t,{method:"GET"}).then((function(t){return t.json()})).then((function(t){console.log(t),w=new Set(t),console.log(w)}))},y=function(t,n){x=!1},k=function(){var t=Object(c.useRef)();Object(c.useEffect)(Object(d.a)(l.a.mark((function n(){var e,c;return l.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return m(),(o=t.current).addEventListener("mousedown",(function(t){return T(o,t)})),c=function(){var t=Object(d.a)(l.a.mark((function t(){var n;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=o.getContext("2d"),_(n),e=requestAnimationFrame(c);case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),n.next=6,c();case 6:return n.abrupt("return",(function(){cancelAnimationFrame(e)}));case 7:case"end":return n.stop()}}),n)}))));return Object(O.jsxs)("div",{children:[Object(O.jsx)("div",{children:"Created By: Rich White - CS5283"}),Object(O.jsx)(p.a,{onClick:R,children:"Clear Canvas"}),Object(O.jsx)("canvas",{ref:t,width:b,height:g,onMouseDown:function(t){return function(t,n){T(t,n),x=!0}(o,t)},onMouseMove:function(t){return function(t,n){x&&T(t,n)}(o,t)},onMouseUp:function(t){return y()},onMouseLeave:function(t){return y()}}),Object(O.jsx)(h.a,{onChange:function(t,n){E=t.hex}})]})},A=e(249),L=function(){return Object(O.jsx)(A.a,{children:"Lets Draw Together!"})},P=function(){return Object(O.jsxs)("div",{className:"App",children:[Object(O.jsx)(s.a,{exact:!0,path:"/",component:L}),Object(O.jsx)(s.a,{exact:!0,path:"/",component:k})]})},W=function(t){t&&t instanceof Function&&e.e(3).then(e.bind(null,250)).then((function(n){var e=n.getCLS,o=n.getFID,c=n.getFCP,i=n.getLCP,r=n.getTTFB;e(t),o(t),c(t),i(t),r(t)}))},F=e(67),N=e(248);a.a.render(Object(O.jsx)(i.a.StrictMode,{children:Object(O.jsx)(F.a,{children:Object(O.jsx)(N.a,{children:Object(O.jsx)(P,{})})})}),document.getElementById("root")),W()}},[[230,1,2]]]);
//# sourceMappingURL=main.4844241f.chunk.js.map