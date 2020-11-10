"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const { ioc } = require('@adonisjs/fold')
const camelCase_1 = __importDefault(require("lodash/camelCase"));
const Scope_1 = __importDefault(require("./Scope"));
const Serializers_1 = __importDefault(require("./Serializers"));
/**
 * Manager class
 *
 * @class Manager
 * @constructor
 */
class Manager {
    /**
     * Create a new manager instance
     */
    constructor() {
        this.serializer = null;
        this.requestedIncludes = new Set();
        this._recursionLimit = 10;
    }
    /**
     * Create a Scope instance for the resource
     *
     * @param {*} resource
     * @param {*} ctx
     */
    createData(resource, ctx = null) {
        this._setIncludesFromRequest(ctx);
        return new Scope_1.default(this, resource, ctx);
    }
    /**
     * Returns the requested includes. An optional parameter converts snake_case
     * includes to standardized camelCase
     */
    getRequestedIncludes(transformCamelCase = false) {
        if (!transformCamelCase) {
            return this.requestedIncludes;
        }
        const includes = [...this.requestedIncludes]
            .map(i => i.split('.').map(camelCase_1.default).join('.'));
        return new Set(includes);
    }
    /**
     * Parses an include string or array and constructs an array of all requested includes
     *
     * @param {*} includes
     */
    parseIncludes(includes) {
        this.requestedIncludes = new Set();
        // if a string is passed, split by comma and return an array
        if (typeof includes === 'string') {
            includes = includes.split(',');
        }
        // if it is not an array, we can not parse it at this point
        if (!Array.isArray(includes)) {
            throw Error(`The parseIncludes() method expects a string or an array. ${typeof includes} given`);
        }
        // sanitize the includes
        includes = includes.map(i => this._guardAgainstToDeepRecursion(i));
        // add all includes to the internal set
        includes.forEach(this.requestedIncludes.add, this.requestedIncludes);
        this._autoIncludeParents();
    }
    /**
     * Allowes setting a custom recursion limit
     *
     * @param {*} limit
     */
    setRecursionLimit(limit) {
        this._recursionLimit = limit;
        return this;
    }
    /**
     * Create a serializer
     *
     * @param {*} serializer
     */
    setSerializer(serializer) {
        if (typeof serializer === 'string') {
            serializer = new Serializers_1.default[serializer]();
        }
        this.serializer = serializer;
    }
    /**
     * Get an instance if the serializer, if not set, use setting from the config
     */
    getSerializer() {
        if (!this.serializer) {
            this.setSerializer('plain');
        }
        return this.serializer;
    }
    /**
     * To prevent to many recursion, we limit the number of nested includes allowed
     *
     * @param {*} include
     */
    _guardAgainstToDeepRecursion(include) {
        return include.split('.').slice(0, this._recursionLimit).join('.');
    }
    /**
     * Add all the resources along the way to a nested include
     */
    _autoIncludeParents() {
        const parsed = [];
        // for each resource that is requested
        for (const include of this.requestedIncludes) {
            // we split it by '.' to get the recursions
            const nested = include.split('.');
            // Add the first level to the includes
            let part = nested.shift();
            parsed.push(part);
            // if there are more nesting levels,
            // add each level to the includes
            while (nested.length) {
                part += `.${nested.shift()}`;
                parsed.push(part);
            }
        }
        // add all parsed includes to the set of requested includes
        parsed.forEach(this.requestedIncludes.add, this.requestedIncludes);
    }
    /**
     * Parses the request object from the context and extracts the requested includes
     */
    _setIncludesFromRequest(ctx) {
        ctx;
        return;
        // const Config = ioc.use('Adonis/Src/Config')
        //
        // // Only parse includes if enabled in config
        // if (!Config.get('bumblebee.parseRequest', false)) return
        //
        // // get all get parameters from the request
        // const params = (ctx && ctx.request.get()) || {}
        //
        // // if the 'include' parameter is set, pass it the the parse method
        // if (params.include) {
        //   this.parseIncludes(params.include)
        // }
    }
}
exports.default = Manager;
