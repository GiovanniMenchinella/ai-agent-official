import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://alzvdmwydiydunmehhjt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsenZkbXd5ZGl5ZHVubWVoaGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MjQ5OTksImV4cCI6MjA1OTEwMDk5OX0.x6Oz4f0ZElCRpWyOOQVw0gw_KC3F0JQ6ZNpCA6Z-a_I';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 