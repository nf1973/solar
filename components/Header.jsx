import Link from "next/link";
import { ModeToggle } from "./utils/DarkModeSwitcher";

const Header = () => {
  return (
    <div className="flex items-center justify-between w-full">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-[#30AEBE]">
          Solar Analysis
        </h2>
        <p className="text-xs lg:text-sm italic text-[#30AEBE]">
          Harnessing Sunlight, Illuminating Insights
        </p>
      </div>
      <div className="flex items-center justify-end w-2/3 gap-8 font-semibold text-sm lg:text-base text-[#30AEBE] ">
        <ul className="hover:text-teal-400">
          <Link
            href="https://pvoutput.org/list.jsp?id=52326&sid=50829"
            target="_blank"
          >
            <span className="hidden md:inline">PVOutput</span>
          </Link>
        </ul>
        <ul className="hover:text-teal-400">
          <Link href="https://github.com/nf1973/solar" target="_blank">
            <span className="hidden md:inline">Github</span>
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
