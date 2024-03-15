module.exports = {
    root: true,
    env: {
        "browser": true,
        "es2021": true
    },
    extends: [
        "plugin:vue/strongly-recommended",
        "plugin:vue/vue3-essential",
        "plugin:@typescript-eslint/recommended",
        "eslint:recommended",
        "prettier"
    ],
    parserOptions: {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    plugins: [
        "@typescript-eslint",
        "vue",
        "prettier"
    ],
    rules: {
    }
}
