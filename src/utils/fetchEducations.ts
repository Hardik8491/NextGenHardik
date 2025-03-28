import axios from "axios";
import { Education } from "../../typings";

export const fetchEducation = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getEducation`
    );
    if (res.headers["content-type"].split(";")[0] === "text/html") return null;
    const data = res.data;
    const education: Education[] = data;
    return education;
  } catch (error) {
    return null;
  }
};
