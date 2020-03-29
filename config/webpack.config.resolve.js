const path = require("path");
const paths = require("./paths");

const libPath = "node_modules/@UI/src/lib/";
const constantsPath = "node_modules/@UI/src/constants/";
const componentsPath = "node_modules/@UI/src/components/";
const utilsPath = "node_modules/@UI/src/utils/";
const stylePath = "node_modules/@UI/src/styles/";
const amendmentsContainersPath = "src/containers/";
const amendmentsUtilsPath = "src/utils/";
const amendmentsContextPath = "src/context/";
const amendmentsConstantsPath = "src/constants/";
const amendmentsIconsPath = "src/icons/";
const amendmentsComponentsPath = "src/components/";

module.exports = {
  alias: {
    Lib: path.resolve(paths.appRoot, libPath),
    Constants: path.resolve(paths.appRoot, constantsPath),
    Components: path.resolve(paths.appRoot, componentsPath),
    Utils: path.resolve(paths.appRoot, utilsPath),
    Styles: path.resolve(paths.appRoot, stylePath),
    AmendmentsContainers: path.resolve(paths.appRoot, amendmentsContainersPath),
    AmendmentsUtils: path.resolve(paths.appRoot, amendmentsUtilsPath),
    AmendmentsContext: path.resolve(paths.appRoot, amendmentsContextPath),
    AmendmentsConstants: path.resolve(paths.appRoot, amendmentsConstantsPath),
    AmendmentsIcons: path.resolve(paths.appRoot, amendmentsIconsPath),
    AmendmentsComponents: path.resolve(paths.appRoot, amendmentsComponentsPath)
  }
};
