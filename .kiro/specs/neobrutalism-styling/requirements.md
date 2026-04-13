# Requirements Document

## Introduction

Fitur ini menambahkan visual styling bergaya **Neobrutalism** pada aplikasi todolist-app yang sudah ada. Neobrutalism adalah gaya desain UI yang ditandai dengan border hitam tebal, bayangan tajam (hard shadow), warna kontras mencolok, dan tipografi bold/uppercase — memberikan kesan raw, playful, dan tegas.

Implementasi dilakukan sepenuhnya menggunakan **Tailwind CSS utility classes** (tanpa custom CSS) pada enam komponen yang sudah ada: `App`, `TaskInput`, `FilterBar`, `TaskItem`, `TaskList`, dan `ClearCompleted`. Tidak ada perubahan pada logika bisnis, state management, atau struktur komponen.

## Glossary

- **Styling_System**: Keseluruhan sistem visual Neobrutalism yang diterapkan pada App menggunakan Tailwind CSS utility classes
- **Hard_Shadow**: Efek `box-shadow` dengan offset solid tanpa blur, menghasilkan bayangan tajam khas Neobrutalism (contoh: `shadow-[4px_4px_0px_0px_#000]`)
- **Press_Effect**: Efek visual saat tombol ditekan — shadow hilang dan elemen bergeser sedikit ke arah shadow (translate-x + translate-y), mensimulasikan tombol fisik yang ditekan
- **Active_Filter**: Tombol filter yang sedang dipilih, ditampilkan dengan warna aksen pink (`#f472b6`) dan Press_Effect permanen
- **Completed_Task**: Task dengan status `completed = true`, ditampilkan dengan teks dicoret dan opacity berkurang
- **Edit_Mode**: Kondisi TaskItem saat pengguna sedang mengedit judul task, menampilkan input field dan tombol aksi
- **View_Mode**: Kondisi TaskItem saat tidak dalam Edit_Mode, menampilkan judul task dan tombol edit/hapus
- **App**: Komponen root React yang memegang seluruh state aplikasi todolist
- **TaskInput**: Komponen form untuk menambahkan task baru (input field + tombol tambah)
- **FilterBar**: Komponen berisi tiga tombol filter (Semua, Belum Selesai, Selesai)
- **TaskItem**: Komponen yang merender satu item task dalam View_Mode atau Edit_Mode
- **TaskList**: Komponen yang merender daftar TaskItem atau pesan empty state
- **ClearCompleted**: Komponen tombol untuk menghapus semua task selesai sekaligus

---

## Requirements

### Requirement 1: Fondasi Layout dan Tema Global

**User Story:** Sebagai pengguna, saya ingin melihat aplikasi dengan tema Neobrutalism yang konsisten, agar tampilan terasa kohesif dan berkarakter.

#### Acceptance Criteria

1. THE Styling_System SHALL menggunakan font monospace (`font-mono`) sebagai font utama di seluruh App
2. THE Styling_System SHALL menerapkan background kuning terang (`bg-yellow-300`, setara `#facc15`) pada halaman penuh (`min-h-screen`) sebagai warna dasar aplikasi
3. THE Styling_System SHALL membungkus seluruh konten dalam container terpusat dengan lebar maksimum (`max-w-lg mx-auto`) dan padding responsif (`p-4` pada mobile, `sm:p-8` pada layar lebih besar)
4. THE Styling_System SHALL menampilkan header App dalam card dengan border hitam tebal (`border-4 border-black`), background putih, dan Hard_Shadow (`shadow-[6px_6px_0px_0px_#000]`)
5. THE Styling_System SHALL menampilkan judul header dengan teks uppercase, font hitam tebal (`font-black`), dan ukuran besar (`text-3xl`)
6. THE Styling_System SHALL membungkus area konten utama (TaskInput, FilterBar, TaskList, ClearCompleted) dalam satu card dengan border hitam tebal (`border-4 border-black`), background putih, Hard_Shadow, dan gap vertikal antar komponen

---

### Requirement 2: Styling TaskInput

**User Story:** Sebagai pengguna, saya ingin input field dan tombol tambah task memiliki tampilan Neobrutalism yang jelas, agar interaksi terasa tegas dan responsif.

#### Acceptance Criteria

