module.exports = {
    "settings": {
        "react": {
            "createClass": "createReactClass",      // Regex for Component Factory to use,
            "pragma": "React",                      // Pragma to use, default to "React"
            "fragment": "Fragment",                 // Fragment to use (may be a property of <pragma>), default to "Fragment"
            "version": "detect",                    // React version. "detect" automatically picks the version you have installed.
            "flowVersion": "0.53"                   // Flow version
        },
        "propWrapperFunctions": [
            // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
            "forbidExtraProps",
            {
                "property": "freeze",
                "object": "Object"
            },
            {
                "property": "myFavoriteWrapper"
            },
            // for rules that check exact prop wrappers
            {
                "property": "forbidExtraProps",
                "exact": true
            }
        ],
        "componentWrapperFunctions": [
            // The name of any function used to wrap components, e.g. Mobx `observer` function. If this isn't set, components wrapped by these functions will be skipped.
            "observer",
            {
                "property": "styled"
            },
            {
                "property": "observer",
                "object": "Mobx"
            },
            {
                "property": "observer",
                "object": "<pragma>"
            }
        ],
        "formComponents": [
            // Components used as alternatives to <form> for forms, eg. <Form endpoint={ url } />
            "CustomForm",
            {
                "name": "Form",
                "formAttribute": "endpoint"
            }
        ],
        "linkComponents": [
            // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
            "Hyperlink",
            {
                "name": "Link",
                "linkAttribute": "to"
            }
        ]
    },
    plugins: [
        "react",
        "@typescript-eslint",
        "import"
    ],
    "env": {
        "browser": true,
        "es2021": true
    },
    extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: "latest",
        sourceType: "module"
    },
    settings: {
        "import/parsers": {
            "@typescript-eslint/parser": [".ts"]
        },
        "import/resolver": {
            "typescript": {
                "alwaysTryTypes": true,
                "project": "./tsconfig.json"
            }
        },
    },
    rules: {
        "indent": "off",
        "@typescript-eslint/indent": [
            "error",
            4,
            {
                "SwitchCase": 1
            }
        ],
        "quotes": [
            "warn",
            "double"
        ],
        "prefer-const": "warn",
        "semi": [
            "warn",
            "always"
        ],
        "object-curly-spacing": [
            "warn",
            "always"
        ],
        "sort-imports": [
            "warn",
            {
                ignoreCase: false,
                ignoreDeclarationSort: true,
                ignoreMemberSort: false,
                memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
                allowSeparatedGroups: true
            }
        ],
        "import/no-unresolved": "error",
        "import/order": [
            "warn",
            {
                groups: [
                    "builtin",
                    "external",
                    "internal",
                    ["sibling", "parent"],
                    "index",
                    "unknown"
                ],
                "newlines-between": "always",
                alphabetize: {
                    order: "asc",
                    caseInsensitive: true
                }
            }
        ]
    }
};