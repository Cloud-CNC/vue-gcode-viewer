/**
 * @fileoverview GCODE parser unit tests
 */

//Imports
import {expect} from 'chai';
import GCodeParser from '@/assets/gcode-parser.js';
import {Color} from 'three';

//Mock GCODE
const gcode = 'G0 X0 Y0 Z0\nG0 X5 Y0 Z0\nG0 X5 Y5 Z0\nG0 X5 Y5 Z5\nG0 E1 X5 Y5 Z0\nG0 E2 X5 Y0 Z0\nG0 E3 X0 Y0 Z0';

//Unit tests
describe('GCODE parser', () =>
{
  it('generates correct vertices', async () =>
  {
    const parser = new GCodeParser('#ffffff', '#000000');
    const lines = await parser.parse(gcode);

    expect(Array.from(lines.path.geometry.attributes.position.array)).to.eql([
      0, 0, 0,
      5, 0, 0,
      5, 5, 0,
      5, 5, 5
    ]);

    expect(Array.from(lines.extrusion.geometry.attributes.position.array)).to.eql([
      5, 5, 0,
      5, 0, 0,
      0, 0, 0
    ]);
  });

  it('uses correct colors', async () =>
  {
    const extrusionColor = '#ffffff';
    const pathColor = '#000000';

    const parser = new GCodeParser(extrusionColor, pathColor);
    const lines = await parser.parse(gcode);

    expect(lines.extrusion.material.color).to.eql(new Color(extrusionColor));
    expect(lines.path.material.color).to.eql(new Color(pathColor));
  });

  it('ignores invalid gcode commands and comments', async () =>
  {
    const parser = new GCodeParser('#ffffff', '#000000');
    const lines = await parser.parse(gcode + '\nG2 X10 Y10 R7\n;COMMENT');

    expect(Array.from(lines.path.geometry.attributes.position.array)).to.eql([
      0, 0, 0,
      5, 0, 0,
      5, 5, 0,
      5, 5, 5
    ]);

    expect(Array.from(lines.extrusion.geometry.attributes.position.array)).to.eql([
      5, 5, 0,
      5, 0, 0,
      0, 0, 0
    ]);
  });
}); 