import Layout from './../layout/Layout'
import { useCallback, useEffect } from 'react'
import useQuiosco from '../hooks/useQuiosco'
import { formateaDinero } from '../helpers'

export default function Total() {

  const { pedido, nombre, setNombre, colocarOrden, total } = useQuiosco()

  const comprobarFormulario = useCallback( () => {
    return pedido.length === 0 || nombre === '' || nombre.length < 3
  })

  useEffect(() => {
    comprobarFormulario()
  }, [pedido, nombre])

  return (
    <Layout
      pagina={'Total'}
    >
      <h1 className='text-4xl font-black'>Total</h1>
      <p className='text-2xl m-10'>
      Confirma tu pedido tu pedido
      </p>

      <form
        onSubmit={colocarOrden}
      >
        <div>
          <label htmlFor='nombre' className='block uppercase text-slate-800 font-bold text-xl'>
            Nombre
          </label>
          <input
            type={'text'}
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            id='nombre'
            className='bg-gray-200 w-full lg:w-1/3 p-2 rounded-md'
          />
        </div>

        <div className='mt-10'>
          <p className='text-2xl'>Total a pagar: <span className='font-bold'>{formateaDinero(total)}</span></p>
        </div>

        <div className='mt-5'>
          <input 
            value='Confirmar pedido'
            type='submit'
            disabled={comprobarFormulario()}
            className={`${comprobarFormulario() ? 'bg-indigo-100': 'bg-indigo-700 hover:bg-indigo-800' } w-full text-center lg:w-auto px-5 py-2 rounded uppercase font-bold text-white`}
          />
        </div>
      </form>
    </Layout>
  )
}