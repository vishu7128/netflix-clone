import Nav from "../components/Nav";
import "./ErrorPage.css";

function ErrorPage() {
  return (
    <>
      <Nav></Nav>
      <div className="errorPage">
        <p>404 Not Found</p>
      </div>
    </>
  );
}

export default ErrorPage;
