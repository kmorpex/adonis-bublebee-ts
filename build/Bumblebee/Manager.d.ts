import Scope from './Scope';
/**
 * Manager class
 *
 * @class Manager
 * @constructor
 */
export default class Manager {
    serializer: null;
    requestedIncludes: Set<any>;
    _recursionLimit: number;
    /**
     * Create a new manager instance
     */
    constructor();
    /**
     * Create a Scope instance for the resource
     *
     * @param {*} resource
     * @param {*} ctx
     */
    createData(resource: any, ctx?: null): Scope;
    /**
     * Returns the requested includes. An optional parameter converts snake_case
     * includes to standardized camelCase
     */
    getRequestedIncludes(transformCamelCase?: boolean): Set<any>;
    /**
     * Parses an include string or array and constructs an array of all requested includes
     *
     * @param {*} includes
     */
    parseIncludes(includes: any): void;
    /**
     * Allowes setting a custom recursion limit
     *
     * @param {*} limit
     */
    setRecursionLimit(limit: any): this;
    /**
     * Create a serializer
     *
     * @param {*} serializer
     */
    setSerializer(serializer: any): void;
    /**
     * Get an instance if the serializer, if not set, use setting from the config
     */
    getSerializer(): null;
    /**
     * To prevent to many recursion, we limit the number of nested includes allowed
     *
     * @param {*} include
     */
    _guardAgainstToDeepRecursion(include: any): any;
    /**
     * Add all the resources along the way to a nested include
     */
    _autoIncludeParents(): void;
    /**
     * Parses the request object from the context and extracts the requested includes
     */
    _setIncludesFromRequest(ctx: any): void;
}
