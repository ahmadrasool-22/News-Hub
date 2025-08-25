import { useState, useEffect } from "react";
import Skeleton from "../component/SKELETON";

function NewsApp() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [catagory, setCatagory] = useState(
    "https://fakenews.squirro.com/news/finance?count=10"
  );
  const [error, setError] = useState(null);

  function truncateText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  }

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);

        const url = await fetch(
          "https://api.allorigins.win/raw?url=" +
            encodeURIComponent(`${catagory}`)
        );
        const data = await url.json();
        setNews(data.news);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, [catagory]);

  
    return (
  <div className="overflow-x-hidden">
    <header className="bg-gray-700 rounded-3xl mb-5 mx-2">
  <nav className="flex justify-between items-center p-4">
    <h1 className="text-white font-bold font-mono text-2xl md:text-3xl lg:text-5xl">
      NEWS<span className="text-white font-mono font-bold">HUB</span>
    </h1>

    {/* Hamburger Icon (visible on small screens only) */}
    <button 
      className="text-white md:hidden block focus:outline-none" 
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? "✖" : "☰"}
    </button>

    {/* Desktop Menu */}
<ul className="hidden md:flex gap-2">
  <li>
    <button
      className={`rounded-full px-4 py-2 transition duration-300 ${
        catagory.includes("sport")
          ? "bg-white text-black font-semibold"
          : "text-gray-50 hover:bg-white hover:text-black"
      }`}
      onClick={() =>
        setCatagory("https://fakenews.squirro.com/news/sport?count=10")
      }
    >
      Sport
    </button>
  </li>
  <li>
    <button
      className={`rounded-full px-4 py-2 transition duration-300 ${
        catagory.includes("technology")
          ? "bg-white text-black font-semibold"
          : "text-gray-50 hover:bg-white hover:text-black"
      }`}
      onClick={() =>
        setCatagory("https://fakenews.squirro.com/news/technology?count=10")
      }
    >
      Technology
    </button>
  </li>
  <li>
    <button
      className={`rounded-full px-4 py-2 transition duration-300 ${
        catagory.includes("entertainment")
          ? "bg-white text-black font-semibold"
          : "text-gray-50 hover:bg-white hover:text-black"
      }`}
      onClick={() =>
        setCatagory("https://fakenews.squirro.com/news/entertainment?count=10")
      }
    >
      Entertainment
    </button>
  </li>
</ul>

  </nav>

  {/* Mobile Menu */}
{isOpen && (
  <ul className="flex flex-col items-center gap-2 pb-4 md:hidden">
    <li>
      <button
        className={`w-full rounded-full px-4 py-2 transition duration-300 ${
          catagory.includes("sport")
            ? "bg-white text-black font-semibold"
            : "text-gray-50 bg-gray-600 hover:bg-white hover:text-black"
        }`}
        onClick={() =>
          setCatagory("https://fakenews.squirro.com/news/sport?count=10")
        }
      >
        Sport
      </button>
    </li>
    <li>
      <button
        className={`w-full rounded-full px-4 py-2 transition duration-300 ${
          catagory.includes("technology")
            ? "bg-white text-black font-semibold"
            : "text-gray-50 bg-gray-600 hover:bg-white hover:text-black"
        }`}
        onClick={() =>
          setCatagory("https://fakenews.squirro.com/news/technology?count=10")
        }
      >
        Technology
      </button>
    </li>
    <li>
      <button
        className={`w-full rounded-full px-4 py-2 transition duration-300 ${
          catagory.includes("entertainment")
            ? "bg-white text-black font-semibold"
            : "text-gray-50 bg-gray-600 hover:bg-white hover:text-black"
        }`}
        onClick={() =>
          setCatagory("https://fakenews.squirro.com/news/entertainment?count=10")
        }
      >
        Entertainment
      </button>
    </li>
  </ul>
)}

</header>


    {/* Hero Section */}
      <section className="bg-gray-100 rounded-3xl p-10 mb-10 text-center shadow-sm">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4">
          Stay Updated. Stay Ahead.
        </h2>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-6">
          Bringing you the latest <span className="font-semibold">Finance</span>,{" "}
          <span className="font-semibold text-black">Sports</span>,{" "}
          <span className="font-semibold  text-black">Technology</span> and{" "}
          <span className="font-semibold  text-black">Entertainment</span> news — all in one
          hub.
        </p>
        <button
          onClick={() =>
            setCatagory("https://fakenews.squirro.com/news/finance?count=10")
          }
          className="px-8 py-4 bg-gray-700 text-white rounded-full font-semibold hover:bg-black transition duration-300 ease-in-out"
        >
          Latest Finance News
        </button>
      </section>

    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {error && <p className="text-red-500 text-center">{error}</p>}

      {loading
        ? Array.from({ length: 9 }).map((_, i) => <Skeleton key={i} />)
        : news.map((article) => (
            <div
              key={article.id}
              className="p-6 text-center bg-gray-50 text-black font-sans rounded-3xl hover:bg-white transform hover:scale-105 transition duration-300 ease-in-out"
            >
              <h2 className="font-semibold text-xl md:text-2xl pb-3">
                {article.headline} by {article.author}
              </h2>
              <p className="text-sm mx-auto max-w-3xl pb-10">
                {truncateText(article.abstract, 20)}
              </p>
              <a
                href={article.article_uri}
                className="inline-block px-6 py-2 bg-gray-500 text-white font-semibold rounded-full hover:bg-gray-600 transition duration-300 ease-in-out"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More
              </a>
            </div>
          ))}
    </div>

    {/* Footer */}
      <footer className="bg-gray-700 rounded-3xl mt-10 p-6 text-center text-gray-200">
        <p className="text-sm">
          © {new Date().getFullYear()} NewsHub. Built with ❤️ using React &
          Tailwind CSS.
        </p>
      </footer>
  </div>
);

}
export default NewsApp;
