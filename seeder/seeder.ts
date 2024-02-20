import Room from "../backend/models/room";
import mongoose from "mongoose";
import { rooms } from "./data";

const seedData = async () => {
  try {
    const pass = encodeURIComponent("Yash(@2002)")
    await mongoose.connect(`mongodb+srv://yash:${pass}@book-it.laoalfh.mongodb.net/book-it?retryWrites=true&w=majority`);

    await Room.deleteMany();
    console.log("Delted Old Rooms Data!");
    await Room.insertMany(rooms);
    console.log("Added Nwe Rooms Data");

    process.exit();
  } catch (error) {
    console.log(error);
    // exit from the process;
    process.exit();
  }
};
seedData();
// steps
// 1 - We've to connect to DB
// 2 - Delete the old rooms data from DB
// 3 - Add the rooms in DB;

// We have added seeder in package.json in scripts , that is working as follows
/*
    1st we need to compile the ts file to js
     tsc seeder/seeder.ts - It will compile that file to js
     --outDir .temp - It will create .temp folder in root and will put the compile file in that directory
     node .temp/seeder/seeder.ts - It will run that compiled file
     rm --rf .temp - It will remove that folder after seeding the data
     to run this we can use  - npm run seeder
*/
