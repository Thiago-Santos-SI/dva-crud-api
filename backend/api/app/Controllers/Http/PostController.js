'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Post = use('App/Models/Post')

class PostController {

  async index ({ request, response, view }) {
    const data = await Post.all()

    return data
  }


  async store ({ request }) {
    const data = request.only(['title', 'body'])

    const post = await Post.create(data)

    return post
  }

  async update ({ params, request, response }) {
    const data = request.only(['title', 'body'])

    const post = await Post.find(params.id)

    post.merge(data)

    await post.save()

    return post
  }

  async destroyAll ({ params, request, response }) {
    const post = await Post.all()

    await post.delete()
  }

  async destroy ({ params, request, response }) {
    const post = await Post.find(params.id)

    await post.delete()
  }
}

module.exports = PostController
