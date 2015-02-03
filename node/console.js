var NumeractiveInstaller = require('./src/commands/installer/installer')

switch (process.argv[2]){
    case "database":
        NumeractiveInstaller.run();
        break;
    case "add:admin":
        NumeractiveInstaller.addUser();
        break;
    default:
        console.log("You must pass an argument according to what you want to do:")
        console.log("database               Configure database")
        console.log("add:admin              add:administrator")
}