import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { Rest } from '../constructs/rest';
import { Tables } from '../constructs/tables';

interface NewItemProps {
    rest: Rest
    tables: Tables
}

export class NewItem extends Construct {
    constructor(scope: Construct, id: string, props: NewItemProps) {
        super(scope, id);

        const func = new NodejsFunction(this, "NewItem", {
            entry: "./lambdas/newItem/index.ts",
            runtime: Runtime.NODEJS_14_X,
            environment: {
                TABLE_NAME: props.tables.todoTable.tableName
            }
        });

        props.tables.todoTable.grantFullAccess(func);

        props.rest.rest.root.addResource("add").addMethod("POST", new LambdaIntegration(func));
    }
}
