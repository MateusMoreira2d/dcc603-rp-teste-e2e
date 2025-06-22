describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  it('Marca e desmarca uma tarefa como concluída', () => {
  cy.visit('');

  cy.get('[data-cy=todo-input]')
    .type('Revisar pull request{enter}');

  cy.get('[data-cy=toggle-todo-checkbox]')
    .check()
    .should('be.checked');

  cy.get('[data-cy=toggle-todo-checkbox]')
    .uncheck()
    .should('not.be.checked');
  });

  it('Edita o texto de uma tarefa existente', () => {
  cy.visit('');

  cy.get('.new-todo')
    .type('Estudar JavaScript{enter}');

  cy.get('.todo-list li')
    .first()
    .find('label')
    .dblclick();

  cy.get('.todo-list li.editing .edit')
    .clear()
    .type('Estudar Cypress E2E{enter}');

  cy.get('.todo-list li')
    .first()
    .should('contain.text', 'Estudar Cypress E2E');
  });

  it('Limpa todas as tarefas concluídas', () => {
  cy.visit('');

  cy.get('.new-todo')
    .type('Estudar para prova{enter}')
    .type('Enviar relatório{enter}');

  // Marca as duas tarefas como concluídas
  cy.get('.todo-list li')
    .each($el => {
      cy.wrap($el).find('.toggle').check();
    });

  // Clica no botão "Clear completed"
  cy.get('.clear-completed')
    .click();

  // Verifica que a lista está vazia
  cy.get('.todo-list li')
    .should('have.length', 0);
  });
});