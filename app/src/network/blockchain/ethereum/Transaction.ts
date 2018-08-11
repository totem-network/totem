import AbstractAccount from './../AbstractAccount';
import AbstractTransaction from './../AbstractTransaction';

export default class Transaction extends AbstractTransaction {

    public sign(account: AbstractAccount): string {
        return '';
    }

    public verifySignature(account: AbstractAccount): boolean {
        return true;
    }

    public submit(): boolean {
        return true;
    }

}
