(this["webpackJsonprealtime-multi-player"]=this["webpackJsonprealtime-multi-player"]||[]).push([[0],{141:function(t,e,n){},142:function(t,e,n){},259:function(t,e,n){"use strict";n.r(e);var o,c=n(0),r=n.n(c),a=n(10),i=n.n(a),s=(n(141),n(142),n(12)),l=n(17),u=n(117),d=n(22),h=n.n(d),j=n(42),p=n(125),b=n(304),f=n(6),O=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).SERVER_ADDR||"letsdrawtogether.net",m=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).WEBSOCKET_ENDPOINT||"websockettest",v="",x=JSON.stringify({action:"CLEAR",topic:v}),w=window.innerWidth-15,g=window.innerHeight-200,S="black",C=!1,y=null,E=(new Set,new Set),k=new Set,T=!1,R=0,N=0,_=function(){D();var t="wss://".concat(O,"/").concat(m);console.log("Attempting to connect to websocket on: ".concat(t)),(y=new WebSocket(t)).onopen=function(){console.log("WebSocket Client Connected")},y.onmessage=function(t){var e=JSON.parse(t.data);e.topic===v&&(void 0!==(null===e||void 0===e?void 0:e.type)?k.add(e):"CLEAR"===(null===e||void 0===e?void 0:e.action)&&(E.clear(),T=!0,console.log("Clear called")))}},I=function(){var t=Object(j.a)(h.a.mark((function t(e,n){var o,c,r,a,i,s,l,u,d;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.preventDefault(),o=e.getBoundingClientRect(),c=Math.floor(n.clientX-o.left),r=Math.floor(n.clientY-o.top),a={topic:v,type:"CIRCLE",color:S,radius:2,posX:c,posY:r},y.send(JSON.stringify(a)),C&&R>0&&N>0&&(i=Math.sqrt(Math.pow(c-R,2)+Math.pow(r-N,2)))>4)for((r-N)/(c-R),s=(c-R)/i,l=(r-N)/i,u=1;u<=i/2;u++)d={topic:v,type:"CIRCLE",color:S,radius:2,posX:R+2*u*s,posY:N+2*u*l},y.send(JSON.stringify(d));R=c,N=r;case 9:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),W=function(t){T&&(console.log("Clear Canvas"),L(t),T=!1),Array.from(k).map((function(e){!function(t){var e=t.ctx,n=t.posX,o=t.posY,c=t.radius,r=t.color;e.beginPath(),e.arc(n,o,c,0,2*Math.PI),e.fillStyle=r,e.fill(),e.strokeStyle=r,e.stroke()}(Object(u.a)({ctx:t},e))})),E=new Set([].concat(Object(l.a)(E),Object(l.a)(k))),k=new Set},L=function(t){console.log("Clear Canvas called"),t.fillStyle="white",t.fillRect(0,0,o.width,o.height)},A=function(){y.send(x)},D=function(){var t="https://letsdrawtogether.net/api/canvasState?roomId=".concat(v);fetch(t,{method:"GET"}).then((function(t){return t.json()})).then((function(t){k=new Set(t)}))},M=function(){var t=Object(j.a)(h.a.mark((function t(e,n){return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:I(e,n),C=!0;case 2:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),F=function(){var t=Object(j.a)(h.a.mark((function t(e,n){return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:C&&I(e,n);case 1:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),H=function(t,e){C=!1,R=0,N=0},P=function(t){var e,n=t.match,r=(t.location,Object(c.useRef)());void 0!==(null===n||void 0===n||null===(e=n.params)||void 0===e?void 0:e.roomId)&&(v=n.params.roomId),x=JSON.stringify({action:"CLEAR",topic:v});window.addEventListener("resize",(function(t,e,n){t.width=e,t.height=n,w=e,g=n}),!1);return Object(c.useEffect)(Object(j.a)(h.a.mark((function t(){var e,n;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return _(),(o=r.current).addEventListener("mousedown",(function(t){return I(o,t)})),n=function(){var t=Object(j.a)(h.a.mark((function t(){var c;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:window.innerWidth-15,window.innerHeight-160,c=o.getContext("2d"),W(c),e=requestAnimationFrame(n);case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),t.next=6,n();case 6:return t.abrupt("return",(function(){cancelAnimationFrame(e)}));case 7:case"end":return t.stop()}}),t)})))),Object(f.jsxs)("div",{children:[Object(f.jsx)(b.a,{onClick:A,children:"Clear Canvas"}),Object(f.jsx)("canvas",{ref:r,width:w,height:g,onMouseDown:function(t){return M(o,t)},onTouchStart:function(t){return M(o,t)},onMouseMove:function(t){return F(o,t)},onTouchMove:function(t){return F(o,t)},onTouchEnd:function(t){return H()},onMouseUp:function(t){return H()},onMouseLeave:function(t){return H()}}),Object(f.jsx)(p.a,{onChange:function(t,e){S=t.hex}})]})},B=n(21),J=n(299),K=n(300),U=n(301),X=n(303),Y=n(306),q=n(302),V=n(298),z=Object(V.a)({toolBar:{display:"flex",justifyContent:"space-between"},selectedItem:{color:"blue",backgroundColor:"gray"},modal:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"background.paper",border:"2px solid #000",boxShadow:24,p:4}}),G=function(t){var e=z(),n=Object(s.e)(),o=function(t){return n.push(t)},r=Object(c.useState)(null),a=Object(B.a)(r,2),i=(a[0],a[1]),l=Object(c.useState)(null),u=Object(B.a)(l,2),d=(u[0],u[1]),h=Object(c.useState)(!1),j=Object(B.a)(h,2),p=j[0],O=j[1],m=Object(c.useState)(""),v=Object(B.a)(m,2),x=v[0],w=v[1];return Object(f.jsx)("div",{children:Object(f.jsx)(J.a,{position:"static",color:"inherit",children:Object(f.jsxs)(K.a,{className:e.toolBar,children:[Object(f.jsx)(U.a,{children:Object(f.jsx)(X.a,{fontWeight:"600",fontSize:24,children:"letsdrawtogether.net"})}),Object(f.jsx)(b.a,{color:"inherit",onClick:function(){return o("")},children:"Home"}),Object(f.jsx)(b.a,{color:"inherit",onClick:function(){return O(!0)},children:"Change Room/Topic"}),Object(f.jsx)(Y.a,{open:p,onClose:function(t){t instanceof Function&&t(),i(null),d(null)},"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:Object(f.jsxs)(X.a,{className:e.modal,children:[Object(f.jsx)(U.a,{id:"modal-modal-description",sx:{mt:2},children:"Type a topic to navigate to a new Room/white Board"}),Object(f.jsx)(q.a,{onChange:function(t){return w(t.target.value)}}),Object(f.jsx)(b.a,{color:"inherit",onClick:function(){o("/room/".concat(x)),O(!1)},children:"Ok"})]})}),Object(f.jsx)(b.a,{color:"inherit",onClick:function(t){return d(t.currentTarget)},children:"Save Image"}),Object(f.jsx)(b.a,{color:"inherit",onClick:function(){return o("/about")},children:"About"}),Object(f.jsx)(b.a,{color:"inherit",onClick:function(){return o("/login")},children:"Login"})]})})})},Q=n(262),Z=n(307),$=Object(Q.a)({root:{display:"flex",justifyContent:"space-between"},avatar:{width:"20vw",height:"20vw",maxWidth:"200px",maxHeight:"200px"},typography:{width:"50vw"},gap:{width:"20vw"},vgap:{height:"100px"}}),tt=function(){var t=$();return Object(f.jsxs)("div",{className:t.root,children:[Object(f.jsx)("div",{className:t.vgap}),Object(f.jsx)(Z.a,{className:t.avatar,alt:"RW",src:"aboutme.png"}),Object(f.jsxs)(U.a,{className:t.typography,children:["Hello! My name is Richard White. ",Object(f.jsx)("br",{}),"I am a software developer based out of NJ. ",Object(f.jsx)("br",{}),"Computer science, education, and art are a few of my passions I wanted to to bring together in this fun project. ",Object(f.jsx)("br",{}),"While this site is still in very early development, I plan to incorporate more interaction, support and new features/variants.",Object(f.jsx)("br",{}),"This site was built with:",Object(f.jsx)("br",{}),"react express websockets couchdb docker kubernetes",Object(f.jsx)("br",{}),"If you have any questions or comments you can reach me at",Object(f.jsx)("br",{}),Object(f.jsx)("a",{href:"mailto:therichphysicist@gmail.com",children:"therichphysicist@gmail.com"}),Object(f.jsx)("br",{}),"Thanks and enjoy!"]}),Object(f.jsx)("div",{className:t.gap})]})},et=function(){return Object(f.jsxs)("div",{className:"App",children:[Object(f.jsx)(G,{}),Object(f.jsx)(s.a,{path:"/about",component:tt}),Object(f.jsx)(s.a,{exact:!0,path:"/",component:P}),Object(f.jsx)(s.a,{path:"/room/:roomId",component:P})]})},nt=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,310)).then((function(e){var n=e.getCLS,o=e.getFID,c=e.getFCP,r=e.getLCP,a=e.getTTFB;n(t),o(t),c(t),r(t),a(t)}))},ot=n(58),ct=n(305);i.a.render(Object(f.jsx)(r.a.StrictMode,{children:Object(f.jsx)(ot.a,{children:Object(f.jsx)(ct.a,{children:Object(f.jsx)(et,{})})})}),document.getElementById("root")),nt()}},[[259,1,2]]]);
//# sourceMappingURL=main.6060160f.chunk.js.map