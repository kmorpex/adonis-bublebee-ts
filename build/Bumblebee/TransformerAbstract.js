"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = __importDefault(require("./Resources"));
const camelCase_1 = __importDefault(require("lodash/camelCase"));
const Scope_1 = __importDefault(require("./Scope"));
/**
 * TransformerAbstract class
 *
 * @class TransformerAbstract
 * @constructor
 */
class TransformerAbstract {
    constructor() {
        /*
         * Resources that can be included if requested
        */
        this.availableInclude = [];
        /*
         * List of resources to automatically include
        */
        this.defaultInclude = [];
    }
    /**
     * This method is used to transform the data.
     * Implementation required
     */
    transform(_data) {
        throw new Error('You have to implement the method transform or specify a variant when calling the transformer!');
    }
    /**
     * Helper method to transform a collection in includes
     *
     * @param {*} data
     * @param {*} transformer
     */
    collection(data, transformer) {
        return new Resources_1.default.Collection(data, transformer);
    }
    /**
     * Helper method to transform an object in includes
     *
     * @param {*} data
     * @param {*} transformer
     */
    item(data, transformer) {
        return new Resources_1.default.Item(data, transformer);
    }
    /**
     * Helper method to return a null resource
     *
     * @param {*} data
     * @param {*} transformer
     */
    null() {
        return new Resources_1.default.Null();
    }
    /**
     * Processes included resources for this transformer
     *
     * @param {*} parentScope
     * @param {*} data
     */
    async _processIncludedResources(parentScope, data) {
        const includeData = {};
        // figure out which of the available includes are requested
        const resourcesToInclude = this._figureOutWhichIncludes(parentScope);
        // load related lucid models
        await this._eagerloadIncludedResource(resourcesToInclude, data);
        // for each include call the include function for the transformer
        for (const include of resourcesToInclude) {
            const resource = await this._callIncludeFunction(include, parentScope, data);
            // if the include uses a resource, run the data through the transformer chain
            if (resource instanceof Resources_1.default.ResourceAbstract) {
                includeData[include] = await this._createChildScopeFor(parentScope, resource, include).toJSON();
            }
            else {
                // otherwise, return the data as is
                includeData[include] = resource;
            }
        }
        return includeData;
    }
    /**
     * Construct and call the include function
     *
     * @param {*} include
     * @param {*} parentScope
     * @param {*} data
     */
    async _callIncludeFunction(include, parentScope, data) {
        // convert the include name to camelCase
        include = camelCase_1.default(include);
        const includeName = `include${include.charAt(0).toUpperCase()}${include.slice(1)}`;
        if (!(this[includeName] instanceof Function)) {
            throw new Error(`A method called '${includeName}' could not be found in '${this.constructor.name}'`);
        }
        return this[includeName](data, parentScope._ctx);
    }
    /**
     * Returns an array of all includes that are requested
     *
     * @param {*} parentScope
     */
    _figureOutWhichIncludes(parentScope) {
        const includes = this.defaultInclude;
        const requestedAvailableIncludes = this.availableInclude.filter(i => parentScope._isRequested(i));
        return includes.concat(requestedAvailableIncludes);
    }
    /**
     * Create a new scope for the included resource
     *
     * @param {*} parentScope
     * @param {*} resource
     * @param {*} include
     */
    _createChildScopeFor(parentScope, resource, include) {
        // create a new scope
        const childScope = new Scope_1.default(parentScope._manager, resource, parentScope._ctx, include);
        // get the scope for this transformer
        const scopeArray = [...parentScope.getParentScopes()];
        if (parentScope.getScopeIdentifier()) {
            scopeArray.push(parentScope.getScopeIdentifier());
        }
        // set the parent scope for the new child scope
        childScope.setParentScopes(scopeArray);
        return childScope;
    }
    /**
     * Eager-load lucid models for includes
     * @param {*} resourcesToInclude
     * @param {*} data
     */
    async _eagerloadIncludedResource(resourcesToInclude, data) {
        // if there is no loadMany function, return since it propably is not a lucid model
        if (!data.loadMany) {
            return;
        }
        // figure out which resources should be loaded
        const resourcesToLoad = resourcesToInclude.filter(resource => {
            // check that a relation method exists and that the relation was not previously loaded.
            return (data[resource] instanceof Function) &&
                !data.related(resource).query() && data.$relations[resource] !== null;
        });
        // if no resources should be loaded, return
        if (!resourcesToLoad.length) {
            return;
        }
        // load all resources
        await data.loadMany(resourcesToLoad);
    }
}
exports.default = TransformerAbstract;
