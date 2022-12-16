import axios from "axios";

const BASE_URL = "https://the-trivia-api.com/api"

const invokeGet = async (url) => {
    return axios.get(url, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {
        return res;
    }).catch((err) => {
        console.log(err);

        return err.response;
    });
}

const GetCategories = async () => {
    const resp = await Apiservice.invokeGet(`${BASE_URL}/categories`)
    return resp
}

const GetQuestions = async (categories, level) => {
    let url = `${BASE_URL}/questions?difficulty=${level}&limit=20`
    if(categories) {
        url += `&categories=${categories}`;
    }
    const resp = await Apiservice.invokeGet(url)
    return resp
}

const Apiservice = {
    invokeGet,
    GetCategories,
    GetQuestions
}



export default Apiservice;