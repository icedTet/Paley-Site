import { Editor } from "@toast-ui/react-editor";
import { createRef, RefObject, useEffect, useState } from "react";

export const MarkdownEditor = (props: {
  onInput: (value: string) => void;
  value: string;
}) => {
  const ref = createRef() as RefObject<Editor>;
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    console.log(ref.current.getInstance(), "ref");
    props.onInput(ref.current.getInstance().getMarkdown());
  }, [ref.current,typing]);
  useEffect(()=>{
    ref.current.getInstance().setMarkdown(props.value);
    if (props.value.endsWith(" ")){
      //replace every ending spaces with &nbsp;s
      const spaces = props.value.match(/(\s+)$/)[0].length;
      ref.current.getInstance().setMarkdown(props.value.replace(/\s+$/, "&nbsp;".repeat(spaces)));
    }
  },[props.value])
  return (
    <Editor
      initialValue={props.value}
      hideModeSwitch
      initialEditType="wysiwyg"
      useCommandShortcut
      height="500px"
      onChange={(e) => {
        setTyping((x) => !x);
      }}
      ref={ref}
    />
  );
};
export default MarkdownEditor;
