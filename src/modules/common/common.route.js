import express from "express";
import * as CommonController from "./common.controller";

const router_common = express.Router({});

router_common.get('/address', CommonController.getAddress);

export default router_common;