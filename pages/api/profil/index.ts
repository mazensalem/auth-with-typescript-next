import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

const Handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    res.send({
      content: "welcome to the profil",
    });
  } else {
    res.send({
      error: "you shuld sign in",
    });
  }
};

export default Handler;
