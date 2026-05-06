
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Message } from "../models/messageSchema.js";

// ---------------- CREATE MESSAGE ---------------- //
export const sendMessage = catchAsyncErrors(async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  const newMessage = await Message.create({
    firstName,
    lastName,
    email,
    phone,
    message,
  });

  res.status(201).json({
    success: true,
    message: "Message sent successfully",
    data: newMessage,
  });
});


// ---------------- GET ALL MESSAGES ---------------- //
export const getAllMessages = catchAsyncErrors(async (req, res) => {
  const messages = await Message.find();

  res.status(200).json({
    success: true,
    count: messages.length,
    data: messages,
  });
});


// ---------------- DELETE MESSAGE ---------------- //
export const deleteMessage = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  const message = await Message.findById(id);

  if (!message) {
    return res.status(404).json({
      success: false,
      message: "Message not found",
    });
  }

  await message.deleteOne();

  res.status(200).json({
    success: true,
    message: "Message deleted successfully",
  });
});