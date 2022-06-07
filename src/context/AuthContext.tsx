
import { createContext, ReactNode, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import { api } from "../services/api";

type AuthProviderProps = {
  children: ReactNode;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | undefined;
  handleSignOut: () => void;
  handleSignIn: (values: HandleSignInProps) => Promise<void>;
  handleSignUp: (values: HandleSignUpProps) => Promise<void>;
}

type User = {
  name: string,
  username: string,
  email: string,
  accessToken: string,
}

interface HandleSignInProps {
  email: string,
  password: string,
}

interface HandleSignUpProps {
  name: string,
  username: string,
  email: string,
  password: string,
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
  const [cookies, setCookie, removeCookie] = useCookies(['minitwitter.token']);
  
  const [user, setUser] = useState<User | undefined>(undefined)
  const isAuthenticated = !!user;

  async function handleSignUp(values: HandleSignUpProps) {
    const response = await api.post('/signup', {
      name: values.name,
      username: values.username,
      email: values.email,
      password: values.password,
    })

    setUser(response.data)

    setCookie('minitwitter.token', response.data.accessToken, {
      path: '/',
    })
  }

  async function handleSignIn(values: HandleSignInProps) {
    const response = await api.get('/login', {
      auth: {
        username: values.email,
        password: values.password
      }
    })

    setUser(response.data)

    setCookie('minitwitter.token', response.data.accessToken, {
      path: '/',
    })
  }
  
  async function handleSignOut() {
    setUser(undefined)
    removeCookie('minitwitter.token')
    Navigate({
      to: '/signin',
    })
    
  }

  useEffect(() => {
    async function getUser() {
      await api.get('/me', {
        headers: {
          Authorization: `Bearer ${cookies['minitwitter.token']}`
        }
       }).then(response => {
          setUser(response.data)
        })
        .catch((err) => {
          handleSignOut()
        })
    }

    if(cookies) {
     getUser()
    }
  }, [])


  return (
    <AuthContext.Provider value={{ isAuthenticated, user, handleSignOut, handleSignIn, handleSignUp }}>
      {children}
    </AuthContext.Provider>
  )
}
