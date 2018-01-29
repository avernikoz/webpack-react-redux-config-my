let exampleCategories = [
    {
        id: 1,
        parent: null,
        name: 'Category 1',
        numberOfTasks: 2,
        numberOfCompletedTasks: null
    },
    {
        id: 2,
        parent: null,
        name: 'Category 2',
        numberOfTasks: 3,
        numberOfCompletedTasks: 2
    },
    {
        id: 3,
        parent: null,
        name: 'Category 3',
        numberOfTasks: 5,
        numberOfCompletedTasks: 2
    },
    {
        id: 123213,
        parent: 3,
        name: 'Category 12323',
        numberOfTasks: null,
        numberOfCompletedTasks: null
    },
    {
        id: 9932,
        parent: 3,
        name: 'Category 39932',
        numberOfTasks: null,
        numberOfCompletedTasks: null
    },
    {
        id: 842,
        parent: 3,
        name: 'Category 842',
        numberOfTasks: null,
        numberOfCompletedTasks: null
    },
    {
        id: 66,
        parent: 842,
        name: 'Category 68',
        numberOfTasks: null,
        numberOfCompletedTasks: null
    },
    {
        id: 68,
        parent: 842,
        name: 'Category 69',
        numberOfTasks: null,
        numberOfCompletedTasks: null
    },
    {
        id: 111,
        parent: 68,
        name: 'Category 001',
        numberOfTasks: null,
        numberOfCompletedTasks: null
    },
];

let exampleTasks = [
    {
        id: 1,
        catid: 1,
        name: 'Task 1',
        description: '',
        completed: false
    },
    {
        id: 2,
        catid: 1,
        name: 'Task 2',
        description: '',
        completed: false
    },
    {
        id: 3,
        catid: 2,
        name: 'Task 1',
        description: '',
        completed: false
    },
    {
        id: 4,
        catid: 2,
        name: 'Task 2',
        description: '',
        completed: true
    },
    {
        id: 5,
        catid: 2,
        name: 'Task 3',
        description: '',
        completed: true
    },
    {
        id: 6,
        catid: 3,
        name: 'Task 1',
        description: '',
        completed: true
    },
    {
        id: 7,
        catid: 3,
        name: 'Task 2',
        description: '',
        completed: true
    },
    {
        id: 8,
        catid: 3,
        name: 'Task 3',
        description: '',
        completed: false
    },
    {
        id: 9,
        catid: 3,
        name: 'Task 4',
        description: '',
        completed: false
    },
    {
        id: 10,
        catid: 3,
        name: 'Task 5',
        description: '',
        completed: false
    },
];

export {exampleCategories,exampleTasks} ;
