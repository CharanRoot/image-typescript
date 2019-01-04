import injectSheet, { StyledComponentProps, StyleCreator } from 'react-jss';
import classNames from 'classnames';
import * as React from 'react';

export interface IImageMapperProps extends StyledComponentProps {
  src: string;
  name: string;
  areas: IImageMapperArea[];
  width: number;
  height?: number;
  imgWidth?: number;
  onClick?: (item: IImageMapperArea) => void;
  onMouseEnter?: (item: IImageMapperArea) => void;
  onMouseLeave?: (item: IImageMapperArea) => void;
  fillStyle?: string;
  lineWidth?: number;
  strokeColor?: string;
}

export enum Shape {
  poly =  "poly",
  circle  = "circle",
  rect = "rect"
}

export interface IImageMapperArea {
  id: string | number;
  coords: number[];
  href?: string;
  shape: Shape;
  disabled?: boolean;
  selected?: boolean;
  fillStyle?: string;
  lineWidth?: number;
  strokeColor?: string;
}

class ImageMapper extends React.PureComponent<IImageMapperProps> {
  public static defaultProps: Partial<IImageMapperProps> = {
    lineWidth: 1,
    fillStyle: "rgba(255, 255, 255, 0.5)",
    strokeColor: "rgba(0, 0, 0, 0.5)"
  };

  private container: React.RefObject<HTMLDivElement>;
  private image: React.RefObject<HTMLImageElement>;
  private canvas: React.RefObject<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  constructor(props: Readonly<IImageMapperProps>) {
    super(props);
    this.container = React.createRef<HTMLDivElement>();
    this.image = React.createRef<HTMLImageElement>();
    this.canvas = React.createRef<HTMLCanvasElement>();
  }

  public componentDidUpdate(prevProps: Readonly<IImageMapperProps>) {
    if (prevProps.width !== this.props.width) {
      this.initCanvas();
    }
  }

  public render() {
    const { classes, src, name, children } = this.props;
    return (
      <div className={classes.container} ref={this.container}>
        <img
          className={classes.img}
          src={src}
          useMap={`#${name}`}
          alt=""
          ref={this.image}
          onLoad={this.initCanvas}
        />
        <canvas ref={this.canvas} className={classes.canvas} />
        <map name={name} className={classes.map}>
          {this.renderAreas()}
        </map>
        {children}
      </div>
    );
  }

  private initCanvas = () => {
    const { width, height } = this.props;

    if (width) {
      this.image.current.width = width;
    }
    if (height) {
      this.image.current.height = height;
    }

    this.canvas.current.width = width || this.image.current.clientWidth;
    this.canvas.current.height = height || this.image.current.clientHeight;

    this.container.current.style.width =
      (width || this.image.current.clientWidth) + "px";
    this.container.current.style.height =
      (height || this.image.current.clientHeight) + "px";

    this.ctx = this.canvas.current.getContext("2d");
    this.drawSelected();
  };

  private drawRect = (area: IImageMapperArea) => {
    const [left, top, right, bot] = this.scaleCoords(area.coords);
    this.setFillStyle(area);
    this.ctx.strokeRect(left, top, right - left, bot - top);
    this.ctx.fillRect(left, top, right - left, bot - top);
  };

  private drawCircle = (area: IImageMapperArea) => {
    const coords = this.scaleCoords(area.coords);
    this.setFillStyle(area);
    this.ctx.beginPath();
    this.ctx.arc(coords[0], coords[1], coords[2], 0, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill();
  };

  private drawPoly = (area: IImageMapperArea) => {
    const coords = this.scaleCoords(area.coords).reduce(
      (a, v, i, s) => (i % 2 ? a : [...a, s.slice(i, i + 2)]),
      []
    );
    this.setFillStyle(area);
    this.ctx.beginPath();
    const first = coords.unshift();
    this.ctx.moveTo(first[0], first[1]);
    coords.forEach(c => this.ctx.lineTo(c[0], c[1]));
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill();
  };

  private draw = (area: IImageMapperArea) => {
    switch (area.shape) {
      case "circle":
        this.drawCircle(area);
        break;
      case "poly":
        this.drawPoly(area);
        break;
      case "rect":
        this.drawRect(area);
        break;
    }
  };

  private drawSelected = () => {
    const { areas } = this.props;
    if (areas && areas.length > 0) {
      areas.filter(area => area.selected).forEach(this.draw);
    }
  };

  private setFillStyle = (area: IImageMapperArea) => {
    const { fillStyle, strokeColor, lineWidth } = this.props;
    this.ctx.fillStyle = area.fillStyle || fillStyle;
    this.ctx.strokeStyle = area.strokeColor || strokeColor;
    this.ctx.lineWidth = area.lineWidth || lineWidth;
  };

  private handleHoverAreaOn = (area: IImageMapperArea) => {
    const { onMouseEnter } = this.props;
    if (!area.disabled) {
      this.draw(area);
      if (onMouseEnter) {
        const areaWithScaledCoords = {
          ...area,
          coords: this.scaleCoords(area.coords)
        };
        onMouseEnter(areaWithScaledCoords);
      }
    }
  };

  private handleHoverAreaOff = (area: IImageMapperArea) => {
    const { onMouseLeave } = this.props;
    if (!area.disabled) {
      this.ctx.clearRect(
        0,
        0,
        this.canvas.current.width,
        this.canvas.current.height
      );

      this.drawSelected();

      if (onMouseLeave) {
        const areaWithScaledCoords = {
          ...area,
          coords: this.scaleCoords(area.coords)
        };
        onMouseLeave(areaWithScaledCoords);
      }
    }
  };

  private handleClick = (area: IImageMapperArea) => {
    const { onClick } = this.props;
    if (onClick && !area.disabled) {
      const areaWithScaledCoords = {
        ...area,
        coords: this.scaleCoords(area.coords)
      };
      onClick(areaWithScaledCoords);
    }
  };

  private scaleCoords = (coords: number[]): number[] => {
    const { imgWidth, width } = this.props;
    const scale = width && imgWidth && imgWidth > 0 ? width / imgWidth : 1;
    return coords.map(coord => coord * scale);
  };

  private renderAreas = () => {
    const { classes, areas } = this.props;
    return areas.map(area => {
      const coords = this.scaleCoords(area.coords);
      return (
        <area
          className={classNames({
            [classes.areaDisabled]: area.disabled
          })}
          key={area.id}
          shape={area.shape}
          coords={coords.join(",")}
          onMouseEnter={() => this.handleHoverAreaOn(area)}
          onMouseLeave={() => this.handleHoverAreaOff(area)}
          onClick={() => this.handleClick(area)}
          href={area.href}
        />
      );
    });
  };
}

const styles: StyleCreator = () => ({
  container: {
    position: "relative"
  },
  canvas: {
    position: "absolute",
    top: 0,
    left: 0,
    pointerEvents: "none",
    zIndex: 2
  },
  img: {
    top: 0,
    left: 0,
    zIndex: 1,
    userSelect: "none"
  },
  areaDisabled: {
    pointerEvents: "none",
    cursor: "default"
  }
});

export default injectSheet(styles)(ImageMapper);
