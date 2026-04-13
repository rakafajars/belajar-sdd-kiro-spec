# Implementation Plan: Neobrutalism Styling

## Overview

Menerapkan visual styling Neobrutalism pada aplikasi todolist menggunakan Tailwind CSS utility classes. Tidak ada perubahan logika bisnis — hanya penambahan `className` pada elemen JSX yang sudah ada. Semua class ditulis sebagai string literal lengkap agar tidak di-purge oleh Tailwind pada production build.

## Tasks

- [x] 1. Verifikasi setup Tailwind CSS
  - Pastikan `src/index.css` mengandung `@import "tailwindcss"` atau direktif `@tailwind` yang sesuai untuk Tailwind v4
  - Pastikan `vite.config.ts` sudah mengimpor plugin Tailwind (jika diperlukan oleh Tailwind v4)
  - Pastikan `src/main.tsx` mengimpor `index.css`
  - Buat `src/index.css` jika belum ada dengan konten minimal yang benar untuk Tailwind v4
  - _Requirements: 8.1_

- [x] 2. Style `App.tsx` — layout, header card, main card
  - Tambah `className` pada wrapper `div` terluar: `min-h-screen bg-yellow-300 p-4 sm:p-8 font-mono`
  - Tambah `className` pada container `max-w-lg`: `max-w-lg mx-auto`
  - Tambah `className` pada header card `div`: `border-4 border-black bg-white shadow-[6px_6px_0px_0px_#000] mb-6 p-4`
  - Tambah `className` pada `h1`: `text-3xl font-black uppercase tracking-tight text-black`
  - Tambah `className` pada subtitle `p`: `text-sm font-bold text-black/60 mt-1`
  - Tambah `className` pada main card `div`: `border-4 border-black bg-white shadow-[6px_6px_0px_0px_#000] p-5 flex flex-col gap-5`
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

- [ ] 3. Style `TaskInput` — input field, tombol tambah, error state
  - [x] 3.1 Tambah `className` pada elemen-elemen `TaskInput`
    - Container `div` luar: `flex flex-col gap-1`
    - Container `div` dalam (row): `flex gap-2`
    - Input field: `flex-1 px-3 py-2 border-4 border-black font-mono font-bold text-sm bg-white placeholder:text-black/40 focus:outline-none focus:bg-yellow-100 transition-colors`
    - Tombol tambah: `px-4 py-2 bg-black text-yellow-300 font-black text-sm uppercase border-4 border-black shadow-[4px_4px_0px_0px_#facc15] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:shadow-none active:translate-x-1 active:translate-y-1 transition-all`
    - Error `span`: `text-sm font-bold text-red-600 border-2 border-red-600 bg-red-50 px-2 py-1`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [ ]* 3.2 Tulis property test untuk Press Effect tombol tambah (Property 1)
    - **Property 1: Semua tombol interaktif memiliki Press Effect**
    - Gunakan `fc.assert(fc.property(...))` dengan `fc.record` untuk generate berbagai props `TaskInput`
    - Verifikasi tombol tambah selalu memiliki class `hover:shadow-none`
    - Tag: `// Feature: neobrutalism-styling, Property 1: Semua tombol interaktif memiliki Press Effect`
    - **Validates: Requirements 2.4, 8.5**

  - [ ]* 3.3 Tulis property test untuk error state styling (Property 4)
    - **Property 4: Pesan error selalu menggunakan styling merah yang konsisten**
    - Generate berbagai string tidak valid (kosong, whitespace) menggunakan `fc.string` + filter
    - Submit ke `TaskInput` dan verifikasi error `span` memiliki class `text-red-600`, `border-red-600`, `bg-red-50`
    - Tag: `// Feature: neobrutalism-styling, Property 4: Pesan error selalu menggunakan styling merah yang konsisten`
    - **Validates: Requirements 2.5**

