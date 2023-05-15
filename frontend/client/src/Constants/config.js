export const API_NOTIFICATION_MESSAGE = {
    loading : {
        title : "loading",
        message : "loading Data"
    },
    success : {
        title : "loading",
        message : "data laoded successfully"
    },
    responseFailure : {

        title : "error",
        message : " An error occurred while fetching response fron server . try again later...."
    },
    requestFailure : {
        title : "error",
        message : "An error occurred while parsing data"
    },
    networkError : {
        title : "error",
        message : "network error occurred"
    }
}


export const service_call = {
    userSignup : {url : "/authors" , method : "POST"}
}