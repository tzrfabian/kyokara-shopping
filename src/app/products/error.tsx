'use client'

type ErrorProps = {
    error: Error,
}

export default function Error({ error }: ErrorProps) {
  return (
    <div>
        <h1>Error: {error.message}</h1>
    </div>
  )
}
