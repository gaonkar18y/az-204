import { Container, CosmosClient } from "@azure/cosmos";
import { Product } from "../models/product";

class ProductsDb {
    private static container: Container;
    static async init(){
    const key = process.env.COSMOS_KEY as string;
    const endpoint = process.env.COSMOS_ENDPOINT as string;
    
    // Set Database name and container name with unique timestamp
    const databaseName = `productsdb`;
    const containerName = `products`;
    const partitionKeyPath = ["/categoryId"];
    
    // Authenticate to Azure Cosmos DB
    const cosmosClient = new CosmosClient({ endpoint, key });
    
    const { database } = await cosmosClient.databases.createIfNotExists({ id: databaseName });
    console.log(`${database.id} database ready`);
    
    // Create container if it doesn't exist
    const { container } = await database.containers.createIfNotExists({
        id: containerName,
        partitionKey: {
            paths: partitionKeyPath
        }
    });
    console.log(`${container.id} container ready`);
    this.container = container;
    }

    static async createProduct(product: Product){
        const { resource } = await this.container.items.create(product);
        console.log(`'${resource?.name}' inserted`);
    }
}


export default ProductsDb;