export class Mapper {
	map<T>(from: any): T {
		return JSON.parse(JSON.stringify(from));
	}
}
