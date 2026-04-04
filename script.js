const screenColors={'home-screen':'#1a72c4','ux-screen':'#1a72c4','spotify-screen':'#191414','x-screen':'#000000','tiktok-screen':'#010101','google-screen':'#ffffff'};
const statusTextColors={'google-screen':'rgba(60,60,60,0.85)'};
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  const sb=document.querySelector('.statusbar');
  sb.style.background=screenColors[id]||'#1a72c4';
  sb.style.color=statusTextColors[id]||'rgba(255,255,255,0.85)';
  // brand label color
  sb.querySelector('.status-brand').style.color=statusTextColors[id]?'#333':'white';
}
function updateTime(){const n=new Date();let h=n.getHours(),m=n.getMinutes();const ap=h>=12?'PM':'AM';h=h%12||12;document.getElementById('status-time').textContent=h+':'+(m<10?'0'+m:m)+' '+ap;}
updateTime();setInterval(updateTime,30000);

(function(){
  const now=new Date();
  const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
  document.getElementById('home-date').textContent=days[now.getDay()]+', '+months[now.getMonth()]+' '+now.getDate();
  const h=now.getHours(),mi=now.getMinutes(),ap=h>=12?'PM':'AM',hh=h%12||12;
  document.getElementById('bubble-ts').textContent='Today · '+hh+':'+(mi<10?'0'+mi:mi)+' '+ap;
  function weatherFeel(code,temp,hour){if(code===0||code===1)return hour<12?'crisp':'sunny';if(code===2)return 'partly cloudy';if(code===3)return 'overcast';if(code===45)return 'foggy';if(code===51||code===53||code===61||code===63||code===80)return 'rainy';if(code===71||code===73||code===75)return 'snowy';if(code===95||code===96||code===99)return 'stormy';if(temp>=85)return 'warm';if(temp<=32)return 'freezing';return hour<12?'crisp':'mild';}
  fetch('https://ipapi.co/json/').then(r=>r.json()).then(geo=>{return fetch('https://api.open-meteo.com/v1/forecast?latitude='+geo.latitude+'&longitude='+geo.longitude+'&current_weather=true&temperature_unit=fahrenheit').then(r=>r.json()).then(wx=>{const temp=Math.round(wx.current_weather.temperature);document.getElementById('home-weather').textContent='a '+weatherFeel(wx.current_weather.weathercode,temp,new Date().getHours())+' '+temp+'° in '+(geo.city||'your city');});}).catch(()=>{const f=['still','quiet','quiet','quiet','quiet','quiet','crisp','crisp','bright','bright','bright','warm','warm','warm','bright','bright','golden','golden','golden','still','still','still','still','still'];document.getElementById('home-weather').textContent='a '+f[new Date().getHours()]+' one in your city';});
})();

const kbRows=[['q','w','e','r','t','y','u','i','o','p'],['a','s','d','f','g','h','j','k','l'],['⇧','z','x','c','v','b','n','m','⌫'],['123','space','↵']];
function buildStaticKB(id){
  const el=document.getElementById(id);if(!el)return;el.innerHTML='';
  kbRows.forEach(keys=>{const row=document.createElement('div');row.className='kr';keys.forEach(k=>{const b=document.createElement('div');b.className='k';b.textContent=k;if(k==='space')b.classList.add('wide');if(['⇧','⌫','123','↵'].includes(k))b.classList.add('gray');row.appendChild(b);});el.appendChild(row);});
}
['home-kb','sp-kb','x-kb','tiktok-kb','google-kb'].forEach(buildStaticKB);

(function(){
  const notifs=[
    {icon:'https://i.scdn.co/image/ab67616d0000b273229c1d98fc3cc97dc0728972',title:'Donna Summer',sub:'State of Independence is now playing on Spotify.',time:'NOW PLAYING'},
    {icon:'https://images.seeklogo.com/logo-png/39/1/new-york-times-logo-png_seeklogo-390509.png',title:'The New York Times',sub:'Keep up with the NYT on and off Twitter.',time:'PINNED · 2 min ago'},
    {icon:'https://play-lh.googleusercontent.com/nU7cR1FDCZW5HzfpenIl2g8otD04YukGH1frGO5RDRGM75Dzm4aIo2XOKQh3maWtsySzOAFx84kCj9ZEyfUF',title:'Reminder',sub:"Mary's Birthday Dinner — 7pm at Gage & Tollner.",time:'TODAY · 3 hrs away'},
    {icon:'https://img.freepik.com/premium-vector/x-new-social-network-black-app-icon-twitter-rebranded-as-x-twitter-s-logo-was-changed_277909-568.jpg?semt=ais_incoming&w=740&q=80',title:'X · Trending',sub:'"Allude" — 38K posts · AI device going viral.',time:'TRENDING · now'},
  ];
  let idx=0,flipped=false;
  const cube=document.getElementById('notif-cube');
  function setFace(face,n){face.querySelector('.notif-icon').innerHTML='<img src="'+n.icon+'" style="width:100%;height:100%;object-fit:cover;border-radius:5px;">';face.querySelector('.notif-title').textContent=n.title;face.querySelector('.notif-sub').textContent=n.sub;face.querySelector('.notif-time').textContent=n.time;}
  setFace(document.getElementById('notif-face-a'),notifs[0]);
  setInterval(()=>{idx=(idx+1)%notifs.length;if(!flipped){setFace(document.getElementById('notif-face-b'),notifs[idx]);cube.classList.add('flipped');}else{setFace(document.getElementById('notif-face-a'),notifs[idx]);cube.classList.remove('flipped');}flipped=!flipped;},3500);
})();

