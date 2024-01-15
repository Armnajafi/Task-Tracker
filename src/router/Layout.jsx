import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
            <Link to="/task">Task</Link>
            <Link to="/api">Api</Link>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
