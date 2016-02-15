page('/',
  projectController.loadAllProjects,
  aboutController.loadGHProjects,
  projectController.index
);

page('/about',
  aboutController.loadGHProjects,
  aboutController.index
);

page('/failure',
  failureController.index
);

page();
