import express from "express";
import * as GroupController from "./group.controller";

const router_group = express.Router({});

router_group.get('/list-by-user', GroupController.listGroupByUser)
router_group.get('/list-count-customer', GroupController.listCountGroupByUser);
router_group.put('/user-group', GroupController.putUserGroup);

export default router_group;