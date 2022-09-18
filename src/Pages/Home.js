import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import ListCard from "../Components/ListCard";
import 'bootstrap/dist/css/bootstrap.min.css'

const Home = () => {
  const [todolists, setTodolists] = useState([]);
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');

  const getToDoList = async () => {
    await axios
      .get("https://api.todoist.com/rest/v2/tasks", {
        headers: {
          Authorization: "Bearer 3648d2227e8c873891764ff26231c878c0a9fb8a",
        },
      })

      .then((response) => {
        setTodolists(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const postTodo = (e) => {
    e.preventDefault();
    axios
    .post('https://api.todoist.com/rest/v2/tasks', {
        "content": content,
        "description" : description,
    }, 
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer 3648d2227e8c873891764ff26231c878c0a9fb8a",
          },

    })
    .then((response) => {
        console.log('response:', response);
         setTodolists((posts) => [response.data, ...posts]);
      })

      .catch((error) => {
        console.log(error);
      });
  }

  const deleteTodo = (id) => {
    axios .delete(`https://api.todoist.com/rest/v2/tasks/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer 3648d2227e8c873891764ff26231c878c0a9fb8a",
          },
    })
    .then((response) => {
        console.log('response:', response);
        // setTodolists((posts) => [response.data, ...posts]);
      })

      .catch((error) => {
        console.log(error);
      });
  }

  const editTodo = () => {
    // e.preventDefault();
    // axios
    // .post(`https://api.todoist.com/rest/v2/tasks/${id}`, {
    //     "content": content,
    //     "description" : description,
    // }, 
    // {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': "Bearer 3648d2227e8c873891764ff26231c878c0a9fb8a",
    //       },

    // })
    // .then((response) => {
    //     console.log('response:', response);
    //      setTodolists((posts) => [response.data, ...posts]);
    //   })

    //   .catch((error) => {
    //     console.log(error);
    //   });

  }


  useEffect(() => {
    getToDoList();
  }, []);

  return (
    <div className="container-fluid">
        <h1>To Do Lists</h1>
      <div className="container">
        <div>
        <Form>
          <Form.Group className="mb-3" controlId="formToDo">
            <Form.Label>To Do</Form.Label>
            <Form.Control
              type="text"
              placeholder="What do you want to do?"
              value={content} onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDesc">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder="Add description..." value={description} onChange={(e) => setDescription(e.target.value)}/>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={postTodo}>
            Add
          </Button>
        </Form>
        </div>
        <div>
        {todolists.map((item) => {
          return <ListCard 
          content={item.content}
          description={item.description}
          onClickDelete={() => deleteTodo(item.id)}
          onClickEdit={() => editTodo(item)}/>;
        })}
      </div>
      </div>
    </div>
  );
};

export default Home;
