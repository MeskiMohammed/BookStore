import Header from './header.jsx';
import Footer from './footer.jsx';

export default function App(props) {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
}
