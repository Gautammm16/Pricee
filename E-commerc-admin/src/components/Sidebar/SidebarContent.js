import React from 'react'
import routes from '../../routes/sidebar'
import { NavLink, Route } from 'react-router-dom'
import * as Icons from '../../icons'
import SidebarSubmenu from './SidebarSubmenu'
import { Button } from '@windmill/react-ui'
import {AiOutlineShoppingCart} from "react-icons/ai"
import {AiOutlineHome} from "react-icons/ai"
import {RiProductHuntLine} from "react-icons/ri"
import {FaHospitalUser} from "react-icons/fa"
import Logo from "../../assets/img/logo.png"

function Icon({ icon, ...props }) {
  const Icon = Icons[icon]
  return <Icon {...props} />
}

function SidebarContent() {
  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <NavLink  to="/app/sales" className="" >
      <img src={Logo} className="w-32 object-cover fixed  " style={{top:-30}}/>
      </NavLink>
      <ul className="mt-12">
        {routes.map((route) =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            <li className="relative px-6 py-3" key={route.name}>
              <NavLink
                exact
                to={route.path}
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                activeClassName="text-gray-800 dark:text-gray-100"
              >
                <Route path={route.path} exact={route.exact}>
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                    aria-hidden="true"
                  ></span>
                </Route>
                <p className='w-5 h-5' aria-hidden = "true">{route.icon}</p>
                {/* <Icon className="w-5 h-5" aria-hidden="true" icon= /> */}
                <span className="ml-4">{route.name}</span>
              </NavLink>
            </li>
          )
        )}
      </ul>
      <div className="px-6 my-6">
        {/* <Button>
          Create account
          <span className="ml-2" aria-hidden="true">
            +
          </span>
        </Button> */}
      </div>
    </div>
  )
}

export default SidebarContent
