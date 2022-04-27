# First config

#### Configuracion inicial para vite con react

```bash
npm create vite@latest
> Select y, name_project & cd name_project
cd fronted
(frontend) npm i axios react-router-dom
(frontend) npm run dev
Local: http://localhost:3000/
```

## Install tailwindcss on root project
```bash
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Config tailwind.config.js
```json
module.exports = {
  content: [
    "index.html", "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
## Edit index.css
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
