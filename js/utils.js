const anzhiyu={debounce:function(e,t,n){let o;return function(){const a=this,i=arguments,c=n&&!o;clearTimeout(o),o=setTimeout((function(){o=null,n||e.apply(a,i)}),t),c&&e.apply(a,i)}},throttle:function(e,t,n){let o,a,i,c=0;n||(n={});const s=function(){c=!1===n.leading?0:(new Date).getTime(),o=null,e.apply(a,i),o||(a=i=null)};return function(){const l=(new Date).getTime();c||!1!==n.leading||(c=l);const r=t-(l-c);a=this,i=arguments,r<=0||r>t?(o&&(clearTimeout(o),o=null),c=l,e.apply(a,i),o||(a=i=null)):o||!1===n.trailing||(o=setTimeout(s,r))}},sidebarPaddingR:()=>{const e=window.innerWidth,t=document.body.clientWidth;e!==t&&(document.body.style.paddingRight=e-t+"px")},snackbarShow:(e,t=!1,n=2e3)=>{const{position:o,bgLight:a,bgDark:i}=GLOBAL_CONFIG.Snackbar,c="light"===document.documentElement.getAttribute("data-theme")?a:i;document.querySelector(":root").style.setProperty("--anzhiyu-snackbar-time",n+"ms"),Snackbar.show({text:e,backgroundColor:c,showAction:t,duration:n,pos:o,customClass:"snackbar-css"})},loadComment:(e,t)=>{if("IntersectionObserver"in window){const n=new IntersectionObserver((e=>{e[0].isIntersecting&&(t(),n.disconnect())}),{threshold:[0]});n.observe(e)}else t()},scrollToDest:(e,t=500)=>{const n=window.pageYOffset;if("scrollBehavior"in document.documentElement.style)return void window.scrollTo({top:e,behavior:"smooth"});let o=null;e=+e,window.requestAnimationFrame((function a(i){o=o||i;const c=i-o;n<e?window.scrollTo(0,(e-n)*c/t+n):window.scrollTo(0,n-(n-e)*c/t),c<t?window.requestAnimationFrame(a):window.scrollTo(0,e)}))},animateIn:(e,t)=>{e.style.display="block",e.style.animation=t},animateOut:(e,t)=>{e.addEventListener("animationend",(function t(){e.style.display="",e.style.animation="",e.removeEventListener("animationend",t)})),e.style.animation=t},getParents:(e,t)=>{for(;e&&e!==document;e=e.parentNode)if(e.matches(t))return e;return null},siblings:(e,t)=>[...e.parentNode.children].filter((n=>t?n!==e&&n.matches(t):n!==e)),wrap:(e,t,n)=>{const o=document.createElement(t);for(const[e,t]of Object.entries(n))o.setAttribute(e,t);e.parentNode.insertBefore(o,e),o.appendChild(e)},unwrap:e=>{const t=e.parentNode;t!==document.body&&(t.parentNode.insertBefore(e,t),t.parentNode.removeChild(t))},isHidden:e=>0===e.offsetHeight&&0===e.offsetWidth,getEleTop:e=>{let t=e.offsetTop,n=e.offsetParent;for(;null!==n;)t+=n.offsetTop,n=n.offsetParent;return t},loadLightbox:e=>{const t=GLOBAL_CONFIG.lightbox;if("mediumZoom"===t){const t=mediumZoom(e);t.on("open",(e=>{const n="dark"===document.documentElement.getAttribute("data-theme")?"#121212":"#fff";t.update({background:n})}))}"fancybox"===t&&(e.forEach((e=>{if("A"!==e.parentNode.tagName){const t=e.dataset.lazySrc||e.src;anzhiyu.wrap(e,"a",{href:t,"data-fancybox":"gallery","data-caption":e.title||e.alt||"","data-thumb":t})}})),window.fancyboxRun||(Fancybox.bind("[data-fancybox]",{Hash:!1,Thumbs:{autoStart:!1}}),window.fancyboxRun=!0))},initJustifiedGallery:function(e){const t=e=>{anzhiyu.isHidden(e)||fjGallery(e,{itemSelector:".fj-gallery-item",rowHeight:e.getAttribute("data-rowHeight"),gutter:4,onJustify:function(){this.$container.style.opacity="1"}})};0===Array.from(e).length?t(e):e.forEach((e=>{t(e)}))},updateAnchor:e=>{if(e!==window.location.hash){e||(e=location.pathname);const t=GLOBAL_CONFIG_SITE.title;window.history.replaceState({url:location.href,title:t},t,e)}},changeThemeMetaColor:function(e){null!==themeColorMeta&&themeColorMeta.setAttribute("content",e)},initThemeColor:function(){let e=getComputedStyle(document.documentElement).getPropertyValue("--anzhiyu-bar-background").trim().replace('"',"").replace('"',"");if((window.scrollY||document.documentElement.scrollTop)>26){if(anzhiyu.is_Post()&&(e=getComputedStyle(document.documentElement).getPropertyValue("--anzhiyu-meta-theme-post-color").trim().replace('"',"").replace('"',"")),themeColorMeta.getAttribute("content")===e)return;this.changeThemeMetaColor(e)}else{if(themeColorMeta.getAttribute("content")===e)return;this.changeThemeMetaColor(e)}},switchDarkMode:()=>{const e="dark"===document.documentElement.getAttribute("data-theme")?"dark":"light",t=document.getElementById("rightMenu");"light"===e?(activateDarkMode(),saveToLocal.set("theme","dark",2),void 0!==GLOBAL_CONFIG.Snackbar&&anzhiyu.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night),t.querySelector(".menu-darkmode-text").textContent="浅色模式"):(activateLightMode(),saveToLocal.set("theme","light",2),void 0!==GLOBAL_CONFIG.Snackbar&&anzhiyu.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day),t.querySelector(".menu-darkmode-text").textContent="深色模式"),"function"==typeof runMermaid&&window.runMermaid(),rm&&rm.hideRightMenu(),anzhiyu.darkModeStatus()},is_Post:function(){return window.location.href.indexOf("/posts/")>=0},addNavBackgroundInit:function(){var e=0,t=0;$bodyWrap&&(e=$bodyWrap.scrollTop),document.documentElement&&(t=document.documentElement.scrollTop),0!=(e-t>0?e:t)&&(pageHeaderEl.classList.add("nav-fixed"),pageHeaderEl.classList.add("nav-visible"))},downloadImage:function(e,t){rm.hideRightMenu(),0==rm.downloadimging?(rm.downloadimging=!0,anzhiyu.snackbarShow("正在下载中，请稍后",!1,1e4),setTimeout((function(){let n=new Image;n.setAttribute("crossOrigin","anonymous"),n.onload=function(){let e=document.createElement("canvas");e.width=n.width,e.height=n.height,e.getContext("2d").drawImage(n,0,0,n.width,n.height);let o=e.toDataURL("image/png"),a=document.createElement("a"),i=new MouseEvent("click");a.download=t||"photo",a.href=o,a.dispatchEvent(i)},n.src=e,anzhiyu.snackbarShow("图片已添加盲水印，请遵守版权协议"),rm.downloadimging=!1}),"10000")):anzhiyu.snackbarShow("有正在进行中的下载，请稍后再试")},stopImgRightDrag:function(){for(var e=document.getElementsByTagName("img"),t=0;t<e.length;t++)e[t].addEventListener("dragstart",(function(){return!1}))},scrollTo:function(e){var t=document.querySelector(e).offsetTop;window.scrollTo(0,t-80)},hideAsideBtn:()=>{const e=document.documentElement.classList;e.contains("hide-aside")?saveToLocal.set("aside-status","show",2):saveToLocal.set("aside-status","hide",2),e.toggle("hide-aside"),e.contains("hide-aside")?document.querySelector("#consoleHideAside").classList.add("on"):document.querySelector("#consoleHideAside").classList.remove("on")},switchCommentBarrage:function(){let e=document.querySelector(".comment-barrage");e&&("block"===window.getComputedStyle(e).display?(e.style.display="none",anzhiyu.snackbarShow("✨ 已关闭评论弹幕"),document.querySelector(".menu-commentBarrage-text").textContent="显示热评",document.querySelector("#consoleCommentBarrage").classList.remove("on"),localStorage.setItem("commentBarrageSwitch","false")):(e.style.display="block",document.querySelector(".menu-commentBarrage-text").textContent="关闭热评",document.querySelector("#consoleCommentBarrage").classList.add("on"),anzhiyu.snackbarShow("✨ 已开启评论弹幕"),localStorage.removeItem("commentBarrageSwitch"))),rm.hideRightMenu()},initIndexEssay:function(){document.getElementById("bbTimeList")&&setTimeout((()=>{let e=new Swiper(".essay_bar_swiper_container",{passiveListeners:!0,direction:"vertical",loop:!0,autoplay:{disableOnInteraction:!0,delay:3e3},mousewheel:!1}),t=document.getElementById("bbtalk");null!==t&&(t.onmouseenter=function(){e.autoplay.stop()},t.onmouseleave=function(){e.autoplay.start()})}),100)},scrollByMouseWheel:function(e,t){e.addEventListener("mousewheel",(function(t){e.scrollLeft-=t.wheelDelta/2,t.preventDefault()}),{passive:!1}),t&&(t.classList.add("selected"),e.scrollLeft=t.offsetLeft-e.offsetLeft-(e.offsetWidth-t.offsetWidth)/2)},catalogActive:function(){const e=document.getElementById("catalog-list");if(e){const t=document.getElementById(decodeURIComponent(window.location.pathname));anzhiyu.scrollByMouseWheel(e,t)}},tagsPageActive:function(){const e=document.getElementById("tag-page-tags");if(e){const t=document.getElementById(decodeURIComponent(window.location.pathname));anzhiyu.scrollByMouseWheel(e,t)}},diffDate:function(e,t=!1){const n=new Date,o=new Date(e),a=n.getTime()-o.getTime(),i=36e5,c=24*i;let s;if(t){const e=a/c,t=a/i,n=a/6e4;s=a/2592e6>=1?o.toLocaleDateString().replace(/\//g,"-"):e>=1?parseInt(e)+" "+GLOBAL_CONFIG.date_suffix.day:t>=1?parseInt(t)+" "+GLOBAL_CONFIG.date_suffix.hour:n>=1?parseInt(n)+" "+GLOBAL_CONFIG.date_suffix.min:GLOBAL_CONFIG.date_suffix.just}else s=parseInt(a/c);return s},changeTimeInEssay:function(){document.querySelector("#bber")&&document.querySelectorAll("#bber time").forEach((function(e){var t=e,n=t.getAttribute("datetime");t.innerText=anzhiyu.diffDate(n,!0),t.style.display="inline"}))},changeTimeInAlbumDetail:function(){document.querySelector("#album_detail")&&document.querySelectorAll("#album_detail time").forEach((function(e){var t=e,n=t.getAttribute("datetime");t.innerText=anzhiyu.diffDate(n,!0),t.style.display="inline"}))},reflashEssayWaterFall:function(){const e=document.getElementById("waterfall");e&&setTimeout((function(){waterfall(e),e.classList.add("show")}),800)},sayhi:function(){const e=document.getElementById("author-info__sayhi");var t,n;e&&(e.innerHTML=(t=(new Date).getHours(),n="",0<=t&&t<=5?n="晚安😴":5<t&&t<=10?n="早上好👋":10<t&&t<=14?n="中午好👋":14<t&&t<=18?n="下午好👋":18<t&&t<=24&&(n="晚上好👋"),n+"！我是"))},addFriendLink(){var e=document.getElementsByClassName("el-textarea__inner")[0];if(!e)return;let t=document.createEvent("HTMLEvents");t.initEvent("input",!0,!0),e.value="昵称（请勿包含博客等字样）：\n网站地址（要求博客地址，请勿提交个人主页）：\n头像图片url（请提供尽可能清晰的图片，我会上传到我自己的图床）：\n描述：\n站点截图（可选）：\n",e.dispatchEvent(t),e.focus(),e.setSelectionRange(-1,-1)},travelling(){var e=GLOBAL_CONFIG.friends_vue_info.apiurl+"randomfriend";fetch(e).then((e=>e.json())).then((e=>{var t=e.link;Snackbar.show({text:"点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「"+e.name+"」",duration:8e3,pos:"top-center",actionText:"前往",onActionClick:function(e){e.style.opacity=0,window.open(t,"_blank")}})}))},musicToggle:function(e=!0){anzhiyu_musicFirst||(anzhiyu.musicBindEvent(),anzhiyu_musicFirst=!0);anzhiyu_musicPlaying?(navMusicEl.classList.remove("playing"),document.getElementById("menu-music-toggle").innerHTML='<i class="anzhiyufont anzhiyu-icon-play"></i><span>播放音乐</span>',document.getElementById("nav-music-hoverTips").innerHTML="音乐已暂停",document.querySelector("#consoleMusic").classList.remove("on"),anzhiyu_musicPlaying=!1,navMusicEl.classList.remove("stretch")):(navMusicEl.classList.add("playing"),document.getElementById("menu-music-toggle").innerHTML='<i class="anzhiyufont anzhiyu-icon-pause"></i><span>暂停音乐</span>',document.querySelector("#consoleMusic").classList.add("on"),anzhiyu_musicPlaying=!0,navMusicEl.classList.add("stretch")),e&&document.querySelector("#nav-music meting-js").aplayer.toggle(),rm.hideRightMenu()},musicTelescopic:function(){navMusicEl.classList.contains("stretch")?navMusicEl.classList.remove("stretch"):navMusicEl.classList.add("stretch")},musicSkipBack:function(){navMusicEl.querySelector("meting-js").aplayer.skipBack(),rm.hideRightMenu()},musicSkipForward:function(){navMusicEl.querySelector("meting-js").aplayer.skipForward(),rm.hideRightMenu()},musicGetName:function(){for(var e=document.querySelector(".aplayer-title"),t=[],n=e.length-1;n>=0;n--)t[n]=e[n].innerText;return t[0]},darkModeStatus:function(){let e="dark"===document.documentElement.getAttribute("data-theme")?"dark":"light";const t=document.querySelector(".menu-darkmode-text");t.textContent="light"===e?"深色模式":"浅色模式"},initConsoleState:function(){document.documentElement.classList.contains("hide-aside")?document.querySelector("#consoleHideAside").classList.add("on"):document.querySelector("#consoleHideAside").classList.remove("on")},rewardShowConsole:function(){consoleEl.classList.add("reward-show"),anzhiyu.initConsoleState()},showConsole:function(){document.querySelector("#console").classList.add("show"),anzhiyu.initConsoleState()},hideConsole:function(){consoleEl.classList.contains("show")?consoleEl.classList.remove("show"):consoleEl.classList.contains("reward-show")&&consoleEl.classList.remove("reward-show")},hideLoading:function(){document.getElementById("loading-box").classList.add("loaded")},cacheAndPlayMusic(){let e=localStorage.getItem("musicData");if(e){e=JSON.parse(e);if((new Date).getTime()-e.timestamp<864e5)return void anzhiyu.playMusic(e.songs)}fetch("/json/music.json").then((e=>e.json())).then((e=>{const t={timestamp:(new Date).getTime(),songs:e};localStorage.setItem("musicData",JSON.stringify(t)),anzhiyu.playMusic(e)}))},playMusic(e){const t=document.getElementById("anMusic-page").querySelector("meting-js").aplayer,n=e[Math.floor(Math.random()*e.length)],o=t.list.audios;if(selectRandomSong.includes(n.name)){let a=!1;for(;!a;){const n=e[Math.floor(Math.random()*e.length)];if(selectRandomSong.includes(n.name)||(t.list.add([n]),t.list.switch(o.length),selectRandomSong.push(n.name),a=!0),selectRandomSong.length===e.length)break}if(!a){const e=o.findIndex((e=>e.name===n.name));-1!=e&&t.list.switch(e)}}else t.list.add([n]),t.list.switch(o.length),selectRandomSong.push(n.name);console.info("已随机歌曲：",selectRandomSong,"本次随机歌曲：",n.name)},changeMusicBg:function(e=!0){const t=document.getElementById("an_music_bg");if(e){const e=document.querySelector("#anMusic-page .aplayer-pic");t.style.backgroundImage=e.style.backgroundImage,$web_container.style.background="none"}else{let e=setInterval((()=>{document.querySelector("#anMusic-page .aplayer-pic")&&(clearInterval(e),anzhiyu.addEventListenerMusic(),anzhiyu.changeMusicBg(),document.querySelector("#nav-music meting-js").aplayer&&!document.querySelector("#nav-music meting-js").aplayer.audio.paused&&anzhiyu.musicToggle())}),100)}},getCustomPlayList:function(){if(!window.location.pathname.startsWith("/music/"))return;const e=new URLSearchParams(window.location.search),t=document.getElementById("anMusic-page-meting");if(e.get("id")&&e.get("server")){const n=e.get("id"),o=e.get("server");t.innerHTML=`<meting-js id="${n}" server=${o} type="playlist" type="playlist" mutex="true" preload="auto" theme="var(--anzhiyu-main)" order="list" list-max-height="calc(100vh - 169px)!important"></meting-js>`}else t.innerHTML='<meting-js id="8152976493" server="netease" type="playlist" mutex="true" preload="auto" theme="var(--anzhiyu-main)" order="list" list-max-height="calc(100vh - 169px)!important"></meting-js>';anzhiyu.changeMusicBg(!1)},hideTodayCard:function(){if(document.getElementById("todayCard")){document.getElementById("todayCard").classList.add("hide");document.querySelector(".topGroup").querySelectorAll(".recent-post-item").forEach((e=>{e.style.display="flex"}))}},addEventListenerMusic:function(){const e=document.getElementById("anMusic-page"),t=e.querySelector(".aplayer-info .aplayer-time .aplayer-icon-menu"),n=e.querySelector("#anMusicBtnGetSong"),o=e.querySelector("#anMusicRefreshBtn"),a=e.querySelector("#anMusicSwitching"),i=e.querySelector("meting-js").aplayer;i.volume(.8,!0),i.on("loadeddata",(function(){anzhiyu.changeMusicBg()})),t.addEventListener("click",(function(){document.getElementById("menu-mask").style.display="block",document.getElementById("menu-mask").style.animation="0.5s ease 0s 1 normal none running to_show",e.querySelector(".aplayer.aplayer-withlist .aplayer-list").style.opacity="1"})),document.getElementById("menu-mask").addEventListener("click",(function t(){"/music/"==window.location.pathname?e.querySelector(".aplayer-list").classList.remove("aplayer-list-hide"):document.getElementById("menu-mask").removeEventListener("click",t)})),n.addEventListener("click",(()=>{if(changeMusicListFlag){const e=document.getElementById("anMusic-page").querySelector("meting-js").aplayer,t=e.list.audios,n=Math.floor(Math.random()*t.length);e.list.switch(n)}else anzhiyu.cacheAndPlayMusic()})),o.addEventListener("click",(()=>{localStorage.removeItem("musicData"),anzhiyu.snackbarShow("已移除相关缓存歌曲")})),a.addEventListener("click",(()=>{anzhiyu.changeMusicList()})),document.addEventListener("keydown",(function(e){"Space"===e.code&&(e.preventDefault(),i.toggle()),39===e.keyCode&&(e.preventDefault(),i.skipForward()),37===e.keyCode&&(e.preventDefault(),i.skipBack()),38===e.keyCode&&musicVolume<=1&&(musicVolume+=.1,i.volume(musicVolume,!0)),40===e.keyCode&&musicVolume>=0&&(musicVolume+=-.1,i.volume(musicVolume,!0))}))},changeMusicList:async function(){const e=document.getElementById("anMusic-page").querySelector("meting-js").aplayer,t=(new Date).getTime(),n=JSON.parse(localStorage.getItem("musicData"))||{timestamp:0};let o=[];if(changeMusicListFlag)o=defaultPlayMusicList;else if(defaultPlayMusicList=e.list.audios,t-n.timestamp<864e5)o=n.songs;else{const e=await fetch("/json/music.json");o=await e.json(),n.timestamp=t,n.songs=o,localStorage.setItem("musicData",JSON.stringify(n))}e.list.clear(),e.list.add(o),changeMusicListFlag=!changeMusicListFlag},addEventListenerConsoleMusicList:function(){const e=document.getElementById("nav-music");e&&e.addEventListener("click",(t=>{const n=e.querySelector(".aplayer-list"),o=e.querySelector("div.aplayer-info > div.aplayer-controller > div.aplayer-time.aplayer-time-narrow > button.aplayer-icon.aplayer-icon-menu svg");t.target!=o&&n.classList.contains("aplayer-list-hide")&&n.classList.remove("aplayer-list-hide")}))},toPage:function(){var e=document.getElementById("toPageText"),t=document.getElementById("toPageButton"),n=document.querySelectorAll(".page-number"),o=+n[n.length-1].innerHTML,a=+e.value;!isNaN(a)&&a>=1&&Number.isInteger(a)?t.href=1===a?"/":"/page/"+(a>o?o:a)+"/":t.href="javascript:void(0);"},removeBodyPaceClass:function(){document.body.className="pace-done"},setValueToBodyType:function(){const e=document.getElementById("page-type");document.body.dataset.type=e.value},addRandomCommentInfo:function(){const e=`${adjectives[Math.floor(Math.random()*adjectives.length)]}${vegetablesAndFruits[Math.floor(Math.random()*vegetablesAndFruits.length)]}`;!function(){for(var t=["#author","input[name='comname']","#inpName","input[name='author']","#ds-dialog-name","#name","input[name='nick']","#comment_author"],n=["#mail","#email","input[name='commail']","#inpEmail","input[name='email']","#ds-dialog-email","input[name='mail']","#comment_email"],o=0;o<t.length;o++){var a=document.querySelector(t[o]);if(null!=a){a.value=e,a.dispatchEvent(new Event("input")),a.dispatchEvent(new Event("change"));break}}for(var i=0;i<n.length;i++){var c=document.querySelector(n[i]);if(null!=c){c.value=visitorMail,c.dispatchEvent(new Event("input")),c.dispatchEvent(new Event("change"));break}}}();var t=document.getElementsByClassName("el-textarea__inner")[0];t.focus(),t.setSelectionRange(-1,-1)},totraveling:function(){anzhiyu.snackbarShow("即将跳转到「开往」项目的成员博客，不保证跳转网站的安全性和可用性",!1,5e3),setTimeout((function(){window.open("https://www.travellings.cn/go.html")}),"5000")},replaceAll:function(e,t,n){return e.split(t).join(n)},musicBindEvent:function(){document.querySelector("#nav-music .aplayer-music").addEventListener("click",(function(){anzhiyu.musicTelescopic()})),document.querySelector("#nav-music .aplayer-button").addEventListener("click",(function(){anzhiyu.musicToggle(!1)}))},hasMobile:function(){let e=!1;return(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)||document.body.clientWidth<800)&&(e=!0),e},qrcodeCreate:function(){if(document.getElementById("qrcode")){document.getElementById("qrcode").innerHTML="";new QRCode(document.getElementById("qrcode"),{text:window.location.href,width:250,height:250,colorDark:"#000",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.H})}},isInViewPortOfOne:function(e){if(!e)return;const t=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;return e.offsetTop-document.documentElement.scrollTop<=t},addRewardMask:function(){document.querySelector(".reward-main")&&(document.querySelector(".reward-main").style.display="flex",document.querySelector(".reward-main").style.zIndex="102",document.getElementById("quit-box").style.display="flex")},removeRewardMask:function(){document.querySelector(".reward-main")&&(document.querySelector(".reward-main").style.display="none",document.getElementById("quit-box").style.display="none")},keyboardToggle:function(){const e=anzhiyu_keyboard;if(e){document.querySelector("#consoleKeyboard").classList.remove("on"),anzhiyu_keyboard=!1}else{document.querySelector("#consoleKeyboard").classList.add("on"),anzhiyu_keyboard=!0}localStorage.setItem("keyboardToggle",e?"false":"true")},rightMenuToggle:function(){window.oncontextmenu?window.oncontextmenu=null:!window.oncontextmenu&&oncontextmenuFunction&&(window.oncontextmenu=oncontextmenuFunction)},intersectionObserver:function(e,t){let n;return()=>(n?n.disconnect():n=new IntersectionObserver((n=>{n.forEach((n=>{n.intersectionRatio>0?e?.():t?.()}))})),n)},scrollCategoryBarToRight:function(){const e=document.getElementById("catalog-list"),t=document.getElementById("category-bar-next");if(e&&t){const n=e.clientWidth;e.scrollLeft+e.clientWidth+1>=e.scrollWidth?(e.scroll({left:0,behavior:"smooth"}),t.innerHTML='<i class="anzhiyufont anzhiyu-icon-angle-double-right"></i>'):e.scrollBy({left:n,behavior:"smooth"})}else console.error("Element(s) not found: 'catalog-list' and/or 'category-bar-next'.")},categoriesBarActive:function(){const e=decodeURIComponent(window.location.pathname),t=document.getElementById("category-bar");if(t)if("/"===e)t.querySelector("#首页").classList.add("select");else{if(!/\/categories\/.*?\//.test(e))return;const n=e.split("/")[2];t.querySelector("#"+n).classList.add("select")}},topCategoriesBarScroll:function(){const e=document.getElementById("category-bar-items");e&&e.addEventListener("mousewheel",(function(e){this.scrollLeft+=-e.wheelDelta/2,e.preventDefault()}))}};