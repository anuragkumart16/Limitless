import mongoose, { Schema } from "mongoose";

const todoGroupSchema = new Schema(
    {
        groupname: {
            type: String,
            required: true,
            trim: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
        completed: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
);

export const TodoGroup = mongoose.model("TodoGroup", todoGroupSchema);
