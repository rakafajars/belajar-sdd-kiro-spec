# Todo List App

Aplikasi todo list berbasis web yang berjalan sepenuhnya di sisi klien (browser). Pengguna dapat menambah, menyelesaikan, mengedit, dan menghapus tugas. Data disimpan secara otomatis menggunakan `localStorage` sehingga tugas tetap tersedia setelah halaman di-refresh — tanpa backend.

---

## Fitur Utama

- Tambah tugas baru dengan validasi judul (tidak boleh kosong atau hanya spasi)
- Tandai tugas sebagai selesai atau belum selesai (toggle)
- Edit judul tugas secara inline
- Hapus tugas satu per satu
- Hapus semua tugas yang sudah selesai sekaligus
- Filter tampilan tugas berdasarkan status: Semua, Aktif, Selesai
- Persistensi otomatis ke `localStorage`

---

## Instalasi dan Menjalankan Proyek

### Prasyarat

- Node.js versi 18 atau lebih baru
- npm

### Langkah Instalasi

```bash
# 1. Clone repositori
git clone <url-repositori>
cd todolist-app

# 2. Install dependensi
npm install
```

### Menjalankan Aplikasi

```bash
# Mode development
npm run dev
```

Buka browser dan akses `http://localhost:5173`.

### Perintah Lainnya

```bash
# Build untuk produksi
npm run build

# Preview hasil build
npx vite preview

# Jalankan semua tes (sekali jalan)
npx vitest --run

# Jalankan tes dalam mode watch
npx vitest
```

---

## Struktur Folder

```
src/
  types/
    index.ts                    # Interface Task dan tipe FilterType
  utils/
    taskUtils.ts                # Fungsi bisnis murni (pure functions)
    taskUtils.test.ts           # Unit test + property-based test untuk taskUtils
    storage.ts                  # Baca/tulis localStorage
    storage.test.ts             # Unit test + property-based test untuk storage
  components/
    TaskInput/
      TaskInput.tsx             # Form tambah tugas
      TaskInput.test.tsx
    FilterBar/
      FilterBar.tsx             # Tombol filter: Semua / Aktif / Selesai
      FilterBar.test.tsx
    TaskList/
      TaskList.tsx              # Daftar TaskItem + pesan state kosong
      TaskList.test.tsx
    TaskItem/
      TaskItem.tsx              # Baris tugas tunggal (mode lihat + edit inline)
      TaskItem.test.tsx
    ClearCompleted/
      ClearCompleted.tsx        # Tombol hapus semua tugas selesai
      ClearCompleted.test.tsx
  App.tsx                       # Komponen root — menyimpan semua state
  App.test.tsx                  # Integration test
  main.tsx                      # Entry point Vite
```

---

## Teknologi yang Digunakan

| Kategori           | Teknologi                              |
|--------------------|----------------------------------------|
| Bahasa             | TypeScript                             |
| Framework UI       | React 19                               |
| Build Tool         | Vite                                   |
| Styling            | Tailwind CSS v4                        |
| State Management   | React `useState` + `useEffect`         |
| Persistensi        | Browser `localStorage` API             |
| Test Runner        | Vitest                                 |
| Component Testing  | React Testing Library + user-event     |
| Assertions         | @testing-library/jest-dom              |
| Property-Based Test| fast-check                             |
