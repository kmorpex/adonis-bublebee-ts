'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResourceAbstract_1 = __importDefault(require("./ResourceAbstract"));
const Collection_1 = __importDefault(require("./Collection"));
const Item_1 = __importDefault(require("./Item"));
const Null_1 = __importDefault(require("./Null"));
exports.default = {
    ResourceAbstract: ResourceAbstract_1.default,
    Collection: Collection_1.default,
    Item: Item_1.default,
    Null: Null_1.default,
};
