import { Command } from 'commander';
import { Plotter, drawTriangle } from './plotter/plotter';

const program = new Command();

program
    .version('1.0.0')
    .description('Plotter CLI');

program
    .command('drawTriangle <size>')
    .description('Draw a triangle with the specified side length')
    .action((size: string) => {
        const plotter = new Plotter();
        drawTriangle(plotter, parseFloat(size));
    });

program.parse(process.argv);
