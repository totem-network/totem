import {
    Iterable,
    Map,
} from 'immutable';

export default interface IImmutableStateMap<S> extends Map<string, any> {

    asMutable(): this;

    asImmutable(): this;

    clear(): this;

    delete(key: string): this;
    remove(key: string): this;

    deleteIn(keyPath: Iterable<any, any> | any[]): this;
    removeIn(keyPath: Iterable<any, any> | any[]): this;

    get<K extends keyof S>(key: string): S[K];

    merge<K extends keyof S, KC, VC>(...collections: Iterable<KC, VC>[]): Map<K | KC, S[K] | VC>;
    merge<K extends keyof S, C>(...collections: {[key: string]: C}[]): Map<K | string, S[K] | C>;

    mergeDeep<K extends keyof S>(
        ...collections: Iterable<K, S[K]>[] | {[key: string]: any}[]
    ): this;

    mergeDeepIn<K extends keyof S>(
        keyPath: Iterable<any, any> | any[],
        ...iterables: Iterable<K, S[K]>[]
    ): this;

    mergeDeepWith<K extends keyof S>(
        merger: (oldVal: S[K], newVal: S[K], key: K) => S[K],
        ...collections: Iterable<K, S[K]>[] | {[key: string]: any}[]
    ): this;

    mergeIn<K extends keyof S>(
        keyPath: Iterable<any, any> | any[],
        ...iterables: Iterable<K, S[K]>[]
    ): this;

    mergeWith<K extends keyof S>(
        merger: (oldVal: S[K], newVal: S[K], key: K) => S[K],
        ...collections: Iterable<K, S[K]>[] | {[key: string]: any}[]
    ): this;

    set<K extends keyof S>(key: string, value: S[K]): this;

    setIn(keyPath: Iterable<any, any> | any[], value: any): this;

    toJS(): S;

    update<K extends keyof S>(key: K, value: S[K], updater: (value: S[K]) => S[K]): this;
    update<K extends keyof S>(key: K, updater: (value: S[K]) => S[K]): this;
    update<R>(updater: (value: this) => R): R;

    updateIn(
        keyPath: Iterable<any, any> | any[],
        updater: (value: any) => any,
    ): this;
    updateIn(
        keyPath: Iterable<any, any> | any[],
        notSetValue: any,
        updater: (value: any) => any,
    ): this;

    withMutations<K extends keyof S>(mutator: (mutable: Map<string, S[K]>) => any): this;
}
