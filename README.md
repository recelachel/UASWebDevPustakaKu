# PustakaKu

Aplikasi web sederhana untuk mencatat buku perpustakaan SMA.
UAS Web Application Development, Universitas Prasetiya Mulya, Semester Ganjil 2026-1.

**Stack:** Next.js (App Router) + TypeScript, Tailwind CSS, Prisma 6 + SQLite, Server Actions.

## Menjalankan

Prasyarat: Node.js 20 atau lebih baru.

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

Saat `npm install`, Prisma Client dibuat otomatis. Saat `npm run dev`, migrasi dan seed
(10 buku) berjalan otomatis. Seed hanya mengisi data jika tabel masih kosong.

Mengulang dari data awal: hapus `prisma/dev.db`, lalu jalankan `npm run dev` lagi.

## Halaman

| Rute | Isi |
|------|-----|
| `/` | Landing page + tombol ke Daftar Buku |
| `/buku` | Tabel buku, pencarian judul/penulis, filter kategori dan stok, tombol Tambah buku. Stok merah jika 0 |
| `/buku/[id]` | Detail buku. ID tidak valid atau tidak ada menampilkan 404 |
| `/buku/baru` | Form tambah buku dengan validasi server |
| 404 | `app/not-found.tsx` |

## Struktur

- `app/layout.tsx` : layout + navbar bersama
- `app/buku/actions.ts` : Server Action tambah buku
- `components/` : Navbar, FormBuku
- `lib/prisma.ts` : koneksi database tunggal
- `prisma/schema.prisma`, `prisma/migrations/`, `prisma/seed.js` : skema, migrasi, data awal

## Catatan

- Semua query lewat Prisma Client (parameter terikat).
- `stok` = jumlah tersedia, `stokTotal` = jumlah dimiliki. Buku baru: keduanya sama dengan jumlah stok yang diisi.
- Tabel daftar bisa digeser horizontal di layar sempit (375px).