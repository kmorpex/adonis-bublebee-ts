import SerializerAbstract from './SerializerAbstract';
/**
 * PlainSerializer class
 *
 * @class PlainSerializer
 * @constructor
 */
export default class PlainSerializer extends SerializerAbstract {
    /**
     * Serialize a collection of data
     * The PlainSerializer will just return the data without modification
     *
     * @param {Array} data
     */
    collection(data: any): Promise<any>;
    /**
     * Serialize a single item
     * The PlainSerializer will return the the data without modification
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
