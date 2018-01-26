let exampleCategories = [
    {
        id: 1,
        parent: null,
        name: 'Category 1'
    },
    {
        id: 2,
        parent: null,
        name: 'Category 2'
    },
    {
        id: 3,
        parent: null,
        name: 'Category 3'
    },
    {
        id: 123213,
        parent: 3,
        name: 'Category 12323'
    },
    {
        id: 9932,
        parent: 3,
        name: 'Category 39932'
    },
    {
        id: 842,
        parent: 3,
        name: 'Category 842'
    },
    {
        id: 66,
        parent: 842,
        name: 'Category 68'
    },
    {
        id: 68,
        parent: 842,
        name: 'Category 69'
    },
    {
        id: 111,
        parent: 68,
        name: 'Category 001'
    },
];

let exampleTasks = [
    {
        id: 1,
        catid: 1,
        name: 'Task 1'
    },
    {
        id: 2,
        catid: 1,
        name: 'Task 2'
    },
    {
        id: 3,
        catid: 2,
        name: 'Task 1'
    },
    {
        id: 4,
        catid: 2,
        name: 'Task 2'
    },
    {
        id: 5,
        catid: 2,
        name: 'Task 3'
    },
    {
        id: 6,
        catid: 3,
        name: 'Task 1'
    },
    {
        id: 7,
        catid: 3,
        name: 'Task 2'
    },
    {
        id: 8,
        catid: 3,
        name: 'Task 3'
    },
    {
        id: 9,
        catid: 3,
        name: 'Task 4'
    },
    {
        id: 10,
        catid: 3,
        name: 'Task 5'
    },
];

export {exampleCategories,exampleTasks} ;
