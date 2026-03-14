import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Backlink = ({ href }: { href: string }) => {
  return (
    <Link to={href} className="back-link">
      <ChevronLeft />
      Back
    </Link>
  );
};

export default Backlink;
