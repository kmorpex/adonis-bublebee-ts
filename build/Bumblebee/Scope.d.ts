/**
 * Scope class
 *
 * @class Scope
 * @constructor
 */
export default class Scope {
    _manager: any;
    _resource: any;
    _ctx: any;
    _scopeIdentifier: any;
    _parentScopes: any[];
    /**
     * Create a new Scope class
     *
     * @param {*} manager
     * @param {*} resource
     * @param {*} ctx
     * @param {*} scopeIdentifier
     */
    constructor(manager: any, resource: any, ctx: any, scopeIdentifier?: null);
    /**
     * Passes the data through the transformers and serializers and returns the transformed data
     */
    toJSON(): Promise<any>;
    /**
     * Creates a transformer instance and runs data through the transformer
     */
    _executeResourceTransformers(): Promise<any[]>;
    /**
     * Runs an object of data through a transformer method
     *
     * @param {*} data
     * @param {*} transformer
     */
    _fireTransformer(data: any, transformer: any): Promise<any[]>;
    /**
     * Run data through a serializer
     *
     * @param {*} serializer
     * @param {*} rawData
     */
    _serializeResource(serializer: any, rawData: any): Promise<any>;
    /**
     * Checks if this scope is requested by comparing the current nesting level with the requested includes
     *
     * @param {*} checkScopeSegment
     */
    _isRequested(checkScopeSegment: any): any;
    /**
     * Creates and returns a new transformer instance
     *
     * @param {*} Transformer
     */
    _getTransformerInstance(Transformer: any): any;
    /**
     * Resolves a transformer from the ioc container
     *
     * @param transformer
     */
    _resolveTransformer(transformer: any): Promise<any>;
    /**
     * Checks if any variants are defined and calls the corresponding transform method
     *
     * @param {*} transformerInstance
     * @param {*} data
     * @param {*} ctx
     */
    _dispatchToTransformerVariant(transformerInstance: any, data: any, ctx: any): Promise<any>;
    /**
     * Check if the used transformer has any includes defined
     *
     * @param {*} Transformer
     */
    _transformerHasIncludes(Transformer: any): boolean;
    /**
     * Set the parent scope identifier
     */
    setParentScopes(parentScopes: any): void;
    /**
     *  Returns the parents scope identifier
     */
    getParentScopes(): any[];
    /**
     * Get the identifier for this scope
     */
    getScopeIdentifier(): any;
    getScopeArray(): any[];
}
