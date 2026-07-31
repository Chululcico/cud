var FIREBASE_CONFIG = {
  apiKey: "__FIREBASE_API_KEY__",
  authDomain: "__FIREBASE_AUTH_DOMAIN__",
  databaseURL: "__FIREBASE_DATABASE_URL__",
  projectId: "__FIREBASE_PROJECT_ID__",
  storageBucket: "__FIREBASE_STORAGE_BUCKET__",
  messagingSenderId: "__FIREBASE_MESSAGING_SENDER_ID__",
  appId: "__FIREBASE_APP_ID__"
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
