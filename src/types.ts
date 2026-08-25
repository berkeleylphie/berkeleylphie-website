// Shared types used across pages and layout components (Header, Footer).
//
// Page is the set of real URL paths the app routes to (see the <Routes> in
// App.tsx) — use it wherever code passes a path to navigate() or <Link to>,
// so a typo'd path is a type error instead of a silent dead link.

export type Page =
  | '/'
  | '/about'
  | '/brothers'
  | '/executives'
  | '/alumni'
  | '/rush'
  | '/login'
  | '/portal'
  | '/profile'
  | '/coming';
