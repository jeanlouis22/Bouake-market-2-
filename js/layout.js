/* En-tête, barre du bas et pied de page partagés par toutes les pages de Market Bouaké. */
(function () {
  var NAV = [
    ["Accueil", "index.html", "accueil"],
    ["Marketplace"], ["Publicités"], ["Offres d'emploi"], ["Résidences"], ["Hôtels"]
  ];
  var EXTRA = [["À propos", "a-propos.html", "apropos"], ["Contact", "contact.html", "contact"]];

  var COLS = [
    ["Découvrir", ["Accueil|index.html", "Marketplace", "Boutiques", "Publicités", "Promotions", "Événements à venir", "Offres d'emploi", "Résidences", "Hôtels", "À propos|a-propos.html"]],
    ["Espace acheteur", ["Comment acheter ?", "Devenir acheteur|auth.html", "Livraison et paiement", "Suivre mes commandes"]],
    ["Espace vendeur", ["Devenir vendeur", "Comment vendre ?", "Guide du vendeur", "Ma boutique", "Frais de livraison", "Règles de publication des produits"]],
    ["Espace professionnel", ["Devenir professionnel", "Espace professionnel", "Publier une résidence ou une maison à louer", "Guide des professionnels", "Gérer les demandes de réservation"]],
    ["Emploi et stages", ["Consulter les offres", "Comment postuler ?", "Comment publier une offre ?", "Conditions de publication", "Espace candidat"]],
    ["Publicités", ["Découvrir les publicités", "Demander une publicité", "Guide publicitaire", "Tarifs publicitaires", "Formats et conditions"]],
    ["Aide et contact", ["Centre d'aide", "Nous contacter|contact.html", "Signaler un problème", "Questions fréquentes", "Conseils de sécurité"]],
    ["Informations légales", ["Conditions générales d'utilisation", "Politique de confidentialité", "Politique relative aux cookies", "Mentions légales", "Règles de publication"]]
  ];

  var page = document.body.getAttribute("data-page") || "";

  function link(label, href, key) {
    var cur = key && key === page ? ' aria-current="page"' : "";
    if (href) return '<a href="' + href + '"' + cur + ">" + label + "</a>";
    return '<a href="#" data-soon="' + label + '">' + label + "</a>";
  }

  var nav = NAV.map(function (n) { return link(n[0], n[1], n[2]); }).join("");
  var extra = EXTRA.map(function (n) { return link(n[0], n[1], n[2]); }).join("");
  var extraMobile = EXTRA.map(function (n) {
    var cur = n[2] === page ? ' aria-current="page"' : "";
    return '<a class="only-mobile" href="' + n[1] + '"' + cur + ">" + n[0] + "</a>";
  }).join("");

  var ICON_MENU = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
  var ICON_SEARCH = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>';
  var ICON_CART = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.5 12.5h11L21 7H6"/></svg>';
  var ICON_HOME = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11l8-7 8 7"/><path d="M6 10v10h12V10"/><path d="M10 20v-6h4v6"/></svg>';
  var ICON_ADS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h3l7 4V6L7 10z"/><path d="M17 9a4 4 0 0 1 0 6"/></svg>';
  var ICON_JOBS = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/></svg>';
  var ICON_USER = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>';

  var headerHTML =
    '<div class="topbar"><div class="container">' + extra + "</div></div>" +
    '<header class="site-header">' +
      '<div class="container hbar">' +
        '<button class="icon-btn burger" id="burger" type="button" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="nav">' + ICON_MENU + "</button>" +
        '<a class="logo" href="index.html" aria-label="Market Bouaké, accueil"><img src="assets/logo/logo-compact.svg" alt="Market Bouaké"></a>' +
        '<nav class="main-nav" id="nav" aria-label="Navigation principale">' + nav + extraMobile +
          '<div class="navauth only-narrow" id="navauth"><a href="auth.html">Connexion</a><a href="auth.html">Inscription</a></div>' +
        "</nav>" +
        '<div class="hactions">' +
          '<button class="icon-btn" type="button" data-soon="Le panier" aria-label="Panier">' + ICON_CART + "</button>" +
          '<div class="hauth" id="hauth"><a class="hbtn line" href="auth.html">Connexion</a><a class="hbtn fill" href="auth.html">Inscription</a></div>' +
        "</div>" +
      "</div>" +
      '<div class="container searchrow"><form id="searchform" role="search">' +
        '<input type="search" id="q" placeholder="Rechercher un produit…" aria-label="Rechercher">' +
        '<button class="icon-btn" type="submit" aria-label="Lancer la recherche">' + ICON_SEARCH + "</button>" +
      "</form></div>" +
    "</header>";

  var cols = COLS.map(function (c) {
    var items = c[1].map(function (it) {
      var p = it.split("|");
      return "<li>" + link(p[0], p[1]) + "</li>";
    }).join("");
    return '<details class="f-col"><summary>' + c[0] + "</summary><ul>" + items + "</ul></details>";
  }).join("");

  var footerHTML =
    '<footer class="site-footer"><div class="container">' +
      '<div class="f-brand">' +
        '<img src="assets/logo/logo-sombre.svg" alt="Market Bouaké">' +
        "<p>Marketplace locale de Bouaké.</p>" +
        "<p>Achetez, vendez, trouvez un logement ou une offre d'emploi près de chez vous.</p>" +
        '<div class="f-social" id="fsocial" hidden></div>' +
      "</div>" +
      '<div class="f-cols">' + cols + "</div>" +
      '<div class="f-bottom">© ' + new Date().getFullYear() + " Market Bouaké — Tous droits réservés.</div>" +
    "</div></footer>";

  var accountCur = (page === "connexion" || page === "compte") ? ' aria-current="page"' : "";
  var homeCur = page === "accueil" ? ' aria-current="page"' : "";
  var bottomHTML =
    '<nav class="bottomnav" aria-label="Navigation du bas">' +
      '<a href="index.html"' + homeCur + ">" + ICON_HOME + "Accueil</a>" +
      '<a href="#" data-soon="Publicités">' + ICON_ADS + "Publicités</a>" +
      '<a href="#" data-soon="Offres d\'emploi">' + ICON_JOBS + "Emplois</a>" +
      '<button type="button" id="acctbtn" aria-haspopup="dialog"' + accountCur + ">" + ICON_USER + "Compte</button>" +
    "</nav>" +
    '<div class="sheet" id="sheet" hidden role="dialog" aria-modal="true" aria-label="Compte">' +
      '<div class="sheet-bg" id="sheetbg"></div><div class="sheet-card" id="sheetcard"></div>' +
    "</div>";

  var h = document.getElementById("site-header");
  var f = document.getElementById("site-footer");
  if (h) h.innerHTML = headerHTML;
  if (f) f.innerHTML = footerHTML;
  document.body.insertAdjacentHTML("beforeend", bottomHTML);

  var toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  document.body.appendChild(toast);
  var timer;
  function say(text) {
    toast.textContent = text;
    toast.classList.add("show");
    clearTimeout(timer);
    timer = setTimeout(function () { toast.classList.remove("show"); }, 2500);
  }

  var sheet = document.getElementById("sheet");
  var sheetCard = document.getElementById("sheetcard");
  function closeSheet() { sheet.hidden = true; }
  function openSheet() { sheet.hidden = false; }

  document.addEventListener("click", function (ev) {
    var el = ev.target.closest("[data-soon]");
    if (!el) return;
    ev.preventDefault();
    say(el.getAttribute("data-soon") + " : bientôt disponible.");
  });

  document.getElementById("acctbtn").addEventListener("click", openSheet);
  document.getElementById("sheetbg").addEventListener("click", closeSheet);
  sheetCard.addEventListener("click", function (ev) {
    if (ev.target.closest("a")) closeSheet();
  });
  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape") closeSheet();
  });

  function sheetLink(label, href, soon) {
    var a = document.createElement("a");
    a.href = href;
    a.textContent = label;
    if (soon) a.setAttribute("data-soon", label);
    return a;
  }

  function renderSheet(session) {
    sheetCard.textContent = "";
    var t = document.createElement("div");
    t.className = "sheet-title";
    t.textContent = session ? "Mon espace" : "Bienvenue";
    sheetCard.appendChild(t);
    if (session) {
      sheetCard.appendChild(sheetLink("Mon compte", "account.html"));
      var out = document.createElement("button");
      out.type = "button";
      out.className = "sbtn danger";
      out.textContent = "Se déconnecter";
      out.addEventListener("click", async function () {
        await sb.auth.signOut();
        location.href = "index.html";
      });
      sheetCard.appendChild(out);
    } else {
      sheetCard.appendChild(sheetLink("Connexion", "auth.html"));
      sheetCard.appendChild(sheetLink("Inscription", "auth.html"));
    }
    sheetCard.appendChild(sheetLink("À propos", "a-propos.html"));
    sheetCard.appendChild(sheetLink("Contact", "contact.html"));
  }
  renderSheet(null);

  var burger = document.getElementById("burger");
  var navEl = document.getElementById("nav");
  if (burger && navEl) {
    burger.addEventListener("click", function () {
      var open = navEl.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    });
  }

  var form = document.getElementById("searchform");
  if (form) form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    say("La recherche : bientôt disponible.");
  });

  function syncFooter() {
    var wide = window.matchMedia("(min-width:760px)").matches;
    document.querySelectorAll(".f-col").forEach(function (d) { d.open = wide; });
  }
  syncFooter();
  window.addEventListener("resize", syncFooter);

  /* Utilitaires : ne produisent un lien que si la valeur est valide. */
  var UTIL = {
    wa: function (v) {
      var d = String(v || "").replace(/[^\d]/g, "");
      return d.length >= 8 && d.length <= 15 ? "https://wa.me/" + d : null;
    },
    mail: function (v) {
      v = String(v || "").trim();
      return /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(v) ? "mailto:" + v : null;
    },
    tel: function (v) {
      var t = String(v || "").replace(/[^\d+]/g, "");
      return /^\+?\d{8,15}$/.test(t) ? "tel:" + t : null;
    },
    url: function (v) {
      v = String(v || "").trim();
      return /^https:\/\/[^\s<>"]+$/.test(v) ? v : null;
    }
  };
  window.MB_UTIL = UTIL;

  /* Réglages publics du site (coordonnées, réseaux sociaux), gérés par l'administration. */
  window.MB_SETTINGS = (async function () {
    try {
      var r = await sb.from("site_settings").select("key,value");
      if (r.error) throw r.error;
      var m = {};
      (r.data || []).forEach(function (x) {
        if (x.value && String(x.value).trim()) m[x.key] = String(x.value).trim();
      });
      return m;
    } catch (e) {
      console.error(e);
      return {};
    }
  })();

  window.MB_SETTINGS.then(function (S) {
    var box = document.getElementById("fsocial");
    if (!box) return;
    var items = [
      ["Facebook", UTIL.url(S.social_facebook)],
      ["TikTok", UTIL.url(S.social_tiktok)],
      ["Instagram", UTIL.url(S.social_instagram)],
      ["WhatsApp", UTIL.wa(S.social_whatsapp)]
    ].filter(function (i) { return i[1]; });
    if (!items.length) return;
    items.forEach(function (i) {
      var a = document.createElement("a");
      a.href = i[1];
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = i[0];
      box.appendChild(a);
    });
    box.hidden = false;
  });

  /* Session de l'utilisateur, partagée avec les pages. */
  window.MB_SESSION = (async function () {
    try {
      var r = await sb.auth.getSession();
      return r.data.session;
    } catch (e) {
      console.error(e);
      return null;
    }
  })();

  window.MB_SESSION.then(function (session) {
    if (!session) return;
    renderSheet(session);
    var hauth = document.getElementById("hauth");
    if (hauth) {
      hauth.textContent = "";
      var a = document.createElement("a");
      a.className = "hbtn fill";
      a.href = "account.html";
      a.textContent = "Mon compte";
      hauth.appendChild(a);
    }
    var na = document.getElementById("navauth");
    if (na) {
      na.textContent = "";
      var m = document.createElement("a");
      m.href = "account.html";
      m.textContent = "Mon compte";
      var b = document.createElement("button");
      b.type = "button";
      b.className = "navbtn";
      b.textContent = "Se déconnecter";
      b.addEventListener("click", async function () {
        await sb.auth.signOut();
        location.href = "index.html";
      });
      na.append(m, b);
    }
  });
})();
