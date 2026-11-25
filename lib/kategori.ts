export const KATEGORI = [
  "Novel",
  "Sains",
  "Sejarah",
  "Komputer",
  "Pelajaran",
  "Pengembangan Diri",
  "Referensi",
  "Lainnya",
] as const;

// Ambil nilai pertama kalau parameter URL muncul berulang (string | string[]).
export function pertama(nilai?: string | string[]): string {
  const v = Array.isArray(nilai) ? nilai[0] : nilai;
  return (v ?? "").trim();
}