import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import Icon from "../components/Icon";

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found | Sakshionmi Group" description="The page you were looking for could not be found." path="/404" />
      <section className="flex min-h-[70vh] items-center justify-center bg-navy-gradient px-5 text-white">
        <div className="text-center">
          <div className="font-display text-7xl font-extrabold text-brand-orange sm:text-9xl">404</div>
          <h1 className="mt-4 font-display text-2xl font-bold sm:text-3xl">Page Not Found</h1>
          <p className="mx-auto mt-3 max-w-md text-white/70">
            The page you were looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn-accent mt-7 inline-flex">
            <Icon name="home" className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}
