import "../src/css/global.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import AuthProvider from "../src/contexts/auth.context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="App">
      <AuthProvider>
        <Toaster />
        <Component {...pageProps} />
      </AuthProvider>
    </div>
  );
}

export default MyApp;
