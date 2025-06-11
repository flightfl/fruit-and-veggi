const vertexAIService = require('./services/vertexAIService');

const mongoose = require('mongoose');
const axios = require('axios');
const dotenv = require('dotenv');
const Produce = require('./models/produceModel');

dotenv.config();

const basicProduce = {
  fruits: [
    // Most common fruits (globally popular and widely available)
    'apple', 'banana', 'orange', 'grape', 'strawberry', 'lemon', 'lime', 
    'pineapple', 'mango', 'watermelon', 'peach', 'pear', 'cherry', 'plum',
    'grapefruit', 'kiwi', 'coconut', 'avocado', 'blueberry', 'raspberry',
    'cantaloupe', 'honeydew', 'papaya', 'nectarine', 'apricot',
    
    // A fruits
    'acai', 'aronia', 'asian pear',
    
    // B fruits  
    'blackberry', 'boysenberry', 'breadfruit',
    'bilberry', 'black sapote',
    
    // C fruits
    'clementine', 'cranberry', 'currant', 'cactus pear', 'cherimoya', 
    'cloudberry', 'crabapple', 'custard apple',
    'carambola',
    
    // D fruits
    'date', 'dragon fruit', 'durian', 'damson', 'dewberry',
    
    // E fruits
    'elderberry',
    
    // F fruits
    'fig', 'feijoa', 'finger lime',
    
    // G fruits
    'gooseberry', 'guava', 'goji berry', 'ground cherry', 'golden berry',
    
    // H fruits
    'huckleberry', 'horned melon',
    
    // I fruits
    'indian gooseberry',
    
    // J fruits
    'jackfruit', 'jujube',
    
    // K fruits
    'kumquat', 'kiwano', 'kaffir lime', 'key lime', 'kakadu plum',
    
    // L fruits
    'lingonberry', 'lychee', 'longan', 'loquat',
    'loganberry',
    
    // M fruits
    'mandarin', 'melon', 'mulberry', 'mamey', 'mangosteen', 
    'muscadine',
    
    // N fruits
    'noni', 'naranjilla', 'natal plum',
    
    // O fruits
    'olive', 'oregon grape',
    
    // P fruits
    'passion fruit', 'persimmon', 'plantain', 'pomegranate', 'pomelo', 
    'pawpaw', 'prickly pear', 'physalis', 'pitanga',
    
    // Q fruits
    'quince',
    
    // R fruits
    'rambutan', 'rose hip', 'red currant',
    'rose apple',
    
    // S fruits
    'starfruit', 'sapodilla', 'soursop', 'sugar apple',
    'surinam cherry', 'serviceberry', 'sea buckthorn',
    'sweet lime',
    
    // T fruits
    'tangerine', 'tamarillo', 'tamarind', 'tayberry', 'tomato',
    
    // U fruits
    'ugli fruit', 'ume',
    
    // V fruits
    'vanilla bean',
    
    // W fruits
    'white currant', 'white sapote',
    'wax apple', 'wild cherry',
    
    // Y fruits
    'yellow passion fruit', 'yuzu', 'yangmei', 'yacon'
  ],
  
  vegetables: [
    // Most common vegetables (globally popular and widely available)
    'potato', 'onion', 'carrot', 'tomato', 'lettuce', 'broccoli', 'spinach',
    'bell pepper', 'corn', 'cucumber', 'garlic', 'cabbage', 'mushroom',
    'celery', 'pea', 'bean', 'squash', 'sweet potato', 'cauliflower',
    'eggplant', 'zucchini', 'radish', 'beet', 'asparagus', 'kale',
    
    // A vegetables
    'artichoke', 'arugula', 'acorn squash',
    
    // B vegetables  
    'brussels sprouts', 'bok choy', 'bamboo shoots', 'basil', 'beet greens',
    'broccoli rabe', 'butter lettuce', 'butternut squash', 'black eyed pea',
    'banana pepper', 'broccoli romanesco', 'bitter melon', 'baby corn',
    
    // C vegetables
    'chard', 'chive', 'cilantro', 'cassava', 'celeriac', 'chicory', 
    'chinese broccoli', 'collard greens', 'cress', 'cardoon', 'napa cabbage',
    'chili pepper', 'chinese cabbage', 'chinese spinach', 'calabash',
    
    // D vegetables
    'daikon', 'delicata squash', 'dill',
    
    // E vegetables
    'endive', 'edamame', 'elephant garlic', 'escarole',
    
    // F vegetables
    'fennel', 'fava bean', 'fiddlehead fern', 'french bean',
    
    // G vegetables
    'ginger', 'green bean', 'green onion', 'garlic scapes', 'galangal',
    'gai lan',
    
    // H vegetables
    'hearts of palm', 'horseradish', 'hubbard squash', 'habanero pepper',
    
    // I vegetables
    'iceberg lettuce', 'italian parsley',
    
    // J vegetables
    'jerusalem artichoke', 'jicama', 'jalapeno', 'japanese eggplant',
    
    // K vegetables
    'kohlrabi', 'kidney bean', 'kabocha squash', 'kelp', 'komatsuna',
    
    // L vegetables
    'leek', 'lima bean', 'lemongrass', 'lotus root', 'lamb lettuce',
    
    // M vegetables
    'mache', 'mizuna', 'mustard greens', 'mung bean', 'marrow',
    'morel mushroom', 'malanga',
    
    // N vegetables
    'navy bean', 'nori', 'napa cabbage', 'new potato',
    
    // O vegetables
    'okra', 'oregano', 'oyster mushroom', 'pearl onion',
    
    // P vegetables
    'parsley', 'parsnip', 'pumpkin', 'plantain', 'pinto bean',
    'poblano pepper', 'portobello mushroom', 'purple cabbage',
    'purple potato', 'pickling cucumber',
    
    // R vegetables
    'radicchio', 'romaine lettuce', 'rutabaga', 'red cabbage', 'red pepper',
    'red onion', 'runner bean', 'rocket', 'ramps',
    
    // S vegetables
    'scallion', 'snap pea', 'sorrel', 'spaghetti squash', 'swiss chard',
    'shallot', 'sage', 'serrano pepper', 'sugar snap pea', 'shiitake mushroom',
    'summer squash', 'sea beans', 'salsify', 'snow pea',
    
    // T vegetables
    'turnip', 'taro', 'thyme', 'tomatillo', 'thai chili', 'turnip greens',
    'tuscan kale', 'tokyo turnip',
    
    // U vegetables
    'ulluco',
    
    // V vegetables
    'vidalia onion', 'vietnamese mint',
    
    // W vegetables
    'watercress', 'water chestnut', 'wax bean', 'winter squash',
    'white bean', 'wasabi', 'wild rice', 'winged bean', 'white eggplant',
    
    // Y vegetables
    'yam', 'yard long bean', 'yellow squash', 'yacon', 'yellow onion',
    'yu choy',
    
    // Z vegetables
    'zucchini blossom'
  ]
};

