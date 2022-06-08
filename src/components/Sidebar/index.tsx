import { HomeIcon } from '@heroicons/react/solid'
import { HashtagIcon, BellIcon, InboxIcon, BookmarkIcon, ClipboardListIcon, UserIcon, DotsCircleHorizontalIcon } from '@heroicons/react/outline'
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

interface SidebarProps {
  name?: string;
  username?: string;
}

export function Sidebar({ name, username }: SidebarProps) {
  const [openPopover, setOpenPopover] = useState(false)
  const { handleSignOut } = useContext(AuthContext)
  return (
    <div className="flex sm:flex-col w-full lg:max-w-[275px] border-silver border-t sm:border-0 bg-richBlack z-30 sm:bg-transparent sm:max-w-[64px] lg:px-3 items-center fixed bottom-0 sm:relative space-y-2">
      <div className="sm:flex sm:flex-col sm:fixed sm:h-screen justify-between items-center sm:max-w-[64px] lg:max-w-[251px] w-full">
        <nav className="sm:space-y-2 sm:max-w-[64px] lg:max-w-[251px] w-full flex sm:flex-col justify-around items-center md:items-start">
          <button className="rounded-full hover:bg-white hover:bg-opacity-10 hidden sm:flex w-7 p-2 lg:p-3 box-content">
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="#fff" className="w-7 r-jwli3a r-4qtqp9 r-yyyyoo r-labphf r-1777fci r-dnmrzs r-494qqr r-bnwqim r-1plcrui r-lrvibr"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg>
          </button>
          <button className="flex gap-4 bg-transparent p-2 lg:py-3 lg:pl-2 lg:pr-6 rounded-full hover:bg-white hover:bg-opacity-10 items-center">
            <HomeIcon className="w-7"/>
            <span className="text-xl hidden lg:flex font-bold">Pagina Inicial</span>
          </button>
          <button className="flex gap-4 bg-transparent p-2 lg:py-3 lg:pl-2 lg:pr-6 rounded-full hover:bg-white hover:bg-opacity-10 items-center">
            <HashtagIcon className="w-7"/>
            <span className="text-xl hidden lg:flex">Explorar</span>
          </button>
          <button className="flex gap-4 bg-transparent p-2 lg:py-3 lg:pl-2 lg:pr-6 rounded-full hover:bg-white hover:bg-opacity-10 items-center">
            <BellIcon className="w-7"/>
            <span className="text-xl hidden lg:flex">Notificações</span>
          </button>
          <button className="flex gap-4 bg-transparent p-2 lg:py-3 lg:pl-2 lg:pr-6 rounded-full hover:bg-white hover:bg-opacity-10 items-center">
            <InboxIcon className="w-7"/>
            <span className="text-xl hidden lg:flex">Mensagens</span>
          </button>
          <button className="hidden sm:flex gap-4 bg-transparent p-2 lg:py-3 lg:pl-2 lg:pr-6 rounded-full hover:bg-white hover:bg-opacity-10 items-center">
            <BookmarkIcon className="w-7"/>
            <span className="text-xl hidden lg:flex">Itens salvos</span>
          </button>
          <button className="hidden sm:flex gap-4 bg-transparent p-2 lg:py-3 lg:pl-2 lg:pr-6 rounded-full hover:bg-white hover:bg-opacity-10 items-center">
            <ClipboardListIcon className="w-7"/>
            <span className="text-xl hidden lg:flex">Lista</span>
          </button>
          <button className="hidden sm:flex gap-4 bg-transparent p-2 lg:py-3 lg:pl-2 lg:pr-6 rounded-full hover:bg-white hover:bg-opacity-10 items-center">
            <UserIcon className="w-7"/>
            <span className="text-xl hidden lg:flex">Perfil</span>
          </button>
          <button className="hidden sm:flex gap-4 bg-transparent p-2 lg:py-3 lg:pl-2 lg:pr-6 rounded-full hover:bg-white hover:bg-opacity-10 items-center">
            <DotsCircleHorizontalIcon className="w-7"/>
            <span className="text-xl hidden lg:flex">Mais</span>
          </button>          
        </nav>

        <div className="flex flex-col w-full items-center">
          {openPopover && 
          <button 
            onClick={handleSignOut}
            className="hidden sm:flex w-14 lg:w-full p-2 lg:py-3 lg:p-3 mb-4 rounded-full bg-white bg-opacity-10 items-center justify-center font-bold"
          >
            Sair
          </button> 
          }

          <button 
            onClick={() => setOpenPopover(!openPopover)}
            className="hidden sm:flex w-14 lg:w-full bg-transparent p-2 lg:py-3 lg:p-3 mb-4 rounded-full hover:bg-white hover:bg-opacity-10 items-center"
          >
            <img src="/avatar.png" alt="Avatar User" className="w-10" />
            <div className="hidden lg:flex flex-col items-start lg:ml-2">
              <h3 className="text-md font-bold">{name}</h3>
              <p className="text-md">@{username}</p>
            </div>
            <p className="text-md font-bold justify-end hidden lg:flex lg:flex-1">...</p>
          </button>
        </div>
      </div>

    </div>

  )
}