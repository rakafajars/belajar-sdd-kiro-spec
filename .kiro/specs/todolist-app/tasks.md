# Implementation Plan: todolist-app

## Overview

Implementasi aplikasi todolist berbasis React + TypeScript dengan Vite. Pendekatan incremental: mulai dari setup proyek dan tipe data, lalu bangun pure functions, kemudian komponen UI, dan terakhir wiring semuanya bersama dengan persistensi localStorage.

## Tasks

- [x] 1. Setup proyek dan definisi tipe data inti
  - Inisialisasi proyek Vite + React + TypeScript
  - Install dependensi: `vitest`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `fast-check`
  - Buat file `src/types/index.ts` yang mendefinisikan interface `Task` dan type `FilterType`
  - Konfigurasi Vitest di `vite.config.ts` (environment jsdom, globals true)
  - _Requirements: 1.1, 2.3, 3.1_

- [x] 2. Implementasi pure functions di `taskUtils.ts`
  - [x] 2.1 Buat `src/utils/taskUtils.ts` dengan fungsi `validateTitle`, `addTask`, `toggleTask`, `editTask`, `deleteTask`, `clearCompleted`, dan `filterTasks`
    - `validateTitle(title)`: return false jika string kosong atau hanya whitespace setelah trim
    - `addTask`: buat Task baru dengan UUID, title di-trim, completed=false, createdAt=Date.now()
    - `toggleTask`: flip field `completed` pada task yang cocok dengan id
    - `editTask`: update `title` task yang cocok, field lain tidak berubah
    - `deleteTask`: filter out task dengan id yang diberikan
    - `clearCompleted`: filter out semua task dengan `completed = true`
    - `filterTasks`: kembalikan subset berdasarkan FilterType; urutan dipertahankan (sort descending by createdAt)
    - Semua fungsi harus pure — tidak boleh throw exception, kembalikan state tidak berubah jika input tidak valid
    - _Requirements: 1.2, 1.4, 3.1, 3.2, 4.2, 4.3, 5.1, 6.2, 6.3, 6.4, 7.2_

  - [ ]* 2.2 Tulis property test untuk `validateTitle` dan `addTask`
    - **Property 1: Penambahan task yang valid selalu masuk ke list**
    - **Validates: Requirements 1.2**
    - **Property 2: Validasi judul menolak semua string whitespace**
    - **Validates: Requirements 1.4, 4.3**

  - [ ]* 2.3 Tulis property test untuk `toggleTask`
    - **Property 5: Toggle status task adalah operasi round-trip**
    - **Validates: Requirements 3.1, 3.2**

  - [ ]* 2.4 Tulis property test untuk `editTask`
    - **Property 6: Edit task memperbarui judul dengan benar**
    - **Validates: Requirements 4.2**

  - [ ]* 2.5 Tulis property test untuk `deleteTask`
    - **Property 8: Hapus task mengurangi list tepat satu elemen**
    - **Validates: Requirements 5.1**

  - [ ]* 2.6 Tulis property test untuk `filterTasks`
    - **Property 3: Urutan tampilan task adalah descending berdasarkan waktu pembuatan**
    - **Validates: Requirements 2.1**
    - **Property 9: Filter task mengembalikan subset yang benar**
    - **Validates: Requirements 6.2, 6.3, 6.4**

  - [ ]* 2.7 Tulis property test untuk `clearCompleted`
    - **Property 10: clearCompleted menghapus semua task selesai dan hanya task selesai**
    - **Validates: Requirements 7.2**

  - [ ]* 2.8 Tulis unit tests untuk edge cases di `taskUtils.ts`
    - Test `addTask` dengan list kosong
    - Test `toggleTask`, `editTask`, `deleteTask` dengan id yang tidak ditemukan (harus no-op)
    - Test `filterTasks` dengan list kosong
    - _Requirements: 1.2, 1.4, 3.1, 4.2, 5.1, 6.2_

- [x] 3. Checkpoint — Pastikan semua tests di `taskUtils.test.ts` lulus
  - Pastikan semua tests lulus, tanyakan kepada user jika ada pertanyaan.

