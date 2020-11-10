'use strict'

import ResourceAbstract from './ResourceAbstract'

/**
 * Null class
 *
 * @class Null
 */
export default class Null extends ResourceAbstract {
  /**
   * Overwrite the constructor and set data and transformer to null
   */
  constructor () {
    super(null, null)
  }

  /**
   * Returns null, a NullResource always returns null
   */
  public async getData () {
    return null
  }
}