- [ ] 4. Style `FilterBar` — tombol inactive, tombol active/pink
  - [x] 4.1 Tambah `className` pada elemen-elemen `FilterBar`
    - Container `div`: `flex gap-2`
    - Tombol tidak aktif: `flex-1 px-3 py-2 text-sm font-black uppercase border-4 border-black bg-white text-black shadow-[3px_3px_0px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all`
    - Tombol aktif: `flex-1 px-3 py-2 text-sm font-black uppercase border-4 border-black bg-pink-400 text-black shadow-none translate-x-0.5 translate-y-0.5 transition-all`
    - Gunakan conditional class sebagai string literal lengkap (bukan template dinamis)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [ ]* 4.2 Tulis property test untuk tombol filter aktif selalu pink (Property 2)
    - **Property 2: Tombol filter aktif selalu menggunakan warna pink**
    - Gunakan `fc.constantFrom('all', 'active', 'completed')` untuk generate nilai filter
    - Verifikasi tombol dengan `aria-pressed="true"` memiliki class `bg-pink-400`, tombol lain tidak
    - Tag: `// Feature: neobrutalism-styling, Property 2: Tombol filter aktif selalu menggunakan warna pink`
    - **Validates: Requirements 3.4, 8.3**

  - [ ]* 4.3 Tulis property test untuk Press Effect tombol filter (Property 1)
    - **Property 1: Semua tombol interaktif memiliki Press Effect**
    - Verifikasi tombol filter tidak aktif memiliki class `hover:shadow-none`
    - Tag: `// Feature: neobrutalism-styling, Property 1: Semua tombol interaktif memiliki Press Effect`
    - **Validates: Requirements 3.3, 8.5**

- [ ] 5. Style `TaskItem` — view mode
  - [x] 5.1 Tambah `className` pada elemen view mode `TaskItem`
    - `li` view mode: `flex items-center gap-3 p-3 border-2 border-black bg-white hover:bg-yellow-50 transition-colors`
    - Checkbox `input`: `w-5 h-5 border-2 border-black accent-black cursor-pointer flex-shrink-0`
    - `span` judul normal: `flex-1 font-bold text-sm text-black`
    - `span` judul completed: `flex-1 font-bold text-sm text-black line-through opacity-60`
    - Tombol Edit: `px-2 py-1 text-xs font-black uppercase border-2 border-black bg-white shadow-[3px_3px_0px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all`
    - Tombol Hapus: `px-2 py-1 text-xs font-black uppercase border-2 border-black bg-red-500 text-white shadow-[3px_3px_0px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all`
    - Gunakan conditional className untuk `span` berdasarkan `task.completed`
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

  - [ ]* 5.2 Tulis property test untuk completed task styling (Property 3)
    - **Property 3: Task completed selalu ditampilkan dengan line-through dan opacity berkurang**
    - Generate task dengan `completed: true` menggunakan `fc.record`
    - Verifikasi `span[data-completed="true"]` memiliki class `line-through` dan `opacity-60`
    - Tag: `// Feature: neobrutalism-styling, Property 3: Task completed selalu ditampilkan dengan line-through dan opacity berkurang`
    - **Validates: Requirements 4.3**

  - [ ]* 5.3 Tulis property test untuk border hitam elemen interaktif (Property 5)
    - **Property 5: Semua elemen interaktif memiliki border hitam**
    - Generate berbagai task (completed/tidak) dan verifikasi `li`, tombol Edit, tombol Hapus memiliki class `border-black`
    - Tag: `// Feature: neobrutalism-styling, Property 5: Semua elemen interaktif memiliki border hitam`
    - **Validates: Requirements 4.1, 8.4**

