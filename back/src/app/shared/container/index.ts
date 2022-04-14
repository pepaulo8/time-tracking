import { container } from "tsyringe";
import { UsersRepository } from "../../repositories/implementation/UsersRepository";
import { RegistersRepository } from "../../repositories/implementation/RegistersRepository";
import { IRegistersRepository } from "../../repositories/IRegistersRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";


container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IRegistersRepository>(
  "RegistersRepository",
  RegistersRepository
);
