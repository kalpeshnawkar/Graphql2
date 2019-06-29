const redis =require('redis');
const client = redis.createClient({
    host:"localhost",
    port:6379,
    no_ready_check: true,
    auth_pass: "redis1234"
});

//check redis is connect or not
client.on('connect',function(){
    console.log("Redis Connected Successfully");
})

//if redis is not connect then print error
client.on("error",function(error){
    console.log("Somethings Wrong",error)
})