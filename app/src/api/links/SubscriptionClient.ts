import { Observable } from 'apollo-link';

class SubscriptionClient {

    protected worker: any;

    constructor(worker: any) {
        this.worker = worker;
    }

    public request(operation: any) {
        return new Observable<any>((observer) => {
            // TODO
        });
    }

}

export default SubscriptionClient;