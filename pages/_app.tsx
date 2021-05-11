import { Provider } from "next-auth/client";

interface Props {
  Component: any;
  pageProps: any;
}

export default function MyApp({ Component, pageProps }: Props) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}
