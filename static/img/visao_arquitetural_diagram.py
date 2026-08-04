import os

from diagrams import Diagram
from diagrams.c4 import C4Node, Person, Relationship, System

graph_attr = {"splines": "spline"}
C4_SIZE = {"width": "3.9", "height": "2.1"}
PERSON_SIZE = {"width": "2.33", "height": "2.1"}


def User(name, description="", external=False, **kwargs):
    attrs = {
        "name": name,
        "description": description,
        "type": "External Person" if external else "Person",
        "shape": "none",
        "style": "",
        "fillcolor": "transparent",
        "image": os.path.join(os.path.dirname(os.path.abspath(__file__)), "c4_user.png"),
        "imagescale": "true",
    }
    attrs.update(PERSON_SIZE)
    attrs.update(kwargs)
    return C4Node(**attrs)


with Diagram(
    "",
    filename="visao-arquitetural-c4",
    direction="TB",
    graph_attr=graph_attr,
    show=False,
):
    pm = User(name="Product Manager", **PERSON_SIZE)
    lider_tecnico = User(name="Líder técnico", **PERSON_SIZE)
    desenvolvedor = User(name="Desenvolvedor", **PERSON_SIZE)

    agente_produto = System(
        name="Agente de Produto",
        description="Plataforma agêntica de produto, ex.: Cowork, VSCode.",
        **C4_SIZE,
    )
    agente_arquiteto = System(
        name="Agente Arquiteto/Tech-Lead",
        description="Plataforma agêntica de arquitetura, ex.: Claude Code, Devin.",
        **C4_SIZE,
    )
    agente_dev = System(
        name="Agente de Desenvolvimento",
        description="Plataforma agêntica por repositório de serviço instrumentado, ex.: Claude Code, Devin.",
        **C4_SIZE,
    )

    repositorio_docs = System(
        name="Repositório de Contexto",
        description="Fonte da verdade: Product Brief, PRD, ADR, critérios de aceite e histórias.",
        **C4_SIZE,
    )

    repositorio_servico = System(
        name="Repositório de Serviço",
        description="Código gerado a partir da especificação.",
        external=True,
        **C4_SIZE,
    )

    pm >> Relationship("Orquestra") >> agente_produto
    lider_tecnico >> Relationship("Orquestra") >> agente_arquiteto
    desenvolvedor >> Relationship("Orquestra") >> agente_dev

    agente_arquiteto >> Relationship("Lê/escreve ADR, AC [MCP/git]") >> repositorio_docs
    agente_produto >> Relationship("Lê/escreve PB, PRD [MCP/git]") >> repositorio_docs
    agente_dev >> Relationship("Lê ADR, história [MCP/git]") >> repositorio_docs

    agente_dev >> Relationship("Gera código com harness SDD") >> repositorio_servico
