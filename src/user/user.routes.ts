import { Router } from "express";
import { auth } from "../middlware/auth.middleware";

import { Delete_User, getAll_Users,update_User } from "./user.controller";

const router = Router();

router.get('/',auth(),getAll_Users);
router.put('/:id',auth(), update_User);
router.delete('/:id',auth(), Delete_User);


export const UserRouter = router;