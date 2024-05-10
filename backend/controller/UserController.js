import UserModel from "../models/User.js";

const CreateUser = async (req, res) => {
  try {
    const { name, email, phone, Dob } = req.body;
    console.log(req.body);
    if (!name || !email || !phone || !Dob) {
      return res
        .status(400)
        .json({ success: false, Message: "Missing required fields." });
    }
    const NewUser = new UserModel({
      name,
      email,

      phone,

      Dob,
    });
    await NewUser.save();
    res
      .sendStatus(200)
      .json({ success: true, Message: "User Created Successfully." });
  } catch (error) {
    console.log(error);
    res
      .sendStatus(500)
      .json({ success: false, Message: "internal server error." });
  }
};

// read api
const GetUser = async (req, res) => {
  try {
    const user = await UserModel.find();
    if (!user) {
      return res
        .sendStatus(404)
        .json({ success: false, Message: "user not found" });
    }
    res.sendStatus(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res
      .sendStatus(500)
      .json({ success: false, Message: "internal error" });
  }
};

// update api
const UpdateUser = async () => {
  try {
    const userId = req.prams.userId;
    const UpdatedUser = await UserModel.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    if (!UpdatedUser) {
      return res
        .sendStatus(404)
        .json({ success: false, Message: "user not found" });
    }
    res.sendStatus(200).json({
      success: true,
      Message: "user update successfully",
      UpdatedUser,
    });
  } catch (error) {
    console.log(error);
    return res
      .sendStatus(500)
      .json({ success: false, Message: "internal error" });
  }

  // delete user API
};
const DeleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletuser = await UserModel.findByIdAndDelete(userId);
    if (!deletuser) {
      return res
        .sendStatus(404)
        .json({ success: false, message: "user Not found" });
    }
    res
      .sendStatus(200)
      .json({ success: true, message: "user Deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .sendStatus(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export { CreateUser, GetUser, UpdateUser, DeleteUser };
