export const usuarioNecesitaDocumento = {
    type: "function" as const,
    function: {
        name: "generarDocumento",
        description: "Determina si la consulta necesita un documento",
        parameters: {
            type: "object",
            properties: {
                query: {
                    type: "string",
                    description: "La consulta del usuario",
                },
            },
            required: ["query"],
        },
    },
}