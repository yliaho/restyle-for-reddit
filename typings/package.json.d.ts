interface Author {
  name: string
  email: string
}

declare module 'package.json' {
  const version: string
  const author: Author
}
