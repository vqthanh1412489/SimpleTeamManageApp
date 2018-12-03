const { User } = require('../models/User');
const { compare, hash } = require('bcrypt');

class UserServie {
    static async signUp(email, password, name){
        const encrypted = await hash(password, 8);
        const user = new User({ email, password: encrypted, name });
        await user.save();
        const inforUser = user.toObject();
        delete inforUser.password;
        return inforUser;
    }

    static async signIn(email, password){
        const user = await User.findOne({ email });
        if (!user) throw new Error('User not exists');
        const same = await compare(password, user.password);
        if (!same) throw new Error('Password invalid');
        const inforUser = user.toObject();
        delete inforUser.password;
        return inforUser;
    }
}

module.exports = { UserServie };