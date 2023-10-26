/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Field {
    label: string;
    name: string[] | string;
    rules?: any[];
    type: "text" | "password" | "upload" | "datePicker" | "radio" | "select";
    options?: { label: string; value: string }[];
    initialValue?: any;
    disabled?: boolean;
    fileHandler?:any;
  }

