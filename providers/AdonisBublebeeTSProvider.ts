import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import Bumblebee from '../Bumblebee'
import TransformerAbstract from '../Bumblebee/TransformerAbstract'

declare module '@ioc:Adonis/Core/HttpContext' {
  interface HttpContextContract {
    transform?: any
  }
}

export default class AppProvider {
  public static needsApplication = true

  constructor (protected app: ApplicationContract) {
  }

  public register (): void {
    // Register your own bindings
    this.app.container.singleton(
      'Adonis/Addons/Bumblebee',
      () => ({
        TransformerAbstract,
        Bumblebee,
      })
    )
  }

  public boot () {
    // IoC container is ready
    const Context = this.app.container.use('Adonis/Core/HttpContext')
    Context.getter(
      'transform',
      () => {
        return Bumblebee.create().withContext(this)
      },
      true
    )
  }

  public shutdown () {
    // Cleanup, since app is going down
  }

  public ready () {
    // App is ready
  }
}
