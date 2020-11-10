import SerializerAbstract from './SerializerAbstract';
/**
 * DataSerializer class
 *
 * @class DataSerializer
 * @constructor
 */
export default class SLDataSerializer extends SerializerAbstract {
    /**
     * Serialize a collection of data
     * The DataSerializer will add all data under the 'data' namespace
     *
     * @param {Array} data
     * @param depth
     */
    collection(data: any, depth?: number): Promise<any>;
    /**
     * Serialize a single item
     * The DataSerializer will add the item under the 'data' namespace
     *
     * @param {*} data
     * @param depth
     */
    item(data: any, depth?: number): Promise<any>;
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
