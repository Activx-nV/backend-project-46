#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows difference.')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format: stylish, plain or json', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2, { format }) => console.log(`\n${genDiff(filepath1, filepath2, format)}\n`));

program.parse();
