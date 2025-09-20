const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('Supabase URL or Anon Key is not set in environment variables.');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function updateBrewsSchema() {
    console.log('Updating brews table schema...');
    
    try {
        // Add the missing columns to the brews table
        const alterQueries = [
            'ALTER TABLE brews ADD COLUMN IF NOT EXISTS grinder_setting TEXT;',
            'ALTER TABLE brews ADD COLUMN IF NOT EXISTS recipe_link TEXT;',
            'ALTER TABLE brews ADD COLUMN IF NOT EXISTS temperature INTEGER;',
            'ALTER TABLE brews ADD COLUMN IF NOT EXISTS water_amount INTEGER;',
            'ALTER TABLE brews ADD COLUMN IF NOT EXISTS coffee_amount INTEGER;',
            'ALTER TABLE brews ADD COLUMN IF NOT EXISTS bloom_time INTEGER;',
            'ALTER TABLE brews ADD COLUMN IF NOT EXISTS brew_time_minutes INTEGER;',
            'ALTER TABLE brews ADD COLUMN IF NOT EXISTS brew_time_seconds INTEGER;',
            'ALTER TABLE brews ADD COLUMN IF NOT EXISTS beverage_amount INTEGER;',
            'ALTER TABLE brews ADD COLUMN IF NOT EXISTS tasting_notes TEXT[] DEFAULT \'{}\';',
            'ALTER TABLE brews ADD COLUMN IF NOT EXISTS general_notes TEXT;'
        ];

        for (const query of alterQueries) {
            const { error } = await supabase.rpc('exec_sql', { sql: query });
            if (error) {
                console.log(`Query: ${query}`);
                console.log(`Result: ${error.message}`);
            } else {
                console.log(`✅ Added column successfully`);
            }
        }

        console.log('✅ Brews table schema updated successfully!');
        
    } catch (error) {
        console.error('Error updating schema:', error);
        process.exit(1);
    }
}

updateBrewsSchema();
