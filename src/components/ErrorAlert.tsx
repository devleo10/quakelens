import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface ErrorAlertProps {
  error: string
  onRetry: () => void
}

export default function ErrorAlert({ error, onRetry }: ErrorAlertProps) {
  return (
    <Alert className="mb-4 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
      <AlertDescription className="text-red-800 dark:text-red-200 text-sm">
        {error}
        <Button variant="outline" size="sm" onClick={onRetry} className="ml-2">
          Retry
        </Button>
      </AlertDescription>
    </Alert>
  )
}
