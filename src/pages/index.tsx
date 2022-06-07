import { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Tweet } from "../components/Tweet";
import { TweetForm } from "../components/TweetForm";
import { AuthContext } from "../context/AuthContext";
import { api } from "../services/api";

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
    <div className="grid grid-cols-3 place-self-end">
      <Sidebar />
      <main>
        <TweetForm accessToken={user?.accessToken} getAllTweets={getAllTweets} username={user?.username} />
        {tweets?.map((tweet) => {
          return (
          <Tweet key={tweet.id} name={tweet.user.name} username={tweet.user.username} avatar="/avatar.png">
            {tweet.text}
          </Tweet>
          )
        })}
      </main>
    </div>
  )
}