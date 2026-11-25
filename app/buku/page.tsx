import { Suspense } from "react";
import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { KATEGORI, pertama } from "@/lib/kategori";

type SP = Promise<{ q?: string | string[]; kategori?: string | string[]; status?: string | string[] }>;

async function TabelBuku({ q, kategori, status }: { q: string; kategori: string; status: string }) {
  // Semua filter dikirim lewat Prisma sehingga otomatis memakai parameter terikat.
  const where: Prisma.BukuWhereInput = {};
  if (q) where.OR = [{ judul: { contains: q } }, { penulis: { contains: q } }];
  if (kategori) where.kategori = kategori;
  if (status === "habis") where.stok = 0;
  if (status === "tersedia") where.stok = { gt: 0 };

  const daftar = await prisma.buku.findMany({ where, orderBy: { id: "asc" } });

  if (daftar.length === 0) {
    return (
      <p className="rounded border border-dashed border-gray-300 bg-white p-6 text-center text-gray-600">
        Tidak ada buku yang cocok. Coba kata kunci lain atau{" "}
        <Link href="/buku/baru" className="underline">
          tambah buku baru
        </Link>
        .
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded border border-gray-200 bg-white">
      <table className="w-full min-w-[34rem] text-left text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-3 py-2 font-medium">No</th>
            <th className="px-3 py-2 font-medium">Judul</th>
            <th className="px-3 py-2 font-medium">Penulis</th>
            <th className="px-3 py-2 font-medium">Kategori</th>
            <th className="px-3 py-2 font-medium">Stok</th>
            <th className="px-3 py-2 font-medium">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {daftar.map((b, i) => (
            <tr key={b.id}>
              <td className="px-3 py-2">{i + 1}</td>
              <td className="px-3 py-2 font-medium">{b.judul}</td>
              <td className="px-3 py-2">{b.penulis}</td>
              <td className="px-3 py-2">{b.kategori}</td>
              <td className="px-3 py-2">
                <span
                  className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${
                    b.stok === 0 ? "bg-red-100 text-red-700" : "text-gray-800"
                  }`}
                >
                  {b.stok}/{b.stokTotal}
                </span>
              </td>
              <td className="px-3 py-2">
                <Link
                  href={`/buku/${b.id}`}
                  className="rounded border border-gray-300 px-3 py-1 hover:bg-gray-50"
                >
                  Detail
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

async function Pencarian({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const q = pertama(sp.q);
  const kategori = pertama(sp.kategori);
  const status = pertama(sp.status);
  const adaFilter = Boolean(q || kategori || status);

  return (
    <>
      <form action="/buku" method="get" className="mb-4 grid gap-2 sm:flex">
        <input
          name="q"
          defaultValue={q}
          placeholder="Cari judul atau penulis"
          aria-label="Cari judul atau penulis"
          className="w-full rounded border border-gray-300 bg-white p-2 sm:flex-1"
        />
        <select
          name="kategori"
          defaultValue={kategori}
          aria-label="Kategori"
          className="rounded border border-gray-300 bg-white p-2"
        >
          <option value="">Semua kategori</option>
          {KATEGORI.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
        <select
          name="status"
          defaultValue={status}
          aria-label="Ketersediaan"
          className="rounded border border-gray-300 bg-white p-2"
        >
          <option value="">Semua stok</option>
          <option value="tersedia">Tersedia</option>
          <option value="habis">Habis</option>
        </select>
        <button className="rounded bg-[var(--ink)] px-5 py-2 font-medium text-white">Cari</button>
        {adaFilter && (
          <Link href="/buku" className="px-2 py-2 text-center text-sm text-gray-600 underline">
            Reset
          </Link>
        )}
      </form>
      <Suspense key={`${q}|${kategori}|${status}`} fallback={<p className="text-gray-500">Memuat data...</p>}>
        <TabelBuku q={q} kategori={kategori} status={status} />
      </Suspense>
    </>
  );
}

export const metadata = { title: "Daftar Buku" };

export default function DaftarBuku({ searchParams }: { searchParams: SP }) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="judul text-2xl font-bold">Daftar buku</h1>
        <Link href="/buku/baru" className="rounded bg-[var(--ink)] px-4 py-2 text-sm font-medium text-white">
          + Tambah buku
        </Link>
      </div>
      <Suspense fallback={<p className="text-gray-500">Memuat data...</p>}>
        <Pencarian searchParams={searchParams} />
      </Suspense>
    </div>
  );
}