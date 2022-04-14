import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useLayoutEffect, useState } from "react";
import { AtSymbolIcon, ExclamationIcon, HashtagIcon, KeyIcon } from "@heroicons/react/outline";
const AdminPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  useLayoutEffect(() => {
    localStorage.getItem("token") && router.push("/admin/dashboard");
  }, []);
  return (
    <>
      <div
        className={`w-full h-full opacity-100 relative`}
        // style={{
        //   backgroundColor: `hsla(0,100%,80%,1)`,
        //   backgroundImage: `
        // radial-gradient(at 66% 18%, hsla(343,73%,63%,1) 0px, transparent 50%),
        // radial-gradient(at 43% 59%, hsla(322,92%,71%,1) 0px, transparent 50%),
        // radial-gradient(at 2% 55%, hsla(258,80%,77%,1) 0px, transparent 50%),
        // radial-gradient(at 90% 14%, hsla(223,94%,77%,1) 0px, transparent 50%),
        // radial-gradient(at 20% 38%, hsla(64,85%,62%,1) 0px, transparent 50%),
        // radial-gradient(at 41% 5%, hsla(187,61%,76%,1) 0px, transparent 50%),
        // radial-gradient(at 82% 15%, hsla(203,60%,60%,1) 0px, transparent 50%)`,
        // }}
      >
        <img
          src="https://cdn.discordapp.com/attachments/809957704738406400/920876677104562197/IMG_8294.jpg"
          alt=""
          className={`w-full h-full object-cover`}
        />
      </div>
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45ch] bg-white rounded-none flex flex-col gap-12 p-8 items-center font-body`}
      >
        <div className={`flex flex-col gap-4`}>
          <div
            className={`flex flex-row items-center justify-center max-h-32 overflow-hidden `}
          >
            <div className={`w-24 h-auto min-h-[123px] relative`}>
              <Image
                src="/images/paley.png"
                className="object-fill"
                layout={`fill`}
              />
            </div>
          </div>

          {/* <span className={`text-3xl font-bold font-display`}>Login</span> */}
        </div>
        {error && (
          <div className={`w-full p-2 border-2 border-rose-900/80 flex flex-row gap-3`}>
            <ExclamationIcon className={`w-6 h-6 text-rose-900`} />
            <span className={`text-rose-900`}>Invalid email or password.</span>
          </div>
        )}
        <div
          className={`flex flex-col gap-4 w-full text-gray-700 placeholder:text-gray-400`}
        >
          <div className={`relative w-full`}>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className={`outline-none p-2 pl-12 w-full border-2 border-gray-300 focus:border-rose-600 transition-all bg-transparent placeholder:text-gray-400/80 caret-rose-600`}
            />
            <div
              className={`absolute p-0.5 ml-3 h-full top-1/2 -translate-y-1/2 left-0 w-6 pointer-events-none`}
            >
              <AtSymbolIcon className={`h-full w-full text-gray-300`} />
            </div>
          </div>
          <div className={`relative w-full`}>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className={`outline-none p-2 pl-12 w-full border-2 border-gray-300 focus:border-rose-600 transition-all bg-transparent placeholder:text-gray-400/80 caret-rose-600`}
            />
            <div
              className={`absolute p-0.5 ml-3 h-full top-1/2 -translate-y-1/2 left-0 w-6 pointer-events-none`}
            >
              <KeyIcon className={`h-full w-full text-gray-300`} />
            </div>
          </div>
        </div>
        <div className={`flex flex-col gap-4`}>
          <button
            className={`w-full border-2 border-rose-500 hover:bg-rose-600 text-rose-600 hover:text-white transition-all font-bold py-2 px-4 rounded-none focus:outline-none cursor-pointer `}
            onClick={async () => {
              setDisabled(true);
              const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email,
                  password,
                }),
              });
              if (res.ok) {
                const data = await res.text();
                localStorage.setItem("token", `Bearer ${data}` as string);
                router.push("/admin/dashboard");
              }else{
                setError(true);
              }
              setDisabled(false);
            }}
            disabled={disabled}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
