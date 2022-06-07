import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from 'yup'
import { InputLogin } from "../components/InputLogin";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const validationSchema = yup.object({
  email: yup.string().email('Digite um e-email válido!').required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório'),
})

export default function SignIn() {
  const { user, handleSignIn } = useContext(AuthContext)
  const navigate = useNavigate();

  const formik = useFormik({
    onSubmit: async values => {
      try {
        await handleSignIn(values)
      } catch (error) {
        formik.setStatus('Usuário ou senha inválido!')
      }
    },
    validationSchema,
    validateOnMount: true,
    initialValues: {
      email: '',
      password: '',
    }
  })

  useEffect(() => {
    if(user) {
      navigate('/')
    }
  }, [user])

  return (
    <div className="h-full flex justify-center">
      <div className="bg-birdBlue lg:flex-1 bg-[url('/bg_login.png')] bg-cover bg-center items-center justify-center lg:flex">
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="#fff" className="w-96 hidden lg:flex r-jwli3a r-4qtqp9 r-yyyyoo r-labphf r-1777fci r-dnmrzs r-494qqr r-bnwqim r-1plcrui r-lrvibr"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg>
      </div>
      <div className="flex h-full flex-1 flex-col justify-center items-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold">Acesse sua conta</h1>

        <form onSubmit={formik.handleSubmit} className="space-y-6 px-4 sm:px-2 max-w-lg w-full">
          {formik.status && <p className="text-red-500 text-sm text-center">{formik.status}</p>}
          <div className="space-y-2">
            <InputLogin 
              name="email" 
              type="email" 
              placeholder="Digite seu e-mail" 
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
            />
            {formik.touched.email && formik.errors.email && <p className="text-red-500 text-sm">{formik.errors.email}</p> }
          </div>
          <div className="space-y-2">
            <InputLogin 
              name="password" 
              type="password" 
              placeholder="Digite sua senha" 
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
            />
            {formik.touched.password && formik.errors.password && <p className="text-red-500 text-sm">{formik.errors.password}</p> }
          </div>
          <button 
            type="submit" 
            className="w-full bg-birdBlue py-4 rounded-full disabled:opacity-50 text-lg"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Entrando...' : 'Entrar'} 
          </button>
        </form>

        <span className="text-sm text-silver">
          Não tem conta? <Link to='/signup' className="text-birdBlue">Inscreva-se</Link>
        </span>
      </div>
    </div>
  )
}