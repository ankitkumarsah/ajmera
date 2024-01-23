import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { request } from "../api/requests";

const Login = () => {
  type Input = {
    email: string;
    password: string;
  }
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<Input>();
  const onSubmit: any = async (jsonData: any, e: any) => {
    e.preventDefault();
    const res = await request.post({ url: '/user/login', jsonData });
    if (res.success) {
      window.localStorage.removeItem("token");
      window.localStorage.setItem('token', res.data.accessToken)
      navigate('/dashboard', { replace: true });
    }

  };

  return (
    <>
      <div className="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0 bg-indigo-400" >
        <header className="max-w-lg mx-auto">
        </header>
        <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
          <section>
            <h3 className="font-bold text-2xl">Welcome to AdminPanel</h3>
            <p className="text-gray-600 pt-2">Sign in to your account.</p>
          </section>

          <section className="mt-10">
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6 pt-3 rounded bg-gray-200">
                <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" >Email</label>
                <input type="text" className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                  {...register("email", {
                    required: {
                      value: true,
                      message: 'Email is required!'
                    }
                  })} />

              </div>
              <p className='text-red-500 text-sm mt-1' >{errors.email?.message}</p>
              <div className="mb-6 pt-3 rounded bg-gray-200">
                <label className="block text-gray-700 text-sm font-bold mb-2 ml-3">Password</label>
                <input {...register("password", {
                  required: {
                    value: true,
                    message: 'Password is required!'
                  }
                })}
                  type="password" className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" />

              </div>
              <p className='text-red-500 text-sm mt-1' >{errors.password?.message}</p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Sign In</button>
            </form>
          </section>
          <ToastContainer />
        </main>
      </div>
    </>
  )
}

export default Login