// Script to populate database with base64 images
// Run this with: node populate-images.js

import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://pcvsoorcldhtykxmejkn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjdnNvb3JjbGRodHlreG1lamtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNzA4NDEsImV4cCI6MjA3Mzk0Njg0MX0.OmSWtXNS3Y5L_K9WW8zPVKFgT8FQv0GUC5WbI5i0M9U';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Image mapping
const imageMap = {
    'coffee-1.jpg': 1, // Fruity Bomb
    'coffee-2.jpg': 2, // Gundam Blend
    'coffee-3.jpg': 3, // Daye Bensa
    'dripper-v60.jpg': 1, // V60
    'dripper-origami.jpg': 2, // Origami
    'dripper-orea.jpg': 3, // Orea V3
    'grinder-c40.jpg': 1, // C40
    'grinder-ek43.jpg': 2, // EK43
    'grinder-kinu.jpg': 3 // Kinu M47
};

async function convertImageToBase64(imagePath) {
    try {
        const imageBuffer = fs.readFileSync(imagePath);
        const base64 = imageBuffer.toString('base64');
        return `data:image/jpeg;base64,${base64}`;
    } catch (error) {
        console.error(`Error reading image ${imagePath}:`, error);
        return null;
    }
}

async function updateCoffeeImage(coffeeId, imageData) {
    const { error } = await supabase
        .from('coffees')
        .update({ image_data: imageData })
        .eq('id', coffeeId);
    
    if (error) {
        console.error(`Error updating coffee ${coffeeId}:`, error);
    } else {
        console.log(`Updated coffee ${coffeeId} with image`);
    }
}

async function updateDripperImage(dripperId, imageData) {
    const { error } = await supabase
        .from('drippers')
        .update({ image_data: imageData })
        .eq('id', dripperId);
    
    if (error) {
        console.error(`Error updating dripper ${dripperId}:`, error);
    } else {
        console.log(`Updated dripper ${dripperId} with image`);
    }
}

async function updateGrinderImage(grinderId, imageData) {
    const { error } = await supabase
        .from('grinders')
        .update({ image_data: imageData })
        .eq('id', grinderId);
    
    if (error) {
        console.error(`Error updating grinder ${grinderId}:`, error);
    } else {
        console.log(`Updated grinder ${grinderId} with image`);
    }
}

async function populateImages() {
    console.log('Starting image population...');
    
    const imagesDir = path.join(process.cwd(), 'public', 'src', 'images');
    
    for (const [filename, id] of Object.entries(imageMap)) {
        const imagePath = path.join(imagesDir, filename);
        
        if (!fs.existsSync(imagePath)) {
            console.log(`Image not found: ${imagePath}`);
            continue;
        }
        
        const base64Data = await convertImageToBase64(imagePath);
        if (!base64Data) continue;
        
        if (filename.startsWith('coffee-')) {
            await updateCoffeeImage(id, base64Data);
        } else if (filename.startsWith('dripper-')) {
            await updateDripperImage(id, base64Data);
        } else if (filename.startsWith('grinder-')) {
            await updateGrinderImage(id, base64Data);
        }
    }
    
    console.log('Image population completed!');
}

populateImages().catch(console.error);
