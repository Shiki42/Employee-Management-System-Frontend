import { Result, Button } from "antd";
import { Link } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export default function NotFound() {
  return (
    <Result
      icon={<ExclamationCircleOutlined />}
      title="Oops, something went wrong"
      extra={
        <Link to="/">
          <Button type="primary" size="large">
            Go Home
          </Button>
        </Link>
      }
    />
  );
}
