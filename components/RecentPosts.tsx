
import { connection } from "next/server";

type Post = {
  id: number;
  title: string;
};

export default async function RecentPosts() {
  // Make this work happen during a request.
  await connection();


  await new Promise((resolve) => setTimeout(resolve, 2000));

  let posts: Post[] = [];
  let hasError = false;

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?userId=1",
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    posts = await response.json();

    if (!Array.isArray(posts)) {
      throw new Error("Invalid posts response");
    }
  } catch {
    hasError = true;
  }

  // JSX is outside try/catch.
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900">
        Recent Posts
      </h2>

      {hasError ? (
        <p className="mt-3 text-red-600">
          Unable to load recent posts. Please try again later.
        </p>
      ) : (
        <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700">
          {posts.slice(0, 3).map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
