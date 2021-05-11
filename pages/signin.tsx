import { NextPageContext } from "next";
import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
} from "next-auth/client";
import { AppProviders } from "next-auth/providers";

interface Props {
  providers: AppProviders;
  csrfToken: string;
}

export default function SignIn({ providers, csrfToken }: Props) {
  return (
    <>
      <div>
        <h1>Log in page in custem</h1>
        <div>
          <form method="POST" action="/api/auth/signin/email">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <label htmlFor="email">Enter email</label>
            <input type="text" id="email" name="email" />
            <input type="submit" />
          </form>
        </div>
        <div>
          {Object.values(providers).map((provider) => {
            if (provider.name === "Email") {
              return;
            }
            return (
              <div key={provider.name}>
                <button
                  onClick={() => {
                    signIn(provider.id);
                  }}
                >
                  Sign in with {provider.name}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

SignIn.getInitialProps = async (context: NextPageContext) => {
  const { req, res } = context;
  const session = await getSession({ req });
  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return;
  }

  return {
    session: undefined,
    providers: await getProviders(),
    csrfToken: await getCsrfToken(context),
  };
};
