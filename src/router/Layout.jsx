import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
            <Link to="/task">Task</Link>
            <Link to="/api">Api</Link>
      </nav>
      
      <div className="text-center">
        <div className="box text-center">
          <Outlet />
        </div>
      </div>
    </>
  )
};

export default Layout;
