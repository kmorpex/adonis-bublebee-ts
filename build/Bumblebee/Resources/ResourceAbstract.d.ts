/**
 * ResourceAbstract class
 *
 * @class ResourceAbstract
 * @constructor
 */
export default class ResourceAbstract {
    data: any;
    meta: null;
    transformer: any | string;
    variant: null | string;
    pagination: any;
    /**
     * Constructor for the ResourceAbstract
     * This allow to set data and transformer while creating an instance
     */
    constructor(data: any, trans: any);
    /**
     * Return the data for this resource
     */
    getData(): Promise<any>;
    /**
     * Returns the transformer set for this resource
     */
    getTransformer(): any;
    /**
     * Set Meta data that will be included when transforming this resource
     *
     * @param {Object} meta
     */
    setMeta(meta: any): this;
    /**
     * Returns the metadata
     */
    getMeta(): null;
    /**
     * Set pagination information for this resource
     *
     * @param {Object} pagination
     */
    setPagination(pagination: any): this;
    /**
     * Returns the saved pagination information
     */
    getPagination(): any;
    /**
     * Set the transformer variant to be used for this resource
     *
     * @param {Object} pagination
     */
    setVariant(variant: any): this;
    /**
     * Returns the transformer variant
     */
    getVariant(): string | null;
    /**
     * When a transformer string is passed with a variation defined in dot-notation
     * we will split the string into transformer and variant
     */
    _separateTransformerAndVariation(transformerString: any): {
        transformer: any;
        variant: null;
    } | {
        transformer: string;
        variant: string | null;
    };
}
