import AbstractIndex from '../../AbstractIndex';

class TagIndex extends AbstractIndex {

    // TODO: reIndex function, should be called now and then e.g. when device is loading and via wifi
    // or at home
    public async recreateIndex(): Promise<boolean> {
        //

        return true;
    }

}

export default TagIndex;
