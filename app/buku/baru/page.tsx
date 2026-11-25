import FormBuku from "@/components/FormBuku";

export const metadata = { title: "Tambah Buku" };

export default function TambahBuku() {
  return (
    <div className="mx-auto max-w-xl">
      <FormBuku />
    </div>
  );
}