import { useEffect, useState } from "react";
import { useSession } from "next-auth/client";

export default function App() {
  const [session, loading] = useSession();
  const [content, setcontent] = useState("");
  useEffect(() => {
    const fetchD = async () => {
      const res = await fetch("/api/profil");
      const json = await res.json();
      if (json.content) {
        setcontent("wellcome back");
      } else {
        setcontent("you should login");
      }
    };
    fetchD();
  }, [session]);
  if (typeof window !== "undefined" && loading) return null;
  return <>{content}</>;
}
