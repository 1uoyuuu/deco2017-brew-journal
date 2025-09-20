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

async function fixBrewsSchema() {
    console.log('Fixing brews table schema...');
    
    try {
        // Drop the existing brews table
        console.log('Dropping existing brews table...');
        const { error: dropError } = await supabase.rpc('exec_sql', { 
            sql: 'DROP TABLE IF EXISTS brews CASCADE;' 
        });
        
        if (dropError) {
            console.log('Drop result:', dropError.message);
        } else {
            console.log('✅ Brews table dropped successfully');
        }

        // Create the new brews table with all fields
        console.log('Creating new brews table...');
        const createTableSQL = `
            CREATE TABLE brews (
                id SERIAL PRIMARY KEY,
                coffee_id INTEGER REFERENCES coffees(id) ON DELETE CASCADE,
                dripper_id INTEGER REFERENCES drippers(id) ON DELETE CASCADE,
                grinder_id INTEGER REFERENCES grinders(id) ON DELETE CASCADE,
                grinder_setting TEXT,
                recipe_link TEXT,
                temperature INTEGER,
                water_amount INTEGER,
                coffee_amount INTEGER,
                bloom_time INTEGER,
                brew_time_minutes INTEGER,
                brew_time_seconds INTEGER,
                beverage_amount INTEGER,
                tasting_notes TEXT[] DEFAULT '{}',
                rating INTEGER CHECK (rating >= 1 AND rating <= 5),
                general_notes TEXT,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
        `;

        const { error: createError } = await supabase.rpc('exec_sql', { 
            sql: createTableSQL 
        });
        
        if (createError) {
            console.log('Create result:', createError.message);
        } else {
            console.log('✅ New brews table created successfully');
        }

        // Recreate the index
        console.log('Creating index...');
        const { error: indexError } = await supabase.rpc('exec_sql', { 
            sql: 'CREATE INDEX idx_brews_coffee_id ON brews(coffee_id);' 
        });
        
        if (indexError) {
            console.log('Index result:', indexError.message);
        } else {
            console.log('✅ Index created successfully');
        }

        console.log('✅ Brews table schema fixed successfully!');
        
    } catch (error) {
        console.error('Error fixing schema:', error);
        process.exit(1);
    }
}

fixBrewsSchema();