document.getElementById('route-btn').addEventListener('click',()=>window.open('https://www.google.com/maps/dir/Home/Gage+%26+Tollner,+Brooklyn,+NY','_blank'));
document.getElementById('bird').addEventListener('click',()=>{showScreen('ux-screen');initUX();});
document.getElementById('ux-back').addEventListener('click',()=>{showScreen('home-screen');resetUX();});
document.getElementById('spotify-btn').addEventListener('click',()=>showScreen('spotify-screen'));
document.getElementById('sp-back').addEventListener('click',()=>showScreen('home-screen'));
document.getElementById('x-back').addEventListener('click',()=>showScreen('home-screen'));
document.getElementById('tiktok-back').addEventListener('click',()=>showScreen('home-screen'));
document.getElementById('google-back').addEventListener('click',()=>showScreen('home-screen'));
document.getElementById('app-x').addEventListener('click',()=>showScreen('x-screen'));
document.getElementById('app-tiktok').addEventListener('click',()=>showScreen('tiktok-screen'));
document.getElementById('app-google').addEventListener('click',()=>showScreen('google-screen'));

/* ── SPOTIFY ── */
(function(){
  const tracks=[...document.querySelectorAll('.sp-track')];
  let ci=0,playing=false,prog=0,iv=null,audioCtx=null,osc=null;
  function fmt(s){s=Math.floor(s);return Math.floor(s/60)+':'+(s%60<10?'0':'')+s%60;}
  function setActive(i){ci=i;tracks.forEach((t,j)=>{t.classList.toggle('playing',j===i);const n=t.querySelector('.sp-t-num');if(n)n.textContent=j===i?'▶':(j+1);});document.getElementById('sp-song-name').textContent=tracks[i].dataset.title||'';document.getElementById('sp-total').textContent=fmt(parseInt(tracks[i].dataset.dur)||240);prog=0;document.getElementById('sp-fill').style.width='0%';document.getElementById('sp-cur').textContent='0:00';}
  function startAudio(){try{if(!audioCtx)audioCtx=new(window.AudioContext||window.webkitAudioContext)();if(osc){osc.stop();osc=null;}const g=audioCtx.createGain();g.gain.setValueAtTime(0.035,audioCtx.currentTime);g.connect(audioCtx.destination);osc=audioCtx.createOscillator();osc.type='sine';osc.frequency.setValueAtTime(196,audioCtx.currentTime);osc.connect(g);osc.start();}catch(e){}}
  function stopAudio(){try{if(osc){osc.stop();osc=null;}}catch(e){}}
  function startProg(){if(iv)clearInterval(iv);const dur=parseInt(tracks[ci].dataset.dur)||240;iv=setInterval(()=>{if(!playing)return;prog=Math.min(prog+(100/(dur*10)),100);document.getElementById('sp-fill').style.width=prog+'%';document.getElementById('sp-cur').textContent=fmt((prog/100)*dur);if(prog>=100){clearInterval(iv);if(ci<tracks.length-1){setActive(ci+1);if(playing)startProg();}else{playing=false;updBtn();}}},100);}
  function updBtn(){document.getElementById('sp-play-btn').innerHTML=playing?'<svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" fill="white"/><rect x="14" y="4" width="4" height="16" fill="white"/></svg>':'<svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" fill="white"/></svg>';}
  document.getElementById('sp-play-btn').addEventListener('click',()=>{playing=!playing;updBtn();if(playing){startAudio();startProg();}else{stopAudio();if(iv)clearInterval(iv);}});
  document.getElementById('sp-next').addEventListener('click',()=>{if(ci<tracks.length-1){setActive(ci+1);if(playing)startProg();}});
  document.getElementById('sp-prev').addEventListener('click',()=>{if(ci>0){setActive(ci-1);if(playing)startProg();}});
  tracks.forEach((t,i)=>{t.addEventListener('click',()=>{setActive(i);if(!playing){playing=true;updBtn();startAudio();}startProg();});});
})();

/* ══════════════════════════════════════════
   ASK ALLUDE — full rewrite with type display fix + 50-question bank
   ══════════════════════════════════════════ */
