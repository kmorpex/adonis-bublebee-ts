'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResourceAbstract_1 = __importDefault(require("./ResourceAbstract"));
/**
 * Null class
 *
 * @class Null
 */
class Null extends ResourceAbstract_1.default {
    /**
     * Overwrite the constructor and set data and transformer to null
     */
    constructor() {
        super(null, null);
    }
    /**
     * Returns null, a NullResource always returns null
     */
    async getData() {
        return null;
    }
}
exports.default = Null;
