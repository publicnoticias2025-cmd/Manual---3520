
export interface BrandSettings {
  id: number;
  logo_url: string;
  photo_url: string;
  updated_at?: string;
}

export type DbStatus = 'connected' | 'error' | 'idle' | 'missing_table';
