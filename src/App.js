import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import List from './components/List';
import Alert from './components/Alert';

function App() { 
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({show: false, msg: '', type: ''});

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!name) {
      showAlert(true, "please enter valuer", "danger");
    }
    else if(name && isEditing) {
      // deal with edit
    }
    else {
      showAlert(true, "item add to the list", "success")
      const newItem = {id: uuidv4(), title: name,};
      setList([newItem, ...list]);
      setName('');
    }
  
  }

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({show, msg, type});
  }

  const clearList = () => {
    showAlert(true, "empty list", "danger");
    setList([]);
  }

  const removeItem = (id) => {
    showAlert(true, "item removed", "danger")
    setList(list.filter(item => (item.id !== id)))
  }

  return (
    <div>
      <section className="section-center">
        <form className="grocery-form" onSubmit={handleSubmit}>
          {alert.show && <Alert alert={alert} removeAlert={showAlert} />}
          <h3>grocery bud</h3>
          <div className="form-control">
            <input 
              type="text"
              value={name}
              onChange={handleName}
              className="grocery" 
              placeholder="e.g. eggs"/>
            <button 

              className="submit-btn"
            >
            {isEditing ? 'edit' : 'submit'}
            </button>
          </div>
        </form>
        {list.length > 0 && 
        <div className="grocery-container">
          <List items={list}  removeItem={removeItem} />
          <button
            type="button"
            onClick={clearList} 
            className="clear-btn">
            clear items
          </button>
        </div>    
        }
      </section>
    </div>
  );
}

export default App;
