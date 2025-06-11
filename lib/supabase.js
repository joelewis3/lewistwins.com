import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://okdarbjdqcllqryxcucl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rZGFyYmpkcWNsbHFyeXhjdWNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2Njc2MjcsImV4cCI6MjA2NTI0MzYyN30.Whxi6M57INCO_yNi7DfhhTxvRyLyrxQ0Xq22k4JVMpY'

export const supabase = createClient(supabaseUrl, supabaseKey) 