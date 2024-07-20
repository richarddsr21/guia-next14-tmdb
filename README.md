# Guia passo a passo a como usar a API do TMDB com next14, typescript react e axios.

## Passo a Passo

### 1. Configuração Inicial

1. Crie um novo projeto Next.js com TypeScript:

   ```bash
   npx create-next-app@latest guia-next14-tmdb --typescript
   cd guia-next14-tmdb
   ```

2. Instale as dependências necessárias:

   ```bash
   yarn add axios
   ```

3. Crie uma conta no [TMDB](https://www.themoviedb.org) e obtenha uma chave de API.

### 2. Configuração da API

1. Crie um arquivo para configurar a instância do Axios:

- Crie `src/lib/tmdb.ts`:

  ```typescript
  import axios from "axios";

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";

  const tmdbApi = axios.create({
    baseURL: BASE_URL,
    params: {
      api_key: API_KEY,
      language: "pt-BR",
    },
  });

  export default tmdbApi;
  ```

### 3. Configuração do Next.js para Imagens

1. Configure o `next.config.js`:

   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     images: {
       domains: ["image.tmdb.org"],
     },
   };

   module.exports = nextConfig;
   ```

### 4. Criar Componentes

1. Crie uma interface para o tipo de dados que você vai usar:

   - Crie `src/types/movie.ts`:

     ```typescript
     import Image from "next/image";
     import React, { useEffect, useState } from "react";
     import tmdbApi from "../lib/tmdb";
     import { Movie } from "../types/movie";

     interface CategoryMovieListProps {
       category: string;
     }

     const CategoryMovieList: React.FC<CategoryMovieListProps> = ({
       category,
     }) => {
       const [movies, setMovies] = useState<Movie[]>([]);

       useEffect(() => {
         const fetchMovies = async () => {
           try {
             const response = await tmdbApi.get(`/movie/${category}`);
             console.log(response);
             setMovies(response.data.results);
           } catch (error) {
             console.error(`Error fetching ${category} movies:`, error);
           }
         };
         fetchMovies();
       }, [category]);

       return (
         <div>
           <h1>
             {category.charAt(0).toUpperCase() + category.slice(1)} Movies
           </h1>
           <div className="flex flex-wrap">
             {movies.map((movie) => (
               <div key={movie.id} className="w-[200px] m-[10px] text-center">
                 <Image
                   className="w-full rounded-md"
                   src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                   alt={movie.title}
                   width={500}
                   height={750}
                 />
                 <h2>{movie.title}</h2>
                 <p>{movie.overview}</p>
               </div>
             ))}
           </div>
         </div>
       );
     };

     export default CategoryMovieList;
     ```

### 5. Configurar Rotas e Páginas

1. Crie a estrutura de páginas:

   - Modifique `src/app/page.tsx` para usar o componente de lista de filmes:

     ```typescript
     import React from "react";
     import CategoryMovieList from "../components/MovieList";

     const HomePage: React.FC = () => {
       return (
         <div>
           <CategoryMovieList category="popular" />
         </div>
       );
     };

     export default HomePage;
     ```

   - Crie `src/app/top-rated/page.tsx`:

     ```typescript
     import React from "react";
     import CategoryMovieList from "../../components/MovieList";

     const TopRatedPage: React.FC = () => {
       return (
         <div>
           <CategoryMovieList category="top_rated" />
         </div>
       );
     };

     export default TopRatedPage;
     ```

   - Crie `src/app/upcoming/page.tsx`:

     ```typescript
     import React from "react";
     import CategoryMovieList from "../../components/MovieList";

     const UpcomingPage: React.FC = () => {
       return (
         <div>
           <CategoryMovieList category="upcoming" />
         </div>
       );
     };

     export default UpcomingPage;
     ```

   - Crie `src/app/now-playing/page.tsx`:

     ```typescript
     import React from "react";
     import CategoryMovieList from "../../components/MovieList";

     const NowPlayingPage: React.FC = () => {
       return (
         <div>
           <CategoryMovieList category="now_playing" />
         </div>
       );
     };

     export default NowPlayingPage;
     ```

2. Adicione Navegação:

   - Crie `src/components/Navigation.tsx`:

     ```typescript
     import React from "react";
     import Link from "next/link";

     const Navigation: React.FC = () => {
       return (
         <nav>
           <ul>
             <li>
               <Link href="/">Popular</Link>
             </li>
             <li>
               <Link href="/top-rated">Top Rated</Link>
             </li>
             <li>
               <Link href="/upcoming">Upcoming</Link>
             </li>
             <li>
               <Link href="/now-playing">Now Playing</Link>
             </li>
           </ul>
         </nav>
       );
     };

     export default Navigation;
     ```

   - Use esse componente de navegação no seu layout:

     - Crie `src/app/layout.tsx`:

       ```typescript
       import React from "react";
       import Navigation from "../components/Navigation";
       import "../styles/globals.css";

       const Layout: React.FC = ({ children }) => {
         return (
           <div>
             <Navigation />
             <main>{children}</main>
           </div>
         );
       };

       export default Layout;
       ```

### 6. Execute o Projeto

1. Inicie o servidor de desenvolvimento:

   ```bash
   yarn dev
   ```

2. Abra o navegador e vá para `http://localhost:3000` para ver a lista de filmes populares.

## Estrutura de Pastas

Sua estrutura de pastas deve se parecer com isso:

```lua
guia-next14-tmdb/
├── public/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── top-rated/
│   │   │   └── page.tsx
│   │   ├── upcoming/
│   │   │   └── page.tsx
│   │   └── now-playing/
│   │       └── page.tsx
│   ├── components/
│   │   ├── MovieList.tsx
│   │   └── Navigation.tsx
│   ├── lib/
│   │   └── tmdb.ts
│   ├── styles/
│   │   └── globals.css
│   └── types/
│       └── movie.ts
├── .env.local
├── next.config.js
├── package.json
└── tsconfig.json
```

###### Agora você tem um projeto Next.js 14 configurado para exibir filmes de diferentes categorias usando a API TMDB. Sinta-se à vontade para expandir e personalizar conforme necessário!