1. THE TaskInput SHALL menampilkan input field dengan border hitam tebal (`border-4 border-black`), font monospace bold, dan background putih
2. WHEN input field dalam kondisi fokus, THE TaskInput SHALL menampilkan perubahan visual yang jelas — background berubah menjadi kuning muda (`focus:bg-yellow-100`) tanpa outline default browser (`focus:outline-none`)
3. THE TaskInput SHALL menampilkan tombol tambah dengan background hitam, teks kuning (`text-yellow-300`), font uppercase bold, border hitam tebal, dan Hard_Shadow berwarna kuning (`shadow-[4px_4px_0px_0px_#facc15]`)
4. WHEN pengguna melakukan hover atau menekan tombol tambah, THE TaskInput SHALL menerapkan Press_Effect — Hard_Shadow hilang dan tombol bergeser (`translate-x-1 translate-y-1`)
5. IF validasi judul gagal, THEN THE TaskInput SHALL menampilkan pesan error dengan border merah, background merah muda, dan teks merah bold agar mudah terlihat

---

### Requirement 3: Styling FilterBar

**User Story:** Sebagai pengguna, saya ingin tombol filter memiliki tampilan yang jelas menunjukkan filter mana yang aktif, agar saya dapat dengan mudah mengetahui tampilan yang sedang dipilih.

#### Acceptance Criteria

1. THE FilterBar SHALL menampilkan tiga tombol filter dalam satu baris horizontal dengan lebar merata (`flex gap-2`)
2. THE FilterBar SHALL menampilkan setiap tombol filter dengan border hitam tebal (`border-4 border-black`), font uppercase bold, dan Hard_Shadow hitam dalam kondisi tidak aktif
3. WHEN tombol filter dalam kondisi tidak aktif dan pengguna melakukan hover, THE FilterBar SHALL menerapkan Press_Effect pada tombol tersebut
4. WHEN sebuah filter dipilih (Active_Filter), THE FilterBar SHALL menampilkan tombol tersebut dengan background pink (`bg-pink-400`), Press_Effect permanen (shadow hilang, sedikit translate), dan tanpa Hard_Shadow
5. THE FilterBar SHALL mempertahankan lebar tombol yang konsisten sehingga perubahan antara state aktif dan tidak aktif tidak menggeser layout

---

### Requirement 4: Styling TaskItem — View Mode

**User Story:** Sebagai pengguna, saya ingin setiap item task ditampilkan dengan jelas beserta aksi yang tersedia, agar saya dapat dengan mudah membaca dan berinteraksi dengan task.

#### Acceptance Criteria

1. THE TaskItem SHALL menampilkan setiap task dalam View_Mode sebagai baris dengan border hitam (`border-2 border-black`), background putih, dan padding yang cukup
2. THE TaskItem SHALL menampilkan checkbox dengan ukuran yang cukup besar dan border hitam tebal agar mudah diklik
3. WHEN task dalam kondisi Completed_Task, THE TaskItem SHALL menampilkan judul dengan teks dicoret (`line-through`) dan opacity berkurang (`opacity-60`) untuk membedakan secara visual dari task aktif
4. THE TaskItem SHALL menampilkan tombol Edit dengan Hard_Shadow dan Press_Effect saat hover/active
5. THE TaskItem SHALL menampilkan tombol Hapus dengan warna aksen berbeda (misalnya background merah atau border merah) dan Press_Effect saat hover/active, agar dapat dibedakan dari tombol Edit
6. WHEN pengguna melakukan hover pada baris task, THE TaskItem SHALL memberikan feedback visual ringan (misalnya perubahan background) untuk menunjukkan elemen interaktif

---

### Requirement 5: Styling TaskItem — Edit Mode

**User Story:** Sebagai pengguna, saya ingin mode edit task memiliki tampilan yang jelas dan konsisten dengan gaya Neobrutalism, agar saya dapat mengedit task dengan nyaman.

#### Acceptance Criteria

