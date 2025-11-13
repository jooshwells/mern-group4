import { useTheme } from "./theme-provider"; // switch image based on theme
export function GitHubLink() {
  const { theme } = useTheme();

  return (
    <a 
      href="https://github.com/jooshwells/mern-group4" 
      target="_blank" 
      rel="noopener noreferrer"
      className="transition hover:opacity-75"
    >
      {theme === 'dark' ? (
        <img src="/github-mark-white.png" alt="GitHub Profile" className="w-14 h-14" />
      ) : (
        <img src="/github-mark.png" alt="GitHub Profile" className="w-14 h-14" />
      )}
    </a>
  );
}