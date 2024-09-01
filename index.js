const UserService = require("./services/user.service");
const EmailService = require("./services/email.service");
const AuthService = require("./services/auth.service");

const startApp = async () => {
  // Start the broker, which will start the services
  await UserService.start();
  await EmailService.start();
  await AuthService.start();

  try {
    //Simulating the authentication of an user
    const authToken = await AuthService.call("auth.authUser", {
      username: "amin",
      password: "pasword",
    });
    if (!authToken.success) {
      console.log("Authication is failed as logged in user not an admin and!");
      return ;
    }
    console.log(`Logged in successfully as ${JSON.stringify(authToken.username)}`);
    // Simulate user creation
    const newUser = await UserService.call("user.createUser", {
      username: "john", // Fixed typo in "john"
      email: "john@gmail.com", // Fixed typo in "john"
    });
    console.log("New user created!", newUser);

    // Fetch all users
    const users = await UserService.call("user.getUser");
    console.log("All users:", users); // Moved this line outside the return statement
    //Simulating the sending email
    const emailResult = await EmailService.call("email.sendEmail", {
      recipient: newUser.email,
      subject: "Sending a Test Email",
      content:
        "Sending a Test Email to check wether the email service is working or not , I wish this service run without any error!",
    });
    if (!emailResult) {
      console.log(`unable to send the email`);
    }
    console.log(`Email sent successfull ${emailResult}`);

    return users; // Optional: return users if needed elsewhere
  } catch (error) {
    console.log("Error:", error);
  } finally {
    await UserService.stop(); // Stop the broker gracefully
    await EmailService.stop();
    await AuthService.stop();
  }
};

startApp();
