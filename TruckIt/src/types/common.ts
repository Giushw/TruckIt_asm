export type ColorMode = 'dark' | 'light';

export type ActiveView = 'home' | 'metrics' | 'carriers' | 'customers' | 'statistics';

export interface LV<A> {
    label: string,
    value: A
}

export interface KV<B> {
    key: string,
    value: B
}

export type Nullable<C> = C | null;
