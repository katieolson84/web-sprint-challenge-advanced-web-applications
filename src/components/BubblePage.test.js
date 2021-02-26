import React from "react";
import { render, screen } from "@testing-library/react";
import BubblePage from "./BubblePage";
import ColorList from './ColorList';
import Bubbles from './Bubbles'

const mockColors = [
      {
        color: "aquamarine1",
        code:{
          hex: "#7fffd4"
        },
        id: 1,
      },
      {
        color: "CadetBlue1",
        code:{
          hex: "#98f5ff"
        },
        id: 2,
      },
      {
        color: "blue1",
        code:{
          hex: "#0000ff"
        },
        id: 3,
      },
    ];

  test("Renders BubblePage without errors", async ()=> {
    render(<BubblePage />);
  });

  test("Fetchs data and renders the bubble on mounting", async () => {
    render(<ColorList colors={mockColors} />);
    render(<Bubbles colors={mockColors} />);

    const color = await screen.findByText(/aquamarine1/i);
    const bubblesOnScreen = await screen.findByTestId(/bubbles/i);

  expect(color).toBeInTheDocument();
  expect(bubblesOnScreen).toBeInTheDocument();
  
  })
// const fetchColors = () => {
//   axiosWithAuth()
//     .get("/colors")
//     .then((res) => setColorList(res.data))
//     .catch((err) => console.log(err.res.data));
// };

// let mockFetchColors = fetchColors();

// jest.mock(mockFetchColors);
// console.log("colors", mockFetchColors);

// describe("Color testing", ()=> {
//   test('Renders without error', () => {
//   render(<BubblePage colors={[]} />);
// });

// test("Data renders on the page and bubbles appear", async () => {
//   const mockColors = [
//     {
//       color: "aquamarine1",
//       code:{
//         hex: "#7fffd4"
//       },
//       id: 1,
//     },
//     {
//       color: "CadetBlue1",
//       code:{
//         hex: "#98f5ff"
//       },
//       id: 2,
//     },
//     {
//       color: "blue1",
//       code:{
//         hex: "#0000ff"
//       },
//       id: 3,
//     },
//   ];

//   const {rerender} = render(<BubblePage mockColors= {[]} />)

//   rerender(<BubblePage mockColors={mockColors} />)

//   expect(await screen.findByText(/bubbles/i)).toBeInTheDocument();
//   expect(await screen.findByText(/colors/i)).toBeInTheDocument();

// })
// })
