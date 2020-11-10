/// <reference types="@adonisjs/application/build/adonis-typings" />
import { ApplicationContract } from '@ioc:Adonis/Core/Application';
declare module '@ioc:Adonis/Core/HttpContext' {
    interface HttpContextContract {
        transform?: any;
    }
}
export default class AppProvider {
    protected app: ApplicationContract;
    static needsApplication: boolean;
    constructor(app: ApplicationContract);
    register(): void;
    boot(): void;
    shutdown(): void;
    ready(): void;
}
