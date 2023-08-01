// this will be use to test the user service
import UserService from "../services/user";
import DdbClient from "../clients/ddb";
import { GetItemCommand } from "@aws-sdk/client-dynamodb";

// test get user data
test('get user data', async () => {
    // create sample user data to be returned by the mock ddb client
    const ddbUserData = {
        Item: {
            pk: { S: 'USER#123' },
            sk: { S: '#USER#123' },
            firstName: { S: 'John Doe' },
            lastName: { S: 'Doe' },
        }
    };

    // create sample user data to be returned by the user service
    const sampleUserData = {
        userId: '123',
        firstName: 'John Doe',
        lastName: 'Doe'
    };

    // create mock ddb client
    const mockDdbClient = new DdbClient({ region: 'us-east-1' });

    // mmock get item function
    mockDdbClient.getItem = jest.fn().mockImplementation(() => ddbUserData);

    // create user service
    const userService = new UserService({ ddbClient: mockDdbClient, tableName: 'test-table' });

    // get user data
    const user = await userService.getUser('123');

    // check if the user data is correct
    expect(user).toEqual(sampleUserData);

    // check if the mock get item function is called one time
    expect(mockDdbClient.getItem).toHaveBeenCalledTimes(1);

    // check if the mock get item function is called with the correct parameters
    expect(mockDdbClient.getItem).toHaveBeenCalledWith(expect.any(GetItemCommand));
});