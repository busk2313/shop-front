import { useToast } from '@/composables/useToast.ts'

interface HttpHandlerInitOptions<T> {
  request: () => Promise<T>
  onSuccess: (data: T) => void
  onError?: (error: any) => void
  onFinally?: () => void
}

const toast = useToast()

export default class HttpHandler {
  static async use<T>({ request, onSuccess, onError, onFinally }: HttpHandlerInitOptions<T>) {
    try {
      const response = await request()
      onSuccess(response)
    }
    catch (e: any) {
      if (onError)
        onError(e)
      else
        toast.show(e.response.data.Message, 'error')
    }
    finally {
      onFinally?.()
    }
  }
}
