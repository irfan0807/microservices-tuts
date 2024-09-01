const { ServiceBroker } = require("moleculer");
const broker = new ServiceBroker();





broker.createService({
  name: "email",
  actions: {
    async sendEmail(ctx){
        const {recipient,subject,content} = ctx.params;
        //Simulating the email logic
        console.log(`sending email ${recipient} with subject ${subject}`);
        console.log(`content ${content}`);
        return `Email sent to ${recipient}`



    }
  
  },
});

module.exports = broker;
