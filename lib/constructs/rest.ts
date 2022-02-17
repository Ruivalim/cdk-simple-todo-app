import { Cors, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

export class Rest extends Construct {
    public readonly rest: RestApi;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.rest = new RestApi(this, "TodoRest", {
            restApiName: "TodoRest",
            defaultCorsPreflightOptions: {
                allowOrigins: Cors.ALL_ORIGINS,
                allowMethods: Cors.ALL_METHODS
            }
        });
    }
}
