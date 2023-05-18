import axios from 'axios';

import { API_NOTIFICATION_MESSAGE , service_call} from '../Constants/config';

const  API_URL = "http://localhost:8080";

const axiosInstance = axios.create({
    baseURL : API_URL,
    timeout : 10000, 
    headers : {
        "content-type" : "application/json"
    }
})

axiosInstance.interceptors.request.use(
    function (config){
        return (config);
    },
    function (error){
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function (response){
        //stop global loader here
        return processResponse(response)
    },
    function (error){
        return Promise.reject(processError(error))
    }
)


///////////////////////////////////////////////////////
// if success => return (isSuccess : true , data : object)
// if fail => return (isFailure : true)

//////////////////////////////////////////////////////


const processResponse = (response) => { 
    if(response.status == 201){
        return {isSuccess : true , data : response.data}
    }else{
        return {
            isFailure : true ,
            status : response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}


const processError = (error) => {
    if(error.response){
        //request made and server responded with status code 2xx
            console.log("error in Response" , error.toJSON());
        return {
            isError : true,
            message : API_NOTIFICATION_MESSAGE.responseFailure,
            code : error.response.status
        }
    }else if(error.request){
        console.log("error in Request" , error.toJSON());

        return {
            isError : true,
            message : API_NOTIFICATION_MESSAGE.requestFailure,
            code : ""
        }
        
    }else {
        console.log("error in Network : " , error.toJSON());
        return {
            isError : true,
            message : API_NOTIFICATION_MESSAGE.networkError,
            code : ""
        }
    }
}

const API = {};

for (const [key , value] of Object.entries(service_call)) {
    console.log(key);
    console.log(value);
    API[key] = (body ,showUploadProgress , showDownloadProgress) => 
        axiosInstance({
            method : value.method,
            url : value.url,
            data : body,
            responseType : value.responseType,

            onUploadProgress : function (progressEvent){
                if(showUploadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    showUploadProgress(percentageCompleted)
                }
            },

            onDownloadProgress : function(progressEvent) { 
                if(showDownloadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    showDownloadProgress(percentageCompleted)
                }
            }
        })
    }

    export {API};