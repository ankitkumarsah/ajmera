import { Navigate, Outlet } from "react-router-dom"
import Sidebar from "./Sidebar";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";



const Layout = () => {
  const [ipAddress, setIPAddress] = useState('')
  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setIPAddress(data.ip))
      .catch(error => console.log(error))
  }, []);

  const token = window.localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/" replace />
  }

  const platform = window.navigator.platform;

  return (
    <>
      <div className="flex h-screen bg-gray-50" >
        <aside className="relative z-20 hidden w-64 overflow-y-auto bg-gray-800 md:block flex-shrink-0" >
          <div className="py-4 text-gray-500 dark:text-gray-400">
            <div className="mx-auto">

              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv0Bf6-6wIgX5qKKIffjo1bl3KqaGXb5u0wA&usqp=CAU" alt="logo" className="rounded ml-6" style={{ width: '200px', height: '60px' }} />
            </div>
            <Sidebar />
            <div className="px-6 my-4 absolute bottom-0">
              <button
                className="flex items-center justify-between w-full px-6 py-2 text-xs font-medium leading-5 text-white  bg-purple-600 border border-transparent rounded"
              >
                Platform : {platform}
                <br></br>
                IP:{ipAddress}
              </button>
            </div>
          </div>
        </aside>

        <div className="flex flex-col flex-1 w-full">
          <header className="z-10 py-4 bg-gray-800 shadow-md ">
            <div className="container flex items-center justify-between h-full px-6 mx-auto"
            >
              <div className="flex justify-center w-60">

              </div>

              <ul className="flex items-center flex-shrink-0 space-x-6">
                <li className="relative">
                  <button className="align-middle rounded px-3 py-1 bg-teal-500 text-white" onClick={() => {
                    window.localStorage.removeItem("token");
                    return window.location.replace('/');
                  }}>
                    Logout
                  </button>

                </li>
              </ul>
            </div>
          </header>
          <main className="h-full overflow-y-auto">
            <Outlet />
          </main>
        </div>
        <ToastContainer />
      </div>

    </>
  )
}

export default Layout