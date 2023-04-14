import { FaLinux, FaWindows } from 'react-icons/fa'
import { tableProps } from './TableInterface'


const Table: React.FC<tableProps> = ({ type, id, marked }) => {
  return (
    <div 
      key={id}
      onClick={marked} 
      className="
        flex 
        hover:cursor-pointer 
        items-center 
        justify-center 
        m-2 
        col-span-1 
        w-20 
        h-16 
        border-solid 
        rounded
        bg-slate-700"
      >
      {
        type == 'lin'
          ? <FaLinux size={40} className='hover:cursor-pointer' />
          : type == 'win'
            ? <FaWindows size={40} className='hover:cursor-pointer' />
            : <></>
      }
    </div>
  )
}


export default Table