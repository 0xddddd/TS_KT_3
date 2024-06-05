import { Logger } from '../logger/logger';

type Point = number;
type Distance = number;
type Angle = number;
type Position = { x: Point; y: Point };

export enum CarriageState {
    UP,
    DOWN
}

export enum LineColor {
    BLACK = "черный",
    RED = "красный",
    GREEN = "зелёный"
}

export class Plotter {
    private position: Position;
    private angle: Angle;
    private color: LineColor;
    private carriageState: CarriageState;
    private logger: Logger;

    constructor() {
        this.position = { x: 0.0, y: 0.0 };
        this.angle = 0.0;
        this.color = LineColor.BLACK;
        this.carriageState = CarriageState.UP;
        this.logger = new Logger(); // Инициализация логгера
    }

    setColor(color: LineColor): void {
        this.logger.log(`Устанавливаем ${color} цвет линии.`, 'Plotter');
        this.color = color;
    }

    setPosition(position: Position): void {
        this.logger.log(`Устанавливаем позицию каретки в (${position.x}, ${position.y}).`, 'Plotter');
        this.position = position;
    }

    carriageDown(): void {
        this.logger.log("Опускаем каретку", 'Plotter');
        this.carriageState = CarriageState.DOWN;
    }

    carriageUp(): void {
        this.logger.log("Поднимаем каретку", 'Plotter');
        this.carriageState = CarriageState.UP;
    }

    move(distance: Distance): void {
        const newPosition = this.calcNewPosition(distance);
        if (this.carriageState === CarriageState.DOWN) {
            this.drawLine(this.position, newPosition);
        } else {
            this.logger.log(`Передвигаем на ${distance} от точки (${this.position.x}, ${this.position.y})`, 'Plotter');
        }
        this.position = newPosition;
    }

    turn(angle: Angle): void {
        this.logger.log(`Поворачиваем на ${angle} градусов`, 'Plotter');
        this.angle = (this.angle + angle) % 360.0;
    }

    private drawLine(from: Position, to: Position): void {
        this.logger.log(`...Чертим линию из (${from.x}, ${from.y}) в (${to.x}, ${to.y}) используя ${this.color} цвет.`, 'Plotter');
    }

    private calcNewPosition(distance: Distance): Position {
        const angle_in_rads = this.angle * (Math.PI / 180.0);
        const x = this.position.x + distance * Math.cos(angle_in_rads);
        const y = this.position.y + distance * Math.sin(angle_in_rads);
        return { x: Math.round(x), y: Math.round(y) };
    }
}

export function drawTriangle(plt: Plotter, size: Distance): void {
    plt.setColor(LineColor.GREEN);
    for (let i = 0; i < 3; ++i) {
        plt.carriageDown();
        plt.move(size);
        plt.carriageUp();
        plt.turn(120.0);
    }
}
