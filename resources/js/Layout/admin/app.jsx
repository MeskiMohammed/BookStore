import NavBar from './navbar.jsx';
import SideBar from './sidebar.jsx';
import Footer from './footer.jsx';

export default function App(props) {
  return (
    <>
      <NavBar />
      <SideBar />
      <div class='p-4 sm:ml-64 mt-14 overflow-y-auto h-[calc(100dvh-0.25rem*14)]'>
        <main>{props.children}</main>
        <footer />
      </div>
    </>
  );
}
