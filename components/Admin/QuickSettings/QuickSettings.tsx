import { CogIcon, PencilAltIcon, PencilIcon, PlusIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useUserInfo } from "../../../utils/hooks/useUserInfo";
import { QuickSettingItem } from "./QuickSettingItem";

export const QuickSettings = () => {
  const userInfo = useUserInfo();
  const router = useRouter();
  console.log(userInfo);
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`fixed bottom-0 right-0`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className={`w-12 h-12 relative m-3`}>
        <div
          className={`absolute w-full h-full bg-rose-600 shadow shadow-rose-900 z-10 rounded-full ${
            userInfo ? `scale-100` : `scale-0 pointer-events-none`
          } transition-all peer ${
            open && `rotate-45`
          } flex flex-row items-center justify-center cursor-pointer`}
          onClick={() => setOpen(!open)}
        >
          <PlusIcon className={`w-6 h-6 text-white`} />
        </div>
        <div
          className={`top-0 w-12 -translate-y-full pb-4 h-min flex flex-col origin-bottom ${
            !open && `scale-0`
          } items-center transition-all gap-2`}
        >
          {router.query.post && (
            <QuickSettingItem
              icon={<PencilIcon className={`w-full h-full text-white`} />}
              text="Edit Post"
              href={`/admin/editPost?id=${router.query.post}`}
            />
          )}
          <QuickSettingItem
            icon={<PencilAltIcon className={`w-full h-full text-white`} />}
            text="Create Post"
            href="/admin/createPost"
          />
          <QuickSettingItem
            icon={<CogIcon className={`w-full h-full text-white`} />}
            text="Admin Panel"
            href="/admin/"
          />
        </div>
      </div>
    </div>
  );
};
