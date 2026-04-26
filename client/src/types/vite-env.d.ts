/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_INTAKE_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
