/* EdgeMatrix session engine. Extracted from tools.html 2026-10-04 so the
   homepage, the tools page and a future app all run the same logic.
   Timezones are IANA city names, so daylight saving is handled by the
   browser rather than by hardcoded offsets. */
var SESSIONS = [
  { key:'sydney', name:'Sydney',   city:'Australia/Sydney', label:'AEST / AEDT', open:8, close:17, color:'#3E6FB0' },
  { key:'tokyo',  name:'Tokyo',    city:'Asia/Tokyo',       label:'JST',         open:9, close:18, color:'#7A4FA8' },
  { key:'london', name:'London',   city:'Europe/London',    label:'GMT / BST',   open:8, close:17, color:'#1DB954' },
  { key:'ny',     name:'New York', city:'America/New_York', label:'ET',          open:8, close:17, color:'#A61E2E' }
];

function partsIn(tz, d){
  var f = new Intl.DateTimeFormat('en-US', { timeZone: tz, year:'numeric', month:'2-digit', day:'2-digit',
    hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false, weekday:'short' });
  var o = {};
  f.formatToParts(d).forEach(function(p){ o[p.type] = p.value; });
  return { y:+o.year, m:+o.month, d:+o.day, H:(+o.hour)%24, M:+o.minute, S:+o.second, wd:o.weekday };
}

/* Returns the UTC ms for a given wall clock time in a timezone */
function zonedToUTC(tz, y, m, d, H, M){
  var guess = Date.UTC(y, m-1, d, H, M, 0);
  for (var i=0;i<3;i++){
    var p = partsIn(tz, new Date(guess));
    var got = Date.UTC(p.y, p.m-1, p.d, p.H, p.M, 0);
    var want = Date.UTC(y, m-1, d, H, M, 0);
    guess += (want - got);
  }
  return guess;
}

/* Session window for a session on the calendar day it is currently in */
function sessionWindow(s, now, dayShift){
  dayShift = dayShift || 0;
  var p = partsIn(s.city, new Date(now.getTime() + dayShift*86400000));
  var openMs  = zonedToUTC(s.city, p.y, p.m, p.d, s.open, 0);
  var closeMs = zonedToUTC(s.city, p.y, p.m, p.d, s.close, 0);
  var wd = new Date(openMs).getUTCDay();
  return { open:openMs, close:closeMs, cityParts:p, weekend:(p.wd==='Sat'||p.wd==='Sun') };
}

function fmtDur(ms){
  if (ms < 0) ms = 0;
  var t = Math.floor(ms/1000);
  var h = Math.floor(t/3600), m = Math.floor((t%3600)/60);
  if (h >= 24) { var d = Math.floor(h/24); return d + (d===1?' day ':' days ') + (h%24) + 'h'; }
  if (h > 0) return h + 'h ' + m + 'm';
  return m + 'm';
}
function pad(n){ return n<10 ? '0'+n : ''+n; }
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g, function(c){
  return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
function num(v){ var n = parseFloat(String(v).replace(/[^0-9.\-]/g,'')); return isNaN(n) ? null : n; }

function computeSessions(now){
  return SESSIONS.map(function(s){
    var today = sessionWindow(s, now, 0);
    var isOpen = !today.weekend && now.getTime() >= today.open && now.getTime() < today.close;
    var nextOpen = null;
    if (!isOpen){
      for (var k=0;k<8;k++){
        var w = sessionWindow(s, now, k);
        if (!w.weekend && w.open > now.getTime()){ nextOpen = w.open; break; }
      }
    }
    return { s:s, isOpen:isOpen, open:today.open, close:today.close, nextOpen:nextOpen, weekend:today.weekend };
  });
}
