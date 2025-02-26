import type { Query as QueryDef, Schema } from '@rocicorp/zero';
import type { AdvancedQuery, HumanReadable } from '@rocicorp/zero/advanced';
export type ResultType = 'unknown' | 'complete';
export type QueryResultDetails = {
    type: ResultType;
};
type Primitive = undefined | null | boolean | string | number | symbol | bigint;
/**
 * Create a deeply immutable type from a type that may contain mutable types.
 */
export type Immutable<T> = T extends Primitive ? T : T extends readonly (infer U)[] ? ImmutableArray<U> : ImmutableObject<T>;
export type ImmutableArray<T> = ReadonlyArray<Immutable<T>>;
export type ImmutableObject<T> = {
    readonly [K in keyof T]: Immutable<T[K]>;
};
export type QueryResult<TReturn> = readonly [HumanReadable<TReturn>, QueryResultDetails];
declare class ViewWrapper<TSchema extends Schema, TTable extends keyof TSchema['tables'] & string, TReturn> {
    #private;
    private query;
    private onMaterialized;
    private onDematerialized;
    constructor(query: AdvancedQuery<TSchema, TTable, TReturn>, onMaterialized: (view: ViewWrapper<TSchema, TTable, TReturn>) => void, onDematerialized: () => void);
    get current(): QueryResult<TReturn>;
}
declare class ViewStore {
    #private;
    getView<TSchema extends Schema, TTable extends keyof TSchema['tables'] & string, TReturn>(clientID: string, query: AdvancedQuery<TSchema, TTable, TReturn>, enabled?: boolean): ViewWrapper<TSchema, TTable, TReturn>;
}
export declare const viewStore: ViewStore;
export declare class Query<TSchema extends Schema, TTable extends keyof TSchema['tables'] & string, TReturn> {
    #private;
    current: HumanReadable<TReturn>;
    details: QueryResultDetails;
    constructor(query: QueryDef<TSchema, TTable, TReturn>, enabled?: boolean);
}
export {};
