import * as React from "react";
import { render } from "react-dom";
import { ThemeProvider } from "react-jss";
//import imageMapResize from "image-map-resizer";
import './App.css';
import Select from 'react-select';
import ImageMapper, { Shape, IImageMapperArea }from "./ImageMapper";

const src = require('./Layout_Sample.jpg');

export type real_estate = IImageMapperArea & {direction?: string, name?: string}

const options = [
  { value: 'ALL', label: 'ALL' },
  { value: 'E', label: 'EAST' },
  { value: 'W', label: 'WEST' },
  { value: 'S', label: 'SOUTH' },
  { value: 'N', label: 'NORTH' },
  { value: 'NW', label: 'NORTH WEST' },
  { value: 'SE', label: 'SOUTH WEST' },
  { value: 'NE', label: 'NORTH EAST' },
  { value: 'NW', label: 'NORTH WEST' },
];

//const src = "https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg";
const temp_area = [
  {shape:"poly" ,coords: [354, 714, 355, 786, 432, 786, 417, 712], title: "NE-776" },

{shape:"rect" ,coords: [317, 714, 355, 789], title: "E-777" },

{shape:"rect" ,coords: [282, 713, 317, 787], title: "E-778" },

{shape:"rect" ,coords: [245, 715, 283, 788], title: "E-779" },

{shape:"rect" ,coords: [208, 713, 245, 785], title: "E-780" },

{shape:"rect" ,coords: [172, 714, 207, 787], title: "E-781" },

{shape:"rect" ,coords: [313, 644, 415, 714], title: "NW-788" },

{shape:"rect" ,coords: [279, 644, 315, 715], title: "W-787" },

{shape:"rect" ,coords: [243, 647, 280, 714], title: "W-786" },

{shape:"rect" ,coords: [208, 646, 245, 714], title: "W-785" },

{shape:"rect" ,coords: [172, 645, 208, 713], title: "W-784" },

{shape:"rect" ,coords: [115, 713, 172, 783], title: "SE-782" },

{shape:"rect" ,coords: [117, 645, 174, 714], title: "SW-783" },

{shape:"rect" ,coords: [280, 538, 315, 606], title: "E-790" },

{shape:"rect" ,coords: [245, 539, 281, 607], title: "E-791" },

{shape:"rect" ,coords: [209, 536, 245, 603], title: "E-792" },

{shape:"rect" ,coords: [172, 533, 209, 606], title: "E-793" },

{shape:"rect" ,coords: [315, 534, 396, 605], title: "NE-789" },

{shape:"rect" ,coords: [316, 465, 389, 534], title: "NW-800" },

{shape:"rect" ,coords: [278, 466, 315, 535], title: "W-799" },

{shape:"rect" ,coords: [245, 466, 278, 532], title: "W-798" },

{shape:"rect" ,coords: [209, 467, 245, 535], title: "W-797" },

{shape:"rect" ,coords: [171, 466, 209, 535], title: "W-796" },

{shape:"rect" ,coords: [118, 536, 174, 605], title: "SE-794" },

{shape:"rect" ,coords: [117, 465, 172, 535], title: "SW-795" },

{shape:"rect" ,coords: [317, 362, 378, 426], title: "NE-801" },

{shape:"rect" ,coords: [282, 358, 313, 426], title: "E-802" },

{shape:"rect" ,coords: [247, 358, 278, 429], title: "E-803" },

{shape:"rect" ,coords: [208, 358, 245, 427], title: "E-804" },

{shape:"rect" ,coords: [172, 357, 207, 427], title: "E-805" },

{shape:"rect" ,coords: [319, 285, 379, 356], title: "NW-812" },

{shape:"rect" ,coords: [280, 286, 316, 355], title: "W-811" },

{shape:"rect" ,coords: [245, 285, 280, 353], title: "W-810" },

{shape:"rect" ,coords: [208, 284, 243, 354], title: "W-809" },

{shape:"rect" ,coords: [173, 286, 208, 353], title: "W-808" },

{shape:"rect" ,coords: [106, 359, 171, 425], title: "E-806" },

{shape:"rect" ,coords: [107, 286, 172, 357], title: "W-807" },

{shape:"rect" ,coords: [317, 105, 389, 174], title: "NW-824" },

{shape:"rect" ,coords: [317, 178, 383, 247], title: "NE-813" },

{shape:"rect" ,coords: [282, 177, 318, 245], title: "E-814" },

{shape:"rect" ,coords: [281, 106, 314, 175], title: "W-823" },

{shape:"rect" ,coords: [245, 178, 279, 247], title: "E-815" },

{shape:"rect" ,coords: [208, 177, 244, 247], title: "E-816" },

{shape:"rect" ,coords: [245, 105, 279, 175], title: "W-822" },

{shape:"rect" ,coords: [208, 107, 245, 175], title: "W-821" },

{shape:"rect" ,coords: [132, 212, 172, 246], title: "SE-818a" },

{shape:"rect" ,coords: [174, 175, 208, 245], title: "E-817" },

{shape:"rect" ,coords: [174, 106, 208, 175], title: "W-820" },

{shape:"rect" ,coords: [131, 178, 171, 211], title: "S-818b" },

{shape:"rect" ,coords: [130, 139, 172, 174], title: "S-819b" },

{shape:"rect" ,coords: [131, 107, 172, 138], title: "SW-819a" },

{shape:"rect" ,coords: [352, 32, 405, 65], title: "NE-825b" },

{shape:"rect" ,coords: [353, 4, 408, 28], title: "N-825c" },

{shape:"rect" ,coords: [317, 3, 350, 66], title: "E-825a" },

{shape:"rect" ,coords: [280, 2, 317, 66], title: "E-826" },

{shape:"rect" ,coords: [244, 1, 278, 64], title: "E-827" },

{shape:"rect" ,coords: [208, 5, 244, 65], title: "E-828" },

{shape:"rect" ,coords: [171, 3, 207, 66], title: "E-829" },

{shape:"rect" ,coords: [137, 4, 172, 67], title: "E-830" },

{shape:"rect" ,coords: [100, 3, 137, 66], title: "E-831" }];
let areas:real_estate[] = []; 
// const areas1 = [
//   {
//     id: "1",
//     shape: Shape.poly,
//     coords: [25, 33, 27, 300, 128, 240, 128, 94]
//   },
//   {
//     id: "2",
//     shape: Shape.poly,
//     coords: [219, 118, 220, 210, 283, 210, 284, 119],
//     selected: true,
//     fillStyle: "rgba(255, 255, 255, 0.9)"
//   },
//   {
//     id: "3",
//     shape: Shape.poly,
//     coords: [381, 241, 383, 94, 462, 53, 457, 282]
//   },
//   {
//     id: "4",
//     shape: Shape.poly,
//     coords: [245, 285, 290, 285, 274, 239, 249, 238],
//     selected: true,
//     fillStyle: "rgba(0, 0, 0, 0.4)"
//   }
// ];
let id:number =0;
temp_area.forEach(area =>{
  id++;
  let real_type_shape: Shape = Shape.circle;
  if(area.shape === 'rect'){
    real_type_shape = Shape.rect;
  }else if(area.shape === 'poly'){
    real_type_shape = Shape.poly;
  }

  let real_type:real_estate = { id : id, 
    shape: real_type_shape,
    coords: area.coords,
    name:area.title.split('-')[1],
    direction: area.title.split('-')[0],
    selected: id%5 ===0 ? true : false,
    fillStyle: id%5 ===0 ? "rgba(0,0,0,0.9)": null
  }; 

  areas.push(real_type);
})

