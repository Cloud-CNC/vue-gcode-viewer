/**
 * @fileoverview GCODE viewer unit tests
 */

//Imports
import {expect} from 'chai';
import gcodeViewer from '@/gcode-viewer.vue';

//Unit tests
describe('GCODE viewer', () =>
{
  it('excepts props', () =>
  {
    expect(gcodeViewer).to.haveOwnProperty('props');
    expect(gcodeViewer.props).to.haveOwnProperty('bed');
    expect(gcodeViewer.props).to.haveOwnProperty('gcode');
    expect(gcodeViewer.props).to.haveOwnProperty('position');
    expect(gcodeViewer.props).to.haveOwnProperty('rotation');
    expect(gcodeViewer.props).to.haveOwnProperty('scale');
    expect(gcodeViewer.props).to.haveOwnProperty('theme');

    expect(gcodeViewer.props.bed).to.haveOwnProperty('default');
    expect(gcodeViewer.props.bed.default()).to.eql({
      X: 10,
      Y: 10
    });
    expect(gcodeViewer.props.bed).to.haveOwnProperty('type', Object);

    expect(gcodeViewer.props.gcode).to.haveOwnProperty('required', true);
    expect(gcodeViewer.props.gcode).to.haveOwnProperty('type', String);

    expect(gcodeViewer.props.position).to.haveOwnProperty('default');
    expect(gcodeViewer.props.position.default()).to.eql({
      X: 5,
      Y: 0,
      Z: -5
    });
    expect(gcodeViewer.props.position).to.haveOwnProperty('type', Object);

    expect(gcodeViewer.props.rotation).to.haveOwnProperty('default');
    expect(gcodeViewer.props.rotation.default()).to.eql({
      X: -90,
      Y: 0,
      Z: 180
    });
    expect(gcodeViewer.props.rotation).to.haveOwnProperty('type', Object);

    expect(gcodeViewer.props.scale).to.haveOwnProperty('default');
    expect(gcodeViewer.props.scale.default()).to.eql({
      X: 0.1,
      Y: 0.1,
      Z: 0.1
    });
    expect(gcodeViewer.props.scale).to.haveOwnProperty('type', Object);

    expect(gcodeViewer.props.theme).to.haveOwnProperty('default');
    expect(gcodeViewer.props.theme.default()).to.eql({
      extrusionColor: '#4287f5',
      pathColor: '#0a2f6b',
      bedColor: '#586375',
      backgroundColor: '#dfe4ed'
    });
    expect(gcodeViewer.props.theme).to.haveOwnProperty('type', Object);
  });

  it('watches scene properties', () =>
  {
    expect(gcodeViewer).to.haveOwnProperty('watch');
    expect(gcodeViewer.watch).to.haveOwnProperty('bed');
    expect(gcodeViewer.watch).to.haveOwnProperty('gcode');
    expect(gcodeViewer.watch).to.haveOwnProperty('position');
    expect(gcodeViewer.watch).to.haveOwnProperty('rotation');
    expect(gcodeViewer.watch).to.haveOwnProperty('scale');
    expect(gcodeViewer.watch).to.haveOwnProperty('theme');

    expect(gcodeViewer.watch.bed).to.haveOwnProperty('deep', true);
    expect(gcodeViewer.watch.bed).to.haveOwnProperty('handler');
    expect(gcodeViewer.watch.bed.handler).to.be.a('function');

    expect(gcodeViewer.watch.gcode).to.be.a('function');

    expect(gcodeViewer.watch.position).to.haveOwnProperty('deep', true);
    expect(gcodeViewer.watch.position).to.haveOwnProperty('handler');
    expect(gcodeViewer.watch.position.handler).to.be.a('function');

    expect(gcodeViewer.watch.rotation).to.haveOwnProperty('deep', true);
    expect(gcodeViewer.watch.rotation).to.haveOwnProperty('handler');
    expect(gcodeViewer.watch.rotation.handler).to.be.a('function');

    expect(gcodeViewer.watch.scale).to.haveOwnProperty('deep', true);
    expect(gcodeViewer.watch.scale).to.haveOwnProperty('handler');
    expect(gcodeViewer.watch.scale.handler).to.be.a('function');

    expect(gcodeViewer.watch.theme).to.haveOwnProperty('deep', true);
    expect(gcodeViewer.watch.theme).to.haveOwnProperty('handler');
    expect(gcodeViewer.watch.theme.handler).to.be.a('function');
  });

  it('has lifecycle hooks', () =>
  {
    expect(gcodeViewer).to.haveOwnProperty('mounted');
    expect(gcodeViewer.mounted).to.be.a('function');

    expect(gcodeViewer).to.haveOwnProperty('destroyed');
    expect(gcodeViewer.destroyed).to.be.a('function');
  });
});