import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient().$extends({
    query: {
        tarefa: {
            async create({ args, query }) {
                const { nome, descricao, prioridade } = args.data;

                if (!nome) throw new Error("O parâmetro Nome é obrigatório");

                if (nome.length < 5)
                    throw new Error(
                        "O parâmetro Nome deve ter no mínimo 5 caracteres"
                    );

                if (nome.length > 50)
                    throw new Error(
                        "O parâmetro Nome deve ter no máximo 50 caracteres"
                    );

                if (!descricao)
                    throw new Error("O parâmetro Descrição é obrigatório");

                if (descricao.length > 140)
                    throw new Error(
                        "O parâmetro Descrição deve ter no máximo 140 caracteres"
                    );

                if (
                    prioridade &&
                    !["ALTA", "MEDIA", "BAIXA"].includes(
                        prioridade.toUpperCase()
                    )
                )
                    throw new Error(
                        "O parâmetro Prioridade deve ser um dos seguintes valores: ALTA, MEDIA, BAIXA"
                    );

                return query(args);
            },
        },
    },
});

export { prisma };
