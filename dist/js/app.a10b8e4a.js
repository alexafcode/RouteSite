(function(t){function e(e){for(var n,i,s=e[0],c=e[1],l=e[2],d=0,f=[];d<s.length;d++)i=s[d],r[i]&&f.push(r[i][0]),r[i]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);u&&u(e);while(f.length)f.shift()();return o.push.apply(o,l||[]),a()}function a(){for(var t,e=0;e<o.length;e++){for(var a=o[e],n=!0,s=1;s<a.length;s++){var c=a[s];0!==r[c]&&(n=!1)}n&&(o.splice(e--,1),t=i(i.s=a[0]))}return t}var n={},r={app:0},o=[];function i(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=n,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(a,n,function(e){return t[e]}.bind(null,n));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var l=0;l<s.length;l++)e(s[l]);var u=c;o.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"312d":function(t,e,a){},"56d7":function(t,e,a){"use strict";a.r(e);a("744f"),a("6c7b"),a("7514"),a("20d6"),a("1c4c"),a("6762"),a("cadf"),a("e804"),a("55dd"),a("d04f"),a("c8ce"),a("217b"),a("7f7f"),a("f400"),a("7f25"),a("536b"),a("d9ab"),a("f9ab"),a("32d7"),a("25c9"),a("9f3c"),a("042e"),a("c7c6"),a("f4ff"),a("049f"),a("7872"),a("a69f"),a("0b21"),a("6c1a"),a("c7c62"),a("84b4"),a("c5f6"),a("2e37"),a("fca0"),a("7cdf"),a("ee1d"),a("b1b1"),a("87f3"),a("9278"),a("5df2"),a("04ff"),a("f751"),a("4504"),a("fee7"),a("ffc1"),a("0d6d"),a("9986"),a("8e6e"),a("25db"),a("e4f7"),a("b9a1"),a("64d5"),a("9aea"),a("db97"),a("66c8"),a("57f0"),a("165b"),a("456d"),a("cf6a"),a("fd24"),a("8615"),a("551c"),a("097d"),a("df1b"),a("2397"),a("88ca"),a("ba16"),a("d185"),a("ebde"),a("2d34"),a("f6b3"),a("2251"),a("c698"),a("a19f"),a("9253"),a("9275"),a("3b2b"),a("3846"),a("4917"),a("a481"),a("28a5"),a("386d"),a("6b54"),a("4f7f"),a("8a81"),a("ac4d"),a("8449"),a("9c86"),a("fa83"),a("48c0"),a("a032"),a("aef6"),a("d263"),a("6c37"),a("9ec8"),a("5695"),a("2fdb"),a("d0b0"),a("5df3"),a("b54a"),a("f576"),a("ed50"),a("788d"),a("14b9"),a("f386"),a("f559"),a("1448"),a("673e"),a("242a"),a("c66f"),a("b05c"),a("34ef"),a("6aa2"),a("15ac"),a("af56"),a("b6e4"),a("9c29"),a("63d9"),a("4dda"),a("10ad"),a("c02b"),a("4795"),a("130f"),a("ac6a"),a("96cf");var n=a("2b0e"),r=a("ce5b"),o=a.n(r),i=(a("bf40"),a("2992")),s=a.n(i);n["default"].use(o.a,{iconfont:"md",lang:{locales:{ru:s.a},current:"ru"}});var c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("app-header"),a("v-content",{attrs:{transition:"slide-x-transition"}},[a("router-view")],1)],1)},l=[],u=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",[a("v-navigation-drawer",{staticClass:"brown lighten-2",attrs:{app:"",dark:"","disable-resize-watcher":""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[a("v-list",[t._l(t.items,function(e,n){return[a("v-list-tile",{key:n,attrs:{to:e.route}},[a("v-list-tile-content",[t._v(t._s(e.title))])],1),a("v-divider",{key:"divider-"+n})]})],2)],1),a("v-toolbar",{attrs:{app:"",color:"brown darken-4",dark:""}},[a("v-toolbar-side-icon",{staticClass:"hidden-md-and-up",on:{click:function(e){t.drawer=!t.drawer}}}),a("v-spacer",{staticClass:"hidden-sm-and-up"}),a("v-toolbar-title",[t._v(t._s(t.appTitle))]),t._l(t.items,function(e,n){return a("div",{key:n},[a("v-btn",{staticClass:"hidden-sm-and-down",attrs:{flat:"",to:e.route}},[t._v(t._s(e.title))])],1)})],2)],1)},d=[],f={name:"AppHeader",data:function(){return{appTitle:"Router",drawer:!1,items:[{title:"Home",route:"/",icon:"android"},{title:"Список",route:"/autoCard",icon:"done"},{title:"Новости",route:"/news",icon:"done"}]}}},v=f,p=a("2877"),m=Object(p["a"])(v,u,d,!1,null,"1a77bf5a",null),h=m.exports,b={name:"App",components:{AppHeader:h},data:function(){return{}}},g=b,w=Object(p["a"])(g,c,l,!1,null,null,null),_=w.exports,y=a("8c4f"),x=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",[a("image-grid")],1)},k=[],O=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{fluid:"","fill-height":""}},[a("v-layout",{staticClass:"home_container",style:{"background-image":"url("+t.image+")"},attrs:{"justify-center":"","align-center":""}},[a("v-flex",{attrs:{xs12:""}},[a("div",{staticClass:"display-4 font-weight-black grey--text text-xs-center"},[t._v("Проект")]),a("div",{staticClass:"text-xs-center"},[a("v-btn",{attrs:{round:"",large:"",color:"brown darken-4",dark:""}},[a("h2",[t._v("Начать")])])],1)])],1)],1)},S=[],j={name:"imageGrid",components:{},data:function(){return{image:"https://picsum.photos/800/600?random"}},mounted:function(){},methods:{}},C=j,N=(a("5769"),Object(p["a"])(C,O,S,!1,null,"4265926e",null)),T=N.exports,I={components:{imageGrid:T}},P=I,E=Object(p["a"])(P,x,k,!1,null,"91fda578",null),L=E.exports,A=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-container",{staticStyle:{"background-color":"#d8d4d4"}},[a("v-flex",{attrs:{xs12:"",sm8:"",md6:""}},[a("v-text-field",{attrs:{label:"Name"},on:{change:t.validFields},model:{value:t.text,callback:function(e){t.text=e},expression:"text"}})],1),a("v-flex",{attrs:{xs12:"",sm8:"",md6:""}},[a("v-textarea",{attrs:{name:"input",label:"Descriptions",hint:"Введите текст"},on:{change:t.validFields},model:{value:t.desc,callback:function(e){t.desc=e},expression:"desc"}},[t._v(t._s(t.desc))])],1),a("v-flex",{staticClass:"text-xs-center text-sm-center text-md-center text-lg-center",attrs:{xs12:"",sm8:"",md6:""}},[t.imageUrl?a("img",{attrs:{src:t.imageUrl,height:"150"}}):t._e(),a("v-text-field",{attrs:{label:"Select Image","prepend-icon":"attach_file"},on:{click:t.pickFile},model:{value:t.imageName,callback:function(e){t.imageName=e},expression:"imageName"}}),a("input",{ref:"image",staticStyle:{display:"none"},attrs:{type:"file",accept:"image/*"},on:{change:t.onFilePicked}})],1),a("v-btn",{attrs:{fab:"",dark:"",color:"indigo",disabled:!t.valid},on:{click:t.saveToLS}},[a("v-icon",{attrs:{dark:""}},[t._v("add")])],1)],1)],1)},$=[],D=a("2f62");function F(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{},n=Object.keys(a);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(a).filter(function(t){return Object.getOwnPropertyDescriptor(a,t).enumerable}))),n.forEach(function(e){U(t,e,a[e])})}return t}function U(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var B={name:"List",components:{},data:function(){return{dialog:!1,imageName:"",imageUrl:"",imageFile:"",desc:"",text:"",valid:!1}},computed:F({},Object(D["d"])("autoStore",["autos"]),Object(D["b"])("autoStore",["getById"]),{getID:function(){return this.getById(this.id)}}),watch:{},methods:F({},Object(D["c"])("autoStore",["ADD_LS","INIT_STATE"]),{addLS:function(){this.ADD_LS(this.auto)},initState:function(){this.INIT_STATE},pickFile:function(){this.$refs.image.click()},onFilePicked:function(t){var e=this,a=t.target.files;if(void 0!==a[0]){if(this.imageName=a[0].name,this.imageName.lastIndexOf(".")<=0)return;var n=new FileReader;n.readAsDataURL(a[0]),n.addEventListener("load",function(){e.imageUrl=n.result,e.imageFile=a[0]})}else this.imageName="",this.imageFile="",this.imageUrl=""},saveToLS:function(){var t={name:this.text,descriptions:this.desc,imageName:this.imageName,imageFile:this.imageFile,imageUrl:this.imageUrl};this.ADD_LS(t),this.$router.push("autoCard")},validFields:function(){""!=this.text&&""!=this.desc&&(this.valid=!0)}})},J=B,M=Object(p["a"])(J,A,$,!1,null,null,null),Y=M.exports,H=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("v-layout",[a("v-flex",{attrs:{xs12:"",sm6:"","offset-sm3":""}},[a("v-container",{attrs:{fluid:""}},[a("v-layout",{attrs:{row:""}},[a("v-text-field",{attrs:{label:"Search"},model:{value:t.searchText,callback:function(e){t.searchText=e},expression:"searchText"}}),a("v-btn",{attrs:{fab:"",dark:"",color:"brown darken-4",to:"/list"}},[a("v-icon",{attrs:{dark:""}},[t._v("add")])],1)],1)],1)],1)],1),t._l(t.filterAuto,function(t,e){return a("div",{key:e,attrs:{id:"card_list"}},[a("cardauto",{attrs:{auto:t}})],1)})],2)},K=[],R=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("v-flex",{attrs:{xs12:"",sm8:"","offset-sm2":""}},[a("v-card",[a("v-img",{attrs:{src:t.auto.imageUrl?t.auto.imageUrl:"",alt:t.auto.imageName,"max-height":"400px","max-width":"750px","aspect-ratio":"2.75"}}),a("v-card-title",{attrs:{"primary-title":""}},[a("div",[a("h3",{staticClass:"headline mb-0"},[t._v(t._s(t.auto.name))]),a("div",[t._v(t._s(t.ShortName(t.auto.descriptions)))])])]),a("v-card-actions",[a("v-btn",{attrs:{flat:"",color:"orange"}},[t._v("Share")])],1)],1)],1)],1)},z=[],G={name:"card_auto",props:["auto"],components:{},data:function(){return{}},computed:{},methods:{ShortName:function(t){return t.length>185?t.substr(1,185)+"...":t}}},q=G,Q=Object(p["a"])(q,R,z,!1,null,null,null),V=Q.exports;function W(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{},n=Object.keys(a);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(a).filter(function(t){return Object.getOwnPropertyDescriptor(a,t).enumerable}))),n.forEach(function(e){X(t,e,a[e])})}return t}function X(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var Z={name:"autoCard",components:{cardauto:V},data:function(){return{searchText:null}},computed:W({},Object(D["d"])("autoStore",["autos"]),{filterAuto:function(){var t=this,e=this.autos;return this.searchText&&(e=e.filter(function(e){return e.name.toLowerCase().includes(t.searchText.toLowerCase())||e.descriptions.toLowerCase().includes(t.searchText.toLowerCase())})),e}})},tt=Z,et=Object(p["a"])(tt,H,K,!1,null,null,null),at=et.exports,nt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("div",{attrs:{id:"news_container"}},[a("news-category",{directives:[{name:"show",rawName:"v-show",value:!t.category_show,expression:"!category_show"}],on:{change_category:t.getNews}}),a("loading",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}]}),a("v-container",{attrs:{"grid-list-lg":""}},[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-btn",{directives:[{name:"scroll",rawName:"v-scroll",value:t.scrollInitButton,expression:"scrollInitButton"},{name:"show",rawName:"v-show",value:t.scroll_show,expression:"scroll_show"}],staticClass:"button_top",attrs:{icon:"",color:"brown darken-1"},on:{click:t.scrollTop}},[a("v-icon",[t._v("keyboard_arrow_up")])],1),t._l(t.news,function(t,e){return a("v-flex",{key:e,attrs:{xs12:"",sm8:"","offset-sm2":""}},[a("news-list",{attrs:{post:t}})],1)})],2)],1)],1)])},rt=[],ot=a("bc3a"),it=a.n(ot),st=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"text-xs-center"},[a("v-progress-circular",{staticClass:"circular",attrs:{size:80,width:8,color:"brown darken-4",indeterminate:""}})],1)},ct=[],lt={name:"Loading",components:{},data:function(){return{}}},ut=lt,dt=(a("fea1"),Object(p["a"])(ut,st,ct,!1,null,"b2132c60",null)),ft=dt.exports,vt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"nav_category"},[a("v-speed-dial",{attrs:{top:t.top,left:t.left,direction:t.direction,"open-on-hover":!0,transition:t.transition,fixed:!0},model:{value:t.fab,callback:function(e){t.fab=e},expression:"fab"}},[a("v-btn",{attrs:{slot:"activator",color:"blue darken-2",dark:"",fab:""},slot:"activator",model:{value:t.fab,callback:function(e){t.fab=e},expression:"fab"}},[a("v-icon",[t._v("account_circle")]),a("v-icon",[t._v("close")])],1),a("v-btn",{attrs:{fab:"",dark:"",small:"",color:"green"}},[a("v-icon",{on:{click:function(e){return e.stopPropagation(),t.changeCategory(t.category.all)}}},[t._v("360")])],1),a("v-btn",{attrs:{fab:"",dark:"",small:"",color:"indigo"}},[a("v-icon",{on:{click:function(e){return e.stopPropagation(),t.changeCategory(t.category.sport)}}},[t._v("directions_bike")])],1),a("v-btn",{attrs:{fab:"",dark:"",small:"",color:"brown"}},[a("v-icon",{on:{click:function(e){return e.stopPropagation(),t.changeCategory(t.category.health)}}},[t._v("favorite")])],1),a("v-btn",{attrs:{fab:"",dark:"",small:"",color:"blue"}},[a("v-icon",{on:{click:function(e){return e.stopPropagation(),t.changeCategory(t.category.tech)}}},[t._v("android")])],1),a("v-btn",{attrs:{fab:"",dark:"",small:"",color:"yellow"}},[a("v-icon",{on:{click:function(e){return e.stopPropagation(),t.changeCategory(t.category.business)}}},[t._v("perm_phone_msg")])],1),a("v-btn",{attrs:{fab:"",dark:"",small:"",color:"red"}},[a("v-icon",{on:{click:function(e){return e.stopPropagation(),t.changeCategory(t.category.ent)}}},[t._v("record_voice_over")])],1)],1)],1)},pt=[],mt={name:"NewsCategory",data:function(){return{direction:"right",fab:!1,fling:!1,tabs:null,top:!1,left:!1,transition:"slide-y-reverse-transition",category:{all:"",sport:"sports",health:"health",science:"science",tech:"technology",business:"business",ent:"entertainment"}}},methods:{changeCategory:function(t){this.$emit("change_category",t)}}},ht=mt,bt=(a("5cb1"),Object(p["a"])(ht,vt,pt,!1,null,null,null)),gt=bt.exports,wt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("v-card",[a("v-img",{attrs:{src:t.post.urlToImage?t.post.urlToImage:"","max-height":"400px"}}),a("v-card-title",{attrs:{"primary-title":""}},[a("div",[a("div",{staticClass:"headline"},[t._v(t._s(t.post.title))])])]),a("v-card-actions",[a("v-btn",{attrs:{flat:"",color:"purple",href:t.post.url}},[t._v("К Новости")]),a("v-spacer"),a("v-btn",{attrs:{icon:""},on:{click:function(e){t.show=!t.show}}},[a("v-icon",[t._v(t._s(t.show?"keyboard_arrow_down":"keyboard_arrow_up"))])],1)],1),t._t("default",[a("v-slide-y-transition",[a("v-card-text",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}]},[t._v(t._s(t.post.description))])],1)])],2)],1)},_t=[],yt={name:"newsList",props:["post"],components:{},data:function(){return{show:!1}},methods:{},directives:{}},xt=yt,kt=Object(p["a"])(xt,wt,_t,!1,null,null,null),Ot=kt.exports,St={name:"List",components:{NewsCategory:gt,Loading:ft,newsList:Ot},data:function(){return{show:!1,errors:[],API_KEY:"a74bc09e7269480db4976da25a0cf6f2",news:[],loading:!0,scroll_show:!1,category_show:!1}},created:function(){this.getNews("")},computed:{},watch:{},methods:{getNews:function(t){var e=this;this.news=[],this.loading=!0;var a="https://newsapi.org/v2/top-headlines?country=ru&category=".concat(t,"&apiKey=");it.a.get("".concat(a).concat(this.API_KEY)).then(function(t){e.news=t.data.articles,t&&(e.loading=!1)}).catch(function(t){e.errors.push(t)})},scrollInitButton:function(){window.pageYOffset<=0?this.category_show=!1:this.category_show=!0,window.pageYOffset>350?this.scroll_show=!0:this.scroll_show=!1},scrollTop:function(){window.scrollTo({top:0,behavior:"smooth"})}},directives:{inserted:function(t,e){var a=function a(n){e.value(n,t)&&window.removeEventListener("scroll",a)};window.addEventListener("scroll",a)}}},jt=St,Ct=(a("d66f"),Object(p["a"])(jt,nt,rt,!1,null,"0b0f3580",null)),Nt=Ct.exports;n["default"].use(y["a"]);var Tt=new y["a"]({routes:[{path:"/",name:"home",component:L},{path:"/list",name:"list",component:Y},{path:"/autoCard",name:"autoCard",component:at},{path:"/news",name:"news",component:Nt}]}),It=void 0,Pt={namespaced:!0,state:{autos:JSON.parse(localStorage.getItem("autos"))?JSON.parse(localStorage.getItem("autos")):[]},mutations:{ADD_LS:function(t,e){t.autos.push(e),localStorage.setItem("autos",JSON.stringify(t.autos))},INIT_STATE:function(t){localStorage.getItem("autos")&&Object.assign(It.replaceState(t,JSON.parse(localStorage.getItem("autos"))))}},actions:{},getters:{getById:function(t){return function(e){return t.autos.find(function(t){return t.id===e})}}}};n["default"].use(D["a"]);var Et=new D["a"].Store({modules:{autoStore:Pt}});n["default"].config.productionTip=!1,new n["default"]({router:Tt,store:Et,render:function(t){return t(_)}}).$mount("#app")},5769:function(t,e,a){"use strict";var n=a("312d"),r=a.n(n);r.a},"5cb1":function(t,e,a){"use strict";var n=a("c426"),r=a.n(n);r.a},b86a:function(t,e,a){},c426:function(t,e,a){},d66f:function(t,e,a){"use strict";var n=a("b86a"),r=a.n(n);r.a},faaf:function(t,e,a){},fea1:function(t,e,a){"use strict";var n=a("faaf"),r=a.n(n);r.a}});
//# sourceMappingURL=app.a10b8e4a.js.map