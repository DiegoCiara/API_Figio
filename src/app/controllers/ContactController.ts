import Automations from '@entities/Automation';
import Companies from '@entities/Company';
import Company from '@entities/Company';
import Contact from '@entities/Contact';
import Deals from '@entities/Deal';
import Mailers from '@entities/Mailer';
import Pipelines from '@entities/Pipeline';
import Users from '@entities/User';
import confirm from '@src/modules/confirm';
import transport from '@src/modules/mailer';
import { companies, deals } from '@utils/dataMock';
import queryBuilder from '@utils/queryBuilder';
import { Request, Response } from 'express';

interface ContactInterface {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  state?: string;
  company?: Company;
}

class ContactController {
  public async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const contacts = await Contact.find(queryBuilder(req.query));

      return res.status(200).json(contacts);
    } catch (error) {
      return res.status(404).json({ error: 'Find contact failed, try again' });
    }
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      const contact = await Contact.findOne(id, queryBuilder(req.query));

      if (!contact) return res.status(400).json({ message: 'Contact does not exist' });

      return res.status(200).json(contact);
    } catch (error) {
      return res.status(404).json({ error: 'Find contact failed, try again' });
    }
  }
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, phone, city, state, company }: ContactInterface = req.body;

      if (!name || !email || !company) return res.status(400).json({message: 'Invalid values for contacts'});

      const findContact = await Contact.findOne({ email });

      if (findContact) return res.status(400).json({ message: 'Contact already exists' });

      const contact = await Contact.create({ name, email, phone, city, state, company }).save();

      if (!contact) return res.status(400).json({ message: 'Cannot create contact' });


      // Automação de e-mail
      const automations = await Automations.find();

      for (const automationData of automations) {
        if (automationData.input === "Criar contato") {
          const automationEmail = await Automations.findOne({action: "Enviar e-mail"})
          const CreateNegociation = await Automations.findOne({action: "Criar negociação"})
          const automationNotification = await Automations.findOne({action: "Notificar"})
          const identifierAutomation = automationData.input === "Criar contato"
          
          if ( automationEmail  && automationData.action !== "Criar negociação" ){

            const mailerProWithOutput = await Mailers.findOne({ subject: automationData.output, template: "Empresarial"});
            const mailerPersonWithOutput = await Mailers.findOne({ subject: automationData.output, template: "Pessoal"});
            const createdBy = await  Users.findOne(req.userId)

          if (mailerProWithOutput) {
            console.log(mailerProWithOutput)
            const Contact = contact.name; 
            const Email = contact.email;
            const Subject = mailerProWithOutput.subject;
            const Title = mailerProWithOutput.title;
            const Color = mailerProWithOutput.color;
            const Photo = process.env.CLIENT_NAME;
            const Responsible = createdBy.name;
            const Client = process.env.CLIENT_NAME;
            let Text = mailerProWithOutput.text;
            Text = Text.replace('{{Contact}}', Contact);
            Text = Text.replace('{{Email}}', Email);
            
            transport.sendMail({
              to: Email,
              from: 'contato@softspace.com.br',
              subject: Subject,
              template: 'ProfessionalMailer',
              context: {Responsible, Photo, Title, Text, Contact, Color, Client },
            }, (err) => {
              if (err) {
                console.log('Email not sent');
                console.log(err);
              }
              transport.close();
            });
          } else if (mailerPersonWithOutput) {
            console.log(mailerPersonWithOutput)
            const Contact = contact.name; 
            const Email = contact.email;
            const Subject = mailerPersonWithOutput.subject;
            const Title = mailerPersonWithOutput.title;
            const Color = mailerPersonWithOutput.color;
            const Photo = process.env.CLIENT_LOGO;
            const Responsible = createdBy.name;
            const Client = process.env.CLIENT_NAME;

            let Text = mailerPersonWithOutput.text;
            Text = Text.replace('{{Contact}}', Contact);
            Text = Text.replace('{{Email}}', Email);

            transport.sendMail({
              to: Email,
              from: 'contato@softspace.com.br',
              subject: Subject,
              template: 'PersonalMailer',
              context: {Responsible, Photo, Title, Text, Color, Contact, Client },
            }, (err) => {
              if (err) {
                console.log('Email not sent');
                console.log(err);
              }
              transport.close();
            });
           }
          }
           else if ( CreateNegociation ){
            try{  
              const tasksInsert = automationData.output;
              console.log(tasksInsert, Number(tasksInsert))
              const createdBy = await Users.findOne(req.userId);
              const companiesFind = await Company.find();
              const contactFind = await Contact.find();
              const pipelineFind = await Pipelines.find();
              const companyDeal = await Company.findOne(contact.company);
        
              if (!(await Deals.findOne({ contact: contact })) && contactFind.length >= 1 && pipelineFind.length >= 1 && companiesFind.length >= 1) {
                for (let index = 0; index < deals.length; index++) {
                  const deal = deals[index];
                  await Deals.create({
                    ...deal,
                    name: 'Negociação de ' + companyDeal.name,
                    pipeline: pipelineFind[index],
                    company: contact.company,
                    
                    createdAt: new Date(),
                    contact: contact,
                    activity: [
                      {
                        name: 'Iniciado por automação',
                        description: '',
                        createdAt: new Date(),
                        createdBy: { id: createdBy.id, name: createdBy.name },
                        tag: 'HOT',
                      },
                    ],
                    value: Number(CreateNegociation.output),
                    status: 'INPROGRESS',
                  }).save();
                }
              }
        
            
            } catch (error) {
              console.log(error)
              return res.status(400).json({ error: 'Cannot insert activity, try again' });
            }
            }
        }
      }
      // Notificação para adm ao criar um contato
      const Origin = contact.state;
      confirm.sendMail({
        to: "suporte.diegociara@gmail.com",
        from: '"Softspace" <api@contato.com>',
        subject: `Solicitação de ${name}`, // assunto do email
        template: 'newRequest',
        context: { name, email, phone, Origin },
      },
      (err) => {
        if (err) console.log('Email not sent')

        transport.close();
      });

      // transport.sendMail({
      //   to: email,
      //   from: 'contato@softspace.com.br',
      //   subject: 'Solicitação de acesso ', // assunto do email
      //   template: 'newContact',

      //   context: { name },
      // },
      // (err) => {
      //   if (err) console.log('Email not sent')

      //   transport.close();
      // });

      return res.status(201).json({ id: contact.id });
    } catch (error) {
      console.error(error);
      return res.status(404).json({ error: 'Create contact failed, try again' });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      const { name, email, phone, city, state, company }: ContactInterface = req.body;

      if (!id) return res.status(404).json({ message: 'Please send contact id' });

      const contact = await Contact.findOne(id);

      if (!contact) return res.status(404).json({ message: 'Cannot find contact' });

      const valuesToUpdate: ContactInterface = {
        name: name || contact.name,
        email: email || contact.email,
        phone: phone || contact.phone,
        city: city || contact.city,
        state: state || contact.state,
        company: company || contact.company,
      };

      await Contact.update(id, { ...valuesToUpdate });

      return res.status(200).json();
    } catch (error) {
      return res.status(404).json({ error: 'Update failed, try again' });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!id) return res.status(404).json({ message: 'Please send Contact id' });

      const contact = await Contact.findOne(id);

      if (!contact) return res.status(404).json({ message: 'Contact does not exist' });

      await Contact.softRemove(contact);

      return res.status(200).json();
    } catch (error) {
      return res.status(404).json({ error: 'Cannot delete Contact, try again' });
    }
  }
}

export default new ContactController();