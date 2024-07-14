import "./styles/global.css";
import List from "./components/list";

export default function Home() {
  return (
    <main>
      <List></List>
      <footer>
        <p className="footer__paragraph">
          <a href="https://linktr.ee/jamess_hillman" target="_blank">
            Jakub Horáček
          </a>
          <span>|</span>
          &copy;2024
        </p>
      </footer>
    </main>
  );
}
