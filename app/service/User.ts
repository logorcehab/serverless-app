import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/User";
import { hash } from "bcryptjs";

interface IUserRequest {
    name: string;
    email: string;
    phone_number: string;
    admin?: boolean;
    password: string;
}
interface IUserUpdate {
    id: string;
    name: string;
    email: string;
    phone_number: string;
}

export class UserService {
    async execute({ name, email, phone_number, admin = false, password }: IUserRequest) {
            const usersRepository = getCustomRepository(UsersRepositories);

            if(!email) {
                throw new Error('Incorrect e-mail.');
            }

            const userAlreadyExists = await usersRepository.findOne({ email });

            if(userAlreadyExists) {
                throw new Error('User already exists.');
            }

            const passwordHash = await hash(password, 8);

            const user = usersRepository.create({ name, email, phone_number, admin, password: passwordHash });

            await usersRepository.save(user);

            return user;
    }
    async update(data: IUserUpdate[]) {
        const usersRepository = getCustomRepository(UsersRepositories)
        data.forEach((element: IUserUpdate)=>{
            if (element.id) {
                const user = usersRepository.findOne({ id: element.id });

                if(user) {
                    usersRepository.update(element, element)
                }
            }
        })
    }
    async find({ userId, phoneNumber }) {
        const usersRepository = getCustomRepository(UsersRepositories);

        if(userId || phoneNumber) {
            if(userId && phoneNumber) return await usersRepository.findOne({id: userId, phone_number: phoneNumber})
            if(userId) return await usersRepository.findOne({id: userId})
            if(phoneNumber) return await usersRepository.findOne({phone_number: phoneNumber})
        }

        const user = usersRepository.find();
        return user;
    }
    async deleteOne({ userId }) {
        const usersRepository = getCustomRepository(UsersRepositories);
        const user = await usersRepository.findOne({id: userId});

        if(user) {
            await usersRepository.delete(user)
            return user;
        }
    }
    
}