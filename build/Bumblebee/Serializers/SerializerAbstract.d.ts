/**
 * SerializerAbstract class
 *
 * @class SerializerAbstract
 */
export default class SerializerAbstract {
    /**
     * Serialize a collection of data
     * You must implement this method in your Serializer
     */
    collection(_data: any): Promise<any>;
    /**
     * Serialize a single item of data
     * You must implement this method in your Serializer
     */
    item(_data: any): Promise<any>;
    /**
     * Serialize a null value
     * You must implement this method in your Serializer
     */
    null(_data: any): Promise<any>;
    /**
     * Serialize a metadata object
     * You must implement this method in your Serializer
     */
    meta(_meta: any): Promise<any>;
    /**
     * Serialize a pagination object
     * You must implement this method in your Serializer
     */
    paginator(_data: any): Promise<any>;
    /**
     * Merge included data with the main data for the resource.
     * Both includes and data have passed through either the
     * 'item' or 'collection' method of this serializer.
     *
     * @param {Object} data
     * @param {Object} includes
     */
    mergeIncludes(data: any, includes: any): Promise<any>;
}
