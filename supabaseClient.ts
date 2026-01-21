
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vdbocuvobjisudikgzbg.supabase.co';
const supabaseAnonKey = 'sb_publishable_sMM6qEtah3548_RzfPIm-w_UW2DfzqO';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
