# Adonis v5 Bumblebee transformer

Version [for **Adonis v4**](https://github.com/rhwilr/adonis-bumblebee)

> Works with @adonisjs/lucid@alpha (^9.*.*)

This addon adds the functionality to transform output Lucid Models data
This addon was written as an urgent alternative and is in alpha version, please suggest your changes and improvements.

## Installation

Make sure to install it using `npm` or `yarn`.

```bash
# npm
npm i adonis-bumblebee-ts
node ace invoke adonis-bumblebee-ts

# yarn
yarn add adonis-bumblebee-ts
node ace invoke adonis-bumblebee-ts
```

## Usage

Make sure to register the provider inside `.adonisrc.json` file.

```json
"providers": [
  "...other packages",
  "adonis-bumblebee-ts"
]
```

For TypeScript projects add to `tsconfig.json` file:
```json
"compilerOptions": {
  "types": [
    "...other packages",
    "adonis-bumblebee-ts"
  ]
}
```

## Simple Example

For the sake of simplicity, this example has been put together as one simple
route function. In reality, you would create dedicated Transformer classes for
each model. But we will get there, let's first have a look at this:

```typescript
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserController {
  public async findUser({ request, response, transform }: HttpContextContract) {
    const user = await User.find(1)
    return await transform.item(user, (model) => ({
        id: model.id,
        name: model.name,
    })) 
  }
}
```

You may notice a few things here: First, we can import `transform` from the
context, and then call a method `collection` on it. This method is called a
[resources](#resources) and we will cover it in the next section. We pass our
data to this method along with a [transformer](#transformers). In return, we get
the transformed data back.

## Resources

Resources are objects that represent data and have knowledge of a “Transformer”.
There are two types of resources:

- **Item** - A singular resource, probably one entry in a data store
- **Collection** - A collection of resources

The resource accepts an object or an array as the first argument, representing
the data that should be transformed. The second argument is the transformer used
for this resource.

## Transformers

The simplest transformer you can write is a callback transformer. Just return an
object that maps your data.

```ts
const users = await User.all()

return transform.collection(users, (user) => ({
  firstname: user.first_name,
  lastname: user.last_name
}))
```

But let's be honest, this is not what you want. And we would agree with you, so
let's have a look at transformer classes.


### Transformer Classes

The recommended way to use transformers is to create a transformer class. This
allows the transformer to be easily reused in multiple places.


```ts
import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'

export default class UserTransformer extends TransformerAbstract {
  public transform(model) {
    return {
      id: model.name,      
      name: model.name,
    }
  }
}
```

#### Using the Transformer

Once the transformer class is defined, it can be passed to the resource as the
second argument.

```ts
import UserTransformer from 'App/Transformers/UserTransfromer'

const user = await User.find(1)
return transform.item(user, UserTransformer) 
```

### Including Data

When transforming a model, you may want to include some additional data. For
example, you may have a book model and want to include the author for the book
in the same resource. Include methods let you do just that. 

#### Default Include

Includes defined in the `defaultInclude` getter will always be included in the
returned data.

You have to specify the name of the include by returning an array of all
includes from the `defaultInclude` getter. Then you create an additional method
for each include, named like in the example: `include{Name}`.

The include method returns a new resource, that can either be an `item` or a
`collection`.  See [Resources](#resources).

```ts
import RoleTransformer from 'App/Transformers/RoleTransfromer'

export default class ProfileTransformer extends TransformerAbstract {
  public defaultInclude = ['roles']

  public transform(model): any {
    return {
      name: model.phone,
      phone: model.phone,
      email: model.email,
    }
  }

  public includeRoles(model) {
    return this.collection(model.related('roles').query(), RoleTransformer)
  }
}
```

#### Available Include

An `availableInclude` is almost the same as a `defaultInclude`, except it is not
included by default.

```ts
import RoleTransformer from 'App/Transformers/RoleTransfromer'

export default class ProfileTransformer extends TransformerAbstract {
  public availableInclude = ['roles']

  public transform(model): any {
    return {
      name: model.phone,
      phone: model.phone,
      email: model.email,
    }
  }

  public includeRoles(model) {
    return this.collection(model.related('roles').query(), RoleTransformer)
  }
}
```

To include this resource you call the `include()` method before transforming.

```js
return transform.include('author').item(book, BookTransformer)
```

These includes can be nested with dot notation too, to include resources within
other resources.

```js
return transform.include('author,publisher.something').item(book, BookTransformer)
```

You may want to use the transformer somewhere other than in a controller. You
can import bumblebee directly by the following method:

```js
import { Bumblebee } from '@ioc:Adonis/Addons/Bumblebee'

let transformed = await Bumblebee.create()
    .item(data)
    .transformWith(ProfileTransformer)
    .withContext(HttpContextContract)
    .toJSON()
```

You can use the same methods as in a controller. With one difference: If you
need the `context` inside the transformer, you have to set it with the
`.withContext(HttpContextContract)` method since it is not automatically injected.

## Credits

Special thanks to the creator(s) of [Fractal], a PHP API transformer that was
the main inspiration for this package. Also, a huge thank goes to the creator(s)
of [AdonisJS] for creating such an awesome framework.

[Fractal]: https://fractal.thephpleague.com
[AdonisJS]: http://adonisjs.com
