import { userListMock } from '../helpers/mocks/user.list.mock';
import { UserServiceMock } from '../helpers/mocks/user.service.mock';
import { UserController } from './user.controller';
import { reqMock } from '../helpers/mocks/req.mock';
import { resMock } from '../helpers/mocks/res.mock';

describe('UserController', () => {
  let userController: UserController;
  let userServiceMock: any;
  let req: any;
  let res: any;

  beforeEach(() => {
    req = reqMock;
    res = resMock;
    userServiceMock = UserServiceMock;
    userController = new UserController(userServiceMock);
  });

  it('must be able to validate the definition', () => {
    expect(userServiceMock).toBeDefined();
    expect(userController).toBeDefined();
  });

  describe('method list', () => {
    it('must be able to return a list of users', async () => {
      req.body = userListMock;

      await userServiceMock.list();
      await userController.list(req, res);

      expect(userServiceMock.list).toHaveBeenCalledWith();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenLastCalledWith(userListMock);
    });
  });

  describe('method create', () => {
    it('must be able to create a user', async () => {
      req.body = userListMock[0];

      await userServiceMock.create();
      await userController.create(req, res);

      expect(userServiceMock.create).toHaveBeenCalledWith();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(req.body).toEqual(userListMock[0]);
      expect(res.send).toHaveBeenCalledWith({ message: 'Usuário adicionado com sucesso!' });
    });
  });

  describe('method update', () => {
    it('must be able to update a user', async () => {
      req.param = userListMock[0].id;

      await userServiceMock.update();
      await userController.update(req, res);

      expect(userServiceMock.update).toHaveBeenCalledWith();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ message: 'Usuário atualizado com sucesso!' });
    });
  });

  describe('method delete', () => {
    it('must be able to delete a user', async () => {
      req.param = userListMock[0].id;

      await userServiceMock.delete();
      await userController.delete(req, res);

      expect(userServiceMock.delete).toHaveBeenCalledWith();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ message: 'Usuário excluído com sucesso!' });
    });
  });
});
