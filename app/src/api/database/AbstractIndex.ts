
abstract class AbstractIndex {

    // TODO: use only 1 orbit-db for all indexes for better performance
    // Handle it in BaseDatabase

    public abstract async recreateIndex(): Promise<boolean>;

}

export default AbstractIndex;
