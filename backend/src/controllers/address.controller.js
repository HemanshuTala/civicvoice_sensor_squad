import { Address } from "../models/address.model.js";

const createAddress = async (area, district, pincode) => {
    const address = await Address.create({
        area: area,
        district: district,
        pincode: pincode
    })
    return address;
}

export { createAddress }