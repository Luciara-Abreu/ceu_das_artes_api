import { userListMock } from '../helpers/mocks/user/user.list.mock';
import { UserServiceMock } from '../helpers/mocks/user/user.service.mock';
import { UserController } from './user.controller';
import { listUsersResReqMock } from '../helpers/mocks/user/list.users.res.req.mock';
import { createUserResReqMock } from '../helpers/mocks/user/create.user.res.req.mock';
import { updateUserResReqMock } from '../helpers/mocks/user/update.user.res.req.mock';
import { deleteUserResReqMock } from '../helpers/mocks/user/delete.user.res.req.mock';

describe('UserController', () => {
  let userController: UserController;
  let userServiceMock: any;

  beforeEach(() => {
    userServiceMock = UserServiceMock;
    userController = new UserController(userServiceMock);
  });

  it('must be able to validate the definition', () => {
    expect(userServiceMock).toBeDefined();
    expect(userController).toBeDefined();
  });

  it('must be able to return a list of users', async () => {
    const { req, res } = listUsersResReqMock();

    await userServiceMock.list();
    await userController.list(req, res);

    expect(userServiceMock.list).toHaveBeenCalledWith();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenLastCalledWith(userListMock);
  });

  it('must be able to create a user', async () => {
    const { req, res } = createUserResReqMock();

    await userServiceMock.create();
    await userController.create(req, res);

    expect(userServiceMock.create).toHaveBeenCalledWith();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(req.body).toEqual(userListMock[0]);
    expect(res.send).toHaveBeenCalledWith({ message: 'Usuário adicionado com sucesso!' });
  });

  it('must be able to update a user', async () => {
    const { req, res } = updateUserResReqMock();

    await userServiceMock.update();
    await userController.update(req, res);

    expect(userServiceMock.update).toHaveBeenCalledWith();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ message: 'Usuário atualizado com sucesso!' });
  });

  it('must be able to delete a user', async () => {
    const { req, res } = deleteUserResReqMock();

    await userServiceMock.delete();
    await userController.delete(req, res);

    expect(userServiceMock.delete).toHaveBeenCalledWith();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ message: 'Usuário excluído com sucesso!' });
  });
});
