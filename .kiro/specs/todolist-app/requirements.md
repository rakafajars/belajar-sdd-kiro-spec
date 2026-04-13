# Requirements Document

## Introduction

Aplikasi frontend sederhana untuk mengelola daftar tugas (todo list). Pengguna dapat menambahkan, menyelesaikan, mengedit, dan menghapus tugas. Aplikasi berjalan sepenuhnya di sisi klien (browser) tanpa memerlukan backend, dengan data yang disimpan di localStorage agar tugas tetap tersimpan saat halaman di-refresh.

## Glossary

- **App**: Aplikasi frontend todolist yang berjalan di browser
- **Task**: Satu item tugas yang memiliki judul, status, dan waktu pembuatan
- **Task_List**: Kumpulan semua Task yang dikelola oleh App
- **Filter**: Mekanisme untuk menampilkan subset dari Task_List berdasarkan status
- **Storage**: Mekanisme penyimpanan data berbasis localStorage di browser

## Requirements

### Requirement 1: Menambahkan Tugas Baru

**User Story:** Sebagai pengguna, saya ingin menambahkan tugas baru, agar saya dapat mencatat hal-hal yang perlu dikerjakan.

#### Acceptance Criteria

1. THE App SHALL menyediakan input field untuk memasukkan judul tugas baru
2. WHEN pengguna memasukkan judul tugas dan menekan tombol tambah atau menekan tombol Enter, THE App SHALL menambahkan Task baru ke Task_List dengan status "belum selesai"
3. WHEN Task baru berhasil ditambahkan, THE App SHALL mengosongkan input field secara otomatis
4. IF pengguna mencoba menambahkan tugas dengan judul kosong atau hanya berisi spasi, THEN THE App SHALL menampilkan pesan validasi dan tidak menambahkan Task ke Task_List

---

### Requirement 2: Menampilkan Daftar Tugas

**User Story:** Sebagai pengguna, saya ingin melihat semua tugas saya, agar saya dapat mengetahui apa yang perlu dikerjakan.

#### Acceptance Criteria

1. THE App SHALL menampilkan semua Task dalam Task_List secara berurutan berdasarkan waktu pembuatan (terbaru di atas)
2. WHEN Task_List kosong, THE App SHALL menampilkan pesan informasi bahwa belum ada tugas
3. THE App SHALL menampilkan judul dan status setiap Task secara visual berbeda antara Task yang sudah selesai dan belum selesai

---

### Requirement 3: Menyelesaikan Tugas

**User Story:** Sebagai pengguna, saya ingin menandai tugas sebagai selesai, agar saya dapat melacak progres pekerjaan saya.

#### Acceptance Criteria

1. WHEN pengguna mengklik checkbox pada sebuah Task, THE App SHALL mengubah status Task tersebut dari "belum selesai" menjadi "selesai"
2. WHEN pengguna mengklik checkbox pada Task yang sudah berstatus "selesai", THE App SHALL mengubah status Task tersebut kembali menjadi "belum selesai"
3. WHEN status Task berubah, THE App SHALL memperbarui tampilan Task secara visual (misalnya teks dicoret untuk Task selesai)

---

### Requirement 4: Mengedit Tugas

**User Story:** Sebagai pengguna, saya ingin mengedit judul tugas yang sudah ada, agar saya dapat memperbaiki atau memperbarui informasi tugas.

#### Acceptance Criteria

1. WHEN pengguna mengklik tombol edit pada sebuah Task, THE App SHALL menampilkan input field yang berisi judul Task saat ini untuk diedit
2. WHEN pengguna menyimpan perubahan dengan menekan tombol simpan atau menekan Enter, THE App SHALL memperbarui judul Task dengan nilai baru
3. IF pengguna mencoba menyimpan judul Task yang kosong atau hanya berisi spasi, THEN THE App SHALL menampilkan pesan validasi dan tidak menyimpan perubahan
4. WHEN pengguna menekan tombol batal atau menekan Escape saat mengedit, THE App SHALL membatalkan perubahan dan mengembalikan tampilan Task ke kondisi semula

---

### Requirement 5: Menghapus Tugas

**User Story:** Sebagai pengguna, saya ingin menghapus tugas yang tidak relevan, agar Task_List tetap bersih dan terorganisir.

#### Acceptance Criteria

1. WHEN pengguna mengklik tombol hapus pada sebuah Task, THE App SHALL menghapus Task tersebut dari Task_List secara permanen
2. WHEN Task berhasil dihapus, THE App SHALL memperbarui tampilan Task_List tanpa Task yang dihapus

---

### Requirement 6: Memfilter Tugas

**User Story:** Sebagai pengguna, saya ingin memfilter tugas berdasarkan statusnya, agar saya dapat fokus pada tugas yang relevan.

#### Acceptance Criteria

1. THE App SHALL menyediakan Filter dengan tiga pilihan: "Semua", "Belum Selesai", dan "Selesai"
2. WHEN pengguna memilih Filter "Semua", THE App SHALL menampilkan seluruh Task dalam Task_List
3. WHEN pengguna memilih Filter "Belum Selesai", THE App SHALL menampilkan hanya Task dengan status "belum selesai"
4. WHEN pengguna memilih Filter "Selesai", THE App SHALL menampilkan hanya Task dengan status "selesai"

---

### Requirement 7: Menghapus Semua Tugas Selesai

**User Story:** Sebagai pengguna, saya ingin menghapus semua tugas yang sudah selesai sekaligus, agar saya dapat membersihkan Task_List dengan cepat.

#### Acceptance Criteria

1. THE App SHALL menyediakan tombol "Hapus Semua Selesai" yang hanya aktif ketika terdapat minimal satu Task dengan status "selesai"
2. WHEN pengguna mengklik tombol "Hapus Semua Selesai", THE App SHALL menghapus semua Task dengan status "selesai" dari Task_List sekaligus

---

### Requirement 8: Persistensi Data

**User Story:** Sebagai pengguna, saya ingin tugas saya tetap tersimpan setelah menutup atau me-refresh browser, agar saya tidak kehilangan data.

#### Acceptance Criteria

1. WHEN Task_List mengalami perubahan (tambah, edit, hapus, atau ubah status), THE App SHALL menyimpan Task_List terbaru ke Storage
2. WHEN App pertama kali dimuat, THE App SHALL memuat Task_List dari Storage jika data tersedia
3. IF Storage tidak mengandung data Task_List, THEN THE App SHALL menginisialisasi Task_List sebagai daftar kosong
