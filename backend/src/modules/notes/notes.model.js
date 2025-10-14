import mongoose from "mongoose";

const note_schema = new mongoose.Schema(
    {
        tite: {type: String, required: True, trim: True, default: "Blank Note"},
        content: {type: String, required: True},
        user: {type: mongoose.Schema.Types.ObjectID, ref: "User", required: True}
    }
);

const Note = mongoose.model("Note", note_schema);

export default Note;