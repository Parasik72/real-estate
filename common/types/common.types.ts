export interface IPagination {
    paginationName: string;
    page: number;
    limit: number;
    offset: number;
    totalPages: number;
    // pages: {
    //     [n]: { ids: number[] }
    // }
    
}