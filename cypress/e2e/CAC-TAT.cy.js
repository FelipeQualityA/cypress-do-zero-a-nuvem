describe('CAC-TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verificar o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10)
    cy.get('#firstName').type('Neyma')
    cy.get('#lastName').type('JR')
    cy.get('#email').type('Neyma@NJ.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains("Enviar").click()
    cy.get('.success').should('be.visible')
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Neyma')
    cy.get('#lastName').type('JR')
    cy.get('#email').type('Neyma,com')
    cy.get('#open-text-area').type('teste')
    cy.contains("Enviar").click()
    cy.get('.error').should('be.visible')
  })
  it('campo telefone só aceita números', () => {
    cy.get('#phone')
      .type('Neyma@JR.com')
      .should('have.value', '')
  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário ', () => {
    cy.get('#firstName').type('Neyma')
    cy.get('#lastName').type('JR')
    cy.get('#email').type('Neyma@NJ.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('teste')
    cy.contains("Enviar").click()
    cy.get('.error').should('be.visible').and('contain', 'Valide os campos obrigatórios!')
  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Neyma').should('have.value', 'Neyma')
    cy.get('#lastName').type('JR').should('have.value', 'JR')
    cy.get('#phone').type('999999999').should('have.value', '999999999')
    cy.get('#email').type('Neyma@NJ.com').should('have.value', 'Neyma@NJ.com')

    cy.get('#firstName').clear().should('have.value', '')
    cy.get('#lastName').clear().should('have.value', '')
    cy.get('#phone').clear().should('have.value', '')
    cy.get('#email').clear().should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains("Enviar").click()
    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit('felipe', 'asdfwoie', 'asjld@aaa.com', 'teste')
    cy.get('.success').should('be.visible')
  })
  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('select').select('YouTube')
    cy.get('select').should('have.value', 'youtube')
  })
  it('seleciona um produto (Mentoria) por seu texto', () => {
    cy.get('select').select('Mentoria')
    cy.get('select').should('have.value', 'mentoria')
  })
  it('seleciona um produto (Blog) por seu texto', () => {
    cy.get('select').select('Blog')
    cy.get('select').should('have.value', 'blog')
  })
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[value=feedback]').check().should('be.checked')
  })
  it('marca cada tipo de atendimento', () => {
    cy.get('input[type=radio]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })
  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type=checkbox]').check().should('be.checked')
      .last().uncheck().should('not.be.checked')
  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('firstName')
    cy.get('#lastName').type('lastName')
    cy.get('#email').type('email@ex.com')
    cy.get('#open-text-area').type('feedback')
    cy.get('#phone-checkbox').check()
    cy.contains("Enviar").click()
    cy.get('.error').should('be.visible')
  })
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type=file]').selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type=file]').selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type=file]').selectFile('@sampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')
  })
  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('a[href="privacy.html"]').invoke('removeAttr', 'target').click()
    cy.contains('CAC TAT - Política de Privacidade').should('be.visible')
  })

})


