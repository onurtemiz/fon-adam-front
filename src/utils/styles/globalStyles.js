import { createGlobalStyle } from 'styled-components/macro';

const GlobalStyle = createGlobalStyle`

 body {
  -webkit-overflow-scrolling: touch;
  margin: 0;
  padding: 0;
  min-height: 100%;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.text.primaryColor600};
  font-family: ${(props) => props.theme.font.primary};
  scrollbar-width:thin;  
 }
html {
  min-height: 100%;
  height:100%;
  width: 100%;
}

h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
} 

ul,ol{
  list-style: none;
  padding-inline-start: 0px;
  margin-block-start: 0px;
  margin-block-end: 0px;
}

hr{
  border-bottom:none;
}

a{
  color:${({ theme }) => theme.text.primaryColor600};
}

.default-tooltip{
  max-width:300px;

  .ant-tooltip-inner{
    padding: 15px 20px;
    border-radius:5px;
    text-align:center;
    font-size:12px;
  }


}


`;

export default GlobalStyle;
