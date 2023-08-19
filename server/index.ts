import mongoose from "mongoose";

const config = useRuntimeConfig();

export default async () => {
  await mongoose.connect(config.mongoose.url);
};
