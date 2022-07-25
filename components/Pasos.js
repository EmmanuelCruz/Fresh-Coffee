import { useRouter } from 'next/router';
import useQuiosco from '../hooks/useQuiosco';

const pasos = [
  {paso: 1, nombre: 'Menú', url: '/'},
  {paso: 2, nombre: 'Resumen', url: '/resumen'},
  {paso: 3, nombre: 'Datos y total', url: '/total'}
]

const Pasos = () => {
  const { setPaso } = useQuiosco()

  const router = useRouter()

  const calcularProgreso = () => {
    let valor
    switch (router.pathname) {
      case '/':
        valor = 5
        break;
      case '/resumen':
        valor = 50
        break;
      case '/total':
        valor = 100
        break;
      default:
        break;
    }
    return valor
  }

  return (
    <>
      <div className="flex justify-between">
        {pasos.map(paso => (
          <button onClick={() => {
            router.push(paso.url)
            setPaso(paso.paso)
          }} className="text-2xl font-bold" key={paso.paso}>{paso.nombre}</button>
        ))}
      </div>

      <div className='bg-gray-100 mb-10'>
        <div style={{width: `${calcularProgreso()}%`}} className='bg-amber-500 rounded-full text-xs leading-none h-2 text-center text-white'></div>
      </div>
    </>
  )
}

export default Pasos
