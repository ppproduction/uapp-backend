import { GenericTypeormService } from "@typeauto/typeorm-generics";
import User from "../../models/entities/userEntity";
import UserInterface from "../../models/interfaces/UserInterface";
import UserPosgres from "../../repositories/user/postgres";
class UserService extends GenericTypeormService<User> implements UserInterface {
    private userRepository : UserInterface;
    constructor(repository : UserInterface) {
        super(repository);
        this.userRepository = repository;
    }

    async login(user_name: string, password: string): Promise<{ token: string; }> {
        return this.userRepository.login(user_name, password);
    }

    async signup(user_name: string, email: string, password: string): Promise<{ success: boolean; }> {
        return this.userRepository.signup(user_name, email, password);
    }
}

export default { service : UserService, name : 'user' };