'use strict'


/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('posts', 'PostController.store')
Route.get('posts', 'PostController.index')
Route.delete('posts/:id', 'PostController.destroy')
Route.delete('posts', 'PostController.destroyAll')
