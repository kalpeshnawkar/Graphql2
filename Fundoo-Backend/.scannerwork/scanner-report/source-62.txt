const axios = require("axios")
 
exports.axiosService=(url,method) => {
    return new Promise((resolve,reject) =>{
 axios({
        method: method,
        url: url,
        headers: {
            Accept: "application/json"
        }
    }
)
.then(function(res){
    resolve(res)
})
.catch(function(err){
    console.log("Error in axios service=>",err)
    reject(err)
})
})
}


exports.axiosGetBranch=(sha,url,method,ref)=>{
    return new Promise((resolve,reject) =>{
    axios(
    {
            method: method,
            url: url,
            headers: {
                Accept: "application/json"
            },
            data: {
                "ref":ref,
                "sha": sha // This is the body part
            }
        }
    )
.then(function(res){
   resolve(res) 
})
.catch(function(err){
    reject(err)
})
})
}
exports.fetchService=(fetchData1,query)=>{
    return new promise((resolve,reject)=>{
    fetchData1({
        query:query
    })
    .then(function(res){
        console.log("res==",res)
        resolve(res);
    })
    .catch(function(err){
        console.log("err==",err)
        reject(err)
    })

})
}


