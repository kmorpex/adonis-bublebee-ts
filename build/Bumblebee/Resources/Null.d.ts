import ResourceAbstract from './ResourceAbstract';
/**
 * Null class
 *
 * @class Null
 */
export default class Null extends ResourceAbstract {
    /**
     * Overwrite the constructor and set data and transformer to null
     */
    constructor();
    /**
     * Returns null, a NullResource always returns null
     */
    getData(): Promise<null>;
}
