-- Drop existing tables in correct order (due to foreign key constraints)
DROP TABLE IF EXISTS brews CASCADE;
DROP TABLE IF EXISTS coffees CASCADE;
DROP TABLE IF EXISTS drippers CASCADE;
DROP TABLE IF EXISTS grinders CASCADE;
DROP TABLE IF EXISTS roasters CASCADE;
DROP TABLE IF EXISTS origins CASCADE;

-- Drop the function if it exists
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Create function for updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create roasters table
CREATE TABLE roasters (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    country TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create origins table
CREATE TABLE origins (
    id SERIAL PRIMARY KEY,
    country TEXT NOT NULL,
    region TEXT,
    farm TEXT,
    producer TEXT,
    elevation INTEGER,
    varietal TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create coffees table with all form fields
CREATE TABLE coffees (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT,
    roast_level TEXT,
    roast_date DATE,
    processing_method TEXT,
    weight INTEGER, -- in grams
    price DECIMAL(10,2), -- in dollars
    flavour TEXT[] DEFAULT '{}',
    image_data TEXT, -- Store base64 image data directly
    roaster_id INTEGER REFERENCES roasters(id) ON DELETE SET NULL,
    origin_id INTEGER REFERENCES origins(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create drippers table
CREATE TABLE drippers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    brand TEXT,
    material TEXT,
    image_data TEXT, -- Store base64 image data directly
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create grinders table
CREATE TABLE grinders (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    brand TEXT,
    burr_type TEXT,
    image_data TEXT, -- Store base64 image data directly
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create brews table with ALL brew form fields
CREATE TABLE brews (
    id SERIAL PRIMARY KEY,
    coffee_id INTEGER REFERENCES coffees(id) ON DELETE CASCADE,
    dripper_id INTEGER REFERENCES drippers(id) ON DELETE CASCADE,
    grinder_id INTEGER REFERENCES grinders(id) ON DELETE CASCADE,
    
    -- Brewing parameters
    grinder_setting TEXT,
    recipe_link TEXT,
    temperature INTEGER, -- water temperature in celsius
    water_amount INTEGER, -- in grams
    coffee_amount INTEGER, -- in grams
    bloom_time INTEGER, -- in seconds
    brew_time_minutes INTEGER,
    brew_time_seconds INTEGER,
    beverage_amount INTEGER, -- total beverage weight in grams
    
    -- Tasting and notes
    tasting_notes TEXT[] DEFAULT '{}', -- array of flavour tags
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    general_notes TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_roasters_name ON roasters(name);
CREATE INDEX idx_origins_country ON origins(country);
CREATE INDEX idx_coffees_name ON coffees(name);
CREATE INDEX idx_coffees_roaster_id ON coffees(roaster_id);
CREATE INDEX idx_coffees_origin_id ON coffees(origin_id);
CREATE INDEX idx_drippers_name ON drippers(name);
CREATE INDEX idx_grinders_name ON grinders(name);
CREATE INDEX idx_brews_coffee_id ON brews(coffee_id);
CREATE INDEX idx_brews_dripper_id ON brews(dripper_id);
CREATE INDEX idx_brews_grinder_id ON brews(grinder_id);
CREATE INDEX idx_brews_created_at ON brews(created_at);

-- Create triggers for updated_at
CREATE TRIGGER update_roasters_updated_at BEFORE UPDATE ON roasters
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_origins_updated_at BEFORE UPDATE ON origins
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_coffees_updated_at BEFORE UPDATE ON coffees
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_drippers_updated_at BEFORE UPDATE ON drippers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_grinders_updated_at BEFORE UPDATE ON grinders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_brews_updated_at BEFORE UPDATE ON brews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data that matches the original form structure
-- First insert roasters
INSERT INTO roasters (name, country) VALUES
('Blue Bottle', 'United States'),
('Stumptown', 'United States'),
('Intelligentsia', 'United States');

-- Then insert origins
INSERT INTO origins (country, region, farm, producer, elevation, varietal) VALUES
('Ethiopia', 'Yirgacheffe', 'Daye Bensa', 'Daye Bensa', 2000, 'Heirloom'),
('Colombia', 'Huila', 'Finca El Paraiso', 'Diego Bermudez', 1800, 'Caturra'),
('Ethiopia', 'Sidamo', 'Guji', 'Various', 1900, 'Heirloom');

-- Then insert coffees with proper references (images will be added via JavaScript)
INSERT INTO coffees (name, type, roast_level, roast_date, processing_method, weight, price, flavour, image_data, roaster_id, origin_id) VALUES
('Fruity Bomb', 'Single Origin', 'Light', '2024-01-15', 'Washed', 250, 18.50, ARRAY['Strawberry', 'Cream', 'Mango'], NULL, 1, 1),
('Gundam Blend', 'Blend', 'Medium', '2024-01-20', 'Natural', 500, 22.00, ARRAY['Apricot', 'Raspberry jam', 'French earl gray'], NULL, 2, 2),
('Daye Bensa', 'Single Origin', 'Light', '2024-01-25', 'Honey', 250, 24.00, ARRAY['Mango', 'Kiwi', 'Strawberry', 'Floral'], NULL, 3, 3);

-- Insert drippers (images will be added via JavaScript)
INSERT INTO drippers (name, brand, material, image_data) VALUES
('V60', 'Hario', 'Ceramic', NULL),
('Origami', 'Origami', 'Ceramic', NULL),
('Orea V3', 'Orea', 'Ceramic', NULL);

-- Insert grinders (images will be added via JavaScript)
INSERT INTO grinders (name, brand, burr_type, image_data) VALUES
('C40', 'Comandante', 'Conical', NULL),
('EK43', 'Mahlkönig', 'Flat', NULL),
('Kinu M47', 'Kinu', 'Conical', NULL);

-- Insert sample brews with all the detailed fields
INSERT INTO brews (
    coffee_id, dripper_id, grinder_id,
    grinder_setting, recipe_link, temperature, water_amount, coffee_amount,
    bloom_time, brew_time_minutes, brew_time_seconds, beverage_amount,
    tasting_notes, rating, general_notes
) VALUES
(1, 1, 1, '20 clicks', 'https://example.com/recipe1', 92, 300, 18, 30, 2, 30, 280, ARRAY['Bright', 'Fruity', 'Clean'], 4, 'Great morning cup!'),
(2, 2, 2, 'Medium-fine', 'https://example.com/recipe2', 88, 250, 15, 45, 3, 15, 240, ARRAY['Chocolate', 'Nutty', 'Smooth'], 5, 'Perfect afternoon brew'),
(3, 3, 3, '22 clicks', 'https://example.com/recipe3', 90, 200, 12, 40, 2, 45, 190, ARRAY['Floral', 'Tea-like', 'Delicate'], 3, 'Interesting but not my favorite');
