module.exports = {
    "root": true,
    "extends": "airbnb",
    "env": {
        "browser": true,
        "es6": true
    },
    "parser": 'babel-eslint',
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        // 关闭未定义抛错
        'no-undef': "off",
        "comma-dangle": 0,
        "react/destructuring-assignment": ["error", "never"],
        "react/prop-types": [0, { ignore: true }],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/prefer-stateless-function": [0, { "ignorePureComponents": true }],
        "react/destructuring-assignment": [0, "always", { "ignoreClassFields": true }],
        "no-use-before-define": ["warn", { "functions": true, "classes": true }],
        "no-param-reassign": ["warn", { "props": false }],
        // 方法括号空格校验
        "space-before-function-paren": ["error", {
          "anonymous": "never",
          "named": "never",
          "asyncArrow": "always"
        }],
        "indent": [
            "error",
            2
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ]
    }
};