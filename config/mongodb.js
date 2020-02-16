let mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect("mongodb://client:azerty123@ds219839.mlab.com:19839/groupe_nat", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (x) {
        console.error(x);
        console.error("The connexion with mongo server failed.");
        process.exit(1);
    }
    console.log("Connexion with mongo server success.");
};
