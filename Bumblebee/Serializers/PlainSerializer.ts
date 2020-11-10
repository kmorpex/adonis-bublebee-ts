import SerializerAbstract from './SerializerAbstract'

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
  public async collection (data) {
    return data
  }

  /**
   * Serialize a single item
   * The PlainSerializer will return the the data without modification
   *
   * @param {*} data
   */
  public async item (data) {
    return data
  }

  /**
   * Serialize a null value
   */
  public async null () {
    return null
  }

  /**
   * Serialize a meta object
   *
   * @param {Object} meta
   */
  public async meta (meta) {
    return { meta: meta }
  }

  /**
   * Serialize the pagination meta data
   *
   * @param {Object} pagination
   */
  public async paginator (pagination) {
    return { pagination: pagination }
  }
}
