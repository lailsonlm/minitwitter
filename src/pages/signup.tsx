import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from 'yup'
import { InputLogin } from "../components/InputLogin";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const validationSchema = yup.object({
  name: yup.string().required('Campo obrigatório'),
  username: yup.string().required('Campo obrigatório'),
  email: yup.string().email('Digite um e-email válido!').required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório'),
})

export default function SignUp() {
  const { user, handleSignUp } = useContext(AuthContext)
  const navigate = useNavigate();

  const formik = useFormik({
    onSubmit: async values => {
      try {
        await handleSignUp(values)
      } catch (error: any) {
        console.log(error)
        if(error.response.status === 422) {
          formik.setStatus(error.response.data)
        } else {
          formik.setStatus('Erro ao realizar o cadastro, tente novamente!')
        }
      }
    },
    validationSchema,
    validateOnMount: true,
    initialValues: {
      name: '',
      username: '',
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
    <div className="flex h-full flex-col justify-center items-center space-y-6">
      <h1 className="text-4xl sm:text-5xl font-bold">Crie sua conta</h1>

      <form onSubmit={formik.handleSubmit} className="space-y-6 px-2 max-w-lg w-full">
        {formik.status && <p className="text-red-500 text-sm text-center">{formik.status}</p>}
        <div className="space-y-2">
          <InputLogin 
            name="name" 
            type="text" 
            placeholder="Nome" 
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
          />
          {formik.touched.name && formik.errors.name && <p className="text-red-500 text-sm">{formik.errors.name}</p> }
        </div>

        <div className="space-y-2">
          <InputLogin 
            name="username" 
            type="text" 
            placeholder="Nome de usuário" 
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
          />
          {formik.touched.username && formik.errors.username && <p className="text-red-500 text-sm">{formik.errors.username}</p> }
        </div>

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
          {formik.isSubmitting ? 'Cadastrando...' : 'Cadastrar'} 
        </button>
      </form>

      <span className="text-sm text-silver">
        Já tem uma conta? <Link to='/signin' className="text-birdBlue">Acesse!</Link>
      </span>
    </div>
  )
}