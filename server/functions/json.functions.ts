export const objectToJSON = <T extends Object>(obj: T) => {
    return JSON.parse(JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value 
    ));
}