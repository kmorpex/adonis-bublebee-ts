import SerializerAbstract from './SerializerAbstract';
/**
 * DataSerializer class
 *
 * @class DataSerializer
 * @constructor
 */
export default class DataSerializer extends SerializerAbstract {
    /**
     * Serialize a collection of data
     * The DataSerializer will add all data under the 'data' namespace
     *
     * @param {Array} data
     */
    collection(data: any): Promise<any>;
    /**
     * Serialize a single item
     * The DataSerializer will add the item under the 'data' namespace
     *
     * @param {*} data
     */
    item(data: any): Promise<any>;
    /**
     * Serialize a null value
     */
    null(): Promise<null>;
    /**
     * Serialize a meta object
     *
     * @param {Object} meta
     */
    meta(meta: any): Promise<{
        meta: any;
    }>;
    /**
     * Serialize the pagination meta data
     *
     * @param {Object} pagination
     */
    paginator(pagination: any): Promise<{
        pagination: any;
    }>;
}