interface MyProps {
}

interface MyState {
  WindowSize: number;
  areas: real_estate[];
  hoveredArea: real_estate
  selectedOption: any;
}

class App extends React.Component<MyProps, MyState > {

  constructor(props:any) {
    super(props);
    this.state = {
      WindowSize : 1376,
      areas: areas,
      hoveredArea: null,
      selectedOption: "ALL",
    }
    this.handleResize = this.handleResize.bind(this);
}
componentDidMount() {
  console.log('mount')
  window.addEventListener("resize", this.handleResize);
}
componentWillUnmount() {
  window.addEventListener("resize", null);
}

resize() {
  
};


getTipPosition(area:real_estate) {
  if (!area) return { top: 0, left: 0 };
  // Calculate centroid
  const n = area.coords.length / 2;
 // console.log('getTipPosition');
  const { y, x } = area.coords.reduce(({ y, x }, val, idx) => {
    return !(idx % 2) ? { y, x: x + (val / n) } : { y: y + (val / n), x };
  }, { y: 0, x: 0 });
  return { top: `${y}px`, left: `${x}px` };
};

clicked(area: real_estate) {
  //console.log('clicked area', area);
  if(!area.fillStyle){
  this.setState({ hoveredArea: area});
  }

  //this.setState({ msg: `You clicked on ${area.shape} at coords ${JSON.stringify(area.coords)} !` });
};
clickedOutside(evt: real_estate) {
  // const coords = {x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
  // this.setState({ msg: `You clicked on the image at coords ${JSON.stringify(coords)} !` });
};
enterArea(area: real_estate) {
  //console.log('enter area', area);
  this.setState({ hoveredArea: area});// msg: `You entered ${area.shape} at coords ${JSON.stringify(area.coords)} !` });
};
leaveArea(area: real_estate) {
 // console.log('leaveArea area', area);

  this.setState({ hoveredArea: null});//, msg: `You leaved ${area.shape} at coords ${JSON.stringify(area.coords)} !` });
};

handleResize() {
  console.log('window.innerWidth',window.innerWidth)
    if(window.innerWidth < 500){

      const ratio = window.innerWidth / this.state.WindowSize;

  let newAreaCoords:IImageMapperArea[] = JSON.parse(JSON.stringify(this.state.areas));
  ;
  for (const area of newAreaCoords) {
      const newCoords = [];
      for (const originalCoord of area.coords) {
          newCoords.push(Math.round(originalCoord * ratio));
      }
      area.coords = newCoords;
  }
      this.setState({WindowSize: window.innerWidth, areas: newAreaCoords})
    }
}

handleChange = (selectedOption: any) => {
  const areas:real_estate[] = JSON.parse(JSON.stringify(this.state.areas));

//   if( selectedOption.value === "ALL"){
//   areas.forEach(area => {
//     if( area.strokeColor && area.strokeColor === "rgba(0,0,0,0.8)"){
//       area.selected = null;
//       area.strokeColor = null;
//     }
//   });

//   }else {
//     areas.forEach(area => {
//   if(selectedOption.value === area.direction){
//     area.selected = true;
//     area.strokeColor = "rgba(0,0,0,0.8)"
//   }else if( area.strokeColor && area.strokeColor === "rgba(0,0,0,0.8)"){
//     area.selected = null;
//     area.strokeColor = null;
//   }
// });
// }

if( selectedOption.value === "ALL"){
  areas.forEach(area => {
    if( area.fillStyle && area.fillStyle === "rgba(1,0,0,0.9)"){
      area.selected = null;
      area.fillStyle = null;
    }
  });

  }else {
    areas.forEach(area => {
  if(selectedOption.value === area.direction){
    if(area.fillStyle && area.fillStyle === "rgba(1,0,0,0.9)"){
    area.selected = null;
    area.fillStyle = null;}
  }else if( !(area.fillStyle && area.fillStyle === "rgba(0,0,0,0.9)")){
    area.selected = true;
    area.fillStyle = "rgba(1,0,0,0.9)";
  }
});
}

  this.setState({ selectedOption: selectedOption, areas: areas });
  console.log(`Option selected:`, selectedOption);
  this.forceUpdate()

}
  public render() {
    const { selectedOption } = this.state;
console.log("render",selectedOption)
    return (
      <ThemeProvider theme={{}}>
     <div style={{ position: 'relative' }}>

      <Select 
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />

        <ImageMapper name="my-map" src={src} areas={this.state.areas} 
        width={this.state.WindowSize}

        //onLoad={() => this.load()}
        onClick={area => this.clicked(area)}
       // onMouseEnter={area => this.enterArea(area)}
        onMouseLeave={area => this.leaveArea(area)}
        //onImageClick={evt => this.clickedOutside(evt)}
        
        />
        {
    	this.state.hoveredArea &&
    	<span className="tooltip" style={{ ...this.getTipPosition(this.state.hoveredArea)}}>
        Plot Number: {this.state.hoveredArea.name}<br></br>
        Facing: {this.state.hoveredArea.direction}
    	</span>
    }
</div>


      </ThemeProvider>
    );
  }
}

render(<App />, document.getElementById("root"));
