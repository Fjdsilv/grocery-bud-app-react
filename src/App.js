import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import List from './components/List';
import Alert from './components/Alert';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if(list) {
    return JSON.parse(localStorage.getItem('list'))
  }
  else {
    return []
  }
}

function App() { 
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
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
      setList(list.map((item) => {
        if(item.id === editID) {
          return {...item, title:name}
        }
        return item
      })) 

      setName('');
      setEditID(null);
      setIsEditing(false)
      showAlert(true, "value changed", "success")
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
    showAlert(true, "item removed", "danger");
    setList(list.filter(item => (item.id !== id)));
  }

  const editItem = (id) => {
    const specificItem = list.find(item => (item.id === id));
    setIsEditing(true);
    setEditID(id)
    setName(specificItem.title);
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return (
    <div>
      <section className="section-center">
        <form className="grocery-form" onSubmit={handleSubmit}>
          {alert.show && <Alert alert={alert} removeAlert={showAlert} list={list} />}
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
          <List 
            items={list} 
            removeItem={removeItem}
            editItem={editItem} 
          />
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
