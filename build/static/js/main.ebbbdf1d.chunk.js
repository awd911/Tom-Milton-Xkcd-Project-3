(this["webpackJsonpproject-3-comic"]=this["webpackJsonpproject-3-comic"]||[]).push([[0],{16:function(e,t,n){},17:function(e,t,n){},23:function(e,t,n){"use strict";n.r(t);var c=n(5),o=n.n(c),r=n(11),i=n.n(r),u=(n(16),n(17),n(2)),s={baseUrl:"http://localhost:8010/proxy/info.0.json",getDefault:function(){var e="https://xkcd.com/info.0.json";(0,n(10).default)({method:"GET",url:"https://proxy.junocollege.com/https://xkcd.com/info.0.json",responseType:"json",params:{reqUrl:e,proxyHeaders:{header_params:"value"},xmlToJson:!1}}).then((function(e){console.log(e.data),s.displayDefaultComic(e.data)})),fetch(e).then((function(e){e.json()})).then((function(e){console.log(e),s.displayDefaultComic(e),s.currentNumber=e.num}))},changeComic:function(){console.log("not yet...")},displayDefaultComic:function(e){var t=e.title,n=e.img,c=e.alt;document.querySelector("h2").innerText=t,document.querySelector("main").innerHTML="";var o=document.querySelector("main"),r=document.createElement("img");r.src=n,r.alt=c,console.log("!!!!! THE CURRENT IMG SRC IS : ",r),o.appendChild(r)}},l=function(){s.currentNumber=s.currentNumber+1,s.changeComic()},a=function(){s.currentNumber=s.currentNumber-1,s.changeComic()};s.init=function(){s.currentNumber=0,s.getDefault()},s.init();var m=function(){return Object(u.jsxs)("div",{className:"App",children:[Object(u.jsx)("h1",{children:"Comic Viewer"}),Object(u.jsx)("h2",{}),Object(u.jsx)("main",{}),Object(u.jsxs)("section",{children:[Object(u.jsx)("button",{onClick:a,children:"Previous"}),Object(u.jsx)("textarea",{}),Object(u.jsx)("button",{onClick:l,children:"Next"})]}),Object(u.jsx)("footer",{children:Object(u.jsx)("a",{href:"https://xkcd.com/license.html",children:"Copyright Info "})})]})},h=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,24)).then((function(t){var n=t.getCLS,c=t.getFID,o=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),c(e),o(e),r(e),i(e)}))};i.a.render(Object(u.jsx)(o.a.StrictMode,{children:Object(u.jsx)(m,{})}),document.getElementById("root")),h()}},[[23,1,2]]]);
//# sourceMappingURL=main.ebbbdf1d.chunk.js.map