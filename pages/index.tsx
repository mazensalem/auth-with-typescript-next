import { useSession, signIn, signOut } from "next-auth/client";
interface User {
  name: string;
  email: string;
  image: string;
}

export default function Home() {
  const [session, loading] = useSession();
  if (loading) {
    return <>Loading...</>;
  }
  return (
    <>
      {session ? (
        <>
          Sign in as {(session.user as User).email}
          <button
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          not sign in{" "}
          <button
            onClick={() => {
              signIn();
            }}
          >
            Sign in
          </button>
        </>
      )}
    </>
  );
}
