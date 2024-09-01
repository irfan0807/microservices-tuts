const { ServiceBroker } = require("moleculer");
const broker = new ServiceBroker();





broker.createService({
  name: "auth",
  actions: {
    async authUser(ctx){
        const {username,password} = ctx.params;
        if(username === 'admin' && password === 'password'){
            return {
                success:true,
                message:'Auth was successfull',
                username
            };
             
        }else{
            return {
                success:false,
                message:"Authication failed",
                username

            }
        }
    }
    
  
  },
});

module.exports = broker;
