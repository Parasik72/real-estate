import { sessions } from "../sessions";

import CONTROLLER from "../decorators/controller.decorator";
import GET from "../decorators/get.decorator";
import MESSAGE from "../decorators/message.decorator";
import USE from "../decorators/use.decorator";

@CONTROLLER()
export class TestController {
    
    @USE([sessions])
    @GET('/api/test')
    @MESSAGE('TEST')
    async test() {

    }
}