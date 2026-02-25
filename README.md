# React + TypeScript + Vite

```code
src/
  app/
    App.tsx
  domain/
    numberMatch/
      engine/
        createGame.ts
        reducer.ts
        selectors.ts
        serialization.ts
      rules/
        match.ts
        connect.ts
        dealMore.ts
      types.ts
      index.ts
  store/
    useGameStore.ts
  features/
    numberMatch/
      NumberMatchPage.tsx
      components/
        Board/Board.tsx
        Board/Cell.tsx
        HUD/HUD.tsx
      styles/ (optional feature-scoped)
  styles/
    abstracts/_variables.scss
    base/_reset.scss
    main.scss
  main.tsx
tests/
  numberMatch/connect.test.ts
  numberMatch/match.test.ts
  numberMatch/reducer.test.ts

```
