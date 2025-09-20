# Sample Data Setup Guide 📊

## 🎯 **What This Does**

This script populates your Supabase database with sample data from the README, including:
- **6 Coffees** with full details (roasters, origins, flavors, images)
- **3 Drippers** with specifications and images
- **3 Grinders** with specifications and images  
- **3 Brews** with complete brewing data
- **5 Roasters** and **6 Origins** with detailed information

## 🚀 **How to Run**

### **Step 1: Ensure Environment Variables are Set**
Make sure your `.env` file contains:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### **Step 2: Run the Population Script**
```bash
npm run populate-sample-data
```

## 📋 **Sample Data Included**

### **☕ Coffees (6 items)**
1. **Fruity Bomb** - Single Origin, Extra Light, Colombia
2. **Gundam Blend** - Blend, Medium, Brazil  
3. **Daye Bensa** - Single Origin, Light, Ethiopia
4. **Mysterious** - Single Origin, Light, Colombia
5. **Finca el paraiso** - Single Origin, Light, Colombia
6. **Santa clara** - Single Origin, Omni roast, Guatemala

### **🔧 Drippers (3 items)**
1. **Origami** - Fellow, Ceramic
2. **V60** - Hario, Metal
3. **Orea V3** - Orea, Plastic

### **⚙️ Grinders (3 items)**
1. **C40** - Comandante, Conical
2. **EK43** - Mahlkonic, Flat
3. **MK47** - Kinu, Conical

### **📝 Brews (3 items)**
1. **Daye Bensa** with Origami + C40
2. **Fruity Bomb** with Orea V3 + MK47
3. **Mysterious** with V60 + EK43

## 🖼️ **Images Included**

All sample data includes base64-encoded images:
- **Coffee images**: coffee-1.jpg through coffee-6.jpg
- **Dripper images**: dripper-origami.jpg, dripper-v60.jpg, dripper-orea.jpg
- **Grinder images**: grinder-c40.jpg, grinder-ek43.jpg, grinder-kinu.jpg

## ⚠️ **Important Notes**

- **This script will CLEAR all existing data** before adding sample data
- **Images are converted to base64** and stored directly in the database
- **All relationships** between tables are properly established
- **Data matches README specifications** exactly

## 🔄 **Reset Database**

To reset and repopulate with sample data:
```bash
npm run populate-sample-data
```

## ✅ **Verification**

After running the script, you should see:
- **Statistics updated** in the Overview section
- **Coffee list populated** with 6 items
- **Gadget carousel** with 6 items (3 drippers + 3 grinders)
- **Brew accordion** with 3 entries
- **All images displaying** correctly
- **Form dropdowns populated** with sample data

## 🎯 **Ready to Test**

Your database now contains comprehensive sample data that matches your original design perfectly! You can:
- **Browse all sections** with populated content
- **Test all functionality** with real data
- **Add new entries** using the forms
- **Delete and modify** existing entries

**Your brew journal is now fully populated and ready for testing!** 🚀
