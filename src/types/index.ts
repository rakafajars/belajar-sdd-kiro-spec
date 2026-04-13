export interface Task {
  id: string;          // UUID unik, dibuat saat task ditambahkan
  title: string;       // Judul tugas, tidak boleh kosong atau hanya spasi
  completed: boolean;  // Status: false = belum selesai, true = selesai
  createdAt: number;   // Unix timestamp (Date.now()) saat task dibuat
}

export type FilterType = 'all' | 'active' | 'completed';
