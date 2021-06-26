(this["webpackJsonptic-tac-toe"]=this["webpackJsonptic-tac-toe"]||[]).push([[0],[,,,,,,,,,,,,,function(n,e,t){},function(n,e,t){},function(n,e,t){},,function(n,e,t){},function(n,e,t){"use strict";t.r(e);var i=t(1),r=t.n(i),s=t(3),a=t.n(s),l=(t(13),t(14),t(6)),o=t(4),u=t(5),c=t(8),d=t(7),h=(t(15),t(0));var f=function(n){return Object(h.jsx)("span",{className:"square",onClick:n.onClick,children:n.sign?n.sign:String.fromCharCode(160)})},j=(t(17),function(n){Object(c.a)(t,n);var e=Object(d.a)(t);function t(n){var i;return Object(o.a)(this,t),(i=e.call(this,n)).generateSquare=function(n){return Object(h.jsx)(f,{sign:i.state.board[n],onClick:function(){return i.handleClick(n)}})},i.handleClick=function(n){if(i.state.started&&null===i.state.board[n]){var e=Object(l.a)(i.state.board);e[n]=i.state.current,i.setState((function(n){return{board:e,n:n.n+1}}),(function(){var e;(e=i.foundWinner(n)).foundWinner||9===i.state.n?i.setState((function(n){return{winnerFound:e.foundWinner,finished:!0,started:!1,line:e.foundWinner?e.limits:n.line}})):i.setState((function(n){return{current:"X"===n.current?"O":"X"}}))}))}},i.hCheck=function(n){var e=null,t=null,i=0;return n>=0&&n<=2?(e=0,t=2,i=44):n>=3&&n<=5?(e=3,t=5,i=103):n>=6&&n<=8&&(e=6,t=8,i=161),{lower:e,upper:t,cnt:1,line:{x:0,y:i,width:0,angle:0,isHorizontal:!0}}},i.vCheck=function(n){var e=null,t=null,i=0,r=0;return n>=0&&n<=2?(e=n,t=n+6):n>=3&&n<=5?(e=n-3,t=n+3):n>=6&&n<=8&&(e=n-6,t=n),-1!==[0,3,6].indexOf(n)?(i=17,r=16):-1!==[1,4,7].indexOf(n)?(i=50,r=52):-1!==[2,5,8].indexOf(n)&&(i=87,r=85),{lower:e,upper:t,cnt:3,line:{x:i,y:r,width:197,angle:90,isHorizontal:!1}}},i.dCheck=function(n){var e=null,t=null,i=3;if(0===n||8===n)return{0:{lower:e=0,upper:t=8,cnt:i=4,line:{x:-3,y:-19,width:307,angle:40,isHorizontal:!1}}};if(2===n||6===n)return{2:{lower:e=2,upper:t=6,cnt:i=2,line:{x:259,y:120,width:307,angle:-40,isHorizontal:!1}}};var r={0:{lower:e=0,upper:t=8,cnt:i=4,line:{x:-3,y:-19,width:307,angle:40,isHorizontal:!1}}};return e=2,t=6,i=2,r[2]={lower:e,upper:t,cnt:i,line:{x:259,y:120,width:307,angle:-40,isHorizontal:!1}},r},i.foundWinner=function(n){var e=i.hCheck(n),t=i.findOut(e),r=i.vCheck(n),s=i.findOut(r),a=!1,l=!1,o=null,u={hLimits:e.line,vLimits:r.line};n%2===0&&((o=i.dCheck(n)).hasOwnProperty("0")&&(a=i.findOut(o[0]),u.rDLimits=o[0].line),o.hasOwnProperty("2")&&(l=i.findOut(o[2]),u.lDLimits=o[2].line));var c={wonH:t,wonV:s,wonLD:l,wonRD:a};return i.structureWinObj(c,u)},i.findOut=function(n){for(var e=n.lower;e<=n.upper;e+=n.cnt)if(i.state.board[e]!==i.state.current)return!1;return!0},i.start=function(){var n=prompt("Enter either X/O");"X"!==(n=n?n.toUpperCase():"")&&"O"!==n||i.setState({board:[null,null,null,null,null,null,null,null,null],n:0,started:!0,current:n,finished:!1,winnerFound:!1,line:{x:0,y:0,width:0,angle:0,isHorizontal:!1}})},i.state={board:[null,null,null,null,null,null,null,null,null],n:0,current:"",started:!1,finished:!1,winnerFound:!1,line:{x:0,y:0,width:0,angle:0,isHorizontal:!1}},i}return Object(u.a)(t,[{key:"componentDidMount",value:function(){var n=this;document.addEventListener("keydown",(function(e){if(e.keyCode>=49&&e.keyCode<=57||e.keyCode>=97&&e.keyCode<=105){var t=e.keyCode<97?48:96;n.handleClick(e.keyCode-t-1)}else 83===e.keyCode&&n.start()}))}},{key:"structureWinObj",value:function(n,e){var t={foundWinner:n.wonH||n.wonV||n.wonRD||n.wonLD};return n.wonH?t.limits=e.hLimits:n.wonV?t.limits=e.vLimits:n.wonRD?t.limits=e.rDLimits:n.wonLD&&(t.limits=e.lDLimits),t}},{key:"render",value:function(){return Object(h.jsxs)("div",{className:"board-with-controls",children:[Object(h.jsxs)("div",{className:"board",children:[Object(h.jsx)("div",{className:"non-horizontal-line",style:{display:this.state.winnerFound&&!this.state.line.isHorizontal?"inline-block":"none",transform:"rotate(".concat(this.state.line.angle,"deg)"),transformOrigin:"".concat(this.state.line.x,"px ").concat(this.state.line.y,"px"),width:"".concat(this.state.line.width,"px")}}),Object(h.jsx)("div",{className:"horizontal-line",style:{display:this.state.winnerFound&&this.state.line.isHorizontal?"inline-block":"none",top:"".concat(this.state.line.y,"px")}}),Object(h.jsxs)("div",{className:"squares",children:[this.generateSquare(0),this.generateSquare(1),this.generateSquare(2)]}),Object(h.jsxs)("div",{className:"squares",children:[this.generateSquare(3),this.generateSquare(4),this.generateSquare(5)]}),Object(h.jsxs)("div",{className:"squares",children:[this.generateSquare(6),this.generateSquare(7),this.generateSquare(8)]})]}),this.state.winnerFound?Object(h.jsxs)("h1",{children:["The Winner is: ",this.state.current," "]}):"",Object(h.jsx)("input",{type:"button",value:!this.state.started||this.state.finished?"Start":"Reset",onClick:this.start,className:"btn btn-primary"})]})}}]),t}(i.Component));var b=function(){return Object(h.jsxs)("div",{className:"container",children:[Object(h.jsx)(j,{}),Object(h.jsxs)("h3",{children:["You can use the following keyboard shortcuts",Object(h.jsxs)("ul",{children:[Object(h.jsx)("li",{children:'"s" to start/reset the game'}),Object(h.jsx)("li",{children:'"0-9" to play the moves'})]})]})]})},w=function(n){n&&n instanceof Function&&t.e(3).then(t.bind(null,19)).then((function(e){var t=e.getCLS,i=e.getFID,r=e.getFCP,s=e.getLCP,a=e.getTTFB;t(n),i(n),r(n),s(n),a(n)}))};a.a.render(Object(h.jsx)(r.a.StrictMode,{children:Object(h.jsx)(b,{})}),document.getElementById("root")),w()}],[[18,1,2]]]);
//# sourceMappingURL=main.828aee9e.chunk.js.map