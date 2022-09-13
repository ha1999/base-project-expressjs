import express from 'express';
import {
    router_group,
    router_customer,
    router_common
} from './modules';

const routes = express.Router({});
routes.use('/group/', router_group);
routes.use('/customer/', router_customer);
routes.use('/common/', router_common);
export default routes;