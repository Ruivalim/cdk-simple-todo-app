import { RemovalPolicy } from 'aws-cdk-lib';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class Tables extends Construct {
    public readonly todoTable: Table;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.todoTable = new Table(this, "TodoTable", {
            tableName: "TodoApp",
            billingMode: BillingMode.PAY_PER_REQUEST,
            partitionKey: {
                name: "uuid",
                type: AttributeType.STRING
            },
            removalPolicy: RemovalPolicy.DESTROY
        });
    }
}
