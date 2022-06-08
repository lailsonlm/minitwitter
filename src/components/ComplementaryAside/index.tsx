import { SearchIcon } from '@heroicons/react/outline'

export function ComplementaryAside() {
  return (
    <div className="hidden md:flex flex-col w-full md:p-3 col-span-2 space-y-2 gap-3 bg-opacity:20 justify-self-end">
      <div className="flex flex-col w-full">
        <label className="bg-white pointer-events-auto bg-opacity-10 p-3 rounded-full flex w-full gap-3 focus-within:border-birdBlue  focus-within:bg-transparent focus-within:border"  htmlFor="search">
          <SearchIcon className="w-6 stroke-silver"/>
          <input 
            type="text" 
            id="search"
            placeholder="Buscar no Twitter"
            className="border-none outline-none flex w-full bg-transparent items-center text-md justify-center" />
        </label>
      </div>

      <div className="flex flex-col w-full p-3 gap-4 bg-white bg-opacity-10 rounded-xl">
        <h2 className="font-bold text-lg">O que está acontecendo</h2>
        <div>
          <h3 className="text-sm text-silver">Futebol • Esta tarde</h3>
          <p className="font-bold">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div>
          <h3 className="text-sm text-silver">Tecnologia • Assunto do Momento</h3>
          <p className="font-bold">ReactJS</p>
        </div>
        <div>
          <h3 className="text-sm text-silver">Entretenimento • Esta tarde</h3>
          <p className="font-bold">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div>
          <h3 className="text-sm text-silver">Política • Assunto do Momento</h3>
          <p className="font-bold">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        </div>

        <a href="#" className='text-birdBlue'>Mostrar mais</a>

      </div>

    </div>
  )
}