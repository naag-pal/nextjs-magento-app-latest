module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "jest": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-hooks",
        "@typescript-eslint",
    ],
    "rules": {
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-explicit-any": ["off"],
        // TODO - to fix prop-types
        "react/prop-types": "off",
        "react-hooks/exhaustive-deps" : "off",
        "jsx-a11y/media-has-caption": "off",
        "@typescript-eslint/no-var-requires": "off",
    }
}
