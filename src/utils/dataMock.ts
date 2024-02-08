const companies = [
  {
    name: 'Google',
    country: '',
    state: '',
    city: '',
    site: '',
    picture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABcCAMAAADZL1ItAAABF1BMVEX////rQzU0qFNChfT7vAXF1vswffM7gvSFq/fw9f77uAD7ugDrPi/qOCf/vQAvp1DqMR4YokL8wQAopUv+9vXqLRhDg/y12r3v9/H0qaXuaWDtVkvsSj3zn5rqKRLwhH35zsvsUET86+rylpH3vbr2trPtXFLtYlj/+e7qNTf936b61tT8xEL9147+9N/8y2H+79P7wClWkPWTy59lmPXP59QzqkNSsWlFrWDvenPyjYfpIgDvc2vuXBz81YTyfSb2mxrtUTLvayv0jiD4qBTuXy7wdz0ZdfOvx/mduvj95LX+6sWTskXb5f1cq0vStyN0voWfsTl2rUXguRy5tC8toWs/kM46mKgyn3xCjOE8lL03nZGk0680UIZGAAAESUlEQVRogbWWa3vaRhSEFxljwFqktcDcxMWAIamTNkbGKHbrNG2axEnTkLRJ05b//zu6WiFZ0t5BzCc/Frwez5k9WgAUVB8N2+Pnna5bKLjdzvNxezKqq3xPpotex+3b0DTNAhH+Adr9Qqd3sRt3OLAxtcBQwB8Mt+XWe2d9JjbGN856oy3AowHHb0qwMdCF128acu7G+o3WTNs2VAMT5/BcGXxxZquDAzVmiqmMVbN4kKlkfDTVtByqfyMPw9S2HApOJdOcNLYDY5kFYeDn/a3JEnR7F7IrCmQnz0LyZBfymYh8IZugScR+1BWR66LSmbAB3e50Npt2XbtBrS04FYAB6HDRJuzPesPoxYJfOePpLUyThZXu8c6gaXfb1DdHbdeOrcCZ0DM36P5syP7GJNphEjKYsuOALgcc6JwYhx0x+Zxt+nYs/NaoYxfgj2Jynbn4TSiwHOrmVkIGYxbadBX2+0Ty/NFPjxlk4flS1d3JC4ot3gnKqhZPfs6y4TYXDErfVYvFk+rLFLyx47VroyfHxUC/JNh2Lxfy91VCLp78GrNNyQFT1dPQNGa/yjkOEJExu/gbMW4O8iFHeYRw0sJ+Lu0I+5Fg4xbCnEyDH46LKfarl3ZOSUfVS+h1TuRH1Sz5+I7/6UN1AfCMQlffc8mVkrLeVDJTJGi+6crRgapKHx4OTJzHk3zQb8EdhRZErYE+us92D+fxNB90me5e9V0+6CsGml8QHfTBFbikCvIsH/R8n+i9BcJC5zNGjN5X+fAY93ZkrhgH/TIfdBm829N6wgddc6kecUSj3+q9CiplnuZZdOmQfoHVar/zE+GKco33dbZ9tcs/0EKbXHlDoSvZy0Lto2FYK230YSmLnoPMFaf2yTIMA7V00VfZOeJaYyXAxc9GIG3bdCnx+wskrpO1P42NdNO+p/IIpviQSO2viGxYSz00XetS+IDUD3fOitEG8nTIZQqNjzlR0BHcOSMpnUg+UHGQA0NUJZ1Ly1FvyQFjs0TP7sLOpWT5qmQ6jjgPfKX8nAUHtn0133Q7on4QeQ6LbaiwWeTwvIRqsdCG5chnWWaQk6YBWCMWW9rB1pxFTprGWlJz3IQiMu6hL3NGO1KmAViwbRsWWvLgTfyHHefrKb8e4kgCuL+m57nwDET+0eu/s+xgU6e1ZI4yHCdaeotWxG8tmisDxZ++/pY+MuHOS6llseOO6I6xDOT7DkIpF47/T8J4ZobiuB/4RIzfX/97KoiDzEXG5ur6v9NNKPFeyo3tfJmfcoKW1UQqi7SwdM8j7+I7aKGIHLAFPZGwvwnJuCcOt98SobWYjPu93CoUCzVlZBBsHf1Q1JY7DsXXNG5p3ADWSCdx5OtciVorZTgyVFLOwuWZW8iRFoMF93yx9WDb6jqOtVghjncLc31P+7acpntLA/OdaJ1ipoNXtr9q7sbdqLVYeyv8FsBkf7ny1s2FAvZ/bNGCaG8ZOQ8AAAAASUVORK5CYII='
  },
  {
    name: 'Facebook',
    country: '',
    state: '',
    city: '',
    site: '',
    picture:'data:image/png;base64,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'
  },
  {
    name: 'Instagram',
    country: '',
    state: '',
    city: '',
    site: '',
    picture:'https://img.freepik.com/vetores-premium/logotipo-redondo-do-instagram-isolado-em-fundo-branco_469489-898.jpg?w=360',
  },
  {
    name: 'LinkedIn',
    country: '',
    state: '',
    city: '',
    site: '',
    picture:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/LinkedIn_icon_circle.svg/800px-LinkedIn_icon_circle.svg.png',
  },
  {
    name: 'WhatsApp',
    country: '',
    state: '',
    city: '',
    site: '',
    picture:'data:image/png;base64,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',
  },
  {
    name: 'Site',
    country: 'Brasil',
    state: 'PE',
    city: '',
    site: 'www.seusite.com.br',
  },

];

