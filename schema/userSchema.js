import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    photoUrl: {
        type: String,
        default: "",
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"] //regex  --> regular expression
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password must be at least 8 characters long"],
        maxlength: [1024, "Password cannot be more than 1024 characters"],
        select: false,
    },
    verified:{
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ["student", "mentor"],
        default: null,
    },
    profile: {
        tags: {
            type: String,
            default: "",
        },
        title: {
            type: String,
            default: "",
        },
        bio: {
            type: String,
            default: "",
        },
        college: {
            type: String,
            default: "",
        },
        socialLinks: {
            linkedin: {
                type: String,
                default: "",
            },
            github: {
                type: String,
                default: "",
            },
            twitter: {
                type: String,
                default: "",
            },
            facebook: {
                type: String,
                default: "",
            },
            instagram: {
                type: String,
                default: "",
            },
        },
    },
        
}, {
    timestamps: true,
});

// compare password
userSchema.methods.isPasswordMatch = async function(password) {
    return await bcrypt.compare(password, this.password);
};

//Pre-save hook for password hashing
userSchema.pre("save", async function(next){
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

const User = mongoose.model("User", userSchema);

export default User;
