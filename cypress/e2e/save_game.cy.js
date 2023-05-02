describe('Save Game Button', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('should save the game when Save Game button is clicked', () => {
        cy.pause(); // wait for user input
        // Click the Save Game button
        cy.get('#save-game').click();

        // Check for an alert with the success message
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.equal('Game saved successfully!');
        });
    });
});
