const express = require('express')
const Album = require('./models').album
const Artist = require('./models').artist
const Curator = require('./models').curator
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const cors = require('cors')

const app = express()

const middleware = cors()
app.use(middleware)

// const bodyParser = express.json()
// app.use(bodyParser)
app.use(express.json())

const secret = process.env.JWT_SECRET || "e9rp^&^*&@9sejg)DSUA)jpfds8394jdsfn,m";

async function authenticateCurator (
  request, response, next
) {
  console.log('request.headers test:', request.headers)
  const { authorization } = request.headers

  if (!authorization) return response
    .send('no authorization')

  const [bearer, token] = authorization.split(' ')

  if (!bearer) return response.send('no bearer')
  if (!token) return response.send('no token')

  const header = bearer === 'Bearer'
  if (!header) return response.send('wrong header')

  try {
    const data = jsonwebtoken.verify(token, secret)

    const { curatorId } = data
    const curator = await Curator.findByPk(curatorId)

    if (!curator) return response.send('not curator')
    
    request.curator = curator

    next()
  } catch (error) {
    next(error)
  }
}

async function allAlbums (request, response, next) {
  const { curator } = request

  if (!curator) return response.send('no curator')

  try {
    const albums = await Album.findAll()

    return response.send(albums)
  } catch (error) {
    next(error)
  }
}
app.get('/album', authenticateCurator, allAlbums)

async function allArtists (request, response, next) {
  try {
    const artists = await Artist.findAll()

    response.send(artists)
  } catch (error) {
    next(error)
  }
}
app.get('/artist', authenticateCurator, allArtists)

async function artistAlbums (request, response, next) {
  const parameter = request.params.artistId
  const artistId = parseInt(parameter)

  try {
    const artist = await Artist.findByPk(
      artistId,
      { include: [Album] }
    )

    response.send(artist)
  } catch (error) {
    next(error)
  }
}
// Albums made by an artist
app.get('/album/artist/:artistId', artistAlbums)

async function albumArtists (request, response, next) {
  console.log('albumArtists test')
  const parameter = request.params.albumId
  const albumId = parseInt(parameter)

  console.log('albumId test!:', albumId)

  try {
    const album = await Album.findByPk(
      albumId,
      { include: [Artist] }
    )

    console.log

    response.send(album)
  } catch (error) {
    next(error)
  }
}
// Finds the artists associated with an album
app.get('/artist/album/:albumId', albumArtists)

async function createCurator (request, response, next) {
  const { name, password } = request.body

  if (!name) return response.send('no name')

  if (!password) return response.send('no password')

  console.log('name test:', name)
  console.log('password test:', password)

  try {
    const hashed = bcrypt.hashSync(password, 10)

    const curator = await Curator.create({
      name, password: hashed
    })

    response.send(curator)
  } catch (error) {
    next(error)
  }
}
app.post('/curator', createCurator)

async function login (request, response, next) {
  const { name, password } = request.body

  if (!name) return response.send('no name')

  if (!password) return response.send('no password')

  const curator = await Curator.findOne({
    where: { name }
  })

  if (!curator) return response.send('wrong name')

  const comparison = bcrypt.compareSync(
    password, curator.password
  )

  if (!comparison) return response.send('wrong password')

  const data = { curatorId: curator.id }

  const jwt = jsonwebtoken.sign(
    data, secret, { expiresIn: "2h" }
  )

  response.send(jwt)
}
app.post('/login', login)

const port = 4000
app.listen(port, () => console.log(`:${port}`))