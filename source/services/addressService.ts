import { injectable } from "inversify";
import { Address } from "../models/address";
import { AddressRepository } from "../repositories/addressRepository";

@injectable()
export class AddressService {
    private readonly addressRepository: AddressRepository;

    constructor(addressRepository?: AddressRepository) {
        this.addressRepository = addressRepository;
    }

    public async getAddressesForUser(userId: string): Promise<Address[]> {
        return this.addressRepository.getAddressesForUser(userId);
    }

    public async addAddress(userId: string, address: Address) {
        return this.addressRepository.addAddress(userId, address);
    }
}
