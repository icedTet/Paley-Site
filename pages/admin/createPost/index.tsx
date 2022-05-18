import { TagIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { createRef, useEffect, useRef, useState } from "react";
import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style
import dynamic from "next/dynamic";
import { observe } from "../../../utils/nprogress";
const Editor = dynamic(
  () => import("../../../components/Utils/MarkdownEditor"),
  { ssr: false }
);
export const CreatePostPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const editor = createRef();
  useEffect(() => {
    console.log(editor.current, "e");
  }, [editor.current]);
  return (
    <div className={`w-full h-full relative`}>
      <div
        className={`w-full h-full opacity-30 absolute top-0 left-0`}
        style={{
          backgroundColor: `hsla(0,100%,50%,1)`,
          backgroundImage: `radial-gradient(at 40% 20%, hsla(28,100%,74%,1) 0px, transparent 50%),
          radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%),
          radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%),
          radial-gradient(at 80% 50%, hsla(340,100%,76%,1) 0px, transparent 50%),
          radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 50%),
          radial-gradient(at 80% 100%, hsla(242,100%,70%,1) 0px, transparent 50%),
          radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0px, transparent 50%)`,
        }}
      />
      <div
        className={`absolute top-0 left-0 pt-16 overflow-auto flex flex-row justify-center w-full h-full`}
      >
        <div
          className={`max-w-prose w-full h-min p-8 bg-white flex flex-col gap-8`}
        >
          <h1 className={`text-3xl font-bold font-display`}>Create Post</h1>
          <form
            className={`w-full max-w-prose flex flex-col gap-4`}
            onSubmit={(e) => {
              e.preventDefault();
              // router.push(`/admin/dashboard`);
              observe(async () => {
                await fetch("/api/posts/@create", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.getItem("token")}`,
                  },
                  body: JSON.stringify({
                    title,
                    content,
                  }),
                })
                  .then((x) => x.ok && x.json())
                  .then((x) => {
                    if (!x){
                      return console.log("error");
                    } 
                    console.log(x);
                    router.push(`/posts/${x.id}`);
                    
                  });
                // router.push(`/admin/dashboard`);
              });
            }}
          >
            <div className={`relative w-full`}>
              <input
                // type=""
                placeholder="Post Title"
                onChange={(e) => {
                  setTitle(e.target.value)
                  console.log(e.target.value)
                }}
                className={`outline-none p-2 pl-12 w-full border-2 border-gray-300 focus:border-rose-600 transition-all bg-transparent placeholder:text-gray-400/80 caret-rose-600`}
              />
              <div
                className={`absolute p-0.5 ml-3 h-full top-1/2 -translate-y-1/2 left-0 w-6 pointer-events-none`}
              >
                <TagIcon className={`h-full w-full text-gray-300`} />
              </div>
            </div>
            <div className={`flex flex-col gap-2`}>
              <span className={`text-gray-600`}>Post Content</span>
              <Editor
                onInput={(value) => {
                  setContent(value);
                }}
                value={content}
              />
            </div>
            <div className={`flex flex-row gap-4 justify-start`}>
              <button
                type="submit"
                className={` bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-none focus:outline-none focus:shadow-outline`}
              >
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreatePostPage;
