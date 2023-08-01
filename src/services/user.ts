import { GetItemCommand } from '@aws-sdk/client-dynamodb';
import DdbClient from '../clients/ddb';

// class to handle user operations
// class implements the Dynamodb single table design pattern
class UserService {
    private client: DdbClient;
    private tableName: string;

    // constructor
    constructor(config: { ddbClient: DdbClient; tableName: string; }) {
        this.client = config.ddbClient;
        this.tableName = config.tableName;
    }

    // private method to get partition key and sort key
    // from user id
    private getKey(userId: string): { pk: string; sk: string; } {
        return {
            pk: `USER#${userId}`,
            sk: `#USER#${userId}`
        };
    }

    // method to get user from DynamoDB
    async getUser(userId: string): Promise<any> {
        // get partition key and sort key
        const { pk, sk } = this.getKey(userId);

        // create get item command
        const command = new GetItemCommand({
            TableName: this.tableName,
            Key: {
                pk: { S: pk },
                sk: { S: sk }
            }
        });

        // get user data from DynamoDB
        const userData = await this.client.getItem(command);

        // check if user data is empty
        if (!userData) {
            throw new Error('User not found');
        }

        // return user data
        return {
            userId: userId,
            firstName: userData.Item.firstName.S,
            lastName: userData.Item.lastName.S
        };
    }
}

export default UserService;