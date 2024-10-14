const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("GreenishDB connected");
  } catch (error) {
    console.log("GreenishDB connection failed", error.message);
  }
};

connectDB();
