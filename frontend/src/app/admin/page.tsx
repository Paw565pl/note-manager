import { auth, checkIsAdmin } from "@/auth";
import { signIn } from "next-auth/react";

const AdminPage = async () => {
  const session = await auth();
  if (!session) return signIn();

  const isAdmin = checkIsAdmin(session);
  if (!isAdmin)
    return (
      <p className="text-error">
        Forbbiden! You do not have permissions to be here. This page requires
        admin role.
      </p>
    );

  return <div>AdminPage</div>;
};

export default AdminPage;
