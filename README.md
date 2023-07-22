Learning project -- Book Manager --

Behaviour: - Admin can add/edit Categories and Authors. - User/Admin can add book selecting those two fields. - Login/Register flow

Front - Next/React - ChakraUI for components library - Formik + yup // going from custom error/form update management

Back - Next/Node - Prisma + MySQL //for DB management - jsonwebtoken // for authorisation logic - nodemailer with Brevo // sending email after register

The app will need values in .env variable to work: - NEXT_PUBLIC_BASEURL // needs to be assigned for requests ssr ++ - DATABASE_UR // connection string mysql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA - Pass_Encrypt_Secret // for hashing password - JWT_Key //JWT sign key - Brevo_user + Brevo_password //brevo mailing service api auth
