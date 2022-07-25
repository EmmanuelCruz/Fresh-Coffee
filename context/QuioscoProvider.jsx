import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const QuioscoContext = createContext()

const QuioscoProvider = ({ children }) => {

  const router = useRouter()

  const [categorias, setCategorias] = useState([])
  const [categoriaActual, setCategoriaActual] = useState({})
  const [cafes, setCafes] = useState([])
  const [hamburguesas, setHamburguesas] = useState([])
  const [pizzas, setPizzas] = useState([])
  const [donas, setDonas] = useState([])
  const [pasteles, setPasteles] = useState([])
  const [galletas, setGalletas] = useState([])
  const [productoSeleccionado, setProductoSeleccionado] = useState({})
  const [modal, setModal] = useState(false)
  const [pedido, setPedido] = useState([])
  const [paso, setPaso] = useState()
  const [nombre, setNombre] = useState('')
  const [total, setTotal] = useState(0)

  const handleClickCategoria = cat => {
    setCategoriaActual(cat)
  }

  const obtenerCategorias = async () => {
    try {
      const { data } = await axios('/api/categorias')
      setCategorias(data)
      setCategoriaActual(data[0])
    } catch (error) {
      console.error(error);
    }
  }

  const obtenerCafes = async () => {
    try {
      const { data } = await axios('/api/cafes')
      setCafes(data)
    } catch (error) {
      console.error(error);
    }
  }

  const obtenerHamburguesas = async () => {
    try {
      const { data } = await axios('/api/hamburguesas')
      setHamburguesas(data)
    } catch (error) {
      console.error(error);
    }
  }

  const obtenerPizzas = async () => {
    try {
      const { data } = await axios('/api/pizzas')
      setPizzas(data)
    } catch (error) {
      console.error(error);
    }
  }

  const obtenerPasteles = async () => {
    try {
      const { data } = await axios('/api/pasteles')
      setPasteles(data)
    } catch (error) {
      console.error(error);
    }
  }

  const obtenerDonas = async () => {
    try {
      const { data } = await axios('/api/donas')
      setDonas(data)
    } catch (error) {
      console.error(error);
    }
  }

  const obtenerGalletas = async () => {
    try {
      const { data } = await axios('/api/galletas')
      setGalletas(data)
    } catch (error) {
      console.error(error);
    }
  }

  const agregarPedido = ({ categoriaId, ...producto }) => {

    if (pedido.some(productoState => productoState.id === producto.id)) {
      // Actualiza pedido
      const pedidoActualizado = pedido.map(productoActual => productoActual.id === producto.id ? producto : productoActual)
      setPedido(pedidoActualizado)
      toast.success('Guardado correctamente')
    } else {
      // Agrega el nuevo pedido
      setPedido([...pedido, producto])
      toast.success('Agregado al pedido')
    }

  }

  const handleActualizarCantidad = id => {
    const productoActualizar = pedido.filter(prod => prod.id === id)
    setProductoSeleccionado(productoActualizar[0])
    setModal(true)
  }

  const handleEliminarCantidad = id => {
    const productoActualizar = pedido.filter(prod => prod.id !== id)
    setPedido(productoActualizar)
  }

  useEffect(() => {
    obtenerCategorias()
    obtenerCafes()
    obtenerHamburguesas()
    obtenerPizzas()
    obtenerDonas()
    obtenerPasteles()
    obtenerGalletas()
  }, [])

  useEffect(() => {
    router.push('/')
  }, [categoriaActual])

  useEffect(() => {
    const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
    setTotal(nuevoTotal)
  }, [pedido])

  const colocarOrden = async e => {
    e.preventDefault()

    try {
      await axios.post('api/ordenes', {
        pedido, nombre, total, fecha: Date.now().toString()
      })

      // Resetear la app
      setPedido([])
      setNombre('')
      setTotal(0)
      setCategoriaActual(categorias[0])
      toast.success('Pedido realizado correctamente')
      setTimeout(() => {
        router.push('/')
      }, 3000);
      
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        handleClickCategoria,
        categoriaActual,
        cafes,
        hamburguesas,
        pizzas,
        donas,
        pasteles,
        galletas,
        productoSeleccionado,
        setProductoSeleccionado,
        modal,
        setModal,
        agregarPedido,
        pedido,
        paso,
        setPaso,
        handleActualizarCantidad,
        handleEliminarCantidad,
        nombre,
        setNombre,
        colocarOrden,
        total
      }}
    >
      {children}
    </QuioscoContext.Provider>
  )
}

export {
  QuioscoProvider
}

export default QuioscoContext