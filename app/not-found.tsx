import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-3 py-10">
      <h1 className="judul text-3xl font-bold">Halaman tidak ditemukan</h1>
      <p className="text-gray-600">Alamat yang Anda buka tidak ada, atau buku tersebut sudah tidak tersimpan.</p>
      <Link href="/buku" className="inline-block rounded bg-[var(--ink)] px-4 py-2 text-white">
        Kembali ke daftar buku
      </Link>
    </div>
  );
}