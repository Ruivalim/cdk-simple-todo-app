import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Rest } from './constructs/rest';
import { Tables } from './constructs/tables';
import { getItem } from './lambdas/getItem';
import { NewItem } from './lambdas/newItem';

export class TodoAppStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const tables = new Tables(this, "Tables");
        const rest = new Rest(this, "Rest");

        new NewItem(this, "NewItem", {
            tables,
            rest
        });

        new getItem(this, "GetItem", {
            tables,
            rest
        })
    }
}