const goal = [
  {
    index: '0'
  }
]

const contacts = [
  {
    name: 'Exemplo de Contato',
    email: 'teste@figio.com.br',
    phone: '12987979532',
    city: 'São Paulo',
    state: 'SP',
  },
];
const mailers = [
  {
    subject: 'E-mail de boas vindas',
    title: 'Seja bem vindo!',
    template: 'Empresarial',
    text: 'Olá {{Contact}}, seja bem vindo a nossa empresa, ficamos felizes em te ter aqui conosco!',
    color:"#0048fc"
  },
];
const automations = [
  {
    name: 'Automação para criar negociação',
    input: 'Criar contato',
    condition: "",
    action: "Criar negociação",
    output: 0,
  },
  {
    name: 'Automação de atividade',
    input: 'Criar contato',
    condition: '',
    action: "Registrar atividade",
    output: 'Atividade registrada',
  },
];

const funnels = [
  {
    name: 'Funil Padrão',
    description: 'Funil de captação e conversão padrão.',
  },
]

const Models =[  
  {
    name: 'Funil de relacionamento',
    description: 'Melhore o relacionamento com seu cliente, faça campanhas de pesquisas, promoções ou ofertas para manter seus clientes engajados com seu negócio.',
  },
  // {
  //   name: 'Funil de SaaS(Software as a Service)',
  //   description: 'Esse funil é comum em empresas que oferecem serviços de software. Os leads se cadastram, passam pelo processo de onboarding, experimentam uma versão de avaliação, assinam o serviço e são ativados como clientes.',
  // },
  {
    name: 'Funil Cross-selling/Upselling:',
    description: 'Esse funil é focado em aumentar o valor das vendas para clientes existentes. Após a compra inicial, são identificadas oportunidades de upselling ou cross-selling, uma oferta é feita ao cliente, uma venda adicional é realizada e a compra é confirmada.',
  },
  {
    name: 'Funil de produtos',
    description: 'Nesse funil, é possível identificar leads qualificados, apresentar seus produtos/soluções de forma atrativa, elaborar propostas personalizadas, negociar preços e condições, e fechar pedidos, otimizando assim o processo de vendas dos seus produtos e aumentando as chances de conversão e sucesso nas vendas.',
  },
  {
    name: 'Funil de consultoria',
    description: 'Com o funil de vendas para consultoria, é possível captar leads qualificados, estabelecer contato direto para compreender suas necessidades, realizar reuniões de diagnóstico para identificar desafios específicos, elaborar propostas personalizadas destacando soluções e benefícios, e finalmente, fechar contratos de forma clara e objetiva, transformando leads em clientes satisfeitos.',
  },
]

