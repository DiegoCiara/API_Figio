import { companies, contacts, partners, contracts, pipelines, deals, goal, mailers, funnels, convenios, product } from './dataMock';
import Company from '@entities/Company';
import Contact from '@entities/Contact';
import Pipeline from '@entities/Pipeline';
import Deal from '@entities/Deal';
import User from '@entities/User';
import bcrypt from 'bcryptjs';
import Mailer from '@entities/Mailer';
import Funnels from '@entities/Funnel';
import Goal from '@entities/Goal';
import Convenio from '@entities/Convenio';
import Partner from '@entities/Partner';
import Product from '@entities/Product';
import Contract from '@entities/Contract';

export const mocks = async (): Promise<void> => {
  try {
    if (!(await User.findOne({ email: 'admin@wavecrm.com.br' }))) {
      const pass = await bcrypt.hash('die140401', 10);
      await User.create({ 
        name: 'admin', 
        email: 'admin@wavecrm.com.br', 
        role: 'ADMIN', 
        passwordHash: pass, 
        picture: 'https://wavecrm.vercel.app/logo-a.png' 
      }).save();
      console.log('users ok');
    }

    if (!(await Funnels.findOne({ name: 'Funil Padrão' }))) {
      for (let i = 0; i < funnels.length; i++) {
        await Funnels.create({ ...funnels[i] }).save();
        console.log(`Funnels ${i + 1} criado`);
      }
      console.log('Funnelss ok');
    }

    const funnelsFind = await Funnels.find();

    if (!(await Pipeline.findOne({ name: 'Não iniciado' })) && funnelsFind.length) {
      for (let i = 0; i < pipelines.length; i++) {
        await Pipeline.create({ ...pipelines[i], funnel: funnelsFind[0] }).save();
        console.log(`Pipeline ${i + 1} criado`);
      }
      console.log('pipelines ok');
    }

    // const funnelsSec = await Funnels.findOne({name: 'Marketing'})
    // if (!(await Pipeline.findOne({ name: 'Campanha de anúncios' }))&& funnelsSec) {
    //   for (let i = 0; i < pipelines2.length; i++) {
    //     await Pipeline.create({ ...pipelines2[i], funnel: funnelsSec[0]  }).save();
    //     console.log(`Pipelinemkt ${i + 1} criado`); 
    //   }
    //   console.log('pipelines second ok');
    // }
    // if (!(await Automation.findOne({ name: 'Automação para criar negociação' }))) {
    //   for (let i = 0; i < automations.length; i++) {
    //     await Automation.create({ ...automations[i] }).save();
    //     console.log(`Automation ${i + 1, automations} criado`);
    //   }
    //   console.log('Automations ok');
    // }
    if (!(await Mailer.findOne({ subject: 'E-mail de boas vindas' }))) {
      for (let i = 0; i < mailers.length; i++) {
        await Mailer.create({ ...mailers[i] }).save();
        console.log(`Mailer ${i + 1} criado`);
      }
      console.log('Mailers ok');
    }


    if (!(await Convenio.findOne({ name: 'INSS' }))) {
      for (let i = 0; i < convenios.length; i++) {
        await Convenio.create({ ...convenios[i] }).save();
        console.log(`Convenio ${i + 1} criado`);
      }
      console.log('Convenios ok');
    }


    if (!(await Partner.findOne({ name: 'Wave CRM' }))) {
      for (let i = 0; i < partners.length; i++) {
        await Partner.create({ ...partners[i] }).save();
        console.log(`Partner ${i + 1} criado`);
      }
      console.log('Partners ok');
    }

    if (!(await Product.findOne({ name: 'Margem' }))) {
      for (let i = 0; i < product.length; i++) {
        const convenioFind = await Convenio.findOne({ name: 'INSS'});
        await Product.create({ ...product[i], convenio: convenioFind  }).save();
        console.log(`Product ${i + 1} criado`);
      }
      console.log('Products ok');
    }



    if (!(await Goal.findOne({ index: "0" }))) {
      for (let i = 0; i < goal.length; i++) {
        await Goal.create({ ...goal[i] }).save();
        console.log(`Goal ${i + 1} criado`);
      }
      console.log('Goal ok');
    }



    if (!(await Company.findOne({ name: 'Google' }))) {
      for (const company of companies) {
        // Armazena o objeto criado em uma variável
        const pipelineFind = await Pipeline.findOne({ name: 'Não iniciado'});
        const newCompany = await Company.create({ ...company, pipeline: pipelineFind }).save();
        // Acessa a propriedade id do objeto
        console.log(`Canal ${company.name}, de id: ${newCompany.id} criada`);
      }
      console.log('companies ok');
    }


    // if (!(await User.findOne({ email: 'suporte@wavecrm.com.br' }))) {
    //   users.map(async (admin) => {
    //     const passwordHash = await bcrypt.hash(admin.password, 10);
    //     await User.create({ ...admin, passwordHash }).save();
    //   });
    //   console.log('users ok');
    // }
    const companiesFind = await Company.find();

    if (!(await Contact.findOne({ email: 'teste@wavecrm.com.br' })) && companiesFind.length >= 5) {
      for (let index = 0; index < contacts.length; index++) {
        const contact = contacts[index];
        await Contact.create({ ...contact, company: companiesFind[index] }).save();
      }
      console.log('contacts ok');
    }

    const contactFind = await Contact.find();
    const userFind = await User.find();
    const pipelineFind = await Pipeline.find();


    if (!(await Deal.findOne({ name: 'Exemplo de negociação' })) && contactFind.length >= 1 && pipelineFind.length >= 1 && companiesFind.length >= 1) {
      for (let index = 0; index < deals.length; index++) {
        const deal = deals[index];
        await Deal.create({
          ...deal,
          pipeline: pipelineFind[index],
          company: companiesFind[index],
          contact: contactFind[index],
          activity: [
            {
              name: 'teste',
              description: 'testando',
              createdAt: Date.parse('2021-11-01T17:38:44.873Z'),
              createdBy: { id: '', name: '' },
              tag: 'COLD',
            },
          ],
          value: Math.random() * (0 - 0) + 0,
          status: 'ARCHIVED',
        }).save();
      }

      // deals2.map(async (deal, index) => {
      //   await Deal.create({
      //     ...deal,
      //     pipeline: pipelineFind[index],
      //     company: companiesFind[index],
      //     contact: contactFind[index],
      //     // status: 'ARCHIVED',
      //     activity: [
      //       {
      //         name: 'teste',
      //         description: 'testando',
      //         // createdAt: new Date(),
      //         createdAt: Date.parse(`2021-11-01T17:38:44.873Z`),
      //         createdBy: { id: userFind[index + 1].id, name: userFind[index + 1].name },
      //         tag: 'COLD',
      //       },
      //     ],
      //     value: Math.random() * (132100 - 23580) + 23580,
      //     status: 'INPROGRESS',
      //     // createdAt: Date.parse(`2021-11-01T17:38:44.873Z`),
      //     // updatedAt: Date.parse(`2021-11-0${c}T17:38:44.873Z`),
      //   }).save();
      // });
      // deals3.map(async (deal, index) => {
      //   await Deal.create({
      //     ...deal,
      //     pipeline: pipelineFind[index],
      //     company: companiesFind[index],
      //     contact: contactFind[index],
      //     // status: 'ARCHIVED',
      //     activity: [
      //       {
      //         name: 'teste',
      //         description: 'testando',
      //         // createdAt: new Date(),
      //         createdAt: Date.parse(`2021-11-01T17:38:44.873Z`),
      //         createdBy: { id: userFind[index + 1].id, name: userFind[index + 1].name },
      //         tag: 'HOT',
      //       },
      //     ],
      //     value: Math.random() * (132100 - 23580) + 23580,
      //     status: 'LOST',
      //     // createdAt: Date.parse(`2021-11-01T17:38:44.873Z`),
      //     // updatedAt: Date.parse(`2021-11-0${c}T17:38:44.873Z`),
      //   }).save();
      //   await Deal.create({
      //     ...deal,
      //     pipeline: pipelineFind[index],
      //     company: companiesFind[index],
      //     contact: contactFind[index],
      //     // status: 'ARCHIVED',
      //     activity: [
      //       {
      //         name: 'teste',
      //         description: 'testando',
      //         // createdAt: new Date(),
      //         createdAt: Date.parse(`2021-11-01T17:38:44.873Z`),
      //         createdBy: { id: userFind[index + 1].id, name: userFind[index + 1].name },
      //         tag: 'HOT',
      //       },
      //     ],
      //     value: Math.random() * (132100 - 23580) + 23580,
      //     status: 'LOST',
      //     // createdAt: Date.parse(`2021-11-01T17:38:44.873Z`),
      //     // updatedAt: Date.parse(`2021-11-0${c}T17:38:44.873Z`),
      //   }).save();
      // });
      // deals4.map(async (deal, index) => {
      //   await Deal.create({
      //     ...deal,
      //     pipeline: pipelineFind[index],
      //     company: companiesFind[index],
      //     contact: contactFind[index],
      //     // status: 'ARCHIVED',
      //     activity: [
      //       {
      //         name: 'teste',
      //         description: 'testando',
      //         // createdAt: new Date(),
      //         createdAt: Date.parse(`2021-11-01T17:38:44.873Z`),
      //         createdBy: { id: userFind[index + 1].id, name: userFind[index + 1].name },
      //         tag: 'COLD',
      //       },
      //     ],
      //     value: Math.random() * (132100 - 23580) + 23580,
      //     status: 'WON',
      //     // createdAt: Date.parse(`2021-11-01T17:38:44.873Z`),
      //     // updatedAt: Date.parse(`2021-11-0${c}T17:38:44.873Z`),
      //   }).save();
      //   await Deal.create({
      //     ...deal,
      //     pipeline: pipelineFind[index],
      //     company: companiesFind[index],
      //     contact: contactFind[index],
      //     // status: 'ARCHIVED',
      //     activity: [
      //       {
      //         name: 'teste',
      //         description: 'testando',
      //         // createdAt: new Date(),
      //         createdAt: Date.parse(`2021-11-01T17:38:44.873Z`),
      //         createdBy: { id: userFind[index + 1].id, name: userFind[index + 1].name },
      //         tag: 'COLD',
      //       },
      //     ],
      //     value: Math.random() * (132100 - 23580) + 23580,
      //     status: 'WON',
      //     // createdAt: Date.parse(`2021-11-01T17:38:44.873Z`),
      //     // updatedAt: Date.parse(`2021-11-0${c}T17:38:44.873Z`),
      //   }).save();
      // });
      console.log('deals ok');
    }

    const dealFind = Deal.find();
    const partnerFind = Partner.find();
    const productFind = Product.find();
    const convenioFind = Convenio.find();

    if (!(await Contract.findOne({ name: 'Contrato Consignado' }))) {
      for (let index = 0; index < contracts.length; index++) {
        const contract = contracts[index];
        await Contract.create({
          ...contract,
          deal: dealFind[index],
          partner: partnerFind[index],
          product: productFind[index],
          contact: contactFind[index],
          convenio: convenioFind[index],
          seller: userFind[index],
          bank: 'C6 Bank',
          activity: [
            {
              name: 'teste',
              description: 'testando',
              createdAt: Date.parse('2021-11-01T17:38:44.873Z'),
              createdBy: { id: '', name: '' },
              tag: 'COLD',
            },
          ]
        }).save();
        console.log(`Contract ${contract.name} criado`);
        console.log('Contracts ok');
      }


    }

    const dealsFind = await Deal.find();
    if (!dealsFind.length) mocks();
  } catch (error) {
    console.log('Erro ao rodar mocks!');
  }
};