- [x] 4. Implementasi fungsi storage
  - [x] 4.1 Buat `src/utils/storage.ts` dengan fungsi `saveTasks` dan `loadTasks`
    - `saveTasks(tasks)`: serialize ke JSON dan simpan ke localStorage dengan key `"todolist-app-tasks"`; tangkap exception secara silent (log ke console)
    - `loadTasks()`: baca dari localStorage, parse JSON, validasi tipe (harus array); fallback ke `[]` jika tidak ada data, corrupt, atau bukan array
    - _Requirements: 8.1, 8.2, 8.3_

  - [ ]* 4.2 Tulis property test untuk storage round-trip
    - **Property 11: Persistensi storage adalah operasi round-trip**
    - **Validates: Requirements 8.1, 8.2**

  - [ ]* 4.3 Tulis unit tests untuk `storage.ts`
    - Test `loadTasks` saat localStorage kosong → return `[]`
    - Test `loadTasks` saat data corrupt (bukan JSON valid) → return `[]`
    - Test `loadTasks` saat data bukan array → return `[]`
    - Test `saveTasks` saat localStorage tidak tersedia (mock throw) → tidak crash
    - _Requirements: 8.2, 8.3_

- [x] 5. Implementasi komponen `TaskInput`
  - [x] 5.1 Buat `src/components/TaskInput/TaskInput.tsx`
    - Render input field dan tombol tambah
    - Panggil `onAdd(title)` saat tombol diklik atau Enter ditekan
    - Kosongkan input field setelah task berhasil ditambahkan
    - Tampilkan pesan validasi inline jika judul kosong/hanya spasi (gunakan `validateTitle`)
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [ ]* 5.2 Tulis unit tests untuk `TaskInput`
    - Test render: input field dan tombol ada di DOM
    - Test submit dengan judul valid → `onAdd` dipanggil, input dikosongkan
    - Test submit dengan judul kosong → `onAdd` tidak dipanggil, pesan error muncul
    - Test submit dengan Enter key
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 6. Implementasi komponen `FilterBar`
  - [x] 6.1 Buat `src/components/FilterBar/FilterBar.tsx`
    - Render tiga tombol filter: "Semua", "Belum Selesai", "Selesai"
    - Tandai tombol aktif secara visual sesuai `currentFilter`
    - Panggil `onFilterChange(filter)` saat tombol diklik
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [ ]* 6.2 Tulis unit tests untuk `FilterBar`
    - Test render: tiga tombol filter ada di DOM (smoke test)
    - Test klik setiap tombol → `onFilterChange` dipanggil dengan nilai yang benar
    - _Requirements: 6.1_

- [x] 7. Implementasi komponen `TaskItem`
  - [x] 7.1 Buat `src/components/TaskItem/TaskItem.tsx`
    - Mode tampilan: render checkbox, judul task, tombol edit, tombol hapus
    - Tampilkan judul dengan style berbeda untuk task selesai (misal: line-through)
    - Mode edit (`isEditing = true`): render input field berisi judul saat ini, tombol simpan, tombol batal
    - Tampilkan pesan validasi inline jika judul edit kosong/hanya spasi
    - Dukung Escape key untuk membatalkan edit
    - Dukung Enter key untuk menyimpan edit
    - _Requirements: 2.3, 3.1, 3.3, 4.1, 4.2, 4.3, 4.4, 5.1_

  - [ ]* 7.2 Tulis property test untuk render `TaskItem`
    - **Property 4: Render task mengandung judul dan indikator status yang benar**
    - **Validates: Requirements 2.3, 3.3**

  - [ ]* 7.3 Tulis unit tests untuk `TaskItem`
    - Test render mode tampilan: judul, checkbox, tombol edit/hapus ada
    - Test klik checkbox → `onToggle` dipanggil
    - Test klik tombol edit → `onEdit` dipanggil
    - Test klik tombol hapus → `onDelete` dipanggil
    - Test mode edit: input field muncul dengan nilai judul saat ini
    - Test simpan edit dengan judul valid → `onSave` dipanggil
    - Test simpan edit dengan judul kosong → `onSave` tidak dipanggil, error muncul
    - Test Escape key saat edit → `onCancel` dipanggil
    - _Requirements: 3.1, 4.1, 4.2, 4.3, 4.4, 5.1_

  - [ ]* 7.4 Tulis property test untuk pembatalan edit
    - **Property 7: Pembatalan edit tidak mengubah task list**
    - **Validates: Requirements 4.4**

