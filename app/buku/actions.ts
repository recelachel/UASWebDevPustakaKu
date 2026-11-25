"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { KATEGORI } from "@/lib/kategori";

export type FormState = {
  pesan: string;
  galat?: { judul?: string; penulis?: string; kategori?: string; tahun?: string; stok?: string };
  values?: { judul: string; penulis: string; kategori: string; tahun: string; stok: string; deskripsi: string };
};

export async function tambahBuku(_prev: FormState, formData: FormData): Promise<FormState> {
  const ambil = (k: string) => String(formData.get(k) ?? "").trim();
  const values = {
    judul: ambil("judul"),
    penulis: ambil("penulis"),
    kategori: ambil("kategori"),
    tahun: ambil("tahun"),
    stok: ambil("stok"),
    deskripsi: ambil("deskripsi"),
  };

  // Validasi di server (validasi di browser bisa dilewati)
  const galat: NonNullable<FormState["galat"]> = {};
  if (!values.judul) galat.judul = "Judul wajib diisi";
  if (!values.penulis) galat.penulis = "Penulis wajib diisi";
  if (!(KATEGORI as readonly string[]).includes(values.kategori)) galat.kategori = "Kategori wajib dipilih";

  let tahun: number | null = null;
  if (values.tahun !== "") {
    const n = Number(values.tahun);
    if (!Number.isInteger(n) || n < 1000 || n > new Date().getFullYear()) {
      galat.tahun = `Tahun harus antara 1000 dan ${new Date().getFullYear()}`;
    } else {
      tahun = n;
    }
  }

  let stok = 0;
  if (values.stok === "") {
    galat.stok = "Jumlah stok wajib diisi";
  } else {
    const n = Number(values.stok);
    if (!Number.isInteger(n) || n < 0 || n > 9999) {
      galat.stok = "Jumlah stok harus bilangan bulat 0 sampai 9999";
    } else {
      stok = n;
    }
  }

  if (Object.keys(galat).length > 0) {
    return { pesan: "Periksa kembali isian Anda.", galat, values };
  }

  // Buku baru: semua eksemplar tersedia, jadi stok = stokTotal.
  let baru: { id: number };
  try {
    baru = await prisma.buku.create({
      data: {
        judul: values.judul,
        penulis: values.penulis,
        kategori: values.kategori,
        tahun,
        stok,
        stokTotal: stok,
        deskripsi: values.deskripsi || null,
      },
      select: { id: true },
    });
  } catch {
    return { pesan: "Terjadi kesalahan di server. Buku belum tersimpan.", values };
  }

  // redirect() harus di luar try/catch
  revalidatePath("/buku");
  redirect(`/buku/${baru.id}`);
}