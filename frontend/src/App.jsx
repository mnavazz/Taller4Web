
import { useEffect, useState } from 'react'
import { Container, Card, CardBody, CardTitle, Alert, Spinner } from 'reactstrap'
import './App.css'

function App() {
  const [estadoApi, setEstadoApi] = useState('cargando')
  const [informacion, setInformacion] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/api/health')
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('Error al consultar el API')
        }
        return respuesta.json()
      })
      .then((datos) => {
        setEstadoApi(datos.mensaje)
      })
      .catch(() => {
        setEstadoApi('No se pudo conectar con el API')
      })

    fetch('http://localhost:3000/api/info')
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('Error al consultar la información')
        }
        return respuesta.json()
      })
      .then((datos) => {
        setInformacion(datos)
      })
      .catch(() => {
        setInformacion(null)
      })
  }, [])

  return (
    <Container className="contenedor-taller py-4">
      <h1 className="titulo-taller">Taller IV</h1>

      <section className="seccion-salud">
        <div className="estado-api">
          <h4>Estado del API</h4>
          <p>{estadoApi === 'cargando' ? 'Comprobando el estado del API...' : estadoApi}</p>
        </div>
      </section>

      <section className="seccion-info mt-4">
        <h2>Información de los integrantes</h2>

        {informacion ? (
          <Card className="tarjeta-info">
            <CardBody>
              <CardTitle tag="h4">Información del equipo</CardTitle>
              {informacion.integrantes.map((integrante, indice) => (
                <div key={indice} className="integrante">
                  <p><strong>Carnet:</strong> {integrante.carnet}</p>
                  <p><strong>Ciudad de origen:</strong> {integrante.ciudad}</p>
                  <p><strong>Carrera:</strong> {integrante.carrera}</p>
                  <p><strong>Proyectos realizados:</strong> {integrante.proyectos}</p>
                </div>
              ))}
              <Alert color="success">{informacion.mensaje}</Alert>
            </CardBody>
          </Card>
        ) : (
          <Alert color="info">
            {estadoApi === 'cargando' ? (
              <><Spinner size="sm" /> Cargando información...</>
            ) : (
              'No se pudo cargar la información del equipo.'
            )}
          </Alert>
        )}
      </section>
    </Container>
  )
}

export default App
