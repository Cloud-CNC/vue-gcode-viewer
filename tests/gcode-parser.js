/**
 * @fileoverview GCODE parser unit tests
 */

//Imports
import chai from 'chai';
import GCodeParser from '../lib/gcode-parser.js';
import three from 'three';

//Chai
const expect = chai.expect;

//Mock GCODE
const gcode = 'G0 X0 Y0 Z0\nG0 X5 Y0 Z0\nG0 X5 Y5 Z0\nG0 X5 Y5 Z5\nG0 E1 X5 Y5 Z0\nG0 E2 X5 Y0 Z0\nG0 E3 X0 Y0 Z0';

//Unit tests
describe('GCODE parser', () =>
{
  it('will generate correct verticies', async () =>
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

  it('will use correct colors', async () =>
  {
    const extrusionColor = '#ffffff';
    const pathColor = '#000000';

    const parser = new GCodeParser(extrusionColor, pathColor);
    const lines = await parser.parse(gcode);

    expect(lines.extrusion.material.color).to.eql(new three.Color(extrusionColor));
    expect(lines.path.material.color).to.eql(new three.Color(pathColor));
  });

  it('will ignore invalid gcode commands and comments', async () =>
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