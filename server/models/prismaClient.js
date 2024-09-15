import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient().$extends({
    query: {
        tarefa: {
            async create({ args, query }) {
                const { membroId, nome, descricao, prioridade } = args.data;

                if (!membroId)
                    throw new Error("O parâmetro MembroId é obrigatório");

                if (!nome) throw new Error("O parâmetro Nome é obrigatório");

                if (nome.length < 5)
                    throw new Error(
                        "O parâmetro Nome deve ter no mínimo 5 caracteres"
                    );

                if (nome.length > 50)
                    throw new Error(
                        "O parâmetro Nome deve ter no máximo 50 caracteres"
                    );

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
        membro: {
            async create({ args, query }) {
                const { email, nome, senha } = args.data;

                if (!email) throw new Error("O parâmetro Email é obrigatório");

                const emailExistente = await prisma.membro.findUnique({
                    where: { email },
                });

                if (emailExistente) {
                    throw new Error("O email já está em uso");
                }

                if (!nome) throw new Error("O parâmetro Nome é obrigatório");

                if (nome.length < 5)
                    throw new Error(
                        "O parâmetro Nome deve ter no mínimo 5 caracteres"
                    );

                if (!senha) throw new Error("O parâmetro Senha é obrigatório");

                if (senha.length < 3)
                    throw new Error("A senha deve ter no mínimo 3 caracteres");

                return query(args);
            },
        },
    },
});

export { prisma };
