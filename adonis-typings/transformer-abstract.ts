declare module '@ioc:Adonis/Addons/Bumblebee' {
  interface TransformerAbstractI {
    new()
    availableInclude?: string[]
    defaultInclude?: string[]
    transform?(model: any): object
    collection?(model: any, transformer: TransformerAbstractI | object) : object
    item?(model: any, transformer: TransformerAbstractI | object) : object
  }

  export const TransformerAbstract: TransformerAbstractI
  export const Bumblebee: TransformerAbstractI
}
