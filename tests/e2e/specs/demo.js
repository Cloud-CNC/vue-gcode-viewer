/**
 * @fileoverview Demo E2E tests
 */

describe('demo', () => 
{
  it('renders everything', () => 
  {
    cy.visit('/');

    expect(cy.get('#canvas > canvas')).to.not.be.null;
    expect(cy.get('.v-navigation-drawer')).to.not.be.null;
    expect(cy.get('#input-11')).to.not.be.null;
    expect(cy.get('#input-18')).to.not.be.null;
    expect(cy.get('#input-26')).to.not.be.null;
    expect(cy.get('#input-33')).to.not.be.null;
    expect(cy.get('#input-40')).to.not.be.null;
    expect(cy.get('#input-48')).to.not.be.null;
    expect(cy.get('#input-55')).to.not.be.null;
    expect(cy.get('#input-62')).to.not.be.null;
    expect(cy.get('#input-70')).to.not.be.null;
    expect(cy.get('#input-77')).to.not.be.null;
    expect(cy.get('#input-84')).to.not.be.null;
  });

  it('updates the bed', () =>
  {
    cy.visit('/');

    cy.get('.menu-icon > .v-btn__content > .v-icon').click();

    cy.get('#input-11').clear().type('15{enter}');
    cy.get('#input-18').clear().type('16.5{enter}');

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

    cy.get('.menu-icon > .v-btn__content > .v-icon').click();

    cy.get('#input-26').clear().type(`${x}{enter}`);
    cy.get('#input-33').clear().type(`${y}{enter}`);
    cy.get('#input-40').clear().type(`${z}{enter}`);

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

    cy.get('.menu-icon > .v-btn__content > .v-icon').click();

    cy.get('#input-48').clear().type(`${x}{enter}`);
    cy.get('#input-55').clear().type(`${y}{enter}`);
    cy.get('#input-62').clear().type(`${z}{enter}`);

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

    cy.get('.menu-icon > .v-btn__content > .v-icon').click();

    cy.get('#input-70').clear().type(`${x}{enter}`);
    cy.get('#input-77').clear().type(`${y}{enter}`);
    cy.get('#input-84').clear().type(`${z}{enter}`);

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

    cy.get('.menu-icon > .v-btn__content > .v-icon').click();

    //Set color pickers to hex code
    cy.get(':nth-child(2) > .v-card > .v-card__text > .v-color-picker > .v-color-picker__controls > .v-color-picker__edit > .v-btn > .v-btn__content > .v-icon').click().click();
    cy.get(':nth-child(3) > .v-card > .v-card__text > .v-color-picker > .v-color-picker__controls > .v-color-picker__edit > .v-btn > .v-btn__content > .v-icon').click().click();
    cy.get(':nth-child(4) > .v-card > .v-card__text > .v-color-picker > .v-color-picker__controls > .v-color-picker__edit > .v-btn > .v-btn__content > .v-icon').click().click();
    cy.get(':nth-child(5) > .v-card > .v-card__text > .v-color-picker > .v-color-picker__controls > .v-color-picker__edit > .v-btn > .v-btn__content > .v-icon').click().click();

    cy.get(':nth-child(2) > .v-card > .v-card__text > .v-color-picker > .v-color-picker__controls > .v-color-picker__edit > .v-color-picker__input > input').clear().type(`${extrusionColor}{enter}`);
    cy.get(':nth-child(3) > .v-card > .v-card__text > .v-color-picker > .v-color-picker__controls > .v-color-picker__edit > .v-color-picker__input > input').clear().type(`${pathColor}{enter}`);
    cy.get(':nth-child(4) > .v-card > .v-card__text > .v-color-picker > .v-color-picker__controls > .v-color-picker__edit > .v-color-picker__input > input').clear().type(`${bedColor}{enter}`);
    cy.get(':nth-child(5) > .v-card > .v-card__text > .v-color-picker > .v-color-picker__controls > .v-color-picker__edit > .v-color-picker__input > input').clear().type(`${backgroundColor}{enter}`);

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
