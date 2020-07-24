/**
 * @fileoverview Demo E2E tests
 */

describe('demo', () => 
{
  it('renders everything', () => 
  {
    cy.visit('/');

    cy.wait(5000);

    cy.get('[data-e2e=gcode-viewer] > canvas').should('be.visible');
    cy.get('[data-e2e=toggle-menu]').should('be.visible');

    cy.get('[data-e2e=toggle-menu]').click();

    cy.get('[data-e2e=menu]').should('be.visible');
    cy.get('[data-e2e=bed-x]').should('be.visible');
    cy.get('[data-e2e=bed-y]').should('be.visible');
    cy.get('[data-e2e=position-x]').should('be.visible');
    cy.get('[data-e2e=position-y]').should('be.visible');
    cy.get('[data-e2e=position-z]').should('be.visible');
    cy.get('[data-e2e=rotation-x]').should('be.visible');
    cy.get('[data-e2e=rotation-y]').should('be.visible');
    cy.get('[data-e2e=rotation-z]').should('be.visible');
    cy.get('[data-e2e=scale-x]').scrollIntoView().should('be.visible');
    cy.get('[data-e2e=scale-y]').scrollIntoView().should('be.visible');
    cy.get('[data-e2e=scale-z]').scrollIntoView().should('be.visible');
    cy.get('[data-e2e=extrusion-color]').scrollIntoView().should('be.visible');
    cy.get('[data-e2e=path-color]').scrollIntoView().should('be.visible');
    cy.get('[data-e2e=bed-color]').scrollIntoView().should('be.visible');
    cy.get('[data-e2e=background-color]').scrollIntoView().should('be.visible');
  });

  it('updates the bed', () =>
  {
    cy.visit('/');

    cy.get('[data-e2e=toggle-menu]').click();

    cy.get('[data-e2e=bed-x]').clear().type('15{enter}');
    cy.get('[data-e2e=bed-y]').clear().type('16.5{enter}');

    cy.window().then(window =>
    {
      const state = window.getVueGcodeViewerState();

      expect(state.plane.scale.x).to.equal(15);
      expect(state.plane.scale.y).to.equal(16.5);
    });
  });

  it('updates the position', () =>
  {
    const x = 10;
    const y = -5.5;
    const z = 4.3;

    cy.visit('/');

    cy.get('[data-e2e=toggle-menu]').click();

    cy.get('[data-e2e=position-x]').clear().type(`${x}{enter}`);
    cy.get('[data-e2e=position-y]').clear().type(`${y}{enter}`);
    cy.get('[data-e2e=position-z]').clear().type(`${z}{enter}`);

    cy.window().then(window =>
    {
      const state = window.getVueGcodeViewerState();

      expect(state.object.extrusion.position.x).to.equal(x);
      expect(state.object.extrusion.position.y).to.equal(y);
      expect(state.object.extrusion.position.z).to.equal(z);
      expect(state.object.path.position.x).to.equal(x);
      expect(state.object.path.position.y).to.equal(y);
      expect(state.object.path.position.z).to.equal(z);
    });
  });

  it('updates the rotation', () =>
  {
    const x = 45;
    const y = 135;
    const z = -100;

    cy.visit('/');

    cy.get('[data-e2e=toggle-menu]').click();

    cy.get('[data-e2e=rotation-x]').clear().type(`${x}{enter}`);
    cy.get('[data-e2e=rotation-y]').clear().type(`${y}{enter}`);
    cy.get('[data-e2e=rotation-z]').clear().type(`${z}{enter}`);

    cy.window().then(window =>
    {
      const state = window.getVueGcodeViewerState();

      expect(state.object.extrusion.rotation.x).to.equal(x * (Math.PI / 180));
      expect(state.object.extrusion.rotation.y).to.equal(y * (Math.PI / 180));
      expect(state.object.extrusion.rotation.z).to.equal(z * (Math.PI / 180));
      expect(state.object.path.rotation.x).to.equal(x * (Math.PI / 180));
      expect(state.object.path.rotation.y).to.equal(y * (Math.PI / 180));
      expect(state.object.path.rotation.z).to.equal(z * (Math.PI / 180));
    });
  });
  
  it('updates the scale', () =>
  {
    const x = 0.2;
    const y = 1;
    const z = 4.3;

    cy.visit('/');

    cy.get('[data-e2e=toggle-menu]').click();

    cy.get('[data-e2e=scale-x]').clear().type(`${x}{enter}`);
    cy.get('[data-e2e=scale-y]').clear().type(`${y}{enter}`);
    cy.get('[data-e2e=scale-z]').clear().type(`${z}{enter}`);

    cy.window().then(window =>
    {
      const state = window.getVueGcodeViewerState();

      expect(state.object.extrusion.scale.x).to.equal(z);
      expect(state.object.extrusion.scale.y).to.equal(x);
      expect(state.object.extrusion.scale.z).to.equal(y);
      expect(state.object.path.scale.x).to.equal(z);
      expect(state.object.path.scale.y).to.equal(x);
      expect(state.object.path.scale.z).to.equal(y);
    });
  });

  it('updates the theme', () =>
  {
    const extrusionColor = '#00000f';
    const pathColor = '#0000f0';
    const bedColor = '#0000ff';
    const backgroundColor = '#000f00';

    cy.visit('/');

    cy.get('[data-e2e=toggle-menu]').click();

    //Set color pickers to hex code
    cy.get('[data-e2e=extrusion-color]').children().eq(1).children().eq(1).children().eq(3).click().click();
    cy.get('[data-e2e=path-color]').children().eq(1).children().eq(1).children().eq(3).click().click();
    cy.get('[data-e2e=bed-color]').children().eq(1).children().eq(1).children().eq(3).click().click();
    cy.get('[data-e2e=background-color]').children().eq(1).children().eq(1).children().eq(3).click().click();

    cy.get('[data-e2e=extrusion-color]').children().eq(1).children().eq(1).children().eq(0).children().eq(0).clear().type(`${extrusionColor}{enter}`);
    cy.get('[data-e2e=path-color]').children().eq(1).children().eq(1).children().eq(0).children().eq(0).clear().type(`${pathColor}{enter}`);
    cy.get('[data-e2e=bed-color]').children().eq(1).children().eq(1).children().eq(0).children().eq(0).clear().type(`${bedColor}{enter}`);
    cy.get('[data-e2e=background-color]').children().eq(1).children().eq(1).children().eq(0).children().eq(0).clear().type(`${backgroundColor}{enter}`);

    cy.window().then(window =>
    {
      const state = window.getVueGcodeViewerState();

      expect(`#${state.object.extrusion.material.color.getHexString()}`).to.equal(extrusionColor);
      expect(`#${state.object.path.material.color.getHexString()}`).to.equal(pathColor);
      expect(`#${state.plane.material.color.getHexString()}`).to.equal(bedColor);
      expect(`#${state.scene.background.getHexString()}`).to.equal(backgroundColor);
    });
  });
});
