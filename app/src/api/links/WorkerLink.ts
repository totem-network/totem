import { ApolloLink, Observable } from 'apollo-link';
import { proxy } from 'comlink';
import { getOperationAST, parse } from 'graphql';
import { getCurrentNetwork } from 'utils/blockchain';
import proxyWeb3 from './proxyWeb3';
import SubscriptionClient from './SubscriptionClient';

class WorkerLink extends ApolloLink {

    protected worker: any;

    protected subscriptionClient: SubscriptionClient;

    constructor(worker: any) {
        super();

        this.worker = worker;
        this.subscriptionClient = new SubscriptionClient(this.worker);
    }

    public request(operation: any) {
        const blockchainNetwork = getCurrentNetwork().coinType;

        operation.context = {
            ...operation.context,
            blockchainNetwork,
        };

        // TODO: For really big payloads ArrayBuffers + a serialization format like CBOR, BSON or FlatBuffers
        // Or SharedArrayBuffer if available again

        /*if (this.isSubscription(operation)) {
            return this.subscriptionClient.request(operation);
        }*/

        return new Observable<any>((observer) => {
            this.worker.request(
                operation,
                proxy(
                    proxyWeb3,
                ),
            ).then((data: any) => {
                console.log(data);
                observer.next(data);
                observer.complete();
            }).catch((error: any) => {
                console.log(error);
                observer.error(error);
            });
        });
    }

    protected isSubscription(operation: any) {
        const document = parse(operation.query);
        const name = operation.operationName;

        const operationAST = getOperationAST(document, name);

        return !!operationAST && operationAST.operation === 'subscription';
    }

}

export default WorkerLink;