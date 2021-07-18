import React from 'react';
import {fetch1, update, del} from './apiServices';
import Add from './Add';
import './App.css';
import logo from './Capture.PNG'; // Tell webpack this JS file uses this image
import banner from './banner.jpg'; // Tell webpack this JS file uses this image


const Component = ({setAdd,setSelectID}) => {
  const heading = ["ID", "Title", "Actions"]
  const [ToDoList, setToDoList] = React.useState();
  const[titles,setTitles] = React.useState([]);

  React.useEffect(() => {
    if (ToDoList){
      console.log(ToDoList[0].id)
      setTitles(ToDoList.map(each => {
        return each.title;
      }));
    }
    else{
      fetch1(setToDoList);
      console.log(ToDoList);
    }
  }, [ToDoList]);

function edit(){
  setAdd(true)
}

function _update(e){
  const id = e.target.value;
  const value = e.target.value+','+ToDoList.find(element => element.id=== id).title;
  setSelectID(value);
}    

function Ys (){
  return <img className='My' src={banner}/>
}
if (titles){

  return (
    <div>
      <img className='logo' src={logo}/>
      <Ys/>
    <div className='main'>
      
      {/* <div className='main-logo'><img src={logo}/></div> */}
      <button id='add' onClick={edit}>+ Add</button>
      <table id="todolist">
        <tr>
          {heading.map(eachEntry => {
              return <th>{eachEntry}</th>
          })}
        </tr>
        {titles.map((eachEntry,index) => {
            return (              
              <tr>
                <td>{index+1}</td>
                <td>{eachEntry}</td>
                <td>
                  <button p={eachEntry} value={ToDoList[index].id ?ToDoList[index].id : 0} onClick={_update}>Update</button>
                  <button id='del' value={ToDoList[index].id ?ToDoList[index].id : 0 } onClick={e => del(setToDoList, setTitles, e)}>Delete</button>
                </td>
              </tr>
            )
        })}
      </table>
    </div>
    </div>
  )}

  return <div className='loader'><img src="https://i.pinimg.com/originals/7d/b6/23/7db623e4514e37914168ff09f6516cec.gif"/></div>
}

function App() {
  const [add, setAdd] = React.useState(true);
  const [selectID,setSelectID] = React.useState(null);
  
  React.useEffect(() => {
    setAdd(!add);
  }, [selectID]);

  return (
    <div className="App">
      {add ? <Add setAdd={setAdd} setSelectID={setSelectID} selectID={selectID}/> 
      
      : <Component setAdd={setAdd} setSelectID={setSelectID}/>}       
    </div>
  );
}

export default App;
