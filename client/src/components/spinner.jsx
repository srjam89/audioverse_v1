import { Spinner } from "@/components/ui/spinner";

function LoadingSpinner(props) {
  return (
    <div className="flex justify-center items-center p-4">
      <Spinner {...props} />
    </div>
  );
}

export default LoadingSpinner;
