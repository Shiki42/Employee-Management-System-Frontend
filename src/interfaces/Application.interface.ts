interface Name {
    firstName: string;
    lastName: string;
    middleName?: string;
    preferredName?: string;
  }
  
  interface Address {
    building: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  }
  
  interface Referrer {
    name: {
      firstName: string;
      lastName: string;
      middleName?: string;
    };
    phoneNumber: string;
    email: string;
    relationship: string;
  }
  
// export interface Application {
//   status: 'pending' | 'approved' | 'rejected';
//   name: Name;
//   profilePicture?: string;
//   address: Address;
//   phoneNumber: string;
//   email: string;
//   SSN: string;
//   DOB: Date;
//   gender: 'male' | 'female' | 'i do not wish to answer';
//   workAuth: 'citizen' | 'green card' | 'H1B/L2/H4' | 'F1(CPT/OPT)' | 'other';
//   workAuthOther?: string;
//   workAuthStartDate?: string;
//   workAuthEndDate?: string;
//   referrer: Referrer;
// }

export interface Application {
    status: "pending" | "approved" | "rejected" | null;
    name: Name | null;
    profilePicture?: string | null;
    address: Address | null;
    phoneNumber: string | null;
    email: string | null;
    SSN: string | null;
    DOB: Date | null;
    gender: "male" | "female" | "i do not wish to answer" | null;
    workAuth: "citizen" | "green card" | "H1B/L2/H4" | "F1(CPT/OPT)" | "other" | null;
    workAuthOther?: string | null;
    workAuthStartDate?: string | null;
    workAuthEndDate?: string | null;
    referrer: Referrer | null;
  }

export const initApplication = () => {
    
  return {
    status: null,
    name:  null,
    profilePicture:  null,
    address: null,
    phoneNumber:  null,
    email:  null,
    SSN:  null,
    DOB:  null,
    gender:  null,
    workAuth:  null,
    workAuthOther:  null,
    workAuthStartDate: null,
    workAuthEndDate:  null,
    referrer:  null,
  } as Application;

};
