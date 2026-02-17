// Usar globalThis para garantizar una única instancia compartida en todo el servidor
declare global {
  var __TEMP_KEY_VAL_DB: Record<string, ShortenURLResult> | undefined;
}

// Inicializar solo si no existe
if (!global.__TEMP_KEY_VAL_DB) {
  global.__TEMP_KEY_VAL_DB = {
    abc123: {
      slug: "abc123",
      longUrl: "https://www.example.com/some/long/url",
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Expires in 7 days
      type: "temporaly",
    },
    def456: {
      slug: "def456",
      longUrl: "https://www.anotherexample.com/another/long/url",
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Expires in 7 days
      type: "permanent",
    },
  };
}

// Exportar la referencia global
export const TEMP_KEY_VAL_DB = global.__TEMP_KEY_VAL_DB;
