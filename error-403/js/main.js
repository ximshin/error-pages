/**
 * 403 page behaviour: language switching (persisted), the language listbox and
 * the support action's toast. Loaded with `defer`, so the DOM is already parsed
 * when this runs — no inline handlers anywhere in the markup.
 */
(function () {
  "use strict";

  var STORE_KEY = "hs-err-lang";
  var TOAST_MS = 2000;

  var LANGS = window.LANGS || [];
  var I18N = window.I18N || {};

  var langHost = document.querySelector(".lang");
  var langBtn = document.getElementById("lang-trigger");
  var langMenu = document.getElementById("lang-menu");
  var langLabel = document.querySelector(".lang-label");
  var ctaBtn = document.getElementById("cta-support");
  var toastEl = document.getElementById("toast");

  /* ── state ── */
  function read(key) {
    try {
      return localStorage.getItem(key);
    } catch (err) {
      return null;
    }
  }
  function write(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (err) {
      /* private mode — the page still works, the choice just isn't kept */
    }
  }

  var lang = read(STORE_KEY);
  if (!I18N[lang]) {
    lang = "en";
  }

  function t(key) {
    return (I18N[lang] && I18N[lang][key]) || (I18N.en && I18N.en[key]) || "";
  }

  /* ── copy ── */
  function setLang(next) {
    if (!I18N[next]) {
      return;
    }
    lang = next;
    write(STORE_KEY, next);
    document.documentElement.lang = next;

    Array.prototype.forEach.call(
      document.querySelectorAll("[data-i18n]"),
      function (el) {
        el.textContent = t(el.dataset.i18n);
      },
    );

    var found =
      LANGS.filter(function (item) {
        return item.id === next;
      })[0] || LANGS[0];
    if (langLabel && found) {
      langLabel.textContent = found.name;
    }

    Array.prototype.forEach.call(
      document.querySelectorAll(".lang-opt"),
      function (opt) {
        opt.setAttribute("aria-selected", String(opt.dataset.lang === next));
      },
    );
  }

  /* ── language listbox ── */
  function openMenu() {
    langMenu.classList.add("is-open");
    langBtn.setAttribute("aria-expanded", "true");
  }
  function closeMenu() {
    langMenu.classList.remove("is-open");
    langBtn.setAttribute("aria-expanded", "false");
  }
  function isOpen() {
    return langMenu.classList.contains("is-open");
  }

  if (langBtn && langMenu) {
    langBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      if (isOpen()) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    Array.prototype.forEach.call(
      langMenu.querySelectorAll(".lang-opt"),
      function (opt) {
        opt.addEventListener("click", function () {
          setLang(opt.dataset.lang);
          closeMenu();
          langBtn.focus();
        });
      },
    );

    document.addEventListener("click", function (event) {
      if (isOpen() && !langHost.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen()) {
        closeMenu();
        langBtn.focus();
      }
    });
  }

  /* ── toast ── */
  var toastTimer;
  function toast(message) {
    if (!toastEl || !message) {
      return;
    }
    toastEl.textContent = message;
    toastEl.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("is-on");
    }, TOAST_MS);
  }

  /* ── support action ── */
  if (ctaBtn) {
    ctaBtn.addEventListener("click", function () {
      toast(t("403_toast"));
    });
  }

  setLang(lang);
})();
