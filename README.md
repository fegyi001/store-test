# StoreTest

## Add and configure `eslint` & `stylelint` & `prettier`

### Add `eslint` to Angular

```bash
# See https://github.com/angular-eslint/angular-eslint
ng add @angular-eslint/schematics
```

### Install npm packages for `stylelint`, `eslint`, `prettier` and some plugins
 
```bash
# I know this is a lot but it's worth it, trust me
yarn add -D eslint-config-prettier eslint-plugin-prettier eslint-plugin-simple-import-sort eslint-plugin-unused-imports prettier prettier-eslint postcss postcss-scss stylelint stylelint-config-property-sort-order-smacss stylelint-config-recommended-scss stylelint-config-sass-guidelines stylelint-order stylelint-scss
```

### Rename `.eslintrc.json` to `.eslintrc.js`, and paste the following contents in it:

```js
module.exports = {
  root: true,
  ignorePatterns: [
    "projects/**/*"
  ],
  env: {
    node: true,
    es6: true
  },
  overrides: [
    {
      files: [
        "*.ts"
      ],
      parserOptions: {
        ecmaVersion: 2020,
        project: [
          "tsconfig.json"
        ],
        createDefaultProgram: true
      },
      plugins: [
        "simple-import-sort",
        "unused-imports"
      ],
      extends: [
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "plugin:prettier/recommended"
      ],
      rules: {
        "@angular-eslint/directive-selector": [
          "error",
          {
            type: "attribute",
            prefix: "app",
            style: "camelCase"
          }
        ],
        "@angular-eslint/component-selector": [
          "error",
          {
            type: "element",
            prefix: "app",
            style: "kebab-case"
          }
        ],
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        "no-unused-vars": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
          "warn",
          { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
        ]
      }
    },
    {
      files: [
        "*.html"
      ],
      extends: [
        "plugin:@angular-eslint/template/recommended"
      ],
      rules: {}
    }
  ]
}
```

### Update angular.json

In `angular.json` the `lint` part should look line this:

```json
"lint": {
  "builder": "@angular-eslint/builder:lint",
  "options": {
    "eslintConfig": ".eslintrc.js",
    "lintFilePatterns": [
      "src/**/*.ts",
      "src/**/*.html"
    ]
  }
}
```

### Create `.stylelintrc.yml` with the following content:

```yml
extends:
    - stylelint-config-recommended-scss
    - stylelint-config-property-sort-order-smacss
    - stylelint-config-sass-guidelines
plugins:
    - stylelint-scss
rules:
    max-nesting-depth: null
    selector-max-compound-selectors: null
    selector-class-pattern: null
    scss/dollar-variable-pattern: null
    no-empty-source: null
    selector-pseudo-element-no-unknown: null
    scss/no-global-function-names: null
    order/properties-order: null
    function-parentheses-space-inside: null
```

### Create `.prettierrc.json` with the following content:

```json
{
    "bracketSpacing": true,
    "semi": false,
    "singleQuote": true,
    "trailingComma": "none",
    "endOfLine": "auto",
    "printWidth": 80
}
```

### Create `.prettierignore` with the following content:

```bash
package.json
package-lock.json
yarn.lock
dist
```

## VSCode settings (pretty sure for WebStorm there are also plugins and settings just like this)

### plugins

For VSCode, install the following plugins: 

- Eslint (`dbaeumer.vscode-eslint`)
- Prettier (`esbenp.prettier-vscode`)
- Stylelint (`stylelint.vscode-stylelint`)

### settings.json

Update (or crete) the `.vscode/settings.json` file with the following content:

```json
{
  "files.exclude": {
    "**/.git": true,
    "**/.svn": true,
    "**/.hg": true,
    "**/CVS": true,
    "**/.DS_Store": true,
    "node_modules": true,
  },
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "eslint.format.enable": true,
  "stylelint.enable": true,
  "css.validate": false,
  "scss.validate": false,
  "[javascript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
  },
  "[typescript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "stylelint.validate": ["css", "scss"]
}
```

You may have to restart your IDE.

## Run the first linting

```bash
yarn lint
# or
npm run lint
```

You can try to auto fix what is possible to fix:

```bash
yarn lint --fix
```

## Create script for linting styles

In package.json, add the following script:

```json
{
  "stylelint": "stylelint",
}
```

## Run the first style linting

```bash
yarn stylelint "**/*.scss"
# or
npm run stylelint "**/*.scss"
```

You can try to auto fix what is possible to fix:

```bash
yarn stylelint "**/*.scss" --fix
```

## Add Git hooks (here: pre-commit)

### Install husky

```bash
yarn add -D husky
```

### Add and run new script

Add to package.json scripts:

```json
{
  "prepare": "husky install"
}
```

### Run the new script

```bash
yarn prepare
# or
npm run prepare
```

This installs Git hooks which are in the `.husky` folder

### Add pre-commit hook

Add a new file called `pre-commit` to the `.husky` folder with the following content:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Run linters (ts and scss)
npm run ng lint --fix
npm run stylelint --fix "**/*.scss"
# Add to commit since files were potentially changed
git add .
```

### Run `preinstall` again

Run again the `preinstall` script since a new Git hook was added:

```bash
yarn prepare
```

### Try it out

```bash
git add .
git commit -m "husky test"
```