- [x] 8. Implementasi komponen `TaskList` dan `ClearCompleted`
  - [x] 8.1 Buat `src/components/TaskList/TaskList.tsx`
    - Render daftar `TaskItem` dari props `tasks`
    - Tampilkan pesan "Belum ada tugas" jika `tasks` kosong
    - Teruskan semua callback (onToggle, onEdit, onSave, onCancel, onDelete) ke setiap `TaskItem`
    - _Requirements: 2.1, 2.2, 2.3_

  - [x] 8.2 Buat `src/components/ClearCompleted/ClearCompleted.tsx`
    - Render tombol "Hapus Semua Selesai"
    - Tombol disabled jika `hasCompleted = false`
    - Panggil `onClear()` saat tombol diklik
    - _Requirements: 7.1, 7.2_

  - [ ]* 8.3 Tulis unit tests untuk `TaskList`
    - Test render dengan list kosong → pesan "Belum ada tugas" muncul
    - Test render dengan beberapa task → semua TaskItem dirender
    - _Requirements: 2.2_

  - [ ]* 8.4 Tulis unit tests untuk `ClearCompleted`
    - Test tombol disabled saat `hasCompleted = false`
    - Test tombol aktif dan `onClear` dipanggil saat `hasCompleted = true`
    - _Requirements: 7.1, 7.2_

- [x] 9. Checkpoint — Pastikan semua component tests lulus
  - Pastikan semua tests lulus, tanyakan kepada user jika ada pertanyaan.

- [x] 10. Implementasi komponen `App` — wiring semua komponen
  - [x] 10.1 Buat `src/App.tsx` dengan state management menggunakan `useState`
    - State: `tasks: Task[]`, `filter: FilterType`, `editingTaskId: string | null`
    - `useEffect` saat mount: panggil `loadTasks()` untuk inisialisasi state `tasks`
    - `useEffect` saat `tasks` berubah: panggil `saveTasks(tasks)` untuk persistensi
    - Implementasi handler: `handleAdd`, `handleToggle`, `handleEdit`, `handleSave`, `handleCancel`, `handleDelete`, `handleClearCompleted`, `handleFilterChange`
    - Setiap handler memanggil fungsi pure yang sesuai dari `taskUtils.ts`
    - Render: `TaskInput`, `FilterBar`, `TaskList` (dengan tasks yang sudah difilter via `filterTasks`), `ClearCompleted`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 3.1, 3.2, 4.1, 4.2, 4.3, 4.4, 5.1, 5.2, 6.1, 6.2, 6.3, 6.4, 7.1, 7.2, 8.1, 8.2, 8.3_

  - [ ]* 10.2 Tulis integration tests untuk `App`
    - Test alur tambah task: ketik judul → submit → task muncul di list
    - Test alur toggle task: klik checkbox → status berubah secara visual
    - Test alur edit task: klik edit → ubah judul → simpan → judul terupdate
    - Test alur hapus task: klik hapus → task hilang dari list
    - Test alur filter: tambah beberapa task, toggle beberapa, cek setiap filter
    - Test alur clear completed: tandai beberapa task selesai → klik clear → hanya task aktif tersisa
    - _Requirements: 1.2, 1.3, 3.1, 4.2, 5.1, 6.2, 6.3, 6.4, 7.2_

- [x] 11. Final checkpoint — Pastikan semua tests lulus
  - Jalankan seluruh test suite, pastikan semua tests lulus.
  - Tanyakan kepada user jika ada pertanyaan sebelum dianggap selesai.

## Notes

- Task bertanda `*` bersifat opsional dan dapat dilewati untuk MVP yang lebih cepat
- Setiap task mereferensikan requirements spesifik untuk keterlacakan
- Checkpoint memastikan validasi incremental di setiap tahap
- Property tests memvalidasi properti kebenaran universal (11 properti dari design)
- Unit tests memvalidasi contoh spesifik dan edge cases
