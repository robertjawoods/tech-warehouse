export interface IMapper<T, F> {
    map<T>(from: F): T;
    mapAll<T>(from: F[]): T[];
}