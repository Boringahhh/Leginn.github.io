var posts=["post/1.html","post/6.html","post/56547.html","post/4.html","post/3.html","post/5.html","post/2.html"];function toRandomPost(){pjax.loadUrl("/"+posts[Math.floor(Math.random()*posts.length)])}var friend_link_list=[{name:"Adil",hundredSuffix:"",link:"https://blog.adil.com.cn",avatar:"https://tucdn.wpon.cn/2023/04/06/15dbbb2004b44.jpg",descr:"BW/HANA顾问,BI工程师,数据分析师,数据科学家。",siteshot:"https://tucdn.wpon.cn/2023/04/06/126fba2e88c54.png"},{name:"Cartafi",link:"https://www.startly.cn",avatar:"https://startly.s3.bitiful.net/links/avatar/avatar.webp",descr:"互联网中的寂静之地",siteshot:"https://startly.s3.bitiful.net/links/avatar/siteshot.webp"},{name:"Tianlin_Zz",link:"https://linjiangyu.com",avatar:"https://cdn1.tianli0.top/gh/linjiangyu2/halo/img/fa.jpg",descr:"这世界温暖的人如树一样多 我也想成为其中的一颗"},{name:"Mxne",link:"https://blog.mxne.cn/",avatar:"https://bu.dusays.com/2023/02/05/63df7de56a470.webp",descr:"学如逆水行舟，不进则退。"},{name:"Rootlex",link:"https://blog.nalex.top",avatar:"https://bu.dusays.com/2023/01/25/63d130a6ce9ea.jpg",descr:"古今之成大事者，不惟有超世之才，亦必有坚忍不拔之志"},{name:"青桔气球",link:"https://blog.qjqq.cn/",avatar:"https://avatar.iftft.com/1/646cdb372913c.webp!avatar",descr:"分享网络安全与科技生活"},{name:"铭心石刻",link:"https://blog.kouseki.cn/",avatar:"https://blog.kouseki.cn/imgs/avatar.webp",descr:"愿岁并谢，与友长兮"},{name:"SimpleFish",hundredSuffix:"",link:"http://sss.cool/getChineseId/",avatar:"https://sss.cool/getChineseId/favicon.ico",descr:"这是一个简单的计算ID数值号平台。"},{name:"安心",hundredSuffix:"",link:"https://lookanxin.cc/",avatar:"https://img1.imgtp.com/2023/05/14/YpgQ3ffc.jpg",descr:"Coolanxin"}],refreshNum=1;function addFriendLinksInFooter(){var t=document.getElementById("footer-random-friends-btn");if(!t)return;t.style.opacity="0.2",t.style.transitionDuration="0.3s",t.style.transform="rotate("+360*refreshNum+++"deg)";const a=[];let n=0;for(;friend_link_list.length&&n<3;){const t=Math.floor(Math.random()*friend_link_list.length),{name:e,link:s,avatar:o}=friend_link_list.splice(t,1)[0];a.push({name:e,link:s,avatar:o}),n++}let e=a.map((({name:t,link:a})=>"<a class='footer-item' href='"+a+"' target='_blank' rel='noopener nofollow'>"+t+"</a>")).join("");e+="<a class='footer-item' href='/link/'>更多</a>",document.getElementById("friend-links-in-footer").innerHTML=e,setTimeout((()=>{t.style.opacity="1"}),300)}