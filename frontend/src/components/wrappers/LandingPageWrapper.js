import styled from 'styled-components'

const Wrapper = styled.main`
  landingnav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin-left: 250px;
    height: var(--nav-height);
    display: flex;
    align-items: center;
    span {
      font-weight: 400;
      font-size: 23px;
      font-family: 'Cabin', Sans-Serif;
      color: #1a3447;
    }
  }
  body {
    background-color: var(--backgroundColor);
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
  }

  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
    margin-left: 250px;
    
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  h2 {
   
    font-weight: 500;
  }
  .main-img {
    display: none;
    width: 800px;
    
  }
  @media (min-width: 1500px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 0.5rem;
    }
    .main-img {
      display: block;
        
    }
  }
`
export default Wrapper