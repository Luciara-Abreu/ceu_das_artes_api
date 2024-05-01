import { AppDataSource } from '../../data-source';
import bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';
import { Role } from '../../helpers/enum';

async function create() {
  const connection = await AppDataSource.initialize();
  const id = uuidV4();
  const password = await bcrypt.hash('inicial1234', await bcrypt.genSalt());
  const role = Role.Admin;

  connection.query(
    `INSERT INTO USERS(id, name, email, phone, role, password) VALUES('${id}', 'Admin', 'admin@ceudasartes.com.br', '23242698', '${role}', '${password}')`,
  );
}

create().then(() => console.log('User admin created!'));
