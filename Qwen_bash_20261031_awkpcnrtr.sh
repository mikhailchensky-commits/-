# 1. Создаем проект Vite React
npm create vite@latest armor-evolution -- --template react
cd armor-evolution

# 2. Устанавливаем основные зависимости
npm install three @react-three/fiber @react-three/drei framer-motion lucide-react

# 3. Устанавливаем Tailwind CSS и его зависимости
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p