// USDA API configuration
const USDA_BASE_URL = 'https://api.nal.usda.gov/fdc/v1';
const USDA_API_KEY = process.env.USDA_API_KEY;

// Unsplash API configuration  
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
// PEXELS API configuration
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

// Rate limiting
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Search USDA for a food item
async function searchUSDAFood(foodName) {
  try {
    const response = await axios.post(`${USDA_BASE_URL}/foods/search`, {
      query: foodName,
      dataType: ['Foundation', 'SR Legacy'],
      pageSize: 10,
      requireAllWords: false
    }, {
      params: { api_key: USDA_API_KEY },
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.data.foods && response.data.foods.length > 0) {
      console.log(`Found ${response.data.foods.length} results for ${foodName}`);
      
      // First filter: Remove processed foods
      const filtered = response.data.foods.filter(food => {
        const desc = food.description.toLowerCase();
        const isProcessed = desc.includes('oil') || 
                           desc.includes('cooked') || 
                           desc.includes('canned') ||
                           desc.includes('dried') ||
                           desc.includes('frozen') ||
                           desc.includes('juice');
        const isRaw = desc.includes('raw') || desc.includes('fresh');
        return !isProcessed || isRaw;
      });
      
      const candidates = filtered.length > 0 ? filtered : response.data.foods;
      
      // Second filter - Check if result actually matches what we searched for
      const searchWords = foodName.toLowerCase().split(' ');
      const goodMatch = candidates.find(food => {
        const desc = food.description.toLowerCase();
        // At least half the words from search should be in the result
        const matchedWords = searchWords.filter(word => desc.includes(word));
        return matchedWords.length >= Math.ceil(searchWords.length / 2);
      });
      
      if (goodMatch) {
        console.log(`Using good match: ${goodMatch.description}`);
        return goodMatch;
      } else {
        console.log(`No good match found for "${foodName}" - best was "${candidates[0].description}"`);
        return null; // Force AI fallback
      }
    }
    return null;
  } catch (error) {
    console.error(`Error searching USDA for ${foodName}:`, error.message);
    return null;
  }
}

// Get image from Unsplash or Pexels
async function getImage(foodName) {
  // Try Unsplash first
  if (UNSPLASH_ACCESS_KEY) {
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: foodName,
          per_page: 1,
          orientation: 'landscape'
        },
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      });

      if (response.data.results && response.data.results.length > 0) {
        console.log(`Got Unsplash image for ${foodName}`);
        return response.data.results[0].urls.regular;
      }
    } catch (error) {
      if (error.response?.status === 403) {
        console.log(`Unsplash rate limit hit for ${foodName}, trying Pexels...`);
      } else {
        console.log(`Unsplash failed for ${foodName}, trying Pexels...`);
      }
    }
  }
  
  // Fallback to Pexels
  if (PEXELS_API_KEY) {
    try {
      const response = await axios.get('https://api.pexels.com/v1/search', {
        params: {
          query: foodName,
          per_page: 1,
          orientation: 'landscape'
        },
        headers: {
          'Authorization': PEXELS_API_KEY
        }
      });
      
      if (response.data.photos && response.data.photos.length > 0) {
        console.log(`Got Pexels image for ${foodName}`);
        return response.data.photos[0].src.medium;
      }
    } catch (error) {
      console.log(`Pexels also failed for ${foodName}: ${error.message}`);
    }
  }
}

