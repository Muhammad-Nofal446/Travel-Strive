import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// export const  registerUser = async(req)=> {
//   try{const {username, email, password, phone, country,img,isAdmin,city} = req.body;
//   const newUser = new User({
//     username: username,
//     email: email,
//     country: country,
//     img: img,
//     city: city,
//     phone: phone,
//     password: password,
//     isAdmin: isAdmin,
//   });
//   newUser.save()
// }
//   catch(error){
//     console.log(error);
//   }

// }
