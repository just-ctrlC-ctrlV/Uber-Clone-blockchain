import { UberProvider } from "@/context/UberContext.js";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <UberProvider>
      <Component {...pageProps} />
    </UberProvider>
  );
}
