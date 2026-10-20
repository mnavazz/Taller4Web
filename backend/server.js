
const express = require('express')
const cors = require('cors')

const app = express()
const puerto = 3000

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({
    funcionando: true,
    mensaje: 'El API está funcionando correctamente.'
  })
})

app.get('/api/info', (req, res) => {
  res.json({
    mensaje: 'El API está funcionando correctamente.',
    integrantes: [
  {
    carnet: '00167525',
    ciudad: 'Soyapango',
    carrera: 'Ingeniería Informática',
    proyectos: 3
  },
  {
    carnet: '00115025',
    ciudad: 'San Salvador',
    carrera: 'Ingeniería Informática',
    proyectos: 2
  }
]
  })
})

app.listen(puerto, () => {
  console.log(`API ejecutándose en http://localhost:${puerto}`)
})
