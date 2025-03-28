import axios from "axios";
import { Contact } from "../../typings";

export const fetchContact = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getContact`
    );
    if (res.headers["content-type"].split(";")[0] === "text/html") return null;
    const Contact: Contact = res.data;

    return Contact;
  } catch (error) {
    return null;
  }
};
