/** @format */

import mongoose from "mongoose";

const { Schema, model } = mongoose;

const usersSchema = new Schema({});

export default model("User", usersSchema);
