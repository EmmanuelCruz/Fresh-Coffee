import Image from "next/image"
import { formateaDinero } from "../helpers"
import useQuiosco from "../hooks/useQuiosco"

const Producto = ({ producto }) => {
  const { id, nombre, precio, imagen, } = producto
  const { setProductoSeleccionado, setModal } = useQuiosco()

  return (
    <div className="border p-3">
      <Image
        src={`/assets/img/${imagen}.jpg`}
        alt={`Imagen ${nombre}`}
        width={400}
        height={500}
      />
      <div className="p-5">
        <h3 className="text-2xl font-bold">{nombre}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formateaDinero(precio)}
        </p>

        <button
          type="button"
          className='bg-indigo-600 hover:bg-indigo-800 text-white mt-5 p-3 w-full uppercase font-bold'
          onClick={() => {
            setModal(true)
            setProductoSeleccionado(producto)
          } }
        >
          Agregar
        </button>
      </div>
    </div>
  )
}

export default Producto
