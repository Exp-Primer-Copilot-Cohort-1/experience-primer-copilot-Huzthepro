function skillsMember() {
  return {
    name: 'skills',
    type: 'list',
    message: 'Select the skills you want to use',
    choices: [
      { name: 'React', value: 'react' },
      { name: 'Vue', value: 'vue' },
      { name: 'Angular', value: 'angular' },
      { name: 'Svelte', value: 'svelte' },
    ],
    default: ['react'],
  };
}