1. WHEN TaskItem berada dalam Edit_Mode, THE TaskItem SHALL menampilkan input field edit dengan border hitam tebal (`border-4 border-black`), font monospace, dan lebar penuh
2. WHEN input field edit dalam kondisi fokus, THE TaskItem SHALL menampilkan perubahan background menjadi kuning muda (`focus:bg-yellow-100`) tanpa outline default browser
3. WHEN TaskItem berada dalam Edit_Mode, THE TaskItem SHALL menampilkan tombol Simpan dengan background hitam, teks kuning, dan Press_Effect saat hover/active
4. WHEN TaskItem berada dalam Edit_Mode, THE TaskItem SHALL menampilkan tombol Batal dengan background putih, border hitam, dan Press_Effect saat hover/active
5. IF validasi judul edit gagal, THEN THE TaskItem SHALL menampilkan pesan error dengan styling yang sama dengan pesan error pada TaskInput (border merah, background merah muda, teks merah bold)

---

### Requirement 6: Styling TaskList

**User Story:** Sebagai pengguna, saya ingin daftar task dan pesan empty state ditampilkan dengan tampilan yang sesuai tema, agar pengalaman visual tetap konsisten.

#### Acceptance Criteria

1. THE TaskList SHALL menampilkan daftar task sebagai list tanpa bullet default browser (`list-none`) dengan gap vertikal antar item
2. WHEN TaskList kosong, THE TaskList SHALL menampilkan pesan empty state dengan teks uppercase bold, terpusat, dan warna yang kontras namun tidak mengganggu (misalnya teks hitam dengan opacity berkurang)
3. THE TaskList SHALL memastikan setiap TaskItem memiliki separasi visual yang jelas satu sama lain

---

### Requirement 7: Styling ClearCompleted

**User Story:** Sebagai pengguna, saya ingin tombol hapus semua selesai memiliki tampilan yang menunjukkan kapan tombol aktif dan kapan tidak, agar saya tahu kapan tombol dapat digunakan.

#### Acceptance Criteria

1. WHEN ClearCompleted dalam kondisi aktif (terdapat task selesai), THE ClearCompleted SHALL menampilkan tombol dengan border hitam tebal, font uppercase bold, Hard_Shadow, dan Press_Effect saat hover/active
2. WHEN ClearCompleted dalam kondisi tidak aktif (tidak ada task selesai), THE ClearCompleted SHALL menampilkan tombol dengan opacity berkurang (`opacity-50`) dan cursor tidak aktif (`cursor-not-allowed`) untuk menunjukkan tombol tidak dapat diklik
3. THE ClearCompleted SHALL menampilkan tombol dengan lebar penuh (`w-full`) agar mudah ditemukan di bagian bawah card

---

### Requirement 8: Konsistensi dan Batasan Implementasi

**User Story:** Sebagai developer, saya ingin styling diimplementasikan secara konsisten dan hanya menggunakan Tailwind CSS, agar kode mudah dipelihara dan tidak ada konflik dengan sistem styling lain.

#### Acceptance Criteria

1. THE Styling_System SHALL mengimplementasikan seluruh styling hanya menggunakan Tailwind CSS utility classes — tidak ada custom CSS, inline style, atau CSS Modules
2. THE Styling_System SHALL menggunakan warna kuning (`#facc15` / `yellow-300` atau `yellow-400`) sebagai warna background utama dan aksen Hard_Shadow pada tombol primer
3. THE Styling_System SHALL menggunakan warna pink (`#f472b6` / `pink-400`) sebagai warna aksen untuk Active_Filter dan elemen yang sedang dalam kondisi aktif/terpilih
4. THE Styling_System SHALL menggunakan border hitam tebal (`border-black` dengan ketebalan minimal `border-2`) secara konsisten pada semua elemen interaktif (input, tombol, card)
5. THE Styling_System SHALL menerapkan Press_Effect secara konsisten pada semua tombol interaktif menggunakan kombinasi `hover:shadow-none hover:translate-x-[n] hover:translate-y-[n]` dan `active:shadow-none active:translate-x-[n] active:translate-y-[n]`
6. THE Styling_System SHALL menggunakan `transition-all` atau `transition` pada semua elemen yang memiliki perubahan state visual agar transisi terasa halus
7. THE Styling_System SHALL memastikan semua teks pada tombol dan label menggunakan `uppercase` dan font weight tebal (`font-bold` atau `font-black`) sesuai hierarki visual
8. THE Styling_System SHALL memastikan layout responsif dengan pendekatan mobile-first — tampilan fungsional pada lebar layar mulai dari 320px ke atas
