import { useState } from 'react';
import '../Styling/list.scss';

const Task = function (props){
    const taskList = props.task;
    const [editingIndex, setEditingIndex] = useState(null);
    const [editInput, setEditInput] = useState('');
    const [filter, setFilter] = useState('All');

    const handleEdit = (task,id) => {
        setEditingIndex(id);
        setEditInput(task);
    }

    const handleCancel = () => {
        setEditingIndex(null);
    }

    const handleSubmitEnter = (e,id) => {
        if(e.key === "Enter"){
            const updatedTask = taskList.map((task) => {
                if(task.id === id){
                    return {...task, taskitem: editInput}
                }
                return task;
            })
            props.setTask(updatedTask);
            setEditingIndex(null);
            setEditInput('');
        }
    }

    const handleSubmit = (id) => {
        const updatedTask = taskList.map((task) => {
            if(task.id === id){
                return {...task, taskitem: editInput}
            }
            return task;
        })
        props.setTask(updatedTask);
        setEditingIndex(null);
        setEditInput('');
    }

    const handleDelete = (tasl) => {
        const remaining_task = taskList.filter((task) => {
            return task !== tasl;
        });
        props.setTask(remaining_task);
    }

    const toggleCheck = (id) => {
        const updatedTask = taskList.map((task) => {
            if(task.id === id){
                return {...task, checked: !task.checked}
            }
            return task;
        })
        props.setTask(updatedTask);
    }

    return(
        <div className='list'>
            <div className='filter'>
                <p className='pf'>Filter:</p>
                <select className='fil' value={filter} onChange={(e) => setFilter(e.target.value)} >
                    <option value='All'>All</option>
                    <option value='Completed'>Completed</option>
                    <option value='Active'>Active</option>
                </select>
            </div>
            {
                taskList.map((task,id) => {
                    if(filter === 'Completed' && task.checked)
                    return( 
                        <div key={id}>
                            <ul className="listOfTask">
                                <input className='check' type='checkbox' checked={task.checked} onChange={() => toggleCheck(task.id)}></input>
                                {editingIndex === task.id ? (<input className='editInp' type='text' value={editInput}
                                onChange={(e) => setEditInput(e.target.value)}
                                onKeyDown={(e) => handleSubmitEnter(e,task.id)}></input>) 
                                : (<p className='listItem'>{task.taskitem}</p>)}
                                {editingIndex === task.id ?
                                (<div className='addcancel'>
                                    <button className='add' onClick={() => handleSubmit(task.id)}>+</button>
                                    <button className='cancel' onClick={() => handleCancel()}>X</button>
                                </div>)
                                :(<button className='edit' onClick={() => handleEdit(task.taskitem,task.id)}>Edit</button>)
                                }
                                <i className='fa fa-trash' onClick={() => handleDelete(task)}></i>
                            </ul>
                        </div>
                    )
                    else if (filter === 'Active' && !task.checked)
                        return( 
                            <div key={id}>
                                <ul className="listOfTask">
                                    <input className='check' type='checkbox' checked={task.checked} onChange={() => toggleCheck(task.id)}></input>
                                    {editingIndex === task.id ? (<input className='editInp' type='text' value={editInput}
                                    onChange={(e) => setEditInput(e.target.value)}
                                    onKeyDown={(e) => handleSubmitEnter(e,task.id)}></input>) 
                                    : (<p className='listItem'>{task.taskitem}</p>)}
                                    {editingIndex === task.id ?
                                    (<div className='addcancel'>
                                        <button className='add' onClick={() => handleSubmit(task.id)}>+</button>
                                        <button className='cancel' onClick={() => handleCancel()}>X</button>
                                    </div>)
                                    :(<button className='edit' onClick={() => handleEdit(task.taskitem,task.id)}>Edit</button>)
                                    }
                                    <i className='fa fa-trash' onClick={() => handleDelete(task)}></i>
                                </ul>
                            </div>
                        )
                        else if(filter === 'All')
                    return( 
                        <div key={id}>
                            <ul className="listOfTask">
                                <input className='check' type='checkbox' checked={task.checked} onChange={() => toggleCheck(task.id)}></input>
                                {editingIndex === task.id ? (<input className='editInp' type='text' value={editInput}
                                onChange={(e) => setEditInput(e.target.value)}
                                onKeyDown={(e) => handleSubmitEnter(e,task.id)}></input>) 
                                : (<p className={task.checked? "listItemC":"listItem"}>{task.taskitem}</p>)}
                                {editingIndex === task.id ?
                                (<div className='addcancel'>
                                    <button className='add' onClick={() => handleSubmit(task.id)}>+</button>
                                    <button className='cancel' onClick={() => handleCancel()}>X</button>
                                </div>)
                                :(<button className='edit' onClick={() => handleEdit(task.taskitem,task.id)}>Edit</button>)
                                }
                                <i className='fa fa-trash' onClick={() => handleDelete(task)}></i>
                            </ul>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Task;