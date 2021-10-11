import React from 'react';
import { Header } from 'components/Header';
import { Container } from 'reactstrap';

export const AppLayout: React.FC = ({ children }) => (
    <>
        <Header />
        <Container>
            {children}
        </Container>
    </>
)
