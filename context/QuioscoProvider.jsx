import axios from "axios";
import { createContext, useEffect, useState } from "react";

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {
  
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

  const agregarPedido = ({categoriaId, imagen, ...producto}) => {

    if(pedido.some(productoState => productoState.id === producto.id)) {
      // Actualiza pedido
      const pedidoActualizado = pedido.map(productoActual => productoActual.id === producto.id ? producto : productoActual)
      setPedido(pedidoActualizado)
    } else {
      // Agrega el nuevo pedido
      setPedido([...pedido, producto])
    }

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
        agregarPedido
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