"use client"

import { useEffect, useState } from "react"
import { sanityClient } from "../sanity/lib/client"

export default function useSanityFetch<T = unknown>(
  query: string,
  params?: Record<string, unknown>
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const paramsKey = JSON.stringify(params)

  useEffect(() => {
    let mounted = true

    // set loading asynchronously to avoid sync setState in effect
    Promise.resolve().then(() => {
      if (mounted) setLoading(true)
    })

    sanityClient
      .fetch<T>(query, params ?? {})
      .then((res) => {
        if (!mounted) return
        setData(res)
        setError(null)
      })
      .catch((err) => {
        if (!mounted) return
        setError(err as Error)
      })
      .finally(() => {
        if (!mounted) return
        setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [query, paramsKey, params])

  return { data, loading, error }
}
