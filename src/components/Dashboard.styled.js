import styled from "styled-components";

export const ThemeToggler = styled.button`
  margin-left: auto;
  margin-bottom: 2rem;
  background: ${({ theme }) => theme.btnBackground};
`;

export const SearchResults = styled.div`
  overflow-y: auto;
`;

export const Lyrics = styled.div`
  white-space: pre;
`;
