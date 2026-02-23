import { Github } from "lucide-react"

export default function MainFooter() {
  return (
    <footer className="flex w-full flex-col">
      <hr />
      <div className="flex w-full justify-between py-4">
        <p>
          ✨ Build by
          <a href="https://github.com/sergio-jc">sergio-jc</a>
        </p>
        <div>
          <Github />
        </div>
      </div>
    </footer>
  )
}
