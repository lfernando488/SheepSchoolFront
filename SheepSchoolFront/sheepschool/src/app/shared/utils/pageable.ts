export interface Pageable<T> {
    content: T[],
    pageable: {
        sort: {
            sorted: boolean,
            unsorted: boolean,
            empty: boolean,
        },
        offset: number,
        pageNumber: number,
        pageSize: number,
        paged: boolean,
        unpaged: boolean
    },
    totalPages: number,
    totalElements: number,
    last: boolean,
    size: number,
    sort: {
        sorted: boolean,
        unsorted: boolean,
        empty: boolean
    },
    first: boolean,
    numberOfElements: number,
    empty: boolean
}