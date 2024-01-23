import { useState } from "react";
import { NavLink } from "react-router-dom";
import routesDisplay from "../routes/routes";

const AdminSidebar = () => {
  return (
    <>
      <ul className="mt-6">
        {routesDisplay.map((items: any, index: any) => <SidebarItems key={index} items={items} role={'user'} />)}
      </ul>
    </>
  )
}

const SidebarItems = ({ items, role }: any) => {
  const allowedRoles = items.role ? items.role : [];
  const [open, setOpen] = useState(false)
  return (
    <>
      {
        // for submenu
        items.child ? <>
          {allowedRoles.includes(role) ? <>
            <li className="relative px-6 py-2" onClick={() => setOpen(!open)}>
              <button className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                <span className="inline-flex items-center">
                  {items.icon}
                  <span className="ml-3">{items.displayText}</span>
                </span>
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <>
                {allowedRoles.includes(role) ?
                  <div className={open ? "" : "hidden "} >
                    <ul className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900">
                      {items.child.map((data: any, index: any) =>
                        <li className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                          <NavLink to={`${data.path}`} key={index} className="w-full flex" >
                            {data.displayText}
                          </NavLink>
                        </li>

                      )}
                    </ul>
                  </div> : null}
              </>
            </li>
          </> : null}
        </> :
          //for single menu without child
          <>
            {
              //role checking
              allowedRoles.includes(role) ?
                <>
                  < li className="relative px-6 py-2">
                    <NavLink to={`${items.path}`} className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                      {items.icon}
                      <span className="ml-3">{items.displayText}</span>
                    </NavLink>
                  </li>
                </> : null
            }
          </>
      }
    </>
  );
}

export default AdminSidebar