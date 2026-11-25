"use client";

import Link from "next/link";
import { useActionState } from "react";
import { tambahBuku, type FormState } from "@/app/buku/actions";
import { KATEGORI } from "@/lib/kategori";

const awal: FormState = { pesan: "" };
const input = "mt-1 w-full rounded border border-gray-300 bg-white p-2";

function Galat({ teks }: { teks?: string }) {
  return teks ? <p className="mt-1 text-sm text-red-700">{teks}</p> : null;
}

export default function FormBuku() {
  const [state, formAction, pending] = useActionState(tambahBuku, awal);
  const v = state.values;

  return (
    <form action={formAction} noValidate className="space-y-4 rounded border border-gray-200 bg-white p-5">
      <h1 className="judul text-xl font-bold">Tambah buku baru</h1>

      <div>
        <label htmlFor="judul" className="text-sm font-medium">Judul *</label>
        <input id="judul" name="judul" defaultValue={v?.judul} placeholder="Judul buku" className={input} />
        <Galat teks={state.galat?.judul} />
      </div>

      <div>
        <label htmlFor="penulis" className="text-sm font-medium">Penulis *</label>
        <input id="penulis" name="penulis" defaultValue={v?.penulis} placeholder="Nama penulis" className={input} />
        <Galat teks={state.galat?.penulis} />
      </div>

      <div>
        <label htmlFor="kategori" className="text-sm font-medium">Kategori *</label>
        <select id="kategori" name="kategori" defaultValue={v?.kategori ?? ""} className={input}>
          <option value="">Pilih kategori</option>
          {KATEGORI.map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
        <Galat teks={state.galat?.kategori} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="tahun" className="text-sm font-medium">Tahun terbit</label>
          <input id="tahun" name="tahun" type="number" defaultValue={v?.tahun} placeholder="2005" className={input} />
          <Galat teks={state.galat?.tahun} />
        </div>
        <div>
          <label htmlFor="stok" className="text-sm font-medium">Jumlah stok *</label>
          <input id="stok" name="stok" type="number" min={0} defaultValue={v?.stok} placeholder="5" className={input} />
          <Galat teks={state.galat?.stok} />
        </div>
      </div>

      <div>
        <label htmlFor="deskripsi" className="text-sm font-medium">Deskripsi</label>
        <textarea id="deskripsi" name="deskripsi" rows={3} defaultValue={v?.deskripsi} placeholder="Deskripsi buku" className={input} />
      </div>

      {state.pesan && <p className="text-sm text-red-700">{state.pesan}</p>}

      <div className="flex items-center justify-between">
        <Link href="/buku" className="rounded border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
          Batal
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="rounded bg-[var(--ink)] px-5 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {pending ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </form>
  );
}