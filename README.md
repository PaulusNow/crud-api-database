# **README untuk Komponen ResepList React**

![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![React.js](https://img.shields.io/badge/React.js-61DAFB?style=for-the-badge&logo=react&logoColor=white)

## **Gambaran Umum**
Proyek ini adalah aplikasi berbasis React yang memungkinkan pengguna untuk melihat, menambah, mengedit, dan menghapus resep. Aplikasi ini mengambil data dari server lokal dan menampilkannya dalam bentuk tabel. Pengguna dapat berinteraksi dengan data melalui antarmuka pengguna yang sederhana.

---

## **Fitur**
- **Lihat Resep**: Menampilkan daftar resep dalam bentuk tabel.
- **Tambah Resep**: Memungkinkan pengguna untuk menambahkan resep baru.
- **Edit Resep**: Memungkinkan pengguna untuk mengedit resep yang sudah ada.
- **Hapus Resep**: Menyediakan fungsi untuk menghapus resep.

---

## **Teknologi yang Digunakan**
- **React**: Sebuah library JavaScript untuk membangun antarmuka pengguna.
- **Axios**: Sebuah HTTP client berbasis promise untuk melakukan permintaan API.
- **React Router DOM**: Untuk menangani routing di dalam aplikasi React.
- **Bulma CSS Framework**: Untuk memberikan gaya pada antarmuka pengguna.

---

## **Instalasi**
1. **Clone Repository**:
   ```bash
   git clone https://github.com/username-anda/nama-repo.git
   cd nama-repo
   ```
2. **Instal Dependensi**:
   ```bash
   npm install
   ```
3. **Jalankan Aplikasi**:
   ```bash
   npm start
   ```
4. **Jalankan Server Backend**: Pastikan server backend berjalan di http://localhost:3001 untuk mengambil dan memanipulasi data resep.

---

## Struktur Proyek
- **`ResepList.js`**: Komponen utama yang mengambil dan menampilkan daftar resep.
- **`axio`**: Digunakan untuk membuat permintaan HTTP ke server backend.
- **`React Router DOM`**: Digunakan untuk navigasi antar halaman (misalnya, menambah atau mengedit resep).
- **`Bulma CSS`**: Digunakan untuk memberikan style pada tabel dan tombol.

---

## Cara Menggunakan
1. **Lihat Resep**:
- Aplikasi akan menampilkan daftar resep dalam bentuk tabel saat pertama kali dijalankan.
2. **Tambah Resep**:
- Klik tombol "Tambah Resep" untuk menavigasi ke formulir penambahan resep.
3. **Edit Resep**:
- Klik tombol "Edit" di sebelah resep untuk menavigasi ke formulir pengeditan.
4. **Hapus Resep**:
- Klik tombol "Hapus" di sebelah resep untuk menghapusnya.

---

## Endpoint API
- **GET**`/resep`:Mengambil daftar resep.
- **DELETE**`/resep/:id`: Menghapus resep tertentu berdasarkan ID.
