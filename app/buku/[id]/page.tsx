import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

async function DataBuku({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const nomor = Number(id);
  if (!Number.isInteger(nomor)) notFound();

  const b = await prisma.buku.findUnique({ where: { id: nomor } });
  if (!b) notFound();

  const habis = b.stok === 0;

  return (
    <div className="mt-4 grid gap-6 sm:grid-cols-[10rem_1fr]">
      <div
        className="flex aspect-[3/4] w-40 items-center justify-center rounded border border-gray-300 bg-gray-100 text-sm text-gray-500"
        aria-label="Sampul buku"
      >
        Sampul
      </div>
      <div className="space-y-2">
        <h1 className="judul text-3xl font-bold">{b.judul}</h1>
        <p>
          <span className="text-gray-500">Penulis:</span> {b.penulis}
        </p>
        <p>
          <span className="text-gray-500">Kategori:</span> {b.kategori}
          {b.tahun ? (
            <>
              {" "}
              <span className="text-gray-400">&middot;</span> <span className="text-gray-500">Tahun:</span> {b.tahun}
            </>
          ) : null}
        </p>
        <p>
          <span className="text-gray-500">Stok:</span>{" "}
          <span
            className={`inline-block rounded px-2 py-0.5 text-sm font-medium ${
              habis ? "bg-red-100 text-red-700" : "bg-green-100 text-green-800"
            }`}
          >
            {b.stok} dari {b.stokTotal} tersedia
          </span>
        </p>
        <p className="pt-2 text-gray-700">{b.deskripsi || "Belum ada deskripsi untuk buku ini."}</p>
      </div>
    </div>
  );
}

export default function DetailBuku({ params }: { params: Promise<{ id: string }> }) {
  return (
    <div>
      <Link href="/buku" className="text-sm text-gray-600 hover:underline">
        &lsaquo; Kembali ke daftar
      </Link>
      <Suspense fallback={<p className="mt-4 text-gray-500">Memuat data...</p>}>
        <DataBuku params={params} />
      </Suspense>
    </div>
  );
}