import { createClient } from '@supabase/supabase-js';
const URL = 'https://lekynvuubrrgyxoncdkp.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxla3ludnV1YnJyZ3l4b25jZGtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQxMDQ3ODEsImV4cCI6MjAzOTY4MDc4MX0.RosFCqDYnZUFp_klcGRTtlVxeq41K4Yl7ORXQ9EoMWU'
// const supabase = createClient(URL, API_KEY);

export const supabase = createClient(URL, API_KEY);