/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Field {
    label: string;
    name: string[] | string;
    rules?: any[];
    type: "text" | "password" | "upload" | "datePicker" | "radio" | "select";
    options?: any[];
    initialValue?: any;
    disabled?: boolean;
  }