- [ ] 6. Style `TaskItem` — edit mode
  - [x] 6.1 Tambah `className` pada elemen edit mode `TaskItem`
    - `li` edit mode: `flex flex-col gap-2 p-3 border-2 border-black bg-yellow-50`
    - Input edit: `w-full px-3 py-2 border-4 border-black font-mono font-bold text-sm bg-white focus:outline-none focus:bg-yellow-100 transition-colors`
    - Container tombol aksi `div`: `flex gap-2`
    - Tombol Simpan: `flex-1 px-3 py-1.5 text-xs font-black uppercase border-2 border-black bg-black text-yellow-300 shadow-[3px_3px_0px_0px_#facc15] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all`
    - Tombol Batal: `flex-1 px-3 py-1.5 text-xs font-black uppercase border-2 border-black bg-white text-black shadow-[3px_3px_0px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all`
    - Error `span`: `text-sm font-bold text-red-600 border-2 border-red-600 bg-red-50 px-2 py-1`
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ]* 6.2 Tulis property test untuk Press Effect tombol Simpan dan Batal (Property 1)
    - **Property 1: Semua tombol interaktif memiliki Press Effect**
    - Render `TaskItem` dalam edit mode (`isEditing={true}`) dengan berbagai task
    - Verifikasi tombol Simpan dan Batal memiliki class `hover:shadow-none`
    - Tag: `// Feature: neobrutalism-styling, Property 1: Semua tombol interaktif memiliki Press Effect`
    - **Validates: Requirements 5.3, 5.4, 8.5**

  - [ ]* 6.3 Tulis property test untuk error state edit mode (Property 4)
    - **Property 4: Pesan error selalu menggunakan styling merah yang konsisten**
    - Render `TaskItem` dalam edit mode, submit judul tidak valid, verifikasi error `span` memiliki class `text-red-600`, `border-red-600`, `bg-red-50`
    - Tag: `// Feature: neobrutalism-styling, Property 4: Pesan error selalu menggunakan styling merah yang konsisten`
    - **Validates: Requirements 5.5**

- [x] 7. Style `TaskList` — list container dan empty state
  - Tambah `className` pada `ul`: `flex flex-col gap-2 list-none p-0 m-0`
  - Tambah `className` pada empty state `p`: `text-center font-bold uppercase text-black/40 py-8 tracking-widest`
  - _Requirements: 6.1, 6.2, 6.3_

- [x] 8. Style `ClearCompleted` — tombol aktif dan disabled
  - Tambah `className` pada tombol saat aktif (`hasCompleted = true`): `w-full px-4 py-2 text-sm font-black uppercase border-4 border-black bg-white text-black shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:shadow-none active:translate-x-1 active:translate-y-1 transition-all`
  - Tambah `className` pada tombol saat disabled (`hasCompleted = false`): `w-full px-4 py-2 text-sm font-black uppercase border-4 border-black bg-white text-black opacity-50 cursor-not-allowed`
  - Gunakan conditional className sebagai string literal lengkap
  - _Requirements: 7.1, 7.2, 7.3_

  - [ ]* 8.1 Tulis property test untuk Press Effect tombol ClearCompleted (Property 1)
    - **Property 1: Semua tombol interaktif memiliki Press Effect**
    - Render `ClearCompleted` dengan `hasCompleted={true}` dan verifikasi tombol memiliki class `hover:shadow-none`
    - Tag: `// Feature: neobrutalism-styling, Property 1: Semua tombol interaktif memiliki Press Effect`
    - **Validates: Requirements 7.1, 8.5**

- [x] 9. Checkpoint — verifikasi visual dan jalankan test suite
  - Jalankan `npx vitest --run` dan pastikan semua test lulus (termasuk test yang sudah ada sebelumnya)
  - Verifikasi tidak ada regresi pada test logika bisnis di `taskUtils.test.ts` dan `storage.test.ts`
  - Pastikan semua class Tailwind ditulis sebagai string literal lengkap (tidak ada template dinamis yang bisa di-purge)
  - Tanyakan kepada user jika ada pertanyaan atau penyesuaian visual yang dibutuhkan

## Notes

- Task bertanda `*` bersifat opsional dan dapat dilewati untuk MVP yang lebih cepat
- Setiap task styling hanya menyentuh `className` — tidak ada perubahan props, state, atau logika
- Semua class Tailwind harus ditulis lengkap sebagai string literal (bukan template dinamis) agar tidak di-purge
- Property tests menggunakan `fast-check` dengan minimum 100 iterasi per property
- Tag property test: `// Feature: neobrutalism-styling, Property N: <deskripsi>`
- Urutan task mengikuti hierarki komponen dari luar ke dalam (App → TaskInput → FilterBar → TaskItem → TaskList → ClearCompleted)
