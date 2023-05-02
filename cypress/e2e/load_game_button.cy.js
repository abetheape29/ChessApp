describe('Load Game Button', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('should load the game from the selected gameId ', () => {
        cy.pause(); // play a game
        cy.get('#save-game').click();
        cy.get('#start-position-button').click();

        cy.get('select').select('Game 1');

        cy.get('.square').each(($square, index) => {
            const expectedPosition = [
              'r', null, 'b', 'q', 'k', 'b', 'n', 'r',
              'p', 'p', null, 'p', 'p', 'p', 'p', 'p',
              null, null, 'n', null, null, null, null, null,
              null, null, 'p', null, null, null, null, null,
              null, null, null, null, 'P', null, null, null,
              null, null, null, null, null, 'N', null, null,
              'P', 'P', 'P', 'P', null, 'P', 'P', 'P',
              'R', 'N', 'B', 'Q', 'K', 'B', null, 'R',
            ];
      
            const piece = expectedPosition[index];
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