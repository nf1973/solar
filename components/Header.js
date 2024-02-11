import Link from "next/link";
import { ModeToggle } from "./utils/DarkModeSwitcher";

const Header = () => {
  return (
    <div className="flex items-center justify-between w-full">
      <div>
        <h2 className="text-3xl font-bold text-teal-600">Solar Analysis</h2>
        <p className="text-sm italic text-teal-600">
          Harnessing Sunlight, Illuminating Insights
        </p>
      </div>
      <div className="flex items-center justify-end w-2/3 gap-6 font-semibold text-teal-600 ">
        <ul className="hover:text-teal-400">
          <Link
            href="https://pvoutput.org/list.jsp?id=52326&sid=50829"
            target="_blank"
          >
            PVOutput
          </Link>
        </ul>
        <ul className="hover:text-teal-400">
          <Link href="https://github.com/nf1973/solar" target="_blank">
            GitHub
          </Link>
        </ul>
        <ul className="hover:text-teal-400">
          <ModeToggle />
        </ul>
      </div>
    </div>
  );
};

export default Header;
