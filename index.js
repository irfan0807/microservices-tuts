const { ServiceBroker } = require("moleculer");
const broker = new ServiceBroker();

//greeter broker

broker.createService({
  name: "greeter",
  actions: {
    sayHello(ctx) {
      return `hello ${ctx.params.name}`;
    },
  },
});

const startApp = async () => {
  await broker.start();
  const res = await broker.call('greeter.sayHello', { name: 'jhon' });
  console.log(res);
  broker.stop();
};

startApp();
