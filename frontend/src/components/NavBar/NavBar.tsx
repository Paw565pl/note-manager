import LogoutButton from "./LogoutButton";

const NavBar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Note Manager</a>
      </div>
      <div className="flex-none">
        <LogoutButton />
      </div>
    </div>
  );
};

export default NavBar;
