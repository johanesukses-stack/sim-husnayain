# SIM MI Husnayain Sleman — Pintu Aplikasi

Repositori ini adalah "pintu" supaya **SIM MI Husnayain Sleman** bisa dipasang
sebagai aplikasi di HP Android dan laptop lewat Chrome.

SIM sendiri tetap berjalan di Google Apps Script dan hanya bisa dibuka dengan akun
Google **@mihusnayain.sch.id**. Pintu ini cuma berisi halaman pembuka, ikon,
manifest, dan service worker — **tidak menyimpan data apa pun**.

## Cara memasang aplikasi

Alamat aplikasi: `https://<nama-akun>.github.io/sim-husnayain/`
(lihat di **Settings → Pages** repositori ini).

**HP Android (Chrome)**

1. Buka alamat aplikasi di Chrome, pastikan Chrome sudah masuk dengan akun madrasah.
2. Ketuk **Pasang** di pita atas (atau menu ⋮ → **Instal aplikasi**) → **Instal**.
3. Ikon **SIM Husnayain** muncul di layar utama. Tekan lama ikonnya untuk pintasan
   Absensi, Nilai, Qur'an, dan Jurnal.

**Laptop (Chrome)**

1. Buka alamat aplikasi di Chrome.
2. Klik ikon instal di ujung kanan address bar (atau tombol **Pasang**) → **Instal**.
3. SIM terbuka di jendela sendiri dan bisa disematkan ke taskbar/dock.

## Catatan untuk admin

- Alamat Web App SIM diatur di `config.js` → `urlSim` (berakhiran `/exec`).
- Setelah mengubah file apa pun di sini, naikkan `VERSI` di `sw.js`
  (mis. `sim-pintu-v2`). Perubahan butuh ±1–10 menit untuk sampai ke perangkat.
- Kode Apps Script SIM **tidak** disimpan di repositori ini.
