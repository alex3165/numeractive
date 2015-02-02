var NumeractiveInstaller = require('./installer/installer')

switch (process.argv[2]){
    case "database":
        NumeractiveInstaller.run();
        break;
    default:
        console.log("You must pass an argument according to what you want to do:")
        console.log("database           Configure database")
}