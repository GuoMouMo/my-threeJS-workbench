import loadable from '@loadable/component';

const routes = [
    {
        path: "/three",
        component: loadable(() => import('./home')),
        routes: [
            {
                path: "/rocket",
                component: loadable(() => import('./rocket')),
            },
        ]
    },
];

export default routes;
