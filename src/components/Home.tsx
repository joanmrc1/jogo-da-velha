import { useState, useCallback, useEffect, useRef } from 'react'
import { FaLinux, FaWindows } from 'react-icons/fa'
import { tableProps } from './TableInterface'
import { toast } from 'react-toastify'
import matrizJson from '../data/matrizJson'
import Table from './Table'
import SelectIcon from './SelectIcon'

const Home = () => {
  const [matriz, setMatriz] = useState([...matrizJson])
  const [iconSelected, setIconSelected] = useState('')
  const [nextPlay, setNextPlay] = useState('')
  const [gameOver, setGameOver] = useState(false)
  const isMountedRef = useRef(false);

  const marked = useCallback((data: tableProps) => {
    if (gameOver || iconSelected == '')  return

    let matrizUpdate = matriz;

    matrizUpdate.map((a: any) => a.map((b: any) => {
      (b.id == data.id && b.type === null) ? b.type = nextPlay : ''
    }))

    setMatriz([...matrizUpdate])

    setNextPlay(nextPlay === 'lin' ? 'win' : 'lin')
    
    verifyWinGame()

  }, [matriz, nextPlay, iconSelected, setMatriz, setNextPlay])

  const selected = useCallback((data: string) => {
    setIconSelected(data)
    setNextPlay(data)
  }, [setIconSelected])

  const verifyWinGame = () => {
    let isGameOver = false;

    matriz.map((data: any, indexLinha: number) => {
      if (matriz[indexLinha][0].type === matriz[indexLinha][1].type && matriz[indexLinha][1].type === matriz[indexLinha][2].type && matriz[indexLinha][0].type !== null) {
        isGameOver = true
      }

      if (matriz[0][indexLinha].type === matriz[1][indexLinha].type && matriz[1][indexLinha].type === matriz[2][indexLinha].type && matriz[0][indexLinha].type !== null) {
        isGameOver = true
      }

      if (!isGameOver) {
        if (matriz[0][2].type === matriz[1][1].type && matriz[1][1].type === matriz[2][0].type && matriz[0][2].type !== null) {
          isGameOver = true
        }

        if (matriz[0][0].type === matriz[1][1].type && matriz[1][1].type === matriz[2][2].type && matriz[0][0].type !== null) {
          isGameOver = true
        }
      }
    })

    if (isGameOver) setGameOver(isGameOver)
  }

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true
      if(!sessionStorage.getItem('matrizJson'))
        sessionStorage.setItem('matrizJson', JSON.stringify(matrizJson))
    }

    if (gameOver) {
      toast("Fim de jogo!!")
      setMatriz(JSON.parse(sessionStorage.getItem('matrizJson') || ''))
      setGameOver(false)
      setNextPlay('')
      setIconSelected('')
    }
  },[gameOver])

  return (
    <div className="flex flex-col items-center mx-auto">
      <h1 className="text-4xl font-mono text-center p-4 m-5">
        Jogo da Velha
      </h1>

      <div className="w-80 m-0">
        <div className="grid grid-cols-3 justify-items-center">
          {
            matriz.map((array: any) => array.map((data: tableProps) =>
              <Table marked={() => marked(data)} id={data.id} type={data.type} key={data.id} />
            ))
          }
        </div>

        {
          iconSelected === '' && (
            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-mono text-center p-2 m-2">Selecione seu icone</h1>
              <div className="flex justify-center p-2">
                <SelectIcon
                  label='lin'
                  iconName='lin'
                  icon={<FaLinux size={40} className="m-2" />}
                  selected={selected}
                />

                <SelectIcon
                  label='win'
                  iconName='win'
                  icon={<FaWindows size={40} className="m-2" />}
                  selected={selected}
                />
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Home;