const pipelines = [
  {
    name: 'Lead',
    description: "Sem contato, efetue um contato com informações relevante sobre o produto/serviço e mova para próxima etapa."
  },
  {
    name: 'Primeiro contato',
    description: "Primeiro contato efetuado com o lead. Aguarde a resposta para iniciar uma simulação."
  },
  {
    name: 'Simulação',
    description: "Efetue uma simulação, repasse os valores e aguararde a confirmação para enviar para análise bancária, ou negociar as condições do crédito."
  },
  {
    name: 'Proposta',
    description: "Negocie as condições do crédito para fechamento da proposta."
  },
  {
    name: 'Análise bancária',
    description: "Aguardando liberação do crédito pela análise bancária."
  },
];

const Relationship = [
  {
    name: 'Contato e conscientização',
    description: "Nesta etapa, o objetivo é atrair a atenção de potenciais clientes e torná-los conscientes da sua empresa e dos seus produtos ou serviços. Algumas estratégias que você pode utilizar incluem marketing de conteúdo, anúncios pagos, presença nas redes sociais e otimização para mecanismos de busca. O objetivo principal é gerar tráfego qualificado para o seu site ou loja física."
  },
  {
    name: 'Identificação de interesse',
    description: "Uma vez que os clientes estejam conscientes da sua empresa, é importante despertar interesse neles. Ofereça conteúdo relevante e informativo, como eBooks, whitepapers, webinars ou amostras grátis, para capturar o interesse deles. Solicite que eles forneçam informações de contato, como e-mail, para que você possa continuar a interagir com eles."
  },
  {
    name: 'Engajamento',
    description: "Nesta etapa, você deseja criar um relacionamento mais profundo com os clientes em potencial. Envie e-mails personalizados, newsletters ou boletins informativos com conteúdo exclusivo e relevante para manter-se presente na mente deles. Considere também o uso de mídias sociais, blogs ou grupos online para interagir e responder às perguntas ou comentários dos clientes em potencial.",
  },
  {
    name: 'Conversão',
    description: "Aqui é onde ocorre a conversão propriamente dita, ou seja, quando os clientes em potencial decidem comprar o seu produto ou serviço. Ofereça promoções exclusivas, descontos especiais ou pacotes personalizados para incentivá-los a fazer a compra. Certifique-se de fornecer um processo de compra fácil e transparente, além de um excelente atendimento ao cliente.",
  },
  {
    name: 'Fidelização',
    description: "Após a conversão, é importante manter um relacionamento contínuo com os clientes para incentivá-los a comprar novamente e se tornarem defensores da sua marca. Ofereça suporte pós-venda eficiente, programa de fidelidade, envio de conteúdo exclusivo para clientes e solicite feedback para aprimorar constantemente seus produtos e serviços.",
  },
];

