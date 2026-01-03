import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ url, request }) => {
  const apiKey = request.headers.get('x-api-key') ?? ''

  if (apiKey !== import.meta.env.REVALIDATE_REQUEST_KEY) {
    return new Response('Unauthorized', { status: 401 })
  }

  const body = await request.json()
  const postId = body.id ?? ''

  const revalidateTargets = ['/']

  if (postId) {
    revalidateTargets.push(`/article/${postId}/`)
  }

  const results = await Promise.all(
    revalidateTargets.map((path) =>
      fetch(`${url.origin}${path}`, {
        method: 'HEAD',
        headers: {
          'x-prerender-revalidate': import.meta.env.VERCEL_REVALIDATE_TOKEN
        }
      })
    )
  )

  const isSuccess = results.every((res) => res.headers.get('x-vercel-cache') === 'REVALIDATED')
  return new Response(JSON.stringify({ result: isSuccess }))
}
