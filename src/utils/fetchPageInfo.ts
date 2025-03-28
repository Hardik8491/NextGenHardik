import axios from "axios";
import { PageInfo } from "../../typings";

export const fetchPageInfo = async () => {
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/getPageInfo`
        );
        if (res.headers["content-type"].split(";")[0] === "text/html")
            return null;
        const pageInfo: PageInfo = res.data;

        return pageInfo;
    } catch (error) {
        return null;
    }
};
