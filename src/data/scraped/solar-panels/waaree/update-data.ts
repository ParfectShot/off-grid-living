import fs from 'fs';
import path from 'path';

// Define file paths
const inputDir = path.join(__dirname, 'processed');
const productsPath = path.join(inputDir, 'products.jsonl');
const attributesPath = path.join(inputDir, 'productAttributes.jsonl');
const specsPath = path.join(inputDir, 'productSpecs.jsonl');
const imagesPath = path.join(inputDir, 'productImages.jsonl');
const variantsPath = path.join(inputDir, 'productVariants.jsonl');

// Define interfaces for our data records
interface Product {
  _id: string;
  sku: string;
  [key: string]: any;
}

interface RelatedRecord {
  productSku: string;
  _id?: string;
  [key: string]: any;
}

// Main execution
async function main() {
  try {
    console.log('Starting to update related tables with product IDs...');

    // Step 1: Read products file and build SKU to ID mapping
    const productContent = fs.readFileSync(productsPath, 'utf8');
    const products: Product[] = productContent
      .split('\n')
      .filter(line => line.trim() !== '')
      .map(line => JSON.parse(line));

    const skuToIdMap: Record<string, string> = {};
    products.forEach(product => {
      if (product._id && product.sku) {
        skuToIdMap[product.sku] = product._id;
      }
    });

    console.log(`Built mapping for ${Object.keys(skuToIdMap).length} products`);

    // Step 2: Update related tables
    const filesToUpdate = [
      { path: attributesPath, name: 'productAttributes' },
      { path: specsPath, name: 'productSpecs' },
      { path: imagesPath, name: 'productImages' },
      { path: variantsPath, name: 'productVariants' }
    ];

    for (const file of filesToUpdate) {
      console.log(`Updating ${file.name}...`);
      
      // Read file content
      const fileContent = fs.readFileSync(file.path, 'utf8');
      const records: RelatedRecord[] = fileContent
        .split('\n')
        .filter(line => line.trim() !== '')
        .map(line => JSON.parse(line));
      
      // Update records with product IDs and remove productSku
      const updatedRecords = records.map(record => {
        if (record._id) {
          // Create a new object without the productSku field
          const { productSku, _id , ...recordWithoutSku } = record;
          
          // Add the _id field
          return {
            ...recordWithoutSku,
            product: _id
          };
        }
        
        // If SKU not found in mapping, keep record as is but log warning
        console.warn(`Warning: No matching product ID found for SKU: ${record.productSku}`);
        return record;
      });
      
      // Write updated content back to file
      const outputPath = file.path;
      const updatedContent = updatedRecords.map(record => JSON.stringify(record)).join('\n');
      fs.writeFileSync(outputPath, updatedContent);
      
      console.log(`Updated ${updatedRecords.length} records in ${file.name}`);
    }

    console.log('All files successfully updated with _id field and productSku removed!');
  } catch (error) {
    console.error('Error updating files:', error);
  }
}

// Run the script
main();
