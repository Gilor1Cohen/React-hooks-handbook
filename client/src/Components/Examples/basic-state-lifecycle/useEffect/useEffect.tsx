import { useEffect, useState } from "react";
import BackBtn from "../../../../ui/BackBtn/BackBtn";
import type { Comment, User, Post } from "../../../../Helpers/models/useEffect";
import "./useEffect.css";

export default function useEffectPage() {
  const [page, setPage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<User[] | Comment[] | Post[] | null>(null);

  // Fetch new data whenever the 'page' state changes
  useEffect(() => {
    // If no page is selected, exit early to avoid running the fetch
    if (!page) return;

    // Clear any previous data before loading new results
    setData(null);

    // Show loading message (or other indicator) while fetching
    setLoading(true);

    // Fetch up to 10 items from the chosen JSONPlaceholder endpoint
    fetch(
      `https://jsonplaceholder.typicode.com/${page.toLowerCase()}?_limit=10`
    )
      .then((response) => response.json())
      .then((json: any) => setData(json))
      .finally(() => setLoading(false));
  }, [page]); // Re-run this effect whenever the 'page' variable changes

  // useEffect hook structure:
  // useEffect(() => {              // 1. Effect callback: runs after render.
  //   // effect logic here         // 2. Place side-effect code here.
  //   return () => {               // 3. Cleanup callback: runs before next effect or unmount.
  //     // cleanup logic here
  //   };
  // }, [/* dependencies here */]);  // 4. Dependency array: re-run effect when values change.

  return (
    <section id="useEffectPage">
      <BackBtn />

      <h1>useEffect</h1>

      <article id="code">
        <div className="btns">
          <button
            onClick={() => {
              setPage("Users");
            }}
          >
            Users
          </button>
          <button
            onClick={() => {
              setPage("Posts");
            }}
          >
            Posts
          </button>
          <button
            onClick={() => {
              setPage("Comments");
            }}
          >
            Comments
          </button>
        </div>

        <div className="data">
          {/* Loading */}
          {!data && loading && <p>Loading...</p>}

          {/* Fallback when no data */}
          {!data && !loading && (
            <p>No data to display, please select a resource.</p>
          )}

          {/* Users */}
          {data && page === "Users" && (data as User[]).length > 0 && (
            <ul>
              {(data as User[]).map((user: User) => (
                <li key={user.id} className="data-item user-item">
                  <h2>
                    {user.name} <small>(@{user.username})</small>
                  </h2>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {user.phone}
                  </p>
                  <p>
                    <strong>Company:</strong> {user.company?.name}
                  </p>
                </li>
              ))}
            </ul>
          )}

          {/* Posts */}
          {data && page === "Posts" && (data as Post[]).length > 0 && (
            <ul>
              {(data as Post[]).map((post: Post) => (
                <li key={post.id} className="data-item post-item">
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                  <small>By user #{post.userId}</small>
                </li>
              ))}
            </ul>
          )}

          {/* Comments */}
          {data && page === "Comments" && (data as Comment[]).length > 0 && (
            <ul>
              {(data as Comment[]).map((comment: Comment) => (
                <li key={comment.id} className="data-item comment-item">
                  <p>
                    <strong>{comment.name}</strong> <em>({comment.email})</em>
                  </p>
                  <p>{comment.body}</p>
                  <small>On post #{comment.postId}</small>
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>

      <article id="text">
        <h3>useEffect Hook</h3>
        <p>
          useEffect is a React Hook that lets you run side effects in functional
          components. It's useful for actions like fetching data, updating the
          document title, or setting up event listeners. The effect runs after
          each render, or only when specified dependencies change. It helps keep
          your components synchronized with external systems in a clean and
          controlled way.
        </p>
      </article>
    </section>
  );
}
