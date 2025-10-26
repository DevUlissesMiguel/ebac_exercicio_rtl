import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
// O componente sendo testado (deve ser o PostComments ou similar)
// Se o nome do seu arquivo é PostComment.test.tsx, o componente é PostComment
import PostComment from '.';

describe('Teste de Funcionalidade do Componente PostComment', () => {

    test('Deve renderizar o botão "Comentar"', () => {
        render(<PostComment />);
        // Verifica a renderização do botão, garantindo que o componente base está ok
        expect(screen.getByText('Comentar')).toBeInTheDocument();
    });

    test('Deve permitir a inserção e exibição de dois comentários', () => {

        // 1. Renderiza o componente
        render(<PostComment />);

        // 2. Localiza os elementos (assumindo que o componente tem um input e um botão)
        const inputComentario = screen.getByTestId('campo-comentario');
        const botaoEnviar = screen.getByText('Comentar');

        // --- Inserção do Primeiro Comentário ---
        const comentario1 = 'Ótimo conteúdo! Parabéns.';

        // Simula a digitação
        fireEvent.change(inputComentario, { target: { value: comentario1 } });
        // Simula o clique
        fireEvent.click(botaoEnviar);

        // 3. Verifica o primeiro item
        // O item do comentário DEVE ser renderizado com data-testid="comentario-item"
        let listaComentarios = screen.getAllByTestId('comentario-item');

        expect(listaComentarios).toHaveLength(1);
        expect(listaComentarios[0]).toHaveTextContent(comentario1);

        // --- Inserção do Segundo Comentário ---
        const comentario2 = 'Muito útil para o meu trabalho.';

        // Simula a digitação do segundo comentário
        fireEvent.change(inputComentario, { target: { value: comentario2 } });
        // Simula o clique novamente
        fireEvent.click(botaoEnviar);

        // 4. Verifica se há dois comentários na lista
        listaComentarios = screen.getAllByTestId('comentario-item');

        expect(listaComentarios).toHaveLength(2);

        // 5. Verifica o conteúdo do segundo comentário
        expect(listaComentarios[1]).toHaveTextContent(comentario2);

        // 6. Verifica se o campo de input foi limpo
        expect(inputComentario).toHaveValue('');
    });
});