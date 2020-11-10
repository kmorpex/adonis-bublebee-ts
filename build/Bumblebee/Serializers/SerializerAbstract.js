'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * SerializerAbstract class
 *
 * @class SerializerAbstract
 */
class SerializerAbstract {
    /**
     * Serialize a collection of data
     * You must implement this method in your Serializer
     */
    async collection(_data) {
        throw new Error('A Serializer must implement the method collection');
    }
    /**
     * Serialize a single item of data
     * You must implement this method in your Serializer
     */
    async item(_data) {
        throw new Error('A Serializer must implement the method item');
    }
    /**
     * Serialize a null value
     * You must implement this method in your Serializer
     */
    async null(_data) {
        throw new Error('A Serializer must implement the method null');
    }
    /**
     * Serialize a metadata object
     * You must implement this method in your Serializer
     */
    async meta(_meta) {
        throw new Error('A Serializer must implement the method meta');
    }
    /**
     * Serialize a pagination object
     * You must implement this method in your Serializer
     */
    async paginator(_data) {
        throw new Error('A Serializer must implement the method paginator');
    }
    /**
     * Merge included data with the main data for the resource.
     * Both includes and data have passed through either the
     * 'item' or 'collection' method of this serializer.
     *
     * @param {Object} data
     * @param {Object} includes
     */
    async mergeIncludes(data, includes) {
        // Include the includes data first.
        // If there is data with the same key as an include, data will take precedence.
        return Object.assign(includes, data);
    }
}
exports.default = SerializerAbstract;
