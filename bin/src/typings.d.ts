interface Author {
  name: string
  email: string
}

declare module '*.json' {
  const version: string
  const author: Author
}

interface RedditCredentials {
  username: string
  password: string
  clientId: string
  clientSecret: string
}