const SaaS = [
  {
    name: 'Lead',
    description: "Nesta etapa, seu objetivo é atrair leads qualificados que possam se interessar pelo seu produto SaaS. Existem várias estratégias para gerar leads, como marketing de conteúdo, anúncios direcionados, mídias sociais, SEO, eventos, entre outros. O foco aqui é gerar o máximo de interesse possível e coletar informações de contato, como nome e e-mail.",
  },
  {
    name: 'Solicitação de acesso',
    description: "Uma vez que você tenha leads em mãos, o próximo passo é levá-los a solicitar acesso ao seu produto ou serviço. Isso pode ser feito oferecendo uma versão de teste gratuita, uma demonstração personalizada ou uma avaliação inicial. O objetivo é permitir que os leads experimentem seu SaaS e percebam o valor que ele pode oferecer.",
  },
  {
    name: 'Apresentação',
    description: "Após a solicitação de acesso, é hora de realizar uma apresentação do seu produto ou serviço. Pode ser uma demonstração ao vivo, uma reunião virtual ou até mesmo um vídeo explicativo. Aqui, você deve destacar os benefícios do seu SaaS, resolver dúvidas e mostrar como ele pode atender às necessidades específicas do cliente em potencial.",
  },
  {
    name: 'Proposta',
    description: "Depois da apresentação, é hora de enviar uma proposta personalizada ao cliente em potencial. A proposta deve detalhar os recursos e preços do seu SaaS, além de enfatizar o retorno do investimento que o cliente pode obter. Certifique-se de alinhar a proposta às necessidades e objetivos do cliente, demonstrando como seu produto pode resolver seus problemas ou melhorar seus processos.",
  },
  {
    name: 'Negociação',
    description: "Se o cliente em potencial estiver interessado na proposta, você entra na etapa de negociação. Nessa fase, discuta detalhes específicos, como prazos, condições contratuais, personalizações adicionais ou descontos. O objetivo é chegar a um acordo mútuo que beneficie ambas as partes e finalize a venda.",
  },
];

const CrossUp = [
  {
    name: 'Contato com o cliente',
    description: "Nesta etapa, você deve focar em conhecer bem o cliente, suas necessidades e dores. Realize pesquisas, análise de dados e interações para entender seus interesses e preferências."
  },
  {
    name: 'Oportunidade',
    description: "Com base nas informações coletadas na etapa anterior, identifique uma dor específica que o cliente esteja enfrentando. Isso pode ser um problema relacionado ao produto ou serviço que ele já adquiriu.",
  },
  {
    name: 'Solução',
    description: "Nesta etapa, você oferece uma solução para a necessidade identificada, que envolve o cross-selling ou up-selling. Recomende um produto ou serviço adicional que possa resolver o problema do cliente e agregue valor à sua experiência. Destaque os benefícios específicos da solução que você está oferecendo",
  },
  {
    name: 'Proposta',
    description: "Finalmente, faça o pitch da oferta e incentive o cliente a adquirir o produto ou serviço adicional. Certifique-se de que o preço e as condições sejam atraentes e demonstre como a compra ajudará o cliente a obter ainda mais valor do seu investimento inicial.",
  },
  {
    name: 'Negociação',
    description: "Negocie com o cliente termos e condições favoráveis para a realização do produto adicional ou upgrade. Faça ofertas, converse com o cliente e identifique o que ele precisa para fechar a venda.",
  },
];

const Product = [
  {
    name: 'Qualificação de leads',
    description: "Nesta etapa, você precisa identificar e qualificar leads que têm potencial para se tornarem clientes. Você pode utilizar várias estratégias para isso, como a geração de leads por meio de anúncios online, participação em feiras e eventos relacionados ao setor de doces, ou até mesmo a captura de leads por meio do seu site ou redes sociais. Certifique-se de coletar informações relevantes dos leads, como nome, contato, localização e interesses."
  },
  {
    name: 'Apresentação',
    description: "Uma vez que você tenha identificado os leads qualificados, é hora de apresentar seu produto ou solução de maneira atraente. Destaque os diferenciais dos seus doces, como ingredientes de qualidade, sabores únicos, variedade de opções e até mesmo aspectos relacionados à saúde, como produtos sem glúten ou opções veganas. Utilize materiais visuais e descritivos para transmitir a qualidade e a variedade dos seus produtos."
  },
  {
    name: 'Elaboração de proposta',
    description: "Nesta etapa, você precisa elaborar propostas para atender às necessidades e preferências individuais dos leads. Isso pode incluir a criação de pacotes, descontos especiais para quantidades maiores, ou até mesmo a possibilidade de desenvolver produtos exclusivos para eventos especiais. Certifique-se de que suas propostas estejam alinhadas com as expectativas dos clientes e sejam competitivas em termos de preço e qualidade."
  },
  {
    name: 'Negociação',
    description: "Após apresentar a proposta, é hora de negociar o preço e as condições com o cliente. Esteja aberto para ouvir as necessidades e preocupações do cliente e esteja preparado para fazer ajustes nas condições, se necessário. Busque um equilíbrio entre maximizar o valor da venda para sua empresa e garantir a satisfação do cliente. Lembre-se de que um bom relacionamento com o cliente pode levar a vendas futuras e recomendações positivas."
  },
]

