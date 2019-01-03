import * as React from "react";
import { render } from "react-dom";
import { ThemeProvider } from "react-jss";

import ImageMapper from "./ImageMapper";

const src = "https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg";
const areas = [
  {
    id: "1",
    shape: "poly",
    coords: [25, 33, 27, 300, 128, 240, 128, 94]
  },
  {
    id: "2",
    shape: "poly",
    coords: [219, 118, 220, 210, 283, 210, 284, 119],
    selected: true,
    fillStyle: "rgba(255, 255, 0, 0.4)"
  },
  {
    id: "3",
    shape: "poly",
    coords: [381, 241, 383, 94, 462, 53, 457, 282]
  },
  {
    id: "4",
    shape: "poly",
    coords: [245, 285, 290, 285, 274, 239, 249, 238],
    selected: true,
    fillStyle: "rgba(0, 0, 0, 0.4)"
  }
];

class App extends React.Component {
  public render() {
    return (
      <ThemeProvider theme={{}}>
        <ImageMapper name="my-map" src={src} areas={areas} width={500} />
      </ThemeProvider>
    );
  }
}

render(<App />, document.getElementById("root"));
