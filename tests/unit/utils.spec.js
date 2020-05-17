/**
 * @fileoverview ThreeJS scene utilities unit tests
 */

//Imports
import {expect} from 'chai';
import utils from '@/assets/utils';

//Unit tests
describe('Scene utilities', () =>
{
  it('updated bed correctly', done =>
  {
    //Mock ThreeJS plane
    const plane = {
      scale: {
        set: (x, y, z) =>
        {
          expect(x).to.equal(5);
          expect(y).to.equal(5);
          expect(z).to.equal(1);

          done();
        }
      }
    };

    utils.update.bed(plane, {X: 5, Y: 5});
  });

  it('updated position correctly', done =>
  {
    let passed = 0;

    //Mock object
    const object = {
      extrusion: {
        position: {
          set: (x, y, z) =>
          {
            expect(x).to.equal(-5);
            expect(y).to.equal(-4);
            expect(z).to.equal(-3);

            passed++;
            if (passed == 2)
            {
              done();
            }
          }
        }
      },
      path: {
        position: {
          set: (x, y, z) =>
          {
            expect(x).to.equal(-5);
            expect(y).to.equal(-4);
            expect(z).to.equal(-3);

            passed++;
            if (passed == 2)
            {
              done();
            }
          }
        }
      }
    };

    utils.update.position(object, {X: -5, Y: -4, Z: -3});
  });

  it('updated rotation correctly', done =>
  {
    let passed = 0;

    //Mock object
    const object = {
      extrusion: {
        rotation: {
          set: (x, y, z) =>
          {
            expect(x).to.equal(0);
            expect(y).to.equal(Math.PI / 2);
            expect(z).to.equal(Math.PI / -2);

            passed++;
            if (passed == 2)
            {
              done();
            }
          }
        }
      },
      path: {
        rotation: {
          set: (x, y, z) =>
          {
            expect(x).to.equal(0);
            expect(y).to.equal(Math.PI / 2);
            expect(z).to.equal(Math.PI / -2);

            passed++;
            if (passed == 2)
            {
              done();
            }
          }
        }
      }
    };

    utils.update.rotation(object, {X: 0, Y: 90, Z: -90});
  });

  it('updated scale correctly', done =>
  {
    let passed = 0;

    //Mock object
    const object = {
      extrusion: {
        scale: {
          set: (x, y, z) =>
          {
            expect(x).to.equal(0.3);
            expect(y).to.equal(0.1);
            expect(z).to.equal(0.2);

            passed++;
            if (passed == 2)
            {
              done();
            }
          }
        }
      },
      path: {
        scale: {
          set: (x, y, z) =>
          {
            expect(x).to.equal(0.3);
            expect(y).to.equal(0.1);
            expect(z).to.equal(0.2);

            passed++;
            if (passed == 2)
            {
              done();
            }
          }
        }
      }
    };

    utils.update.scale(object, {X: 0.1, Y: 0.2, Z: 0.3});
  });
});