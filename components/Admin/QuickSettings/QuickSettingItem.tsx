import { PencilAltIcon } from "@heroicons/react/outline";
import Link from "next/link";

export const QuickSettingItem = (props: {
  icon: React.ReactElement;
  text: string;
  href: string;
}) => (
  <Link href={props.href}>
    <div
      className={`w-10 h-10 p-2 bg-zinc-900 rounded-full hover:bg-zinc-700 cursor-pointer group relative`}
    >
      {props.icon}
      <span
        className={`absolute top-1/2 left-0 -translate-x-[calc(100%+1rem)] group-hover:scale-100 scale-0 w-max text-sm text-gray-200 px-3 py-2 bg-zinc-900 -translate-y-1/2 transition-all origin-right rounded-md`}
      >
        {props.text}
      </span>
    </div>
  </Link>
);
