"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SerializerAbstract_1 = __importDefault(require("./SerializerAbstract"));
/**
 * DataSerializer class
 *
 * @class DataSerializer
 * @constructor
 */
class DataSerializer extends SerializerAbstract_1.default {
    /**
     * Serialize a collection of data
     * The DataSerializer will add all data under the 'data' namespace
     *
     * @param {Array} data
     */
    async collection(data) {
        return { data: data };
    }
    /**
     * Serialize a single item
     * The DataSerializer will add the item under the 'data' namespace
     *
     * @param {*} data
     */
    async item(data) {
        // if the item is an object, add it to the data property
        if (data instanceof Object) {
            return { data: data };
        }
        // If the data for this item is not a object, aka. a primitive type
        // we will just return the plain data.
        return data;
    }
    /**
     * Serialize a null value
     */
    async null() {
        return null;
    }
    /**
     * Serialize a meta object
     *
     * @param {Object} meta
     */
    async meta(meta) {
        return { meta: meta };
    }
    /**
     * Serialize the pagination meta data
     *
     * @param {Object} pagination
     */
    async paginator(pagination) {
        return { pagination: pagination };
    }
}
exports.default = DataSerializer;
