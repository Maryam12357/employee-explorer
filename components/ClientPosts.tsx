
"use client";

import { useState } from "react";

type Post = {
  id: number;
  title: string;
  body: string;
};

type Status = "idle" | "loading" | "success" | "empty" | "error";
type Scenario = "success" | "slow" | "http-error" | "empty";

// Custom error for unsuccessful HTTP responses
class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = "ApiError";
  }
}

// Shared response handling for real and simulated responses
async function parsePosts(response: Response): Promise<Post[]> {
  if (!response.ok) {
    throw new ApiError(
      `The server returned HTTP ${response.status}.`,
      response.status
    );
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Invalid posts response");
  }

  return data as Post[];
}

export default function ClientPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [scenario, setScenario] = useState<Scenario>("success");
  const [errorMessage, setErrorMessage] = useState("");

  async function loadPosts() {
    if (status === "loading") return;

    setStatus("loading");
    setPosts([]);
    setErrorMessage("");

    try {
      let response: Response;

      if (scenario === "http-error") {
        // Simulate an HTTP 503 response locally
        response = new Response(
          JSON.stringify({ message: "Service unavailable" }),
          {
            status: 503,
            headers: { "Content-Type": "application/json" },
          }
        );
      } else if (scenario === "empty") {
        // Simulate a successful response with no posts
        response = new Response(JSON.stringify([]), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        if (scenario === "slow") {
          // Wait two seconds before making the real request
          await new Promise<void>((resolve) =>
            setTimeout(resolve, 2000)
          );
        }

        // Real API request for Success and Slow
        response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?userId=1",
          { cache: "no-store" }
        );
      }

      const data = await parsePosts(response);

      setPosts(data);
      setStatus(data.length === 0 ? "empty" : "success");
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        setErrorMessage(
          `HTTP ${error.status}: Unable to load posts. Please retry.`
        );
      } else {
        setErrorMessage(
          "A network or unexpected error occurred. Please retry."
        );
      }

      setStatus("error");
    }
  }

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900">
        Explore All Posts
      </h2>

      <p className="mt-3 text-gray-600">
        Click the button to load employee posts.
      </p>

      <div className="mt-4">
        <label
          htmlFor="demo-scenario"
          className="block font-medium text-gray-900"
        >
          Demo scenario
        </label>

        <select
          id="demo-scenario"
          value={scenario}
          onChange={(event) =>
            setScenario(event.target.value as Scenario)
          }
          disabled={status === "loading"}
          className="mt-2 rounded border border-gray-300 bg-white p-2 text-gray-900"
        >
          <option value="success">Success (real API)</option>
          <option value="slow">Slow (2 seconds + real API)</option>
          <option value="http-error">HTTP error (simulated 503)</option>
          <option value="empty">Empty (simulated response)</option>
        </select>

        <p className="mt-2 text-sm text-gray-500">
          Simulated scenarios are created locally.
          JSONPlaceholder does not return these simulated responses.
        </p>
      </div>

      <button
        onClick={loadPosts}
        disabled={status === "loading"}
        className="mt-4 rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {status === "loading"
          ? "Loading..."
          : status === "error"
          ? "Retry"
          : "Load posts"}
      </button>

      {status === "loading" && (
        <p className="mt-3" role="status">
          Loading posts...
        </p>
      )}

      {status === "empty" && (
        <p className="mt-3">No posts found.</p>
      )}

      {status === "error" && (
        <p className="mt-3 text-red-600" role="alert">
          {errorMessage}
        </p>
      )}

      {status === "success" && (
        <ul className="mt-4 space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="border-b pb-3">
              <h3 className="font-semibold">{post.title}</h3>
              <p className="mt-2 text-gray-600">{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
