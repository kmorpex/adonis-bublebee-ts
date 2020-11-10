// const { ioc } = require('@adonisjs/fold')
import _camelCase from 'lodash/camelCase'
import Scope from './Scope'
import Serializers from './Serializers'

/**
 * Manager class
 *
 * @class Manager
 * @constructor
 */
export default class Manager {
  public serializer: null
  public requestedIncludes: Set<any>
  public _recursionLimit: number
  /**
   * Create a new manager instance
   */
  constructor () {
    this.serializer = null
    this.requestedIncludes = new Set()
    this._recursionLimit = 10
  }

  /**
   * Create a Scope instance for the resource
   *
   * @param {*} resource
   * @param {*} ctx
   */
  public createData (resource, ctx = null) {
    this._setIncludesFromRequest(ctx)
    return new Scope(this, resource, ctx)
  }

  /**
   * Returns the requested includes. An optional parameter converts snake_case
   * includes to standardized camelCase
   */
  public getRequestedIncludes (transformCamelCase = false) {
    if (!transformCamelCase) {
      return this.requestedIncludes
    }

    const includes = [...this.requestedIncludes]
      .map(i => i.split('.').map(_camelCase).join('.'))

    return new Set(includes)
  }

  /**
   * Parses an include string or array and constructs an array of all requested includes
   *
   * @param {*} includes
   */
  public parseIncludes (includes) {
    this.requestedIncludes = new Set()

    // if a string is passed, split by comma and return an array
    if (typeof includes === 'string') {
      includes = includes.split(',')
    }

    // if it is not an array, we can not parse it at this point
    if (!Array.isArray(includes)) {
      throw Error(`The parseIncludes() method expects a string or an array. ${typeof includes} given`)
    }

    // sanitize the includes
    includes = includes.map(i => this._guardAgainstToDeepRecursion(i))

    // add all includes to the internal set
    includes.forEach(this.requestedIncludes.add, this.requestedIncludes)
    this._autoIncludeParents()
  }

  /**
   * Allowes setting a custom recursion limit
   *
   * @param {*} limit
   */
  public setRecursionLimit (limit) {
    this._recursionLimit = limit

    return this
  }

  /**
   * Create a serializer
   *
   * @param {*} serializer
   */
  public setSerializer (serializer) {
    if (typeof serializer === 'string') {
      serializer = new Serializers[serializer]()
    }

    this.serializer = serializer
  }

  /**
   * Get an instance if the serializer, if not set, use setting from the config
   */
  public getSerializer () {
    if (!this.serializer) {
      this.setSerializer('plain')
    }

    return this.serializer
  }

  /**
   * To prevent to many recursion, we limit the number of nested includes allowed
   *
   * @param {*} include
   */
  public _guardAgainstToDeepRecursion (include) {
    return include.split('.').slice(0, this._recursionLimit).join('.')
  }

  /**
   * Add all the resources along the way to a nested include
   */
  public _autoIncludeParents () {
    const parsed: any = []

    // for each resource that is requested
    for (const include of this.requestedIncludes) {
      // we split it by '.' to get the recursions
      const nested = include.split('.')

      // Add the first level to the includes
      let part = nested.shift()
      parsed.push(part)

      // if there are more nesting levels,
      // add each level to the includes
      while (nested.length) {
        part += `.${nested.shift()}`
        parsed.push(part)
      }
    }

    // add all parsed includes to the set of requested includes
    parsed.forEach(this.requestedIncludes.add, this.requestedIncludes)
  }

  /**
   * Parses the request object from the context and extracts the requested includes
   */
  public _setIncludesFromRequest (ctx) {
    ctx
    return
    // const Config = ioc.use('Adonis/Src/Config')
    //
    // // Only parse includes if enabled in config
    // if (!Config.get('bumblebee.parseRequest', false)) return
    //
    // // get all get parameters from the request
    // const params = (ctx && ctx.request.get()) || {}
    //
    // // if the 'include' parameter is set, pass it the the parse method
    // if (params.include) {
    //   this.parseIncludes(params.include)
    // }
  }
}
