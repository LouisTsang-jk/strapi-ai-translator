export default [
  {
    method: 'GET',
    path: '/',
    // name of the controller file & the method.
    handler: 'controller.index',
    config: {
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/translate',
    handler: 'controller.translate',
    config: {
      policies: [],
    },
  },
];
