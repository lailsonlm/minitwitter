import { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ComplementaryAside } from "../components/ComplementaryAside";
import { Sidebar } from "../components/Sidebar";
import { Tweet } from "../components/Tweet";
import { TweetForm } from "../components/TweetForm";
import { AuthContext } from "../context/AuthContext";
import { api } from "../services/api";
import defaultTheme from 'tailwindcss/defaultTheme';

type TweetList = {
  id: string;
  text: string;
  userId: string;
  user: {
    name: string;
    username: string;
  }
}

export default function Home() {
  const { user, handleSignOut } = useContext(AuthContext)
  const [tweets, setTweets] = useState<TweetList[]>()
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) {
      navigate('/signin')
    }
  }, [user])

  async function getAllTweets() {
    await api.get('/tweets', {
      headers: {
        'authorization': `Bearer ${user?.accessToken}`
      }
    }).then((response) => {
      setTweets(response.data)
    })
    .catch((error) => {
      // if(error.response.status === 401) {
      //   handleSignOut()
      // }
    })
  }
  
  useEffect(() => {
    getAllTweets()
  }, [])

  return (
    <div className="flex justify-center md:px-4 lg:max-w-7xl m-auto relative">
      <Sidebar username={user?.username} name={user?.name} />
      <div className="grid grid-cols-1 md:grid-cols-5 relative justify-center gap-4 w-full h-full min-h-screen m-auto">
        <main className="border-x md:max-w-[600px] w-full md:col-span-3 border-silver mb-11 sm:mb-0">
          <TweetForm accessToken={user?.accessToken} getAllTweets={getAllTweets} />
          {tweets?.map((tweet) => {
            return (
            <Tweet key={tweet.id} name={tweet.user.name} username={tweet.user.username} avatar="/avatar.png">
              {tweet.text}
            </Tweet>
            )
          })}
        </main>
        <ComplementaryAside />
      </div>
    </div>
  )
}