describe('Tests', () => {
  it('render coin list correctly', () => {
    cy.visit('/')

    cy.get('.coin-card')
      .should('have.length', 5)
  })

  it('history price works correctly', () => {
    cy.visit('/')

    cy.get('.history-price-datepicker')
      .click()
      .type('2014-02-07')

    cy.get('.coin-card')
      .should('have.length', 5)
  })

  it('history price clear button works correctly', () => {
    cy.visit('/')

    cy.get('.history-price-datepicker')
      .click()
      .type('2014-02-07')

    cy.get('.history-price-clear-button')
      .click()

    cy.get('.history-price-datepicker')
      .invoke('val')
      .should('be.empty')
  })
})
