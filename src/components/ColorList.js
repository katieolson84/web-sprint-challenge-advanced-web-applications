// import React, { useState, useEffect } from "react";
// import  axiosWithAuth  from '../helpers/axiosWithAuth';
// import EditMenu from './EditMenu';
// import { useParams, useHistory }  from 'react-router-dom';

// const initialColor = {
//   color: "",
//   code: { hex: "" }
// };

// const ColorList = ({ colors, updateColors }) => {
  
//   const [editing, setEditing] = useState(false);
//   const [colorToEdit, setColorToEdit] = useState(initialColor);
//   const { id } = useParams();
//   const { push } = useHistory();

//   useEffect(() => {
//     axiosWithAuth()
//       .get('/colors')
//       .then((res) => updateColors(res.data))
//       .catch((err) => console.log(err));
//   },[updateColors])

//   const editColor = color => {
//     setEditing(true);
//     setColorToEdit(color);
//   };
//   console.log('colors', colors);

//   const saveEdit = e => {
//     e.preventDefault();
//     axiosWithAuth()
//       .put(`/colors/${colorToEdit.id}`, colorToEdit)
//       .then(res => {
//         const updatedColorList = colors.map((color) => {
//           if(color.id ===res.data.id) {
//             return res.data;
//           }else {
//             return color;
//           }
//         });
//         updateColors(updatedColorList);
//         push('/bubbles');
//         // setEditing(false)
//       })
//       .catch(err => {
//         console.log('error when editing', err.response)
//       })
//   };

//   const deleteColor = color => {
//     axiosWithAuth()
//       .delete(`/colors/${color.id}`)
//       .then((res) => {
//         deleteColor= colors.filter(item => item.id !== res.data)
//         updatedColors(deleteColor)
//         setEditing(false)
//       })
//       .catch((err) => {
//         console.log(err.response)
//       });
//   };

//   return (
//     <div className="colors-wrap">
//       <p>colors</p>
//       <ul>
//         {colors.map(color => (
//           <li key={color.color} onClick={() => editColor(color)}>
//             <span>
//               <span className="delete" onClick={e => {
//                     e.stopPropagation();
//                     deleteColor(color)
//                   }
//                 }>
//                   x
//               </span>{" "}
//               {color.color}
//             </span>
//             <div
//               className="color-box"
//               style={{ backgroundColor: color.code.hex }}
//             />
//           </li>
//         ))}
//       </ul>
//       { editing && <EditMenu colorToEdit={colorToEdit} saveEdit={saveEdit} setColorToEdit={setColorToEdit} setEditing={setEditing}/> }

//     </div>
//   );
// };

// export default ColorList;

// //Task List:
// //1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
// //2. Complete the deleteColor functions by making a delete request for deleting colors.
import React, { useState } from "react";
import axiosWithAuth from "../helpers/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        setEditing(false)
      })
      .catch(err => console.log(`error`, err.response))
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        updateColors(colors.filter(item => item.id !== color.id))
        setEditing(false)
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
