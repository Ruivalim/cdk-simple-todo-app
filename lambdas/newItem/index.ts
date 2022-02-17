import { DynamoDB } from "aws-sdk";

const dynamodb = new DynamoDB.DocumentClient();

export const handler = async (event: AWSLambda.APIGatewayEvent, context: AWSLambda.Context) => {
    const { title, description } = JSON.parse(event.body || "");
    const uuid = context.awsRequestId;

    const saveItem = await dynamodb.put({
        TableName: process.env.TABLE_NAME || "TodoApp",
        Item: {
            uuid,
            title,
            description
        }
    }).promise();

    if (saveItem.$response.error !== null) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: "Error", message: saveItem.$response.error })
        }
    }

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: "Success" })
    }
}
