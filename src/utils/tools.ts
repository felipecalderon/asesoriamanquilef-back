export const usuarioNecesitaDocumento = {
    type: "function" as const,
    function: {
        name: "generarDocumento",
        description: "El usuario necesita crear y generar un contrato legal",
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