import { HeartIcon } from '@heroicons/react/outline'

interface TweetProps {
  name: string;
  username: string;
  avatar: string;
  children: string;
}

export function Tweet({ name, username, avatar, children }: TweetProps) {
  return (
    <div className="flex space-x-3 p-4 border-b border-silver">
      <div>
        <img src={avatar} alt="Avatar Usuário" />
      </div>
      <div className="">
        <span className="font-bold text-sm">{name}</span>{' '}
        <span className="text-sm text-silver">{username}</span>

        <p>{children}</p>

        <div className="flex space-x-1 text-silver text-sm items-center" >
          <HeartIcon className="w-6 stroke-1" />
          <span>1.2k</span>
        </div>
      </div>
    </div>
  )
}