export default {
  project: {
    title: 'Escritório',
    description: 'Projeto de gerencimanto de escritório',
  },
  failed: 'Ação falhou',
  fields: {
    id: 'ID',
    createdAt: 'Criado em',
    updatedAt: 'Atualizado em',
    title: 'Título',
    description: 'Descrição',
    status: 'Status',
    actions: 'Ações',
  },
  enums: {
    taskStatus: {
      TODO: 'A Fazer',
      IN_PROGRESS: 'Em Andamento',
      DONE: 'Concluído',
    },
  },
  success: {
    create: 'Criado com sucesso',
    createId: 'Registro criado com id {id}',
    update: 'Atualizado com sucesso',
    updateId: 'Registro com id {id} atualizado com sucesso',
    delete: 'Deletado com sucesso',
    deleteId: 'Registro com id {id} deletado com sucesso',
  },
  error: {
    generic: {
      title: 'Erro',
      message: 'Ocorreu um erro inesperado',
    },
    required: 'Campo obrigatório',
    create: 'Falha ao criar',
    update: 'Falha ao atualizar',
    updateId: 'Falha ao atualizar registro com id {id}',
    delete: 'Falha ao deletar',
    deleteId: 'Falha ao deletar registro com id {id}',
  },

  confirm: {
    generic: {
      title: 'Confirmação',
      message: 'Você tem certeza que deseja realizar esta ação?',
      confirm: 'Confirmar',
      cancel: 'Cancelar',
    },
  },
  pages: {
    index: {
      title: 'Início',
      description: 'Esta é a página principal do nosso aplicativo',
      caption: 'Bem-vindo ao nosso aplicativo!',
    },
    about: {
      title: 'Sobre Nós',
      description:
        'Bem-vindo ao nosso aplicativo! Somos dedicados a fornecer o melhor serviço possível. Nossa equipe é composta por profissionais experientes apaixonados pelo que fazem.',
      mission:
        'Nossa missão é entregar produtos de alta qualidade que atendam às necessidades de nossos clientes. Valorizamos feedback e estamos sempre buscando maneiras de melhorar.',
      contactButton: 'Contate-nos',
      caption: 'Saiba mais sobre nós',
    },
    tasks: {
      title: 'Tarefas',
      description: 'Aqui você pode ver todas as tarefas disponíveis',
      caption: 'Tarefas',
      newTask: 'Nova Tarefa',
      editTask: 'Editar Tarefa {id}',
      deleteTask: 'Deletar Tarefa',
      action: {
        create: 'Criar',
        update: 'Atualizar',
        delete: 'Deletar',
        cancel: 'Cancelar',
      },
      task: {
        title: 'Título',
        description: 'Descrição',
        status: 'Status',
        statusOptions: {
          pending: 'Pendente',
          inProgress: 'Em Progresso',
          done: 'Concluída',
        },
        actions: 'Ações',
        delete: 'Deletar',
        new: {
          title: 'Nova Tarefa',
          submit: 'Criar',
        },
        edit: {
          title: 'Editar Tarefa',
          submit: 'Salvar',
        },
        confirmDelete: {
          title: 'Deletar Tarefa',
          message: 'Você tem certeza que deseja deletar esta tarefa?',
          confirm: 'Deletar',
          cancel: 'Cancelar',
        },
      },
    },
    contact: {
      title: 'Contato',
      description:
        'Se você tiver alguma dúvida, não hesite em nos contatar. Estamos aqui para ajudá-lo e fornecer o melhor serviço possível.',
      emailInfo: 'Você pode nos contatar via e-mail em',
      phoneInfo: 'ou ligue para',
      officeHours:
        'Nosso horário de funcionamento é de segunda a sexta, das 9h às 17h. Aguardamos seu contato!',
      sendButton: 'Enviar Mensagem',
      caption: 'Entre em contato conosco',
    },
    error: {
      title: '404',
      description: 'Ops. Nada aqui...',
      backButton: 'Voltar para Home',
    },
  },
  components: {
    example: {
      title: 'Componente de exemplo',
      count: 'Contagem: {count} / {total}',
      active: {
        yes: 'sim',
        no: 'não',
      },
      clicks: 'Cliques nos todos:',
    },
    essential: {
      title: 'Link Essencial',
    },
    internal: {
      title: 'Link Interno',
    },
    layoutCustomizer: {
      title: 'Personalizar Layout',
      leftDrawer: 'Menu Lateral Esquerdo',
      rightDrawer: 'Menu Lateral Direito',
      settings: {
        title: 'Configurações',
        theme: {
          label: 'Tema Escuro',
          light: 'Claro',
          dark: 'Escuro',
          caption: 'Alternar entre temas claro e escuro',
        },
        language: {
          label: 'Idioma',
          english: 'Inglês',
          portuguese: 'Português',
        },
        menu: {
          label: 'Menu Horizontal',
          horizontal: 'Horizontal',
          vertical: 'Vertical',
          caption: 'Alternar entre menu horizontal e vertical',
        },
      },
      close: 'Fechar',
    },
    mainLayout: {
      menu: {
        internalLinks: 'Links Internos',
        essentialLinks: 'Links Essenciais',
      },
      profile: {
        profile: 'Perfil',
        logout: 'Sair',
      },
      footer: {
        copyright: '© 2023 Sua Empresa. Todos os direitos reservados.',
      },
    },
  },
}
