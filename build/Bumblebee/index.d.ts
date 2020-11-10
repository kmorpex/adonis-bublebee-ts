/**
 * Bumblebee class
 *
 * @class Bumblebee
 * @constructor
 */
export default class Bumblebee {
    _data: any;
    _dataType: string;
    _transformer: any;
    _variant: null;
    _pagination: null;
    _context: null;
    _manager: any;
    _meta: any;
    _ctx: any;
    /**
     * Creates a new instance of Bumblebee
     * Data and transformer can optionally be passed or set via setters in the instance.
     *
     * @param {*} data
     * @param {TransformerAbstract} transformer
     */
    static create(data?: null, transformer?: null): Bumblebee;
    /**
     * Create a new Bumblebee instance.
     * An instance of Manager has to be passed
     *
     * @param {Manager} manager
     */
    constructor(manager: any);
    /**
     * Add a collection of data to be transformed.
     * If a transformer is passed, the fluid interface is terminated
     *
     * @param {Array} data
     * @param {TransformerAbstract} transformer
     */
    collection(data: any, transformer?: null): any;
    /**
     * Add data that should be transformed as a single item.
     * If a transformer is passed, the fluid interface is terminated
     *
     * @param {Array} data
     * @param {TransformerAbstract} transformer
     */
    item(data: any, transformer?: null): any;
    /**
     * Sets data to null
     */
    null(): this;
    /**
     * Add a collection of data to be transformed.
     * Works just like collection but requires data to be a lucid paginated model.
     * If a transformer is passed, the fluid interface is terminated
     *
     * @param {Array} data
     * @param {TransformerAbstract} transformer
     */
    paginate(data: any, transformer?: null): any;
    /**
     * Add additional meta data to the object under transformation
     *
     * @param {Object} meta
     */
    meta(meta: any): this;
    /**
     * Set the transformer
     *
     * @param {TransformerAbstract} transformer
     */
    transformWith(transformer: any): this;
    /**
     * Set the transformer variant
     *
     * @param {String} variant
     */
    usingVariant(variant: any): this;
    /**
     * Allows you to set the adonis context if you are not
     * using the 'transform' object from the http context.
     *
     * @param {Context} ctx
     */
    withContext(ctx: any): this;
    /**
     * Additional resources that should be included and that are defined as
     * 'availableInclude' on the transformer.
     *
     * @param {Array, String} include
     */
    include(include: any): this;
    /**
     * Set the serializer for this transformation.
     *
     * @param {SerializerAbstrace} serializer
     */
    setSerializer(serializer: any): this;
    /**
     * Alias for 'setSerializer'
     *
     * @param {SerializerAbstrace} serializer
     */
    serializeWith(serializer: any): this;
    /**
     * Terminates the fluid interface and returns the transformed data.
     */
    toArray(): any;
    /**
     * Terminates the fluid interface and returns the transformed data.
     */
    toJSON(): any;
    /**
     * @param {String} dataType
     * @param {Object} data
     */
    _setData(dataType: any, data: any): this;
    /**
     * Helper function to set resource on the manager
     */
    _createData(): any;
    /**
     * Create a resource for the data and set meta and pagination data
     */
    _getResource(): any;
    /**
     * Determine resource type based on the type of the data passed
     *
     * @param {*} data
     */
    _determineDataType(data: any): "Null" | "Collection" | "Item";
}
