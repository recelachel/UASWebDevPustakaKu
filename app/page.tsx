import Link from "next/link";

const fitur = [
  { judul: "Katalog terpusat", isi: "Semua buku perpustakaan tersimpan di satu database, bukan lagi di buku catatan." },
  { judul: "Cari dalam hitungan detik", isi: "Temukan buku lewat judul atau penulis, lalu saring berdasarkan kategori dan ketersediaan." },
  { judul: "Stok terlihat jelas", isi: "Buku yang habis ditandai merah sehingga petugas langsung tahu mana yang tidak bisa dipinjam." },
];

export default function Beranda() {
  return (
    <div className="space-y-12">
      <section className="space-y-5 pt-4">
        <h1 className="judul max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
          Catat buku perpustakaan tanpa buku catatan.
        </h1>
        <p className="max-w-xl text-lg text-gray-600">
          PustakaKu membantu petugas perpustakaan SMA menyimpan data buku, mencari judul, dan
          memantau stok yang tersedia dalam satu aplikasi web.
        </p>
        <Link
          href="/buku"
          className="inline-block rounded bg-[var(--ink)] px-5 py-3 font-medium text-white hover:opacity-90"
        >
          Lihat daftar buku
        </Link>
      </section>

      <section aria-labelledby="fitur">
        <h2 id="fitur" className="judul mb-4 text-2xl font-semibold">
          Yang bisa dilakukan
        </h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          {fitur.map((f) => (
            <li key={f.judul} className="rounded border border-gray-200 bg-white p-4">
              <h3 className="font-semibold">{f.judul}</h3>
              <p className="mt-1 text-sm text-gray-600">{f.isi}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="cara">
        <h2 id="cara" className="judul mb-4 text-2xl font-semibold">
          Cara memakai
        </h2>
        <ol className="list-decimal space-y-2 pl-5 text-gray-700">
          <li>Buka Daftar Buku untuk melihat koleksi yang ada.</li>
          <li>Ketik judul atau nama penulis di kotak pencarian, lalu klik Cari.</li>
          <li>Klik Detail untuk melihat keterangan lengkap sebuah buku.</li>
          <li>Klik Tambah buku untuk memasukkan buku baru ke koleksi.</li>
        </ol>
      </section>
    </div>
  );
}