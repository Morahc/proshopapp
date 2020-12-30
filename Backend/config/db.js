import mongoose from 'mongoose'

const connectDB = async() => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI , {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true
    })

    console.log(`MongoDB Connect: ${conn.connection.host}`.cyan)
    
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold) 
    process.exit(1)
  }
}

export default connectDB