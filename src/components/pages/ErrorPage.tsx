import StatusScreen from "../layout/StatusScreen";
import Button from "../ui/Button";

interface ErrorPageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const ErrorPage = ({
  title = "Something went wrong",
  message,
  onRetry = () => window.location.reload(),
}: ErrorPageProps) => (
  <StatusScreen>
    <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-800/40 p-6 text-center">
      <h1 className="font-medium">{title}</h1>
      {message && (
        <p className="mt-2 text-sm break-words text-zinc-400">{message}</p>
      )}
      <Button className="mt-5" onClick={onRetry}>
        Reload
      </Button>
    </div>
  </StatusScreen>
);

export default ErrorPage;
