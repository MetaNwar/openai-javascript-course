import { SerpAPI } from "langchain/tools";

const SerpAPITool = () => {
    //Bing search
    const serpAPI = new SerpAPI(process.env.SERP_API_KEY, {
        baseUrl: "http://localhost:3000/agents",
        location: "New York City, New York, United States",
        hl: "en",
        gl: "us",
    });

// grab the most recent result
    serpAPI.returnDirect = true;

    return serpAPI;
};

export default SerpAPITool;
