import React, { useEffect, useState } from "react";

// Components
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import axiosWithAuth   from '../helpers/axiosWithAuth';


const BubblePage = (props) => {
  const [colorList, setColorList] = useState([]);
  // const [update, setUpdate] = useState(false);

  useEffect(() => {
    axiosWithAuth()
      .get('/colors')
      .then(res => setColorList(res.data))
      .catch(err => console.log('error', err))
  }, []);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    window.location.href ="/";
  }

  return (
    <>
      <h1> Bubble Page </h1>
        <ColorList colors={colorList} updateColors={setColorList} />
        <Bubbles colors={colorList} />
      <footer>
        <button onClick={logout}>Logout</button>
      </footer>
    </>
  );
};

export default BubblePage;

//Task List:
//1. Make an axios call to retrieve all color data and push to state on mounting.
