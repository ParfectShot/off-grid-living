import fs from 'fs';
import path from 'path';

// Define file paths
const inputPath = path.join(__dirname, 'items_Waree products_1.jsonl');
const outputDir = path.join(__dirname, 'processed');
const idSkuMappingPath = path.join(__dirname, 'id-sku.json');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Define interfaces for our database schema
interface Brand {
  name: string;
  logo?: string;
  description?: string;
  website?: string;
  country?: string;
}

interface Category {
  name: string;
  description?: string;
  parentName?: string; // Use name as reference instead of ID
}

interface Product {
  _id: string; // Added _id field
  sku: string;
  name: string;
  brandName: string; // Use name as reference instead of ID
  categoryName: string; // Use name as reference instead of ID
  price: number;
  regularPrice: number;
  currency: string;
  description: string;
  shortDescription?: string;
  weight: number;
  weightUnit: string;
  availability: string;
  url: string;
  warranty?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductAttribute {
  product: string; // Will contain the _id value
  name: string;
  value: string;
  unit?: string;
  displayOrder?: number;
}

interface ProductImage {
  product: string; // Will contain the _id value
  url: string;
  isMain: boolean;
  displayOrder: number;
  alt?: string;
}

interface ProductSpec {
  product: string; // Will contain the _id value
  category: string;
  name: string;
  value: string;
  unit?: string;
  displayOrder?: number;
}

interface ProductVariant {
  product: string; // Will contain the _id value
  sku: string;
  name?: string;
  attributes: Record<string, string>;
  price?: number;
  regularPrice?: number;
  stock?: number;
}

// Define interface for the id-sku mapping
interface IdSkuMapping {
  _id: string;
  sku: string;
}

// Collections to store processed data
const brands: Record<string, Brand> = {};
const categories: Record<string, Category> = {};
const products: Product[] = [];
const productAttributes: ProductAttribute[] = [];
const productImages: ProductImage[] = [];
const productSpecs: ProductSpec[] = [];
const productVariants: ProductVariant[] = [];

// Load the ID-SKU mapping
let idSkuMap: Record<string, string> = {};

try {
  if (fs.existsSync(idSkuMappingPath)) {
    const idSkuMapping: IdSkuMapping[] = JSON.parse(fs.readFileSync(idSkuMappingPath, 'utf8'));
    idSkuMap = idSkuMapping.reduce((map, item) => {
      map[item.sku] = item._id;
      return map;
    }, {} as Record<string, string>);
    console.log(`Loaded ${Object.keys(idSkuMap).length} ID-SKU mappings from ${idSkuMappingPath}`);
  } else {
    console.warn(`Warning: ${idSkuMappingPath} not found. Will proceed without ID mappings.`);
  }
} catch (error) {
  console.error(`Error loading ID-SKU mapping: ${error}`);
}

// Helper function to parse float values safely
function parseFloatSafe(value: string | null | undefined): number | null {
  if (value === null || value === undefined) return null;
  
  // Remove currency symbols and commas if present
  const cleanValue = value.toString().replace(/[₹,]/g, '').trim();
  const parsed = parseFloat(cleanValue);
  return isNaN(parsed) ? null : parsed;
}

// Helper function to determine category from product data
function determineCategory(item: any): { name: string } {
  // Try to get from breadcrumbs first
  if (item.breadcrumbs && item.breadcrumbs.length > 1) {
    const categoryName = item.breadcrumbs[1].name;
    
    if (!categories[categoryName]) {
      categories[categoryName] = {
        name: categoryName
      };
    }
    
    return { name: categoryName };
  }
  
  // Fallback to type-based categorization
  let categoryName = "Solar Module"; // Default
  
  if (item.name?.toLowerCase().includes("inverter")) {
    categoryName = "Solar Inverter";
  } else if (item.name?.toLowerCase().includes("pump")) {
    categoryName = "Pump";
  }
  
  if (!categories[categoryName]) {
    categories[categoryName] = {
      name: categoryName
    };
  }
  
  return { name: categoryName };
}

// Process each item in the input file
function processItem(item: any): void {
  // Generate SKU if not present
  const sku = item.sku || `SKU-${Math.random().toString(36).substring(2, 10)}`;
  
  // Get _id from mapping, or generate a placeholder if not found
  const _id = idSkuMap[sku] || `id-${Math.random().toString(36).substring(2, 10)}`;
  
  // Process brand information
  const brandName = item.brand?.name || "Unknown Brand";
  if (!brands[brandName]) {
    brands[brandName] = {
      name: brandName
    };
  }
  
  // Determine category
  const category = determineCategory(item);
  
  // Extract weight information
  let weight = 0;
  let weightUnit = "kilogram";
  
  if (item.weight) {
    if (typeof item.weight === 'object') {
      weight = item.weight.value || 0;
      weightUnit = item.weight.unit || "kilogram";
    } else if (typeof item.weight === 'string') {
      const weightMatch = item.weight.match(/(\d+\.?\d*)\s*([A-Za-z]+)/);
      if (weightMatch) {
        weight = parseFloat(weightMatch[1]);
        weightUnit = weightMatch[2].toLowerCase();
      }
    } else if (typeof item.weight === 'number') {
      weight = item.weight;
    }
  }
  
  // Parse prices
  const price = parseFloatSafe(item.price) || 0;
  const regularPrice = parseFloatSafe(item.regularPrice) || price;
  
  // Create the core product entry
  const product: Product = {
    _id,
    sku,
    name: item.name || "Unnamed Product",
    brandName,
    categoryName: category.name,
    price,
    regularPrice,
    currency: item.currency || "INR",
    description: item.description || "",
    shortDescription: item.shortDescription || "",
    weight,
    weightUnit,
    availability: item.availability || "InStock",
    url: item.url || "",
    warranty: item.warranty || undefined,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  products.push(product);
  
  // Process product images
  if (item.images && Array.isArray(item.images)) {
    item.images.forEach((image: any, index: number) => {
      if (image.url) {
        productImages.push({
          product: _id, // Use _id directly instead of SKU
          url: image.url,
          isMain: index === 0 || (item.mainImage && item.mainImage.url === image.url),
          displayOrder: index,
          alt: item.name
        });
      }
    });
  } else if (item.mainImage && item.mainImage.url) {
    productImages.push({
      product: _id, // Use _id directly instead of SKU
      url: item.mainImage.url,
      isMain: true,
      displayOrder: 0,
      alt: item.name
    });
  }
  
  // Process product attributes from additionalProperties
  const specCategories = {
    physical: ["dimensions", "weight", "size", "depth", "width", "height"],
    electrical: ["power", "voltage", "current", "efficiency"],
    technical: ["solar cell type", "solar cells per module", "front glass", "encapsulate", "junction box"],
    warranty: ["warranty"]
  };
  
  if (item.additionalProperties && Array.isArray(item.additionalProperties)) {
    item.additionalProperties.forEach((prop: any, index: number) => {
      if (prop.name && prop.value) {
        // Determine spec category
        let specCategory = "other";
        const lowerName = prop.name.toLowerCase();
        
        for (const [category, keywords] of Object.entries(specCategories)) {
          if (keywords.some(keyword => lowerName.includes(keyword))) {
            specCategory = category;
            break;
          }
        }
        
        // Add to product specs
        productSpecs.push({
          product: _id, // Use _id directly instead of SKU
          category: specCategory,
          name: prop.name,
          value: prop.value.toString(),
          displayOrder: index
        });
        
        // Also add key attributes directly to productAttributes for filtering
        const keyAttributes = ["power output", "warranty", "cell type", "efficiency"];
        if (keyAttributes.some(attr => lowerName.includes(attr))) {
          productAttributes.push({
            product: _id, // Use _id directly instead of SKU
            name: prop.name,
            value: prop.value.toString(),
            displayOrder: index
          });
        }
      }
    });
  }
  
  // Extract power output as a key attribute
  if (item.powerOutput) {
    productAttributes.push({
      product: _id, // Use _id directly instead of SKU
      name: "Power Output",
      value: item.powerOutput.toString(),
      displayOrder: 0
    });
  }
  
  // Process product dimensions
  if (item.dimensions) {
    productSpecs.push({
      product: _id, // Use _id directly instead of SKU
      category: "physical",
      name: "Dimensions",
      value: item.dimensions.value.toString(),
      unit: item.dimensions.unit,
      displayOrder: 0
    });
  }
  
  // Process product variants
  if (item.variants && Array.isArray(item.variants)) {
    item.variants.forEach((variant: any) => {
      const attributes: Record<string, string> = {};
      
      // Extract attributes from variant
      if (variant.size) attributes.size = variant.size;
      if (variant.color) attributes.color = variant.color;
      
      productVariants.push({
        product: _id, // Use _id directly instead of SKU
        sku: `${sku}-${Object.values(attributes).join('-')}`,
        attributes,
        price: variant.price || undefined,
        regularPrice: variant.regularPrice || undefined
      });
    });
  }
}

// Main execution
async function main() {
  try {
    // Read the input file
    const fileContent = fs.readFileSync(inputPath, 'utf8');
    
    // Split by newlines and process each line
    const lines = fileContent.split('\n').filter(line => line.trim() !== '');
    
    // Process each product
    lines.forEach(line => {
      try {
        const item = JSON.parse(line);
        processItem(item);
        console.log('Processed:', item.name);
      } catch (e) {
        console.error('Error processing line:', e);
      }
    });
    
    // Write processed data to output files
    const writeJsonlFile = (filename: string, data: any[]) => {
      const filePath = path.join(outputDir, filename);
      const content = data.map(item => JSON.stringify(item)).join('\n');
      fs.writeFileSync(filePath, content);
      console.log(`Wrote ${data.length} items to ${filePath}`);
    };
    
    writeJsonlFile('products.jsonl', products);
    writeJsonlFile('productAttributes.jsonl', productAttributes);
    writeJsonlFile('productImages.jsonl', productImages);
    writeJsonlFile('productSpecs.jsonl', productSpecs);
    writeJsonlFile('productVariants.jsonl', productVariants);
    
    console.log(`Transformation complete! Processed ${products.length} products.`);
    console.log(`Output written to: ${outputDir}`);
  } catch (error) {
    console.error('Failed to process file:', error);
  }
}

// Run the script
main();