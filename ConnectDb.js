const mongoose = require("mongoose");

module.exports = async (req, res) => {
  const mongoUri = `mongodb+srv://taskTwo:9F1pUYNyfLCK52Bx@cluster0.8hu4pk0.mongodb.net/?retryWrites=true&w=majority`;

  try {
    const connect = await mongoose.connect(
      mongoUri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
        console.log(`SuccessFully Connect to database`);
      }
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
