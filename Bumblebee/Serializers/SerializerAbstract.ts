'use strict'

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
  public async collection (_data): Promise<any> {
    throw new Error('A Serializer must implement the method collection')
  }

  /**
   * Serialize a single item of data
   * You must implement this method in your Serializer
   */
  public async item (_data): Promise<any> {
    throw new Error('A Serializer must implement the method item')
  }

  /**
   * Serialize a null value
   * You must implement this method in your Serializer
   */
  public async null (_data): Promise<any> {
    throw new Error('A Serializer must implement the method null')
  }

  /**
   * Serialize a metadata object
   * You must implement this method in your Serializer
   */
  public async meta (_meta): Promise<any> {
    throw new Error('A Serializer must implement the method meta')
  }

  /**
   * Serialize a pagination object
   * You must implement this method in your Serializer
   */
  public async paginator (_data): Promise<any> {
    throw new Error('A Serializer must implement the method paginator')
  }

  /**
   * Merge included data with the main data for the resource.
   * Both includes and data have passed through either the
   * 'item' or 'collection' method of this serializer.
   *
   * @param {Object} data
   * @param {Object} includes
   */
  public async mergeIncludes (data, includes): Promise<any> {
    // Include the includes data first.
    // If there is data with the same key as an include, data will take precedence.
    return Object.assign(includes, data)
  }
}

