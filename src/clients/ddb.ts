import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

// class to handle DynamoDB operations
class DdbClient {
    private client: DynamoDBClient;

    // constructor
    constructor(config: { region: any; }) {
        this.client = new DynamoDBClient({ region: config.region });
    }

    // get item from DynamoDB
    async getItem(command: GetItemCommand): Promise<any> {
        try {
            const response = await this.client.send(command);
            return response.Item;
        } catch (error) {
            console.log(error);
        }
    }

    // put item in DynamoDB
    async putItem(command: any): Promise<any> {
        try {
            const response = await this.client.send(command);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

export default DdbClient;