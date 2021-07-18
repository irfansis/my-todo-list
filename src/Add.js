import React from 'react';
import {create, update} from './apiServices';
import banner from './banner.jpg'; // Tell webpack this JS file uses this image
import './Add.css'
import logo from './Capture.PNG'; // Tell webpack this JS file uses this image

const Add = ({selectID}) => {
    let ID, t='',isUpdate;
    // window.location.reload(false); 

    if (selectID !==null){
        [ID, t] = selectID.split(',');
        isUpdate = Boolean(ID);
    }

    console.log(ID, isUpdate);
    const [title, setTitle] = React.useState(t);
    
    function handleSubmit(event) {
        event.preventDefault();
        if (isUpdate){
            update(ID, {title});
        }
        else{
            create({title});
        }
        
        window.location.reload();
    }
  
    function handleChange(event) {
        setTitle(event.target.value);
    }
    
    return (
        <div className='Add'>
                        <img className='logo' src={logo}/>

            <img className='My' src={banner}/>
        <h1>Add/Edit ToDoList Item</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Enter/Edit Title:
            <input type="text" onChange={handleChange} value={title}/>
          </label>
          <input type="submit" value="Save" />
        </form>
        </div>
    );
}

export default Add;