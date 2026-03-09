import MainFooter from "./components/main-footer"
import MainNavbar from "./components/main-nav-bar"

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex w-full max-w-4xl flex-1 flex-col items-center bg-white px-2 sm:items-start sm:px-4 dark:bg-black">
        <MainNavbar />
        <div className="flex w-full max-w-full flex-1">{children}</div>
        <MainFooter />
      </div>
    </div>
  )
}