function convertUSDAToOurFormat(usdaFood, category, imageUrl, originalName) {
  const nutrients = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0
  };
  
  if (usdaFood.foodNutrients) {
    usdaFood.foodNutrients.forEach(nutrient => {
      switch (nutrient.nutrientId) {
        case 1008: // Energy (calories)
          nutrients.calories = Math.round(nutrient.value || 0);
          console.log(`    Found calories: ${nutrient.value}`);
          break;
        case 1003: // Protein
          nutrients.protein = Math.round((nutrient.value || 0) * 100) / 100;
          console.log(`    Found protein: ${nutrient.value}`);
          break;
        case 1005: // Carbohydrates
          nutrients.carbs = Math.round((nutrient.value || 0) * 100) / 100;
          console.log(`    Found carbs: ${nutrient.value}`);
          break;
        case 1004: // Total lipid (fat)
          nutrients.fat = Math.round((nutrient.value || 0) * 100) / 100;
          console.log(`    Found fat: ${nutrient.value}`);
          break;
        case 1079: // Fiber
          nutrients.fiber = Math.round((nutrient.value || 0) * 100) / 100;
          console.log(`    Found fiber: ${nutrient.value}`);
          break;
      }
    });
  }

  const cleanName = originalName.charAt(0).toUpperCase() + originalName.slice(1);

  console.log(`    Final nutrients:`, nutrients);

  return {
    name: cleanName,
    category: category,
    imageUrl: imageUrl,
    nutrition: nutrients,
    dataSource: 'USDA',
    usdaId: usdaFood.fdcId
  };
}

