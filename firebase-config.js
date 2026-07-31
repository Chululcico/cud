var FIREBASE_CONFIG = {
  apiKey: "AIzaSyCu4Dq7jTvo5apze05QEB9WCXImukwk59c",
  authDomain: "cudibi-c606e.firebaseapp.com",
  databaseURL: "https://cudibi-c606e-default-rtdb.firebaseio.com",
  projectId: "cudibi-c606e",
  storageBucket: "cudibi-c606e.firebasestorage.app",
  messagingSenderId: "1061130431092",
  appId: "1:1061130431092:web:fee8b08ac4313626ef3f21"
};

var db = null;
var auth = null;
try {
  if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
  db = firebase.database();
  auth = firebase.auth();
} catch(e) { console.warn('Firebase no disponible — modo offline localStorage'); }

function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
function escAttr(s) { return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function escapeHTML(str) { return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

var CACHE_VER = 3;
function cacheSet(key, val) { try { localStorage.setItem(key + '_v' + CACHE_VER, JSON.stringify(val)); } catch(e){} }
function cacheGet(key, def) { try { var r = localStorage.getItem(key + '_v' + CACHE_VER); return r ? JSON.parse(r) : def; } catch(e) { return def; } }
// clear old unversioned caches
try { ['cud_gallery_cache','cud_reviews_cache','cud_sponsors_cache','cud_config_cache','cud_gallery_fb','cud_sponsors_fb'].forEach(function(k){ localStorage.removeItem(k); }); } catch(e){}
