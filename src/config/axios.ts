import axios, { Axios } from "axios";

const apiBaseURL = "https://api.thesports.com";
const axiosInstance: Axios = axios.create({
  baseURL: apiBaseURL,
  headers: {
    "Content-Type": "application/json",
    // "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    // "Accept-Encoding": "gzip, deflate",
    // "Accept-Language": "vi,en-US;q=0.9,en;q=0.8",
    // "Cache-Control": "no-cache",
    // "Connection": "keep-alive",
    // "Cookie": "Hm_lvt_2e61063f18eb071a41d651bc8f110621=1690046917; _gcl_au=1.1.1638623062.1690046917; _gid=GA1.2.103236787.1690205907; _ga=GA1.1.831890889.1690046917; Hm_lpvt_2e61063f18eb071a41d651bc8f110621=1690210803; _ga_TPKFZE43WK=GS1.1.1690205906.6.1.1690210822.40.0.0; _ga_RSYH3VETS3=GS1.1.1690205907.6.1.1690210822.40.0.0",
    // "Host": "api.thesports.com",
    // "Pragma": "no-cache",
    // "Upgrade-Insecure-Requests": "1",
    // "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.183",
  },
});

export default axiosInstance;
