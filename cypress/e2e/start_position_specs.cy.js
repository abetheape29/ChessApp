describe('Start Position Button', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000'); 
  });

  it('should reset the chessboard to the starting position', () => {
    // Click the start position button
    cy.get('#start-position-button').click();

    // Check if the chessboard is reset to the initial position
    cy.get('.square').each(($square, index) => {
      const initialPosition = [
        'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',
        'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
        'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R',
      ];

      const piece = initialPosition[index];
      if (piece) {
        const expectedPiece = piece.toUpperCase();
        const expectedColor = piece === piece.toUpperCase() ? 'w' : 'b';

        cy.wrap($square)
          .find('img')
          .invoke('attr', 'src')
          .should('contain', expectedColor)
          .and('contain', expectedPiece);
      } else {
        cy.wrap($square).find('img').should('not.exist');
      }
    });
  });
});
