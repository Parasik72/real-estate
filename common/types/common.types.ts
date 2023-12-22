export interface IPagination {
    paginationName: string;
    page: number;
    limit: number;
    offset: number;
    totalPages: number;
    query?: Record<string, string>;
    // pages: {
    //     [n]: { ids: number[] }
    // }
    
}