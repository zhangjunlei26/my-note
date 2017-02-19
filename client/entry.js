// require("!style-loader!css-loader!../css/style.css"); // 载入 style.css
require("./foo/style.css"); // 载入 style.css
document.write('It works again.\n<br>');
document.write(require('./foo/module.js')) // 添加模块
