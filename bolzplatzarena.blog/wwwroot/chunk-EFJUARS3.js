import{Bb as v,Ib as f,c as m,ea as d,ob as c,pb as p,xb as g}from"./chunk-PKKRECOV.js";var q=(()=>{class n{playSound(){return m(this,null,function*(){let t=["sine","sawtooth","square","triangle"],u=["Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.","Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.","Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.","Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat."].map((r,e)=>new Promise(y=>{setTimeout(()=>{this.playStringsAsSound(r.split(" "),t[e],e).then(()=>y)},e*150)}));yield Promise.all(u)})}playStringsAsSound(s,t,l){return m(this,null,function*(){let i=new AudioContext,o=i.createOscillator(),a=i.createGain();o.type=t,o.connect(a),a.connect(i.destination),o.start();for(let u of s){a.gain.exponentialRampToValueAtTime(1,i.currentTime);let r=0;for(let e=0;e<u.length;e++)r+=2*u.charCodeAt(e);try{o.frequency.value=r,a.gain.exponentialRampToValueAtTime(1e-5,i.currentTime+2.45)}catch{}yield new Promise(e=>{setTimeout(()=>e(),2600)})}})}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=d({type:n,selectors:[["app-sound"]],standalone:!0,features:[f],decls:2,vars:0,consts:[["type","submit",1,"bg-blue-500","text-white","font-bold","py-2","px-4","rounded",3,"click"]],template:function(t,l){t&1&&(c(0,"button",0),g("click",function(){return l.playSound()}),v(1,` Sound abspielen
`),p())},encapsulation:2,changeDetection:0})}return n})();export{q as SoundBlockComponent};
