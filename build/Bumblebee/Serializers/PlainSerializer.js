"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SerializerAbstract_1 = __importDefault(require("./SerializerAbstract"));
/**
 * PlainSerializer class
 *
 * @class PlainSerializer
 * @constructor
 */
class PlainSerializer extends SerializerAbstract_1.default {
    /**
     * Serialize a collection of data
     * The PlainSerializer will just return the data without modification
     *
     * @param {Array} data
     */
    async collection(data) {
        return data;
    }
    /**
     * Serialize a single item
     * The PlainSerializer will return the the data without modification
     *
     * @param {*} data
     */
    async item(data) {
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
exports.default = PlainSerializer;