async function getAINutritionData(foodName) {
  if (!vertexAIService.isAvailable()) {
    return null;
  }

  try {
    console.log(`Getting AI nutrition data for ${foodName}`);
    
    const prompt = `Please provide nutrition information for "${foodName}" per 100g in this exact JSON format:
    {
      "calories": number,
      "protein": number,
      "carbs": number,
      "fat": number,
      "fiber": number
    }
    
    Return only the JSON, no other text. Use typical values for raw ${foodName}.`;

    // Use the model directly like in your service
    const result = await vertexAIService.model.generateContent(prompt);
    
    // Extract text the same way as in your service
    let text = '';
    if (result.response) {
      if (typeof result.response.text === 'function') {
        text = result.response.text();
      } else if (result.response.candidates && result.response.candidates.length > 0) {
        const candidate = result.response.candidates[0];
        if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
          text = candidate.content.parts[0].text;
        }
      }
    }
    
    // Parse JSON
    const cleanText = text.replace(/```json|```/g, '').trim();
    const nutrition = JSON.parse(cleanText);
    
    console.log(`AI nutrition for ${foodName}:`, nutrition);
    return nutrition;
    
  } catch (error) {
    console.error(`AI nutrition failed for ${foodName}:`, error);
    return null;
  }
}

// Process a single food item
async function processFoodItem(foodName, category) {
  console.log(`Processing: ${foodName} (${category})`);
  
  try {
    // Check if already exists (use clean name)
    const cleanName = foodName.charAt(0).toUpperCase() + foodName.slice(1);
    const existing = await Produce.findOne({ name: cleanName });
    
    if (existing) {
      console.log(`Already exists: ${existing.name}`);
      return;
    }

    // Search USDA
    const usdaFood = await searchUSDAFood(foodName);
    await delay(100); // Rate limiting

    // Get image
    const imageUrl = await getImage(foodName);
    await delay(100); // Rate limiting

    if (usdaFood) {
      // Convert and save with clean name
      const produceData = convertUSDAToOurFormat(usdaFood, category, imageUrl, foodName);
      await Produce.create(produceData);
      console.log(`  ✓ Added (USDA): ${produceData.name}`);
    } else {
      // Fallback to AI nutrition data
      console.log(`  USDA not found for ${foodName}, trying AI...`);
      const aiNutrition = await getAINutritionData(foodName);
      await delay(2000); // Longer delay for AI calls
      
      const cleanName = foodName.charAt(0).toUpperCase() + foodName.slice(1);
      await Produce.create({
        name: cleanName,
        category: category,
        imageUrl: imageUrl,
        nutrition: aiNutrition || { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
        dataSource: aiNutrition ? 'AI' : 'manual'
      });
      console.log(`  ✓ Added (${aiNutrition ? 'AI' : 'manual'}): ${cleanName}`);
    }
  } catch (error) {
    console.error(`  ✗ Error processing ${foodName}:`, error.message);
  }
}

// Main seeding function
async function seedProduce() {
  try {
    console.log('Starting produce seeding...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    let totalProcessed = 0;
    const totalItems = basicProduce.fruits.length + basicProduce.vegetables.length;

    // Process fruits
    console.log('\nProcessing fruits...');
    for (const fruit of basicProduce.fruits) {
      await processFoodItem(fruit, 'fruit'); // category is 'fruit'
      totalProcessed++;
      console.log(`Progress: ${totalProcessed}/${totalItems} (${Math.round(totalProcessed/totalItems*100)}%)`);
    }

    // Process vegetables
    console.log('\nProcessing vegetables...');
    for (const vegetable of basicProduce.vegetables) {
      await processFoodItem(vegetable, 'vegetable'); // category is 'vegetable'
      totalProcessed++;
      console.log(`Progress: ${totalProcessed}/${totalItems} (${Math.round(totalProcessed/totalItems*100)}%)`);
    }

    console.log('\nSeeding completed!');
    console.log(`Total items processed: ${totalProcessed}`);
    
    const finalCount = await Produce.countDocuments();
    console.log(`Items in database: ${finalCount}`);
    
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    mongoose.disconnect();
  }
}

// Run the seeder
if (require.main === module) {
  seedProduce();
}

module.exports = { seedProduce, basicProduce };