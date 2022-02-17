import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { Rest } from '../constructs/rest';
import { Tables } from '../constructs/tables';

interface getItemProps {
    rest: Rest
    tables: Tables
}

export class getItem extends Construct {
    constructor(scope: Construct, id: string, props: getItemProps) {
        super(scope, id);

        const func = new NodejsFunction(this, "getItem", {
            entry: "./lambdas/getItem/index.ts",
            runtime: Runtime.NODEJS_14_X,
            environment: {
                TABLE_NAME: props.tables.todoTable.tableName
            }
        });

        props.tables.todoTable.grantFullAccess(func);

        props.rest.rest.root.addResource("item").addResource("{uuid}").addMethod("GET", new LambdaIntegration(func));
    }
}
