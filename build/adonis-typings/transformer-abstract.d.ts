declare module '@ioc:Adonis/Addons/Bumblebee' {
    interface TransformerAbstractI {
        new (): any;
        availableInclude?: string[];
        defaultInclude?: string[];
        transform?(model: any): object;
        collection?(model: any, transformer: TransformerAbstractI | object): object;
        item?(model: any, transformer: TransformerAbstractI | object): object;
    }
    const TransformerAbstract: TransformerAbstractI;
    const Bumblebee: TransformerAbstractI;
}
