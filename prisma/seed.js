const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const data = [
  { judul: "Laskar Pelangi", penulis: "Andrea Hirata", kategori: "Novel", tahun: 2005, stok: 3, stokTotal: 5, deskripsi: "Kisah sepuluh anak Belitung yang bersekolah di SD Muhammadiyah dengan segala keterbatasannya." },
  { judul: "Bumi Manusia", penulis: "Pramoedya Ananta Toer", kategori: "Novel", tahun: 1980, stok: 0, stokTotal: 2, deskripsi: "Minke, pribumi terpelajar di masa kolonial, bertemu Nyai Ontosoroh dan Annelies." },
  { judul: "Fisika Dasar", penulis: "David Halliday", kategori: "Sains", tahun: 2010, stok: 2, stokTotal: 2, deskripsi: "Buku teks pengantar mekanika, gelombang, dan termodinamika." },
  { judul: "Sapiens: Riwayat Singkat Umat Manusia", penulis: "Yuval Noah Harari", kategori: "Sejarah", tahun: 2017, stok: 1, stokTotal: 3, deskripsi: "Sejarah umat manusia dari zaman batu sampai era modern." },
  { judul: "Algoritma dan Pemrograman", penulis: "Rinaldi Munir", kategori: "Komputer", tahun: 2016, stok: 4, stokTotal: 4, deskripsi: "Dasar-dasar algoritma dan pemrograman terstruktur untuk pemula." },
  { judul: "Matematika Kelas XI", penulis: "Kementerian Pendidikan", kategori: "Pelajaran", tahun: 2022, stok: 0, stokTotal: 10, deskripsi: "Buku paket matematika untuk siswa kelas XI." },
  { judul: "Ayat-Ayat Cinta", penulis: "Habiburrahman El Shirazy", kategori: "Novel", tahun: 2004, stok: 2, stokTotal: 3, deskripsi: null },
  { judul: "Atomic Habits", penulis: "James Clear", kategori: "Pengembangan Diri", tahun: 2018, stok: 5, stokTotal: 6, deskripsi: "Cara praktis membangun kebiasaan baik dan meninggalkan kebiasaan buruk lewat perubahan kecil." },
  { judul: "Kamus Besar Bahasa Indonesia", penulis: "Badan Bahasa", kategori: "Referensi", tahun: null, stok: 1, stokTotal: 1, deskripsi: "Kamus rujukan resmi bahasa Indonesia." },
  { judul: "Cantik Itu Luka", penulis: "Eka Kurniawan", kategori: "Novel", tahun: 2002, stok: 1, stokTotal: 2, deskripsi: "Novel realisme magis tentang Dewi Ayu dan keturunannya di Halimunda." },
];

async function main() {
  const jumlah = await prisma.buku.count();
  if (jumlah > 0) {
    console.log(`Seed dilewati: sudah ada ${jumlah} buku.`);
    return;
  }
  await prisma.buku.createMany({ data });
  console.log(`Seed selesai: ${data.length} buku ditambahkan.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());