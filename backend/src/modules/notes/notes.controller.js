import { normalize_system_error_response } from "../../custom.middleware.js";
import Note from "./notes.model.js";

// Create and save a new note
export const create_note = async (request, response) => {
    try {
        const { title, content } = request.body;
        const user_id = request.user && (request.user.id || request.user._id);

        if (!user_id) {
            return response.error({}, "User not authenticated", 401);
        }

        // Uses default "Blank Note" if undefined
        const note = new Note({title: title || undefined, content, user: user_id});

        await note.save();

        return response.success({ note }, "Note saved successfully!", 201);
    } catch (error) {
        return normalize_system_error_response(error, response);
    }
};

// Get all notes for the logged-in user
export const get_notes = async (request, response) => {
    try {
        const user_id = request.user && (request.user.id || request.user._id);

        if (!user_id) {
            return response.error({}, "User not authenticated", 401);
        }

        const notes = await Note.find({ user: user_id }).sort({ updated_at: -1 });

        return response.success({ notes }, "Notes retrieved successfully!", 200);
    } catch (error) {
        return normalize_system_error_response(error, response);
    }
};

// Update an existing note
export const update_note = async (request, response) => {
    try {
        const { id } = request.params;
        const { title, content } = request.body;
        const user_id = request.user && (request.user.id || request.user._id);

        const note = await Note.findOneAndUpdate(
            { _id: id, user: user_id },
            { title, content },
            { new: true }
        );

        if (!note) {
            return response.error({}, "Note not found or unauthorized", 404);
        }

        return response.success({ note }, "Note updated successfully!", 200);
    } catch (error) {
        return normalize_system_error_response(error, response);
    }
};

// Delete a note
export const delete_note = async (request, response) => {
    try {
        const { id } = request.params;
        const user_id = request.user && (request.user.id || request.user._id);

        const note = await Note.findOneAndDelete({ _id: id, user: user_id });

        if (!note) {
            return response.error({}, "Note not found or unauthorized", 404);
        }

        return response.success({}, "Note deleted successfully!", 200);
    } catch (error) {
        return normalize_system_error_response(error, response);
    }
};