let uxInit=false;
let typed='';
function resetUX(){
  uxInit=false;
  ['cw','ts'].forEach(id=>{const e=document.getElementById(id);if(e)e.innerHTML='';});
  document.getElementById('ov').classList.remove('on');
  // reset type display
  const td=document.getElementById('type-display');
  const tt=document.getElementById('type-text');
  const tp=document.getElementById('type-placeholder');
  const tc=document.getElementById('type-cur');
  if(td)td.classList.remove('has-text');
  if(tt){tt.textContent='';tt.style.display='none';}
  if(tp){tp.style.display='inline';}
  if(tc)tc.style.display='none';
  typed='';
}

function initUX(){
  if(uxInit)return;uxInit=true;

  /* ── tweet pool ── */
  const tweets=[
    {h:'@beyoncegarden',s:'· 2m',b:"even APPLE MUSIC knows beyoncé's best work is lemonade, ICONIC 😭😭😭",img:'https://i.redd.it/yhzrkxdnxy1d1.jpeg'},
    {h:'@cnn',s:'· 1d',b:'French authorities arrested two more suspects over a foiled attack on Bank of America\'s Paris offices.',img:'https://pbs.twimg.com/media/HElPlS1XMAAWGv2?format=jpg&name=small'},
    {h:'@techfeed_x',s:'· 18m',b:'Google x X collab for a device that speaks Gen Z? About time. #Allude #AI',img:'https://res.cloudinary.com/djmffrvpg/image/upload/v1774789712/Allude-DE-Profile_pwmmol.png'},
    {h:'@ambientshift',s:'· 24m',b:'The future of AI is ambient, not screen-based. Shake to ask is the natural next step 🤝',img:'https://imageio.forbes.com/specials-images/imageserve/6978bd1826cea626081197e2/0x0.jpg?format=jpg&crop=2474,1392,x335,y75,safe&height=900&width=1600&fit=bounds'},
    {h:'@forbestech',s:'· 3h',b:"Why the next trillion-dollar hardware category won't look like a phone.",img:'https://www.neilsahota.com/wp-content/uploads/2025/11/ambient-ai-ambient-intelligence.jpg'}
  ];

  const xCards=[
    {n:'@techfeed_x · 18m',s:'Google x X collab for a device that speaks Gen Z? About time. #Allude #AI',links:[{t:'View on X →',u:'https://x.com/search?q=%23Allude'}]},
    {n:'@ambientshift · 24m',s:'The future of AI is ambient, not screen-based. Shake to ask is the natural next step 🤝',links:[{t:'View on X →',u:'https://x.com/search?q=ambient+AI'}]},
    {n:'@forbestech · 3h',s:"Why the next trillion-dollar hardware category won't look like a phone.",links:[{t:'View on X →',u:'https://x.com/search?q=AI+hardware'}]},
    {n:'@culturepulse · 6m',s:'people who open X before they open their eyes are exactly who allude was built for tbh',links:[{t:'View on X →',u:'https://x.com/search?q=Allude+device'}]},
    {n:'@verge_drops · 1h',s:'38K posts about Allude in 6 hours. the word everyone keeps using? *finally.*',links:[{t:'View on X →',u:'https://x.com/search?q=%23Allude'}]}
  ];

  const gR=[
    {n:'Ambient Computing',s:'A paradigm where computing is embedded in everyday objects, removing the need for screens.',links:[{t:'Ambient Intelligence — MIT Media Lab',u:'https://www.media.mit.edu'},{t:'Weiser — "The Computer for the 21st Century"',u:'https://www.scientificamerican.com'}]},
    {n:'Gen Z & Social Media as Information Source',s:'72% of Gen Z use social media as their primary news source. TikTok surpassed Google as a search engine for ages 18–24 in 2023.',links:[{t:'Pew Research Center — Gen Z Media Use 2024',u:'https://www.pewresearch.org'},{t:'Bloomberg — TikTok vs Google Search',u:'https://www.bloomberg.com'}]},
    {n:'Magic 8 Ball — Design Heritage',s:'Invented in 1950. The shake-to-answer model has remained culturally intuitive for 75 years — never once updated.',links:[{t:'Smithsonian — Magic 8 Ball History',u:'https://www.smithsonianmag.com'}]},
    {n:'Wearables Market 2024–2028',s:'Smart wearable devices projected to reach $380B by 2028. AI-native hardware is the fastest-growing subcategory.',links:[{t:'Grand View Research — Wearable Market',u:'https://www.grandviewresearch.com'}]}
  ];

  const quips=['ooh good one, pulling the threads…','let me shake on that real quick ✦','said the quiet part loud. one sec.','checking the cultural temperature…','interesting. give me a moment.','the internet has thoughts on this.','oh, I actually know this one.','asking my sources…','hold on, querying the hive mind…','give me two seconds…'];
  function rq(){return quips[Math.floor(Math.random()*quips.length)];}

  async function fetchWx(){
    try{
      const g=await(await fetch('https://ipapi.co/json/')).json();
      const wx=await(await fetch('https://api.open-meteo.com/v1/forecast?latitude='+g.latitude+'&longitude='+g.longitude+'&current_weather=true&temperature_unit=fahrenheit')).json();
      const c={0:'Clear ☀️',1:'Mostly clear ☀️',2:'Partly cloudy ⛅',3:'Overcast ☁️',51:'Drizzle 🌦️',61:'Rain 🌧️',71:'Snow 🌨️',95:'Thunderstorms ⛈️'};
      return(c[wx.current_weather.weathercode]||'Mild')+' in '+g.city+' — '+Math.round(wx.current_weather.temperature)+'°F right now.';
    }catch(e){return 'Weather\'s loading slow — check outside? ☁️';}
  }

  /* ══ EXPANDED 50-QUESTION QA BANK ══
     Each entry: { triggers:[], quip, a:{t,v} or {t:'rich',n,s,links} or {t:'async',fn} or {t:'xpulse'} }
     Matching: first trigger found in lowercase query wins.
  */
  const qaBank=[
    // ── GREETINGS (1-4) ──
    {triggers:['hi','hello','hey','sup','hiya','yo ','howdy'],quip:null,a:{t:'plain',v:"hey! 👋 I'm Allude — your social-native AI. Type a question or shake to pull from X or Google."}},
    {triggers:['how are you','how r u','you ok','you good','hows it going'],quip:"doing great actually —",a:{t:'plain',v:"Running smooth, pulling signals from X in real-time. Ask me anything or just shake."}},
    {triggers:['good morning','good night','goodnight','good afternoon','good evening'],quip:null,a:{t:'plain',v:"Right back at you ☀️ — what's on your mind today?"}},
    {triggers:['bye','goodbye','see you','cya','ttyl','peace','later'],quip:null,a:{t:'plain',v:"Later ✌️ — come back when the vibe hits."}},

    // ── ABOUT THE DEVICE (5-14) ──
    {triggers:['what is this','what am i','what is allude','what are you'],quip:"glad you asked —",a:{t:'rich',n:'Allude',s:"A social-native AI device. Shake ×2 for X social insights, ×3 for Google knowledge. Or just type.",links:[{t:'oogun.works — full case study',u:'https://oogun.works'}]}},
    {triggers:['how does this work','how do you work','how does it work'],quip:"okay so —",a:{t:'plain',v:"Shake twice: real-time X social data surfaces. Shake three times: Google knowledge base answers facts. Or type anything into the keyboard below."}},
    {triggers:['what can you do','what do you do','capabilities','features'],quip:"the full list —",a:{t:'rich',n:'What Allude does',s:"Real-time X social pulse · Google factual answers · Live weather · Spotify integration · Calendar awareness · App launcher.",links:[]}},
    {triggers:['help','commands','how to use','tutorial','guide'],quip:null,a:{t:'plain',v:'Try typing: "what is this", "why shake", "who made this", "market", "weather", "price", "why google", "gen z", "ambient", "magic 8" — or hit the shake button.'}},
    {triggers:['is this real','is allude real','is this a real product'],quip:"real talk —",a:{t:'plain',v:"Allude is a speculative design concept by Lola Ogunlade — fully prototyped, strategy-backed, and built as a portfolio centerpiece. Real enough to demo."}},
    {triggers:['price','cost','how much','msrp','retail'],quip:"it's not cheap, but it's not trying to be —",a:{t:'plain',v:"$199–249. Google Store + X Blue bundle. Premium positioning intentional — this is for early adopters, not everyone."}},
    {triggers:['release','come out','launch','ship','available','when can i'],quip:"the GTM plan —",a:{t:'rich',n:'Launch Strategy',s:"Announce at Google I/O as experimental hardware. Limited beta via X influencer seeding. Consumer launch Q4.",links:[]}},
    {triggers:['where to buy','buy it','purchase','google store','order'],quip:null,a:{t:'plain',v:"Direct-to-consumer through Google Store, plus an X Blue bundle deal. No third-party retail at launch — keeps the premium positioning."}},
    {triggers:['battery','charge','charging','power','battery life'],quip:null,a:{t:'plain',v:"24-hour battery life with wireless charging. The goal was full-day ambient use — no anxiety charging."}},
    {triggers:['size','dimensions','how big','compact','keychain','small'],quip:null,a:{t:'plain',v:"Keychain-sized form factor. Dual OLED displays (2.5\" main, 1.8\" secondary). Built to live in your pocket, not on your desk."}},

    // ── TECH & SPECS (15-19) ──
    {triggers:['iphone','android','ios','phone','compatible','work with'],quip:null,a:{t:'plain',v:"Bluetooth 5.0 + Wi-Fi 6 + optional LTE. Works as a standalone device or pairs with your phone. No dependency."}},
    {triggers:['spec','technical','oled','bluetooth','wifi','lte','microphone'],quip:null,a:{t:'rich',n:'Technical Specs',s:"Dual OLED (2.5\" + 1.8\") · Voice-optimized mic array · Haptic feedback · BT 5.0 · Wi-Fi 6 · LTE optional · 24hr battery · Wireless charging · Cloud sync.",links:[]}},
    {triggers:['app','apps','tiktok','instagram','platform'],quip:null,a:{t:'rich',n:'Platform Integrations',s:"Native APIs: X (real-time feed + search), TikTok, Instagram, Spotify. Google Knowledge Graph for factual queries.",links:[]}},
    {triggers:['voice','hands free','microphone','speak','talk to'],quip:"voice-first by design —",a:{t:'plain',v:"Voice-first. Hands-free browsing and social interaction while you're doing literally anything else. That's the point."}},
    {triggers:['haptic','shake mechanic','vibrate','feedback'],quip:"the shake thing is intentional —",a:{t:'plain',v:"Haptic feedback pulses on each shake count so you feel the progression: ×1 register, ×2 X unlocked, ×3 Google unlocked. No looking required."}},

    // ── PARTNERSHIPS (20-22) ──
    {triggers:['why google','google bring','google do'],quip:"two-word answer: trust infrastructure.",a:{t:'rich',n:'Google × X',s:"Google: 25 years of knowledge graph. Answers facts reliably. X: real-time cultural pulse. Together they answer both 'what's true' and 'what are people saying.'",links:[{t:'Google Knowledge Graph',u:'https://developers.google.com'}]}},
    {triggers:['why x','why twitter','twitter','x bring'],quip:"X is the signal layer —",a:{t:'plain',v:"X has the world's most real-time public conversation. No other platform surfaces trending sentiment faster. That's the data Allude taps."}},
    {triggers:['why not apple','why not siri','why not amazon','why not alexa','vs alexa','vs siri'],quip:"honest answer —",a:{t:'plain',v:"Siri and Alexa speak to individuals. Allude speaks to culture. They answer 'what time is my meeting' — Allude answers 'what is everyone talking about right now.' Different job."}},

    // ── COMPETITIVE (23-26) ──
    {triggers:['vs chatgpt','chatgpt','openai','vs claude','vs gemini','vs gpt'],quip:"different category entirely —",a:{t:'plain',v:"ChatGPT is a text interface for deep reasoning tasks. Allude is an ambient device for social-native quick context. They don't compete — different jobs, different form factors."}},
    {triggers:['vs humane','humane ai','ai pin','rabbit r1','rabbit'],quip:"the graveyard comparison —",a:{t:'rich',n:'vs. AI Pin & Rabbit R1',s:"Both struggled because they tried to replace the phone without a compelling reason. Allude doesn't replace the phone — it adds a social intelligence layer alongside it.",links:[{t:'The Verge — AI Pin review',u:'https://www.theverge.com'}]}},
    {triggers:['different from','how is this different','unique','differenti'],quip:"here's the real answer —",a:{t:'rich',n:'Key Differentiators',s:"(1) Social data as input, not just output. (2) Shake interaction = intuitive ritual. (3) Dual-screen: feed + AI. (4) Portable. No existing device does all four.",links:[]}},
    {triggers:['competitor','competition','market landscape','what else'],quip:null,a:{t:'plain',v:"Closest things: AI Pin (failed), Rabbit R1 (niche), smart earbuds (audio-only). None bridge passive social consumption with active AI assistance."}},

    // ── DESIGN PHILOSOPHY (27-31) ──
    {triggers:['why shake','shake to ask','shake gesture','shake interaction'],quip:"the tea is this —",a:{t:'plain',v:"Because tapping is transactional. Shaking is a *ritual*. The Magic 8 Ball worked for 70 years not because it was accurate — but because the gesture gave you permission to trust the answer. Allude steals that."}},
    {triggers:['magic 8','magic eight','8 ball','nostalg'],quip:"okay the magic 8 ball thing is a whole thing —",a:{t:'rich',n:'Nostalgia as Interface Design',s:"Invented 1950. Shake → answer. No tutorial needed. That learned behavior is already in everyone's body. Allude applies it to AI. 75 years of UX, no redesign required.",links:[{t:'Smithsonian — Magic 8 Ball History',u:'https://www.smithsonianmag.com'}]}},
    {triggers:['design philosophy','design thinking','why designed','design choice'],quip:"this was very intentional —",a:{t:'plain',v:"The Magic 8 Ball succeeded because it made decision-making feel playful and gave permission to trust instinct. Allude does the same for AI — removes the intimidation, adds the ritual."}},
    {triggers:['dual screen','two screen','second screen','display'],quip:null,a:{t:'plain',v:"Primary screen: social feed and AI responses. Secondary touchscreen (1.8\"): text input when voice isn't suitable. The two screens literally show you what Allude thinks AND what the internet thinks — simultaneously."}},
    {triggers:['ambient','ambient computing','ambient intelligence','background'],quip:"this is my favorite question —",a:{t:'rich',n:'Ambient Computing',s:"The future isn't more screens — it's no screens. Intelligence that surfaces when you need it, disappears when you don't. Allude is the first consumer device designed around that thesis.",links:[{t:'MIT Media Lab — Ambient Intelligence',u:'https://www.media.mit.edu'}]}},

    // ── MARKET & STRATEGY (32-37) ──
    {triggers:['who is this for','target','audience','demographic','who uses','for who'],quip:"real answer?",a:{t:'rich',n:'Target: Digital Natives, 18–38',s:"People who open X before they open their eyes. Early adopters. Anyone who already treats social feeds as information sources — Allude makes that instinct intentional.",links:[]}},
    {triggers:['market','market size','tam','market gap','opportunity','billion'],quip:"4.9 billion reasons —",a:{t:'rich',n:'4.9 billion social media users',s:"No device successfully bridges passive content consumption with intelligent assistance in a portable, social-native format. That's the gap.",links:[{t:'DataReportal — Global Social Media Stats',u:'https://datareportal.com'}]}},
    {triggers:['gen z','generation z','zoomers','young people','18-24'],quip:"this is genuinely the whole thesis —",a:{t:'rich',n:'Gen Z & Information Behavior',s:"72% of Gen Z use social media as their primary news source. TikTok surpassed Google as a search engine for 18–24s in 2023. Allude builds a device around that reality.",links:[{t:'Pew Research — Gen Z and News',u:'https://pewresearch.org'}]}},
    {triggers:['social media','social platform','feed','scrolling','scroll'],quip:"hot take incoming —",a:{t:'plain',v:"Social media is already how Gen Z researches. Allude doesn't compete with that — it upgrades it. Social feed becomes the input layer, not just entertainment."}},
    {triggers:['why now','timing','moment','now what','right time'],quip:"the window is real —",a:{t:'rich',n:'Why 2024–2025',s:"AI-native hardware is the fastest-growing wearable subcategory. First-mover advantage in social-native AI devices is still unclaimed. The Humane and Rabbit failures cleared the field without closing the category.",links:[{t:'Grand View Research — Wearable Market',u:'https://www.grandviewresearch.com'}]}},
    {triggers:['gtm','go to market','launch strategy','how to launch','distribution'],quip:"the plan —",a:{t:'rich',n:'Go-to-Market',s:"(1) Announce at Google I/O as experimental hardware. (2) X influencer beta for organic unboxing content. (3) DTC via Google Store + X Blue bundle. (4) TikTok-first campaign showing use cases.",links:[]}},

    // ── LIVE QUERIES (38-42) ──
    {triggers:['weather','forecast','temperature','raining','sunny','cold','hot outside'],quip:null,a:{t:'async',fn:fetchWx}},
    {triggers:['what time','current time','time is it'],quip:null,a:{t:'dynamic',fn:()=>{const n=new Date();let h=n.getHours(),m=n.getMinutes();const ap=h>=12?'PM':'AM';h=h%12||12;return'It\'s '+h+':'+(m<10?'0'+m:m)+' '+ap+' right now.';}}},
    {triggers:['what day','what date','today is','date today'],quip:null,a:{t:'dynamic',fn:()=>{const n=new Date();const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];const months=['January','February','March','April','May','June','July','August','September','October','November','December'];return days[n.getDay()]+', '+months[n.getMonth()]+' '+n.getDate()+'.';}}},
    {triggers:['calendar','schedule','what\'s on','reminder','birthday dinner','appointment'],quip:null,a:{t:'plain',v:"Mary's Birthday Dinner — tonight @ 7pm at Gage & Tollner, Brooklyn. Tap the route button on the home screen to get directions."}},
    {triggers:['trending','what\'s trending','what is trending','trending now','trending today'],quip:"the internet is loud right now —",a:{t:'xpulse'}},

    // ── FOUNDER & BRAND (43-47) ──
    {triggers:['who made','who built','who designed','creator','made this','who is lola','who are you','your name'],quip:"oh, that's me —",a:{t:'rich',n:'Omolola Ogunlade (Lola)',s:"Brand strategist, speculative designer, founder of Oogun.works. Allude is part of the Modern Blnd speculative design collection.",links:[{t:'oogun.works',u:'https://oogun.works'}]}},
    {triggers:['oogun','oogun.works','your portfolio','your work','your site'],quip:"founder lore incoming —",a:{t:'rich',n:'Oogun.works',s:"Understand · Make · Measure. Culture moves from margins to mainstream. Brand strategy, creative direction, and speculative product design.",links:[{t:'oogun.works',u:'https://oogun.works'}]}},
    {triggers:['afromodern','afromodernism','framework','cultural intelligence'],quip:"okay *this* is the real IP —",a:{t:'plain',v:"Afromodernism: culture moves from the margins to the mainstream. Brands that see this early win. It's the strategic framework that anchors everything at Oogun.works."}},
    {triggers:['other project','other work','heated','soulsight','modern blnd','saudade'],quip:"the full collection —",a:{t:'rich',n:'Modern Blnd — Speculative Design Collection',s:"Allude (Google × X) · Heated (IKEA × Adobe) · SoulSight (IBM × Beats). Each concept is fully prototyped with strategy, design, and market analysis.",links:[{t:'oogun.works — all projects',u:'https://oogun.works'}]}},
    {triggers:['ether','iri','iris journal','editorial','publication'],quip:null,a:{t:'plain',v:"Ether is the umbrella brand — an editorial company with multiple ventures underneath. Ìri's Journal is the flagship publication. Allude lives under the Oogun.works consultancy."}},

    // ── CASUAL / TEST INPUTS (48-50) ──
    {triggers:['test','testing','123','asdf','qwerty','hello world'],quip:null,a:{t:'plain',v:"Connection confirmed ✓ — I'm listening. Ask me something real or hit the shake button."}},
    {triggers:['lol','lmao','haha','😂','hehe','lol ok'],quip:null,a:{t:'plain',v:"😄 okay but seriously — what do you actually want to know?"}},
    {triggers:['ok','okay','sure','cool','nice','got it','makes sense','interesting'],quip:null,a:{t:'plain',v:"Good. What's next — shake for a live pulse, or type a real question."}},
  ];

  function getResp(q){
    const lq=q.toLowerCase();
    for(const entry of qaBank){
      for(const trigger of entry.triggers){
        if(lq.includes(trigger))return entry;
      }
    }
    // fallback
    return{quip:"hmm, let me check —",a:{t:'plain',v:'Scanning X and Google for "'+q+'"… found '+Math.floor(Math.random()*800+100)+' signals. Try: "why shake", "market", "weather", "who made this", "ambient", or shake ×2 for live X.'}};
  }

  /* ── tweet carousel ── */
  tweets.forEach((t,i)=>{
    const d=document.createElement('div');
    d.className='tc'+(i===0?' vis':'');
    d.innerHTML='<div class="th"><svg width="8" height="8" viewBox="0 0 24 24" fill="#1a72c4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.857L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> '+t.h+' <span>'+t.s+'</span></div><div class="tb">'+t.b+'</div>'+(t.img?'<img class="ti" src="'+t.img+'" onerror="this.remove()" alt="">':'')+'<div class="tf">View on X →</div>';
    document.getElementById('ts').appendChild(d);
  });

  let tIdx=0;
  function cycleTweet(){const cards=[...document.getElementById('ts').querySelectorAll('.tc')];if(!cards.length)return;cards[tIdx].classList.add('out');setTimeout(()=>{cards[tIdx].classList.remove('vis','out');tIdx=(tIdx+1)%cards.length;cards[tIdx].classList.add('vis');},480);}
  setInterval(cycleTweet,3800);

  const cwEl=document.getElementById('cw');
  const MAX=4;
  function prune(){const msgs=[...cwEl.querySelectorAll('.msg')];while(msgs.length>=MAX){msgs[0].classList.add('fade');const r=msgs.shift();setTimeout(()=>r.remove(),400);}}
  function addMsg(content,cls,delay=0){return new Promise(res=>{setTimeout(()=>{const el=document.createElement('div');el.className='msg '+cls;if(cls==='mr'){el.innerHTML='<div class="rn">'+content.n+'</div><div class="rs">'+content.s+'</div>'+(content.links&&content.links.length?'<div class="rlinks">'+content.links.map(l=>'<a class="rlink" href="'+l.u+'" target="_blank">'+l.t+'</a>').join('')+'</div>':'');}else{el.textContent=content;}prune();cwEl.appendChild(el);void el.offsetWidth;el.classList.add('show');cwEl.scrollTop=cwEl.scrollHeight;res(el);},delay);});}

  setTimeout(()=>addMsg("hey — what's on your mind? ask anything or just shake.",'ma',0),500);

  /* ── TYPING SYSTEM with live display ── */
  let numMode=false,caps=false;
  const tdEl=document.getElementById('type-display');
  const ttEl=document.getElementById('type-text');
  const tpEl=document.getElementById('type-placeholder');
  const tcEl=document.getElementById('type-cur');

  function updateTypeDisplay(){
    if(typed.length>0){
      tdEl.classList.add('has-text');
      ttEl.textContent=typed;
      ttEl.style.display='inline';
      tpEl.style.display='none';
      tcEl.style.display='inline-block';
    } else {
      tdEl.classList.remove('has-text');
      ttEl.textContent='';
      ttEl.style.display='none';
      tpEl.style.display='inline';
      tcEl.style.display='none';
    }
  }

  const kbEl=document.getElementById('kb');
  const kbA=[['q','w','e','r','t','y','u','i','o','p'],['a','s','d','f','g','h','j','k','l'],['⇧','z','x','c','v','b','n','m','⌫'],['123','space','↵']];
  const kbN=[['1','2','3','4','5','6','7','8','9','0'],['-','/',':',';','(',')','$','&','@','"'],['#','+','=','_','!','?','.',',','⌫'],['ABC','space','↵']];

  function buildUXKB(){
    kbEl.innerHTML='';
    (numMode?kbN:kbA).forEach(keys=>{
      const row=document.createElement('div');row.className='kr';
      keys.forEach(k=>{
        const btn=document.createElement('button');btn.className='k';
        const display=k==='⇧'?(caps?'⇧↑':'⇧'):k;
        btn.textContent=display;
        if(k==='space')btn.classList.add('wide');
        if(['⇧','⌫','123','ABC','↵'].includes(k))btn.classList.add('gray');
        if(k==='⇧'&&caps)btn.style.background='#7ab0e0';
        btn.addEventListener('mousedown',e=>{
          e.preventDefault();
          if(k==='⌫'){typed=typed.slice(0,-1);updateTypeDisplay();}
          else if(k==='space'){typed+=' ';updateTypeDisplay();}
          else if(k==='↵'){submitT();return;}
          else if(k==='123'){numMode=true;buildUXKB();return;}
          else if(k==='ABC'){numMode=false;buildUXKB();return;}
          else if(k==='⇧'){caps=!caps;buildUXKB();return;}
          else{typed+=(caps?k.toUpperCase():k);if(caps){caps=false;buildUXKB();}updateTypeDisplay();}
        });
        row.appendChild(btn);
      });
      kbEl.appendChild(row);
    });
  }
  buildUXKB();
  updateTypeDisplay();// init empty state

  async function submitT(){
    if(!typed.trim())return;
    const q=typed.trim();
    typed='';
    updateTypeDisplay();
    await addMsg(q,'mu',0);
    const{a:resp,quip}=getResp(q);
    if(quip)await addMsg(quip,'mq',300);
    const d=quip?1100:600;
    if(resp.t==='async'){resp.fn().then(r=>addMsg(r,'ma',0));}
    else if(resp.t==='dynamic'){setTimeout(()=>addMsg(resp.fn(),'ma',0),d);}
    else if(resp.t==='xpulse'){
      const xc=xCards[Math.floor(Math.random()*xCards.length)];
      setTimeout(()=>addMsg({n:xc.n,s:xc.s,links:xc.links},'mr',0),d);
      cycleTweet();
    }
    else if(resp.t==='rich'){setTimeout(()=>addMsg({n:resp.n,s:resp.s,links:resp.links||[]},'mr',0),d);}
    else{setTimeout(()=>addMsg(resp.v,'ma',0),d);}
  }

  document.getElementById('sendBtn').addEventListener('click',e=>{e.stopPropagation();submitT();});

  /* ── SHAKE / OVERLAY ── */
  let sc=0,ovOpen=false;
  function openOv(){sc=0;ovOpen=true;document.getElementById('ov').classList.add('on');document.getElementById('sct').textContent='× 0';document.getElementById('scs').textContent='hit the shake button below to count';document.getElementById('p2').classList.remove('on');document.getElementById('p3').classList.remove('on');document.getElementById('askbtn').classList.remove('ready');document.getElementById('cue').style.opacity='0.4';}
  function doShake(){
    if(sc>=3)return;sc++;
    const ringEl=document.getElementById('ring');
    ringEl.classList.remove('pop');void ringEl.offsetWidth;ringEl.classList.add('pop');
    const dev=document.getElementById('device');
    dev.style.transition='transform 0.08s';
    dev.style.transform=sc%2===0?'rotate(-2deg)':'rotate(2deg)';
    setTimeout(()=>{dev.style.transform='';},120);
    document.getElementById('sct').textContent='× '+sc;
    if(sc===1)document.getElementById('scs').textContent='one more for X insights, keep going for Google…';
    if(sc===2){document.getElementById('scs').textContent='×2 — X insights unlocked ✓';document.getElementById('p2').classList.add('on');document.getElementById('askbtn').classList.add('ready');}
    if(sc===3){document.getElementById('scs').textContent='×3 — Google facts unlocked ✓';document.getElementById('p3').classList.add('on');document.getElementById('cue').style.opacity='0';}
  }

  document.getElementById('shakeBtn').addEventListener('click',e=>{e.stopPropagation();if(!ovOpen)openOv();else doShake();});

  document.getElementById('askbtn').addEventListener('click',e=>{
    e.stopPropagation();
    ovOpen=false;
    document.getElementById('ov').classList.remove('on');
    if(sc>=3){
      const r=gR[Math.floor(Math.random()*gR.length)];
      addMsg('Google — '+r.n,'mu',0);
      setTimeout(()=>addMsg(rq(),'mq',0),350);
      setTimeout(()=>addMsg({n:r.n,s:r.s,links:r.links},'mr',0),1200);
    } else {
      const xc=xCards[Math.floor(Math.random()*xCards.length)];
      addMsg("what's X saying right now?",'mu',0);
      setTimeout(()=>addMsg(rq(),'mq',0),350);
      setTimeout(()=>addMsg({n:xc.n,s:xc.s,links:xc.links},'mr',0),1100);
      cycleTweet();
    }
    sc=0;
  });
}
