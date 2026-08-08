/* EdgeMatrix social proof popup — shows REAL members only. No fake timestamps. */
(function () {
  var css =
    "#em-sp-wrap{position:fixed;left:20px;bottom:20px;z-index:99999;pointer-events:none;font-family:Arial,Helvetica,sans-serif;}" +
    ".em-sp{position:relative;pointer-events:auto;display:flex;align-items:center;gap:12px;background:#1A1A1D;color:#E8E8EC;border:1px solid rgba(212,43,64,0.35);border-radius:10px;padding:12px 32px 12px 12px;box-shadow:0 10px 34px rgba(0,0,0,0.45);max-width:300px;transform:translateY(24px);opacity:0;transition:opacity .4s ease,transform .4s ease;}" +
    ".em-sp.show{opacity:1;transform:translateY(0);}" +
    ".em-sp-av{width:40px;height:40px;border-radius:50%;background:#D42B40;color:#fff;font-weight:700;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;}" +
    ".em-sp-name{font-size:13.5px;font-weight:600;line-height:1.3;}" +
    ".em-sp-sub{font-size:11.5px;color:#8A8A93;margin-top:2px;}" +
    ".em-sp-sub b{color:#2E8B57;font-weight:600;}" +
    ".em-sp-x{position:absolute;top:7px;right:10px;color:#5B5B64;font-size:15px;cursor:pointer;line-height:1;}" +
    ".em-sp-x:hover{color:#E8E8EC;}" +
    "@media(max-width:520px){#em-sp-wrap{left:10px;right:10px;bottom:10px;}.em-sp{max-width:none;}}";
  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  var wrap = document.createElement("div");
  wrap.id = "em-sp-wrap";
  document.body.appendChild(wrap);

  // Real members + real free-trial starters (Nicks' own test account excluded). Update as signups grow.
  var members = [
    { n: "Willy S.", h: "joined EdgeMatrix Pro", p: "Lifetime member" },
    { n: "Leandro P.", h: "joined EdgeMatrix Pro", p: "Lifetime member" },
    { n: "Leroy P.", h: "joined EdgeMatrix Pro", p: "Lifetime member" },
    { n: "Lesley F.", h: "joined EdgeMatrix Pro", p: "Lifetime member" },
    { n: "Vyacheslav M.", h: "joined EdgeMatrix Pro", p: "Pro member" },
    { n: "Sukhchain S.", h: "joined EdgeMatrix Pro", p: "Pro member" },
    { n: "Judah O.", h: "joined EdgeMatrix Pro", p: "Pro member" },
    { n: "Christian D.", h: "joined EdgeMatrix Pro", p: "Pro member" },
    { n: "Bryan G.", h: "joined EdgeMatrix Pro", p: "Pro member" },
    { n: "Luis A.", h: "started a 7-day free trial", p: "Free trial" },
    { n: "Emilis", h: "started a 7-day free trial", p: "Free trial" },
    { n: "Christian G.", h: "started a 7-day free trial", p: "Free trial" },
    { n: "Adebanjo O.", h: "started a 7-day free trial", p: "Free trial" },
    { n: "Julio C.", h: "started a 7-day free trial", p: "Free trial" },
    { n: "Anmol S.", h: "started a 7-day free trial", p: "Free trial" }
  ];
  for (var i = members.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = members[i]; members[i] = members[j]; members[j] = t;
  }

  var idx = 0, dismissed = false;
  function show() {
    if (dismissed) return;
    var m = members[idx % members.length]; idx++;
    var card = document.createElement("div");
    card.className = "em-sp";
    card.innerHTML =
      '<div class="em-sp-x">&times;</div>' +
      '<div class="em-sp-av">' + m.n.charAt(0) + "</div>" +
      '<div><div class="em-sp-name">' + m.n + " " + m.h + "</div>" +
      '<div class="em-sp-sub"><b>&#10003; Verified</b> &middot; ' + m.p + "</div></div>";
    wrap.appendChild(card);
    requestAnimationFrame(function () { card.classList.add("show"); });
    function hide() {
      card.classList.remove("show");
      setTimeout(function () { if (card.parentNode) card.parentNode.removeChild(card); }, 450);
    }
    card.querySelector(".em-sp-x").addEventListener("click", function () { dismissed = true; hide(); });
    setTimeout(hide, 6000);
    setTimeout(show, 48000 + Math.random() * 22000); // next in ~48-70s
  }
  setTimeout(show, 5000); // first at 5s
})();
