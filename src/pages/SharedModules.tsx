import {getDocument} from "../services/document";
export   const previewDocument = async (docId: string) => {
  const document = await getDocument(docId);
  console.log("Received response:", document);
  if (document.size > 0) {
    const url = URL.createObjectURL(document);
    window.open(url, "_blank");
  } else {
    console.log("Received empty document");
  }
};
