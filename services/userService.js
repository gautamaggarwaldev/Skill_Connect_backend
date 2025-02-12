import User from "../schema/userSchema.js";

const getUserById = async(id) => {
    try{
        const user = await User.findById(id);
        return user;
    }
    catch(error) {
        console.log(error);
    }
}

const updateUser = async(id, data) => {
    try{
        //{ new: true } ensures that the updated document is returned instead of the old one.
        const user = await User.findByIdAndUpdate(id, data, {new: true}); 
        return user;
    }
    catch(error) {
        console.log(error);
    }
}

const updateUserPhoto = async(id, photoUrl) => {
    try{
        const user = await User.findByIdAndUpdate(id, {photoUrl}, {new: true});
        return user;
    }
    catch(error) {
        console.log(error);
    }
}

const updateUserProfile = async(id, profileData) => {
    try{
        const user = await User.findByIdAndUpdate(id, {profile: profileData}, {new: true});
        return user;
    }
    catch(error) {
        console.log(error);
    }
}


export { getUserById, updateUser, updateUserPhoto, updateUserProfile };
