import AuthPanel from "./AuthPanel";

const NavBar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Note Manager</a>
      </div>
      <div className="flex-none">
        <AuthPanel />
      </div>
    </div>
  );
};

export default NavBar;
