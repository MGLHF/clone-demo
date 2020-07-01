module.exports = {
  "env": {
    "browser": true,
    "es2020": true,
  },
  "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
  ],
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 11,
      "sourceType": "module"
  },
  "plugins": [
      "react"
  ],
  "rules": {
    "react-hooks/exhaustive-deps": 0,
    "indent": [2, 2],
    "react/prop-types": 0,
    "quotes": [2, "single"], // 使用单引号
    "semi": [2, "always"], // 使用分号
    // "array-bracket-spacing": [2, "always"], // 数组元素之间带空格
    "object-curly-spacing": [2, "always"],
    "comma-dangle": [2, "always-multiline"], // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗,always-multiline：多行模式必须带逗号，单行模式不能带逗号号。
    "key-spacing": [2, { "beforeColon": false, "afterColon": true }] // 在对象字面量语法中，key和value之间的空白，冒号前不要空格，冒号后面需要一个空格。
  }
};
