"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PlainSerializer_1 = __importDefault(require("./PlainSerializer"));
const DataSerializer_1 = __importDefault(require("./DataSerializer"));
const SLDSerializer_1 = __importDefault(require("./SLDSerializer"));
exports.default = {
    plain: PlainSerializer_1.default,
    data: DataSerializer_1.default,
    sld: SLDSerializer_1.default,
};
