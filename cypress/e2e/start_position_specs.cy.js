describe('Start Position Button', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000'); // Add this line to visit your application
  });
  it('should reset the chessboard to the starting position', () => {
    // Click the start position button
    cy.get('#start-position-button').click();

    // Check if the chessboard is reset to the initial position
    cy.get('.square img').each(($img, index) => {
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

        // Check if the src attribute contains the expected piece and color information
        cy.wrap($img)
          .invoke('attr', 'src')
          .should('contain', expectedColor)
          .and('contain', expectedPiece);
      } else {
        cy.wrap($img).should('not.exist');
      }
    });
  });
});
