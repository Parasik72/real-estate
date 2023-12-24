export interface IPagination {
    paginationName: string;
    currentPage: number;
    limit: number;
    offset: number;
    totalPages: number;
    pages: {
        [pageNumber: number]: { ids: number[] }
    }
}