const { createClient } = require('@supabase/supabase-js');
const fs = require('fs').promises;
const path = require('path');

// Load environment variables
require('dotenv').config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('Supabase URL or Anon Key is not set in environment variables.');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function convertImageToBase64(imagePath) {
    try {
        const data = await fs.readFile(imagePath);
        return `data:image/jpeg;base64,${data.toString('base64')}`;
    } catch (error) {
        console.error(`Error converting image ${imagePath} to base64:`, error);
        return null;
    }
}

async function populateSampleData() {
    console.log('Starting sample data population...');
    
    try {
        // Clear existing data first
        console.log('Clearing existing data...');
        await supabase.from('brews').delete().neq('id', 0);
        await supabase.from('coffees').delete().neq('id', 0);
        await supabase.from('drippers').delete().neq('id', 0);
        await supabase.from('grinders').delete().neq('id', 0);
        await supabase.from('roasters').delete().neq('id', 0);
        await supabase.from('origins').delete().neq('id', 0);

        // Sample roasters data
        const roasters = [
            { name: 'Standout', country: 'Sweden' },
            { name: 'Sleepy Bloc', country: 'Australia' },
            { name: 'Jibbithelittles', country: 'Australia' },
            { name: 'Fragment', country: 'Australia' },
            { name: 'Stitch', country: 'Australia' }
        ];

        console.log('Adding roasters...');
        const { data: roasterData, error: roasterError } = await supabase
            .from('roasters')
            .insert(roasters)
            .select();
        
        if (roasterError) throw roasterError;
        console.log('Roasters added successfully');

        // Sample origins data
        const origins = [
            { country: 'Colombia', region: 'Cauca', farm: 'El Paraiso', producer: '', elevation: null, varietal: 'Castillo' },
            { country: 'Brazil', region: '', farm: 'Sitio Melado', producer: 'Señor Fonseca', elevation: 1250, varietal: 'Mundo Novo' },
            { country: 'Ethiopia', region: 'Sidamo', farm: '', producer: '', elevation: null, varietal: 'Heirloom' },
            { country: 'Colombia', region: 'Cauca', farm: 'El Paraiso 92', producer: '', elevation: null, varietal: 'Typica' },
            { country: 'Colombia', region: '', farm: '', producer: 'Diego Benitez', elevation: null, varietal: 'Pink bourbon' },
            { country: 'Guatemala', region: '', farm: 'Santa Clara', producer: '', elevation: null, varietal: 'Geisha' }
        ];

        console.log('Adding origins...');
        const { data: originData, error: originError } = await supabase
            .from('origins')
            .insert(origins)
            .select();
        
        if (originError) throw originError;
        console.log('Origins added successfully');

        // Sample coffees data
        const coffeeData = [
            {
                name: 'Fruity Bomb',
                type: 'Single Origin',
                roast_level: 'Extra Light',
                roast_date: '2024-01-15',
                processing_method: 'Carbonic Maceration',
                weight: 250,
                price: 30,
                flavour: ['Strawberry', 'Cream', 'Mango'],
                roaster_id: roasterData.find(r => r.name === 'Standout').id,
                origin_id: originData.find(o => o.country === 'Colombia' && o.region === 'Cauca').id
            },
            {
                name: 'Gundam Blend',
                type: 'Blend',
                roast_level: 'Medium',
                roast_date: '2024-01-20',
                processing_method: 'Natural',
                weight: 250,
                price: 22,
                flavour: ['Apricot', 'Rasberry jam', 'French earl gray'],
                roaster_id: roasterData.find(r => r.name === 'Sleepy Bloc').id,
                origin_id: originData.find(o => o.country === 'Brazil').id
            },
            {
                name: 'Daye Bensa',
                type: 'Single Origin',
                roast_level: 'Light',
                roast_date: '2024-01-25',
                processing_method: 'Natural Anaerobic',
                weight: 75,
                price: 25,
                flavour: ['Mango', 'Kiwi', 'Strawberry', 'Floral'],
                roaster_id: roasterData.find(r => r.name === 'Jibbithelittles').id,
                origin_id: originData.find(o => o.country === 'Ethiopia').id
            },
            {
                name: 'Mysterious',
                type: 'Single Origin',
                roast_level: 'Light',
                roast_date: '2024-02-01',
                processing_method: 'Anaerobic Natural',
                weight: 100,
                price: 40,
                flavour: ['Strawberry', 'Molassess', 'Peach', 'Candy'],
                roaster_id: roasterData.find(r => r.name === 'Fragment').id,
                origin_id: originData.find(o => o.country === 'Colombia' && o.region === 'Cauca').id
            },
            {
                name: 'Finca el paraiso',
                type: 'Single Origin',
                roast_level: 'Light',
                roast_date: '2024-02-05',
                processing_method: 'Thermal shock washed',
                weight: 75,
                price: 40,
                flavour: ['Strawberry', 'Rasberry', 'Cranberry'],
                roaster_id: roasterData.find(r => r.name === 'Jibbithelittles').id,
                origin_id: originData.find(o => o.country === 'Colombia' && o.farm === '').id
            },
            {
                name: 'Santa clara',
                type: 'Single Origin',
                roast_level: 'Omni roast',
                roast_date: '2024-02-10',
                processing_method: 'Washed',
                weight: 100,
                price: 50,
                flavour: ['Cheery', 'Rose'],
                roaster_id: roasterData.find(r => r.name === 'Stitch').id,
                origin_id: originData.find(o => o.country === 'Guatemala').id
            }
        ];

        // Add images to coffees
        const imageDir = path.join(__dirname, 'public', 'src', 'images');
        const coffeeImages = [
            'coffee-1.jpg', 'coffee-2.jpg', 'coffee-3.jpg', 
            'coffee-4.jpg', 'coffee-5.jpg', 'coffee-6.jpg'
        ];

        for (let i = 0; i < coffeeData.length; i++) {
            const imagePath = path.join(imageDir, coffeeImages[i]);
            const base64Data = await convertImageToBase64(imagePath);
            if (base64Data) {
                coffeeData[i].image_data = base64Data;
            }
        }

        console.log('Adding coffees...');
        const { data: coffeeResult, error: coffeeError } = await supabase
            .from('coffees')
            .insert(coffeeData)
            .select(`
                *,
                roasters:roaster_id(name, country),
                origins:origin_id(country, region, farm, producer, elevation, varietal)
            `);
        
        if (coffeeError) throw coffeeError;
        console.log('Coffees added successfully');

        // Sample drippers data
        const dripperData = [
            {
                name: 'Origami',
                brand: 'Fellow',
                material: 'Ceramic'
            },
            {
                name: 'V60',
                brand: 'Hario',
                material: 'Metal'
            },
            {
                name: 'Orea V3',
                brand: 'Orea',
                material: 'Plastic'
            }
        ];

        // Add images to drippers
        const dripperImages = ['dripper-origami.jpg', 'dripper-v60.jpg', 'dripper-orea.jpg'];
        for (let i = 0; i < dripperData.length; i++) {
            const imagePath = path.join(imageDir, dripperImages[i]);
            const base64Data = await convertImageToBase64(imagePath);
            if (base64Data) {
                dripperData[i].image_data = base64Data;
            }
        }

        console.log('Adding drippers...');
        const { data: dripperResult, error: dripperError } = await supabase
            .from('drippers')
            .insert(dripperData)
            .select();
        
        if (dripperError) throw dripperError;
        console.log('Drippers added successfully');

        // Sample grinders data
        const grinderData = [
            {
                name: 'C40',
                brand: 'Comandante',
                burr_type: 'Conical'
            },
            {
                name: 'EK43',
                brand: 'Mahlkonic',
                burr_type: 'Flat'
            },
            {
                name: 'MK47',
                brand: 'Kinu',
                burr_type: 'Conical'
            }
        ];

        // Add images to grinders
        const grinderImages = ['grinder-c40.jpg', 'grinder-ek43.jpg', 'grinder-kinu.jpg'];
        for (let i = 0; i < grinderData.length; i++) {
            const imagePath = path.join(imageDir, grinderImages[i]);
            const base64Data = await convertImageToBase64(imagePath);
            if (base64Data) {
                grinderData[i].image_data = base64Data;
            }
        }

        console.log('Adding grinders...');
        const { data: grinderResult, error: grinderError } = await supabase
            .from('grinders')
            .insert(grinderData)
            .select();
        
        if (grinderError) throw grinderError;
        console.log('Grinders added successfully');

        // Sample brews data (using all schema fields)
        const brewData = [
            {
                coffee_id: coffeeResult.find(c => c.name === 'Daye Bensa').id,
                dripper_id: dripperResult.find(d => d.name === 'Origami').id,
                grinder_id: grinderResult.find(g => g.name === 'C40').id,
                grinder_setting: '24',
                recipe_link: '',
                temperature: 92,
                water_amount: 240,
                coffee_amount: 16,
                bloom_time: 30,
                brew_time_minutes: 1,
                brew_time_seconds: 55,
                beverage_amount: 190,
                tasting_notes: ['Anything you like'],
                rating: 4,
                general_notes: ''
            },
            {
                coffee_id: coffeeResult.find(c => c.name === 'Fruity Bomb').id,
                dripper_id: dripperResult.find(d => d.name === 'Orea V3').id,
                grinder_id: grinderResult.find(g => g.name === 'MK47').id,
                grinder_setting: '3.5',
                recipe_link: '',
                temperature: 94,
                water_amount: 225,
                coffee_amount: 15,
                bloom_time: 30,
                brew_time_minutes: 1,
                brew_time_seconds: 45,
                beverage_amount: null,
                tasting_notes: ['Strawberry', 'Candy', 'Rasberry'],
                rating: 5,
                general_notes: ''
            },
            {
                coffee_id: coffeeResult.find(c => c.name === 'Mysterious').id,
                dripper_id: dripperResult.find(d => d.name === 'V60').id,
                grinder_id: grinderResult.find(g => g.name === 'EK43').id,
                grinder_setting: '',
                recipe_link: '',
                temperature: 93,
                water_amount: 225,
                coffee_amount: 15,
                bloom_time: 40,
                brew_time_minutes: 2,
                brew_time_seconds: 5,
                beverage_amount: 180,
                tasting_notes: ['Cherry', 'Rose water'],
                rating: 3,
                general_notes: ''
            }
        ];

        console.log('Adding brews...');
        const { data: brewResult, error: brewError } = await supabase
            .from('brews')
            .insert(brewData)
            .select(`
                *,
                coffees:coffee_id(name, processing_method, image_data, roasters:roaster_id(name), origins:origin_id(country)),
                drippers:dripper_id(name),
                grinders:grinder_id(name)
            `);
        
        if (brewError) throw brewError;
        console.log('Brews added successfully');

        console.log('✅ Sample data population completed successfully!');
        console.log(`Added: ${roasterData.length} roasters, ${originData.length} origins, ${coffeeResult.length} coffees, ${dripperResult.length} drippers, ${grinderResult.length} grinders, ${brewResult.length} brews`);

    } catch (error) {
        console.error('Error populating sample data:', error);
        process.exit(1);
    }
}

populateSampleData();
