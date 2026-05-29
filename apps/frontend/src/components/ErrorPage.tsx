import { Button } from "antd";
import { ApiOutlined } from "@ant-design/icons";

type Props = {
  onRetry?: () => void;
};

export default function ErrorPage({ onRetry }: Props) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="text-center space-y-4">
        <ApiOutlined className="text-5xl text-slate-400" />
        <h1 className="text-xl font-semibold text-slate-700">
          Trying to make connection
        </h1>
        {onRetry && (
          <Button type="primary" onClick={onRetry}>
            Retry
          </Button>
        )}
      </div>
    </div>
  );
}
