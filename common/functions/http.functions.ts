export const generateQueryString = <T extends Object>(queryObj: T) => {
    const entries = Object.entries(queryObj).filter((value) => {
        return value[1] !== null && value[1] !== undefined;
    });
    if (entries.length === 0) return '';
    let query = '?';
    entries.forEach((value, index) => {
        if (!value[1]) return;
        query += `${value[0]}=${value[1]}${index !== entries.length - 1 ? '&' : ''}`;
    });
    return query;
}