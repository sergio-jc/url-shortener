const messages = {
  anonymous: {
    title: "A simple, fast and secure URL shortener",
    description: "Create short links to your favorite websites and share them easily.",
  },
  authenticated: {
    title: "Welcome to your URL Shortener !",
    description: "Shorten your long URLs and share them easily.",
  },
}

interface WelcomeMessageProps {
  isAuthenticated: boolean
}

const WelcomeMessage = (props: WelcomeMessageProps) => {
  const { isAuthenticated } = props
  const message = isAuthenticated ? messages.authenticated : messages.anonymous

  return (
    <div>
      <h2 className="text-3xl font-semibold sm:text-4xl">{message.title}</h2>
      <p className="mpt-2 text-lg text-gray-600 dark:text-gray-300">{message.description}</p>
    </div>
  )
}

export default WelcomeMessage
