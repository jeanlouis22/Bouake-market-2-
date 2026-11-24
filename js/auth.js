const $ = (id) => document.getElementById(id);
const FORMS = ["login", "register", "forgot", "newpass"];
let recovering = location.hash.includes("type=recovery");

function show(name) {
  FORMS.forEach((n) => ($("form-" + n).hidden = n !== name));
  $("tab-login").classList.toggle("on", name === "login");
  $("tab-register").classList.toggle("on", name === "register");
  $("tabs").hidden = name === "forgot" || name === "newpass";
  msg("");
}

function msg(text, type = "error") {
  const m = $("msg");
  m.textContent = text;
  m.className = "msg " + type;
  m.hidden = !text;
}

function errText(e) {
  const t = (e && e.message) || "";
  if (t.includes("Invalid login credentials")) return "Email ou mot de passe incorrect.";
  if (t.includes("Email not confirmed")) return "Veuillez d'abord confirmer votre email.";
  if (t.includes("at least")) return "Le mot de passe doit contenir au moins 6 caractères.";
  if (t.includes("rate limit")) return "Trop de tentatives. Réessayez dans quelques minutes.";
  console.error(e);
  return "Une erreur est survenue. Réessayez.";
}

async function run(btn, fn) {
  btn.disabled = true;
  try { await fn(); } catch (e) { msg(errText(e)); }
  btn.disabled = false;
}

$("form-login").addEventListener("submit", (ev) => {
  ev.preventDefault();
  run(ev.submitter, async () => {
    const { error } = await sb.auth.signInWithPassword({
      email: $("login-email").value.trim(),
      password: $("login-password").value,
    });
    if (error) throw error;
    location.href = "account.html";
  });
});

$("form-register").addEventListener("submit", (ev) => {
  ev.preventDefault();
  run(ev.submitter, async () => {
    const { data, error } = await sb.auth.signUp({
      email: $("reg-email").value.trim(),
      password: $("reg-password").value,
      options: {
        data: { full_name: $("reg-name").value.trim() },
        emailRedirectTo: new URL("account.html", location.href).href,
      },
    });
    if (error) throw error;
    if (data.user && data.user.identities && data.user.identities.length === 0) {
      return msg("Cette adresse email est déjà utilisée. Connectez-vous.");
    }
    if (data.session) { location.href = "account.html"; return; }
    msg("Compte créé. Vérifiez votre email pour confirmer votre inscription.", "ok");
  });
});

$("form-forgot").addEventListener("submit", (ev) => {
  ev.preventDefault();
  run(ev.submitter, async () => {
    const { error } = await sb.auth.resetPasswordForEmail($("forgot-email").value.trim(), {
      redirectTo: new URL("auth.html", location.href).href,
    });
    if (error) throw error;
    msg("Si cette adresse existe, un lien de réinitialisation vient d'être envoyé.", "ok");
  });
});

$("form-newpass").addEventListener("submit", (ev) => {
  ev.preventDefault();
  run(ev.submitter, async () => {
    const { error } = await sb.auth.updateUser({ password: $("new-password").value });
    if (error) throw error;
    location.href = "account.html";
  });
});

$("tab-login").onclick = () => show("login");
$("tab-register").onclick = () => show("register");
$("to-forgot").onclick = () => show("forgot");
$("back-login").onclick = () => show("login");

sb.auth.onAuthStateChange((event) => {
  if (event === "PASSWORD_RECOVERY") { recovering = true; show("newpass"); }
});

(async () => {
  if (recovering) return show("newpass");
  const { data } = await sb.auth.getSession();
  if (data.session) location.href = "account.html";
})();
