import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oravheipcmbgsspjygsd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yYXZoZWlwY21iZ3NzcGp5Z3NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxNTEwNTIsImV4cCI6MjA0NzcyNzA1Mn0.5UqcZfuSzlw9Ddex1wyhZ5TjdZAErPFG5h83JPvwvpo'

export const supabase = createClient(supabaseUrl, supabaseKey);




