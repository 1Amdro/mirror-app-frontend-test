import { useEffect, useState } from "react";
import styles from "./PostsLayout.module.css";
import PostCard from "../PostCard/PostCard";
import { Settings } from "../../types/settingsInterface";
import Pagination from "../Pagination/Pagination";
import { PostI } from "../../types/postInterface";


export default function PostsLayout({
  propLayoutSettings,
}: {
  propLayoutSettings: Settings;
}) {
  const [posts, setPosts] = useState<Array<PostI>>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const currentLayout = propLayoutSettings?.layout?.current;
  const layoutParams = propLayoutSettings?.layout?.params?.[currentLayout];
  const navigationType = propLayoutSettings?.navigation;

  const limit = (layoutParams?.columns || 1) * (layoutParams?.rows || 1);
  const totalPosts = 100;
  const totalPages = Math.ceil(totalPosts / limit);

  const fetchPosts = async (pageNum = 1, append = false) => {
    try {
      setIsLoading(true);
      console.log("columns", layoutParams?.columns);
      console.log("rows", layoutParams?.rows);
      const req = await fetch(
        `https://mirror-app-frontend-demo-server.vercel.app/posts?_expand=user&_page=${pageNum}&_limit=${limit}`
      );
      const data = await req.json();

      setPosts((prevPosts) => (append ? [...prevPosts, ...data] : data));

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPosts([]);
    setPage(1);
    fetchPosts(1, false);
  }, [layoutParams, navigationType]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(nextPage, true);
  };

  const isMasonry = currentLayout === "masonry";

  return (
    <section className={styles.container}>
      <div
        className={`${styles.list} ${
          isMasonry ? styles.masonry : styles.grid_list
        }`}
        style={
          isMasonry
            ? { columnCount: layoutParams?.columns || 1 }
            : {
                gridTemplateColumns: `repeat(${layoutParams.columns}, 1fr)`,
                gridTemplateRows: `repeat(${layoutParams.rows}, 1fr)`,
              }
        }
      >
        {posts.map((post) => (
          <div
            key={post.id}
            className={isMasonry ? styles.masonry_item : styles.grid_item}
          >
            <PostCard
              propClassName={
                propLayoutSettings.template === "classic"
                  ? styles.card
                  : styles.card_hover
              }
              propTypeCard={propLayoutSettings.template}
              propData={post}
            />
          </div>
        ))}
      </div>

      {navigationType === "load-more" && (
        <div className={styles.nav_wrapper}>
          <button
            onClick={handleLoadMore}
            className={styles.load_more_btn}
            disabled={isLoading}
          >
            {isLoading ? "Загрузка..." : "Загрузить ещё"}
          </button>
        </div>
      )}

      {navigationType === "pagination" && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => {
            setPage(newPage);
            fetchPosts(newPage, false);
          }}
        />
      )}
    </section>
  );
}
