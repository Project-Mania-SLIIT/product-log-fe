import Link from "next/link";
import { TbTriangleInvertedFilled as TriangleIcon } from "react-icons/tb";

const Navbar = () => {
  return (
    <nav className="flex select-none items-center justify-between pb-2 pt-4">
      <Link href="/" className="invisible">
        <img
          alt="Logo"
          className="w-32 object-contain"
          src="https://code94labs.com/wp-content/uploads/2022/09/cropped-Code94-Labs.webp"
        />
      </Link>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 font-semibold uppercase">
          Admin <TriangleIcon className="size-4" />
        </div>
        <div>
          <img
            alt="user"
            src="https://github.com/aroshakalanka.png"
            className="size-8 rounded-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
