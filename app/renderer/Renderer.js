const { ipcRenderer } = require('electron');

export function saveProjectListToDisk(projects) {
  var savedProjects = ipcRenderer.sendSync('save-project-list', JSON.stringify(projects));
  console.log('Project List Saved ', savedProjects);
}

export function saveCurrentProjectDetailsToDisk(project, projectId) {
  var savedProject = ipcRenderer.sendSync('save-current-project', {project: project, id: projectId});
  console.log('Project saved ', savedProject);
}
