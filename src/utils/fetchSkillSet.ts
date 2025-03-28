import { Skill, SkillSet } from "../../typings";
import axios from "axios";

export const fetchSkillSet = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getSkillSet`
    );
    if (res.headers["content-type"].split(";")[0] === "text/html") return null;
    const data = res.data;
    const SkillSet: SkillSet[] = data;
    return SkillSet;
  } catch (error) {
    return null;
  }
};
