import AuthUserProvider from "../contexts/AuthUserProvider";
import Layout from "../components/templates/default/Layout";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthUserProvider>
  );
}

export default App;
