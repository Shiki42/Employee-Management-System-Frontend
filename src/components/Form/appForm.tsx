/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Button, Form, Input, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import styles from "./Form.module.css";
import { RootState } from "../../app/store";

interface Field {
    name: string;
    placeholder: string;
    rules: any[];
    type: string;
}

interface appFormProps {
    buttonText: string;
    onSubmit: (any:any) => void;
    onSave: (any:any) => void;
    title: string;
    fields: Field[];
    initialValueContents: Record<string, unknown>;
}

export default function appForm({
    buttonText,
    onSubmit,
    onSave,
    title,
    fields,
    initialValueContents,
}: appFormProps) {
    // const user = useSelector((state:RootState) => state.user);

    return (
        <div className={styles.container}>
        <Typography className={styles.title}>{title}</Typography>
        <Form onFinish={onSubmit} autoComplete="off" className={styles.form}>
            {fields.map(field => (
                <Form.Item
                    key={field.name}
                    name={field.name}
                    rules={field.rules}
                >
                    {field.type === "password" ? (
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder={field.placeholder}
                        size='large'
                    />
                    ) : (
                    <Input
                        prefix={<UserOutlined />}
                        placeholder={field.placeholder}
                        size='large'
                    />
                    )}                       
                </Form.Item>
            ))}
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    // loading={status === "loading"}
                >
                    {buttonText}
                </Button>
            </Form.Item>
        </Form>
        </div>
    )
}