import { FormEvent, useContext } from "react"
import { useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { api } from "../../services/api";

interface TweetFormProps {
  accessToken: string | undefined;
  username: string | undefined;
  getAllTweets: () => Promise<void>;
}

export function TweetForm({ accessToken, getAllTweets, username }: TweetFormProps) {
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { handleSignOut } = useContext(AuthContext)
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
    <div className="border-b border-silver p-4 space-y-6 flex-1">
      <div className="flex space-x-5">
        <img src="/avatar.png" alt="Avatar User" className="w-7" />
        <h1 className="font-bold text-xl">{username}</h1>
      </div>

      <form className="pl-12 text-lg flex flex-col" onSubmit={handleSubmit}>
        <textarea 
          name="message" 
          className="bg-transparent outline-none" 
          placeholder="O que está acontecendo?" 
          onChange={e => setMessage(e.target.value)}
          value={message}
          maxLength={max_tweet_char}
        />
        <div className="flex justify-end items-center space-x-3">
          <span className="text-sm">
            <span>{message.length}</span> / <span className="text-birdBlue">{max_tweet_char}</span>
          </span>
          <button 
            type="submit"
            className="bg-birdBlue px-5 py-2 rounded-full disabled:opacity-50"
            disabled={!message.length || isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Tweetar'}
          </button>
        </div>
      </form>
    </div>
  )
}