const mongoose = require('mongoose');
const chalk = require('chalk');

async function connect() {
  mongoose.set('strictQuery', false);

  console.log(chalk.blue(chalk.bold(`Database`)), (chalk.white(`>>`)), chalk.red(`MongoDB`), chalk.green(`is connecting...`))
  await mongoose.connect(process.env.MONGO_TOKEN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log(chalk.blue(chalk.bold(`Database`)), (chalk.white(`>>`)), chalk.red(`MongoDB`), chalk.green(`is ready!`))
  }).catch((err) => {
    console.log(chalk.red(`[ERROR]`), chalk.white(`>>`), chalk.red(`MongoDB`), chalk.white(`>>`), chalk.red(`Failed to connect to MongoDB!`), chalk.white(`>>`), chalk.red(`Error: ${err}`))
    console.log(chalk.red("Exiting..."))
    process.exit(1)
  })

  mongoose.connection.on("error", (err) => {
    console.log(chalk.red(`[ERROR]`), chalk.white(`>>`), chalk.red(`Database`), chalk.white(`>>`), chalk.red(`Failed to connect to MongoDB!`), chalk.white(`>>`), chalk.red(`Error: ${err}`))
    console.log(chalk.red("Exiting..."))
    process.exit(1)
  });
  return;
}

module.exports = async () => await new Promise(connect)