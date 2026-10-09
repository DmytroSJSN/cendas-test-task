import StatusScreen from "../layout/StatusScreen";
import Spinner from "../ui/Spinner";

interface LoadingPageProps {
  message?: string;
}

const LoadingPage = ({ message = "Loading…" }: LoadingPageProps) => (
  <StatusScreen>
    <Spinner size="lg" />
    <p className="text-sm text-muted-foreground">{message}</p>
  </StatusScreen>
);

export default LoadingPage;
