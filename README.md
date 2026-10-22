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

## Beberapa akun guru di satu perangkat

SIM memakai **akun utama Chrome** tempat aplikasi dipasang. Google tidak mengizinkan
Apps Script memilih akun lain dari dalam aplikasi, jadi caranya **satu ikon untuk satu akun**:

- **HP Android:** pasang Chrome Beta / Chrome Dev dari Play Store, masuk dengan satu akun
  guru di tiap Chrome, lalu buka alamat ikon berikut di Chrome itu dan ketuk **Pasang**:
  - ikon ke-2 (biru): `https://<nama-akun>.github.io/sim-husnayain/?akun=2`
  - ikon ke-3 (marun): `https://<nama-akun>.github.io/sim-husnayain/?akun=3`
  - ikon ke-4 (ungu): `https://<nama-akun>.github.io/sim-husnayain/?akun=4`
- **Laptop:** satu profil Chrome per guru, lalu instal aplikasinya di tiap profil.

Di dalam aplikasi, ketuk **Ganti akun** di Beranda untuk melihat akun yang sedang dipakai
dan menyalin alamat ikon. Aplikasi memberi peringatan bila sebuah ikon tiba-tiba masuk
dengan akun lain, dan mengunci layar bila akun halaman berbeda dengan akun penyimpanan data.

## Catatan untuk admin

- Alamat Web App SIM diatur di `config.js` → `urlSim` (berakhiran `/exec`).
- Setelah mengubah file apa pun di sini, naikkan `VERSI` di `sw.js`
  (mis. `sim-pintu-v3`). Perubahan butuh ±1–10 menit untuk sampai ke perangkat.
- Nama ikon ke-2..4 bisa diganti nama guru **sebelum dipasang**: ubah `short_name`
  di `manifest-2.webmanifest` dst. (maks. ±12 huruf, mis. `"SIM Rahma"`).
- Info akun & tombol **Ganti akun** butuh `PWA_ALAMAT_PINTU` terisi di Apps Script.
- Kode Apps Script SIM **tidak** disimpan di repositori ini.
