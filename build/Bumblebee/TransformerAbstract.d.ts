import Scope from './Scope';
/**
 * TransformerAbstract class
 *
 * @class TransformerAbstract
 * @constructor
 */
export default class TransformerAbstract {
    availableInclude: never[];
    defaultInclude: never[];
    /**
     * This method is used to transform the data.
     * Implementation required
     */
    transform(_data: any): void;
    /**
     * Helper method to transform a collection in includes
     *
     * @param {*} data
     * @param {*} transformer
     */
    collection(data: any, transformer: any): import("./Resources/Collection").default;
    /**
     * Helper method to transform an object in includes
     *
     * @param {*} data
     * @param {*} transformer
     */
    item(data: any, transformer: any): import("./Resources/Item").default;
    /**
     * Helper method to return a null resource
     *
     * @param {*} data
     * @param {*} transformer
     */
    null(): import("./Resources/Null").default;
    /**
     * Processes included resources for this transformer
     *
     * @param {*} parentScope
     * @param {*} data
     */
    _processIncludedResources(parentScope: any, data: any): Promise<any>;
    /**
     * Construct and call the include function
     *
     * @param {*} include
     * @param {*} parentScope
     * @param {*} data
     */
    _callIncludeFunction(include: any, parentScope: any, data: any): Promise<any>;
    /**
     * Returns an array of all includes that are requested
     *
     * @param {*} parentScope
     */
    _figureOutWhichIncludes(parentScope: any): never[];
    /**
     * Create a new scope for the included resource
     *
     * @param {*} parentScope
     * @param {*} resource
     * @param {*} include
     */
    _createChildScopeFor(parentScope: any, resource: any, include: any): Scope;
    /**
     * Eager-load lucid models for includes
     * @param {*} resourcesToInclude
     * @param {*} data
     */
    _eagerloadIncludedResource(resourcesToInclude: any, data: any): Promise<void>;
}
