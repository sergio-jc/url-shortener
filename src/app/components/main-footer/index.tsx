import { Github } from "lucide-react";

export default function MainFooter() {
  return (
    <footer className="flex flex-col w-full">
      <hr />
      <div className="flex justify-between w-full py-4">
        <p>
          ✨ Build by <a href="https://github.com/sergio-jc">sergio-jc</a>
        </p>
        <div>
          <Github />
        </div>
      </div>
    </footer>
  );
}
