import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export default function LoginFirst() {
  return (
    <Result
      icon={<ExclamationCircleOutlined />}
      title="Please Login First"
      extra={
        <Link to="/">
          <Button type="primary" size="large">
            Go To Login
          </Button>
        </Link>
      }
    />
  );
}