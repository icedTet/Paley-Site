import { useRouter } from "next/router";
import { Post } from "../../../utils/types/postTypes";
import { UserType } from "../../../utils/types/userTypes";

export const PostPage = (props: { post: Post; author: UserType }) => {
  const router = useRouter();
  const { post, author } = props;
  return (
    <div>
      {JSON.stringify(author)}
      {JSON.stringify(post)}
    </div>
  );
};
export default PostPage;
export async function getStaticPaths() {
  const posts = (await fetch(
    `${`http://localhost:6969`}/api/posts?limit=999999`
  ).then((res) => res.json())) as Post[];
  console.log(posts.map((post) => ({ params: post })));
  return {
    paths: posts.map((post) => ({ params: { post: post.id } })),
    fallback: true, // false or 'blocking'
  };
}
export async function getStaticProps({ params }) {
  const post = await fetch(
    `${`http://localhost:6969`}/api/posts/${params.post}`
  ).then((res) => res.json());
  const author = await fetch(
    `${`http://localhost:6969`}/api/users/${post.author}`
  ).then((res) => res.json());
  return {
    props: {
      post,
      author,
    },
  };
}
