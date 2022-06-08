import { FormEvent, useContext } from "react"
import { useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { api } from "../../services/api";

interface TweetFormProps {
  accessToken: string | undefined;
  getAllTweets: () => Promise<void>;
}

export function TweetForm({ accessToken, getAllTweets }: TweetFormProps) {
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { handleSignOut } = useContext(AuthContext)
  const [openPopover, setOpenPopover] = useState(false)
  const max_tweet_char = 250

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    await api.post('/tweets', {
      text: message
    }, {
      headers: {
        'authorization': `Bearer ${accessToken}`
      }
    }).then(() => {
      setMessage('')
      getAllTweets()
    })
    .catch((error) => {
      // if(error.response.status === 401) {
      //   handleSignOut()
      // }
      // console.log(error)
    })
    .finally(() => setIsSubmitting(false))
  }

  return (
    <div className="border-b border-silver p-4 space-y-6">
      <div className="flex space-x-5 sm:space-x-0 items-center">
        <div className="flex flex-col relative items-center">
          <button
            onClick={() => setOpenPopover(!openPopover)}
          >
            <img src="/avatar.png" alt="Avatar User" className="w-7 sm:hidden" />
          </button>

          {openPopover && 
          <button 
            onClick={handleSignOut}
            className="flex absolute z-40 top-8 sm:hidden w-16 p-2 rounded-full bg-birdBlue items-center justify-center font-bold"
          >
            Sair
          </button> 
          }
        </div>
        <h1 className="font-bold text-xl">Pagina inicial</h1>
      </div>

      <form className="text-lg flex flex-col" onSubmit={handleSubmit}>
        <div className="flex sm:space-x-5 mb-4 items-center justify-center">
          <img src="/avatar.png" alt="Avatar User" className="w-12 h-12 hidden sm:flex" />
          <textarea 
            name="message" 
            className="bg-transparent outline-none resize-none w-full" 
            placeholder="O que está acontecendo?" 
            onChange={e => setMessage(e.target.value)}
            value={message}
            maxLength={max_tweet_char}
          />
        </div>
        <div className="flex justify-end items-center space-x-3">
          <span className="text-sm">
            <span>{message.length}</span> / <span className="text-birdBlue">{max_tweet_char}</span>
          </span>
          <button 
            type="submit"
            className="bg-birdBlue px-3 py-1 sm:px-5 sm:py-2 rounded-full disabled:opacity-50"
            disabled={!message.length || isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Tweetar'}
          </button>
        </div>
      </form>
    </div>
  )
}