import { UserService } from "../service/User";

export class UserController {
    async create(event, context, callback) {
        try {
            const { name, email, phone_number, admin, password } = JSON.parse(event.body)

            const userService = new UserService();

            const user = await userService.execute({ name, email, phone_number, admin, password });
            
            // if(user instanceof Error) {
            //     return response.send({ error: user.message });
            // }

            return callback(null,{ statusCode: 200, body: { user}})
        } catch (error) {
            return callback(null,{ statusCode: error.code, body: { error }})
        }
    }
    async update(event, context, callback) {
        try {
            const data = JSON.parse(event.body)

            const userService = new UserService();
            
            const user = await userService.update(data);
            
            // if(user instanceof Error) {
            //     return response.send({ error: user.message });
            // }

            return callback(null,{ statusCode: 200, body: { user}})
        } catch (error) {
            return callback(null,{ statusCode: error.code, body: { error }})
        }
    }
    async find(event, context, callback){
        try{
            const { userId, phoneNumber } = event.queryStringParameters
            
            const userService = new UserService();

            const user = await userService.find({ userId, phoneNumber });
            return callback(null,{ statusCode: 201, body: { user}})
        } catch (error){
            return callback(null,{ statusCode: error.code, body: { error }})
        }
    }
    async deleteOne(event, context, callback){
        try{
            const { userId } = event.pathParameters
            
            const userService = new UserService();

            const user = await userService.deleteOne({ userId });
            return callback(null,{ statusCode: 201, body: { user}})
        } catch (error){
            return callback(null,{ statusCode: error.code, body: { error }})
        }
    }
}