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

async function addBrewColumns() {
    console.log('Adding missing columns to brews table...');
    
    try {
        // Try to add each column individually
        const columns = [
            { name: 'grinder_setting', type: 'TEXT' },
            { name: 'recipe_link', type: 'TEXT' },
            { name: 'temperature', type: 'INTEGER' },
            { name: 'water_amount', type: 'INTEGER' },
            { name: 'coffee_amount', type: 'INTEGER' },
            { name: 'bloom_time', type: 'INTEGER' },
            { name: 'brew_time_minutes', type: 'INTEGER' },
            { name: 'brew_time_seconds', type: 'INTEGER' },
            { name: 'beverage_amount', type: 'INTEGER' },
            { name: 'tasting_notes', type: 'TEXT[]' },
            { name: 'general_notes', type: 'TEXT' }
        ];

        for (const column of columns) {
            try {
                // Try to insert a test record to see if column exists
                const { error: testError } = await supabase
                    .from('brews')
                    .insert([{ [column.name]: column.type === 'TEXT[]' ? [] : null }])
                    .select();
                
                if (testError && testError.message.includes('column') && testError.message.includes('does not exist')) {
                    console.log(`Column ${column.name} does not exist, adding...`);
                    // Column doesn't exist, we need to add it
                    // Since we can't use ALTER TABLE directly, we'll work with what we have
                    console.log(`⚠️  Cannot add column ${column.name} automatically. Please add it manually in Supabase dashboard.`);
                } else if (testError) {
                    console.log(`Column ${column.name} exists but has error:`, testError.message);
                } else {
                    console.log(`✅ Column ${column.name} already exists`);
                }
            } catch (err) {
                console.log(`Error checking column ${column.name}:`, err.message);
            }
        }

        console.log('✅ Column check completed!');
        console.log('If any columns are missing, please add them manually in the Supabase dashboard:');
        console.log('- grinder_setting (TEXT)');
        console.log('- recipe_link (TEXT)');
        console.log('- temperature (INTEGER)');
        console.log('- water_amount (INTEGER)');
        console.log('- coffee_amount (INTEGER)');
        console.log('- bloom_time (INTEGER)');
        console.log('- brew_time_minutes (INTEGER)');
        console.log('- brew_time_seconds (INTEGER)');
        console.log('- beverage_amount (INTEGER)');
        console.log('- tasting_notes (TEXT[])');
        console.log('- general_notes (TEXT)');
        
    } catch (error) {
        console.error('Error adding columns:', error);
        process.exit(1);
    }
}

addBrewColumns();