const Consulting =[
{
  name: 'Captação de Leads',
  description: "Nesta etapa, o objetivo é atrair potenciais clientes interessados nos serviços da sua consultoria. Isso pode ser feito através de estratégias de marketing digital, como anúncios, conteúdo relevante, mídias sociais e otimização de mecanismos de busca. O foco é gerar leads qualificados, ou seja, pessoas que demonstram interesse genuíno no que você oferece."
},
{
  name: 'Contato',
  description: "Após capturar os leads, é importante estabelecer o primeiro contato com eles. Isso pode ser feito através de telefonemas, e-mails ou mensagens diretas. O objetivo é iniciar uma conversa para entender melhor as necessidades e desafios do lead, bem como fornecer informações iniciais sobre a sua consultoria."
},
{
  name: 'Reunião de diagnóstico',
  description: "Nesta etapa, é hora de aprofundar o conhecimento sobre o lead e sua empresa. Uma reunião de diagnóstico é agendada, na qual são feitas perguntas detalhadas para entender os problemas que o lead está enfrentando e como sua consultoria pode ajudar. O objetivo é coletar informações relevantes para personalizar a proposta posteriormente."
},
{
  name: 'Proposta',
  description: "Com base nas informações coletadas na etapa anterior, é hora de criar uma proposta personalizada para o lead. A proposta deve ser clara, detalhada e destacar os benefícios e soluções específicas que sua consultoria oferece. O objetivo é convencer o lead de que sua consultoria é a melhor opção para resolver seus problemas."
},
{
  name: 'Assinatura de contrato',
  description: "Uma vez que a proposta tenha sido aceita pelo lead, é hora de formalizar o acordo através da assinatura de contrato. Nesta etapa, os detalhes finais são acertados, como prazos, valores e condições específicas. O objetivo é estabelecer uma relação contratual clara e definida entre a sua consultoria e o cliente."
},
]



const users = [
  {
    name: 'Suporte Técnico',
    email: 'suporte@figio.com.br',
    role: 'ADMIN',
    password: 'die140401',
  },
];

const partners = [
  {
    name: 'Figio',
    type: 'Promotora',
  },
];

const contracts = [
];

const convenios = [
  {
    name:'INSS'
  },
  {
    name:'BPC LOAS'
  },
  {
    name:'FGTS'
  },
  {
    name:'GOV ESTADO'
  },
  {
    name:'GOV FEDERAL'
  },
]


const product = [
  {
    name: 'Margem'
  },
];

const deals = [
  {
    name: 'Exemplo de negociação',
    deadline: new Date(),
    priority: 'medium',
    value: 676577,
  },
];

const deals2 = [
  {
    name: 'nReport',
    deadline: new Date(),
    priority: 'medium',
    value: 258445,
  },
];

const deals3 = [
  {
    name: 'nReport',
    deadline: new Date(),
    priority: 'medium',
    value: 258445,
  },
];

const deals4 = [
  {
    name: 'nReport',
    deadline: new Date(),
    priority: 'high',
    value: 258445,
  },
];

export { companies, contacts, product, users, convenios, funnels, contracts, partners, pipelines, goal, Relationship, SaaS, CrossUp, Product, Consulting, deals, automations, mailers,deals2, deals3, deals4 };
