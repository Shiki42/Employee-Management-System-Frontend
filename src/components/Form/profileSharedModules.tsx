/* eslint-disable @typescript-eslint/no-explicit-any */

import { Field } from "../../interfaces/FormField.interface";

import { message } from "antd";

export const handleFileSubmit = async (info: any, form: any, fieldName:any, setUploaded?:any) => {
  const { status, response } = info.file;

  if (status === "uploading") {
    // File is uploading
  }
  if (status === "done") {
    if (response && response.documentId ) {
      if(setUploaded) setUploaded(true);
      if (Array.isArray(fieldName)) {
        // If fieldName is an array, build the nested object
        let fieldObj = { [fieldName.pop() as string]: response.documentId };
        
        // Build up the nested field object
        for (let i = fieldName.length - 1; i >= 0; i--) {
          fieldObj = { [fieldName[i]]: fieldObj };
        }
        
        form.setFieldsValue(fieldObj);
      } else {
        // If fieldName is a string, directly set the value
        form.setFieldsValue({ [fieldName]: response.documentId });
      }
      console.log(form.getFieldsValue(true));
      
      message.success(`${info.file.name} file uploaded successfully.`);
    } else {
      message.error(`${info.file.name} file upload failed.`);
    }
  } else if (status === "error") {
    message.error(`${info.file.name} file upload failed.`);
  }
};




export const nameFields: Field[] =[
  {
    label: "First Name",
    name: ["name", "firstName"],
    type: "text",
    rules: [{ required: true, message: "Please input your first name!" }],
  },
  {
    label: "Last Name",
    name: ["name", "lastName"],
    type: "text",
    rules: [{ required: true, message: "Please input your last name!" }],
  },
  {
    label: "Middle Name",
    name: ["name", "middleName"],
    type: "text",
  },
  {
    label: "Preferred Name",
    name: ["name", "preferredName"],
    type: "text",
  },
  // Profile Picture
  {
    label: "Profile Picture",
    name: "profilePicture",
    type: "upload",
  },
  // Email
  {
    label: "Email",
    name: "email",
    type: "text",
    rules: [
      { required: true, message: "Please input your email!" },
      { type: "email", message: "Invalid email format!" },
    ],
    initialValue: "",
    disabled: true,
  },
  // SSN, DOB, Gender
  {
    label: "SSN",
    name: "SSN",
    type: "text",
    rules: [{ required: true, message: "Please input your SSN!" }],
  },
  {
    label: "Date of Birth",
    name: "DOB",
    type: "datePicker",
    rules: [{ required: true, message: "Please select your date of birth!" }],
  },
  {
    label: "Gender",
    name: "gender",
    type: "radio",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "I do not wish to answer", value: "i do not wish to answer" },
    ],
    rules: [{ required: true, message: "Please select your gender!" }],
  },
];

export const addressFields: Field[] = [
  // Address
  {
    label: "Building/Apt #",
    name: ["address", "building"],
    type: "text",
    rules: [{ required: true, message: "Please input your building/apt #" }],
  },
  {
    label: "Street Name",
    name: ["address", "street"],
    type: "text",
    rules: [{ required: true, message: "Please input your street name!" }],
  },
  {
    label: "City",
    name: ["address", "city"],
    type: "text",
    rules: [{ required: true, message: "Please input your city!" }],
  },
  {
    label: "State",
    name: ["address", "state"],
    type: "text",
    rules: [{ required: true, message: "Please select your state!" }],
  },
  {
    label: "ZIP Code",
    name: ["address", "zip"],
    type: "text",
    rules: [{ required: true, message: "Please input your ZIP code!" }],
  },
];

export const contactFields: Field[] = [
  // Phone Numbers
  {
    label: "Phone Number",
    name: "phoneNumber",
    type: "text",
    rules: [{ required: true, message: "Please input your phone number!" }],
  },
  {
    label: "Work Phone Number",
    name: "workPhoneNumber",
    type: "text",
  },
];

export const citizenshipFields: Field[] = [
  // Permanent resident or citizen
  {
    label: "Permanent resident or citizen of the U.S.?",
    name: "citizenship",
    type: "select",
    options: [
      { label: "Citizen", value: "citizen" },
      { label: "Green Card", value: "green card" },
      { label: "No", value: "N/A" },
    ],
    rules: [{ required: true, message: "Please select your legal identity!" }],
  }
];

export const employmentFields: Field[] = [
  // Visa Type
  {
    label: "Visa Type",
    name: ["workAuth","type"],
    type: "select",
    options: [
      { label: "H1-B", value: "H1-B" },
      { label: "L2", value: "L2" },
      { label: "F1(CPT/OPT)", value: "F1(CPT/OPT)" },
      { label: "H4", value: "H4" },
      { label: "Other", value: "Other" },
    ],
    rules: [{ required: true, message: "Please select your work authorization!" }],
  },
  {
    label: "workAuth Start Date",
    name: ["workAuth","StartDate"],
    type: "datePicker",
    rules: [{ required: true, message: "Please select your workAuth Start Date!" }],
  },
  {
    label: "workAuth End Date",
    name: ["workAuth","EndDate"],
    type: "datePicker",
    rules: [{ required: true, message: "Please select your workAuth End Date!" }],
  },
  {
    label: "Other Visa Type",
    name: ["workAuth","Other"],
    type: "text",
  },
];

export const referrerFields: Field[] = [
  // Reference
  {
    label: "Referrer First Name",
    name: ["referrer", "name", "firstName"],
    type: "text",
    rules: [{ required: true, message: "Please input the referrer's first name!" }],
  },
  {
    label: "Referrer Last Name",
    name: ["referrer", "name", "lastName"],
    type: "text",
    rules: [{ required: true, message: "Please input the referrer's last name!" }],
  },
  {
    label: "Referrer Relationship",
    name: ["referrer", "relationship"],
    type: "text",
    rules: [{ required: true, message: "Please input your relationship with the referrer!" }],
  },
];

export const emergencyContactFields: Field[] = [
  // Emergency Contact
  {
    label: "Emergency Contact First Name",
    name: ["emergencyContact", "name", "firstName"],
    type: "text",
    rules: [{ required: true, message: "Please input the emergency contact's first name!" }],
  },
  {
    label: "Emergency Contact Last Name",
    name: ["emergencyContact", "name", "lastName"],
    type: "text",
    rules: [{ required: true, message: "Please input the emergency contact's first name!" }],
  },
  {
    label: "Emergency Contact Relationship",
    name: ["emergencyContact", "relationship"],
    type: "text",
    rules: [{ required: true, message: "Please input your relationship with the emergency contact!" }],
  }
];

export const docSummaryFields: Field[] = [
  {
    label: "Profile Picture",
    name: "profilePicture",
    type: "upload",
  },
];
export const defaultFields: Field[] = [
  ...nameFields,
  ...addressFields,
  ...contactFields,
  ...citizenshipFields,
  ...employmentFields,
  ...referrerFields
];
