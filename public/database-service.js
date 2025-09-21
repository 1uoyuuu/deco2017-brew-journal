// Database service for brew journal - UPDATED TO MATCH ORIGINAL FORM STRUCTURE
import { supabase } from './supabase-config.js';

export class DatabaseService {
  // Coffee operations with roaster and origin joins
  static async getCoffees() {
    const { data, error } = await supabase
      .from('coffees')
      .select(`
        *,
        roasters:roaster_id(name, country),
        origins:origin_id(country, region, farm, producer, elevation, varietal)
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching coffees:', error);
      return [];
    }
    return data || [];
  }

  static async addCoffee(coffeeData) {
    // First, handle roaster
    let roasterId = null;
    if (coffeeData.roaster) {
      const { data: roaster, error: roasterError } = await supabase
        .from('roasters')
        .upsert({ name: coffeeData.roaster.name, country: coffeeData.roaster.country })
        .select('id')
        .single();
      
      if (roasterError) {
        console.error('Error handling roaster:', roasterError);
      } else {
        roasterId = roaster.id;
      }
    }

    // Then, handle origin
    let originId = null;
    if (coffeeData.origin) {
      const { data: origin, error: originError } = await supabase
        .from('origins')
        .upsert({
          country: coffeeData.origin.country,
          region: coffeeData.origin.region,
          farm: coffeeData.origin.farm,
          producer: coffeeData.origin.producer,
          elevation: coffeeData.origin.elevation,
          varietal: coffeeData.origin.varietal
        })
        .select('id')
        .single();
      
      if (originError) {
        console.error('Error handling origin:', originError);
      } else {
        originId = origin.id;
      }
    }

    // Finally, insert coffee
    const { data, error } = await supabase
      .from('coffees')
      .insert([{
        name: coffeeData.name,
        type: coffeeData.type,
        roast_level: coffeeData.roastLevel,
        roast_date: coffeeData.roastDate,
        processing_method: coffeeData.process,
        weight: coffeeData.weight,
        price: coffeeData.price,
        flavour: coffeeData.flavour,
        image_data: coffeeData.image_data,
        roaster_id: roasterId,
        origin_id: originId
      }])
      .select(`
        *,
        roasters:roaster_id(name, country),
        origins:origin_id(country, region, farm, producer, elevation, varietal)
      `)
      .single();
    
    if (error) {
      console.error('Error adding coffee:', error);
      return null;
    }
    return data;
  }

  static async deleteCoffee(id) {
    const { error } = await supabase
      .from('coffees')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting coffee:', error);
      return false;
    }
    return true;
  }

  // Dripper operations
  static async getDrippers() {
    const { data, error } = await supabase
      .from('drippers')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching drippers:', error);
      return [];
    }
    return data || [];
  }

  static async addDripper(dripperData) {
    const { data, error } = await supabase
      .from('drippers')
      .insert([{
        name: dripperData.name,
        brand: dripperData.brand,
        material: dripperData.material,
        image_data: dripperData.image_data
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Error adding dripper:', error);
      return null;
    }
    return data;
  }

  static async deleteDripper(id) {
    const { error } = await supabase
      .from('drippers')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting dripper:', error);
      return false;
    }
    return true;
  }

  // Grinder operations
  static async getGrinders() {
    const { data, error } = await supabase
      .from('grinders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching grinders:', error);
      return [];
    }
    return data || [];
  }

  static async addGrinder(grinderData) {
    const { data, error } = await supabase
      .from('grinders')
      .insert([{
        name: grinderData.name,
        brand: grinderData.brand,
        burr_type: grinderData.burrType,
        image_data: grinderData.image_data
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Error adding grinder:', error);
      return null;
    }
    return data;
  }

  static async deleteGrinder(id) {
    const { error } = await supabase
      .from('grinders')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting grinder:', error);
      return false;
    }
    return true;
  }

  // Brew operations
  static async getBrews() {
    const { data, error } = await supabase
      .from('brews')
      .select(`
        *,
        coffees:coffee_id(name, image_data, processing_method, roasters:roaster_id(name), origins:origin_id(country)),
        drippers:dripper_id(name),
        grinders:grinder_id(name)
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching brews:', error);
      return [];
    }
    return data || [];
  }

  static async addBrew(brewData) {
    const { data, error } = await supabase
      .from('brews')
      .insert([{
        coffee_id: brewData.coffee_id,
        dripper_id: brewData.dripper_id,
        grinder_id: brewData.grinder_id,
        grinder_setting: brewData.grinder_setting,
        recipe_link: brewData.recipe_link,
        temperature: brewData.temperature,
        water_amount: brewData.water_amount,
        coffee_amount: brewData.coffee_amount,
        bloom_time: brewData.bloom_time,
        brew_time_minutes: brewData.brew_time_minutes,
        brew_time_seconds: brewData.brew_time_seconds,
        beverage_amount: brewData.beverage_amount,
        tasting_notes: brewData.tasting_notes,
        rating: brewData.rating,
        general_notes: brewData.general_notes
      }])
      .select(`
        *,
        coffees:coffee_id(name, image_data, processing_method, roasters:roaster_id(name), origins:origin_id(country)),
        drippers:dripper_id(name),
        grinders:grinder_id(name)
      `)
      .single();
    
    if (error) {
      console.error('Error adding brew:', error);
      return null;
    }
    return data;
  }

  static async deleteBrew(id) {
    const { error } = await supabase
      .from('brews')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting brew:', error);
      return false;
    }
    return true;
  }

  // Load all data with proper joins
  static async loadData() {
    
    try {
      const [coffees, drippers, grinders, brews] = await Promise.all([
        this.getCoffees(),
        this.getDrippers(),
        this.getGrinders(),
        this.getBrews()
      ]);
      
      
      return { coffees, drippers, grinders, brews };
      
    } catch (error) {
      console.error('Error loading data:', error);
      return {
        coffees: [],
        drippers: [],
        grinders: [],
        brews: []
      };
    }
  }
}

// Export individual functions for compatibility
export const loadData = () => DatabaseService.loadData();
export const getCoffees = () => DatabaseService.getCoffees();
export const getDrippers = () => DatabaseService.getDrippers();
export const getGrinders = () => DatabaseService.getGrinders();
export const getBrews = () => DatabaseService.getBrews();
export const addCoffee = (coffee) => DatabaseService.addCoffee(coffee);
export const addDripper = (dripper) => DatabaseService.addDripper(dripper);
export const addGrinder = (grinder) => DatabaseService.addGrinder(grinder);
export const addBrew = (brew) => DatabaseService.addBrew(brew);
export const deleteCoffee = (id) => DatabaseService.deleteCoffee(id);
export const deleteDripper = (id) => DatabaseService.deleteDripper(id);
export const deleteGrinder = (id) => DatabaseService.deleteGrinder(id);
export const deleteBrew = (id) => DatabaseService.deleteBrew(id);
