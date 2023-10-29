import express from 'express'

const app = express()

app.get('/hello', (req, res) => {
  const links = LinksCollection.find({}).fetch()
  res.status(200).json(links)
})

export default app