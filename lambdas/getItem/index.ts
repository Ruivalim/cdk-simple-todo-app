import { DynamoDB } from "aws-sdk";

const dynamodb = new DynamoDB.DocumentClient();

export const handler = async (event: AWSLambda.APIGatewayEvent) => {
    const uuid = event.pathParameters?.uuid;

    if (uuid) {
        const getItem = await dynamodb.get({
            TableName: process.env.TABLE_NAME || "TodoApp",
            Key: {
                uuid
            }
        }).promise();

        if (getItem.$response.error) {
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status: "Error", message: getItem.$response.error })
            }
        }

        if (getItem.Item) {
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(getItem.Item)
            }
        }

        return {
            statusCode: 404,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: "Item not found" })
        }
    }

    return {
        statusCode: 401,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: "Missing path parameter" })
    }
}
