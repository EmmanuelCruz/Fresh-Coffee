import Layout from './../layout/Layout'
import useQuiosco from '../hooks/useQuiosco'
import Producto from '../components/Producto'
import { useEffect, useState } from 'react'

export default function Home() {

  const { categoriaActual, cafes, hamburguesas, pizzas, donas, pasteles, galletas } = useQuiosco()
  const [productos, setProductos] = useState([])

  useEffect(() => {
    switch (categoriaActual.id) {
      case 1:
        setProductos(cafes)
        break;
      case 2:
        setProductos(hamburguesas)
        break;
      case 3:
        setProductos(pizzas)
        break;
      case 4:
        setProductos(donas)
        break
      case 5:
        setProductos(pasteles)
        break
      case 6:
        setProductos(galletas)
        break
      default:
        setProductos(cafes)
        break;
    }
  }, [categoriaActual])

  return (
    <Layout
      pagina={categoriaActual.nombre}
    >
      <h1 className='text-4xl font-black'>{categoriaActual.nombre}</h1>
      <p className='text-2xl m-10'>
        Elije y personaliza tu pedido a continuación
      </p>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {productos.map(producto => (
          <Producto key={producto.id} producto={producto} />
        ))}
      </div>
    </Layout>
  )
}
