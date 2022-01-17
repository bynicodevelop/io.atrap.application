import AuthenticationComponent from "../components/AuthenticationComponent";
import Layout from "../components/templates/default/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthenticationComponent>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthenticationComponent>
  );
}

export default MyApp;
