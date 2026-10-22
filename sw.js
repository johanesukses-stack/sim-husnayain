/* =====================================================================
   Service worker — Pintu Aplikasi SIM MI Husnayain Sleman
   ---------------------------------------------------------------------
   - Menyimpan "kulit" aplikasi (halaman pintu, ikon, manifest) supaya
     aplikasi tetap terbuka walau sinyal hilang (lalu menampilkan pesan
     "Tidak ada koneksi" yang rapi, bukan layar dinosaurus Chrome).
   - Data SIM sendiri TIDAK disimpan di sini: SIM selalu diambil langsung
     dari Google (script.google.com), jadi data selalu yang terbaru.
   - Naikkan VERSI setiap kali isi folder pintu-aplikasi diubah.
   ===================================================================== */
var VERSI = 'sim-pintu-v1';
var CACHE_FONT = 'sim-pintu-font-v1';
var INTI = [
  './',
  './index.html',
  './config.js',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/favicon.ico',
  './icons/favicon-64.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-192.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(VERSI)
      .then(function (cache) { return cache.addAll(INTI); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (kunci) {
      return Promise.all(kunci.filter(function (k) {
        return k.indexOf('sim-pintu-') === 0 && k !== VERSI && k !== CACHE_FONT;
      }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

function simpanKeCache(kunci, respons) {
  if (!respons || !respons.ok || respons.type !== 'basic') return Promise.resolve();
  return caches.open(VERSI).then(function (cache) { return cache.put(kunci, respons); });
}

// Utamakan jaringan (supaya perubahan config.js / index.html langsung terpakai),
// tapi kalau jaringan lambat (> batasMs) atau putus, pakai salinan tersimpan.
// segarkan = true: lewati cache HTTP browser (GitHub Pages menyimpan file 10 menit),
// jadi perubahan config.js / manifest langsung terbaca.
function jaringanDulu(event, kunci, batasMs, segarkan) {
  var req = segarkan
    ? new Request(event.request.url, { cache: 'no-cache', credentials: 'same-origin' })
    : event.request;
  return new Promise(function (resolve, reject) {
    var selesai = false;
    function pakaiCache(galat) {
      return caches.match(kunci, { ignoreSearch: true }).then(function (r) {
        if (selesai) return;
        if (r) { selesai = true; resolve(r); }
        else if (galat) { selesai = true; reject(galat); }
      });
    }
    var timer = setTimeout(function () { pakaiCache(null); }, batasMs);
    var ambil = fetch(req).then(function (res) {
      clearTimeout(timer);
      var salinan = res.clone();
      if (!selesai) { selesai = true; resolve(res); }
      return simpanKeCache(kunci, salinan);
    }).catch(function (galat) {
      clearTimeout(timer);
      return pakaiCache(galat || new Error('offline'));
    });
    event.waitUntil(ambil.catch(function () {}));
  });
}

// Ambil dari cache dulu (ikon dsb.), sambil memperbarui salinannya di belakang layar.
function cacheDulu(event, namaCache) {
  var req = event.request;
  return caches.open(namaCache).then(function (cache) {
    return cache.match(req, { ignoreSearch: namaCache === VERSI }).then(function (tersimpan) {
      var ambil = fetch(req).then(function (res) {
        if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
        return res;
      }).catch(function () { return tersimpan; });
      event.waitUntil(ambil.catch(function () {}));
      return tersimpan || ambil;
    });
  });
}

self.addEventListener('fetch', function (event) {
  var req = event.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);

  if (url.origin === self.location.origin) {
    if (req.mode === 'navigate') {
      event.respondWith(jaringanDulu(event, new URL('./', self.registration.scope).href, 4000));
      return;
    }
    if (/\/config\.js$/.test(url.pathname) || /\.webmanifest$/.test(url.pathname)) {
      event.respondWith(jaringanDulu(event, req.url, 4000, true));
      return;
    }
    event.respondWith(cacheDulu(event, VERSI));
    return;
  }

  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(cacheDulu(event, CACHE_FONT));
  }
  // Selain itu (script.google.com, dll.) tidak disentuh: selalu langsung ke jaringan.
});
