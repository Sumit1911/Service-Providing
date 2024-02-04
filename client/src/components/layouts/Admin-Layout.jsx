import { NavLink, Outlet } from "react-router-dom"
import { FaUser, FaHome } from "react-icons/fa";
import { IoIosContact } from "react-icons/io";
import { MdMiscellaneousServices } from "react-icons/md";


export const AdminLayout = () => {
    return <>
      <header>
        <div className="container">
            <nav>
                <ul>
                    <li>
                        <NavLink to="/admin/users"><FaUser />users</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/contacts"><IoIosContact />contacts</NavLink>
                    </li>
                    <li>
                        <NavLink to="/service"><MdMiscellaneousServices />service</NavLink>
                    </li>
                    <li>
                        <NavLink to="/"><FaHome />Home</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
      </header>
      <Outlet />
    </>
}