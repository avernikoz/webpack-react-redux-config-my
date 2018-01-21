// Литература (видео, уроки, ресурсы)
// Вы пишите так let RandomMessage = React.createClass или extends.React ???
// Какой скелет для реакта юзаете?
// state атоматом передаётся в пропсы дочерних элементов, или нет?

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

React.createClass = createReactClass;

const notes = [
    {
        id: 1,
        name: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis cupiditate, eos! Adipisci autem harum quos!',
        color: '#3444FF'
    }, {
        id: 2,
        name: 'veritatis? Eos illum laudantium recusandae repellendus similique. Consequatur dolorem nesciunt numquam possimus soluta! Provident.',
        color: '#FF113A'
    }, {
        id: 3,
        name: 'Amet aspernatur autem facilis laborum molestias praesentium reiciendis rerum elit. Excepturi, voluptatum.',
        color: '#19FF2C'
    }, {
        id: 4,
        name: 'dolorem dolores, ea eligendi facilis fuga harum illum in ipsum itaque.',
        color: '#FFD700'
    }, {
        id: 5,
        name: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi.,
        color: '#E88AFF'
    }, {
        id: 6,
        name: 'optio perferendis quidem quisquam recusandae repellendus suscipit veniam',
        color: '#9AFF8F'
    }, {
        id: 7,
        name: 'ducimus eos eum expedita explicabo incidunt inventore iste iure labore minus nostrum nulla,',
        color: '#FF3BBA'
    }, {
        id: 8,
        name: 'consequuntur culpa cum cupiditate deserunt distinctio,',
        color: '#B91BFF'
    }, {
        id: 9,
        name: 'unde veritatis vitae voluptates voluptatibus! ',
        color: '#00FFF9'
    }
];


let Note = React.createClass({
    render: function () {
        return (
            <div className="note">Note</div>
        )
    }
});

let NotesEditor = React.createClass({
    render: function () {
        return (
            <div className="notes-editor">
                <textarea className="textarea" name="editor" cols="30" rows="10" placeholder="Текст заметки"/>
                <input className="add-button" type="button" value="Добавить"/>
            </div>
        )
    }
});

let NotesContainer = React.createClass({
    render: function () {
        return (
            <div className="notes-container">
                <Note/>
                <Note/>
                <Note/>
            </div>
        )
    }
});

let NotesApp = React.createClass({
    render: function () {
        return (
            <div className="notes-app">
                <NotesEditor/>
                <NotesContainer/>
            </div>
        )
    }
});


ReactDOM.render(
    <NotesApp />,
    document.getElementById('root')
);




