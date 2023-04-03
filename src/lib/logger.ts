export function log(message: string, ...args: any[]) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(message, ...args)
  }
}
