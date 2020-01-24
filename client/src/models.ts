export interface User {
  id: number,
  created_at: string,
  full_name: string,
  email: string,
}

export interface Shift {
  id: number,
  created_at: string,
  deleted_at: string | null,
  sign_in_date: string | null,
  sign_out_date: string | null,
  user_id: number,
}