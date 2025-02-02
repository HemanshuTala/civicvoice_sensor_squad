import { Status } from "../models/status.model.js"
import mongoose from "mongoose"

const createStatus = async (name, description) => {
    // createing status object
    const statusObject = await Status.create({
        name: name,
        description: description
    })

    if (statusObject) {
        return statusObject;
    }
}

export { createStatus }