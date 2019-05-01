describe('My First Test', function () {
    it('힐 일 추가', function () {
        cy.visit('http://localhost:9000');
        cy.get('div.v-text-field__slot > input[type="text"]')
            .type('할일 입력 테스트 (cypress)')
            .type('{enter}');


    });
});
