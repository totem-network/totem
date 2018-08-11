import Filter from './Filter';
import OffChain from './OffChain';
import OnChain from './OnChain';

export default abstract class AbstractComponent {

    protected next: AbstractComponent | undefined;

    // TODO: return value?
    public abstract execute(): any;

    public filter(): AbstractComponent {
        this.next = new Filter();
        return this.next;
    }

    public out(): AbstractComponent {
        return this;
    }

    public offChain(): AbstractComponent {
        this.next = new OffChain();
        return this.next;
    }

    public onChain(): AbstractComponent {
        this.next = new OnChain();
        return this.next;
    }

}
