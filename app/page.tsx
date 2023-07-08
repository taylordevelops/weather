import "../styles/main.scss";
import SearchBox from "./components/SearchBox";

export default function Home() {
  return (
    <main className="home">
      <div className="container">
        <h1 className="appLogo">City Weather</h1>
        <SearchBox placeholder="Search for a city..." />
      </div>
    </main>
  );
}
