# eCommerce Application 🛍️🌐
---
Welcome to our eCommerce application! This platform replicates real-world shopping experiences in a digital environment. It provides an interactive and seamless online shopping experience for users. They can browse a wide range of products, view detailed descriptions, add items to their basket, and proceed to checkout. The application includes features such as user registration and login, product search, categorization, and sorting. It is responsive and optimized for various devices. The application is powered by **CommerceTools**, a leading provider of commerce solutions for B2C and B2B enterprises.

---
# Technology stack:
##### 1. TypeScript
##### 2. The application is a Single Page Application (SPA)
##### 3. HTML, CSS
##### 4. Vite

---
# Setup instructions
*Note that you need the latest stable version of Node.js.  You can download it from [this link](https://nodejs.org/en/download) for NODE and [this link](https://git-scm.com/download/win) for git .*
##### 1. Clone this repository using `git clone` 
##### 2. Run `git bash` in the repository folder.
##### 3. Run `npm i` to install all dependencies.
##### 4. Use `npm run build` to run the application.

---
# Scripts

### Dev script
The "dev" script in the package.json file runs the "vite" command, which starts the development server. It allows developers to work on the project in a local development environment, providing features like hot module replacement and fast reloading.
```bash
npm run dev
```

### Build script
The "build" command first compiles the TypeScript code and then builds and optimizes the project for production use.
```bash
npm run build
```
### Preview script
The "preview" command launches a development server that displays your application in the browser, so you can check and test it in real-time.
```bash
npm run preview
```

### Test script 
The "test" command allows running tests to verify the functionality of the project and identify potential problems.
```bash
npm run test
```

### Lint script 
The "lint" script in the package.json file runs the ESLint tool on the project. It checks the JavaScript and TypeScript files for potential errors, style violations, and adherence to best practices. The specified file extensions (.js, .cjs, .ts, .tsx) determine which files are included in the linting process. By running the "lint" script, developers can identify code issues and ensure that the codebase follows consistent coding standards and quality guidelines.
```bash
npm run lint
```

### Lint:fix script 
The "lint:fix" script in the package.json file automatically fixes linting issues in the project by using the ESLint tool with the --fix flag. It helps developers quickly address common code issues and improve code quality without manual intervention.
```bash
npm run lint:fix
```

### Typecheck script 
The "typecheck" script in the package.json file performs type checking on the project without emitting any output. It helps identify type-related errors and ensure type safety in the codebase.
```bash
npm run typecheck
```

### Prepare script 
The "prepare" script is used to install the Husky package. Husky is a Git hook manager that allows you to run scripts at specific points in your Git workflow. By running the "prepare" script, Husky is installed and set up to enable Git hooks for your project.
```bash
npm run prepare
```

### Сommitlint script 
The "commitlint" script is used to run the commitlint tool with the "--edit" flag. commitlint is a tool that enforces a specific commit message format or convention in your Git repository. By running the "commitlint" script with the "--edit" flag, it opens an interactive prompt where you can edit your commit message and ensures that it adheres to the specified commit message format or convention.
```bash
npm run commitlint
```

### Format script 
The "format" script is used to format code using the Prettier tool. Prettier is a code formatter that helps maintain consistent code style across your project. Running the "format" script with the specified command will automatically format all JavaScript, JSX, TypeScript, and TSX files in the "src" directory and its subdirectories. It applies the defined code formatting rules and updates the files in-place, making it easy to ensure consistent code style throughout your project.
```bash
npm run format
```

